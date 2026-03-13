(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))o(c);new MutationObserver(c=>{for(const s of c)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(c){const s={};return c.integrity&&(s.integrity=c.integrity),c.referrerPolicy&&(s.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?s.credentials="include":c.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(c){if(c.ep)return;c.ep=!0;const s=n(c);fetch(c.href,s)}})();const M=[{id:"jirorin",name:"ジロリン",category:"確認",desc:"たくさんの目で隅々まで確認しようとする…",color:"#B2D8FF",avatarType:"img",avatarSrc:"/Users/torigoe971003/.gemini/antigravity/brain/190f1246-15b7-4c2e-81fa-4fc802532f5a/enemy_jirorin_1773398462646.png",speechLines:["ちゃんと確認した？","もう一回見てみようよ…","本当に大丈夫？ホントに？","また何か忘れてるかもよ！"],defeatMsg:"ジロリンを撃破！確認しなくても大丈夫だった！"},{id:"dororu",name:"ドロル",category:"不潔・洗浄",desc:"全身泥んこ。触るものを全部汚したがる…",color:"#F9D9B0",avatarType:"svg",avatarSvg:`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
    </svg>`,speechLines:["べたべたべたべた…","どこ触っても汚いよ〜","洗っても洗っても！","きたない！きたない！"],defeatMsg:"ドロルを撃破！洗わなくても安全だった！"},{id:"chiguhagu",name:"チグハグ",category:"縁起・儀式",desc:"左右非対称のまま。完璧にしようとしてイライラ…",color:"#E0D0FF",avatarType:"svg",avatarSvg:`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
    </svg>`,speechLines:["なんか非対称！","右と左が違う…！","揃えないと気持ち悪い！","もう一回やり直して！"],defeatMsg:"チグハグを撃破！ズレてても問題なかった！"},{id:"bosori",name:"ボソリ",category:"加害・不道徳",desc:"耳元でいじわるな囁きをしてくる小さな影…",color:"#C8F5E0",avatarType:"svg",avatarSvg:`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
    </svg>`,speechLines:["…ねえ、もしかしたら…","やっぱり悪いことしたかも","ボソボソ…ボソボソ…","誰かを傷つけちゃったかも"],defeatMsg:"ボソリを撃破！その囁きは嘘だった！"}],h={easy:{label:"よわい",seconds:30,xp:10},normal:{label:"ふつう",seconds:90,xp:25},hard:{label:"つよい",seconds:180,xp:50}},v=[{id:"first",icon:"⚔️",name:"初出陣",condition:"初めての勝利",threshold:1},{id:"five",icon:"🥉",name:"5回クリア",condition:"5回勝利する",threshold:5},{id:"ten",icon:"🥈",name:"10回クリア",condition:"10回勝利する",threshold:10},{id:"twenty",icon:"🥇",name:"20回クリア",condition:"20回勝利する",threshold:20},{id:"fifty",icon:"🏆",name:"50回クリア",condition:"50回勝利する",threshold:50},{id:"hundred",icon:"👑",name:"勇者の称号",condition:"100回勝利する",threshold:100},{id:"easy3",icon:"🌱",name:"小さな一歩",condition:"よわいを3回クリア",threshold:null,special:!0},{id:"hard1",icon:"🔥",name:"本気の挑戦",condition:"つよいに1回勝つ",threshold:null,special:!0}],m=[{level:2,icon:"☕",name:"ホットコーヒー",desc:"ほんのり温かい一杯",style:"bottom:10%; left:10%"},{level:3,icon:"🕯️",name:"アロマキャンドル",desc:"やわらかな香りが広がる",style:"bottom:30%; right:8%"},{level:4,icon:"🛋️",name:"ふかふかクッション",desc:"もふもふで心地よい",style:"bottom:5%; right:20%"},{level:5,icon:"🌿",name:"ちいさな観葉植物",desc:"緑が癒しをくれる",style:"bottom:15%; left:35%"},{level:6,icon:"📚",name:"お気に入りの本",desc:"読むたびほっとする",style:"bottom:40%; left:5%"},{level:7,icon:"🎵",name:"レコードプレイヤー",desc:"のんびりした音楽",style:"bottom:60%; right:10%"},{level:8,icon:"🌙",name:"ムーンランプ",desc:"夜を照らすやさしい光",style:"bottom:70%; left:8%"},{level:9,icon:"🧸",name:"くまのぬいぐるみ",desc:"そっと抱きしめよう",style:"bottom:20%; right:35%"},{level:10,icon:"🛁",name:"バブルバス",desc:"ゆっくりお風呂でリラックス",style:"bottom:5%; left:50%"}];function u(e){return e*100}let l={currentScreen:"screen-home",selectedEnemy:null,selectedDifficulty:null,timerInterval:null,speechInterval:null,timerRemaining:0,timerMax:0};const x="ocd_dungeon_save";function B(){try{const e=localStorage.getItem(x);if(e)return JSON.parse(e)}catch{}return{totalWins:0,medals:[],level:1,xp:0,unlockedGoods:[],streak:0,lastPlayDate:null,winsByDifficulty:{easy:0,normal:0,hard:0},winsByEnemy:{}}}function S(e){localStorage.setItem(x,JSON.stringify(e))}let r=B();function i(e){const t=document.getElementById(e);if(!t)throw new Error(`Element #${e} not found`);return t}function d(e){document.querySelectorAll(".screen").forEach(n=>n.classList.remove("active"));const t=document.getElementById(e);t&&t.classList.add("active"),l.currentScreen=e,e==="screen-home"&&L(),e==="screen-select"&&I(),e==="screen-medals"&&q(),e==="screen-goods"&&W()}function L(){i("player-level").textContent=String(r.level);const e=u(r.level),t=Math.min(r.xp/e,1);i("xp-bar").style.width=t*100+"%",i("xp-current").textContent=String(r.xp),i("xp-max").textContent=String(e),i("total-wins").textContent=String(r.totalWins),i("total-medals").textContent=String(r.medals.length),i("streak-count").textContent=String(r.streak),k()}function k(){const e=i("home-room");e.querySelectorAll(".home-furniture-item").forEach(n=>n.remove()),m.filter(n=>r.unlockedGoods.includes(n.level)).forEach((n,o)=>{const c=document.createElement("div");c.className="home-furniture-item",c.textContent=n.icon,c.title=n.name,c.style.cssText=n.style,c.style.animationDelay=`${o*.1}s`,e.appendChild(c)})}function I(){const e=i("enemy-grid");e.innerHTML="",M.forEach(t=>{const n=document.createElement("div");n.className="enemy-card",n.dataset.id=t.id,n.style.setProperty("--card-accent",t.color),n.innerHTML=`
      <div class="enemy-avatar">${p(t,!1)}</div>
      <div class="enemy-name">${t.name}</div>
      <div class="enemy-category">${t.category}</div>
      <div class="enemy-desc">${t.desc}</div>
    `,n.addEventListener("click",()=>b(t)),e.appendChild(n)})}function p(e,t=!1){return e.avatarType==="img"&&e.avatarSrc?`<img src="${e.avatarSrc}" alt="${e.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
            <div style="display:none;font-size:${t?"5rem":"3rem"};text-align:center;">👁️</div>`:e.avatarType==="svg"&&e.avatarSvg?e.avatarSvg:`<span style="font-size:${t?"5rem":"3rem"};">🌫️</span>`}function b(e){l.selectedEnemy=e,d("screen-difficulty"),g()}function A(){const e=document.getElementById("custom-name");if(!e)return;const t=e.value.trim();if(!t){e.focus(),e.style.borderColor="#FF5252",setTimeout(()=>{e.style.borderColor=""},1e3);return}const n={id:"custom",name:t,category:"カスタム",desc:"あなただけのオリジナル強迫観念",color:"#D0E8D0",avatarType:"svg",avatarSvg:`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
    </svg>`,speechLines:["ボソボソ…","ねえ、気になるよね","やっぱり変かも…"],defeatMsg:`${t}を撃破！よく頑張った！`};l.selectedEnemy=n,d("screen-difficulty"),g()}function g(){const e=i("selected-enemy-preview"),t=l.selectedEnemy;t&&(e.innerHTML=`
    <div style="width:90px;height:90px;margin:0 auto 10px;">${p(t)}</div>
    <div class="preview-name">${t.name}（${t.category}）</div>
    <div class="enemy-desc" style="margin-top:8px;">${t.desc}</div>
  `)}function T(e){l.selectedDifficulty=e;const t=h[e];l.timerMax=t.seconds,l.timerRemaining=t.seconds,d("screen-battle"),$(),w()}function $(){const e=l.selectedEnemy;if(!e)return;i("battle-enemy-name").textContent=e.name,i("enemy-sprite").innerHTML=p(e,!0);const t=i("enemy-speech-bubble"),n=e.speechLines[Math.floor(Math.random()*e.speechLines.length)];t.textContent=n,l.speechInterval!==null&&clearInterval(l.speechInterval),l.speechInterval=setInterval(()=>{const o=e.speechLines[Math.floor(Math.random()*e.speechLines.length)];t.style.opacity="0",setTimeout(()=>{t.textContent=o,t.style.opacity="1"},300)},4e3),t.style.transition="opacity 0.3s",F(0),C(l.timerMax,l.timerMax)}function w(){l.timerInterval!==null&&clearInterval(l.timerInterval),l.timerInterval=setInterval(()=>{l.timerRemaining--;const e=1-l.timerRemaining/l.timerMax;if(F(e),C(l.timerRemaining,l.timerMax),e>=.5&&e<=.52){const t=i("enemy-sprite");t.classList.add("enemy-shake"),setTimeout(()=>t.classList.remove("enemy-shake"),500)}l.timerRemaining<=0&&(l.timerInterval!==null&&clearInterval(l.timerInterval),l.speechInterval!==null&&clearInterval(l.speechInterval),H())},1e3)}function F(e){const t=Math.round(e*100);i("charge-bar").style.width=t+"%",i("charge-percent").textContent=t+"%"}function C(e,t){i("timer-text").textContent=String(e);const o=2*Math.PI*45*(1-e/t);i("timer-progress").style.strokeDashoffset=String(o);const c=e/t,s=Math.round(90+(1-c)*165),a=Math.round(140-(1-c)*100),f=Math.round(255-(1-c)*255);i("timer-progress").style.stroke=`rgb(${s},${a},${f})`}function P(){l.timerInterval!==null&&clearInterval(l.timerInterval),l.speechInterval!==null&&clearInterval(l.speechInterval),i("retreat-modal").style.display="flex"}function R(){D(),d("screen-home")}function D(){i("retreat-modal").style.display="none",l.timerRemaining>0&&l.currentScreen==="screen-battle"&&w()}function H(){var f;const t=h[l.selectedDifficulty??"normal"].xp;r.totalWins++,l.selectedDifficulty&&r.winsByDifficulty[l.selectedDifficulty]++;const n=((f=l.selectedEnemy)==null?void 0:f.id)??"unknown";r.winsByEnemy[n]=(r.winsByEnemy[n]??0)+1;const o=new Date().toDateString();r.lastPlayDate===o||(r.lastPlayDate===N()?r.streak++:r.streak=1),r.lastPlayDate=o,r.xp+=t;let c=!1,s=null;for(;r.xp>=u(r.level);){r.xp-=u(r.level),r.level++,c=!0;const y=m.find(E=>E.level===r.level);y&&!r.unlockedGoods.includes(y.level)&&(r.unlockedGoods.push(y.level),s=y)}const a=G();S(r),O(t,a,c,s)}function N(){const e=new Date;return e.setDate(e.getDate()-1),e.toDateString()}function G(){const e=[];return v.forEach(t=>{if(r.medals.includes(t.id))return;let n=!1;t.threshold!==null?n=r.totalWins>=t.threshold:t.special&&(t.id==="easy3"&&(n=(r.winsByDifficulty.easy||0)>=3),t.id==="hard1"&&(n=(r.winsByDifficulty.hard||0)>=1)),n&&(r.medals.push(t.id),e.push(t))}),e}function O(e,t,n,o){var a;d("screen-victory"),i("victory-enemy").innerHTML=`<div style="width:100px;height:100px;margin:0 auto;">${p(l.selectedEnemy,!1)}</div>`,i("victory-title").textContent="撃破！！",i("victory-msg").textContent=((a=l.selectedEnemy)==null?void 0:a.defeatMsg)??"",i("reward-xp").textContent=String(e),Q();const c=i("new-medal-popup");t.length>0?(c.style.display="block",i("new-medal-icon").textContent=t[0].icon):c.style.display="none";const s=i("new-goods-popup");o?(s.style.display="block",i("new-goods-icon").textContent=o.icon,i("new-goods-name").textContent=o.name):s.style.display="none",n&&setTimeout(()=>_(),2e3)}function Q(){const e=i("explosion-particles");e.innerHTML="";const t=["#FFD740","#FF8C42","#B08AFF","#5AB4FF","#4FCB7A"];for(let n=0;n<12;n++){const o=document.createElement("div");o.className="particle";const c=n/12*Math.PI*2,s=60+Math.random()*40;o.style.setProperty("--tx",Math.cos(c)*s+"px"),o.style.setProperty("--ty",Math.sin(c)*s+"px"),o.style.background=t[n%t.length],e.appendChild(o)}}function _(){i("levelup-new-level").textContent=String(r.level);const e=m.find(t=>t.level===r.level)??{icon:"🎁",name:"サプライズ"};i("levelup-goods-icon").textContent=e.icon,i("levelup-goods-name").textContent=e.name,i("levelup-modal").style.display="flex"}function U(){i("levelup-modal").style.display="none"}function q(){const e=i("medals-grid");e.innerHTML="",v.forEach(t=>{const n=r.medals.includes(t.id),o=document.createElement("div");o.className="medal-card"+(n?"":" locked"),o.innerHTML=`
      <div class="medal-card-icon">${t.icon}</div>
      <div class="medal-card-name">${t.name}</div>
      <div class="medal-card-cond">${t.condition}</div>
    `,e.appendChild(o)})}function W(){const e=i("goods-grid");e.innerHTML="",m.forEach(t=>{const n=r.unlockedGoods.includes(t.level),o=document.createElement("div");o.className="goods-card"+(n?"":" locked"),o.innerHTML=`
      <div class="goods-card-icon">${t.icon}</div>
      <div class="goods-card-name">${t.name}</div>
      <div class="goods-card-unlock">${n?t.desc:`Lv.${t.level}で解放`}</div>
    `,e.appendChild(o)})}function z(){const e=document.querySelector(".timer-svg");if(!e)return;const t=document.createElementNS("http://www.w3.org/2000/svg","defs");t.innerHTML=`
    <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#5AB4FF"/>
      <stop offset="50%"  stop-color="#B08AFF"/>
      <stop offset="100%" stop-color="#FFD740"/>
    </linearGradient>
  `,e.prepend(t)}window.showScreen=d;window.startBattle=T;window.retreatBattle=P;window.confirmRetreat=R;window.closeRetreatModal=D;window.closeLevelUpModal=U;window.selectCustomEnemy=A;function V(){z(),d("screen-home")}V();
