# Loom / audio submission

## Status

| Where | URL | State |
|-------|-----|--------|
| Local | http://127.0.0.1:8766 | Works when `serve` is running |
| Live | https://iliadobkin.com/demos/quality-ops/ | **Not deployed yet** (404) |

Deploy with portfolio (`git push` + site pull on LXC 219) before sending the link.

## Add your audio

1. Record ≤3 min (Voice Memos / QuickTime).
2. Save as `audio/answer.m4a`.
3. Set in `js/audio-config.js`:

```js
window.QUALITY_OPS_AUDIO = "./audio/answer.m4a";
```

4. Refresh — player fills the dock; chapters seek + sync the console.
5. Tweak `CHAPTERS` cue times in `js/app.js` to match your pacing.

## Script (≤3 min)

| Time | Say / do |
|------|----------|
| 0:00 | “Quality is how the queue moves — not a phase at the end.” |
| 0:25 | Lead: own flaky signal, show up at AC, make the right path easy. Click moves. |
| 1:10 | Process: intake, contracts, CI, release learn-loop. Click stages. |
| 1:55 | Levers: trusted green, fast feedback, safety, celebrate prevention. Flip them. |
| 2:35 | RocketRez close: boring releases under peak load; AI assists, humans own the guest. |
| 2:55 | “Happy to go deeper live.” |

## Submit

Send **both**:

1. Live URL (after deploy) with embedded audio, **or** Loom if you prefer video face-time
2. Short note that the page *is* the answer — interactive console + recording

```bash
cd ~/Documents/code/portfolio
npx --yes serve demos/quality-ops -p 8766
```
