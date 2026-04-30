const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 35, 180)}ms`;
  observer.observe(item);
});

const desktopStage = document.querySelector(".desktop-stage");
const draggableWindows = document.querySelectorAll(".desktop-stage .window");
const homeWindow = document.querySelector(".home-window");
const homeTitlebar = document.querySelector(".home-titlebar");
const folderShortcuts = document.querySelectorAll("[data-target-window]");
const navigableLinks = document.querySelectorAll('a[href]:not([href^="#"])');
const catMediaGrid = document.querySelector("#cat-media-grid");
const resetLayoutButton = document.querySelector(".reset-layout-button");
const themeToggleButton = document.querySelector("#theme-toggle");
const soundToggleButton = document.querySelector("#sound-toggle");
const crtToggleButton = document.querySelector("#crt-toggle");
const wallpaperToggleButton = document.querySelector("#wallpaper-toggle");
const startButton = document.querySelector("#start-button");
const startPanel = document.querySelector("#start-panel");
const startPanelHeader = document.querySelector(".start-panel-header");
const restartButton = document.querySelector("#restart-button");
const taskbarTabs = document.querySelector("#taskbar-tabs");
const taskbarClock = document.querySelector("#taskbar-clock");
const taskbar = document.querySelector(".taskbar");
const videoFullscreenButtons = document.querySelectorAll("[data-fullscreen-video]");
const documentItems = document.querySelectorAll(".document-item[data-doc-target]");
const documentPreviews = document.querySelectorAll(".document-preview[data-doc-preview]");
const copyEmailButtons = document.querySelectorAll("[data-copy-email]");
const gameDetailWindow = document.querySelector('[data-window-id="game-detail-window"]');
const gameDetailTitle = document.querySelector("[data-game-detail-title]");
const gameDetailDescription = document.querySelector("[data-game-detail-description]");
const gameDetailMeta = document.querySelector("[data-game-detail-meta]");
const gameDetailActions = document.querySelector("[data-game-detail-actions]");
const gameDetailTrailerSection = document.querySelector("[data-game-detail-trailer-section]");
const gameDetailTrailer = document.querySelector("[data-game-detail-trailer]");
const gameDetailStillsSection = document.querySelector("[data-game-detail-stills-section]");
const gameDetailStills = document.querySelector("[data-game-detail-stills]");
const gameDetailFrame = document.querySelector("[data-game-detail-frame]");
const gameDetailPlayerSection = document.querySelector("[data-game-detail-player-section]");
const gameDetailDevlog = document.querySelector("[data-game-detail-devlog]");
const gameDetailCover = document.querySelector(".game-detail-cover");
const hoverTrailerCards = document.querySelectorAll("[data-hover-trailer-card]");
const WINDOW_OPEN_ANIMATION_MS = 260;
const WINDOW_CLOSE_ANIMATION_MS = 220;
const TRAILER_SOUND_DELAY_MS = 900;
const BUTTON_CLICK_SOUND_SRC = "sounds/universfield-computer-mouse-click-352734.mp3";
const pendingHideTimers = new WeakMap();
const pendingOpenTimers = new WeakMap();
const windowRouteMap = {
  "about-window": "/about",
  "links-window": "/links",
  "work-window": "/work",
  "faq-window": "/faq",
  "contact-window": "/contact",
  "achievements-window": "/achievements",
  "game-collection": "/work/game",
  "three-d-collection": "/work/3d",
  "document-collection": "/work/documents",
  "cat-collection": "/cat",
};

const gameDetails = {
  "thrifting-101": {
    title: "Thrifting 101",
    routeSlug: "thrifting",
    cover: "assets/game-covers/thrifting-101.png",
    shortDescription: "Experimental Unity 2D game built around interpreting customer intent through outfit requests.",
    overview:
      "Designed a request-response gameplay loop where customers present layered constraints and players assemble outfits based on hidden preference logic, ambiguous requests, and weighted interpretation accuracy.",
    meta: [
      "Role: Game designer and developer",
      "Engine: Unity 2D / C#",
      "Systems: ScriptableObjects, modular data classes, event-driven UI",
      "Impact: 20,000 views / 1,000 likes",
    ],
    actions: [
      { label: "Open In New Tab", href: "games/thriftingshopwebgl/index.html" },
      {
        label: "Download Game",
        href: "https://github.com/pandabeo/WebPortfolioPlayFuture/releases/download/game-downloads/ThriftingShopWin.zip",
        download: "thrifting-101.zip",
      },
      { label: "Open itch.io", href: "https://pandabeo04.itch.io/thrifting-101" },
    ],
    trailer: {
      src: "assets/game-trailers/thrifting-101-trailer.mp4",
      title: "Thrifting 101 trailer",
    },
    player: {
      src: "games/thriftingshopwebgl/index.html",
      title: "Thrifting 101",
    },
    devlog: [
      {
        title: "Rule-based outfit evaluation",
        body: "Implemented weighted scoring for style matching, constraint satisfaction, and interpretation accuracy, enabling outcomes beyond binary success or failure.",
      },
      {
        title: "Responsive feedback systems",
        body: "Developed Unity Canvas feedback with visual cues, dialogue variations, and character reactions to reinforce player understanding of the underlying request logic.",
      },
    ],
  },
  "tales-of-a-playboy": {
    title: "Tales Of A Playboy",
    routeSlug: "playboy",
    cover: "assets/game-covers/tales-of-a-playboy.png",
    shortDescription: "Adventure project presented as a browser-playable character-led piece.",
    overview: "Character-led adventure project with a dedicated space for future design notes and production updates.",
    meta: [
      "Role: Game designer and developer",
      "Format: Unity WebGL",
      "Status: Playable in browser",
    ],
    actions: [
      { label: "Open In New Tab", href: "games/talesofaplayboywebgl/talesofaplayboywebgl/index.html" },
      {
        label: "Download Game",
        href: "https://github.com/pandabeo/WebPortfolioPlayFuture/releases/download/game-downloads/TalesOfAPlayboyWebGL.zip",
        download: "tales-of-a-playboy.zip",
      },
      { label: "Open itch.io", href: "https://pandabeo04.itch.io/tales-of-a-playboy" },
    ],
    trailer: {
      src: "assets/game-trailers/tales-of-a-playboy-trailer.mp4",
      title: "Tales Of A Playboy trailer",
    },
    player: {
      src: "games/talesofaplayboywebgl/talesofaplayboywebgl/index.html",
      title: "Tales Of A Playboy",
    },
    devlog: [],
  },
  "ame-no-naka": {
    title: "Ame no Naka",
    routeSlug: "ame",
    cover: "assets/game-covers/ame-no-naka.png",
    shortDescription: "2D platformer rich-story game developed over three months using Unity Visual Scripting.",
    overview:
      "My first fully realized serious game project, focused on balancing player control and narrative delivery through exploration, dialogue, and puzzle-solving states.",
    meta: [
      "Role: Programmer / systems implementer",
      "Engine: Unity Visual Scripting",
      "Systems: State graphs, modular interactions, event-driven logic",
      "Status: Published on itch.io",
    ],
    actions: [
      {
        label: "Download Game",
        href: "https://github.com/pandabeo/WebPortfolioPlayFuture/releases/download/game-downloads/Ame%20no%20Naka%20Win.zip",
        download: "ame-no-naka.zip",
      },
      { label: "Open itch.io", href: "https://pandabeo04.itch.io/ame-no-naka" },
    ],
    trailer: {
      src: "assets/game-trailers/ame-no-naka-trailer.mp4",
      title: "Ame no Naka trailer",
    },
    webPlayable: false,
    devlog: [
      {
        title: "Visual scripting workflow",
        body: "Built modular interaction systems using state graphs and reusable graph structures, improving iteration speed and gameplay flow clarity.",
      },
      {
        title: "Narrative gameplay flow",
        body: "Connected exploration, dialogue, and puzzle-solving states with smooth transitions to support story pacing without removing player agency.",
      },
    ],
  },
  "homeward": {
    title: "Homeward",
    routeSlug: "homeward",
    cover: "assets/game-covers/homeward.png",
    shortDescription: "Action adventure with dungeon and boss-fight energy.",
    overview: "Action-adventure prototype with a dedicated panel for future combat, level, and polish devlogs.",
    meta: [
      "Role: Game designer and developer",
      "Format: Browser release",
      "Status: Published on itch.io",
    ],
    actions: [
      {
        label: "Download Game",
        href: "https://github.com/pandabeo/WebPortfolioPlayFuture/releases/download/game-downloads/Bui%20Truong%20Thinh_S3975580_Ass1_Homeward_Unity%20Build%20Project.zip",
        download: "homeward.zip",
      },
      { label: "Open itch.io", href: "https://pandabeo04.itch.io/homeward" },
    ],
    devlog: [],
  },
  "coy-commute": {
    title: "Coy Commute",
    routeSlug: "coy",
    cover: "assets/game-covers/coy-commute.png",
    shortDescription: "Emotion-driven Unity 2D game, winner of 1st Place and People's Choice at Gameloft GameDev Mentorship 2025.",
    overview:
      "Designed and implemented a state-driven gameplay system where player emotional states dynamically influence movement, interaction speed, and environmental response.",
    meta: [
      "Award: 1st Place & People's Choice",
      "Engine: Unity 2D / C#",
      "Architecture: Modular state machine, ScriptableObjects, event-driven systems",
      "Status: Playable in browser",
    ],
    actions: [
      { label: "Open In New Tab", href: "games/coycommutewebglver1.0/index.html" },
      {
        label: "Download Game",
        href: "https://github.com/pandabeo/WebPortfolioPlayFuture/releases/download/game-downloads/CoyCommuteWebGLVer1.0.zip",
        download: "coy-commute.zip",
      },
    ],
    trailer: {
      src: "assets/game-trailers/coy-commute-trailer.mp4",
      title: "Coy Commute trailer",
    },
    player: {
      src: "games/coycommutewebglver1.0/index.html",
      title: "Coy Commute",
    },
    devlog: [
      {
        title: "Emotion-state feedback loop",
        body: "Built a player input -> emotional state -> world reaction loop using data-driven parameters so internal states could be communicated without explicit UI or text.",
      },
      {
        title: "Synchronized game feel",
        body: "Tuned visuals, adaptive ambience, animation blending, input delay, friction, and responsiveness through prototyping and playtesting.",
      },
    ],
  },
  "my-color-is-not-colorfull": {
    title: "My Color Is Not Colorfull",
    routeSlug: "color",
    cover: "assets/game-covers/my-color-is-not-colorfull.png",
    shortDescription: "Adventure game with a visually driven emotional tone.",
    overview: "Emotion-led adventure project with space for future notes on visual tone, mechanics, and narrative intent.",
    meta: [
      "Role: Game designer and developer",
      "Format: Browser release",
      "Status: Published on itch.io",
    ],
    actions: [{ label: "Open itch.io", href: "https://pandabeo04.itch.io/my-color-is-not-colorfull" }],
    devlog: [],
  },
  equilibrium: {
    title: "Equilibrium",
    routeSlug: "equilibrium",
    cover: "assets/game-covers/equilibrium.png",
    shortDescription: "Twine visual novel focused on reading and branching balance.",
    overview: "Narrative-led project with a dedicated panel ready for future writing and branching-design devlog entries.",
    meta: [
      "Role: Solo developer",
      "Format: Twine / browser release",
      "Status: Published on itch.io",
    ],
    actions: [
      {
        label: "Download Game",
        href: "https://github.com/pandabeo/WebPortfolioPlayFuture/releases/download/game-downloads/equilibrium.zip",
        download: "equilibrium.zip",
      },
      { label: "Open itch.io", href: "https://pandabeo04.itch.io/equilibrium" },
    ],
    devlog: [],
  },
  "d-fishy-finals": {
    title: "D' Fishy Finals",
    routeSlug: "fishy",
    cover: "assets/game-covers/d-fishy-finals.jpg",
    shortDescription: "Adventure game about teenage intrusive thoughts on a collaborator account.",
    overview: "Collaborative release with room to document team production context and future postmortem-style notes.",
    meta: [
      "Role: Collaborator",
      "Format: Browser release",
      "Status: Hosted on collaborator account",
    ],
    actions: [
      {
        label: "Download Game",
        href: "https://github.com/pandabeo/WebPortfolioPlayFuture/releases/download/game-downloads/D%27%20F%C3%ADshy%20Fin%C3%A0l.zip",
        download: "d-fishy-finals.zip",
      },
      { label: "Open itch.io", href: "https://quyen-cvrix-nguyen.itch.io/d-fishy-finals" },
    ],
    trailer: {
      src: "assets/game-trailers/d-fishy-finals-trailer.mp4",
      title: "D' Fishy Finals trailer",
    },
    webPlayable: false,
    devlog: [],
  },
  blocknout: {
    title: "BlocknOut",
    routeSlug: "blocknout",
    cover: "assets/game-covers/blocknout.png",
    shortDescription: "Third-person action prototype released for RMIT GDS4 Blockout 01.",
    overview: "Prototype-focused panel ready for future combat feel notes, mechanic breakdowns, and blockout iteration logs.",
    meta: [
      "Role: Game designer and developer",
      "Format: Downloadable build",
      "Status: Published on itch.io",
    ],
    actions: [{ label: "Open itch.io", href: "https://pandabeo04.itch.io/blocknout" }],
    devlog: [],
  },
  "hours-before-blue": {
    title: "Hours Before Blue",
    routeSlug: "hours",
    cover: "assets/game-covers/hours-before-blue.png",
    shortDescription: "Short cozy adventure jam game published on itch.",
    overview: "Small-scope cozy release with a clean area reserved for future jam reflections and design notes.",
    meta: [
      "Role: Game designer and developer",
      "Format: Browser release",
      "Status: Published on itch.io",
    ],
    actions: [
      {
        label: "Download Game",
        href: "https://github.com/pandabeo/WebPortfolioPlayFuture/releases/download/game-downloads/GameJam_nuhuh.zip",
        download: "hours-before-blue.zip",
      },
      { label: "Open itch.io", href: "https://pandabeo04.itch.io/hours" },
    ],
    devlog: [],
  },
  chaotet: {
    title: "ChaoTet!",
    routeSlug: "chaotet",
    cover: "assets/game-covers/chaotet.gif",
    shortDescription: "Tet-themed 3D survival-simulation release made with collaborators.",
    overview: "Collaborative festive 3D release with future room for documenting system tweaks and event-driven iteration.",
    meta: [
      "Role: Collaborator",
      "Format: Downloadable build",
      "Status: Published on itch.io",
    ],
    actions: [
      {
        label: "Download Game",
        href: "https://github.com/pandabeo/WebPortfolioPlayFuture/releases/download/game-downloads/ChaoTet!FixUI.zip",
        download: "chaotet.zip",
      },
      { label: "Open itch.io", href: "https://pandabeo04.itch.io/chaostet" },
    ],
    trailer: {
      src: "assets/game-trailers/chaotet-trailer.mp4",
      title: "ChaoTet! trailer",
    },
    webPlayable: false,
    devlog: [],
  },
  "into-the-dungeon": {
    title: "IntoTheDungeon",
    routeSlug: "dungeon",
    cover: "assets/game-covers/into-the-dungeon.png",
    shortDescription: "Procedural dungeon experiment released as a downloadable build.",
    overview: "System-heavy experiment with a panel prepared for future procedural-generation and combat iteration notes.",
    meta: [
      "Role: Game designer and developer",
      "Format: Downloadable build",
      "Status: Published on itch.io",
    ],
    actions: [
      {
        label: "Download Game",
        href: "https://github.com/pandabeo/WebPortfolioPlayFuture/releases/download/game-downloads/IntoTheDungeonFinalOfFinal.zip",
        download: "into-the-dungeon.zip",
      },
      { label: "Open itch.io", href: "https://pandabeo04.itch.io/generatedungeontest" },
    ],
    trailer: {
      src: "assets/game-trailers/into-the-dungeon-trailer.mp4",
      title: "IntoTheDungeon trailer",
    },
    webPlayable: false,
    devlog: [],
  },
  "a-game-about-me": {
    title: "A Game About Me",
    routeSlug: "about-me",
    cover: "assets/game-covers/a-game-about-me.png",
    shortDescription: "HTML5 and Windows visual-novel style project playable on itch.",
    overview: "Narrative-led personal project with a structure in place for future process notes and story iteration logs.",
    meta: [
      "Role: Game designer and developer",
      "Format: HTML5 and Windows build",
      "Status: Published on itch.io",
    ],
    actions: [
      {
        label: "Download Game",
        href: "https://github.com/pandabeo/WebPortfolioPlayFuture/releases/download/game-downloads/A%20game%20about%20me%20V2.zip",
        download: "a-game-about-me.zip",
      },
      { label: "Open itch.io", href: "https://pandabeo04.itch.io/a-game-about-me" },
    ],
    trailer: {
      src: "assets/game-trailers/a-game-about-me-trailer.mp4",
      title: "A Game About Me trailer",
    },
    webPlayable: false,
    devlog: [],
  },
};

function getGameRouteSlug(gameId) {
  if (!gameId || !gameDetails[gameId]) {
    return "";
  }

  return gameDetails[gameId].routeSlug || gameId;
}

function getGameIdFromRouteSlug(routeSlug) {
  if (!routeSlug) {
    return "";
  }

  const normalizedSlug = routeSlug.trim().toLowerCase();
  const matchedEntry = Object.entries(gameDetails).find(([gameId, game]) => {
    return gameId === normalizedSlug || (game.routeSlug || "").toLowerCase() === normalizedSlug;
  });

  return matchedEntry?.[0] || "";
}

const catMedia = [
  { type: "image", src: "cat/4531c3c1-4188-426a-9db0-4035495fdc3a.jpg" },
  { type: "image", src: "cat/3d409d2a-4279-413b-b3f1-ecd459df8e51.jpg" },
  { type: "image", src: "cat/c1aaae67-df70-40d5-9283-e2d51ea60043.jpg" },
  { type: "image", src: "cat/0cb0cb81-fcf0-43ca-b174-3668f244cd4f.jpg" },
  { type: "image", src: "cat/822de1ee-4da2-4401-81de-5546b5748789.jpg" },
  { type: "image", src: "cat/1d651701-1d8c-41e7-8149-9d011dd0a110.jpg" },
  { type: "image", src: "cat/31bcf3f1-b088-40a6-acfc-8f32ad0197ff.jpg" },
  { type: "image", src: "cat/348d8aa5-238c-4a3e-9116-dbbecca093c6.jpg" },
  { type: "image", src: "cat/a9db568b-9d20-46fc-a8b1-2d579d61c786.jpg" },
  { type: "image", src: "cat/2ab29ce6-98ac-4a3a-b1a9-0dcf5c52c6dd.jpg" },
  { type: "image", src: "cat/3bf1649b-25f4-4983-aeae-b7a7e7afd91c.jpg" },
  { type: "image", src: "cat/6cc3d88f-8cea-46e0-a8f8-8ee47f3cfeb1.jpg" },
  { type: "image", src: "cat/efc5d335-6d6c-4bcb-a707-8434bc5fa1bd.jpg" },
  { type: "image", src: "cat/d3dd0673-731e-431b-a9af-a100e993f7fe.jpg" },
  { type: "image", src: "cat/3804c883-15a6-4150-9ab8-1dfb1ec57e94.jpg" },
  { type: "image", src: "cat/136ed808-c380-4c5e-b9bc-bd9fe52a9d7e.jpg" },
  { type: "image", src: "cat/e82d9128-d7e5-4986-bae1-e44e5e5fa40b.jpg" },
  { type: "image", src: "cat/8a4ca0e7-b28c-43f9-9426-8ed4a7196819.jpg" },
  { type: "image", src: "cat/8f6cec28-59ac-4999-bd20-723a8c2e04d7.jpg" },
  { type: "image", src: "cat/12713f9d-39ed-4136-82a6-4c0af2e755a4.jpg" },
  { type: "image", src: "cat/79654f10-8bc8-4786-aba7-a64acb0ab855.jpg" },
  { type: "image", src: "cat/5528d665-99fb-463a-822c-53b6274dc7f1.jpg" },
  { type: "image", src: "cat/a43d33e9-69fd-4fa9-a96c-dd9ed24014c9.jpg" },
  { type: "image", src: "cat/d072cfcc-5d6d-473b-a8cc-bbcd2ebd36ca.jpg" },
  { type: "image", src: "cat/15100aa2-ecd4-48fd-a023-bce06fa432db.jpg" },
  { type: "video", src: "cat/0878d67b-830d-4866-b771-1a63ae60cf66.mp4" },
  { type: "video", src: "cat/8aa86258-697d-4c79-b863-970e1aeaece3.mp4" },
  { type: "video", src: "cat/0e337b39-f2cb-47fb-a884-84d3ecd31377.mp4" },
  { type: "video", src: "cat/4d441e1a-fd53-4647-9a85-bb78c8291b6a.mp4" },
];

let activeWindow = null;
let pointerOffsetX = 0;
let pointerOffsetY = 0;
let zIndexSeed = 20;
let cursorDot = null;
let cursorRing = null;
let cursorIdle = null;
let cursorPressTimeout = null;
let pointerX = 0;
let pointerY = 0;
let isMuted = false;
let buttonClickAudio = null;
let taskbarOrderSeed = 0;
const mediaVolumeMemory = new WeakMap();

const desktopModeQuery = window.matchMedia("(min-width: 981px)");
const finePointerQuery = window.matchMedia("(pointer: fine)");
const PANEL_GAP = 18;
const PANEL_SEARCH_STEP = 18;
const PANEL_POSITION_STORAGE_KEY = "webportfolio.panel-positions.v1";
const WALLPAPER_STORAGE_KEY = "webportfolio.wallpaper.v1";
const TASKBAR_DRAG_THRESHOLD = 6;

let activeTaskbarDrag = null;

function forceVideoMuted(videoEl) {
  if (!videoEl) {
    return;
  }

  videoEl.muted = true;
  videoEl.defaultMuted = true;
  videoEl.volume = 0;
  videoEl.setAttribute("muted", "");
}

function forceVideoAudible(videoEl) {
  if (!videoEl || isMuted) {
    return;
  }

  videoEl.muted = false;
  videoEl.defaultMuted = false;
  videoEl.volume = Math.max(videoEl.volume || 0, 0.7);
  videoEl.removeAttribute("muted");
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function canDragWindows() {
  return desktopModeQuery.matches && finePointerQuery.matches;
}

function playButtonClickSound() {
  if (isMuted) {
    return;
  }

  if (!buttonClickAudio) {
    buttonClickAudio = new Audio(BUTTON_CLICK_SOUND_SRC);
    buttonClickAudio.preload = "auto";
    buttonClickAudio.volume = 0.45;
  }

  buttonClickAudio.currentTime = 0;
  buttonClickAudio.play().catch(() => {
    // Browsers can reject audio until the first trusted interaction is complete.
  });
}

function getPanelStorageId(windowEl) {
  if (!windowEl) {
    return null;
  }

  if (windowEl === startPanel) {
    return "start-panel";
  }

  if (windowEl === homeWindow) {
    return "home-window";
  }

  return windowEl.dataset.windowId || null;
}

function isStartPanel(windowEl) {
  return windowEl === startPanel;
}

function getTaskbarHeight() {
  return taskbar?.offsetHeight || 42;
}

function readStoredPanelPositions() {
  try {
    const raw = window.localStorage.getItem(PANEL_POSITION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.warn("Unable to read stored panel positions.", error);
    return {};
  }
}

function writeStoredPanelPositions(positions) {
  try {
    window.localStorage.setItem(PANEL_POSITION_STORAGE_KEY, JSON.stringify(positions));
  } catch (error) {
    console.warn("Unable to store panel positions.", error);
  }
}

function clearStoredPanelPositions() {
  try {
    window.localStorage.removeItem(PANEL_POSITION_STORAGE_KEY);
  } catch (error) {
    console.warn("Unable to clear stored panel positions.", error);
  }
}

function isManagedPanel(windowEl) {
  return (
    !windowEl.classList.contains("collection-window") &&
    !windowEl.classList.contains("is-hidden") &&
    windowEl.offsetWidth > 0 &&
    windowEl.offsetHeight > 0
  );
}

function getStageRelativeRect(windowEl) {
  if (isStartPanel(windowEl)) {
    const rect = windowEl.getBoundingClientRect();

    return {
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
    };
  }

  if (!desktopStage) {
    return null;
  }

  const stageRect = desktopStage.getBoundingClientRect();
  const rect = windowEl.getBoundingClientRect();

  return {
    left: rect.left - stageRect.left,
    top: rect.top - stageRect.top,
    right: rect.right - stageRect.left,
    bottom: rect.bottom - stageRect.top,
    width: rect.width,
    height: rect.height,
  };
}

function createRect(left, top, width, height) {
  return {
    left,
    top,
    right: left + width,
    bottom: top + height,
    width,
    height,
  };
}

function rectsOverlap(rectA, rectB, gap = PANEL_GAP) {
  return !(
    rectA.right + gap <= rectB.left ||
    rectA.left >= rectB.right + gap ||
    rectA.bottom + gap <= rectB.top ||
    rectA.top >= rectB.bottom + gap
  );
}

function getBlockingPanels(excludedWindow = null) {
  return Array.from(draggableWindows).filter((windowEl) => {
    return windowEl !== excludedWindow && isManagedPanel(windowEl);
  });
}

function hasPanelOverlap(windowEl, left, top) {
  const width = windowEl.offsetWidth;
  const height = windowEl.offsetHeight;
  const nextRect = createRect(left, top, width, height);

  return getBlockingPanels(windowEl).some((panelEl) => {
    const panelRect = getStageRelativeRect(panelEl);
    return panelRect ? rectsOverlap(nextRect, panelRect) : false;
  });
}

function applyPanelPosition(windowEl, left, top) {
  if (isStartPanel(windowEl)) {
    windowEl.style.position = "fixed";
    windowEl.style.left = `${left}px`;
    windowEl.style.top = `${top}px`;
    windowEl.style.right = "auto";
    windowEl.style.bottom = "auto";
    windowEl.style.transform = "none";
    windowEl.dataset.dragReady = "true";
    return;
  }

  if (windowEl === homeWindow) {
    windowEl.style.position = "absolute";
    windowEl.style.margin = "0";
  }

  windowEl.style.left = `${left}px`;
  windowEl.style.top = `${top}px`;
  windowEl.style.right = "auto";
  windowEl.style.bottom = "auto";
  windowEl.style.transform = "none";
  windowEl.dataset.dragReady = "true";
}

function savePanelPosition(windowEl) {
  if (!desktopStage || !desktopModeQuery.matches) {
    return;
  }

  const storageId = getPanelStorageId(windowEl);
  const rect = getStageRelativeRect(windowEl);

  if (!storageId || !rect) {
    return;
  }

  const positions = readStoredPanelPositions();
  positions[storageId] = {
    left: Math.round(rect.left),
    top: Math.round(rect.top),
  };
  writeStoredPanelPositions(positions);
}

function restoreStoredPanelPosition(windowEl) {
  if ((!desktopStage && !isStartPanel(windowEl)) || !desktopModeQuery.matches) {
    return false;
  }

  const storageId = getPanelStorageId(windowEl);

  if (!storageId) {
    return false;
  }

  const positions = readStoredPanelPositions();
  const savedPosition = positions[storageId];

  if (!savedPosition) {
    return false;
  }

  if (isStartPanel(windowEl)) {
    const maxLeft = Math.max(window.innerWidth - windowEl.offsetWidth, 0);
    const maxTop = Math.max(window.innerHeight - getTaskbarHeight() - windowEl.offsetHeight - 4, 0);
    applyPanelPosition(windowEl, clamp(savedPosition.left, 0, maxLeft), clamp(savedPosition.top, 0, maxTop));
    return true;
  }

  const maxLeft = Math.max(desktopStage.clientWidth - windowEl.offsetWidth, 0);
  const maxTop = Math.max(desktopStage.clientHeight - windowEl.offsetHeight, 0);
  applyPanelPosition(windowEl, clamp(savedPosition.left, 0, maxLeft), clamp(savedPosition.top, 0, maxTop));
  return true;
}

function findOpenPanelPosition(windowEl, preferredLeft, preferredTop) {
  if (!desktopStage) {
    return { left: preferredLeft, top: preferredTop };
  }

  const maxLeft = Math.max(desktopStage.clientWidth - windowEl.offsetWidth, 0);
  const maxTop = Math.max(desktopStage.clientHeight - windowEl.offsetHeight, 0);
  const startLeft = clamp(preferredLeft, 0, maxLeft);
  const startTop = clamp(preferredTop, 0, maxTop);

  if (!hasPanelOverlap(windowEl, startLeft, startTop)) {
    return { left: startLeft, top: startTop };
  }

  let bestPosition = null;
  let bestScore = Number.POSITIVE_INFINITY;

  for (let top = 0; top <= maxTop; top += PANEL_SEARCH_STEP) {
    for (let left = 0; left <= maxLeft; left += PANEL_SEARCH_STEP) {
      if (hasPanelOverlap(windowEl, left, top)) {
        continue;
      }

      const distance = Math.hypot(left - startLeft, top - startTop);
      const topBias = top * 0.08;
      const leftBias = left * 0.03;
      const score = distance + topBias + leftBias;

      if (score < bestScore) {
        bestScore = score;
        bestPosition = { left, top };
      }
    }
  }

  return bestPosition ?? { left: startLeft, top: startTop };
}

function placePanelWithoutOverlap(windowEl, preferredLeft, preferredTop) {
  const { left, top } = findOpenPanelPosition(windowEl, preferredLeft, preferredTop);
  applyPanelPosition(windowEl, left, top);
}

function arrangeVisiblePanels() {
  if (!desktopStage || !desktopModeQuery.matches) {
    return;
  }

  Array.from(draggableWindows)
    .filter((windowEl) => isManagedPanel(windowEl))
    .sort((windowA, windowB) => {
      const rectA = getStageRelativeRect(windowA);
      const rectB = getStageRelativeRect(windowB);
      const topA = rectA ? rectA.top : 0;
      const topB = rectB ? rectB.top : 0;
      const leftA = rectA ? rectA.left : 0;
      const leftB = rectB ? rectB.left : 0;
      return topA - topB || leftA - leftB;
    })
    .forEach((windowEl) => {
      const panelRect = getStageRelativeRect(windowEl);

      if (!panelRect) {
        return;
      }

      placePanelWithoutOverlap(windowEl, panelRect.left, panelRect.top);
    });
}

function setupCursorEffect() {
  if (!window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  const CURSOR_OFFSET_X = 18;
  const CURSOR_OFFSET_Y = 8;

  cursorIdle = document.createElement("img");
  cursorIdle.className = "cursor-idle";
  cursorIdle.src = "assets/cursors/hand-cursor-idle.png";
  cursorIdle.alt = "";
  cursorIdle.setAttribute("aria-hidden", "true");

  cursorDot = document.createElement("img");
  cursorDot.className = "cursor-dot";
  cursorDot.src = "assets/cursors/hand-cursor.png";
  cursorDot.alt = "";
  cursorDot.setAttribute("aria-hidden", "true");

  cursorRing = document.createElement("img");
  cursorRing.className = "cursor-ring";
  cursorRing.src = "assets/cursors/hand-cursor-hover.png";
  cursorRing.alt = "";
  cursorRing.setAttribute("aria-hidden", "true");

  document.body.append(cursorIdle, cursorDot, cursorRing);

  const syncCursorPosition = () => {
    if (cursorDot && cursorRing && cursorIdle) {
      const cursorTransform = `translate(${pointerX - CURSOR_OFFSET_X}px, ${pointerY - CURSOR_OFFSET_Y}px)`;
      cursorDot.style.transform = cursorTransform;
      cursorRing.style.transform = cursorTransform;
      cursorIdle.style.transform = cursorTransform;
    }
  };

  window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    syncCursorPosition();
    const offsetX = ((event.clientX / window.innerWidth) - 0.5) * 18;
    const offsetY = ((event.clientY / window.innerHeight) - 0.5) * 18;
    document.documentElement.style.setProperty("--parallax-x", `${offsetX}px`);
    document.documentElement.style.setProperty("--parallax-y", `${offsetY}px`);

    if (!document.body.classList.contains("has-custom-cursor")) {
      document.body.classList.add("has-custom-cursor");
    }
  });

  window.addEventListener("pointerleave", () => {
    document.body.classList.remove("has-custom-cursor");
    document.body.classList.remove("cursor-hover");
    document.body.classList.remove("cursor-active");
    document.documentElement.style.setProperty("--parallax-x", "0px");
    document.documentElement.style.setProperty("--parallax-y", "0px");
  });

  document.addEventListener("pointerover", (event) => {
    if (event.target.closest("a, button")) {
      document.body.classList.add("cursor-hover");
    }
  });

  document.addEventListener("pointerout", (event) => {
    if (event.target.closest("a, button")) {
      const nextTarget = event.relatedTarget;

      if (!nextTarget || !nextTarget.closest("a, button")) {
        document.body.classList.remove("cursor-hover");
      }
    }
  });

  document.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || !document.body.classList.contains("has-custom-cursor")) {
      return;
    }

    document.body.classList.add("cursor-active");
    playCursorPressFeedback();
  });

  window.addEventListener("pointerup", () => {
    document.body.classList.remove("cursor-active");
  });

  window.addEventListener("pointercancel", () => {
    document.body.classList.remove("cursor-active");
  });
}

function playCursorPressFeedback() {
  if (!window.matchMedia("(pointer: fine)").matches || !document.body.classList.contains("has-custom-cursor")) {
    return;
  }

  document.body.classList.add("cursor-force-press");
  window.clearTimeout(cursorPressTimeout);
  cursorPressTimeout = window.setTimeout(() => {
    document.body.classList.remove("cursor-force-press");
  }, 140);
}

function updateFullscreenButtons() {
  draggableWindows.forEach((windowEl) => {
    const fullscreenButton = windowEl.querySelector(".fullscreen-toggle");

    if (!fullscreenButton) {
      return;
    }

    const isFullscreen = windowEl.classList.contains("is-fullscreen");
    fullscreenButton.classList.toggle("is-fullscreen", isFullscreen);
    fullscreenButton.setAttribute("aria-label", isFullscreen ? "Exit fullscreen" : "Enter fullscreen");
    fullscreenButton.title = isFullscreen ? "Exit fullscreen" : "Enter fullscreen";
  });
}

function syncFullscreenState() {
  const hasFullscreenWindow = Array.from(draggableWindows).some((windowEl) => {
    return !windowEl.classList.contains("is-hidden") && windowEl.classList.contains("is-fullscreen");
  });

  document.body.classList.toggle("has-fullscreen-window", hasFullscreenWindow);
  updateFullscreenButtons();
}

function toggleWindowFullscreen(windowEl, forceState) {
  if (!windowEl) {
    return;
  }

  const shouldEnterFullscreen =
    typeof forceState === "boolean" ? forceState : !windowEl.classList.contains("is-fullscreen");

  if (shouldEnterFullscreen) {
    const snapshot = {
      left: windowEl.style.left,
      top: windowEl.style.top,
      right: windowEl.style.right,
      bottom: windowEl.style.bottom,
      width: windowEl.style.width,
      maxHeight: windowEl.style.maxHeight,
      transform: windowEl.style.transform,
      position: windowEl.style.position,
      margin: windowEl.style.margin,
      dragReady: windowEl.dataset.dragReady || "",
    };

    windowEl.dataset.preFullscreenState = JSON.stringify(snapshot);
    windowEl.classList.add("is-fullscreen");
    windowEl.style.position = "fixed";
    windowEl.style.left = "8px";
    windowEl.style.top = "8px";
    windowEl.style.right = "8px";
    windowEl.style.bottom = "calc(var(--taskbar-height) + 8px)";
    windowEl.style.width = "auto";
    windowEl.style.maxHeight = "none";
    windowEl.style.transform = "none";
    delete windowEl.dataset.dragReady;
    bringToFront(windowEl);
    syncFullscreenState();
    return;
  }

  windowEl.classList.remove("is-fullscreen");

  let snapshot = null;
  try {
    snapshot = windowEl.dataset.preFullscreenState ? JSON.parse(windowEl.dataset.preFullscreenState) : null;
  } catch (error) {
    snapshot = null;
  }

  windowEl.style.left = snapshot?.left || "";
  windowEl.style.top = snapshot?.top || "";
  windowEl.style.right = snapshot?.right || "";
  windowEl.style.bottom = snapshot?.bottom || "";
  windowEl.style.width = snapshot?.width || "";
  windowEl.style.maxHeight = snapshot?.maxHeight || "";
  windowEl.style.transform = snapshot?.transform || "";
  windowEl.style.position = snapshot?.position || "";
  windowEl.style.margin = snapshot?.margin || "";

  if (snapshot?.dragReady) {
    windowEl.dataset.dragReady = snapshot.dragReady;
  } else {
    delete windowEl.dataset.dragReady;
  }

  delete windowEl.dataset.preFullscreenState;
  syncFullscreenState();
}

function injectWindowControls() {
  draggableWindows.forEach((windowEl) => {
    if (windowEl.classList.contains("section-tag")) {
      return;
    }

    const titlebar = windowEl.querySelector(".titlebar");
    const closeButton = titlebar?.querySelector("button");

    if (!titlebar || !closeButton || titlebar.querySelector(".window-controls")) {
      return;
    }

    const titleNodes = Array.from(titlebar.childNodes).filter((node) => node !== closeButton);
    const titleWrapper = document.createElement("div");
    titleWrapper.className = "titlebar-text";
    titleNodes.forEach((node) => titleWrapper.appendChild(node));

    const controls = document.createElement("div");
    controls.className = "window-controls";
    const fullscreenButton = document.createElement("button");

    fullscreenButton.type = "button";
    fullscreenButton.className = "titlebar-control fullscreen-toggle";

    closeButton.classList.add("titlebar-control", "close-toggle");
    controls.append(fullscreenButton, closeButton);

    titlebar.replaceChildren(titleWrapper, controls);
  });

  updateFullscreenButtons();
}

function renderCatMedia() {
  if (!catMediaGrid) {
    return;
  }

  catMediaGrid.innerHTML = catMedia
    .map((item) => {
      if (item.type === "video") {
        return `
          <article class="cat-media-card">
            <video controls preload="metadata" muted playsinline>
              <source src="${item.src}" type="video/mp4" />
            </video>
          </article>
        `;
      }

      return `
        <article class="cat-media-card">
          <img src="${item.src}" alt="Cat photo" loading="lazy" />
        </article>
      `;
    })
    .join("");

  enableAutoplayForVideos(catMediaGrid);
  syncMediaMutedState();
}

function enableAutoplayForVideos(root = document) {
  root.querySelectorAll("video").forEach((videoEl) => {
    if (videoEl.dataset.hoverPreview === "true") {
      forceVideoMuted(videoEl);
      return;
    }

    videoEl.autoplay = true;
    videoEl.loop = true;
    forceVideoMuted(videoEl);
    videoEl.playsInline = true;
    videoEl.setAttribute("autoplay", "");
    videoEl.setAttribute("loop", "");
    videoEl.setAttribute("playsinline", "");

    const startPlayback = () => {
      if (!isMediaInActiveWindow(videoEl)) {
        return;
      }

      videoEl.play().catch(() => {
        // Ignore autoplay rejections triggered by browser policy or visibility state.
      });
    };

    if (videoEl.readyState >= HTMLMediaElement.HAVE_METADATA) {
      startPlayback();
      return;
    }

    videoEl.addEventListener("loadedmetadata", startPlayback, { once: true });
  });
}

function setupHoverTrailerPreviews() {
  hoverTrailerCards.forEach((card) => {
    const videoEl = card.querySelector("video[data-hover-preview='true']");
    const previewImage = card.querySelector("img");
    let trailerSoundTimer = null;

    if (!videoEl) {
      return;
    }

    if (previewImage?.getAttribute("src") && !videoEl.getAttribute("poster")) {
      videoEl.setAttribute("poster", previewImage.getAttribute("src"));
    }

    const revealPreview = () => {
      if (card.matches(":hover") || document.activeElement === card) {
        card.classList.add("is-previewing-trailer");
      }
    };

    const clearTrailerSoundTimer = () => {
      if (!trailerSoundTimer) {
        return;
      }

      window.clearTimeout(trailerSoundTimer);
      trailerSoundTimer = null;
    };

    const activateTrailerSound = () => {
      trailerSoundTimer = null;

      if (!card.matches(":hover") && document.activeElement !== card) {
        forceVideoMuted(videoEl);
        return;
      }

      videoEl.dataset.trailerSoundActive = "true";
      if (isMediaInActiveWindow(videoEl)) {
        forceVideoAudible(videoEl);
      }
    };

    const scheduleTrailerSound = () => {
      clearTrailerSoundTimer();
      trailerSoundTimer = window.setTimeout(activateTrailerSound, TRAILER_SOUND_DELAY_MS);
    };

    const deactivateTrailerSound = () => {
      clearTrailerSoundTimer();
      delete videoEl.dataset.trailerSoundActive;
      forceVideoMuted(videoEl);
    };

    const startPreview = () => {
      deactivateTrailerSound();
      videoEl.loop = true;
      videoEl.playsInline = true;
      videoEl.setAttribute("loop", "");
      videoEl.setAttribute("playsinline", "");
      videoEl.preload = "auto";

      if (videoEl.networkState === HTMLMediaElement.NETWORK_EMPTY) {
        videoEl.load();
      }

      if (videoEl.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        revealPreview();
      } else {
        videoEl.addEventListener("loadeddata", revealPreview, { once: true });
      }

      videoEl.play().then(() => {
        revealPreview();
        scheduleTrailerSound();
      }).catch(() => {
        // Browser policy can still block playback in rare cases; ignore quietly.
      });
    };

    const stopPreview = () => {
      deactivateTrailerSound();
      videoEl.pause();
      videoEl.currentTime = 0;
      card.classList.remove("is-previewing-trailer");
    };

    videoEl.addEventListener("error", () => {
      deactivateTrailerSound();
      card.classList.remove("is-previewing-trailer");
    });

    videoEl.addEventListener("emptied", () => {
      deactivateTrailerSound();
      card.classList.remove("is-previewing-trailer");
    });

    card.addEventListener("pointerenter", startPreview);
    card.addEventListener("focus", startPreview);
    card.addEventListener("pointerleave", stopPreview);
    card.addEventListener("blur", stopPreview);
  });
}

function getGameStillPaths(gameId) {
  return [1, 2, 3, 4, 5, 6].map((index) => `assets/game-stills/${gameId}-still-${index}.jpg`);
}

function rememberMediaVolume(mediaEl) {
  if (!mediaEl || mediaVolumeMemory.has(mediaEl)) {
    return;
  }

  mediaVolumeMemory.set(mediaEl, typeof mediaEl.volume === "number" ? mediaEl.volume : 1);
}

function enforceMediaMuteState(mediaEl) {
  if (!mediaEl) {
    return;
  }

  rememberMediaVolume(mediaEl);

  if (isMuted) {
    if (mediaEl.dataset.preMuteVolume === undefined) {
      mediaEl.dataset.preMuteVolume = String(mediaEl.volume);
    }

    mediaEl.volume = 0;
    mediaEl.muted = true;
    mediaEl.defaultMuted = true;
    return;
  }

  const storedVolume = Number.parseFloat(mediaEl.dataset.preMuteVolume ?? "");
  const fallbackVolume = mediaVolumeMemory.get(mediaEl) ?? 1;
  const nextVolume = Number.isFinite(storedVolume) ? storedVolume : fallbackVolume;

  mediaEl.muted = false;
  mediaEl.defaultMuted = false;
  mediaEl.volume = clamp(nextVolume, 0, 1);
  delete mediaEl.dataset.preMuteVolume;
}

function bindMediaMuteEnforcement(mediaEl) {
  if (!mediaEl || mediaEl.dataset.muteBound === "true") {
    return;
  }

  rememberMediaVolume(mediaEl);

  mediaEl.addEventListener("play", () => {
    enforceMediaMuteState(mediaEl);
  });

  mediaEl.addEventListener("loadedmetadata", () => {
    enforceMediaMuteState(mediaEl);
  });

  mediaEl.addEventListener("volumechange", () => {
    if (isMuted) {
      if (!mediaEl.muted || mediaEl.volume !== 0) {
        mediaEl.volume = 0;
        mediaEl.muted = true;
        mediaEl.defaultMuted = true;
      }
      return;
    }

    if (!mediaEl.muted && mediaEl.volume > 0) {
      if (mediaEl.tagName === "VIDEO") {
        mediaEl.dataset.userAudioEnabled = "true";
      }

      mediaVolumeMemory.set(mediaEl, mediaEl.volume);
    }
  });

  mediaEl.dataset.muteBound = "true";
}

function getMediaWindow(mediaEl) {
  return mediaEl?.closest(".window") || null;
}

function isMediaInActiveWindow(mediaEl) {
  const windowEl = getMediaWindow(mediaEl);

  if (!windowEl) {
    return false;
  }

  return windowEl === getTopVisibleWindow();
}

function pauseAndMuteMedia(mediaEl, { reset = false } = {}) {
  if (!mediaEl) {
    return;
  }

  const shouldResumeOnActive = !reset && Boolean(getMediaWindow(mediaEl)) && !mediaEl.paused;

  if (shouldResumeOnActive) {
    mediaEl.dataset.resumeOnActive = "true";
  } else if (reset) {
    delete mediaEl.dataset.resumeOnActive;
  }

  if (mediaEl.tagName === "VIDEO") {
    delete mediaEl.dataset.trailerSoundActive;
    forceVideoMuted(mediaEl);
  } else if (isMuted || !isMediaInActiveWindow(mediaEl)) {
    mediaEl.muted = true;
  }

  mediaEl.pause();

  if (reset) {
    try {
      mediaEl.currentTime = 0;
    } catch {
      // Some media sources may not be seekable yet.
    }
  }
}

function pauseWindowMedia(windowEl, { reset = false } = {}) {
  if (!windowEl) {
    return;
  }

  windowEl.querySelectorAll("audio, video").forEach((mediaEl) => {
    pauseAndMuteMedia(mediaEl, { reset });
  });
}

function syncEmbeddedFrameAudioState() {
  const topWindow = getTopVisibleWindow();

  document.querySelectorAll("iframe.game-player-frame").forEach((frameEl) => {
    const frameWindow = frameEl.closest(".window");
    const audioEnabled = !isMuted && frameWindow === topWindow;

    if (!frameEl.contentWindow) {
      return;
    }

    try {
      frameEl.contentWindow.setGameAudioEnabled?.(audioEnabled);
      frameEl.contentWindow.postMessage({ type: "portfolio-game-audio", enabled: audioEnabled }, "*");
    } catch {
      // Cross-document access can fail while an iframe is navigating.
    }
  });
}

function syncVisibleMediaPlayback(root = document) {
  root.querySelectorAll("video").forEach((videoEl) => {
    if (videoEl.dataset.hoverPreview === "true") {
      return;
    }

    if (!isMediaInActiveWindow(videoEl)) {
      pauseAndMuteMedia(videoEl);
      return;
    }

    if (videoEl.autoplay || videoEl.hasAttribute("autoplay")) {
      videoEl.play().catch(() => {
        // Ignore autoplay rejections triggered by browser policy or visibility state.
      });
    }
  });

  root.querySelectorAll("audio, video").forEach((mediaEl) => {
    if (mediaEl.dataset.hoverPreview === "true" || mediaEl.dataset.resumeOnActive !== "true") {
      return;
    }

    if (!isMediaInActiveWindow(mediaEl) || isMuted) {
      return;
    }

    delete mediaEl.dataset.resumeOnActive;
    mediaEl.play().catch(() => {
      // User-agent autoplay rules can still prevent resuming audio.
    });
  });
}

function syncMediaMutedState() {
  syncEmbeddedFrameAudioState();

  document.querySelectorAll("audio, video").forEach((mediaEl) => {
    if (!isMediaInActiveWindow(mediaEl)) {
      pauseAndMuteMedia(mediaEl);
      return;
    }

    if (mediaEl.dataset.hoverPreview === "true") {
      if (mediaEl.dataset.trailerSoundActive === "true" && !isMuted) {
        forceVideoAudible(mediaEl);
      } else {
        forceVideoMuted(mediaEl);
      }
      return;
    }

    bindMediaMuteEnforcement(mediaEl);

    if (mediaEl.tagName === "VIDEO" && mediaEl.dataset.userAudioEnabled !== "true") {
      forceVideoMuted(mediaEl);
      return;
    }

    enforceMediaMuteState(mediaEl);
  });
  syncVisibleMediaPlayback();
}

function initializeVideoMuteDefaults(root = document) {
  root.querySelectorAll("video").forEach((videoEl) => {
    forceVideoMuted(videoEl);
  });
}

function updateThemeToggleLabel() {
  if (!themeToggleButton) {
    return;
  }

  const isDark = document.body.classList.contains("is-dark");
  const label = isDark ? "Disable dark mode" : "Enable dark mode";
  themeToggleButton.title = label;
  themeToggleButton.setAttribute("aria-label", label);
}

function getStoredWallpaperMode() {
  try {
    return window.localStorage.getItem(WALLPAPER_STORAGE_KEY) === "kojima" ? "kojima" : "normal";
  } catch {
    return "normal";
  }
}

function saveWallpaperMode(mode) {
  try {
    window.localStorage.setItem(WALLPAPER_STORAGE_KEY, mode);
  } catch {
    // Ignore storage failures in private browsing modes.
  }
}

function updateWallpaperToggleLabel() {
  if (!wallpaperToggleButton) {
    return;
  }

  const isKojimaWallpaper = document.body.classList.contains("wallpaper-kojima");
  const ariaLabel = isKojimaWallpaper ? "Switch to normal wallpaper" : "Switch to Hideo Kojima wallpaper";

  wallpaperToggleButton.title = ariaLabel;
  wallpaperToggleButton.setAttribute("aria-label", ariaLabel);
}

function applyWallpaperMode(mode, { save = false } = {}) {
  const nextMode = mode === "kojima" ? "kojima" : "normal";
  document.body.classList.toggle("wallpaper-kojima", nextMode === "kojima");

  if (save) {
    saveWallpaperMode(nextMode);
  }

  updateWallpaperToggleLabel();
}

function updateCrtToggleLabel() {
  if (!crtToggleButton) {
    return;
  }

  const isEnabled = !document.body.classList.contains("crt-disabled");
  const ariaLabel = isEnabled ? "Turn off CRT effect" : "Turn on CRT effect";

  crtToggleButton.title = ariaLabel;
  crtToggleButton.setAttribute("aria-label", ariaLabel);
}

function applyCrtEffectState(isEnabled) {
  document.body.classList.toggle("crt-disabled", !isEnabled);
  updateCrtToggleLabel();
}

function updateSoundToggleLabel() {
  if (!soundToggleButton) {
    return;
  }

  const label = isMuted ? "Unmute audio" : "Mute audio";
  soundToggleButton.title = label;
  soundToggleButton.setAttribute("aria-label", label);
}

async function ensurePdfJs() {
  if (window.pdfjsLib) {
    return window.pdfjsLib;
  }

  if (window.__pdfjsReady) {
    return window.__pdfjsReady;
  }

  await new Promise((resolve) => {
    window.setTimeout(resolve, 250);
  });

  if (window.pdfjsLib) {
    return window.pdfjsLib;
  }

  throw new Error("PDF.js is not available.");
}

function getNormalizedPdfSrc(src) {
  return encodeURI(src);
}

function getPdfViewerHref(src) {
  return `pdf-viewer.html?file=${encodeURIComponent(src)}`;
}

function renderPdfIframeFallback(viewerEl, src) {
  viewerEl.dataset.pdfRendered = "fallback";
  viewerEl.innerHTML = "";

  const fallback = document.createElement("div");
  fallback.className = "pdf-preview-fallback";

  const message = document.createElement("p");
  message.textContent = window.pdfPreviewErrors?.[src] || "PDF preview is unavailable in this browser.";

  const link = document.createElement("a");
  link.className = "contact-button";
  link.href = getPdfViewerHref(src);
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = "Open PDF";

  fallback.append(message, link);
  viewerEl.appendChild(fallback);
}

function renderPdfImagePreview(viewerEl, src) {
  const pages = window.pdfPreviewManifest?.[src];

  if (!Array.isArray(pages) || pages.length === 0) {
    return false;
  }

  viewerEl.innerHTML = "";

  pages.forEach((pageSrc, index) => {
    const image = document.createElement("img");
    image.className = "pdf-preview-page";
    image.src = pageSrc;
    image.alt = `PDF page ${index + 1}`;
    image.loading = index < 2 ? "eager" : "lazy";
    viewerEl.appendChild(image);
  });

  viewerEl.dataset.pdfRendered = "true";
  return true;
}

async function renderPdfPreview(viewerEl) {
  if (!viewerEl || viewerEl.dataset.pdfRendered === "true" || viewerEl.dataset.pdfRendered === "pending") {
    return;
  }

  const src = viewerEl.dataset.pdfSrc;

  if (!src) {
    return;
  }

  if (renderPdfImagePreview(viewerEl, src)) {
    return;
  }

  if (window.pdfPreviewErrors?.[src]) {
    renderPdfIframeFallback(viewerEl, src);
    return;
  }

  const pdfSrc = getNormalizedPdfSrc(src);
  viewerEl.dataset.pdfRendered = "pending";
  viewerEl.innerHTML = '<div class="pdf-preview-loading">Loading PDF preview...</div>';

  try {
    const pdfjsLib = await ensurePdfJs();
    const loadingTask = pdfjsLib.getDocument({
      url: pdfSrc,
      disableRange: true,
      disableStream: true,
    });
    const pdf = await loadingTask.promise;
    const containerWidth = Math.max(viewerEl.clientWidth - 24, 320);

    viewerEl.innerHTML = "";

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const baseViewport = page.getViewport({ scale: 1 });
      const scale = containerWidth / baseViewport.width;
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.className = "pdf-preview-page";
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);

      await page.render({
        canvasContext: context,
        viewport,
      }).promise;

      viewerEl.appendChild(canvas);
    }

    viewerEl.dataset.pdfRendered = "true";
  } catch (error) {
    renderPdfIframeFallback(viewerEl, src);
    console.error(error);
  }
}

function renderActiveDocumentPdf() {
  const activePreview = document.querySelector(".document-preview.is-active");
  const activePdfViewer = activePreview?.querySelector(".pdf-preview-viewer[data-pdf-src]");

  if (!activePdfViewer) {
    return;
  }

  renderPdfPreview(activePdfViewer);
}

function renderGameDetail(gameId) {
  const game = gameDetails[gameId];

  if (!game || !gameDetailWindow) {
    return;
  }

  gameDetailWindow.dataset.gameId = gameId;

  const titlebarLabel = gameDetailWindow.querySelector(".titlebar-text, .titlebar span");

  if (titlebarLabel) {
    titlebarLabel.textContent = game.title.toLowerCase();
  }

  if (gameDetailTitle) {
    gameDetailTitle.textContent = game.title;
  }

  if (gameDetailDescription) {
    gameDetailDescription.textContent = game.overview || game.shortDescription;
  }

  if (gameDetailCover) {
    gameDetailCover.src = game.cover;
    gameDetailCover.alt = `${game.title} cover`;
  }

  if (gameDetailMeta) {
    gameDetailMeta.innerHTML = "";

    game.meta.forEach((entry) => {
      const item = document.createElement("article");
      item.className = "game-detail-meta-item";

      const separatorIndex = entry.indexOf(":");
      if (separatorIndex !== -1) {
        const label = document.createElement("span");
        label.className = "game-detail-meta-label";
        label.textContent = entry.slice(0, separatorIndex).trim();

        const value = document.createElement("span");
        value.className = "game-detail-meta-value";
        value.textContent = entry.slice(separatorIndex + 1).trim();

        item.append(label, value);
      } else {
        item.textContent = entry;
      }

      gameDetailMeta.appendChild(item);
    });
  }

  if (gameDetailActions) {
    gameDetailActions.innerHTML = "";

    game.actions.forEach((action) => {
      if (!action.href) {
        return;
      }

      const element = document.createElement("a");
      element.className = "contact-button";
      element.textContent = action.label;
      element.href = action.href;
      if (action.download) {
        element.download = action.download;
      } else {
        element.target = "_blank";
        element.rel = "noreferrer";
      }

      gameDetailActions.appendChild(element);
    });
  }

  if (gameDetailTrailerSection && gameDetailTrailer) {
    if (game.trailer?.src) {
      gameDetailTrailer.src = game.trailer.src;
      gameDetailTrailer.title = game.trailer.title || `${game.title} trailer`;
      forceVideoMuted(gameDetailTrailer);
      gameDetailTrailerSection.classList.remove("is-hidden");
      enableAutoplayForVideos(gameDetailTrailerSection);
    } else {
      gameDetailTrailer.removeAttribute("src");
      gameDetailTrailer.load();
      gameDetailTrailer.title = "";
      gameDetailTrailerSection.classList.add("is-hidden");
    }
  }

  if (gameDetailStillsSection && gameDetailStills) {
    const stillPaths = game.trailer?.src ? getGameStillPaths(gameId) : [];

    gameDetailStills.innerHTML = "";

    if (stillPaths.length) {
      stillPaths.forEach((src, index) => {
        const link = document.createElement("a");
        link.className = "game-detail-still";
        link.href = src;
        link.target = "_blank";
        link.rel = "noreferrer";
        link.setAttribute("aria-label", `${game.title} still ${index + 1}`);

        const image = document.createElement("img");
        image.src = src;
        image.alt = `${game.title} still ${index + 1}`;
        image.loading = "lazy";

        link.appendChild(image);
        gameDetailStills.appendChild(link);
      });

      gameDetailStillsSection.classList.remove("is-hidden");
    } else {
      gameDetailStillsSection.classList.add("is-hidden");
    }
  }

  if (gameDetailFrame && gameDetailPlayerSection) {
    if (game.webPlayable !== false && game.player?.src) {
      gameDetailFrame.src = game.player.src;
      gameDetailFrame.title = game.player.title || game.title;
      gameDetailPlayerSection.classList.remove("is-hidden");
    } else {
      gameDetailFrame.src = "about:blank";
      gameDetailFrame.title = "";
      gameDetailPlayerSection.classList.add("is-hidden");
    }
  }

  if (gameDetailDevlog) {
    gameDetailDevlog.innerHTML = "";

    const devlogEntries = game.devlog.length
      ? game.devlog
      : [
          {
            title: "No devlog entries yet",
            body: "This panel is ready. Add entries in the `gameDetails` object later and they will appear here for this game.",
          },
        ];

    devlogEntries.forEach((entry, index) => {
      const item = document.createElement("article");
      const title = document.createElement("strong");
      const body = document.createElement("p");

      item.className = "game-devlog-entry";
      title.textContent = entry.title || `Devlog ${index + 1}`;
      body.textContent = entry.body;
      item.append(title, body);
      gameDetailDevlog.appendChild(item);
    });
  }

  syncMediaMutedState();
}

function bringToFront(windowEl) {
  zIndexSeed += 1;
  windowEl.style.zIndex = String(zIndexSeed);
  renderTaskbarTabs();
}

function bringWindowToFrontAndSyncRoute(windowEl, options = {}) {
  bringToFront(windowEl);
  syncMediaMutedState();

  if (!windowEl?.dataset.windowId || windowEl.classList.contains("is-hidden") || windowEl.classList.contains("is-closing")) {
    return;
  }

  syncHistoryRoute(getRouteForWindow(windowEl), { replace: options.replaceRoute !== false });
}

function flashWindow(windowEl) {
  if (windowEl.classList.contains("collection-window")) {
    return;
  }

  windowEl.classList.remove("window-pulse");
  void windowEl.offsetWidth;
  windowEl.classList.add("window-pulse");
}

function centerWindow(windowEl) {
  if (restoreStoredPanelPosition(windowEl)) {
    syncFullscreenState();
    return;
  }

  if (windowEl.classList.contains("collection-window") && desktopModeQuery.matches) {
    windowEl.style.left = "50%";
    windowEl.style.top = "78px";
    windowEl.style.right = "auto";
    windowEl.style.bottom = "auto";
    windowEl.style.transform = "translateX(-50%)";
    delete windowEl.dataset.dragReady;
    syncFullscreenState();
    return;
  }

  if (!desktopStage || !desktopModeQuery.matches) {
    windowEl.style.left = "";
    windowEl.style.top = "";
    windowEl.style.right = "";
    windowEl.style.bottom = "";
    windowEl.style.transform = "";
    return;
  }

  const stageRect = desktopStage.getBoundingClientRect();
  const windowRect = windowEl.getBoundingClientRect();
  const nextLeft = Math.max((stageRect.width - windowRect.width) / 2, 0);
  const nextTop = Math.max((stageRect.height - windowRect.height) / 2, 0);

  placePanelWithoutOverlap(windowEl, nextLeft, nextTop);
}

function normalizeRoutePath(pathname) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/+$/, "") || "/";
}

function getTopVisibleWindow() {
  const visibleWindows = Array.from(draggableWindows).filter((windowEl) => {
    return !windowEl.classList.contains("is-hidden") && !windowEl.classList.contains("is-closing") && windowEl.dataset.windowId;
  });

  return visibleWindows.reduce((topWindow, windowEl) => {
    if (!topWindow) {
      return windowEl;
    }

    const topZ = Number(topWindow.style.zIndex || 0);
    const nextZ = Number(windowEl.style.zIndex || 0);
    return nextZ > topZ ? windowEl : topWindow;
  }, null);
}

function getActiveDocumentTarget() {
  return document.querySelector(".document-item.is-active")?.dataset.docTarget || "doc-concept";
}

function setActiveDocumentTarget(targetId) {
  if (!targetId) {
    return;
  }

  let hasMatch = false;

  documentItems.forEach((entry) => {
    const isMatch = entry.dataset.docTarget === targetId;
    entry.classList.toggle("is-active", isMatch);
    hasMatch ||= isMatch;
  });

  documentPreviews.forEach((preview) => {
    preview.classList.toggle("is-active", preview.dataset.docPreview === targetId);
  });

  if (!hasMatch) {
    setActiveDocumentTarget("doc-concept");
    return;
  }

  renderActiveDocumentPdf();
  syncMediaMutedState();
}

function getRouteForWindow(windowEl) {
  const windowId = windowEl?.dataset.windowId;

  if (!windowId) {
    return "/";
  }

  if (windowId === "game-detail-window") {
    const gameId = windowEl.dataset.gameId;
    const routeSlug = getGameRouteSlug(gameId);
    return routeSlug ? `/work/game/${routeSlug}` : "/work/game";
  }

  if (windowId === "document-collection") {
    return `/work/documents/${getActiveDocumentTarget()}`;
  }

  return windowRouteMap[windowId] || "/";
}

function syncHistoryRoute(route, { replace = false } = {}) {
  const nextRoute = normalizeRoutePath(route);
  const currentRoute = normalizeRoutePath((window.location.hash || "").replace(/^#/, "") || "/");

  if (nextRoute === currentRoute) {
    return;
  }

  const historyMethod = replace ? "replaceState" : "pushState";
  const nextHash = nextRoute === "/" ? "" : `#${nextRoute}`;
  window.history[historyMethod]({}, "", `${window.location.pathname}${window.location.search}${nextHash}`);
}

