export const trainerMarkup = `
  <header class="sticky top-0 z-40 bg-white border-b-2 border-slate-200 px-4 py-2.5 shadow-xs">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      
      <div class="flex items-center gap-2.5 cursor-pointer" onclick="App.goToLobby()">
        <span class="text-3xl hover:scale-110 transition-transform">🍕</span>
        <div class="leading-tight">
          <span class="font-extrabold text-2xl tracking-tight text-emerald-700 block">Italingo</span>
        </div>
      </div>

      <div class="flex items-center gap-2 sm:gap-3">
        
        <button id="btn-sound-toggle" onclick="App.toggleSound()" class="btn-duo-white font-extrabold text-xs px-3 py-2 rounded-xl flex items-center gap-1.5" title="Включить / выключить звук">
          <span id="sound-icon">🔊</span>
          <span class="hidden sm:inline" id="sound-text">Звук</span>
        </button>

        <button onclick="App.openHandbook()" class="btn-duo-white font-black text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5">
          <span>📖</span>
          <span>Меню (23)</span>
        </button>

      </div>

    </div>
  </header>

  <main class="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col justify-start">
    
    <!-- VIEW 1: Level & Mode Selector (Lobby) -->
    <section id="view-lobby" class="w-full flex flex-col items-center pb-16">
      
      <!-- Hero Banner -->
      <div class="hero-banner w-full rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-6 relative overflow-hidden border-2 border-emerald-800">
        <div class="relative z-10 max-w-xl">
          <h1 class="text-2xl sm:text-4xl font-black mb-2 leading-tight drop-shadow-sm">
            Выучи все меню от А до Я
          </h1>
          <p class="text-emerald-100 text-sm sm:text-base font-semibold mb-6 leading-relaxed drop-shadow-xs">
            Интерактивный тренажер рецептуры всех 23 пицц в 3 режимах: сборка по уровням, тренировка фотопамяти на 5 секунд и угадывание пиццы по составу!
          </p>
          <button onclick="App.startFirstIncompleteLevel()" class="bg-amber-400 hover:bg-amber-300 text-amber-950 font-black px-6 py-3.5 rounded-2xl text-sm sm:text-base shadow-md transition transform active:scale-95 flex items-center gap-2">
            <span id="hero-start-text">Начать тренировку</span>
            <span>➔</span>
          </button>
        </div>
      </div>

      <!-- Game Modes Selector -->
      <div class="w-full mb-6">
        <div class="text-xs uppercase font-black text-slate-400 mb-2.5 px-1">Выберите режим игры</div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3" id="modes-selector">
          <button type="button" id="mode-tab-classic" onclick="App.setGameMode('classic')" class="mode-card active rounded-2xl p-4 text-left flex flex-col justify-between gap-2 cursor-pointer">
            <div class="flex items-center justify-between w-full">
              <span class="text-2xl">🧩</span>
              <span id="mode-badge-classic" class="text-[11px] font-black px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800">6 уровней</span>
            </div>
            <div>
              <div class="font-black text-sm sm:text-base text-slate-800">Сборка по уровням</div>
              <div class="text-xs font-semibold text-slate-500 mt-0.5 leading-snug">От 1 пропуска до полной слепой сборки рецепта</div>
            </div>
          </button>

          <button type="button" id="mode-tab-memory" onclick="App.setGameMode('memory')" class="mode-card rounded-2xl p-4 text-left flex flex-col justify-between gap-2 cursor-pointer">
            <div class="flex items-center justify-between w-full">
              <span class="text-2xl">⏱️</span>
              <span id="mode-badge-memory" class="text-[11px] font-black px-2 py-0.5 rounded-lg bg-amber-100 text-amber-800">5 секунд</span>
            </div>
            <div>
              <div id="mode-title-memory" class="font-black text-sm sm:text-base text-slate-800">Фотопамять (5 сек)</div>
              <div id="mode-desc-memory" class="text-xs font-semibold text-slate-500 mt-0.5 leading-snug">Ингредиенты видны 5 секунд, затем исчезают — собери по памяти</div>
            </div>
          </button>

          <button type="button" id="mode-tab-reverse" onclick="App.setGameMode('reverse')" class="mode-card rounded-2xl p-4 text-left flex flex-col justify-between gap-2 cursor-pointer">
            <div class="flex items-center justify-between w-full">
              <span class="text-2xl">🔍</span>
              <span id="mode-badge-reverse" class="text-[11px] font-black px-2 py-0.5 rounded-lg bg-sky-100 text-sky-800">По составу</span>
            </div>
            <div>
              <div class="font-black text-sm sm:text-base text-slate-800">Угадай пиццу</div>
              <div class="text-xs font-semibold text-slate-500 mt-0.5 leading-snug">Показан полный состав — выбери правильную пиццу из списка</div>
            </div>
          </button>
        </div>
      </div>

      <!-- Distractors Setting Bar -->
      <div class="w-full bg-white border-2 border-slate-200 rounded-2xl p-4 mb-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="text-left w-full sm:w-auto">
          <div class="text-xs uppercase font-black text-slate-400">Сложность вариантов</div>
          <div id="distractor-label-text" class="text-sm font-extrabold text-slate-700">Количество неверных вариантов (ловушек):</div>
        </div>
        <div class="flex items-center gap-2 w-full sm:w-auto justify-start sm:justify-end" id="distractor-pills">
          <button onclick="App.setDistractorCount(5)" id="pill-5" class="pill-opt px-3.5 py-1.5 rounded-xl text-xs sm:text-sm">5</button>
          <button onclick="App.setDistractorCount(10)" id="pill-10" class="pill-opt px-3.5 py-1.5 rounded-xl text-xs sm:text-sm">10</button>
          <button onclick="App.setDistractorCount(15)" id="pill-15" class="pill-opt px-3.5 py-1.5 rounded-xl text-xs sm:text-sm">15</button>
          <button onclick="App.setDistractorCount(20)" id="pill-20" class="pill-opt px-3.5 py-1.5 rounded-xl text-xs sm:text-sm">20</button>
        </div>
      </div>

      <!-- Memory Duration Setting Bar (Shown in Memory Mode) -->
      <div id="memory-seconds-bar" class="hidden w-full bg-white border-2 border-slate-200 rounded-2xl p-4 mb-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="text-left w-full sm:w-auto">
          <div class="text-xs uppercase font-black text-slate-400">Время показа рецепта</div>
          <div class="text-sm font-extrabold text-slate-700">Количество секунд на запоминание состава:</div>
        </div>
        <div class="flex items-center gap-2 w-full sm:w-auto justify-start sm:justify-end" id="memory-sec-pills">
          <button onclick="App.setMemorySeconds(5)" id="sec-pill-5" class="pill-opt px-3.5 py-1.5 rounded-xl text-xs sm:text-sm">5 сек</button>
          <button onclick="App.setMemorySeconds(10)" id="sec-pill-10" class="pill-opt px-3.5 py-1.5 rounded-xl text-xs sm:text-sm">10 сек</button>
          <button onclick="App.setMemorySeconds(15)" id="sec-pill-15" class="pill-opt px-3.5 py-1.5 rounded-xl text-xs sm:text-sm">15 сек</button>
          <button onclick="App.setMemorySeconds(20)" id="sec-pill-20" class="pill-opt px-3.5 py-1.5 rounded-xl text-xs sm:text-sm">20 сек</button>
        </div>
      </div>

      <!-- Level / Mode Cards Grid -->
      <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4" id="levels-container">
        <!-- Rendered dynamically -->
      </div>

    </section>

    <!-- VIEW 2: In-Game Pizza Quiz Screen -->
    <section id="view-game" class="hidden w-full max-w-2xl mx-auto flex flex-col flex-1 pb-32">
      
      <div class="w-full flex items-center justify-between gap-3 pt-1 pb-4">
        <button onclick="App.confirmExit()" class="text-slate-400 hover:text-slate-600 font-black text-2xl p-1 rounded-xl">
          ✕
        </button>

        <div class="flex-1 flex flex-col gap-1">
          <div class="flex justify-between items-center text-xs font-black text-slate-500 px-1">
            <span id="game-level-badge" class="uppercase text-emerald-700 font-extrabold tracking-wide">Уровень 1</span>
            <span id="game-counter" class="text-slate-600 font-black">1 / 23</span>
          </div>
          <div class="w-full bg-slate-200 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-300">
            <div id="game-progress-bar" class="h-full bg-emerald-500 rounded-full transition-all duration-300 ease-out" style="width: 5%;"></div>
          </div>
        </div>

        <div class="flex items-center gap-1 text-slate-600 font-black text-xs bg-slate-100 px-2.5 py-1.5 rounded-xl border border-slate-200">
          <span>🍕</span>
          <span>23 в сете</span>
        </div>
      </div>

      <!-- Pizza Card Section -->
      <div class="w-full bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm mb-4 pop-in" id="pizza-card-container">
        
        <div class="flex items-center gap-3 mb-4">
          <div class="w-14 h-14 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-3xl shrink-0 shadow-xs" id="pizza-emoji">
            🍕
          </div>
          <div class="flex-1 min-w-0">
            <span id="pizza-card-kicker" class="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block mb-1">
              Рецепт пиццы
            </span>
            <h2 id="pizza-title" class="text-xl sm:text-2xl font-black text-slate-800 leading-snug">
              Пицца
            </h2>
          </div>
        </div>

        <!-- 5-Second Memory Countdown Banner (Mode 2) -->
        <div id="memory-timer-banner" class="hidden mb-4 p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-200">
          <div class="flex items-center justify-between gap-2 mb-2">
            <div class="flex items-center gap-2 text-amber-900 font-black text-xs sm:text-sm">
              <span class="text-base">⏱️</span>
              <span id="memory-timer-text">Запомните все ингредиенты: 5 сек</span>
            </div>
            <button type="button" onclick="App.skipMemoryPreview()" class="text-xs font-black px-3 py-1 rounded-xl bg-amber-200/80 hover:bg-amber-300 text-amber-950 transition cursor-pointer">
              Скрыть сейчас ➔
            </button>
          </div>
          <div class="w-full bg-amber-200/70 h-2.5 rounded-full overflow-hidden">
            <div id="memory-timer-bar" class="h-full bg-amber-500 rounded-full transition-all duration-100 ease-linear" style="width: 100%;"></div>
          </div>
        </div>

        <!-- Selected Pizza Slot (Mode 3: Guess Pizza by Ingredients) -->
        <div id="reverse-slot-container" class="hidden mb-4">
          <div class="text-xs uppercase font-extrabold text-slate-400 mb-1.5">Ваш ответ (название пиццы):</div>
          <div id="reverse-selected-slot"></div>
        </div>

        <div class="text-xs uppercase font-extrabold text-slate-400 mb-2">
          <span id="recipe-slots-label">Состав пиццы:</span>
        </div>

        <div id="recipe-slots-container" class="flex flex-wrap gap-2">
          <!-- Injected via JS -->
        </div>

      </div>

      <!-- Ingredients / Pizzas Pool -->
      <div class="w-full flex flex-col flex-1">
        <div class="flex items-center justify-between mb-2 px-1">
          <span class="text-xs font-black uppercase text-slate-400" id="pool-title-label">Варианты ингредиентов:</span>
          <span class="text-xs font-bold text-slate-500" id="remaining-blanks-text">Нужно заполнить: 1</span>
        </div>

        <div id="ingredient-pool" class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <!-- dynamic buttons -->
        </div>
      </div>

      <!-- Duolingo Bottom Action Bar -->
      <div id="game-footer" class="fixed bottom-0 left-0 right-0 border-t-2 border-slate-200 bg-white p-4 z-40 transition-colors duration-200">
        <div class="max-w-2xl mx-auto flex items-center justify-between gap-4">
          
          <div id="feedback-panel" class="hidden flex-1 flex items-center gap-3">
            <div id="feedback-icon" class="text-3xl"></div>
            <div>
              <h4 id="feedback-title" class="font-extrabold text-lg leading-tight">Отлично!</h4>
              <p id="feedback-subtitle" class="text-xs sm:text-sm font-semibold opacity-90"></p>
            </div>
          </div>

          <div class="flex items-center gap-2 w-full sm:w-auto">
            <button id="btn-reset-selection" onclick="App.resetCurrentSlots()" class="hidden btn-duo-white font-bold text-sm px-4 py-3.5 rounded-2xl">
              Сброс
            </button>
            <button id="btn-check-action" onclick="App.handleCheckOrNext()" class="btn-duo-green w-full sm:w-auto sm:min-w-[200px] font-black text-base py-3.5 px-6 rounded-2xl" disabled>
              ПРОВЕРИТЬ
            </button>
          </div>

        </div>
      </div>

    </section>

    <!-- VIEW 3: Level Complete Congratulations Screen -->
    <section id="view-success" class="hidden w-full max-w-md mx-auto flex flex-col items-center justify-center text-center py-10 pop-in flex-1">
      <div id="success-emoji" class="text-8xl mb-4 animate-bounce">🎉</div>
      <span id="success-kicker" class="text-xs uppercase font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full mb-2">
        23 пиццы из 23 освоены!
      </span>
      <h2 id="success-level-title" class="text-3xl font-black text-slate-800 mb-2">Уровень пройден!</h2>
      <p id="success-desc" class="text-slate-500 font-semibold mb-6">Ты безошибочно заполнил все пропущенные ингредиенты в меню.</p>

      <div id="success-stat-card" class="w-full mb-8 bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 flex flex-col items-center">
        <span id="success-stat-label" class="text-xs uppercase font-extrabold text-emerald-700 mb-1">Изучено рецептов</span>
        <span id="success-stat-value" class="text-4xl font-black text-emerald-800">23 / 23</span>
      </div>

      <div class="flex flex-col gap-2.5 w-full">
        <button id="btn-next-level" onclick="App.goToNextLevel()" class="btn-duo-green w-full font-black text-lg py-4 rounded-2xl">
          СЛЕДУЮЩИЙ УРОВЕНЬ
        </button>
        <button onclick="App.goToLobby()" class="btn-duo-white w-full font-black text-base py-3.5 rounded-2xl text-slate-700">
          К СПИСКУ РЕЖИМОВ
        </button>
      </div>
    </section>

    <!-- MODAL: Handbook -->
    <div id="modal-handbook" class="hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div class="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border-2 border-slate-200">
        <div class="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div class="flex items-center gap-2">
            <span class="text-2xl">📖</span>
            <div>
              <h3 class="font-extrabold text-lg text-slate-800">Меню пиццы (все 23 позиции)</h3>
              <p class="text-xs text-slate-500 font-bold">Официальная рецептура</p>
            </div>
          </div>
          <button onclick="App.closeHandbook()" class="text-slate-400 hover:text-slate-600 font-black text-2xl px-2">✕</button>
        </div>

        <div class="p-4 border-b border-slate-100 bg-white">
          <input type="text" id="handbook-search" oninput="App.filterHandbook()" placeholder="Поиск пиццы или ингредиента..." class="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-emerald-600 text-sm font-semibold">
        </div>

        <div id="handbook-list" class="overflow-y-auto p-4 space-y-3 flex-1">
          <!-- Rendered by JS -->
        </div>

        <div class="p-3 border-t border-slate-200 bg-slate-50 text-center">
          <button onclick="App.closeHandbook()" class="btn-duo-green px-8 py-2.5 rounded-xl font-bold text-sm">
            Вернуться к тренировке
          </button>
        </div>
      </div>
    </div>

  </main>
`;
