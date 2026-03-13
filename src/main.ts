// ===== OCDダンジョン メインスクリプト =====
// 設計書 Ver 1.0 に基づき実装（TypeScript版）

export {};

// =========================================================
//  型定義
// =========================================================

/** 敵キャラクター */
interface Enemy {
  id: string;
  name: string;
  category: string;
  desc: string;
  color: string;
  avatarType: 'img' | 'svg';
  avatarSrc?: string;   // avatarType === 'img' のとき使用
  avatarSvg?: string;   // avatarType === 'svg' のとき使用
  speechLines: string[];
  defeatMsg: string;
}

/** 難易度設定 */
interface Difficulty {
  label: string;
  seconds: number;
  xp: number;
}

/** メダルデータ */
interface Medal {
  id: string;
  icon: string;
  name: string;
  condition: string;
  threshold: number | null;
  special?: boolean;
}

/** リラックスグッズ */
interface RelaxGood {
  level: number;
  icon: string;
  name: string;
  desc: string;
  style: string;
}

/** セーブデータ */
interface SaveData {
  totalWins: number;
  medals: string[];
  level: number;
  xp: number;
  unlockedGoods: number[];
  streak: number;
  lastPlayDate: string | null;
  winsByDifficulty: { easy: number; normal: number; hard: number };
  winsByEnemy: Record<string, number>;
}

/** ゲーム状態 */
interface GameState {
  currentScreen: string;
  selectedEnemy: Enemy | null;
  selectedDifficulty: 'easy' | 'normal' | 'hard' | null;
  timerInterval: ReturnType<typeof setInterval> | null;
  speechInterval: ReturnType<typeof setInterval> | null;
  timerRemaining: number;
  timerMax: number;
}