function syncRouteWithVisibleWindows(options = {}) {
  const topWindow = getTopVisibleWindow();
  const route = topWindow ? getRouteForWindow(topWindow) : "/";
  syncHistoryRoute(route, options);
}

function hideWindow(windowEl, options = {}) {
  if (!windowEl) {
    return;
  }

  if (activeWindow === windowEl) {
    stopDragging();
  }

  if (windowEl.classList.contains("is-fullscreen")) {
    toggleWindowFullscreen(windowEl, false);
  }

  const pendingHideTimer = pendingHideTimers.get(windowEl);
  if (pendingHideTimer) {
    window.clearTimeout(pendingHideTimer);
    pendingHideTimers.delete(windowEl);
  }

  const pendingOpenTimer = pendingOpenTimers.get(windowEl);
  if (pendingOpenTimer) {
    window.clearTimeout(pendingOpenTimer);
    pendingOpenTimers.delete(windowEl);
  }

  windowEl.classList.remove("is-opening");
  windowEl.classList.add("is-closing");
  pauseWindowMedia(windowEl, { reset: true });
  delete windowEl.dataset.taskbarOrder;
  syncFullscreenState();
  renderTaskbarTabs();
  syncRouteWithVisibleWindows({ replace: options.replaceRoute !== false });
  syncMediaMutedState();

  const hideTimer = window.setTimeout(() => {
    windowEl.classList.add("is-hidden");
    windowEl.classList.remove("is-closing");
    pendingHideTimers.delete(windowEl);
    syncFullscreenState();
    renderTaskbarTabs();
    syncMediaMutedState();
  }, WINDOW_CLOSE_ANIMATION_MS);

  pendingHideTimers.set(windowEl, hideTimer);
}

