/* ============================================================
   Text-to-speech "Listen" player.
   Supports: play, pause/resume, drag-to-seek, restart, stop.

   Honest limitation: the Web Speech API has no real audio timeline
   (no duration, no native seek). To fake a YouTube-like scrubber,
   we listen for the browser's word-boundary events (charIndex) to
   move the progress fill during playback, and "seek" by cancelling
   the current utterance and starting a new one from the text
   substring at the target position. It's an approximation, not a
   frame-accurate seek — but it lets you actually jump around.
   ============================================================ */

let activeListenGroup = null;

function resetListenGroup(group){
  group.classList.remove('active');
  group.querySelector('.listen-play').textContent = '▶';
  group.querySelector('.listen-play').title = 'Play';
  setGroupProgress(group, 0);
}

function resetAllListenGroups(){
  document.querySelectorAll('.listen-group').forEach(resetListenGroup);
  activeListenGroup = null;
}

function setGroupProgress(group, fraction){
  fraction = Math.max(0, Math.min(1, fraction));
  group._fraction = fraction;
  group.querySelector('.listen-track-fill').style.width = (fraction * 100) + '%';
  group.querySelector('.listen-track-thumb').style.left = (fraction * 100) + '%';
}

// Find the nearest word start at or before charIndex, so playback
// (and any future seeks) restart cleanly at a word boundary.
function snapToWordStart(text, idx){
  if(idx <= 0) return 0;
  if(idx >= text.length) return text.length;
  let i = idx;
  while(i > 0 && text[i - 1] !== ' ' && text[i - 1] !== '\n'){ i--; }
  return i;
}

function beginSpeaking(group, charOffset){
  const fullText = group._text;
  charOffset = snapToWordStart(fullText, Math.max(0, Math.min(fullText.length - 1, charOffset)));

  window.speechSynthesis.cancel();
  resetAllListenGroups();

  if(!fullText || !fullText.trim()){ return; }

  const utter = new SpeechSynthesisUtterance(fullText.substring(charOffset));
  utter.rate = 0.95;

  utter.onboundary = (event) => {
    if(typeof event.charIndex === 'number'){
      const abs = charOffset + event.charIndex;
      setGroupProgress(group, abs / fullText.length);
    }
  };
  utter.onend = () => {
    if(activeListenGroup === group){
      setGroupProgress(group, 1);
      resetListenGroup(group);
      activeListenGroup = null;
    }
  };
  utter.onerror = () => {
    if(activeListenGroup === group){ resetListenGroup(group); activeListenGroup = null; }
  };

  activeListenGroup = group;
  group.classList.add('active');
  const playBtn = group.querySelector('.listen-play');
  playBtn.textContent = '⏸';
  playBtn.title = 'Pause';
  setGroupProgress(group, charOffset / fullText.length);

  window.speechSynthesis.speak(utter);
}

function seekGroupToFraction(group, fraction){
  if(!('speechSynthesis' in window)){
    alert("Sorry, your browser doesn't support reading text aloud.");
    return;
  }
  const fullText = group._text;
  const charOffset = Math.round(fraction * fullText.length);
  beginSpeaking(group, charOffset);
}

/* Builds a play/pause + seek-bar + restart + stop control cluster
   for a given block of text. Returns a DOM element to insert
   wherever the "Listen" control should appear. */
function createListenGroup(text){
  const group = document.createElement('span');
  group.className = 'listen-group';
  group._text = text;
  group._fraction = 0;
  group.innerHTML = `
    <button class="listen-btn listen-play" type="button" title="Play">▶</button>
    <span class="listen-track" title="Drag or tap to jump to a point">
      <span class="listen-track-bg"></span>
      <span class="listen-track-fill"></span>
      <span class="listen-track-thumb"></span>
    </span>
    <button class="listen-btn listen-restart" type="button" title="Restart from the beginning">⟲</button>
    <button class="listen-btn listen-stop" type="button" title="Stop">⏹</button>
    <span class="listen-label">Listen</span>
  `;

  const playBtn = group.querySelector('.listen-play');
  const restartBtn = group.querySelector('.listen-restart');
  const stopBtn = group.querySelector('.listen-stop');
  const track = group.querySelector('.listen-track');

  playBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if(!('speechSynthesis' in window)){
      alert("Sorry, your browser doesn't support reading text aloud.");
      return;
    }
    if(activeListenGroup === group && window.speechSynthesis.speaking && !window.speechSynthesis.paused){
      window.speechSynthesis.pause();
      playBtn.textContent = '▶';
      playBtn.title = 'Resume';
    } else if(activeListenGroup === group && window.speechSynthesis.paused){
      window.speechSynthesis.resume();
      playBtn.textContent = '⏸';
      playBtn.title = 'Pause';
    } else {
      beginSpeaking(group, (group._fraction || 0) * group._text.length);
    }
  });

  restartBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    beginSpeaking(group, 0);
  });

  stopBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    window.speechSynthesis.cancel();
    resetListenGroup(group);
    if(activeListenGroup === group) activeListenGroup = null;
  });

  // Drag-to-seek on the track (click also seeks — single tap = jump there).
  let dragging = false;

  function fractionFromEvent(evt){
    const rect = track.getBoundingClientRect();
    const x = (evt.clientX !== undefined ? evt.clientX : (evt.touches && evt.touches[0].clientX)) - rect.left;
    return Math.max(0, Math.min(1, x / rect.width));
  }

  track.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    dragging = true;
    track.setPointerCapture(e.pointerId);
    setGroupProgress(group, fractionFromEvent(e));
  });
  track.addEventListener('pointermove', (e) => {
    if(!dragging) return;
    e.stopPropagation();
    setGroupProgress(group, fractionFromEvent(e));
  });
  track.addEventListener('pointerup', (e) => {
    if(!dragging) return;
    e.stopPropagation();
    dragging = false;
    seekGroupToFraction(group, fractionFromEvent(e));
  });
  track.addEventListener('pointercancel', () => { dragging = false; });

  return group;
}