// =========================================================
//  敵キャラクターデータ
// =========================================================
const ENEMIES: Enemy[] = [
  {
    id: 'jirorin',
    name: 'ジロリン',
    category: '確認',
    desc: 'たくさんの目で隅々まで確認しようとする…',
    color: '#B2D8FF',
    avatarType: 'svg',
    avatarSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gradJiro" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFF9C4" />
          <stop offset="100%" stop-color="#FFD54F" />
        </radialGradient>
      </defs>
      <!-- 体（ゆらゆらした形） -->
      <path d="M 50 85 C 20 85 15 65 20 45 C 25 25 40 15 55 18 C 70 20 85 35 82 55 C 80 75 70 85 50 85 Z" fill="url(#gradJiro)" opacity="0.9" />
      <!-- 目（たくさん） -->
      <circle cx="35" cy="40" r="10" fill="white" />
      <circle cx="36" cy="41" r="5" fill="#5D4037" />
      <circle cx="65" cy="35" r="8" fill="white" />
      <circle cx="66" cy="36" r="4" fill="#5D4037" />
      <circle cx="50" cy="55" r="7" fill="white" />
      <circle cx="51" cy="56" r="3.5" fill="#5D4037" />
      <circle cx="30" cy="65" r="6" fill="white" />
      <circle cx="31" cy="66" r="3" fill="#5D4037" />
      <!-- 虫眼鏡の手 -->
      <circle cx="75" cy="65" r="10" fill="none" stroke="#8D6E63" stroke-width="2" />
      <line x1="82" y1="72" x2="90" y2="80" stroke="#8D6E63" stroke-width="4" stroke-linecap="round" />
    </svg>`,
    speechLines: [
      'ゆっくり鼻から吸って…',
      '３秒止めて、細く吐こう',
      '周りの音を３つ選んでみて',
      '今、椅子に触れている感覚を…',
    ],
    defeatMsg: 'ジロリンが静まった。心に穏やかな風が吹いている。',
  },
  {
    id: 'dororu',
    name: 'ドロル',
    category: '不潔・洗浄',
    desc: '全身泥んこ。触るものを全部汚したがる…',
    color: '#D4A57E',
    avatarType: 'svg',
    avatarSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 88 C 20 88 10 75 15 55 C 20 35 35 25 50 25 C 65 25 80 35 85 55 C 90 75 80 88 50 88 Z" fill="#8D6E63" />
      <!-- 泥のポタポタ -->
      <circle cx="30" cy="85" r="8" fill="#8D6E63" />
      <circle cx="70" cy="85" r="10" fill="#8D6E63" />
      <!-- 目（ちょっと困り顔） -->
      <circle cx="40" cy="50" r="8" fill="white" />
      <circle cx="42" cy="52" r="4" fill="#5D4037" />
      <circle cx="60" cy="50" r="8" fill="white" />
      <circle cx="62" cy="52" r="4" fill="#5D4037" />
      <path d="M 45 68 Q 50 63 55 68" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" />
    </svg>`,
    speechLines: [
      '自分の手のひらを見つめて…',
      '指先のあたたかさを感じよう',
      '足の裏が地面に着く感覚…',
      'ゆっくりと、深く呼吸して',
    ],
    defeatMsg: 'ドロルが消えていく。自分自身が守られている安心感。',
  },
  {
    id: 'chiguhagu',
    name: 'チグハグ',
    category: '縁起・儀式',
    desc: '左右非対称のまま。完璧にしようとしてイライラ…',
    color: '#A5D6A7',
    avatarType: 'svg',
    avatarSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="30" width="30" height="40" fill="#81C784" rx="4" />
      <rect x="50" y="45" width="25" height="35" fill="#4CAF50" rx="2" />
      <circle cx="35" cy="20" r="10" fill="#FFEB3B" />
      <!-- 目（非対称） -->
      <circle cx="40" cy="45" r="6" fill="white" />
      <circle cx="40" cy="45" r="3" fill="#5D4037" />
      <rect x="58" y="55" width="10" height="4" fill="white" />
      <rect x="62" y="55" width="4" height="4" fill="#5D4037" />
    </svg>`,
    speechLines: [
      '目の前のものの形を観察しよう',
      '色のグラデーションを見てみて',
      '肩の力を、すとん、と抜いて',
      '今の自分に「大丈夫」と言おう',
    ],
    defeatMsg: 'チグハグが調和した。不完全なままで完璧なんだ。',
  },
  {
    id: 'bosori',
    name: 'ボソリ',
    category: '加害・不道徳',
    desc: '耳元でいじわるな囁きをしてくる小さな影…',
    color: '#CE93D8',
    avatarType: 'svg',
    avatarSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- 影（ふわっとした紫） -->
      <path d="M 50 85 C 20 85 10 70 15 50 C 20 30 35 15 50 15 C 65 15 80 30 85 50 C 90 70 80 85 50 85 Z" fill="#BA68C8" opacity="0.8" />
      <!-- 目（ジト目） -->
      <path d="M 30 45 Q 40 40 50 45" stroke="white" stroke-width="2" fill="none" />
      <path d="M 50 45 Q 60 40 70 45" stroke="white" stroke-width="2" fill="none" />
      <circle cx="40" cy="50" r="3" fill="white" />
      <circle cx="60" cy="50" r="3" fill="white" />
      <!-- 囁き -->
      <path d="M 75 40 Q 85 35 80 30" stroke="#E1BEE7" stroke-width="1.5" fill="none" />
    </svg>`,
    speechLines: [
      '遠くの声や音に耳を澄ませて',
      '肺が膨らむのを感じよう',
      '優しい光に包まれている空想を',
      '心臓の鼓動を、静かに感じて',
    ],
    defeatMsg: 'ボソリの囁きが消えた。静寂と平安が戻ってきた。',
  },
];

// =========================================================
//  難易度設定（タイマー秒数・獲得XP）
// =========================================================
const DIFFICULTIES: Record<string, Difficulty> = {
  easy:   { label: 'よわい',   seconds: 30,  xp: 10 },
  normal: { label: 'ふつう', seconds: 90,  xp: 25 },
  hard:   { label: 'つよい',   seconds: 180, xp: 50 },
};