function showWindow(windowEl, options = {}) {
  const pendingHideTimer = pendingHideTimers.get(windowEl);
  if (pendingHideTimer) {
    window.clearTimeout(pendingHideTimer);
    pendingHideTimers.delete(windowEl);
  }

  const pendingOpenTimer = pendingOpenTimers.get(windowEl);
  if (pendingOpenTimer) {
    window.clearTimeout(pendingOpenTimer);
    pendingOpenTimers.delete(windowEl);
  }

  const wasHidden = windowEl.classList.contains("is-hidden");
  windowEl.classList.remove("is-closing");
  windowEl.classList.remove("is-hidden");
  if (wasHidden) {
    taskbarOrderSeed += 1;
    windowEl.dataset.taskbarOrder = String(taskbarOrderSeed);
    centerWindow(windowEl);
    windowEl.classList.remove("is-opening");
    void windowEl.offsetWidth;
    windowEl.classList.add("is-opening");
    const openTimer = window.setTimeout(() => {
      windowEl.classList.remove("is-opening");
      pendingOpenTimers.delete(windowEl);
    }, WINDOW_OPEN_ANIMATION_MS);
    pendingOpenTimers.set(windowEl, openTimer);
  }
  bringToFront(windowEl);
  flashWindow(windowEl);
  enableAutoplayForVideos(windowEl);
  syncFullscreenState();
  renderTaskbarTabs();
  syncMediaMutedState();

  if (options.updateRoute !== false) {
    syncHistoryRoute(getRouteForWindow(windowEl), { replace: options.replaceRoute });
  }
}

