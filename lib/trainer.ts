// @ts-nocheck
import confetti from "canvas-confetti";

const SoundFx = {
  ctx: null as AudioContext | null,
  muted: false,
  init() {
    if (!this.ctx) {
      const AudioContextCtor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextCtor();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  },
  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  },
  playPop() {
    if (this.muted) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(680, this.ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.16, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch (e) {}
  },
  playRemove() {
    if (this.muted) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(250, this.ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch (e) {}
  },
  playCorrect() {
    if (this.muted) return;
    try {
      this.init();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(783.99, now + 0.16);
      osc.frequency.setValueAtTime(1046.5, now + 0.24);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.28);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    } catch (e) {}
  },
  playWrong() {
    if (this.muted) return;
    try {
      this.init();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(261.63, now); // C4
      osc.frequency.linearRampToValueAtTime(196.0, now + 0.2); // G3
      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  },
  playFanfare() {
    if (this.muted) return;
    try {
      this.init();
      const notes = [523.25, 659.25, 783.99, 1046.5, 880, 1046.5, 1318.5];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.09;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.22);
      });
    } catch (e) {}
  }
};

const PIZZA_DATABASE = [
  {
    name: "Пицца Пепперони и соусом BBQ",
    emoji: "🍕",
    ingredients: ["Соус пелати", "Сыр моцарелла", "Пепперони", "Соус bbq", "Прованские травы"]
  },
  {
    name: "Пицца Прошутто",
    emoji: "🍕",
    ingredients: ["Соус пелати", "Сыр моцарелла", "Свежие томаты", "Рукола", "Прошутто", "Сыр пармезан", "Крем-бальзамик"]
  },
  {
    name: "Пицца Четыре сыра",
    emoji: "🍕",
    ingredients: ["Сливочный соус", "Творожный сыр", "Моцарелла", "Пармезан", "Горгонзола"]
  },
  {
    name: "Пицца с пастрами из говядины, квашеной капустой и халапеньо",
    emoji: "🍕",
    ingredients: ["Пастрами говядина", "Квашеная капуста", "Халапеньо", "Страчателла", "Сливочный соус", "Азиатский соус"]
  },
  {
    name: "Пицца с угрем",
    emoji: "🍕",
    ingredients: ["Угорь", "Страчателла", "Бонито"]
  },
  {
    name: "Пицца с ветчиной и сыром",
    emoji: "🍕",
    ingredients: ["Соус пелати", "Ветчина", "Сыр моцарелла"]
  },
  {
    name: "Пицца Супер BBQ",
    emoji: "🍕",
    ingredients: ["Соус пелати", "Моцарелла", "Бекон", "Пепперони", "Пастрами из говядины", "Маринованный лук", "Страчателла", "Азиатский соус", "Петрушка"]
  },
  {
    name: "Пицца с цыпленком и сыром",
    emoji: "🍕",
    ingredients: ["Сливочный соус", "Цыпленок", "Сыр моцарелла"]
  },
  {
    name: "Пицца с пастрами из цыпленка, беконом и моцареллой",
    emoji: "🍕",
    ingredients: ["Пастрами из цыпленка", "Бекон", "Хрустящий маринованный огурец", "Лук фри", "Маринованный лук", "Шпинат", "Фирменный соус"]
  },
  {
    name: "Пицца с грушей, горгонзолой и соусом юдзу",
    emoji: "🍕",
    ingredients: ["Сливочный соус", "Моцарелла", "Груша", "Горгонзола", "Рукола", "Мед", "Кедровые орехи"]
  },
  {
    name: "Пицца с морепродуктами",
    emoji: "🍕",
    ingredients: ["Чесночный соус", "Мидии", "Креветки тигровые", "Икра капеллана", "Страчателла", "Зеленое масло", "Азиатский соус", "Сыр моцарелла"]
  },
  {
    name: "Пицца с грибами, страчателлой и трюфелем",
    emoji: "🍕",
    ingredients: ["Белые грибы", "Шампиньоны", "Сливочный соус", "Моцарелла", "Страчателла", "Трюфельная паста"]
  },
  {
    name: "Пицца Сливочная Пепперони",
    emoji: "🍕",
    ingredients: ["Сливочный соус", "Сыр моцарелла", "Пепперони", "Красный маринованный лук", "Петрушка"]
  },
  {
    name: "Пицца Карбонара",
    emoji: "🍕",
    ingredients: ["Моцарелла", "Чесночный соус", "Бекон", "Пармезан", "Лук фри", "Хрустящий бекон"]
  },
  {
    name: "Пицца Четыре Сезона 2.0",
    emoji: "🍕",
    ingredients: ["2 кусочка цыпленок/песто/страчателла", "2 кусочка сливочная пепперони", "2 кусочка с копчеными колбасками", "2 кусочка котто"]
  },
  {
    name: "Пицца четыре сезона",
    emoji: "🍕",
    ingredients: ["2 кусочка — цыпленок / бекон / моцарелла", "2 кусочка — пастрами из говядины / квашеная капуста / халапеньо", "2 кусочка — грибы / страчателла / трюфель", "2 кусочка — груша / горгонзола / юдзу"]
  },
  {
    name: "Пицца 2 СЕЗОНА 3.0",
    emoji: "🍕",
    ingredients: ["4 кусочка ветчина/сыр", "4 кусочка пепперони/песто/страчателла"]
  },
  {
    name: "Пицца 2 СЕЗОНА 2.0",
    emoji: "🍕",
    ingredients: ["4 кусочка морепродукты", "4 кусочка куриный рулет/сливочный карри"]
  },
  {
    name: "Пицца Маргарита",
    emoji: "🍕",
    ingredients: ["Соус пелати", "Сыр моцарелла", "Орегано"]
  },
  {
    name: "Пицца страчателла/анчоусы",
    emoji: "🍕",
    ingredients: ["Пелати", "Страчателла", "Песто", "Анчоусы", "Лук сибулет"]
  },
  {
    name: "Пицца котто/артишоки/трюфельное масло",
    emoji: "🍕",
    ingredients: ["Чесночный соус", "Моцарелла", "Котто", "Артишоки", "Трюфельное масло", "Каперсы", "Молотый перец"]
  },
  {
    name: "Пицца креветки/цукини/песто",
    emoji: "🍕",
    ingredients: ["Пелати", "Моцарелла", "Цукини", "Креветки", "Песто", "Страчателла"]
  },
  {
    name: "Пицца креветки/блю чиз",
    emoji: "🍕",
    ingredients: ["Соус блю чиз", "Моцарелла", "Горгонзола", "Креветки", "Сладкий бекон", "Мед"]
  }
];

