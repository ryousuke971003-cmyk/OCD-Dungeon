// ===== OCDダンジョン メインスクリプト =====
// 設計書 Ver 1.0 に基づき実装

// =========================================================
//  敵キャラクターデータ
// =========================================================
const ENEMIES = [
  {
    id: 'jirorin',
    name: 'ジロリン',
    category: '確認',
    desc: 'たくさんの目で隅々まで確認しようとする…',
    color: '#B2D8FF',
    // 生成した画像を使用
    avatarType: 'img',
    avatarSrc: '/Users/torigoe971003/.gemini/antigravity/brain/190f1246-15b7-4c2e-81fa-4fc802532f5a/enemy_jirorin_1773398462646.png',
    speechLines: [
      'ちゃんと確認した？',
      'もう一回見てみようよ…',
      '本当に大丈夫？ホントに？',
      'また何か忘れてるかもよ！',
    ],
    defeatMsg: 'ジロリンを撃破！確認しなくても大丈夫だった！',
  },
  {
    id: 'dororu',
    name: 'ドロル',
    category: '不潔・洗浄',
    desc: '全身泥んこ。触るものを全部汚したがる…',
    color: '#F9D9B0',
    avatarType: 'svg',
    avatarSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- 体 -->
      <ellipse cx="50" cy="58" rx="38" ry="34" fill="#C4895A"/>
      <ellipse cx="50" cy="55" rx="36" ry="32" fill="#D4996A"/>
      <!-- 泥スポット -->
      <ellipse cx="30" cy="48" rx="10" ry="8" fill="#8B5E3C" opacity="0.7"/>
      <ellipse cx="62" cy="52" rx="8" ry="6" fill="#8B5E3C" opacity="0.6"/>
      <ellipse cx="45" cy="68" rx="12" ry="8" fill="#7A4F2B" opacity="0.6"/>
      <ellipse cx="25" cy="68" rx="7" ry="5" fill="#8B5E3C" opacity="0.5"/>
      <!-- 足 -->
      <ellipse cx="34" cy="90" rx="10" ry="8" fill="#C4895A"/>
      <ellipse cx="66" cy="90" rx="10" ry="8" fill="#C4895A"/>
      <!-- 目 -->
      <ellipse cx="37" cy="45" rx="9" ry="10" fill="white"/>
      <ellipse cx="63" cy="45" rx="9" ry="10" fill="white"/>
      <circle  cx="39" cy="46" r="6" fill="#3D2B1F"/>
      <circle  cx="65" cy="46" r="6" fill="#3D2B1F"/>
      <circle  cx="40" cy="44" r="2" fill="white"/>
      <circle  cx="66" cy="44" r="2" fill="white"/>
      <!-- 口（困り顔） -->
      <path d="M 38 62 Q 50 58 62 62" stroke="#7A4F2B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- 小さな泥の飛び散り -->
      <circle cx="18" cy="40" r="4" fill="#8B5E3C" opacity="0.6"/>
      <circle cx="80" cy="35" r="3" fill="#8B5E3C" opacity="0.5"/>
      <circle cx="76" cy="68" r="5" fill="#7A4F2B" opacity="0.6"/>
    </svg>`,
    speechLines: [
      'べたべたべたべた…',
      'どこ触っても汚いよ〜',
      '洗っても洗っても！',
      'きたない！きたない！',
    ],
    defeatMsg: 'ドロルを撃破！洗わなくても安全だった！',
  },
  {
    id: 'chiguhagu',
    name: 'チグハグ',
    category: '縁起・儀式',
    desc: '左右非対称のまま。完璧にしようとしてイライラ…',
    color: '#E0D0FF',
    avatarType: 'svg',
    avatarSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- 足（左右バラバラ） -->
      <rect x="26" y="82" width="14" height="18" rx="4" fill="#9B7FD4"/>
      <rect x="60" y="78" width="18" height="22" rx="2" fill="#7C5FBF"/>
      <!-- 体（非対称ブロック） -->
      <rect x="28" y="50" width="20" height="35" rx="5" fill="#B08AFF"/>
      <rect x="48" y="42" width="24" height="43" rx="3" fill="#9B7FD4"/>
      <!-- 頭（2段重ね） -->
      <rect x="22" y="20" width="30" height="32" rx="8" fill="#C9ADFF"/>
      <rect x="50" y="14" width="26" height="26" rx="4" fill="#9B7FD4"/>
      <!-- 目（左右ズレ） -->
      <circle cx="34" cy="32" r="7" fill="white"/>
      <circle cx="34" cy="33" r="4" fill="#3D2B1F"/>
      <circle cx="35" cy="32" r="1.5" fill="white"/>
      <ellipse cx="60" cy="26" rx="8" ry="6" fill="white"/>
      <circle cx="61" cy="26" r="4" fill="#3D2B1F"/>
      <circle cx="62" cy="25" r="1.5" fill="white"/>
      <!-- 口（ムスッと） -->
      <path d="M 30 44 L 44 44" stroke="#7C5FBF" stroke-width="3" stroke-linecap="round"/>
      <!-- デコボコアクセント -->
      <rect x="20" y="55" width="8" height="8" rx="2" fill="#FFD740" opacity="0.8"/>
      <rect x="72" y="60" width="6" height="10" rx="2" fill="#FF8C42" opacity="0.7"/>
    </svg>`,
    speechLines: [
      'なんか非対称！',
      '右と左が違う…！',
      '揃えないと気持ち悪い！',
      'もう一回やり直して！',
    ],
    defeatMsg: 'チグハグを撃破！ズレてても問題なかった！',
  },
  {
    id: 'bosori',
    name: 'ボソリ',
    category: '加害・不道徳',
    desc: '耳元でいじわるな囁きをしてくる小さな影…',
    color: '#C8F5E0',
    avatarType: 'svg',
    avatarSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- 影の体（ふわふわした形） -->
      <path d="M 50 90 C 25 90 15 75 18 55 C 10 40 20 15 50 12 C 80 15 90 40 82 55 C 85 75 75 90 50 90 Z" fill="#6B4FA0" opacity="0.7"/>
      <!-- ハイライト -->
      <path d="M 50 85 C 30 85 22 72 24 56 C 18 43 27 22 50 19 C 73 22 82 43 76 56 C 78 72 70 85 50 85 Z" fill="#8B6FC0" opacity="0.5"/>
      <!-- 目（細長い意地悪そうな目） -->
      <ellipse cx="36" cy="45" rx="9" ry="6" fill="#F5E0FF"/>
      <ellipse cx="64" cy="45" rx="9" ry="6" fill="#F5E0FF"/>
      <ellipse cx="36" cy="46" rx="5" ry="4" fill="#3D1F5A"/>
      <ellipse cx="64" cy="46" rx="5" ry="4" fill="#3D1F5A"/>
      <circle cx="38" cy="45" r="1.5" fill="white"/>
      <circle cx="66" cy="45" r="1.5" fill="white"/>
      <!-- ニヤリ笑い -->
      <path d="M 35 60 Q 50 70 65 60" stroke="#D0ADFF" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- 囁きの手 -->
      <path d="M 20 50 C 10 42 12 36 22 38 C 18 44 20 50 26 52" fill="#6B4FA0" opacity="0.6"/>
      <path d="M 80 50 C 90 42 88 36 78 38 C 82 44 80 50 74 52" fill="#6B4FA0" opacity="0.6"/>
      <!-- 波線（囁き） -->
      <path d="M 5 30 Q 8 26 11 30 Q 14 34 17 30" stroke="#D0ADFF" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.7"/>
      <path d="M 83 30 Q 86 26 89 30 Q 92 34 95 30" stroke="#D0ADFF" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.7"/>
    </svg>`,
    speechLines: [
      '…ねえ、もしかしたら…',
      'やっぱり悪いことしたかも',
      'ボソボソ…ボソボソ…',
      '誰かを傷つけちゃったかも',
    ],
    defeatMsg: 'ボソリを撃破！その囁きは嘘だった！',
  },
];

// =========================================================
//  難易度設定（タイマー秒数・獲得XP）
// =========================================================
const DIFFICULTIES = {
  easy:   { label: 'よわい',   seconds: 30,  xp: 10 },
  normal: { label: 'ふつう', seconds: 90,  xp: 25 },
  hard:   { label: 'つよい',   seconds: 180, xp: 50 },
};

// =========================================================
//  メダルデータ
// =========================================================
const MEDALS = [
  { id: 'first',   icon: '⚔️',  name: '初出陣',       condition: '初めての勝利',    threshold: 1  },
  { id: 'five',    icon: '🥉',  name: '5回クリア',    condition: '5回勝利する',      threshold: 5  },
  { id: 'ten',     icon: '🥈',  name: '10回クリア',   condition: '10回勝利する',     threshold: 10 },
  { id: 'twenty',  icon: '🥇',  name: '20回クリア',   condition: '20回勝利する',     threshold: 20 },
  { id: 'fifty',   icon: '🏆',  name: '50回クリア',   condition: '50回勝利する',     threshold: 50 },
  { id: 'hundred', icon: '👑',  name: '勇者の称号',   condition: '100回勝利する',    threshold: 100 },
  { id: 'easy3',   icon: '🌱',  name: '小さな一歩',   condition: 'よわいを3回クリア',threshold: null, special: true },
  { id: 'hard1',   icon: '🔥',  name: '本気の挑戦',   condition: 'つよいに1回勝つ',  threshold: null, special: true },
];

// =========================================================
//  リラックスグッズデータ（レベルアップ報酬）
// =========================================================
const RELAX_GOODS = [
  { level: 2,  icon: '☕',  name: 'ホットコーヒー', desc: 'ほんのり温かい一杯',     style: 'bottom:10%; left:10%' },
  { level: 3,  icon: '🕯️', name: 'アロマキャンドル', desc: 'やわらかな香りが広がる', style: 'bottom:30%; right:8%' },
  { level: 4,  icon: '🛋️', name: 'ふかふかクッション', desc: 'もふもふで心地よい',   style: 'bottom:5%; right:20%' },
  { level: 5,  icon: '🌿',  name: 'ちいさな観葉植物', desc: '緑が癒しをくれる',      style: 'bottom:15%; left:35%' },
  { level: 6,  icon: '📚',  name: 'お気に入りの本', desc: '読むたびほっとする',     style: 'bottom:40%; left:5%' },
  { level: 7,  icon: '🎵',  name: 'レコードプレイヤー', desc: 'のんびりした音楽',    style: 'bottom:60%; right:10%' },
  { level: 8,  icon: '🌙',  name: 'ムーンランプ', desc: '夜を照らすやさしい光',    style: 'bottom:70%; left:8%' },
  { level: 9,  icon: '🧸',  name: 'くまのぬいぐるみ', desc: 'そっと抱きしめよう',  style: 'bottom:20%; right:35%' },
  { level: 10, icon: '🛁',  name: 'バブルバス', desc: 'ゆっくりお風呂でリラックス', style: 'bottom:5%; left:50%' },
];

// XPテーブル（レベルに必要なXP累計）
function xpForLevel(level) {
  return level * 100; // Lv1→2: 100XP, Lv2→3: 200XP, ...
}

// =========================================================
//  ゲーム状態
// =========================================================
let state = {
  currentScreen: 'screen-home',
  selectedEnemy: null,       // 選択中の敵オブジェクト
  selectedDifficulty: null,  // 'easy' | 'normal' | 'hard'
  timerInterval: null,
  timerRemaining: 0,
  timerMax: 0,
  isRetreatModalOpen: false,
};

// =========================================================
//  セーブデータ（LocalStorage）
// =========================================================
const SAVE_KEY = 'ocd_dungeon_save';

function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return {
    totalWins: 0,
    medals: [],
    level: 1,
    xp: 0,
    unlockedGoods: [],
    streak: 0,
    lastPlayDate: null,
    winsByDifficulty: { easy: 0, normal: 0, hard: 0 },
    winsByEnemy: {},
  };
}

function saveSave(data) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

let saveData = loadSave();

// =========================================================
//  画面切り替え
// =========================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
  state.currentScreen = id;

  // 各画面の初期化
  if (id === 'screen-home')    renderHome();
  if (id === 'screen-select')  renderEnemySelect();
  if (id === 'screen-medals')  renderMedals();
  if (id === 'screen-goods')   renderGoods();
}

// =========================================================
//  ホーム画面 レンダリング
// =========================================================
function renderHome() {
  // レベル・XPバー
  document.getElementById('player-level').textContent = saveData.level;
  const xpNeeded = xpForLevel(saveData.level);
  const xpRatio = Math.min(saveData.xp / xpNeeded, 1);
  document.getElementById('xp-bar').style.width = (xpRatio * 100) + '%';
  document.getElementById('xp-current').textContent = saveData.xp;
  document.getElementById('xp-max').textContent = xpNeeded;

  // 統計
  document.getElementById('total-wins').textContent = saveData.totalWins;
  document.getElementById('total-medals').textContent = saveData.medals.length;
  document.getElementById('streak-count').textContent = saveData.streak;

  // 部屋の家具（グッズ）を配置
  renderRoomGoods();
}

function renderRoomGoods() {
  const room = document.getElementById('home-room');
  // 既存の家具アイテムを削除
  room.querySelectorAll('.home-furniture-item').forEach(el => el.remove());

  const unlockedGoods = RELAX_GOODS.filter(g => saveData.unlockedGoods.includes(g.level));
  unlockedGoods.forEach((g, i) => {
    const el = document.createElement('div');
    el.className = 'home-furniture-item';
    el.textContent = g.icon;
    el.title = g.name;
    el.style.cssText = g.style;
    el.style.animationDelay = `${i * 0.1}s`;
    room.appendChild(el);
  });
}

// =========================================================
//  敵選択画面 レンダリング
// =========================================================
function renderEnemySelect() {
  const grid = document.getElementById('enemy-grid');
  grid.innerHTML = '';
  ENEMIES.forEach(enemy => {
    const card = document.createElement('div');
    card.className = 'enemy-card';
    card.dataset.id = enemy.id;
    card.style.setProperty('--card-accent', enemy.color);
    card.innerHTML = `
      <div class="enemy-avatar">${buildAvatarHTML(enemy, false)}</div>
      <div class="enemy-name">${enemy.name}</div>
      <div class="enemy-category">${enemy.category}</div>
      <div class="enemy-desc">${enemy.desc}</div>
    `;
    card.addEventListener('click', () => selectEnemy(enemy));
    grid.appendChild(card);
  });
}

function buildAvatarHTML(enemy, large = false) {
  if (enemy.avatarType === 'img') {
    return `<img src="${enemy.avatarSrc}" alt="${enemy.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
            <div style="display:none;font-size:${large ? '5rem' : '3rem'};text-align:center;">👁️</div>`;
  } else if (enemy.avatarType === 'svg') {
    return enemy.avatarSvg;
  }
  return `<span style="font-size:${large ? '5rem' : '3rem'};">🌫️</span>`;
}

function selectEnemy(enemy) {
  state.selectedEnemy = enemy;
  showScreen('screen-difficulty');
  renderDifficultyScreen();
}

function selectCustomEnemy() {
  const name = document.getElementById('custom-name').value.trim();
  if (!name) {
    document.getElementById('custom-name').focus();
    document.getElementById('custom-name').style.borderColor = '#FF5252';
    setTimeout(() => document.getElementById('custom-name').style.borderColor = '', 1000);
    return;
  }
  const customEnemy = {
    id: 'custom',
    name,
    category: 'カスタム',
    desc: 'あなただけのオリジナル強迫観念',
    color: '#D0E8D0',
    avatarType: 'svg',
    avatarSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="55" rx="36" ry="32" fill="#88CC88"/>
      <ellipse cx="50" cy="52" rx="34" ry="30" fill="#AADDAA"/>
      <circle cx="38" cy="45" r="8" fill="white"/>
      <circle cx="62" cy="45" r="8" fill="white"/>
      <circle cx="40" cy="46" r="5" fill="#3D2B1F"/>
      <circle cx="64" cy="46" r="5" fill="#3D2B1F"/>
      <circle cx="41" cy="44" r="1.5" fill="white"/>
      <circle cx="65" cy="44" r="1.5" fill="white"/>
      <path d="M 38 62 Q 50 68 62 62" stroke="#558855" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <text x="50" y="88" text-anchor="middle" font-size="11" fill="#3D5A3D" font-family="sans-serif">?</text>
    </svg>`,
    speechLines: ['ボソボソ…', 'ねえ、気になるよね', 'やっぱり変かも…'],
    defeatMsg: `${name}を撃破！よく頑張った！`,
  };
  state.selectedEnemy = customEnemy;
  showScreen('screen-difficulty');
  renderDifficultyScreen();
}