function focusWindow(windowEl, options = {}) {
  if (windowEl.classList.contains("is-hidden")) {
    showWindow(windowEl, options);
    return;
  }

  bringToFront(windowEl);
  flashWindow(windowEl);
  enableAutoplayForVideos(windowEl);
  syncFullscreenState();
  renderTaskbarTabs();
  syncMediaMutedState();

  if (options.updateRoute) {
    syncHistoryRoute(getRouteForWindow(windowEl), { replace: options.replaceRoute !== false });
  }
}

function getWindowLabel(windowEl) {
  return windowEl.querySelector(".titlebar-text, .titlebar span")?.textContent?.trim() || "window";
}

function getWindowIcon(windowEl) {
  const windowId = windowEl?.dataset.windowId;

  if (!windowId) {
    return "assets/xp-icons/taskbar-folder.ico";
  }

  if (windowId === "game-detail-window") {
    return "assets/xp-icons/games.ico";
  }

  if (windowId === "links-window") {
    return "assets/xp-icons/links.ico";
  }

  const launcherIcon = document.querySelector(`[data-target-window="${windowId}"] img`);

  if (launcherIcon?.getAttribute("src")) {
    return launcherIcon.getAttribute("src");
  }

  return "assets/xp-icons/taskbar-folder.ico";
}