const ALL_INGREDIENTS = Array.from(new Set(PIZZA_DATABASE.flatMap(p => p.ingredients)));

const LEVELS = [
  {
    level: 1,
    title: "Уровень 1",
    subtitle: "1 скрытый ингредиент",
    desc: "Легкий старт: в каждой из 23 пицц скрыт 1 ингредиент",
    blanks: 1,
    badgeBg: "linear-gradient(135deg, #10b981, #16a34a)",
    btnColor: "btn-duo-green"
  },
  {
    level: 2,
    title: "Уровень 2",
    subtitle: "2 скрытых ингредиента",
    desc: "Закрепление: в каждой пицце скрыто 2 ингредиента",
    blanks: 2,
    badgeBg: "linear-gradient(135deg, #0ea5e9, #2563eb)",
    btnColor: "btn-duo-blue"
  },
  {
    level: 3,
    title: "Уровень 3",
    subtitle: "3 скрытых ингредиента",
    desc: "Средний уровень: восстанови по 3 пропуска",
    blanks: 3,
    badgeBg: "linear-gradient(135deg, #f5c400, #d97706)",
    btnColor: "btn-duo-yellow"
  },
  {
    level: 4,
    title: "Уровень 4",
    subtitle: "4 скрытых ингредиента",
    desc: "Продвинутый уровень: скрыто до 4 ингредиентов",
    blanks: 4,
    badgeBg: "linear-gradient(135deg, #fb923c, #ea580c)",
    btnColor: "btn-duo-orange"
  },
  {
    level: 5,
    title: "Уровень 5",
    subtitle: "5 скрытых ингредиентов",
    desc: "Высокая сложность: скрыто до 5 ключевых ингредиентов",
    blanks: 5,
    badgeBg: "linear-gradient(135deg, #a855f7, #7c3aed)",
    btnColor: "btn-duo-purple"
  },
  {
    level: 6,
    title: "Уровень 6",
    subtitle: "Слепая сборка (ВСЕ скрыты)",
    desc: "Абсолютное знание: все ингредиенты скрыты с нуля!",
    blanks: 99,
    badgeBg: "linear-gradient(135deg, #e11d48, #b91c1c)",
    btnColor: "btn-duo-red"
  }
];