// =========================================================
//  難易度選択画面 レンダリング
// =========================================================
function renderDifficultyScreen() {
  const preview = document.getElementById('selected-enemy-preview');
  const enemy = state.selectedEnemy;
  if (!enemy) return;
  preview.innerHTML = `
    <div style="width:90px;height:90px;margin:0 auto 10px;">${buildAvatarHTML(enemy)}</div>
    <div class="preview-name">${enemy.name}（${enemy.category}）</div>
    <div class="enemy-desc" style="margin-top:8px;">${enemy.desc}</div>
  `;
}

// =========================================================
//  戦闘開始
// =========================================================
function startBattle(difficulty) {
  state.selectedDifficulty = difficulty;
  const diffConf = DIFFICULTIES[difficulty];
  state.timerMax = diffConf.seconds;
  state.timerRemaining = diffConf.seconds;

  showScreen('screen-battle');
  setupBattleScreen();
  startTimer();
}

function setupBattleScreen() {
  const enemy = state.selectedEnemy;
  const diff  = DIFFICULTIES[state.selectedDifficulty];

  // 敵名・スプライト
  document.getElementById('battle-enemy-name').textContent = enemy.name;
  document.getElementById('enemy-sprite').innerHTML = buildAvatarHTML(enemy, true);

  // ランダムな台詞
  const speechEl = document.getElementById('enemy-speech-bubble');
  const line = enemy.speechLines[Math.floor(Math.random() * enemy.speechLines.length)];
  speechEl.textContent = line;

  // 台詞を一定間隔で変える
  clearInterval(state.speechInterval);
  state.speechInterval = setInterval(() => {
    const newLine = enemy.speechLines[Math.floor(Math.random() * enemy.speechLines.length)];
    speechEl.style.opacity = '0';
    setTimeout(() => {
      speechEl.textContent = newLine;
      speechEl.style.opacity = '1';
    }, 300);
  }, 4000);
  speechEl.style.transition = 'opacity 0.3s';

  // チャージ・タイマーリセット
  updateChargeBar(0);
  updateTimerDisplay(state.timerMax, state.timerMax);
}