// =========================================================
//  メダルデータ
// =========================================================
const MEDALS: Medal[] = [
  { id: 'first',   icon: '⚔️',  name: '初出陣',       condition: '初めての勝利',    threshold: 1   },
  { id: 'five',    icon: '🥉',  name: '5回クリア',    condition: '5回勝利する',      threshold: 5   },
  { id: 'ten',     icon: '🥈',  name: '10回クリア',   condition: '10回勝利する',     threshold: 10  },
  { id: 'twenty',  icon: '🥇',  name: '20回クリア',   condition: '20回勝利する',     threshold: 20  },
  { id: 'fifty',   icon: '🏆',  name: '50回クリア',   condition: '50回勝利する',     threshold: 50  },
  { id: 'hundred', icon: '👑',  name: '勇者の称号',   condition: '100回勝利する',   threshold: 100 },
  { id: 'easy3',   icon: '🌱',  name: '小さな一歩',   condition: 'よわいを3回クリア', threshold: null, special: true },
  { id: 'hard1',   icon: '🔥',  name: '本気の挑戦',   condition: 'つよいに1回勝つ',  threshold: null, special: true },
];

// =========================================================
//  リラックスグッズデータ（レベルアップ報酬）
// =========================================================
const RELAX_GOODS: RelaxGood[] = [
  { level: 2,  icon: '☕',  name: 'ホットコーヒー',       desc: 'ほんのり温かい一杯',      style: 'bottom:10%; left:10%' },
  { level: 3,  icon: '🕯️', name: 'アロマキャンドル',     desc: 'やわらかな香りが広がる',  style: 'bottom:30%; right:8%' },
  { level: 4,  icon: '🛋️', name: 'ふかふかクッション',   desc: 'もふもふで心地よい',      style: 'bottom:5%; right:20%' },
  { level: 5,  icon: '🌿',  name: 'ちいさな観葉植物',    desc: '緑が癒しをくれる',        style: 'bottom:15%; left:35%' },
  { level: 6,  icon: '📚',  name: 'お気に入りの本',       desc: '読むたびほっとする',      style: 'bottom:40%; left:5%' },
  { level: 7,  icon: '🎵',  name: 'レコードプレイヤー',  desc: 'のんびりした音楽',        style: 'bottom:60%; right:10%' },
  { level: 8,  icon: '🌙',  name: 'ムーンランプ',         desc: '夜を照らすやさしい光',    style: 'bottom:70%; left:8%' },
  { level: 9,  icon: '🧸',  name: 'くまのぬいぐるみ',    desc: 'そっと抱きしめよう',      style: 'bottom:20%; right:35%' },
  { level: 10, icon: '🛁',  name: 'バブルバス',           desc: 'ゆっくりお風呂でリラックス', style: 'bottom:5%; left:50%' },
];

// XPテーブル（レベルに必要なXP累計）
function xpForLevel(level: number): number {
  return level * 100; // Lv1→2: 100XP, Lv2→3: 200XP, ...
}

// =========================================================
//  ゲーム状態
// =========================================================
let state: GameState = {
  currentScreen: 'screen-home',
  selectedEnemy: null,
  selectedDifficulty: null,
  timerInterval: null,
  speechInterval: null,
  timerRemaining: 0,
  timerMax: 0,
};

// =========================================================
//  セーブデータ（LocalStorage）
// =========================================================
const SAVE_KEY = 'ocd_dungeon_save';

function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) return JSON.parse(raw) as SaveData;
  } catch (_e) { /* ignore */ }
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

