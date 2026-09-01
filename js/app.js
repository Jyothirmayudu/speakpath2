/* ============================================================
   STATE
   ============================================================ */
let currentLevel = 1;
let quizState = null; // {levelId, qIndex, score, answered, selected, answers}
let progress = null;

function storageKey(name){ return "speakpath_" + name.trim().toLowerCase(); }

function loadProgress(name){
  const raw = localStorage.getItem(storageKey(name));
  if(raw){
    try{ return JSON.parse(raw); }catch(e){ /* fall through */ }
  }
  return { name: name, completed: [], levelScores: {}, unlocked: [1] };
}
function saveProgress(p){
  localStorage.setItem(storageKey(p.name), JSON.stringify(p));
}

function renderExplain(text){
  return text.split('\n\n').map(p => `<p>${wrapWordsHTML(p)}</p>`).join('');
}

const LEVEL_ICONS = { 1: '🌱', 2: '💬', 3: '🚀', 4: '🏆' };

/* ============================================================
   LOGIN
   ============================================================ */
document.getElementById('login-btn').addEventListener('click', doLogin);
document.getElementById('name-input').addEventListener('keydown', e => { if(e.key === 'Enter') doLogin(); });

function doLogin(){
  const input = document.getElementById('name-input');
  const name = input.value.trim();
  if(!name){ input.focus(); input.style.borderColor = 'var(--danger)'; return; }
  progress = loadProgress(name);
  saveProgress(progress);
  localStorage.setItem('speakpath_last_user', name);
  document.getElementById('view-login').classList.add('hidden');
  document.getElementById('app-shell').classList.remove('hidden');
  document.getElementById('greet-name').textContent = name;
  document.getElementById('dash-name').textContent = name;
  document.getElementById('avatar-letter').textContent = name[0].toUpperCase();
  renderDashboard();
}

document.getElementById('logout-btn').addEventListener('click', () => {
  window.speechSynthesis.cancel();
  progress = null;
  document.getElementById('app-shell').classList.add('hidden');
  document.getElementById('view-login').classList.remove('hidden');
  document.getElementById('name-input').value = '';
});

window.addEventListener('load', () => {
  const last = localStorage.getItem('speakpath_last_user');
  if(last){ document.getElementById('name-input').value = last; }
});

/* ============================================================
   NAVIGATION
   ============================================================ */
function showView(id){
  window.speechSynthesis.cancel();
  resetAllListenGroups();
  ['view-dashboard', 'view-level', 'view-quiz', 'view-results'].forEach(v => {
    document.getElementById(v).classList.toggle('hidden', v !== id);
  });
}
function goDashboard(){ renderDashboard(); showView('view-dashboard'); }
function goLevel(levelId){ currentLevel = levelId; renderLevel(levelId); showView('view-level'); }

/* ============================================================
   DASHBOARD
   ============================================================ */
function totalConcepts(){ return LEVELS.reduce((n, l) => n + l.concepts.length, 0); }