// =========================================================
//  タイマー
// =========================================================
function startTimer() {
  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    state.timerRemaining--;
    const progress = 1 - state.timerRemaining / state.timerMax;
    updateChargeBar(progress);
    updateTimerDisplay(state.timerRemaining, state.timerMax);

    // 敵が弱ってくるエフェクト（50%以上で敵を揺らす）
    if (progress >= 0.5 && progress <= 0.52) {
      document.getElementById('enemy-sprite').classList.add('enemy-shake');
      setTimeout(() => document.getElementById('enemy-sprite').classList.remove('enemy-shake'), 500);
    }

    if (state.timerRemaining <= 0) {
      clearInterval(state.timerInterval);
      clearInterval(state.speechInterval);
      triggerVictory();
    }
  }, 1000);
}

function updateChargeBar(ratio) {
  const pct = Math.round(ratio * 100);
  document.getElementById('charge-bar').style.width = pct + '%';
  document.getElementById('charge-percent').textContent = pct + '%';
}

function updateTimerDisplay(remaining, max) {
  document.getElementById('timer-text').textContent = remaining;
  const circumference = 2 * Math.PI * 45; // 約283
  const offset = circumference * (1 - remaining / max);
  document.getElementById('timer-progress').style.strokeDashoffset = offset;

  // タイマーの色：残り少ないほど赤みが増す
  const ratio = remaining / max;
  const r = Math.round(90 + (1 - ratio) * 165);
  const g = Math.round(140 - (1 - ratio) * 100);
  const b = Math.round(255 - (1 - ratio) * 255);
  document.getElementById('timer-progress').style.stroke = `rgb(${r},${g},${b})`;
}