function getVisibleTaskbarWindows() {
  return Array.from(draggableWindows)
    .filter((windowEl) => !windowEl.classList.contains("is-hidden") && !windowEl.classList.contains("is-closing") && windowEl.dataset.windowId)
    .sort((windowA, windowB) => {
      const orderA = Number(windowA.dataset.taskbarOrder || 0);
      const orderB = Number(windowB.dataset.taskbarOrder || 0);
      return orderA - orderB;
    });
}

function syncTaskbarOrderFromDom() {
  if (!taskbarTabs) {
    return;
  }

  const orderedTabs = Array.from(taskbarTabs.querySelectorAll(".taskbar-tab")).filter(
    (tabButton) => !tabButton.classList.contains("taskbar-tab-placeholder")
  );

  orderedTabs.forEach((tabButton, index) => {
    const windowId = tabButton.dataset.taskbarTarget;
    const windowEl = windowId ? document.querySelector(`[data-window-id="${windowId}"]`) : null;

    if (windowEl) {
      windowEl.dataset.taskbarOrder = String(index + 1);
    }
  });

  taskbarOrderSeed = orderedTabs.length;
}

function animateTaskbarShuffle(previousRects) {
  if (!taskbarTabs || !previousRects) {
    return;
  }

  Array.from(taskbarTabs.querySelectorAll(".taskbar-tab")).forEach((tabButton) => {
    if (tabButton.classList.contains("is-dragging")) {
      return;
    }

    const key = tabButton.dataset.taskbarTarget;
    const previousRect = key ? previousRects.get(key) : null;

    if (!previousRect) {
      return;
    }

    const nextRect = tabButton.getBoundingClientRect();
    const deltaX = previousRect.left - nextRect.left;

    if (Math.abs(deltaX) < 1) {
      return;
    }

    tabButton.style.transition = "none";
    tabButton.style.transform = `translateX(${deltaX}px)`;
    void tabButton.offsetWidth;
    tabButton.classList.add("is-shuffling");
    tabButton.style.transition = "";
    tabButton.style.transform = "";

    const clearShuffleState = () => {
      tabButton.classList.remove("is-shuffling");
      tabButton.style.transition = "";
    };

    tabButton.addEventListener("transitionend", clearShuffleState, { once: true });
    window.setTimeout(clearShuffleState, 300);
  });
}