function renderDashboard(){
  const totalDone = progress.completed.length;
  document.getElementById('stat-concepts').textContent = `${totalDone}/${totalConcepts()}`;

  const levelsCompleted = LEVELS.filter(l => (progress.levelScores[l.id] || 0) >= 70).length;
  document.getElementById('stat-levels').textContent = `${levelsCompleted}/${LEVELS.length}`;

  const nextLevel = LEVELS.find(l => !(progress.levelScores[l.id] >= 70)) || LEVELS[LEVELS.length - 1];
  document.getElementById('stat-next').textContent = `Level ${nextLevel.id}`;

  const grid = document.getElementById('level-grid');
  grid.innerHTML = '';
  LEVELS.forEach(level => {
    const locked = !progress.unlocked.includes(level.id);
    const doneCount = level.concepts.filter(c => progress.completed.includes(c.id)).length;
    const pct = Math.round((doneCount / level.concepts.length) * 100);
    const score = progress.levelScores[level.id];

    const card = document.createElement('div');
    card.className = 'level-card' + (locked ? ' locked' : '');
    card.innerHTML = `
      ${locked ? `<div class="lock-badge">🔒 Locked</div>` : ''}
      <span class="lv-icon">${LEVEL_ICONS[level.id] || '📘'}</span>
      <div class="lv-tag">LEVEL ${level.id}</div>
      <h3>${level.title}</h3>
      <p class="lv-desc">${level.desc}</p>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      <div class="lv-meta">
        <span>${doneCount}/${level.concepts.length} concepts</span>
        <span>${score !== undefined ? 'Quiz: ' + score + '%' : 'Quiz: not taken'}</span>
      </div>
      <button class="btn ${locked ? 'btn-ghost' : 'btn-primary'} lv-cta" ${locked ? 'disabled' : ''}>${locked ? 'Complete previous level' : 'Open level'}</button>
    `;
    if(!locked){
      card.querySelector('.lv-cta').addEventListener('click', () => goLevel(level.id));
    }
    grid.appendChild(card);
  });
}

/* ============================================================
   LEVEL DETAIL
   ============================================================ */
function renderLevel(levelId){
  const level = LEVELS.find(l => l.id === levelId);
  document.getElementById('lv-tag').textContent = `LEVEL ${level.id}`;
  document.getElementById('lv-title').textContent = level.title;
  document.getElementById('lv-desc').textContent = level.desc;
  document.getElementById('quiz-cta-desc').textContent =
    `A ${level.quiz.length}-question quiz on everything in this level, with a full explanation for every answer afterwards. Score 70% or higher to unlock the next level.`;

  const list = document.getElementById('concept-list');
  list.innerHTML = '';
  level.concepts.forEach(c => {
    const done = progress.completed.includes(c.id);
    const card = document.createElement('div');
    card.className = 'concept-card';
    card.innerHTML = `
      <div class="concept-head">
        <div class="concept-head-left">
          <div class="concept-check ${done ? 'done' : ''}">${done ? '✓' : ''}</div>
          <div class="concept-title">${wrapWordsHTML(c.title)}</div>
        </div>
        <div class="concept-head-right">
          <span class="listen-slot"></span>
          <div class="chevron">▾</div>
        </div>
      </div>
      <div class="concept-body">
        ${renderExplain(c.explain)}
        <div class="example-box">
          <div class="ex-label">${wrapWordsHTML('Examples')}</div>
          <ul>${c.examples.map(e => `<li>${wrapWordsHTML(e)}</li>`).join('')}</ul>
        </div>
        <div class="tip-box">${wrapWordsHTML(c.tip)}</div>
        ${c.source ? `<p class="source-line">Source: <a href="${c.source.url}" target="_blank" rel="noopener">${c.source.label}</a></p>` : ''}
        <button class="btn ${done ? 'btn-ghost' : 'btn-primary'} mark-btn">${done ? 'Marked as understood' : 'Mark as understood'}</button>
      </div>
    `;
    const head = card.querySelector('.concept-head');
    head.addEventListener('click', () => card.classList.toggle('open'));

    // Reading order: title → explanation → examples → tip (matches what's on screen).
    const wordSpans = collectWordSpans(card);
    const listenGroupEl = createListenGroup(null, wordSpans);
    // Auto-expand the card when playback starts, so the highlighted word is visible.
    listenGroupEl.querySelectorAll('.listen-play, .listen-restart').forEach(btn => {
      btn.addEventListener('click', () => card.classList.add('open'));
    });
    card.querySelector('.listen-slot').replaceWith(listenGroupEl);

    const markBtn = card.querySelector('.mark-btn');
    markBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if(!progress.completed.includes(c.id)){
        progress.completed.push(c.id);
        saveProgress(progress);
        renderLevel(levelId);
      }
    });
    list.appendChild(card);
  });
}