// =========================================================
//  戦闘撤退
// =========================================================
function retreatBattle() {
  // タイマーを一時停止
  clearInterval(state.timerInterval);
  clearInterval(state.speechInterval);
  document.getElementById('retreat-modal').style.display = 'flex';
}

function confirmRetreat() {
  closeRetreatModal();
  showScreen('screen-home');
}

function closeRetreatModal() {
  document.getElementById('retreat-modal').style.display = 'none';
  // タイマーが残っていれば再開
  if (state.timerRemaining > 0 && state.currentScreen === 'screen-battle') {
    startTimer();
  }
}

// =========================================================
//  勝利処理
// =========================================================
function triggerVictory() {
  // セーブデータ更新
  const diff = DIFFICULTIES[state.selectedDifficulty];
  const gainedXp = diff.xp;

  saveData.totalWins++;
  saveData.winsByDifficulty[state.selectedDifficulty]++;
  if (!saveData.winsByEnemy[state.selectedEnemy.id]) saveData.winsByEnemy[state.selectedEnemy.id] = 0;
  saveData.winsByEnemy[state.selectedEnemy.id]++;

  // 連続日数
  const today = new Date().toDateString();
  if (saveData.lastPlayDate === today) {
    // 同じ日はストリーク変化なし
  } else if (saveData.lastPlayDate === getPreviousDay()) {
    saveData.streak++;
  } else {
    saveData.streak = 1;
  }
  saveData.lastPlayDate = today;

  // XP加算・レベルアップチェック
  saveData.xp += gainedXp;
  let leveledUp = false;
  let newGoods = null;
  while (saveData.xp >= xpForLevel(saveData.level)) {
    saveData.xp -= xpForLevel(saveData.level);
    saveData.level++;
    leveledUp = true;
    // 新グッズを解放
    const goods = RELAX_GOODS.find(g => g.level === saveData.level);
    if (goods && !saveData.unlockedGoods.includes(goods.level)) {
      saveData.unlockedGoods.push(goods.level);
      newGoods = goods;
    }
  }

  // メダルチェック
  const newMedals = checkMedals();

  saveSave(saveData);

  // 勝利画面へ遷移
  showVictoryScreen(gainedXp, newMedals, leveledUp, newGoods);
}