function endTaskbarDrag(pointerId = null) {
  if (!activeTaskbarDrag) {
    return;
  }

  if (pointerId !== null && activeTaskbarDrag.pointerId !== pointerId) {
    return;
  }

  const { tabButton, placeholder } = activeTaskbarDrag;

  if (placeholder?.parentNode) {
    placeholder.parentNode.insertBefore(tabButton, placeholder);
    placeholder.remove();
  }

  tabButton.classList.remove("is-dragging");
  tabButton.style.transform = "";
  tabButton.style.zIndex = "";
  tabButton.style.pointerEvents = "";
  tabButton.style.position = "";
  tabButton.style.left = "";
  tabButton.style.top = "";
  tabButton.style.width = "";
  tabButton.style.height = "";
  taskbarTabs?.classList.remove("is-sorting");
  syncTaskbarOrderFromDom();
  activeTaskbarDrag = null;
}

function renderTaskbarTabs() {
  if (!taskbarTabs) {
    return;
  }

  const visibleWindows = getVisibleTaskbarWindows();

  const activeWindowEl = visibleWindows.reduce((topWindow, windowEl) => {
    if (!topWindow) {
      return windowEl;
    }

    const topZ = Number(topWindow.style.zIndex || 0);
    const nextZ = Number(windowEl.style.zIndex || 0);
    return nextZ > topZ ? windowEl : topWindow;
  }, null);

  taskbarTabs.innerHTML = "";

  visibleWindows.forEach((windowEl) => {
      const tabButton = document.createElement("button");
      const iconImage = document.createElement("img");
      const labelSpan = document.createElement("span");

      tabButton.type = "button";
      tabButton.className = "taskbar-tab";
      tabButton.dataset.taskbarTarget = windowEl.dataset.windowId;
      tabButton.classList.toggle("is-active", windowEl === activeWindowEl);
      iconImage.className = "taskbar-tab-icon";
      iconImage.src = getWindowIcon(windowEl);
      iconImage.alt = "";
      iconImage.setAttribute("aria-hidden", "true");
      labelSpan.textContent = getWindowLabel(windowEl);
      tabButton.append(iconImage, labelSpan);

      tabButton.addEventListener("pointerdown", (event) => {
        if (event.button !== 0 || !taskbarTabs || !finePointerQuery.matches) {
          return;
        }

        activeTaskbarDrag = {
          pointerId: event.pointerId,
          startX: event.clientX,
          currentX: event.clientX,
          moved: false,
          windowEl,
          tabButton,
          placeholder: null,
        };

        tabButton.setPointerCapture?.(event.pointerId);
      });

      tabButton.addEventListener("click", () => {
        if (activeTaskbarDrag?.windowEl === windowEl && activeTaskbarDrag.moved) {
          return;
        }

        if (tabButton.dataset.suppressClick === "true") {
          delete tabButton.dataset.suppressClick;
          return;
        }

        focusWindow(windowEl, { updateRoute: true });
      });

      taskbarTabs.appendChild(tabButton);
  });
}

