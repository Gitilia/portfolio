# Audio drop folder

1. Save your ≤3 min recording as `answer.m4a` (or `.mp3` / `.webm`) here.
2. Edit `../js/audio-config.js`:

```js
window.QUALITY_OPS_AUDIO = "./audio/answer.m4a";
```

3. Refresh the page — the player fills the dock.

Recordings are gitignored by default. Tune chapter cue times in `js/app.js`
(`CHAPTERS`) after you record.