function getPreviousDay() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toDateString();
}

// =========================================================
//  メダルチェック
// =========================================================
function checkMedals() {
  const newlyEarned = [];
  MEDALS.forEach(medal => {
    if (saveData.medals.includes(medal.id)) return; // 既に取得済み

    let earned = false;
    if (medal.threshold !== null) {
      earned = saveData.totalWins >= medal.threshold;
    } else if (medal.special) {
      if (medal.id === 'easy3')  earned = (saveData.winsByDifficulty.easy || 0) >= 3;
      if (medal.id === 'hard1')  earned = (saveData.winsByDifficulty.hard || 0) >= 1;
    }

    if (earned) {
      saveData.medals.push(medal.id);
      newlyEarned.push(medal);
    }
  });
  return newlyEarned;
}

// =========================================================
//  勝利画面 レンダリング
// =========================================================
function showVictoryScreen(xp, newMedals, leveledUp, newGoods) {
  showScreen('screen-victory');

  // 敵スプライト
  document.getElementById('victory-enemy').innerHTML = `<div style="width:100px;height:100px;margin:0 auto;">${buildAvatarHTML(state.selectedEnemy, false)}</div>`;

  // タイトル・メッセージ
  document.getElementById('victory-title').textContent = '撃破！！';
  document.getElementById('victory-msg').textContent = state.selectedEnemy.defeatMsg;

  // XP
  document.getElementById('reward-xp').textContent = xp;

  // 爆発パーティクル
  createExplosionParticles();

  // 新メダル
  const medalPopup = document.getElementById('new-medal-popup');
  if (newMedals.length > 0) {
    medalPopup.style.display = 'block';
    document.getElementById('new-medal-icon').textContent = newMedals[0].icon;
  } else {
    medalPopup.style.display = 'none';
  }

  // 新グッズ
  const goodsPopup = document.getElementById('new-goods-popup');
  if (newGoods) {
    goodsPopup.style.display = 'block';
    document.getElementById('new-goods-icon').textContent = newGoods.icon;
    document.getElementById('new-goods-name').textContent = newGoods.name;
  } else {
    goodsPopup.style.display = 'none';
  }

  // レベルアップモーダル（少し遅延させて表示）
  if (leveledUp) {
    setTimeout(() => showLevelUpModal(), 2000);
  }
}