function updateTaskbarClock() {
  if (!taskbarClock) {
    return;
  }

  const now = new Date();
  const timeLabel = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const dateLabel = now.toLocaleDateString([], {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
  taskbarClock.innerHTML = `<span>${timeLabel}</span><span>${dateLabel}</span>`;
}

function closeAllWindows() {
  draggableWindows.forEach((windowEl) => {
    const pendingHideTimer = pendingHideTimers.get(windowEl);
    if (pendingHideTimer) {
      window.clearTimeout(pendingHideTimer);
      pendingHideTimers.delete(windowEl);
    }

    const pendingOpenTimer = pendingOpenTimers.get(windowEl);
    if (pendingOpenTimer) {
      window.clearTimeout(pendingOpenTimer);
      pendingOpenTimers.delete(windowEl);
    }

    windowEl.classList.remove("is-opening", "is-closing");
    windowEl.classList.add("is-hidden");
    delete windowEl.dataset.taskbarOrder;
    pauseWindowMedia(windowEl, { reset: true });
  });

  syncFullscreenState();
  renderTaskbarTabs();
  syncMediaMutedState();
}

function applyRouteFromLocation() {
  const hashRoute = normalizeRoutePath((window.location.hash || "").replace(/^#/, "") || "/");
  const pathname = normalizeRoutePath(window.location.pathname);
  const activeRoute =
    hashRoute !== "/"
      ? hashRoute
      : ["/about", "/links", "/work", "/faq", "/contact", "/achievements", "/cat", "/work/game", "/games", "/game", "/work/documents", "/documents", "/work/3d", "/3d"].some((route) => pathname === route || pathname.startsWith(`${route}/`))
        ? pathname
        : "/";
  const gameMatch = activeRoute.match(/^\/work\/game\/([^/]+)$/);
  const legacyGameMatch = activeRoute.match(/^\/game\/([^/]+)$/);
  const documentMatch = activeRoute.match(/^\/work\/documents\/([^/]+)$/);
  const legacyDocumentMatch = activeRoute.match(/^\/documents\/([^/]+)$/);
  const legacyWindowRouteMap = {
    "game-collection": "/games",
    "three-d-collection": "/3d",
  };

  closeAllWindows();

  if (activeRoute === "/") {
    return;
  }

  if (activeRoute === "/work/game" || activeRoute === "/games") {
    const gameCollectionWindow = document.querySelector('[data-window-id="game-collection"]');

    if (gameCollectionWindow) {
      showWindow(gameCollectionWindow, { updateRoute: false, replaceRoute: true });
    }

    return;
  }

  if (activeRoute === "/game" || gameMatch || legacyGameMatch) {
    const routeSlug = gameMatch?.[1] || legacyGameMatch?.[1] || "";
    const gameId =
      getGameIdFromRouteSlug(routeSlug) || gameDetailWindow?.dataset.gameId || Object.keys(gameDetails)[0];

    if (gameId && gameDetails[gameId] && gameDetailWindow) {
      renderGameDetail(gameId);
      showWindow(gameDetailWindow, { updateRoute: false, replaceRoute: true });
    }

    return;
  }

  if (activeRoute === "/work/documents" || activeRoute === "/documents" || documentMatch || legacyDocumentMatch) {
    const targetId = documentMatch?.[1] || legacyDocumentMatch?.[1] || "doc-concept";

    if (documentItems.length && documentPreviews.length) {
      setActiveDocumentTarget(targetId);
    }

    const documentWindow = document.querySelector('[data-window-id="document-collection"]');

    if (documentWindow) {
      showWindow(documentWindow, { updateRoute: false, replaceRoute: true });
    }

    return;
  }

  const matchedEntry = Object.entries(windowRouteMap).find(([, route]) => route === activeRoute);
  const legacyMatchedEntry = Object.entries(legacyWindowRouteMap).find(([, route]) => route === activeRoute);
  const targetWindowId = matchedEntry?.[0] || legacyMatchedEntry?.[0];
  const targetWindow = targetWindowId
    ? document.querySelector(`[data-window-id="${targetWindowId}"]`)
    : null;

  if (targetWindow) {
    showWindow(targetWindow, { updateRoute: false, replaceRoute: true });
  }
}

async function copyTextToClipboard(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return true;
  }

  const helper = document.createElement("textarea");
  helper.value = value;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.opacity = "0";
  helper.style.pointerEvents = "none";
  document.body.appendChild(helper);
  helper.select();
  helper.setSelectionRange(0, helper.value.length);

  try {
    return document.execCommand("copy");
  } finally {
    document.body.removeChild(helper);
  }
}

function resetWindowLayout(windowEl) {
  windowEl.classList.remove("is-fullscreen", "is-opening", "is-closing");
  windowEl.style.left = "";
  windowEl.style.top = "";
  windowEl.style.right = "";
  windowEl.style.bottom = "";
  windowEl.style.zIndex = "";
  delete windowEl.dataset.dragReady;
  delete windowEl.dataset.taskbarOrder;

  if (windowEl.dataset.windowId) {
    windowEl.classList.add("is-hidden");
    return;
  }

  windowEl.classList.remove("is-hidden");
}

function resetLayout() {
  stopDragging();
  clearStoredPanelPositions();
  draggableWindows.forEach((windowEl) => {
    resetWindowLayout(windowEl);
  });
  if (homeWindow) {
    homeWindow.style.position = "";
    homeWindow.style.margin = "";
    homeWindow.style.left = "";
    homeWindow.style.top = "";
    homeWindow.style.right = "";
    homeWindow.style.bottom = "";
    homeWindow.style.transform = "";
    homeWindow.style.zIndex = "";
    delete homeWindow.dataset.dragReady;
  }
  zIndexSeed = 20;
  taskbarOrderSeed = 0;
  arrangeVisiblePanels();
  syncFullscreenState();
  renderTaskbarTabs();
}

function beginPageTransition(callback) {
  document.body.classList.add("is-transitioning");
  window.setTimeout(() => {
    callback();
  }, 220);
}

function closeStartPanel() {
  startPanel?.classList.add("is-hidden");
  startButton?.setAttribute("aria-expanded", "false");
}

function toggleStartPanel() {
  if (!startPanel || !startButton) {
    return;
  }

  const willOpen = startPanel.classList.contains("is-hidden");
  startPanel.classList.toggle("is-hidden", !willOpen);
  startButton.setAttribute("aria-expanded", String(willOpen));

  if (willOpen) {
    restoreStoredPanelPosition(startPanel);
  }
}

function stopDragging() {
  if (!activeWindow) {
    return;
  }

  savePanelPosition(activeWindow);
  activeWindow.classList.remove("is-active");
  document.body.classList.remove("is-dragging");
  activeWindow = null;
}

function openWindowLink(windowEl) {
  const link = windowEl.dataset.link;

  if (!link) {
    return;
  }

  beginPageTransition(() => {
    window.open(link, "_blank", "noopener,noreferrer");
    document.body.classList.remove("is-transitioning");
  });
}

function startDragging(event, windowEl) {
  if ((!desktopStage && !isStartPanel(windowEl)) || !canDragWindows()) {
    return;
  }

  if (windowEl.classList.contains("is-fullscreen")) {
    return;
  }

  if (isStartPanel(windowEl)) {
    const interactiveTarget = event.target.closest("button, a, input, textarea, select, label");

    if (interactiveTarget) {
      return;
    }
  }

  const titlebar = event.target.closest(".titlebar, .home-titlebar, .start-panel-header");
  const closeButton = event.target.closest("button");

  if ((!titlebar && !isStartPanel(windowEl)) || closeButton) {
    return;
  }

  const windowRect = windowEl.getBoundingClientRect();

  activeWindow = windowEl;
  pointerOffsetX = event.clientX - windowRect.left;
  pointerOffsetY = event.clientY - windowRect.top;

  windowEl.classList.add("is-active");
  bringToFront(windowEl);
  document.body.classList.add("is-dragging");

  if (!windowEl.dataset.dragReady) {
    if (isStartPanel(windowEl)) {
      windowEl.style.position = "fixed";
      windowEl.style.left = `${windowRect.left}px`;
      windowEl.style.top = `${windowRect.top}px`;
      windowEl.style.right = "auto";
      windowEl.style.bottom = "auto";
      windowEl.style.transform = "none";
      windowEl.dataset.dragReady = "true";
      return;
    }

    const stageRect = desktopStage.getBoundingClientRect();

    if (windowEl === homeWindow) {
      windowEl.style.position = "absolute";
      windowEl.style.margin = "0";
    }

    windowEl.style.left = `${windowRect.left - stageRect.left}px`;
    windowEl.style.top = `${windowRect.top - stageRect.top}px`;
    windowEl.style.right = "auto";
    windowEl.style.bottom = "auto";
    windowEl.style.transform = "none";
    windowEl.dataset.dragReady = "true";
  }
}

function updateDragging(event) {
  if (!activeWindow || !canDragWindows()) {
    return;
  }

  if (isStartPanel(activeWindow)) {
    const windowRect = activeWindow.getBoundingClientRect();
    const nextLeft = clamp(event.clientX - pointerOffsetX, 0, window.innerWidth - windowRect.width);

    activeWindow.style.left = `${nextLeft}px`;
    return;
  }

  if (!desktopStage) {
    return;
  }

  const stageRect = desktopStage.getBoundingClientRect();
  const windowRect = activeWindow.getBoundingClientRect();

  const nextLeft = clamp(
    event.clientX - stageRect.left - pointerOffsetX,
    0,
    stageRect.width - windowRect.width
  );
  const nextTop = clamp(
    event.clientY - stageRect.top - pointerOffsetY,
    0,
    stageRect.height - windowRect.height
  );

  activeWindow.style.left = `${nextLeft}px`;
  activeWindow.style.top = `${nextTop}px`;
}

injectWindowControls();

draggableWindows.forEach((windowEl) => {
  const titlebar = windowEl.querySelector(".titlebar");
  const closeButton = titlebar?.querySelector(".close-toggle");
  const fullscreenButton = titlebar?.querySelector(".fullscreen-toggle");

  if (!titlebar) {
    return;
  }

  titlebar.addEventListener("pointerdown", (event) => {
    startDragging(event, windowEl);
  });

  windowEl.addEventListener("pointerdown", () => {
    if (desktopModeQuery.matches) {
      bringWindowToFrontAndSyncRoute(windowEl);
    }
  });

  titlebar.addEventListener("dblclick", (event) => {
    if (event.target.closest("button")) {
      return;
    }

    openWindowLink(windowEl);
  });

  closeButton?.addEventListener("pointerdown", (event) => {
    if (event.button === 0) {
      playCursorPressFeedback();
    }
    event.stopPropagation();
  });

  fullscreenButton?.addEventListener("pointerdown", (event) => {
    if (event.button === 0) {
      playCursorPressFeedback();
    }
    event.stopPropagation();
  });

  fullscreenButton?.addEventListener("click", (event) => {
    event.stopPropagation();

    if (activeWindow === windowEl) {
      stopDragging();
    }

    toggleWindowFullscreen(windowEl);
  });

  closeButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    hideWindow(windowEl);
  });
});

homeTitlebar?.addEventListener("pointerdown", (event) => {
  if (!homeWindow) {
    return;
  }

  startDragging(event, homeWindow);
});

startPanel?.addEventListener("pointerdown", (event) => {
  if (!startPanel || startPanel.classList.contains("is-hidden")) {
    return;
  }

  startDragging(event, startPanel);
});

homeWindow?.addEventListener("pointerdown", () => {
  if (desktopModeQuery.matches) {
    bringToFront(homeWindow);
  }
});

window.addEventListener("pointermove", updateDragging);
window.addEventListener("pointerup", stopDragging);
window.addEventListener("pointercancel", stopDragging);
window.addEventListener("pointermove", (event) => {
  if (!activeTaskbarDrag || activeTaskbarDrag.pointerId !== event.pointerId || !taskbarTabs) {
    return;
  }

  const deltaX = event.clientX - activeTaskbarDrag.startX;
  activeTaskbarDrag.currentX = event.clientX;

  if (!activeTaskbarDrag.moved && Math.abs(deltaX) < TASKBAR_DRAG_THRESHOLD) {
    return;
  }

  if (!activeTaskbarDrag.moved) {
    const rect = activeTaskbarDrag.tabButton.getBoundingClientRect();
    const placeholder = document.createElement("div");
    placeholder.className = "taskbar-tab taskbar-tab-placeholder";
    placeholder.style.width = `${rect.width}px`;
    placeholder.style.height = `${rect.height}px`;
    placeholder.setAttribute("aria-hidden", "true");

    activeTaskbarDrag.tabButton.parentNode?.insertBefore(placeholder, activeTaskbarDrag.tabButton);
    activeTaskbarDrag.placeholder = placeholder;
    activeTaskbarDrag.moved = true;
    activeTaskbarDrag.pointerOffsetX = event.clientX - rect.left;
    activeTaskbarDrag.pointerOffsetY = event.clientY - rect.top;
    activeTaskbarDrag.tabButton.classList.add("is-dragging");
    activeTaskbarDrag.tabButton.style.position = "fixed";
    activeTaskbarDrag.tabButton.style.left = `${rect.left}px`;
    activeTaskbarDrag.tabButton.style.top = `${rect.top}px`;
    activeTaskbarDrag.tabButton.style.width = `${rect.width}px`;
    activeTaskbarDrag.tabButton.style.height = `${rect.height}px`;
    activeTaskbarDrag.tabButton.style.zIndex = "3";
    activeTaskbarDrag.tabButton.style.pointerEvents = "none";
  }

  const floatingLeft = event.clientX - (activeTaskbarDrag.pointerOffsetX ?? 0);
  const floatingTop = event.clientY - (activeTaskbarDrag.pointerOffsetY ?? 0);
  activeTaskbarDrag.tabButton.style.left = `${floatingLeft}px`;
  activeTaskbarDrag.tabButton.style.top = `${floatingTop}px`;
  taskbarTabs.classList.add("is-sorting");

  const placeholder = activeTaskbarDrag.placeholder;

  if (!placeholder) {
    return;
  }

  const previousTab = placeholder.previousElementSibling;
  const nextTab = placeholder.nextElementSibling;
  const draggedRect = activeTaskbarDrag.tabButton.getBoundingClientRect();

  if (deltaX < 0 && previousTab?.classList.contains("taskbar-tab")) {
    const previousRect = previousTab.getBoundingClientRect();
    const overlapWidth = Math.min(draggedRect.right, previousRect.right) - Math.max(draggedRect.left, previousRect.left);

    if (overlapWidth > previousRect.width / 2) {
      const previousRects = new Map(
        Array.from(taskbarTabs.querySelectorAll(".taskbar-tab")).map((tabButton) => [
          tabButton.dataset.taskbarTarget,
          tabButton.getBoundingClientRect(),
        ])
      );

      taskbarTabs.insertBefore(placeholder, previousTab);
      syncTaskbarOrderFromDom();
      animateTaskbarShuffle(previousRects);
    }
  } else if (deltaX > 0 && nextTab?.classList.contains("taskbar-tab")) {
    const nextRect = nextTab.getBoundingClientRect();
    const overlapWidth = Math.min(draggedRect.right, nextRect.right) - Math.max(draggedRect.left, nextRect.left);

    if (overlapWidth > nextRect.width / 2) {
      const previousRects = new Map(
        Array.from(taskbarTabs.querySelectorAll(".taskbar-tab")).map((tabButton) => [
          tabButton.dataset.taskbarTarget,
          tabButton.getBoundingClientRect(),
        ])
      );

      taskbarTabs.insertBefore(placeholder, nextTab.nextElementSibling);
      syncTaskbarOrderFromDom();
      animateTaskbarShuffle(previousRects);
    }
  }
});
window.addEventListener("pointerup", (event) => {
  if (!activeTaskbarDrag || activeTaskbarDrag.pointerId !== event.pointerId) {
    return;
  }

  if (activeTaskbarDrag.moved) {
    activeTaskbarDrag.tabButton.dataset.suppressClick = "true";
  }

  endTaskbarDrag(event.pointerId);
});
window.addEventListener("pointercancel", (event) => {
  endTaskbarDrag(event.pointerId);
});
window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  if (startPanel && !startPanel.classList.contains("is-hidden")) {
    closeStartPanel();
    return;
  }

  const visibleWindows = Array.from(draggableWindows).filter((windowEl) => {
    return !windowEl.classList.contains("is-hidden") && windowEl.dataset.windowId;
  });

  if (!visibleWindows.length) {
    return;
  }

  const topWindow = visibleWindows.sort((windowA, windowB) => {
    const zIndexA = Number(windowA.style.zIndex || 0);
    const zIndexB = Number(windowB.style.zIndex || 0);
    return zIndexB - zIndexA;
  })[0];

  if (activeWindow === topWindow) {
    stopDragging();
  }

  if (topWindow.classList.contains("is-fullscreen")) {
    toggleWindowFullscreen(topWindow, false);
    return;
  }

  hideWindow(topWindow);
});