document.getElementById('start-quiz-btn').addEventListener('click', () => {
  startQuiz(currentLevel);
});

function launchCelebration(){
  const layer = document.createElement('div');
  layer.id = 'confetti-layer';
  document.body.appendChild(layer);

  const colors = ['#2F6F5E', '#C77D2E', '#E1B168', '#7FB69E', '#B4432F', '#F5E3C8'];
  const confettiCount = 60;
  for(let i = 0; i < confettiCount; i++){
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = (Math.random() * 100) + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--drift', (Math.random() * 160 - 80) + 'px');
    piece.style.setProperty('--spin', (Math.random() * 720 - 360) + 'deg');
    piece.style.animationDuration = (2.2 + Math.random() * 1.6) + 's';
    piece.style.animationDelay = (Math.random() * 0.5) + 's';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    layer.appendChild(piece);
  }

  const balloonEmoji = ['🎈', '🎉', '🎊'];
  const balloonCount = 10;
  for(let i = 0; i < balloonCount; i++){
    const balloon = document.createElement('div');
    balloon.className = 'balloon-piece';
    balloon.textContent = balloonEmoji[Math.floor(Math.random() * balloonEmoji.length)];
    balloon.style.left = (5 + Math.random() * 90) + 'vw';
    balloon.style.setProperty('--drift', (Math.random() * 100 - 50) + 'px');
    balloon.style.setProperty('--spin', (Math.random() * 40 - 20) + 'deg');
    balloon.style.animationDuration = (2.8 + Math.random() * 1.4) + 's';
    balloon.style.animationDelay = (Math.random() * 0.4) + 's';
    layer.appendChild(balloon);
  }

  setTimeout(() => layer.remove(), 4200);
}

/* ============================================================
   QUIZ
   ============================================================ */
function startQuiz(levelId){
  const level = LEVELS.find(l => l.id === levelId);
  quizState = { levelId, qIndex: 0, score: 0, answered: false, selected: null, answers: [] };
  showView('view-quiz');
  renderQuestion(level);
}

function renderQuestion(level){
  const q = level.quiz[quizState.qIndex];
  quizState.answered = false;
  quizState.selected = null;

  document.getElementById('quiz-progress-label').textContent = `Question ${quizState.qIndex + 1} of ${level.quiz.length}`;
  document.getElementById('quiz-progress-fill').style.width = `${(quizState.qIndex / level.quiz.length) * 100}%`;
  document.getElementById('q-text').innerHTML = wrapWordsHTML(q.q);

  const optList = document.getElementById('opt-list');
  optList.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];
  q.opts.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.innerHTML = `<span class="opt-letter">${letters[idx]}</span><span>${wrapWordsHTML(opt)}</span>`;
    btn.addEventListener('click', () => selectOption(idx, level));
    optList.appendChild(btn);
  });

  // Listen group reads the question, then each option, highlighting words as it goes.
  const questionSlot = document.getElementById('question-listen-slot');
  questionSlot.innerHTML = '';
  const qWordSpans = [
    ...collectWordSpans(document.getElementById('q-text')),
    ...collectWordSpans(optList)
  ];
  questionSlot.appendChild(createListenGroup(null, qWordSpans));

  document.getElementById('feedback-box').classList.add('hidden');
  document.getElementById('feedback-box').innerHTML = '';
  const nextBtn = document.getElementById('quiz-next-btn');
  nextBtn.textContent = 'Check answer';
  nextBtn.disabled = true;
  nextBtn.onclick = () => checkAnswer(level);
}

function selectOption(idx){
  if(quizState.answered) return;
  quizState.selected = idx;
  document.querySelectorAll('.opt-btn').forEach((b, i) => {
    b.classList.toggle('selected', i === idx);
  });
  document.getElementById('quiz-next-btn').disabled = false;
}