function createExplosionParticles() {
  const container = document.getElementById('explosion-particles');
  container.innerHTML = '';
  const colors = ['#FFD740', '#FF8C42', '#B08AFF', '#5AB4FF', '#4FCB7A'];
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const angle = (i / 12) * Math.PI * 2;
    const dist = 60 + Math.random() * 40;
    p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    p.style.background = colors[i % colors.length];
    container.appendChild(p);
  }
}

// =========================================================
//  レベルアップモーダル
// =========================================================
function showLevelUpModal() {
  document.getElementById('levelup-new-level').textContent = saveData.level;
  const goods = RELAX_GOODS.find(g => g.level === saveData.level) || { icon: '🎁', name: 'サプライズ' };
  document.getElementById('levelup-goods-icon').textContent = goods.icon;
  document.getElementById('levelup-goods-name').textContent = goods.name;
  document.getElementById('levelup-modal').style.display = 'flex';
}

function closeLevelUpModal() {
  document.getElementById('levelup-modal').style.display = 'none';
}

// =========================================================
//  メダル図鑑 レンダリング
// =========================================================
function renderMedals() {
  const grid = document.getElementById('medals-grid');
  grid.innerHTML = '';
  MEDALS.forEach(medal => {
    const earned = saveData.medals.includes(medal.id);
    const card = document.createElement('div');
    card.className = 'medal-card' + (earned ? '' : ' locked');
    card.innerHTML = `
      <div class="medal-card-icon">${medal.icon}</div>
      <div class="medal-card-name">${medal.name}</div>
      <div class="medal-card-cond">${medal.condition}</div>
    `;
    grid.appendChild(card);
  });
}