desktopModeQuery.addEventListener("change", () => {
  stopDragging();
  if (!desktopModeQuery.matches && homeWindow) {
    homeWindow.style.position = "";
    homeWindow.style.margin = "";
    homeWindow.style.left = "";
    homeWindow.style.top = "";
    homeWindow.style.right = "";
    homeWindow.style.bottom = "";
    homeWindow.style.transform = "";
    delete homeWindow.dataset.dragReady;
  }

  if (!desktopModeQuery.matches && startPanel) {
    startPanel.style.position = "";
    startPanel.style.left = "";
    startPanel.style.top = "";
    startPanel.style.right = "";
    startPanel.style.bottom = "";
    startPanel.style.transform = "";
    delete startPanel.dataset.dragReady;
  }
  arrangeVisiblePanels();
});

finePointerQuery.addEventListener("change", () => {
  stopDragging();
});

folderShortcuts.forEach((shortcut) => {
  shortcut.addEventListener("click", (event) => {
    const targetId = shortcut.dataset.targetWindow;
    const targetWindow = targetId ? document.querySelector(`[data-window-id="${targetId}"]`) : null;

    if (!targetWindow) {
      return;
    }

    event.preventDefault();
    closeStartPanel();
    if (shortcut.dataset.gameId) {
      renderGameDetail(shortcut.dataset.gameId);
    }
    showWindow(targetWindow);
  });
});

resetLayoutButton?.addEventListener("click", () => {
  closeStartPanel();
  resetLayout();
});

startButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleStartPanel();
});

startPanel?.addEventListener("click", (event) => {
  event.stopPropagation();
});

restartButton?.addEventListener("click", () => {
  closeStartPanel();
  clearStoredPanelPositions();
  const baseHref = document.querySelector("base")?.href || `${window.location.origin}/`;
  const restartUrl = new URL(baseHref, window.location.href);
  restartUrl.hash = "";
  beginPageTransition(() => {
    window.location.replace(restartUrl.toString());
  });
});

themeToggleButton?.addEventListener("click", () => {
  document.body.classList.toggle("is-dark");
  updateThemeToggleLabel();
});

crtToggleButton?.addEventListener("click", () => {
  const nextState = document.body.classList.contains("crt-disabled");
  applyCrtEffectState(nextState);
});

wallpaperToggleButton?.addEventListener("click", () => {
  const nextMode = document.body.classList.contains("wallpaper-kojima") ? "normal" : "kojima";
  applyWallpaperMode(nextMode, { save: true });
});

document.addEventListener(
  "click",
  (event) => {
    const button = event.target.closest?.("button");

    if (!button || button.disabled || button.getAttribute("aria-disabled") === "true") {
      return;
    }

    playButtonClickSound();
  },
  true
);

soundToggleButton?.addEventListener("click", () => {
  isMuted = !isMuted;
  document.body.classList.toggle("is-muted", isMuted);
  syncMediaMutedState();
  updateSoundToggleLabel();
});

documentItems.forEach((item) => {
  item.addEventListener("click", () => {
    const targetId = item.dataset.docTarget;
    setActiveDocumentTarget(targetId);
    syncRouteWithVisibleWindows({ replace: false });
  });
});

videoFullscreenButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const card = button.closest(".collection-card");
    const videoEl = card?.querySelector("video");

    if (!videoEl) {
      return;
    }

    try {
      if (videoEl.requestFullscreen) {
        await videoEl.requestFullscreen();
      }
    } catch {
      // Ignore rejected fullscreen requests triggered by browser policy edge cases.
    }
  });
});

navigableLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const href = link.getAttribute("href");

    if (!href) {
      return;
    }

    if (link.hasAttribute("download") || href.startsWith("blob:") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return;
    }

    event.preventDefault();

    if (link.target === "_blank") {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    beginPageTransition(() => {
      window.location.href = href;
    });
  });
});

copyEmailButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const email = button.dataset.copyEmail;
    const status = button.querySelector(".contact-inline-copy-status");

    if (!email) {
      return;
    }

    try {
      const copied = await copyTextToClipboard(email);
      if (status) {
        status.textContent = copied ? "Copied" : "Failed";
      }
    } catch {
      if (status) {
        status.textContent = "Failed";
      }
    }

    if (status) {
      window.clearTimeout(button._copyStatusTimeout);
      button._copyStatusTimeout = window.setTimeout(() => {
        status.textContent = "";
      }, 1800);
    }
  });
});

document.addEventListener("pointerdown", (event) => {
  if (!startPanel || startPanel.classList.contains("is-hidden")) {
    return;
  }

  if (startPanel.contains(event.target) || startButton?.contains(event.target)) {
    return;
  }

  closeStartPanel();
});

window.addEventListener("pageshow", () => {
  document.body.classList.remove("is-transitioning");
});

window.addEventListener("popstate", () => {
  applyRouteFromLocation();
});

window.addEventListener("hashchange", () => {
  applyRouteFromLocation();
});

window.addEventListener("load", () => {
  renderCatMedia();
  setupCursorEffect();
  setupHoverTrailerPreviews();
  restoreStoredPanelPosition(homeWindow);
  arrangeVisiblePanels();
  syncFullscreenState();
  updateThemeToggleLabel();
  applyWallpaperMode(getStoredWallpaperMode());
  applyCrtEffectState(false);
  updateSoundToggleLabel();
  initializeVideoMuteDefaults();
  enableAutoplayForVideos();
  syncMediaMutedState();
  renderActiveDocumentPdf();
  renderTaskbarTabs();
  applyRouteFromLocation();
  updateTaskbarClock();
  window.setInterval(updateTaskbarClock, 1000);
  document.body.classList.add("is-ready");
});