const App = {
  state: {
    gameMode: "classic", // 'classic' | 'memory' | 'reverse'
    completedLevels: [],
    completedModes: [], // ['memory', 'reverse']
    distractorCount: 10, // 5, 10, 15, 20
    memorySeconds: 5, // 5, 10, 15, 20
    currentLevelConfig: null,
    pizzaQueue: [],
    pizzaIndex: 0,
    currentPizza: null,
    hiddenIngredients: [],
    hiddenIndices: null,
    userPicks: [],
    poolOptions: [],
    waitingNext: false,
    memoryPhase: "input", // 'preview' | 'input'
    memoryTimerId: null,
    memoryEndTime: 0,
    levelCorrect: 0,
    levelMistakes: 0
  },

  pluralRu(n, one, few, many) {
    const abs = Math.abs(n);
    const n10 = abs % 10;
    const n100 = abs % 100;
    if (n10 === 1 && n100 !== 11) return one;
    if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return few;
    return many;
  },

  init() {
    this.loadStorage();
    this.updateDistractorPillsUI();
    this.updateMemorySecondsPillsUI();
    this.updateModeSelectorUI();
    this.renderLobby();
    this.renderHandbook();
  },

  loadStorage() {
    try {
      const raw = localStorage.getItem("italingo_save");
      if (raw) {
        const data = JSON.parse(raw);
        this.state.completedLevels = Array.isArray(data.completedLevels) ? data.completedLevels : [];
        this.state.completedModes = Array.isArray(data.completedModes) ? data.completedModes : [];
        if ([5, 10, 15, 20].includes(data.distractorCount)) {
          this.state.distractorCount = data.distractorCount;
        }
        if ([5, 10, 15, 20].includes(data.memorySeconds)) {
          this.state.memorySeconds = data.memorySeconds;
        }
        if (["classic", "memory", "reverse"].includes(data.gameMode)) {
          this.state.gameMode = data.gameMode;
        }
      }
    } catch (e) {}
  },

  saveStorage() {
    try {
      const data = {
        completedLevels: this.state.completedLevels,
        completedModes: this.state.completedModes,
        distractorCount: this.state.distractorCount,
        memorySeconds: this.state.memorySeconds,
        gameMode: this.state.gameMode
      };
      localStorage.setItem("italingo_save", JSON.stringify(data));
    } catch (e) {}
  },

  clearMemoryTimer() {
    if (this.state.memoryTimerId) {
      clearInterval(this.state.memoryTimerId);
      this.state.memoryTimerId = null;
    }
  },

  toggleSound() {
    const isMuted = SoundFx.toggleMute();
    const icon = document.getElementById("sound-icon");
    const text = document.getElementById("sound-text");
    if (isMuted) {
      icon.textContent = "🔇";
      text.textContent = "Выкл";
    } else {
      icon.textContent = "🔊";
      text.textContent = "Звук";
      SoundFx.playPop();
    }
  },

  setGameMode(mode) {
    if (!["classic", "memory", "reverse"].includes(mode)) return;
    this.state.gameMode = mode;
    this.saveStorage();
    this.updateModeSelectorUI();
    this.renderLobby();
    SoundFx.playPop();
  },

  updateModeSelectorUI() {
    const modes = ["classic", "memory", "reverse"];
    modes.forEach(m => {
      const tab = document.getElementById(`mode-tab-${m}`);
      if (tab) {
        if (this.state.gameMode === m) {
          tab.className = "mode-card active rounded-2xl p-4 text-left flex flex-col justify-between gap-2 cursor-pointer";
        } else {
          tab.className = "mode-card rounded-2xl p-4 text-left flex flex-col justify-between gap-2 cursor-pointer";
        }
      }
    });

    const sec = this.state.memorySeconds;

    const badgeClassic = document.getElementById("mode-badge-classic");
    if (badgeClassic) {
      const doneCount = this.state.completedLevels.length;
      badgeClassic.textContent = doneCount > 0 ? `✓ ${doneCount} / 6 ур.` : "6 уровней";
    }

    const badgeMemory = document.getElementById("mode-badge-memory");
    if (badgeMemory) {
      const isDone = this.state.completedModes.includes("memory");
      badgeMemory.textContent = isDone ? `✓ Освоен (${sec} с)` : `${sec} секунд`;
      badgeMemory.className = isDone
        ? "text-[11px] font-black px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800"
        : "text-[11px] font-black px-2 py-0.5 rounded-lg bg-amber-100 text-amber-800";
    }

    const modeTitleMemory = document.getElementById("mode-title-memory");
    if (modeTitleMemory) {
      modeTitleMemory.textContent = `Фотопамять (${sec} сек)`;
    }

    const modeDescMemory = document.getElementById("mode-desc-memory");
    if (modeDescMemory) {
      modeDescMemory.textContent = `Ингредиенты видны ${sec} секунд, затем исчезают — собери по памяти`;
    }

    const badgeReverse = document.getElementById("mode-badge-reverse");
    if (badgeReverse) {
      const isDone = this.state.completedModes.includes("reverse");
      badgeReverse.textContent = isDone ? "✓ Освоен" : "По составу";
      badgeReverse.className = isDone
        ? "text-[11px] font-black px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800"
        : "text-[11px] font-black px-2 py-0.5 rounded-lg bg-sky-100 text-sky-800";
    }

    const distractorLabel = document.getElementById("distractor-label-text");
    if (distractorLabel) {
      if (this.state.gameMode === "reverse") {
        distractorLabel.textContent = "Количество неверных пицц в списке (ловушек):";
      } else {
        distractorLabel.textContent = "Количество неверных ингредиентов (ловушек):";
      }
    }

    const memorySecondsBar = document.getElementById("memory-seconds-bar");
    if (memorySecondsBar) {
      if (this.state.gameMode === "memory") {
        memorySecondsBar.classList.remove("hidden");
      } else {
        memorySecondsBar.classList.add("hidden");
      }
    }

    const heroStartText = document.getElementById("hero-start-text");
    if (heroStartText) {
      if (this.state.gameMode === "memory") {
        heroStartText.textContent = `Запустить «Фотопамять (${sec} сек)»`;
      } else if (this.state.gameMode === "reverse") {
        heroStartText.textContent = "Запустить «Угадай пиццу»";
      } else {
        heroStartText.textContent = "Начать тренировку";
      }
    }
  },

  setDistractorCount(count) {
    this.state.distractorCount = count;
    this.saveStorage();
    this.updateDistractorPillsUI();
    this.renderLobby();
    SoundFx.playPop();
  },

  updateDistractorPillsUI() {
    [5, 10, 15, 20].forEach(val => {
      const pill = document.getElementById(`pill-${val}`);
      if (pill) {
        if (this.state.distractorCount === val) {
          pill.className = "pill-opt active px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black";
        } else {
          pill.className = "pill-opt px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold";
        }
      }
    });
  },

  setMemorySeconds(seconds) {
    if (![5, 10, 15, 20].includes(seconds)) return;
    this.state.memorySeconds = seconds;
    this.saveStorage();
    this.updateMemorySecondsPillsUI();
    this.updateModeSelectorUI();
    this.renderLobby();
    SoundFx.playPop();
  },

  updateMemorySecondsPillsUI() {
    [5, 10, 15, 20].forEach(val => {
      const pill = document.getElementById(`sec-pill-${val}`);
      if (pill) {
        if (this.state.memorySeconds === val) {
          pill.className = "pill-opt active px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black";
        } else {
          pill.className = "pill-opt px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold";
        }
      }
    });
  },

  renderLobby() {
    const container = document.getElementById("levels-container");
    if (!container) return;
    container.innerHTML = "";

    if (this.state.gameMode === "classic") {
      container.className = "w-full grid grid-cols-1 md:grid-cols-2 gap-4";
      LEVELS.forEach(lvl => {
        const isCompleted = this.state.completedLevels.includes(lvl.level);

        const card = document.createElement("div");
        card.className = `bg-white border-2 ${
          isCompleted ? "border-emerald-300 bg-emerald-50/20" : "border-slate-200"
        } rounded-3xl p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between`;

        card.innerHTML = `
          <div>
            ${
              isCompleted
                ? '<div class="flex justify-end mb-3"><span class="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 flex items-center gap-1">✓ Освоен (23/23)</span></div>'
                : ""
            }

            <div class="flex items-center gap-3 mb-2">
              <div class="w-12 h-12 rounded-2xl text-white flex items-center justify-center font-black text-xl shadow-xs" style="background:${lvl.badgeBg}">
                ${lvl.level}
              </div>
              <div>
                <h3 class="text-lg font-black text-slate-800">${lvl.title}</h3>
                <p class="text-xs font-extrabold text-slate-500">${lvl.subtitle}</p>
              </div>
            </div>

            <p class="text-xs font-semibold text-slate-600 mt-2 mb-4 leading-relaxed">${lvl.desc}</p>
          </div>

          <button onclick="App.startLevel(${lvl.level})" class="${lvl.btnColor} w-full font-black text-sm py-3 rounded-2xl flex items-center justify-center gap-2">
            <span>${isCompleted ? "ПОВТОРИТЬ УРОВЕНЬ" : "ТРЕНИРОВАТЬСЯ (23 ПИЦЦЫ)"}</span>
            <span>➔</span>
          </button>
        `;

        container.appendChild(card);
      });
    } else if (this.state.gameMode === "memory") {
      container.className = "w-full grid grid-cols-1 gap-4";
      const isCompleted = this.state.completedModes.includes("memory");
      const sec = this.state.memorySeconds;
      const card = document.createElement("div");
      card.className = `bg-white border-2 ${
        isCompleted ? "border-emerald-300 bg-emerald-50/20" : "border-slate-200"
      } rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between`;

      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between gap-2 mb-4">
            <span class="text-xs font-black uppercase px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              Режим 2 • Тренировка зрительной памяти
            </span>
            ${
              isCompleted
                ? '<span class="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">✓ Освоен (23/23)</span>'
                : ""
            }
          </div>

          <div class="flex items-center gap-4 mb-3">
            <div class="w-14 h-14 rounded-2xl text-white flex items-center justify-center font-black text-2xl shadow-xs shrink-0" style="background:linear-gradient(135deg, #f59e0b, #ea580c)">
              ⏱️
            </div>
            <div>
              <h3 class="text-xl sm:text-2xl font-black text-slate-800">Фотопамять: ${sec} секунд</h3>
              <p class="text-xs sm:text-sm font-extrabold text-slate-500">Запомни полный состав и собери пиццу по памяти</p>
            </div>
          </div>

          <p class="text-sm font-semibold text-slate-600 mt-3 mb-5 leading-relaxed">
            Появляется пицца и <strong>на ${sec} секунд открываются все её ингредиенты</strong>. Затем весь состав скрывается, и тебе нужно безошибочно выбрать все ингредиенты этой пиццы из общего пула (правильные ингредиенты + <strong>${this.state.distractorCount} ошибочных вариантов-ловушек</strong>).
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6 text-xs font-bold text-slate-600">
            <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-2">
              <span class="text-lg">👀</span>
              <span>${sec} секунд на показ всех ингредиентов</span>
            </div>
            <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-2">
              <span class="text-lg">🧠</span>
              <span>Полная сборка рецепта после исчезновения</span>
            </div>
            <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-2">
              <span class="text-lg">🎯</span>
              <span>+${this.state.distractorCount} ошибочных ингредиентов в пуле</span>
            </div>
          </div>
        </div>

        <button onclick="App.startMemoryMode()" class="btn-duo-orange w-full font-black text-base py-4 rounded-2xl flex items-center justify-center gap-2">
          <span>${isCompleted ? `ПОВТОРИТЬ «ФОТОПАМЯТЬ» (${sec} СЕК • 23 ПИЦЦЫ)` : `НАЧАТЬ «ФОТОПАМЯТЬ» (${sec} СЕК • 23 ПИЦЦЫ)`}</span>
          <span>➔</span>
        </button>
      `;
      container.appendChild(card);
    } else if (this.state.gameMode === "reverse") {
      container.className = "w-full grid grid-cols-1 gap-4";
      const isCompleted = this.state.completedModes.includes("reverse");
      const card = document.createElement("div");
      card.className = `bg-white border-2 ${
        isCompleted ? "border-emerald-300 bg-emerald-50/20" : "border-slate-200"
      } rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between`;

      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between gap-2 mb-4">
            <span class="text-xs font-black uppercase px-3 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
              Режим 3 • Обратная проверка знаний
            </span>
            ${
              isCompleted
                ? '<span class="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">✓ Освоен (23/23)</span>'
                : ""
            }
          </div>

          <div class="flex items-center gap-4 mb-3">
            <div class="w-14 h-14 rounded-2xl text-white flex items-center justify-center font-black text-2xl shadow-xs shrink-0" style="background:linear-gradient(135deg, #0ea5e9, #2563eb)">
              🔍
            </div>
            <div>
              <h3 class="text-xl sm:text-2xl font-black text-slate-800">Угадай пиццу по составу</h3>
              <p class="text-xs sm:text-sm font-extrabold text-slate-500">Определи правильное название пиццы по списку ингредиентов</p>
            </div>
          </div>

          <p class="text-sm font-semibold text-slate-600 mt-3 mb-5 leading-relaxed">
            На карточке сразу показан <strong>полный состав пиццы</strong>, но её название скрыто. Из списка вариантов (правильная пицца + <strong>${this.state.distractorCount} ошибочных пицц-ловушек</strong>) нужно выбрать верное название блюда.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6 text-xs font-bold text-slate-600">
            <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-2">
              <span class="text-lg">🥗</span>
              <span>Все ингредиенты пиццы открыты сразу</span>
            </div>
            <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-2">
              <span class="text-lg">🍕</span>
              <span>Выбор правильной пиццы из списка</span>
            </div>
            <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-2">
              <span class="text-lg">🎯</span>
              <span>+${this.state.distractorCount} ошибочных пицц для проверки</span>
            </div>
          </div>
        </div>

        <button onclick="App.startReverseMode()" class="btn-duo-blue w-full font-black text-base py-4 rounded-2xl flex items-center justify-center gap-2">
          <span>${isCompleted ? "ПОВТОРИТЬ РЕЖИМ «УГАДАЙ ПИЦЦУ» (23 ПИЦЦЫ)" : "НАЧАТЬ РЕЖИМ «УГАДАЙ ПИЦЦУ» (23 ПИЦЦЫ)"}</span>
          <span>➔</span>
        </button>
      `;
      container.appendChild(card);
    }
  },

  startFirstIncompleteLevel() {
    if (this.state.gameMode === "memory") {
      this.startMemoryMode();
      return;
    }
    if (this.state.gameMode === "reverse") {
      this.startReverseMode();
      return;
    }
    const next = LEVELS.find(l => !this.state.completedLevels.includes(l.level)) || LEVELS[0];
    this.startLevel(next.level);
  },

  goToLobby() {
    this.clearMemoryTimer();
    document.getElementById("view-lobby").classList.remove("hidden");
    document.getElementById("view-game").classList.add("hidden");
    document.getElementById("view-success").classList.add("hidden");
    this.updateModeSelectorUI();
    this.renderLobby();
  },

  startLevel(levelNumber) {
    this.clearMemoryTimer();
    const config = LEVELS.find(l => l.level === levelNumber);
    if (!config) return;

    this.state.gameMode = "classic";
    this.state.currentLevelConfig = config;
    this.state.pizzaQueue = [...PIZZA_DATABASE].sort(() => 0.5 - Math.random());
    this.state.pizzaIndex = 0;
    this.state.waitingNext = false;
    this.state.levelCorrect = 0;
    this.state.levelMistakes = 0;

    document.getElementById("view-lobby").classList.add("hidden");
    document.getElementById("view-success").classList.add("hidden");
    document.getElementById("view-game").classList.remove("hidden");

    document.getElementById("game-level-badge").textContent = `${config.title} • ${config.subtitle}`;

    this.loadCurrentPizzaQuestion();
  },

  startMemoryMode() {
    this.clearMemoryTimer();
    const sec = this.state.memorySeconds;
    this.state.gameMode = "memory";
    this.state.currentLevelConfig = {
      mode: "memory",
      title: `Фотопамять (${sec} сек)`,
      subtitle: `Запомни состав за ${sec} секунд`
    };
    this.state.pizzaQueue = [...PIZZA_DATABASE].sort(() => 0.5 - Math.random());
    this.state.pizzaIndex = 0;
    this.state.waitingNext = false;
    this.state.levelCorrect = 0;
    this.state.levelMistakes = 0;

    document.getElementById("view-lobby").classList.add("hidden");
    document.getElementById("view-success").classList.add("hidden");
    document.getElementById("view-game").classList.remove("hidden");

    document.getElementById("game-level-badge").textContent = `⏱️ Фотопамять • ${sec} секунд`;

    this.loadCurrentPizzaQuestion();
  },

  startReverseMode() {
    this.clearMemoryTimer();
    this.state.gameMode = "reverse";
    this.state.currentLevelConfig = {
      mode: "reverse",
      title: "Угадай пиццу",
      subtitle: "По составу ингредиентов"
    };
    this.state.pizzaQueue = [...PIZZA_DATABASE].sort(() => 0.5 - Math.random());
    this.state.pizzaIndex = 0;
    this.state.waitingNext = false;
    this.state.levelCorrect = 0;
    this.state.levelMistakes = 0;

    document.getElementById("view-lobby").classList.add("hidden");
    document.getElementById("view-success").classList.add("hidden");
    document.getElementById("view-game").classList.remove("hidden");

    document.getElementById("game-level-badge").textContent = "🔍 Угадай пиццу • По составу";

    this.loadCurrentPizzaQuestion();
  },

  loadCurrentPizzaQuestion() {
    this.clearMemoryTimer();
    const pizza = this.state.pizzaQueue[this.state.pizzaIndex];
    this.state.currentPizza = pizza;
    this.state.waitingNext = false;
    this.state.userPicks = [];

    const currentNum = this.state.pizzaIndex + 1;
    const totalNum = this.state.pizzaQueue.length;
    document.getElementById("game-counter").textContent = `${currentNum} / ${totalNum}`;
    document.getElementById("game-progress-bar").style.width = `${(currentNum / totalNum) * 100}%`;

    if (this.state.gameMode === "reverse") {
      this.state.memoryPhase = "input";
      this.state.hiddenIngredients = [pizza.name];
      this.state.hiddenIndices = new Set();
      this.state.userPicks = [null];

      const poolSet = new Set([pizza.name]);
      const targetDistractors = this.state.distractorCount;
      const availablePizzas = PIZZA_DATABASE.map(p => p.name)
        .filter(name => name !== pizza.name)
        .sort(() => 0.5 - Math.random());

      for (const distractorPizza of availablePizzas) {
        if (poolSet.size >= 1 + targetDistractors) break;
        poolSet.add(distractorPizza);
      }

      this.state.poolOptions = Array.from(poolSet).sort(() => 0.5 - Math.random());
      this.renderQuestionUI();
      this.resetFooter();
      return;
    }

    const allIngs = [...pizza.ingredients];
    const countToHide =
      this.state.gameMode === "memory"
        ? allIngs.length
        : Math.min(this.state.currentLevelConfig.blanks, allIngs.length);

    const shuffledIndices = allIngs.map((_, i) => i).sort(() => 0.5 - Math.random());
    const hiddenIndices = new Set(shuffledIndices.slice(0, countToHide));
    this.state.hiddenIndices = hiddenIndices;

    this.state.hiddenIngredients = allIngs.filter((_, idx) => hiddenIndices.has(idx));
    this.state.userPicks = new Array(this.state.hiddenIngredients.length).fill(null);

    const knownIngredients = new Set(allIngs.filter((_, idx) => !hiddenIndices.has(idx)));
    const poolSet = new Set(this.state.hiddenIngredients);

    const targetDistractors = this.state.distractorCount;
    const availableDistractors = ALL_INGREDIENTS.filter(
      item => !knownIngredients.has(item) && !poolSet.has(item)
    ).sort(() => 0.5 - Math.random());

    for (const distractor of availableDistractors) {
      if (poolSet.size >= this.state.hiddenIngredients.length + targetDistractors) break;
      poolSet.add(distractor);
    }

    this.state.poolOptions = Array.from(poolSet).sort(() => 0.5 - Math.random());

    if (this.state.gameMode === "memory") {
      this.state.memoryPhase = "preview";
      this.renderQuestionUI();
      this.resetFooter();
      this.startMemoryCountdown();
    } else {
      this.state.memoryPhase = "input";
      this.renderQuestionUI();
      this.resetFooter();
    }
  },

  startMemoryCountdown() {
    this.clearMemoryTimer();
    const durationMs = this.state.memorySeconds * 1000;
    this.state.memoryEndTime = Date.now() + durationMs;

    const timerText = document.getElementById("memory-timer-text");
    const timerBar = document.getElementById("memory-timer-bar");
    if (timerText) {
      timerText.textContent = `Запомните все ингредиенты: ${this.state.memorySeconds.toFixed(1)} сек`;
    }
    if (timerBar) {
      timerBar.style.width = "100%";
    }

    this.state.memoryTimerId = setInterval(() => {
      const remainingMs = Math.max(0, this.state.memoryEndTime - Date.now());
      const pct = (remainingMs / durationMs) * 100;

      if (timerText) {
        timerText.textContent = `Запомните все ингредиенты: ${(remainingMs / 1000).toFixed(1)} сек`;
      }
      if (timerBar) {
        timerBar.style.width = `${pct}%`;
      }

      if (remainingMs <= 0) {
        this.clearMemoryTimer();
        this.state.memoryPhase = "input";
        SoundFx.playRemove();
        this.renderQuestionUI();
      }
    }, 50);
  },

  skipMemoryPreview() {
    if (this.state.gameMode !== "memory" || this.state.memoryPhase !== "preview") return;
    this.clearMemoryTimer();
    this.state.memoryPhase = "input";
    SoundFx.playRemove();
    this.renderQuestionUI();
  },

  renderQuestionUI() {
    const pizza = this.state.currentPizza;
    document.getElementById("pizza-emoji").textContent = "🍕";

    const kickerEl = document.getElementById("pizza-card-kicker");
    const titleEl = document.getElementById("pizza-title");
    const memoryBanner = document.getElementById("memory-timer-banner");
    const reverseSlotContainer = document.getElementById("reverse-slot-container");
    const reverseSelectedSlot = document.getElementById("reverse-selected-slot");
    const slotsContainer = document.getElementById("recipe-slots-container");
    const poolContainer = document.getElementById("ingredient-pool");
    const poolTitleLabel = document.getElementById("pool-title-label");
    const remainingText = document.getElementById("remaining-blanks-text");
    const checkBtn = document.getElementById("btn-check-action");
    const resetBtn = document.getElementById("btn-reset-selection");

    slotsContainer.innerHTML = "";
    poolContainer.innerHTML = "";

    // РЕЖИМ 3: Угадай пиццу по составу
    if (this.state.gameMode === "reverse") {
      memoryBanner.classList.add("hidden");
      reverseSlotContainer.classList.remove("hidden");

      kickerEl.textContent = "Угадай пиццу по составу";
      kickerEl.className =
        "text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-200 inline-block mb-1";

      titleEl.textContent = this.state.waitingNext ? pizza.name : "Какая это пицца?";

      const currentPick = this.state.userPicks[0];
      if (currentPick) {
        reverseSelectedSlot.innerHTML = `
          <div onclick="App.removePick(0)" class="slot-filled font-extrabold text-sm sm:text-base px-4 py-3 rounded-2xl flex items-center justify-between gap-2 pop-in">
            <span class="flex items-center gap-2"><span>🍕</span><span>${currentPick}</span></span>
            <span class="text-rose-500 font-black text-sm">✕</span>
          </div>
        `;
      } else {
        reverseSelectedSlot.innerHTML = `
          <div class="slot-blank font-extrabold text-xs sm:text-sm px-4 py-3 rounded-2xl flex items-center gap-2">
            <span class="text-amber-500 font-black text-sm">➕</span>
            <span class="text-amber-900 opacity-75">Выберите правильную пиццу из списка ниже</span>
          </div>
        `;
      }

      pizza.ingredients.forEach(ing => {
        const slot = document.createElement("div");
        slot.className = "slot-known font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl flex items-center gap-1.5";
        slot.innerHTML = `<span>✓</span><span>${ing}</span>`;
        slotsContainer.appendChild(slot);
      });

      poolTitleLabel.textContent = "Варианты пицц:";
      remainingText.textContent = currentPick ? "Пицца выбрана!" : "Нужно выбрать: 1";

      poolContainer.className = "grid grid-cols-1 sm:grid-cols-2 gap-2.5";
      this.state.poolOptions.forEach(opt => {
        const isSelected = currentPick === opt;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `ing-card font-bold text-xs sm:text-sm p-3.5 rounded-2xl text-left flex items-center justify-between gap-2 ${
          isSelected ? "selected-choice" : ""
        }`;
        btn.onclick = () => App.pickIngredient(opt);
        btn.innerHTML = `
          <span class="flex items-center gap-2 break-words">
            <span>🍕</span>
            <span>${opt}</span>
          </span>
          <span class="${isSelected ? "text-blue-600" : "text-slate-300"} text-xs ml-1 font-black shrink-0">${
          isSelected ? "✓" : "＋"
        }</span>
        `;
        poolContainer.appendChild(btn);
      });

      checkBtn.disabled = !currentPick && !this.state.waitingNext;
      if (currentPick && !this.state.waitingNext) {
        resetBtn.classList.remove("hidden");
      } else {
        resetBtn.classList.add("hidden");
      }
      return;
    }

    // РЕЖИМ 1 (Классический) и РЕЖИМ 2 (Фотопамять)
    reverseSlotContainer.classList.add("hidden");
    kickerEl.textContent =
      this.state.gameMode === "memory" ? `Фотопамять • ${this.state.memorySeconds} секунд` : "Рецепт пиццы";
    kickerEl.className =
      this.state.gameMode === "memory"
        ? "text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 inline-block mb-1"
        : "text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block mb-1";

    titleEl.textContent = pizza.name;

    const isPreview = this.state.gameMode === "memory" && this.state.memoryPhase === "preview";
    if (isPreview) {
      memoryBanner.classList.remove("hidden");
    } else {
      memoryBanner.classList.add("hidden");
    }

    let blankCounter = 0;
    pizza.ingredients.forEach((ing, index) => {
      const isHidden = !isPreview && this.state.hiddenIndices && this.state.hiddenIndices.has(index);

      if (!isHidden) {
        const slot = document.createElement("div");
        slot.className = "slot-known font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl flex items-center gap-1.5";
        slot.innerHTML = `<span>✓</span><span>${ing}</span>`;
        slotsContainer.appendChild(slot);
      } else {
        const blankIdx = blankCounter;
        const currentPick = this.state.userPicks[blankIdx];
        blankCounter++;

        const slot = document.createElement("div");
        if (currentPick) {
          slot.className =
            "slot-filled font-extrabold text-xs sm:text-sm px-3.5 py-2 rounded-xl flex items-center gap-2 pop-in";
          slot.onclick = () => App.removePick(blankIdx);
          slot.innerHTML = `
            <span>${currentPick}</span>
            <span class="text-rose-500 font-black text-xs">✕</span>
          `;
        } else {
          slot.className =
            "slot-blank font-extrabold text-xs sm:text-sm px-3.5 py-2 rounded-xl flex items-center gap-1.5";
          slot.innerHTML = `
            <span class="text-amber-500 font-black text-sm">➕</span>
            <span class="text-amber-900 opacity-75">Выберите ингредиент</span>
          `;
        }
        slotsContainer.appendChild(slot);
      }
    });

    poolTitleLabel.textContent = "Варианты ингредиентов:";

    if (isPreview) {
      remainingText.textContent = `Запоминайте: ${pizza.ingredients.length} ингр.`;
      poolContainer.className = "w-full";
      poolContainer.innerHTML = `
        <div class="bg-white border-2 border-dashed border-amber-300 rounded-2xl p-6 text-center text-slate-600 font-bold text-sm flex flex-col items-center gap-2">
          <span class="text-3xl">👀</span>
          <span>Внимательно запомните все ингредиенты пиццы!</span>
          <span class="text-xs text-slate-400">Через ${this.state.memorySeconds} секунд состав исчезнет, и здесь появятся варианты для ответа.</span>
        </div>
      `;
      checkBtn.disabled = true;
      resetBtn.classList.add("hidden");
      return;
    }

    const emptySlotsCount = this.state.userPicks.filter(p => p === null).length;
    remainingText.textContent =
      emptySlotsCount > 0 ? `Нужно заполнить: ${emptySlotsCount}` : "Все слоты заполнены!";

    poolContainer.className = "grid grid-cols-2 sm:grid-cols-3 gap-2.5";
    this.state.poolOptions.forEach(opt => {
      const isAlreadyPicked = this.state.userPicks.includes(opt);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `ing-card font-bold text-xs sm:text-sm p-3 rounded-2xl text-left flex items-center justify-between ${
        isAlreadyPicked ? "picked" : ""
      }`;
      btn.onclick = () => App.pickIngredient(opt);
      btn.innerHTML = `
        <span class="break-words line-clamp-2">${opt}</span>
        <span class="text-slate-300 text-xs ml-1 font-black shrink-0">${isAlreadyPicked ? "✓" : "＋"}</span>
      `;
      poolContainer.appendChild(btn);
    });

    const allFilled = !this.state.userPicks.includes(null);
    checkBtn.disabled = !allFilled && !this.state.waitingNext;

    if (this.state.userPicks.some(p => p !== null) && !this.state.waitingNext) {
      resetBtn.classList.remove("hidden");
    } else {
      resetBtn.classList.add("hidden");
    }
  },

  pickIngredient(optionName) {
    if (this.state.waitingNext) return;
    if (this.state.gameMode === "memory" && this.state.memoryPhase === "preview") return;

    if (this.state.gameMode === "reverse") {
      if (this.state.userPicks[0] === optionName) {
        SoundFx.playRemove();
        this.state.userPicks[0] = null;
      } else {
        SoundFx.playPop();
        this.state.userPicks[0] = optionName;
      }
      this.renderQuestionUI();
      return;
    }

    const emptyIdx = this.state.userPicks.findIndex(p => p === null);
    if (emptyIdx === -1) return;

    SoundFx.playPop();
    this.state.userPicks[emptyIdx] = optionName;
    this.renderQuestionUI();
  },

  removePick(blankIndex) {
    if (this.state.waitingNext) return;
    SoundFx.playRemove();
    this.state.userPicks[blankIndex] = null;
    this.renderQuestionUI();
  },

  resetCurrentSlots() {
    if (this.state.waitingNext) return;
    SoundFx.playRemove();
    this.state.userPicks = new Array(this.state.hiddenIngredients.length).fill(null);
    this.renderQuestionUI();
  },

  handleCheckOrNext() {
    if (this.state.waitingNext) {
      this.state.pizzaIndex++;
      if (this.state.pizzaIndex >= this.state.pizzaQueue.length) {
        this.finishLevel();
      } else {
        this.loadCurrentPizzaQuestion();
      }
      return;
    }

    const userSelected = [...this.state.userPicks].sort();
    const correctTarget = [...this.state.hiddenIngredients].sort();

    let isCorrect = true;
    for (let i = 0; i < correctTarget.length; i++) {
      if (userSelected[i] !== correctTarget[i]) {
        isCorrect = false;
        break;
      }
    }

    this.showFeedback(isCorrect);
  },

  showFeedback(isCorrect) {
    this.state.waitingNext = true;
    if (isCorrect) this.state.levelCorrect++;
    else this.state.levelMistakes++;

    if (this.state.gameMode === "reverse") {
      document.getElementById("pizza-title").textContent = this.state.currentPizza.name;
    }

    const footer = document.getElementById("game-footer");
    const panel = document.getElementById("feedback-panel");
    const icon = document.getElementById("feedback-icon");
    const title = document.getElementById("feedback-title");
    const subtitle = document.getElementById("feedback-subtitle");
    const checkBtn = document.getElementById("btn-check-action");
    const resetBtn = document.getElementById("btn-reset-selection");

    panel.classList.remove("hidden");
    resetBtn.classList.add("hidden");
    checkBtn.disabled = false;
    checkBtn.textContent = "ПРОДОЛЖИТЬ";

    if (isCorrect) {
      SoundFx.playCorrect();
      footer.className = "fixed bottom-0 left-0 right-0 border-t-2 border-emerald-300 bg-emerald-100 p-4 z-40";
      icon.textContent = "🎉";
      title.className = "font-black text-emerald-800 text-lg leading-tight";
      title.textContent =
        this.state.gameMode === "reverse" ? "Блестяще! Пицца угадана верно!" : "Блестяще! Точный состав!";
      subtitle.className = "text-xs sm:text-sm font-bold text-emerald-700";
      subtitle.textContent =
        this.state.gameMode === "reverse"
          ? `Это действительно «${this.state.currentPizza.name}».`
          : `Пицца «${this.state.currentPizza.name}» собрана верно.`;
      checkBtn.className =
        "btn-duo-green w-full sm:w-auto sm:min-w-[200px] font-black text-base py-3.5 px-6 rounded-2xl";
    } else {
      SoundFx.playWrong();
      const card = document.getElementById("pizza-card-container");
      card.classList.add("shake-error");
      setTimeout(() => card.classList.remove("shake-error"), 450);

      footer.className = "fixed bottom-0 left-0 right-0 border-t-2 border-rose-300 bg-rose-100 p-4 z-40";
      icon.textContent = "❌";
      title.className = "font-black text-rose-800 text-lg leading-tight";
      title.textContent =
        this.state.gameMode === "reverse" ? "Ошибка! Неверная пицца!" : "Ошибка в составе!";
      subtitle.className = "text-xs sm:text-sm font-bold text-rose-700";
      subtitle.textContent =
        this.state.gameMode === "reverse"
          ? `Правильный ответ: ${this.state.currentPizza.name}`
          : `Правильные ингредиенты: ${this.state.hiddenIngredients.join(", ")}`;
      checkBtn.className =
        "btn-duo-red w-full sm:w-auto sm:min-w-[200px] font-black text-base py-3.5 px-6 rounded-2xl";
    }
  },

  resetFooter() {
    const footer = document.getElementById("game-footer");
    const panel = document.getElementById("feedback-panel");
    const checkBtn = document.getElementById("btn-check-action");

    footer.className = "fixed bottom-0 left-0 right-0 border-t-2 border-slate-200 bg-white p-4 z-40";
    panel.classList.add("hidden");
    checkBtn.className =
      "btn-duo-green w-full sm:w-auto sm:min-w-[200px] font-black text-base py-3.5 px-6 rounded-2xl";
    checkBtn.textContent = "ПРОВЕРИТЬ";
    checkBtn.disabled = true;
  },

  finishLevel() {
    this.clearMemoryTimer();
    const lvl = this.state.currentLevelConfig;
    const total = this.state.pizzaQueue.length;
    const correct = this.state.levelCorrect;
    const mistakes = this.state.levelMistakes;
    const perfect = mistakes === 0 && correct === total;

    if (perfect) {
      SoundFx.playFanfare();
      if (typeof confetti === "function") {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
      if (this.state.gameMode === "classic" && lvl.level) {
        if (!this.state.completedLevels.includes(lvl.level)) {
          this.state.completedLevels.push(lvl.level);
        }
      } else if (this.state.gameMode === "memory" || this.state.gameMode === "reverse") {
        if (!this.state.completedModes.includes(this.state.gameMode)) {
          this.state.completedModes.push(this.state.gameMode);
        }
      }
      this.saveStorage();
    }

    document.getElementById("view-game").classList.add("hidden");
    document.getElementById("view-success").classList.remove("hidden");

    const emoji = document.getElementById("success-emoji");
    const kicker = document.getElementById("success-kicker");
    const statCard = document.getElementById("success-stat-card");
    const statLabel = document.getElementById("success-stat-label");
    const statValue = document.getElementById("success-stat-value");

    if (perfect) {
      emoji.textContent = "🎉";
      emoji.classList.remove("hidden");
      kicker.className =
        "text-xs uppercase font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full mb-2";
      kicker.textContent = `${total} пиццы из ${total} освоены!`;
      document.getElementById("success-level-title").textContent = `${lvl.title} пройден!`;
      document.getElementById("success-desc").textContent =
        this.state.gameMode === "reverse"
          ? "Ты безошибочно определил все 23 пиццы по их составу."
          : "Ты безошибочно заполнил все ингредиенты в меню.";
      statCard.className =
        "w-full mb-8 bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 flex flex-col items-center";
      statLabel.className = "text-xs uppercase font-extrabold text-emerald-700 mb-1";
      statLabel.textContent = "Изучено рецептов";
      statValue.className = "text-4xl font-black text-emerald-800";
      statValue.textContent = `${correct} / ${total}`;
    } else {
      emoji.classList.add("hidden");
      kicker.className = "text-xs uppercase font-extrabold text-rose-700 bg-rose-100 px-3 py-1 rounded-full mb-2";
      kicker.textContent = `Верно ${correct} из ${total}`;
      document.getElementById("success-level-title").textContent = `${lvl.title} с ошибками`;
      document.getElementById("success-desc").textContent = `Допущено ${mistakes} ${this.pluralRu(
        mistakes,
        "ошибка",
        "ошибки",
        "ошибок"
      )}. Верных ответов — ${correct} из ${total}.`;
      statCard.className =
        "w-full mb-8 bg-rose-50 border-2 border-rose-200 rounded-2xl p-5 flex flex-col items-center";
      statLabel.className = "text-xs uppercase font-extrabold text-rose-700 mb-1";
      statLabel.textContent = "Верных ответов";
      statValue.className = "text-4xl font-black text-rose-800";
      statValue.textContent = `${correct} / ${total}`;
    }

    const nextBtn = document.getElementById("btn-next-level");

    if (this.state.gameMode === "classic") {
      const nextLevelNumber = lvl.level + 1;
      const nextLvlConfig = LEVELS.find(l => l.level === nextLevelNumber);

      if (nextLvlConfig) {
        nextBtn.textContent = `ПЕРЕЙТИ: ${nextLvlConfig.title}`;
        nextBtn.onclick = () => App.startLevel(nextLevelNumber);
      } else if (perfect) {
        nextBtn.textContent = "ТЫ ОСВОИЛ ВСЕ УРОВНИ! 🏆";
        nextBtn.onclick = () => App.goToLobby();
      } else {
        nextBtn.textContent = `ПОВТОРИТЬ ${lvl.title.toUpperCase()}`;
        nextBtn.onclick = () => App.startLevel(lvl.level);
      }
    } else if (this.state.gameMode === "memory") {
      nextBtn.textContent = perfect ? "СЫГРАТЬ ЕЩЕ РАЗ (ФОТОПАМЯТЬ)" : "ПОВТОРИТЬ «ФОТОПАМЯТЬ»";
      nextBtn.onclick = () => App.startMemoryMode();
    } else if (this.state.gameMode === "reverse") {
      nextBtn.textContent = perfect ? "СЫГРАТЬ ЕЩЕ РАЗ (УГАДАЙ ПИЦЦУ)" : "ПОВТОРИТЬ «УГАДАЙ ПИЦЦУ»";
      nextBtn.onclick = () => App.startReverseMode();
    }
  },

  goToNextLevel() {
    if (this.state.gameMode === "memory") {
      this.startMemoryMode();
      return;
    }
    if (this.state.gameMode === "reverse") {
      this.startReverseMode();
      return;
    }
    const current = this.state.currentLevelConfig.level;
    if (current < LEVELS.length) {
      this.startLevel(current + 1);
    } else {
      this.goToLobby();
    }
  },

  confirmExit() {
    this.clearMemoryTimer();
    this.goToLobby();
  },

  openHandbook() {
    document.getElementById("modal-handbook").classList.remove("hidden");
    this.filterHandbook();
  },

  closeHandbook() {
    document.getElementById("modal-handbook").classList.add("hidden");
  },

  renderHandbook() {
    this.filterHandbook();
  },

  filterHandbook() {
    const query = (document.getElementById("handbook-search")?.value || "").toLowerCase().trim();
    const list = document.getElementById("handbook-list");
    if (!list) return;

    const filtered = PIZZA_DATABASE.filter(item => {
      const text = `${item.name} ${item.ingredients.join(" ")}`.toLowerCase();
      return !query || text.includes(query);
    });

    if (filtered.length === 0) {
      list.innerHTML = `<div class="text-center py-8 text-slate-400 font-bold">Ничего не найдено</div>`;
      return;
    }

    list.innerHTML = filtered
      .map(
        pizza => `
          <div class="p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl">
            <div class="flex items-center justify-between mb-1.5">
              <span class="font-black text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
                <span>🍕</span>
                <span>${pizza.name}</span>
              </span>
              <span class="text-xs px-2 py-0.5 rounded-full font-black uppercase bg-emerald-100 text-emerald-800">
                ${pizza.ingredients.length} ингр.
              </span>
            </div>
            <div class="text-xs font-semibold text-slate-600 leading-relaxed">
              <span class="text-slate-400 font-black">Состав:</span> ${pizza.ingredients.join(", ")}.
            </div>
          </div>
        `
      )
      .join("");
  }
};

declare global {
  interface Window {
    App: typeof App;
  }
}

export function initTrainer() {
  window.App = App;
  App.init();
}