// =========================================================
//  グッズ図鑑 レンダリング
// =========================================================
function renderGoods() {
  const grid = document.getElementById('goods-grid');
  grid.innerHTML = '';
  RELAX_GOODS.forEach(goods => {
    const unlocked = saveData.unlockedGoods.includes(goods.level);
    const card = document.createElement('div');
    card.className = 'goods-card' + (unlocked ? '' : ' locked');
    card.innerHTML = `
      <div class="goods-card-icon">${goods.icon}</div>
      <div class="goods-card-name">${goods.name}</div>
      <div class="goods-card-unlock">${unlocked ? goods.desc : `Lv.${goods.level}で解放`}</div>
    `;
    grid.appendChild(card);
  });
}

// =========================================================
//  SVGグラデーション定義（タイマー用）
// =========================================================
function addSvgDefs() {
  const svg = document.querySelector('.timer-svg');
  if (!svg) return;
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `
    <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#5AB4FF"/>
      <stop offset="50%"  stop-color="#B08AFF"/>
      <stop offset="100%" stop-color="#FFD740"/>
    </linearGradient>
  `;
  svg.prepend(defs);
}

// =========================================================
//  初期化
// =========================================================
function init() {
  addSvgDefs();
  showScreen('screen-home');
}

// 実行
init();