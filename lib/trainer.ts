// @ts-nocheck
import confetti from "canvas-confetti";

    const SoundFx = {
      ctx: null as AudioContext | null,
      muted: false,
      init() {
        if (!this.ctx) {
          const AudioContextCtor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          this.ctx = new AudioContextCtor();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
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
          osc.type = 'sine';
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
          osc.type = 'sine';
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
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(523.25, now);
          osc.frequency.setValueAtTime(659.25, now + 0.08);
          osc.frequency.setValueAtTime(783.99, now + 0.16);
          osc.frequency.setValueAtTime(1046.50, now + 0.24);
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
          osc.type = 'sine';
          osc.frequency.setValueAtTime(261.63, now); // C4
          osc.frequency.linearRampToValueAtTime(196.00, now + 0.2); // G3
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
          const notes = [523.25, 659.25, 783.99, 1046.50, 880, 1046.50, 1318.5];
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

    const ALL_INGREDIENTS = Array.from(new Set(
      PIZZA_DATABASE.flatMap(p => p.ingredients)
    ));

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
        completedLevels: [],
        distractorCount: 10, // 5, 10, 15, 20
        currentLevelConfig: null,
        pizzaQueue: [],
        pizzaIndex: 0,
        currentPizza: null,
        hiddenIngredients: [],
        userPicks: [],
        poolOptions: [],
        waitingNext: false,
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
        this.renderLobby();
        this.renderHandbook();
      },

      loadStorage() {
        try {
          const raw = localStorage.getItem('italingo_save');
          if (raw) {
            const data = JSON.parse(raw);
            this.state.completedLevels = data.completedLevels || [];
            if ([5, 10, 15, 20].includes(data.distractorCount)) {
              this.state.distractorCount = data.distractorCount;
            }
          }
        } catch (e) {}
      },

      saveStorage() {
        try {
          const data = {
            completedLevels: this.state.completedLevels,
            distractorCount: this.state.distractorCount
          };
          localStorage.setItem('italingo_save', JSON.stringify(data));
        } catch (e) {}
      },

      toggleSound() {
        const isMuted = SoundFx.toggleMute();
        const icon = document.getElementById('sound-icon');
        const text = document.getElementById('sound-text');
        if (isMuted) {
          icon.textContent = '🔇';
          text.textContent = 'Выкл';
        } else {
          icon.textContent = '🔊';
          text.textContent = 'Звук';
          SoundFx.playPop();
        }
      },

      setDistractorCount(count) {
        this.state.distractorCount = count;
        this.saveStorage();
        this.updateDistractorPillsUI();
        SoundFx.playPop();
      },

      updateDistractorPillsUI() {
        [5, 10, 15, 20].forEach(val => {
          const pill = document.getElementById(`pill-${val}`);
          if (pill) {
            if (this.state.distractorCount === val) {
              pill.className = 'pill-opt active px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black';
            } else {
              pill.className = 'pill-opt px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold';
            }
          }
        });
      },

      renderLobby() {
        const container = document.getElementById('levels-container');
        container.innerHTML = '';

        LEVELS.forEach(lvl => {
          const isCompleted = this.state.completedLevels.includes(lvl.level);

          const card = document.createElement('div');
          card.className = `bg-white border-2 ${isCompleted ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200'} rounded-3xl p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between`;

          card.innerHTML = `
            <div>
              ${isCompleted ? '<div class="flex justify-end mb-3"><span class="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 flex items-center gap-1">✓ Освоен (23/23)</span></div>' : ''}

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
              <span>${isCompleted ? 'ПОВТОРИТЬ УРОВЕНЬ' : 'ТРЕНИРОВАТЬСЯ (23 ПИЦЦЫ)'}</span>
              <span>➔</span>
            </button>
          `;

          container.appendChild(card);
        });
      },

      startFirstIncompleteLevel() {
        const next = LEVELS.find(l => !this.state.completedLevels.includes(l.level)) || LEVELS[0];
        this.startLevel(next.level);
      },

      goToLobby() {
        document.getElementById('view-lobby').classList.remove('hidden');
        document.getElementById('view-game').classList.add('hidden');
        document.getElementById('view-success').classList.add('hidden');
        this.renderLobby();
      },

      startLevel(levelNumber) {
        const config = LEVELS.find(l => l.level === levelNumber);
        if (!config) return;

        this.state.currentLevelConfig = config;
        this.state.pizzaQueue = [...PIZZA_DATABASE].sort(() => 0.5 - Math.random());
        this.state.pizzaIndex = 0;
        this.state.waitingNext = false;
        this.state.levelCorrect = 0;
        this.state.levelMistakes = 0;

        document.getElementById('view-lobby').classList.add('hidden');
        document.getElementById('view-success').classList.add('hidden');
        document.getElementById('view-game').classList.remove('hidden');

        document.getElementById('game-level-badge').textContent = `${config.title} • ${config.subtitle}`;

        this.loadCurrentPizzaQuestion();
      },

      loadCurrentPizzaQuestion() {
        const pizza = this.state.pizzaQueue[this.state.pizzaIndex];
        this.state.currentPizza = pizza;
        this.state.waitingNext = false;
        this.state.userPicks = [];

        const currentNum = this.state.pizzaIndex + 1;
        const totalNum = this.state.pizzaQueue.length;
        document.getElementById('game-counter').textContent = `${currentNum} / ${totalNum}`;
        document.getElementById('game-progress-bar').style.width = `${(currentNum / totalNum) * 100}%`;

        const allIngs = [...pizza.ingredients];
        const countToHide = Math.min(this.state.currentLevelConfig.blanks, allIngs.length);

        const shuffledIndices = allIngs.map((_, i) => i).sort(() => 0.5 - Math.random());
        const hiddenIndices = new Set(shuffledIndices.slice(0, countToHide));

        this.state.hiddenIngredients = allIngs.filter((_, idx) => hiddenIndices.has(idx));
        this.state.userPicks = new Array(this.state.hiddenIngredients.length).fill(null);

        // Список известных (открытых) ингредиентов текущей пиццы
        const knownIngredients = new Set(allIngs.filter((_, idx) => !hiddenIndices.has(idx)));

        // Пул вариантов:
        const poolSet = new Set(this.state.hiddenIngredients);

        // Набираем РОВНО distractorCount неверных ингредиентов (ловушек)
        const targetDistractors = this.state.distractorCount;
        const availableDistractors = ALL_INGREDIENTS
          .filter(item => !knownIngredients.has(item) && !poolSet.has(item))
          .sort(() => 0.5 - Math.random());

        for (const distractor of availableDistractors) {
          if (poolSet.size >= (this.state.hiddenIngredients.length + targetDistractors)) break;
          poolSet.add(distractor);
        }

        this.state.poolOptions = Array.from(poolSet).sort(() => 0.5 - Math.random());

        this.renderQuestionUI(hiddenIndices);
        this.resetFooter();
      },

      renderQuestionUI(hiddenIndices) {
        const pizza = this.state.currentPizza;
        // Всегда единый эмодзи пиццы
        document.getElementById('pizza-emoji').textContent = '🍕';
        // Только название пиццы БЕЗ номера
        document.getElementById('pizza-title').textContent = pizza.name;

        const slotsContainer = document.getElementById('recipe-slots-container');
        slotsContainer.innerHTML = '';

        let blankCounter = 0;
        pizza.ingredients.forEach((ing, index) => {
          const isHidden = hiddenIndices ? hiddenIndices.has(index) : this.state.hiddenIngredients.includes(ing);

          if (!isHidden) {
            const slot = document.createElement('div');
            slot.className = 'slot-known font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl flex items-center gap-1.5';
            slot.innerHTML = `<span>✓</span><span>${ing}</span>`;
            slotsContainer.appendChild(slot);
          } else {
            const blankIdx = blankCounter;
            const currentPick = this.state.userPicks[blankIdx];
            blankCounter++;

            const slot = document.createElement('div');
            if (currentPick) {
              slot.className = 'slot-filled font-extrabold text-xs sm:text-sm px-3.5 py-2 rounded-xl flex items-center gap-2 pop-in';
              slot.onclick = () => App.removePick(blankIdx);
              slot.innerHTML = `
                <span>${currentPick}</span>
                <span class="text-rose-500 font-black text-xs">✕</span>
              `;
            } else {
              slot.className = 'slot-blank font-extrabold text-xs sm:text-sm px-3.5 py-2 rounded-xl flex items-center gap-1.5';
              slot.innerHTML = `
                <span class="text-amber-500 font-black text-sm">➕</span>
                <span class="text-amber-900 opacity-75">Выберите ингредиент</span>
              `;
            }
            slotsContainer.appendChild(slot);
          }
        });

        const emptySlotsCount = this.state.userPicks.filter(p => p === null).length;
        document.getElementById('remaining-blanks-text').textContent = emptySlotsCount > 0 
          ? `Нужно заполнить: ${emptySlotsCount}` 
          : `Все слоты заполнены!`;

        document.getElementById('pool-title-label').textContent = 'Варианты ингредиентов:';

        const poolContainer = document.getElementById('ingredient-pool');
        poolContainer.innerHTML = '';

        this.state.poolOptions.forEach(opt => {
          const isAlreadyPicked = this.state.userPicks.includes(opt);
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = `ing-card font-bold text-xs sm:text-sm p-3 rounded-2xl text-left flex items-center justify-between ${isAlreadyPicked ? 'picked' : ''}`;
          btn.onclick = () => App.pickIngredient(opt);
          btn.innerHTML = `
            <span class="break-words line-clamp-2">${opt}</span>
            <span class="text-slate-300 text-xs ml-1 font-black shrink-0">${isAlreadyPicked ? '✓' : '＋'}</span>
          `;
          poolContainer.appendChild(btn);
        });

        const allFilled = !this.state.userPicks.includes(null);
        const checkBtn = document.getElementById('btn-check-action');
        checkBtn.disabled = !allFilled && !this.state.waitingNext;

        const resetBtn = document.getElementById('btn-reset-selection');
        if (this.state.userPicks.some(p => p !== null) && !this.state.waitingNext) {
          resetBtn.classList.remove('hidden');
        } else {
          resetBtn.classList.add('hidden');
        }
      },

      pickIngredient(ingredientName) {
        if (this.state.waitingNext) return;

        const emptyIdx = this.state.userPicks.findIndex(p => p === null);
        if (emptyIdx === -1) return;

        SoundFx.playPop();
        this.state.userPicks[emptyIdx] = ingredientName;
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

        const footer = document.getElementById('game-footer');
        const panel = document.getElementById('feedback-panel');
        const icon = document.getElementById('feedback-icon');
        const title = document.getElementById('feedback-title');
        const subtitle = document.getElementById('feedback-subtitle');
        const checkBtn = document.getElementById('btn-check-action');
        const resetBtn = document.getElementById('btn-reset-selection');

        panel.classList.remove('hidden');
        resetBtn.classList.add('hidden');
        checkBtn.disabled = false;
        checkBtn.textContent = 'ПРОДОЛЖИТЬ';

        if (isCorrect) {
          SoundFx.playCorrect();
          footer.className = 'fixed bottom-0 left-0 right-0 border-t-2 border-emerald-300 bg-emerald-100 p-4 z-40';
          icon.textContent = '🎉';
          title.className = 'font-black text-emerald-800 text-lg leading-tight';
          title.textContent = 'Блестяще! Точный состав!';
          subtitle.className = 'text-xs sm:text-sm font-bold text-emerald-700';
          subtitle.textContent = `Пицца «${this.state.currentPizza.name}» собрана верно.`;
          checkBtn.className = 'btn-duo-green w-full sm:w-auto sm:min-w-[200px] font-black text-base py-3.5 px-6 rounded-2xl';
        } else {
          SoundFx.playWrong();
          const card = document.getElementById('pizza-card-container');
          card.classList.add('shake-error');
          setTimeout(() => card.classList.remove('shake-error'), 450);

          footer.className = 'fixed bottom-0 left-0 right-0 border-t-2 border-rose-300 bg-rose-100 p-4 z-40';
          icon.textContent = '❌';
          title.className = 'font-black text-rose-800 text-lg leading-tight';
          title.textContent = 'Ошибка в составе!';
          subtitle.className = 'text-xs sm:text-sm font-bold text-rose-700';
          subtitle.textContent = `Правильные ингредиенты: ${this.state.hiddenIngredients.join(', ')}`;
          checkBtn.className = 'btn-duo-red w-full sm:w-auto sm:min-w-[200px] font-black text-base py-3.5 px-6 rounded-2xl';
        }
      },

      resetFooter() {
        const footer = document.getElementById('game-footer');
        const panel = document.getElementById('feedback-panel');
        const checkBtn = document.getElementById('btn-check-action');

        footer.className = 'fixed bottom-0 left-0 right-0 border-t-2 border-slate-200 bg-white p-4 z-40';
        panel.classList.add('hidden');
        checkBtn.className = 'btn-duo-green w-full sm:w-auto sm:min-w-[200px] font-black text-base py-3.5 px-6 rounded-2xl';
        checkBtn.textContent = 'ПРОВЕРИТЬ';
        checkBtn.disabled = true;
      },

      finishLevel() {
        const lvl = this.state.currentLevelConfig;
        const total = this.state.pizzaQueue.length;
        const correct = this.state.levelCorrect;
        const mistakes = this.state.levelMistakes;
        const perfect = mistakes === 0 && correct === total;

        if (perfect) {
          SoundFx.playFanfare();
          if (typeof confetti === 'function') {
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.6 }
            });
          }
          if (!this.state.completedLevels.includes(lvl.level)) {
            this.state.completedLevels.push(lvl.level);
          }
          this.saveStorage();
        }

        document.getElementById('view-game').classList.add('hidden');
        document.getElementById('view-success').classList.remove('hidden');

        const emoji = document.getElementById('success-emoji');
        const kicker = document.getElementById('success-kicker');
        const statCard = document.getElementById('success-stat-card');
        const statLabel = document.getElementById('success-stat-label');
        const statValue = document.getElementById('success-stat-value');

        if (perfect) {
          emoji.textContent = '🎉';
          emoji.classList.remove('hidden');
          kicker.className = 'text-xs uppercase font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full mb-2';
          kicker.textContent = `${total} пиццы из ${total} освоены!`;
          document.getElementById('success-level-title').textContent = `${lvl.title} пройден!`;
          document.getElementById('success-desc').textContent = 'Ты безошибочно заполнил все пропущенные ингредиенты в меню.';
          statCard.className = 'w-full mb-8 bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 flex flex-col items-center';
          statLabel.className = 'text-xs uppercase font-extrabold text-emerald-700 mb-1';
          statLabel.textContent = 'Изучено рецептов';
          statValue.className = 'text-4xl font-black text-emerald-800';
          statValue.textContent = `${correct} / ${total}`;
        } else {
          emoji.classList.add('hidden');
          kicker.className = 'text-xs uppercase font-extrabold text-rose-700 bg-rose-100 px-3 py-1 rounded-full mb-2';
          kicker.textContent = `Верно ${correct} из ${total}`;
          document.getElementById('success-level-title').textContent = `${lvl.title} с ошибками`;
          document.getElementById('success-desc').textContent =
            `Допущено ${mistakes} ${this.pluralRu(mistakes, 'ошибка', 'ошибки', 'ошибок')}. Верных ответов — ${correct} из ${total}.`;
          statCard.className = 'w-full mb-8 bg-rose-50 border-2 border-rose-200 rounded-2xl p-5 flex flex-col items-center';
          statLabel.className = 'text-xs uppercase font-extrabold text-rose-700 mb-1';
          statLabel.textContent = 'Верных ответов';
          statValue.className = 'text-4xl font-black text-rose-800';
          statValue.textContent = `${correct} / ${total}`;
        }

        const nextLevelNumber = lvl.level + 1;
        const nextLvlConfig = LEVELS.find(l => l.level === nextLevelNumber);
        const nextBtn = document.getElementById('btn-next-level');

        if (nextLvlConfig) {
          nextBtn.textContent = `ПЕРЕЙТИ: ${nextLvlConfig.title}`;
          nextBtn.onclick = () => App.startLevel(nextLevelNumber);
        } else if (perfect) {
          nextBtn.textContent = `ТЫ ОСВОИЛ ВСЕ УРОВНИ! 🏆`;
          nextBtn.onclick = () => App.goToLobby();
        } else {
          nextBtn.textContent = `ПОВТОРИТЬ ${lvl.title.toUpperCase()}`;
          nextBtn.onclick = () => App.startLevel(lvl.level);
        }
      },

      goToNextLevel() {
        const current = this.state.currentLevelConfig.level;
        if (current < LEVELS.length) {
          this.startLevel(current + 1);
        } else {
          this.goToLobby();
        }
      },

      confirmExit() {
        this.goToLobby();
      },

      openHandbook() {
        document.getElementById('modal-handbook').classList.remove('hidden');
        this.filterHandbook();
      },

      closeHandbook() {
        document.getElementById('modal-handbook').classList.add('hidden');
      },

      renderHandbook() {
        this.filterHandbook();
      },

      filterHandbook() {
        const query = (document.getElementById('handbook-search')?.value || '').toLowerCase().trim();
        const list = document.getElementById('handbook-list');
        if (!list) return;

        const filtered = PIZZA_DATABASE.filter(item => {
          const text = `${item.name} ${item.ingredients.join(' ')}`.toLowerCase();
          return !query || text.includes(query);
        });

        if (filtered.length === 0) {
          list.innerHTML = `<div class="text-center py-8 text-slate-400 font-bold">Ничего не найдено</div>`;
          return;
        }

        // В справочнике также строго без номеров и только классический эмодзи 🍕
        list.innerHTML = filtered.map(pizza => `
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
              <span class="text-slate-400 font-black">Состав:</span> ${pizza.ingredients.join(', ')}.
            </div>
          </div>
        `).join('');
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