function checkAnswer(level){
  const q = level.quiz[quizState.qIndex];
  if(quizState.answered) return;
  quizState.answered = true;
  const correct = quizState.selected === q.a;
  if(correct) quizState.score++;

  quizState.answers.push({
    question: q.q,
    opts: q.opts,
    selected: quizState.selected,
    correctIdx: q.a,
    explain: q.explain
  });

  document.querySelectorAll('.opt-btn').forEach((b, i) => {
    b.classList.remove('selected');
    if(i === q.a) b.classList.add('correct');
    else if(i === quizState.selected) b.classList.add('incorrect');
  });

  const fb = document.getElementById('feedback-box');
  fb.classList.remove('hidden');
  fb.className = 'feedback-box ' + (correct ? 'correct' : 'incorrect');
  const feedbackText = `${correct ? "That's right. " : `Not quite — the correct answer is "${q.opts[q.a]}". `}${q.explain}`;
  fb.innerHTML = `<span class="feedback-text">${wrapWordsHTML(feedbackText)}</span>`;
  fb.appendChild(createListenGroup(null, collectWordSpans(fb)));

  const nextBtn = document.getElementById('quiz-next-btn');
  nextBtn.textContent = quizState.qIndex < level.quiz.length - 1 ? 'Next question' : 'See results';
  nextBtn.disabled = false;
  nextBtn.onclick = () => advanceQuiz(level);
}

function advanceQuiz(level){
  if(quizState.qIndex < level.quiz.length - 1){
    quizState.qIndex++;
    renderQuestion(level);
  } else {
    finishQuiz(level);
  }
}

function finishQuiz(level){
  const pct = Math.round((quizState.score / level.quiz.length) * 100);
  progress.levelScores[level.id] = pct;
  const passed = pct >= 70;
  if(passed){
    const nextId = level.id + 1;
    const nextLevel = LEVELS.find(l => l.id === nextId);
    if(nextLevel && !progress.unlocked.includes(nextId)){
      progress.unlocked.push(nextId);
    }
  }
  saveProgress(progress);

  document.getElementById('quiz-progress-fill').style.width = '100%';
  const ring = document.getElementById('result-ring');
  ring.textContent = pct + '%';
  ring.className = 'result-ring ' + (passed ? 'pass' : 'fail');
  document.getElementById('result-title').textContent = passed ? 'Nice work!' : 'Almost there';
  const nextLevel = LEVELS.find(l => l.id === level.id + 1);
  document.getElementById('result-sub').textContent = passed
    ? (nextLevel ? `You passed Level ${level.id} and unlocked Level ${nextLevel.id}.` : `You passed Level ${level.id} — that's the final level complete!`)
    : `You scored ${pct}%. You need 70% to unlock the next level — review the concepts and try again.`;

  const reviewList = document.getElementById('review-list');
  reviewList.innerHTML = '';
  quizState.answers.forEach((ans, i) => {
    const wasCorrect = ans.selected === ans.correctIdx;
    const item = document.createElement('div');
    item.className = 'review-item';
    item.innerHTML = `
      <div class="review-item-head">
        <p class="review-q"><span class="review-q-num">Q${i + 1}.</span> ${ans.question}</p>
      </div>
      ${wasCorrect
        ? `<div class="review-answer-line right">✓ You answered: ${ans.opts[ans.selected]}</div>`
        : `<div class="review-answer-line wrong">✗ You answered: ${ans.opts[ans.selected]}</div>
           <div class="review-answer-line right">✓ Correct answer: ${ans.opts[ans.correctIdx]}</div>`
      }
      <div class="review-explain">
        <span class="review-explain-text">${wrapWordsHTML(ans.explain)}</span>
        <span class="listen-slot"></span>
      </div>
    `;
    const explainSpans = collectWordSpans(item.querySelector('.review-explain-text').parentElement);
    item.querySelector('.listen-slot').replaceWith(createListenGroup(null, explainSpans));
    reviewList.appendChild(item);
  });

  showView('view-results');
  if(passed){ launchCelebration(); }
}
