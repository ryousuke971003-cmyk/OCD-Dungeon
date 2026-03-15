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
  hp: number;
  coins: number;
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
  id: string;
  price: number;
  icon: string;
  name: string;
  desc: string;
  style: string;
}

/** セーブデータ */
interface SaveData {
  totalWins: number;
  medals: string[];
  coins: number;
  unlockedGoods: string[];
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
  chargeRemaining: number;
  chargeMax: number;
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
  easy:   { label: 'よわい',   hp: 30,  coins: 5 },
  normal: { label: 'ふつう', hp: 100,  coins: 15 },
  hard:   { label: 'つよい',   hp: 250, coins: 30 },
};

// =========================================================
//  メダルデータ
// =========================================================
const MEDALS: Medal[] = [
  { id: 'first',   icon: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#FFD740" d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M256,464C141.3,464,48,370.7,48,256S141.3,48,256,48s208,93.3,208,208S370.7,464,256,464z"/><path fill="#FFD740" d="M256,80c-97,0-176,79-176,176s79,176,176,176s176-79,176-176S353,80,256,80z M256,416c-88.2,0-160-71.8-160-160s71.8-160,160-160s160,71.8,160,160S344.2,416,256,416z"/><g transform="translate(140, 140) scale(0.45)"><path fill="#FFD740" d="M256,120.07L145.016,12.742C131.953,0.102,112.594-3.492,95.844,3.586 c-16.734,7.109-27.609,23.531-27.609,41.719v274c0,18.406,7.469,36.031,20.703,48.844L224.5,499.258 c17.563,16.984,45.438,16.984,62.984,0l135.578-131.109c13.234-12.813,20.703-30.438,20.703-48.844v-274 c0-18.188-10.875-34.609-27.609-41.719c-16.75-7.078-36.109-3.484-49.172,9.156L256,120.07z M379.844,311.414 c0,6.141-2.484,12.016-6.906,16.281L256,440.805V209.008l22.219-21.5l82.438-79.719c3.25-3.156,8.109-4.063,12.281-2.281 c4.188,1.766,6.906,5.875,6.906,10.422V311.414z"/></g></svg>`, name: '勇気の一歩',       condition: '初めての勝利',    threshold: 1   },
  { id: 'five',    icon: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#FFD740" d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M256,464C141.3,464,48,370.7,48,256S141.3,48,256,48s208,93.3,208,208S370.7,464,256,464z"/><path fill="#FFD740" d="M256,80c-97,0-176,79-176,176s79,176,176,176s176-79,176-176S353,80,256,80z M256,416c-88.2,0-160-71.8-160-160s71.8-160,160-160s160,71.8,160,160S344.2,416,256,416z"/><text x="256" y="320" text-anchor="middle" font-size="200" fill="#FFD740" font-weight="bold" font-family="'M PLUS Rounded 1c', sans-serif">5</text></svg>`, name: '歩みの轍（わだち）',    condition: '5回勝利する',      threshold: 5   },
  { id: 'ten',     icon: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#FFD740" d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M256,464C141.3,464,48,370.7,48,256S141.3,48,256,48s208,93.3,208,208S370.7,464,256,464z"/><path fill="#FFD740" d="M256,80c-97,0-176,79-176,176s79,176,176,176s176-79,176-176S353,80,256,80z M256,416c-88.2,0-160-71.8-160-160s71.8-160,160-160s160,71.8,160,160S344.2,416,256,416z"/><text x="254" y="320" text-anchor="middle" font-size="180" fill="#FFD740" font-weight="bold" font-family="'M PLUS Rounded 1c', sans-serif">10</text></svg>`, name: '調律の初等術',   condition: '10回勝利する',     threshold: 10  },
  { id: 'twenty',  icon: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#FFD740" d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M256,464C141.3,464,48,370.7,48,256S141.3,48,256,48s208,93.3,208,208S370.7,464,256,464z"/><path fill="#FFD740" d="M256,80c-97,0-176,79-176,176s79,176,176,176s176-79,176-176S353,80,256,80z M256,416c-88.2,0-160-71.8-160-160s71.8-160,160-160s160,71.8,160,160S344.2,416,256,416z"/><text x="254" y="320" text-anchor="middle" font-size="180" fill="#FFD740" font-weight="bold" font-family="'M PLUS Rounded 1c', sans-serif">20</text></svg>`, name: '向かい風の灯火',   condition: '20回勝利する',     threshold: 20  },
  { id: 'fifty',   icon: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#FFD740" d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M256,464C141.3,464,48,370.7,48,256S141.3,48,256,48s208,93.3,208,208S370.7,464,256,464z"/><path fill="#FFD740" d="M256,80c-97,0-176,79-176,176s79,176,176,176s176-79,176-176S353,80,256,80z M256,416c-88.2,0-160-71.8-160-160s71.8-160,160-160s160,71.8,160,160S344.2,416,256,416z"/><text x="254" y="320" text-anchor="middle" font-size="180" fill="#FFD740" font-weight="bold" font-family="'M PLUS Rounded 1c', sans-serif">50</text></svg>`, name: '静かなる自信',   condition: '50回勝利する',     threshold: 50  },
  { id: 'hundred', icon: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#FFD740" d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M256,464C141.3,464,48,370.7,48,256S141.3,48,256,48s208,93.3,208,208S370.7,464,256,464z"/><path fill="#FFD740" d="M256,80c-97,0-176,79-176,176s79,176,176,176s176-79,176-176S353,80,256,80z M256,416c-88.2,0-160-71.8-160-160s71.8-160,160-160s160,71.8,160,160S344.2,416,256,416z"/><g transform="translate(140, 140) scale(0.45)"><path fill="#FFD740" d="M34.039,284.391c-0.641-0.516-1.531-0.609-2.266-0.234s-1.172,1.156-1.109,2l3.219,50.531 c0.078,0.906-0.453,1.734-1.297,2.063L1.32,351.188c-0.719,0.281-1.219,0.938-1.313,1.703c-0.078,0.766,0.266,1.516,0.891,1.953 L84.82,405.75c0.578,0.406,1.328,0.5,1.969,0.219c0.672-0.266,1.141-0.859,1.266-1.563l12.641-71.891 c0.141-0.734-0.156-1.5-0.734-1.984L34.039,284.391z"/><path fill="#FFD740" d="M510.695,351.188l-31.281-12.438c-0.828-0.328-1.359-1.156-1.313-2.063l3.25-50.531 c0.047-0.844-0.391-1.625-1.125-2s-1.625-0.281-2.266,0.234l-65.922,46.141c-0.578,0.484-0.875,1.25-0.734,1.984l12.656,71.891 c0.109,0.703,0.578,1.297,1.234,1.563c0.672,0.281,1.407,0.188,2-0.219l83.906-50.906c0.641-0.438,0.969-1.188,0.891-1.953 C511.898,352.125,511.398,351.469,510.695,351.188z"/><path fill="#FFD740" d="M255.992,398.828c-48.422,0-94.266-11.25-135.109-31.203l-13.156,74.75 c45.609,19.281,95.719,29.938,148.266,29.938s102.672-10.656,148.281-29.938l-13.172-74.75 C350.289,387.578,304.445,398.828,255.992,398.828z"/><path fill="#FFD740" d="M148.945,346.609c30.828,12.875,66,19.156,107.047,19.156c41.063,0,76.219-6.281,107.078-19.156 c3.891-1.625-1.406-31.609-1.406-31.609c-29.438,14.375-64,21.375-105.672,21.375s-76.219-7-105.656-21.375 C150.335,315,145.039,344.984,148.945,346.609z"/><path fill="#FFD740" d="M255.82,317.531c3.797,0,6.875-3.094,6.875-6.891s-3.078-6.891-6.875-6.891c-3.813,0-6.906,3.094-6.906,6.891 S252.007,317.531,255.82,317.531z"/><polygon fill="#FFD740" points="244.148,117.5 267.476,117.5 267.476,90.281 294.726,90.281 294.726,66.922 267.476,66.922 267.476,39.688 244.148,39.688 244.148,66.922 216.898,66.922 216.898,90.281 244.148,90.281 "/><path fill="#FFD740" d="M255.82,290.438c3.797,0,6.875-3.078,6.875-6.875c0-3.813-3.078-6.906-6.875-6.906 c-3.813,0-6.906,3.094-6.906,6.906C248.914,287.359,252.007,290.438,255.82,290.438z"/><path fill="#FFD740" d="M255.992,249.578c-3.797,0-6.891,3.109-6.891,6.906s3.094,6.891,6.891,6.891c3.813,0,6.906-3.094,6.906-6.891 S259.804,249.578,255.992,249.578z"/><path fill="#FFD740" d="M255.992,222.5c-3.797,0-6.891,3.094-6.891,6.906s3.094,6.875,6.891,6.875c3.813,0,6.906-3.063,6.906-6.875 S259.804,222.5,255.992,222.5z"/><path fill="#FFD740" d="M255.992,195.438c-3.797,0-6.891,3.094-6.891,6.891c0,3.813,3.094,6.891,6.891,6.891 c3.813,0,6.906-3.078,6.906-6.891C262.898,198.531,259.804,195.438,255.992,195.438z"/><path fill="#FFD740" d="M255.992,168.359c-3.797,0-6.891,3.078-6.891,6.891c0,3.797,3.094,6.891,6.891,6.891 c3.813,0,6.906-3.094,6.906-6.891C262.898,171.438,259.804,168.359,255.992,168.359z"/><path fill="#FFD740" d="M255.82,141.281c-3.813,0-6.906,3.078-6.906,6.875c0,3.813,3.094,6.906,6.906,6.906 c3.797,0,6.875-3.094,6.875-6.906C262.695,144.359,259.617,141.281,255.82,141.281z"/><path fill="#FFD740" d="M215.164,313.844c4.734,1.703,14.844,2.156,20.672,2.156v-18.359v-135c0-23.266-22.594-32.578-42.422-28.734 c-12.234,2.391-31.969,15.938-28.359,44.063C169.945,216.188,193.71,277.438,215.164,313.844z"/><path fill="#FFD740" d="M187.789,309.469c-14.75-23.313-43.797-88.969-47.875-135.625c-0.578-6.688-0.234-9.656-0.234-9.656 c-0.047-1.938-1.141-3.688-2.859-4.563c-1.719-0.891-3.781-0.766-5.375,0.313c0,0-4.734,1.875-10.094,6.813 c-27.906,25.719-26.844,75.766,17.422,126.906C151.632,299.656,167.976,305.344,187.789,309.469z"/><path fill="#FFD740" d="M276.164,162.641v135V316c5.828,0,15.938-0.453,20.688-2.156c21.422-36.406,45.203-97.656,50.094-135.875 c3.594-28.125-16.109-41.672-28.359-44.063C298.773,130.063,276.164,139.375,276.164,162.641z"/><path fill="#FFD740" d="M380.554,159.938c-1.594-1.078-3.656-1.203-5.359-0.313c-1.734,0.875-2.813,2.625-2.875,4.563 c0,0,0.344,2.969-0.234,9.656c-4.078,46.656-33.141,112.313-47.875,135.625c19.828-4.125,36.172-9.813,49.016-15.813 c44.266-51.141,45.328-101.188,17.422-126.906C385.304,161.813,380.554,159.938,380.554,159.938z"/><polygon fill="#FFD740" points="45.523,233 58.539,226.156 71.539,233 69.054,218.516 79.57,208.25 65.039,206.156 58.539,192.969 52.039,206.156 37.492,208.25 48.007,218.516 "/><polygon fill="#FFD740" points="116.195,128.953 129.195,122.125 142.195,128.953 139.71,114.469 150.242,104.219 135.695,102.094 129.195,88.938 122.695,102.094 108.148,104.219 118.679,114.469 "/><polygon fill="#FFD740" points="440.477,233 453.477,226.156 466.477,233 464.008,218.516 474.523,208.25 459.977,206.156 453.477,192.969 446.977,206.156 432.445,208.25 442.961,218.516 "/><polygon fill="#FFD740" points="369.82,128.953 382.82,122.125 395.82,128.953 393.335,114.469 403.851,104.219 389.32,102.094 382.82,88.938 376.32,102.094 361.773,104.219 372.289,114.469 "/></g></svg>`, name: '至高の戴冠',  condition: '100回勝利する',   threshold: 100 },
  { id: 'easy3',   icon: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#FFD740" d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M256,464C141.3,464,48,370.7,48,256S141.3,48,256,48s208,93.3,208,208S370.7,464,256,464z"/><path fill="#FFD740" d="M256,80c-97,0-176,79-176,176s79,176,176,176s176-79,176-176S353,80,256,80z M256,416c-88.2,0-160-71.8-160-160s71.8-160,160-160s160,71.8,160,160S344.2,416,256,416z"/><g transform="translate(128, 128) scale(0.5)"><path fill="#FFD740" d="M358.408,132.806c-17.392-41.261-80.604-54.014-141.185-28.48c-56.225,23.702-90.418,72.044-81.14,111.865 c0.415,2.929,1.377,5.954,2.944,9.087c0.804,1.91,1.708,3.761,2.706,5.55c18.241,37.827,26.862,69.947,32.894,99.554 c11.091,54.453,12.077,82.24,11.983,104.85c-0.002,0.693,0.018,1.338,0.051,1.952c1.037,41.49,34.976,74.816,76.717,74.816 c42.404,0,76.771-34.374,76.771-76.768c0-22.996-10.826-41.587-26.136-57.683c-1.367-1.735-3.305-4.073-3.67-4.61 c-6.611-9.774-10.118-14.601-14.568-29.136c-11.501-37.568,5.945-85.597,33.548-119.235c0.696-0.844,0.566-0.675,0.199-0.217 C359.27,192.207,369.123,158.224,358.408,132.806z"/><path fill="#FFD740" d="M368.14,1.151c-25.09,0-45.432,20.338-45.432,45.432c0,25.088,20.342,45.426,45.432,45.426 c25.088,0,45.432-20.338,45.432-45.426C413.572,21.489,393.228,1.151,368.14,1.151z"/><path fill="#FFD740" d="M268.367,68.434c18.892,0,34.214-15.318,34.214-34.217C302.581,15.325,287.259,0,268.367,0 c-18.898,0-34.22,15.325-34.22,34.217C234.148,53.115,249.469,68.434,268.367,68.434z"/><path fill="#FFD740" d="M189.291,85.687c17.786,0,32.204-14.421,32.204-32.204c0-17.789-14.418-32.204-32.204-32.204 c-17.786,0-32.207,14.415-32.207,32.204C157.084,71.266,171.505,85.687,189.291,85.687z"/><path fill="#FFD740" d="M155.936,102.362c0-15.88-12.875-28.751-28.754-28.751c-15.88,0-28.754,12.872-28.754,28.751 c0,15.885,12.875,28.757,28.754,28.757C143.061,131.118,155.936,118.246,155.936,102.362z"/></g></svg>`, name: '小さな一歩',   condition: 'よわいを3回クリア', threshold: null, special: true },
  { id: 'hard1',   icon: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#FFD740" d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M256,464C141.3,464,48,370.7,48,256S141.3,48,256,48s208,93.3,208,208S370.7,464,256,464z"/><path fill="#FFD740" d="M256,80c-97,0-176,79-176,176s79,176,176,176s176-79,176-176S353,80,256,80z M256,416c-88.2,0-160-71.8-160-160s71.8-160,160-160s160,71.8,160,160S344.2,416,256,416z"/><g transform="translate(140, 140) scale(0.45)"><path fill="#FFD740" d="M404.563,188.938c-23.078-36.063-38.953-60.578-64.906-121.156c0,0-18.75,24.531-33.172,60.578 c-6.703-23.203-18.922-33.578-33.172-57.703C254.563,38.938,251.672,0,251.672,0s-30.281,17.313-50.484,60.563 c-20.172,43.281-18.75,93.75-41.813,116.844c-8.656-46.156-30.297-59.125-30.297-59.125s-12.984,38.906-21.625,64.875 c-23.078,46.156-37.5,91.406-37.5,142.797c0,51.359,20.813,97.891,54.5,131.547C158.125,491.188,204.641,512,256,512 c51.375,0,97.891-20.813,131.563-54.5c33.672-33.656,54.484-80.188,54.484-131.547 C442.047,274.563,424.766,223.547,404.563,188.938z M336.563,438.25c-21.516,21.5-50.125,33.375-80.563,33.375 s-59.047-11.875-80.563-33.375c-21.531-21.531-33.375-50.141-33.375-80.563c0-10.656,0.844-21.188,2.594-31.875 c6.063-24.375,15.688-59,15.688-59s24.406,22.156,28.828,36.531c7.703,25,19.234-15.375,29.328-37.969 c8.656-10.094,18.625-42.344,25.297-62.5l59.797,108.656l40.5-51.328c12.813,23.219,25.859,60,25.859,97.484 C369.953,388.109,358.078,416.719,336.563,438.25z"/></g></svg>`, name: '本気の挑戦',   condition: 'つよいに1回勝つ',  threshold: null, special: true },
];

// =========================================================
//  リラックスグッズデータ（レベルアップ報酬）
// =========================================================
const RELAX_GOODS: RelaxGood[] = [
  { id: 'coffee', price: 20,  icon: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M30,40 L70,40 Q75,40 75,45 L70,85 Q68,95 50,95 Q32,95 30,85 L25,45 Q25,40 30,40 Z" fill="#FFF8E1" stroke="#FFB74D" stroke-width="2"/>
    <path d="M72,45 Q85,45 85,60 Q85,75 70,75" fill="none" stroke="#FFB74D" stroke-width="4" stroke-linecap="round"/>
    <path d="M35,30 Q40,15 45,30 M50,25 Q55,10 60,25 M65,30 Q70,15 75,30" fill="none" stroke="#FFE0B2" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="50" cy="40" rx="20" ry="5" fill="#E65100" opacity="0.4"/>
  </svg>`,  name: 'ホットコーヒー',       desc: 'ほんのり温かい一杯',      style: 'left: 10%; bottom: 20px; transform: scale(1.1);' },
  { id: 'candle', price: 30,  icon: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="35" y="45" width="30" height="45" rx="5" fill="#FFFDE7" stroke="#FFB74D" stroke-width="2"/>
    <path d="M50,45 V40" stroke="#E65100" stroke-width="2"/>
    <path d="M50,40 Q45,25 50,10 Q55,25 50,40" fill="#FFB74D">
      <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
    </path>
  </svg>`, name: 'アロマキャンドル',     desc: 'やわらかな香りが広がる',  style: 'left: 22%; bottom: 25px;' },
  { id: 'cushion', price: 50,  icon: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M15,40 Q15,20 50,20 Q85,20 85,40 L85,60 Q85,80 50,80 Q15,80 15,60 Z" fill="#FFE0B2" stroke="#FFB74D" stroke-width="3"/>
    <path d="M25,40 Q50,35 75,40 M25,60 Q50,55 75,60" fill="none" stroke="#FFCC80" stroke-width="2" opacity="0.6"/>
  </svg>`, name: 'ふかふかクッション',   desc: 'もふもふで心地よい',      style: 'left: 36%; bottom: 10px; transform: scale(1.3);' },
  { id: 'plant', price: 75,  icon: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M35,75 L65,75 L60,95 L40,95 Z" fill="#FFCC80" stroke="#E65100" stroke-width="2"/>
    <path d="M50,75 V45 M50,65 Q30,50 25,60 M50,60 Q70,45 75,55" fill="none" stroke="#FFB74D" stroke-width="5" stroke-linecap="round"/>
    <circle cx="25" cy="55" r="8" fill="#FFB74D" opacity="0.8"/><circle cx="75" cy="50" r="10" fill="#FFB74D" opacity="0.7"/><circle cx="50" cy="35" r="12" fill="#FFB74D"/>
  </svg>`,  name: 'ちいさな観葉植物',    desc: '緑が癒しをくれる',        style: 'left: 55%; bottom: 15px; transform: scale(1.1);' },
  { id: 'book', price: 100,  icon: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M20,30 L50,35 L50,90 L20,85 Z" fill="#FFE0B2" stroke="#E65100" stroke-width="2"/>
    <path d="M80,30 L50,35 L50,90 L80,85 Z" fill="#FFF8E1" stroke="#E65100" stroke-width="2"/>
    <path d="M25,45 H45 M25,55 H45 M55,45 H75 M55,55 H75" fill="none" stroke="#FFB74D" stroke-width="1.5"/>
  </svg>`,  name: 'お気に入りの本',       desc: '読むたびほっとする',      style: 'left: 72%; bottom: 20px; transform: rotate(-8deg);' },
  { id: 'record', price: 150,  icon: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="45" width="70" height="50" rx="5" fill="#FFCC80" stroke="#E65100" stroke-width="2"/>
    <circle cx="50" cy="50" r="35" fill="#FFB74D" stroke="#E65100" stroke-width="2" opacity="0.6"/>
    <circle cx="50" cy="50" r="8" fill="#FFF"/>
  </svg>`,  name: 'レコードプレイヤー',  desc: 'のんびりした音楽',        style: 'left: -2%; bottom: 15px; transform: scale(1.1);' },
  { id: 'moon', price: 200,  icon: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="#FFF9C4" stroke="#FBC02D" stroke-width="1"/>
    <circle cx="35" cy="40" r="5" fill="#FDD835" opacity="0.4"/>
  </svg>`,         name: 'ムーンランプ',         desc: '夜を照らすやさしい光',    style: 'left: 88%; bottom: 25px;' },
  { id: 'bear', price: 250, icon: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="45" r="18" fill="#FFE082" stroke="#E65100" stroke-width="1.5"/>
    <circle cx="50" cy="75" r="22" fill="#FFE082" stroke="#E65100" stroke-width="1.5"/>
    <circle cx="35" cy="35" r="8" fill="#FFE082" stroke="#E65100" stroke-width="1.5"/><circle cx="65" cy="35" r="8" fill="#FFE082" stroke="#E65100" stroke-width="1.5"/>
    <circle cx="44" cy="42" r="2" fill="#E65100"/><circle cx="56" cy="42" r="2" fill="#E65100"/>
  </svg>`,    name: 'くまのぬいぐるみ',    desc: 'そっと抱きしめよう',      style: 'left: 48%; bottom: 5px; transform: scale(1.4); z-index: 2;' },
  { id: 'bath', price: 300, icon: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M15,60 Q15,90 50,90 Q85,90 85,60 L85,50 H15 Z" fill="#FFECB3" stroke="#FFB74D" stroke-width="1.5"/>
    <circle cx="30" cy="45" r="7" fill="#FFF" opacity="0.8"/><circle cx="50" cy="40" r="10" fill="#FFF" opacity="0.7"/>
  </svg>`,           desc: 'ゆっくりお風呂でリラックス', style: 'left: 20%; bottom: 0px; transform: scale(1.2);', name: 'バブルバス' },
];



// =========================================================
//  ゲーム状態
// =========================================================
let state: GameState = {
  currentScreen: 'screen-home',
  selectedEnemy: null,
  selectedDifficulty: null,
  timerInterval: null,
  speechInterval: null,
  chargeRemaining: 0,
  chargeMax: 0,
};

// =========================================================
//  セーブデータ（LocalStorage）
// =========================================================
const SAVE_KEY = 'ocd_dungeon_save';

function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed.coins === 'undefined') {
        parsed.coins = (parsed.level || 1) * 10 + (parsed.xp || 0); // Migrate old data
        parsed.unlockedGoods = (parsed.unlockedGoods || []).map((l: number) => RELAX_GOODS.find(g => (g as any).level === l)?.id).filter(Boolean);
      }
      return parsed as SaveData;
    }
  } catch (_e) { /* ignore */ }
  return {
    totalWins: 0,
    medals: [],
    coins: 0,
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
  if (document.body.classList.contains('is-transitioning')) return;
  // 戦闘画面以外に遷移する場合はタイマーを強制リセット
  if (id !== 'screen-battle') {
    if (state.timerInterval !== null) clearInterval(state.timerInterval);
    if (state.speechInterval !== null) clearInterval(state.speechInterval);
    state.timerInterval = null;
    state.speechInterval = null;
  }

  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
  state.currentScreen = id;

  // 画面遷移時の誤操作防止（300ms クールダウン）
  document.body.classList.add('is-transitioning');
  setTimeout(() => {
    document.body.classList.remove('is-transitioning');
  }, 500);

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
  // コイン数表示
  const coinEl = document.getElementById('coin-count');
  if (coinEl) coinEl.textContent = String(saveData.coins);

  // 統計
  getEl('total-wins').textContent = String(saveData.totalWins);
  getEl('total-medals').textContent = String(saveData.medals.length);
  getEl('streak-count').textContent = String(saveData.streak);
}


// =========================================================
//  敵選択画面 レンダリング
// =========================================================
function renderEnemySelect(): void {
  const grid = getEl('enemy-grid');
  grid.innerHTML = '';
  ENEMIES.forEach(enemy => {
    const card = document.createElement('button');
    card.className = 'enemy-card';
    card.dataset['id'] = enemy.id;
    card.innerHTML = `
      <div class="enemy-avatar">${buildAvatarHTML(enemy, false)}</div>
      <div class="enemy-name">${enemy.name}</div>
      <div class="enemy-category">${enemy.category}</div>
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
  return `<div style="width:${large ? '100px' : '60px'}; height:${large ? '100px' : '60px'}; margin: auto;">
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="#E0E0E0" opacity="0.5" />
      <path d="M30,50 Q50,20 70,50 Q50,80 30,50" fill="none" stroke="#9E9E9E" stroke-width="4" />
      <circle cx="50" cy="50" r="10" fill="#9E9E9E" />
    </svg>
  </div>`;
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
    `;
}

// =========================================================
//  戦闘開始
// =========================================================
function startBattle(difficulty: string): void {
  state.selectedDifficulty = difficulty as 'easy' | 'normal' | 'hard';
  const diffConf = DIFFICULTIES[difficulty];
  state.chargeMax = diffConf.hp;
  state.chargeRemaining = diffConf.hp;

  showScreen('screen-battle');
  setupBattleScreen();
  // タイマーは制限時間ではなくなったが、一応画面管理などのために呼び出す（または実質何もしないようにする）
  // 今回は「制限時間廃止」なのでカウントダウンは行わない
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
  // updateTimerDisplay(state.timerMax, state.timerMax); // 廃止

  // タップ（クリック）イベントの登録（重複防止のため一度削除してから追加）
  const enemyDisplay = getEl('enemy-display');
  enemyDisplay.removeEventListener('click', handleBattleTap);
  enemyDisplay.addEventListener('click', handleBattleTap);
}

// =========================================================
//  連打（タップ）処理
// =========================================================
function handleBattleTap(e: MouseEvent): void {
  if (document.body.classList.contains('is-transitioning')) return;
  if (state.chargeRemaining <= 0 || state.currentScreen !== 'screen-battle') return;

  // 敵本体(enemy-sprite)かタップボタン(btn-tap)以外へのタップは無視
  const target = e.target as HTMLElement;
  const isSprite = target.closest('#enemy-sprite');
  const isBtn = target.closest('#btn-tap');
  if (!isSprite && !isBtn) return;

  // 1タップにつき1チャージ減少
  const tapPower = 1;
  state.chargeRemaining = Math.max(0, state.chargeRemaining - tapPower);

  // 即座にUI更新
  const progress = 1 - state.chargeRemaining / state.chargeMax;
  updateChargeBar(progress);

  // 敵が揺れるエフェクト
  const sprite = getEl('enemy-sprite');
  sprite.classList.remove('enemy-shake');
  void sprite.offsetWidth; // リフロー強制でアニメーション再トリガー
  sprite.classList.add('enemy-shake');

  // パーティクル（星や光）を中心（敵）に向かって表示
  createTapParticle(e.clientX, e.clientY);

  // ゲージMAXになったら撃破
  if (state.chargeRemaining <= 0) {
    if (state.timerInterval !== null) clearInterval(state.timerInterval);
    if (state.speechInterval !== null) clearInterval(state.speechInterval);
    triggerVictory();
  }
}

function createTapParticle(x: number, y: number): void {
  const p = document.createElement('div');
  p.className = 'tap-particle';
  const particles = [
    `<svg viewBox="0 0 100 100"><path d="M50,10 L60,40 L90,50 L60,60 L50,90 L40,60 L10,50 L40,40 Z" fill="#FFD740"/></svg>`,
    `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="30" fill="#FFF"/></svg>`,
    `<svg viewBox="0 0 100 100"><path d="M50,20 L80,50 L50,80 L20,50 Z" fill="#64B5F6"/></svg>`
  ];
  p.innerHTML = particles[Math.floor(Math.random() * particles.length)];
  p.style.width = '24px';
  p.style.height = '24px';
  p.style.left = `${x}px`;
  p.style.top = `${y}px`;
  document.body.appendChild(p);
  
  // アニメーション終了後に削除
  setTimeout(() => {
    p.remove();
  }, 600);
}

// =========================================================
//  タイマー
// =========================================================

// =========================================================
//  チャージゲージ更新
// =========================================================
function updateChargeBar(ratio: number): void {
  const pct = Math.round(ratio * 100);
  (getEl('charge-bar') as HTMLElement).style.width = pct + '%';
  getEl('charge-percent').textContent = pct + '%';
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
  // タイマーを完全に破棄してホームに戻る
  getEl('retreat-modal').style.display = 'none';
  if (state.timerInterval !== null) clearInterval(state.timerInterval);
  if (state.speechInterval !== null) clearInterval(state.speechInterval);
  state.timerInterval = null;
  state.speechInterval = null;
  showScreen('screen-home');
}

function closeRetreatModal(): void {
  getEl('retreat-modal').style.display = 'none';
  // タイマー廃止のため再開処理不要
}

// =========================================================
//  勝利処理
// =========================================================
function triggerVictory(): void {
  // セーブデータ更新
  const diff = DIFFICULTIES[state.selectedDifficulty ?? 'normal'];
  const gainedCoins = diff.coins;

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

  // コイン加算
  saveData.coins += gainedCoins;

  // メダルチェック
  const newMedals = checkMedals();

  saveSave(saveData);

  // 勝利画面へ遷移
  showVictoryScreen(gainedCoins, newMedals);
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
function showVictoryScreen(coins: number, newMedals: Medal[]): void {
  showScreen('screen-victory');

  // 敵スプライト
  getEl('victory-enemy').innerHTML = `<div style="width:100px;height:100px;margin:0 auto;">${buildAvatarHTML(state.selectedEnemy!, false)}</div>`;

  // タイトル・メッセージ
  getEl('victory-title').textContent = '撃破！！';
  getEl('victory-msg').textContent = state.selectedEnemy?.defeatMsg ?? '';

  // コイン（アイコンは既にHTML側でSVG化されているため、テキストのみ更新）
  const rewardCoinEl = document.getElementById('reward-coin');
  if (rewardCoinEl) rewardCoinEl.textContent = String(coins);

  // 爆発パーティクル
  createExplosionParticles();

  // 新メダル
  const medalPopup = getEl('new-medal-popup');
  if (newMedals.length > 0) {
    medalPopup.style.display = 'block';
    getEl('new-medal-icon').innerHTML = newMedals[0].icon;
  } else {
    medalPopup.style.display = 'none';
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
//  グッズ交換制
// =========================================================
function buyGoods(id: string): void {
  if (document.body.classList.contains('is-transitioning')) return;
  const goods = RELAX_GOODS.find(g => g.id === id);
  if (!goods) return;
  if (saveData.unlockedGoods.includes(id)) return;
  if (saveData.coins < goods.price) return;

  saveData.coins -= goods.price;
  saveData.unlockedGoods.push(id);
  saveSave(saveData);
  renderGoods(); // リロードしてUI更新
  
  // ホームのコイン表示も更新できたらする
  const coinEl = document.getElementById('coin-count');
  if (coinEl) coinEl.textContent = String(saveData.coins);
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
  
  // コイン表示更新
  const shopCoinEl = document.getElementById('shop-coin-count');
  if (shopCoinEl) shopCoinEl.textContent = String(saveData.coins);

  RELAX_GOODS.forEach(goods => {
    const unlocked = saveData.unlockedGoods.includes(goods.id);
    const canBuy = !unlocked && saveData.coins >= goods.price;
    const card = document.createElement('div');
    card.className = 'goods-card' + (unlocked ? '' : ' locked');
    
    let btnHtml = '';
    if (unlocked) {
      btnHtml = `<div class="goods-owned">所持しています</div>`;
    } else {
      btnHtml = `<button class="btn btn-primary" ${canBuy ? '' : 'disabled'} onclick="buyGoods('${goods.id}')">
        ${goods.price}コインで交換
      </button>`;
    }

    card.innerHTML = `
      <div class="goods-card-icon">${goods.icon}</div>
      <div class="goods-card-name">${goods.name}</div>
      <div class="goods-card-unlock">${unlocked ? goods.desc : '？？？'}</div>
      <div class="goods-card-action" style="margin-top: 10px;">${btnHtml}</div>
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
    buyGoods: typeof buyGoods;
    selectCustomEnemy: typeof selectCustomEnemy;
    handleBattleTap: typeof handleBattleTap;
  }
}
window.showScreen      = showScreen;
window.startBattle     = startBattle;
window.retreatBattle   = retreatBattle;
window.confirmRetreat  = confirmRetreat;
window.closeRetreatModal = closeRetreatModal;
window.buyGoods        = buyGoods;
window.selectCustomEnemy = selectCustomEnemy;
window.handleBattleTap   = handleBattleTap;

// =========================================================
//  初期化
// =========================================================
function init(): void {
  addSvgDefs();
  showScreen('screen-home');
}

// 実行
init();
