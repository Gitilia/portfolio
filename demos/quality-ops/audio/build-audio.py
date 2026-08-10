#!/usr/bin/env python3
"""Build answer.mp3 from short spoken beats + natural silence gaps."""

from __future__ import annotations

import asyncio
import re
import subprocess
import tempfile
from pathlib import Path

import edge_tts

VOICE = "en-US-BrianNeural"
RATE = "-8%"
PITCH = "-1Hz"
ROOT = Path(__file__).resolve().parent
SCRIPT = ROOT / "script.txt"
OUT = ROOT / "answer.mp3"
VTT = ROOT / "answer.vtt"

# Silence after each beat (seconds). Longer after section breaks (blank line in source).
GAP_DEFAULT = 0.35
GAP_SECTION = 0.75
GAP_SENTENCE_END = 0.45


def beats_from_script(text: str) -> list[tuple[str, float]]:
    blocks = re.split(r"\n\s*\n", text.strip())
    out: list[tuple[str, float]] = []
    for bi, block in enumerate(blocks):
        lines = [ln.strip() for ln in block.splitlines() if ln.strip()]
        for i, line in enumerate(lines):
            gap = GAP_DEFAULT
            if i == len(lines) - 1:
                gap = GAP_SECTION if bi < len(blocks) - 1 else 0.55
            elif line.endswith((".", "?", "!")):
                gap = GAP_SENTENCE_END
            # Soften list-y fragments
            if line.endswith((".", "?", "!")) and len(line.split()) <= 4:
                gap = max(gap, 0.4)
            out.append((line, gap))
    return out


async def synth_line(text: str, dest: Path) -> None:
    communicate = edge_tts.Communicate(text, VOICE, rate=RATE, pitch=PITCH)
    await communicate.save(str(dest))


def silence_wav(path: Path, seconds: float) -> None:
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "lavfi",
            "-i",
            "anullsrc=r=44100:cl=mono",
            "-t",
            f"{seconds:.3f}",
            "-c:a",
            "pcm_s16le",
            str(path),
        ],
        check=True,
        capture_output=True,
    )


def to_wav(src: Path, dest: Path) -> None:
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(src),
            "-ar",
            "44100",
            "-ac",
            "1",
            "-c:a",
            "pcm_s16le",
            str(dest),
        ],
        check=True,
        capture_output=True,
    )


def concat_wavs(parts: list[Path], dest: Path) -> None:
    listing = dest.with_suffix(".txt")
    listing.write_text("".join(f"file '{p}'\n" for p in parts))
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(listing),
            "-c",
            "copy",
            str(dest),
        ],
        check=True,
        capture_output=True,
    )
    listing.unlink(missing_ok=True)


def polish(src: Path, dest: Path) -> None:
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(src),
            "-af",
            "highpass=f=70,lowpass=f=11000,"
            "acompressor=threshold=-20dB:ratio=2.2:attack=12:release=160:makeup=1.5,"
            "equalizer=f=200:t=q:w=1.1:g=2,"
            "equalizer=f=3200:t=q:w=1:g=-1.2,"
            "loudnorm=I=-16:TP=-1.5:LRA=11",
            "-codec:a",
            "libmp3lame",
            "-b:a",
            "128k",
            str(dest),
        ],
        check=True,
        capture_output=True,
    )


def write_vtt(cues: list[tuple[float, float, str]], dest: Path) -> None:
    def ts(sec: float) -> str:
        h = int(sec // 3600)
        m = int((sec % 3600) // 60)
        s = sec % 60
        return f"{h:02d}:{m:02d}:{s:06.3f}".replace(".", ",")

    lines = ["WEBVTT", ""]
    for i, (start, end, text) in enumerate(cues, 1):
        lines.append(str(i))
        lines.append(f"{ts(start)} --> {ts(end)}")
        lines.append(text)
        lines.append("")
    dest.write_text("\n".join(lines))


async def main() -> None:
    text = SCRIPT.read_text()
    beats = beats_from_script(text)
    if not beats:
        raise SystemExit("no beats")

    with tempfile.TemporaryDirectory() as tmp:
        tmp_path = Path(tmp)
        wav_parts: list[Path] = []
        cues: list[tuple[float, float, str]] = []
        t = 0.0

        for i, (line, gap) in enumerate(beats):
            mp3 = tmp_path / f"beat-{i:03d}.mp3"
            wav = tmp_path / f"beat-{i:03d}.wav"
            await synth_line(line, mp3)
            to_wav(mp3, wav)
            # probe duration
            dur = float(
                subprocess.check_output(
                    [
                        "ffprobe",
                        "-v",
                        "error",
                        "-show_entries",
                        "format=duration",
                        "-of",
                        "csv=p=0",
                        str(wav),
                    ],
                    text=True,
                ).strip()
            )
            cues.append((t, t + dur, line))
            wav_parts.append(wav)
            t += dur

            if gap > 0:
                sil = tmp_path / f"sil-{i:03d}.wav"
                silence_wav(sil, gap)
                wav_parts.append(sil)
                t += gap

        merged = tmp_path / "merged.wav"
        concat_wavs(wav_parts, merged)
        polish(merged, OUT)
        write_vtt(cues, VTT)
        print(f"wrote {OUT} ({t:.1f}s spoken+gaps), {len(beats)} beats")


if __name__ == "__main__":
    asyncio.run(main())