function saveSave(data: SaveData): void {
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

let saveData: SaveData = loadSave();

// =========================================================
//  ユーティリティ: DOM取得ヘルパー
// =========================================================
function getEl(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element #${id} not found`);
  return el;
}

// =========================================================
//  画面切り替え
// =========================================================
function showScreen(id: string): void {
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
function renderHome(): void {
  // レベル・XPバー
  getEl('player-level').textContent = String(saveData.level);
  const xpNeeded = xpForLevel(saveData.level);
  const xpRatio = Math.min(saveData.xp / xpNeeded, 1);
  (getEl('xp-bar') as HTMLElement).style.width = (xpRatio * 100) + '%';
  getEl('xp-current').textContent = String(saveData.xp);
  getEl('xp-max').textContent = String(xpNeeded);

  // 統計
  getEl('total-wins').textContent = String(saveData.totalWins);
  getEl('total-medals').textContent = String(saveData.medals.length);
  getEl('streak-count').textContent = String(saveData.streak);

  // 部屋の家具（グッズ）を配置
  renderRoomGoods();
}

function renderRoomGoods(): void {
  const room = getEl('home-room');
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
function renderEnemySelect(): void {
  const grid = getEl('enemy-grid');
  grid.innerHTML = '';
  ENEMIES.forEach(enemy => {
    const card = document.createElement('div');
    card.className = 'enemy-card';
    card.dataset['id'] = enemy.id;
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

function buildAvatarHTML(enemy: Enemy, large = false): string {
  if (enemy.avatarType === 'img' && enemy.avatarSrc) {
    return `<img src="${enemy.avatarSrc}" alt="${enemy.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
            <div style="display:none;font-size:${large ? '5rem' : '3rem'};text-align:center;">👁️</div>`;
  } else if (enemy.avatarType === 'svg' && enemy.avatarSvg) {
    return enemy.avatarSvg;
  }
  return `<span style="font-size:${large ? '5rem' : '3rem'};">🌫️</span>`;
}

function selectEnemy(enemy: Enemy): void {
  state.selectedEnemy = enemy;
  showScreen('screen-difficulty');
  renderDifficultyScreen();
}

function selectCustomEnemy(): void {
  const nameEl = document.getElementById('custom-name') as HTMLInputElement | null;
  if (!nameEl) return;
  const name = nameEl.value.trim();
  if (!name) {
    nameEl.focus();
    nameEl.style.borderColor = '#FF5252';
    setTimeout(() => { nameEl.style.borderColor = ''; }, 1000);
    return;
  }
  const customEnemy: Enemy = {
    id: 'custom',
    name,
    category: 'カスタム',
    desc: 'あなただけのオリジナル強迫観念',
    color: '#D0E8D0',
    avatarType: 'svg',
    avatarSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- 虹色の雲（ナナシ風） -->
      <defs>
        <linearGradient id="gradRain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFCDD2" />
          <stop offset="50%" stop-color="#E1BEE7" />
          <stop offset="100%" stop-color="#BBDEFB" />
        </radialGradient>
      </defs>
      <path d="M 50 85 C 20 85 10 70 15 50 C 20 30 35 15 50 15 C 65 15 80 30 85 50 C 90 70 80 85 50 85 Z" fill="url(#gradRain)" opacity="0.7" />
      <circle cx="40" cy="50" r="6" fill="white" />
      <circle cx="42" cy="52" r="3" fill="#5D4037" />
      <circle cx="60" cy="50" r="6" fill="white" />
      <circle cx="62" cy="52" r="3" fill="#5D4037" />
      <!-- カスタムタグ -->
      <rect x="70" y="60" width="20" height="12" fill="white" stroke="#8D6E63" />
      <text x="80" y="69" text-anchor="middle" font-size="6" fill="#8D6E63">custom</text>
    </svg>`,
    speechLines: ['今、この瞬間に集中しよう', '心の中に静かな湖をイメージ', '自分のペースで大丈夫だよ'],
    defeatMsg: `${name}が落ち着いた。あなたは自分を整えることができた。`,
  };
  state.selectedEnemy = customEnemy;
  showScreen('screen-difficulty');
  renderDifficultyScreen();
}

// =========================================================
//  難易度選択画面 レンダリング
// =========================================================
function renderDifficultyScreen(): void {
  const preview = getEl('selected-enemy-preview');
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
function startBattle(difficulty: string): void {
  state.selectedDifficulty = difficulty as 'easy' | 'normal' | 'hard';
  const diffConf = DIFFICULTIES[difficulty];
  state.timerMax = diffConf.seconds;
  state.timerRemaining = diffConf.seconds;

  showScreen('screen-battle');
  setupBattleScreen();
  startTimer();
}

function setupBattleScreen(): void {
  const enemy = state.selectedEnemy;
  if (!enemy) return;

  // 敵名・スプライト
  getEl('battle-enemy-name').textContent = enemy.name;
  getEl('enemy-sprite').innerHTML = buildAvatarHTML(enemy, true);

  // ランダムな台詞
  const speechEl = getEl('enemy-speech-bubble');
  const line = enemy.speechLines[Math.floor(Math.random() * enemy.speechLines.length)];
  speechEl.textContent = line;

  // 台詞を一定間隔で変える
  if (state.speechInterval !== null) clearInterval(state.speechInterval);
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
function startTimer(): void {
  if (state.timerInterval !== null) clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    state.timerRemaining--;
    const progress = 1 - state.timerRemaining / state.timerMax;
    updateChargeBar(progress);
    updateTimerDisplay(state.timerRemaining, state.timerMax);

    // 敵が弱ってくるエフェクト（50%以上で敵を揺らす）
    if (progress >= 0.5 && progress <= 0.52) {
      const sprite = getEl('enemy-sprite');
      sprite.classList.add('enemy-shake');
      setTimeout(() => sprite.classList.remove('enemy-shake'), 500);
    }

    if (state.timerRemaining <= 0) {
      if (state.timerInterval !== null) clearInterval(state.timerInterval);
      if (state.speechInterval !== null) clearInterval(state.speechInterval);
      triggerVictory();
    }
  }, 1000);
}

function updateChargeBar(ratio: number): void {
  const pct = Math.round(ratio * 100);
  (getEl('charge-bar') as HTMLElement).style.width = pct + '%';
  getEl('charge-percent').textContent = pct + '%';
}

function updateTimerDisplay(remaining: number, max: number): void {
  getEl('timer-text').textContent = String(remaining);
  const circumference = 2 * Math.PI * 45; // 約283
  const offset = circumference * (1 - remaining / max);
  (getEl('timer-progress') as SVGCircleElement & HTMLElement).style.strokeDashoffset = String(offset);

  // タイマーの色：残り少ないほど赤みが増す
  const ratio = remaining / max;
  const r = Math.round(90 + (1 - ratio) * 165);
  const g = Math.round(140 - (1 - ratio) * 100);
  const b = Math.round(255 - (1 - ratio) * 255);
  (getEl('timer-progress') as SVGCircleElement & HTMLElement).style.stroke = `rgb(${r},${g},${b})`;
}

// =========================================================
//  戦闘撤退
// =========================================================
function retreatBattle(): void {
  // タイマーを一時停止
  if (state.timerInterval !== null) clearInterval(state.timerInterval);
  if (state.speechInterval !== null) clearInterval(state.speechInterval);
  getEl('retreat-modal').style.display = 'flex';
}

function confirmRetreat(): void {
  closeRetreatModal();
  showScreen('screen-home');
}

function closeRetreatModal(): void {
  getEl('retreat-modal').style.display = 'none';
  // タイマーが残っていれば再開
  if (state.timerRemaining > 0 && state.currentScreen === 'screen-battle') {
    startTimer();
  }
}

// =========================================================
//  勝利処理
// =========================================================
function triggerVictory(): void {
  // セーブデータ更新
  const diff = DIFFICULTIES[state.selectedDifficulty ?? 'normal'];
  const gainedXp = diff.xp;

  saveData.totalWins++;
  if (state.selectedDifficulty) {
    saveData.winsByDifficulty[state.selectedDifficulty]++;
  }
  const enemyId = state.selectedEnemy?.id ?? 'unknown';
  saveData.winsByEnemy[enemyId] = (saveData.winsByEnemy[enemyId] ?? 0) + 1;

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
  let newGoods: RelaxGood | null = null;
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

function getPreviousDay(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toDateString();
}

// =========================================================
//  メダルチェック
// =========================================================
function checkMedals(): Medal[] {
  const newlyEarned: Medal[] = [];
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
function showVictoryScreen(xp: number, newMedals: Medal[], leveledUp: boolean, newGoods: RelaxGood | null): void {
  showScreen('screen-victory');

  // 敵スプライト
  getEl('victory-enemy').innerHTML = `<div style="width:100px;height:100px;margin:0 auto;">${buildAvatarHTML(state.selectedEnemy!, false)}</div>`;

  // タイトル・メッセージ
  getEl('victory-title').textContent = '撃破！！';
  getEl('victory-msg').textContent = state.selectedEnemy?.defeatMsg ?? '';

  // XP
  getEl('reward-xp').textContent = String(xp);

  // 爆発パーティクル
  createExplosionParticles();

  // 新メダル
  const medalPopup = getEl('new-medal-popup');
  if (newMedals.length > 0) {
    medalPopup.style.display = 'block';
    getEl('new-medal-icon').textContent = newMedals[0].icon;
  } else {
    medalPopup.style.display = 'none';
  }

  // 新グッズ
  const goodsPopup = getEl('new-goods-popup');
  if (newGoods) {
    goodsPopup.style.display = 'block';
    getEl('new-goods-icon').textContent = newGoods.icon;
    getEl('new-goods-name').textContent = newGoods.name;
  } else {
    goodsPopup.style.display = 'none';
  }

  // レベルアップモーダル（少し遅延させて表示）
  if (leveledUp) {
    setTimeout(() => showLevelUpModal(), 2000);
  }
}

function createExplosionParticles(): void {
  const container = getEl('explosion-particles');
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
function showLevelUpModal(): void {
  getEl('levelup-new-level').textContent = String(saveData.level);
  const goods = RELAX_GOODS.find(g => g.level === saveData.level) ?? { icon: '🎁', name: 'サプライズ' };
  getEl('levelup-goods-icon').textContent = goods.icon;
  getEl('levelup-goods-name').textContent = goods.name;
  getEl('levelup-modal').style.display = 'flex';
}

function closeLevelUpModal(): void {
  getEl('levelup-modal').style.display = 'none';
}

// =========================================================
//  メダル図鑑 レンダリング
// =========================================================
function renderMedals(): void {
  const grid = getEl('medals-grid');
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
function renderGoods(): void {
  const grid = getEl('goods-grid');
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
function addSvgDefs(): void {
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
//  グローバルへ公開（index.html の onclick 属性から呼ばれる関数）
// =========================================================
declare global {
  interface Window {
    showScreen: typeof showScreen;
    startBattle: typeof startBattle;
    retreatBattle: typeof retreatBattle;
    confirmRetreat: typeof confirmRetreat;
    closeRetreatModal: typeof closeRetreatModal;
    closeLevelUpModal: typeof closeLevelUpModal;
    selectCustomEnemy: typeof selectCustomEnemy;
  }
}
window.showScreen      = showScreen;
window.startBattle     = startBattle;
window.retreatBattle   = retreatBattle;
window.confirmRetreat  = confirmRetreat;
window.closeRetreatModal = closeRetreatModal;
window.closeLevelUpModal = closeLevelUpModal;
window.selectCustomEnemy = selectCustomEnemy;

// =========================================================
//  初期化
// =========================================================
function init(): void {
  addSvgDefs();
  showScreen('screen-home');
}

// 実行
init();
