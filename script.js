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
const bootScreen = document.querySelector("#boot-screen");
const draggableWindows = document.querySelectorAll(".desktop-stage .window");
const homeWindow = document.querySelector(".home-window");
const homeTitlebar = document.querySelector(".home-titlebar");
const folderShortcuts = document.querySelectorAll("[data-target-window]");
const navigableLinks = document.querySelectorAll('a[href]:not([href^="#"])');
const catMediaGrid = document.querySelector("#cat-media-grid");
const resetLayoutButton = document.querySelector(".reset-layout-button");
const themeToggleButton = document.querySelector("#theme-toggle");
const soundToggleButton = document.querySelector("#sound-toggle");
const musicTrackList = document.querySelector("#music-track-list");
const musicSearchInput = document.querySelector("#music-search-input");
const musicPlayToggle = document.querySelector("#music-play-toggle");
const musicVolume = document.querySelector("#music-volume");
const musicAudio = document.querySelector("#music-audio");
const musicTrackTitle = document.querySelector("#music-track-title");
const musicPanel = document.querySelector("#music-panel");
const musicPanelToggle = document.querySelector("#music-panel-toggle");
const musicProgress = document.querySelector(".music-progress span");
const musicProgressBar = document.querySelector(".music-progress");
const musicTimeDisplay = document.querySelector("#music-time");
const musicLoopToggle = document.querySelector("#music-loop-toggle");
const musicShuffleToggle = document.querySelector("#music-shuffle-toggle");
const crtToggleButton = document.querySelector("#crt-toggle");
const wallpaperToggleButton = document.querySelector("#wallpaper-toggle");
const startButton = document.querySelector("#start-button");
const startPanel = document.querySelector("#start-panel");
const startPanelHeader = document.querySelector(".start-panel-header");
const startSearchInput = document.querySelector("#start-search-input");
const startSearchResults = document.querySelector("#start-search-results");
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
const gameDetailCaseStudySection = document.querySelector("[data-game-detail-case-study-section]");
const gameDetailCaseStudy = document.querySelector("[data-game-detail-case-study]");
const gameDetailTrailerSection = document.querySelector("[data-game-detail-trailer-section]");
const gameDetailTrailer = document.querySelector("[data-game-detail-trailer]");
const gameDetailTrailerStatus = document.querySelector("[data-game-detail-trailer-status]");
const gameDetailStillsSection = document.querySelector("[data-game-detail-stills-section]");
const gameDetailStills = document.querySelector("[data-game-detail-stills]");
const gameDetailFrame = document.querySelector("[data-game-detail-frame]");
const gameDetailPlayerSection = document.querySelector("[data-game-detail-player-section]");
const gamePlayerShell = document.querySelector("[data-game-player-shell]");
const gamePlayerOverlay = document.querySelector("[data-game-player-overlay]");
const gamePlayerStatus = document.querySelector("[data-game-player-status]");
const gamePlayerNote = document.querySelector("[data-game-player-note]");
const gamePlayerLoadButton = document.querySelector("[data-game-player-load]");
const gameDetailDevlog = document.querySelector("[data-game-detail-devlog]");
const gameDetailCover = document.querySelector(".game-detail-cover");
const gameFilterButtons = document.querySelectorAll("[data-game-filter]");
const gameFilterCount = document.querySelector("[data-game-filter-count]");
const hoverTrailerCards = document.querySelectorAll("[data-hover-trailer-card]");
const mediaLightbox = document.querySelector("#media-lightbox");
const mediaLightboxImage = document.querySelector("#media-lightbox-image");
const mediaLightboxCaption = document.querySelector("#media-lightbox-caption");
const mediaLightboxClose = document.querySelector("#media-lightbox-close");
const mediaLightboxPrev = document.querySelector("#media-lightbox-prev");
const mediaLightboxNext = document.querySelector("#media-lightbox-next");
const LIGHTBOX_PLACEHOLDER_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=";
let catMediaRendered = false;
let mediaLightboxItems = [];
let mediaLightboxIndex = 0;
const nativeFullscreenAutoResumeTimers = new WeakMap();
const bootScreenStartedAt = typeof performance !== "undefined" ? performance.now() : Date.now();
const WINDOW_OPEN_ANIMATION_MS = 260;
const WINDOW_CLOSE_ANIMATION_MS = 220;
const START_PANEL_CLOSE_ANIMATION_MS = 180;
const FULLSCREEN_WINDOW_Z_INDEX = 10020;
const FULLSCREEN_WINDOW_TOP_OFFSET = "var(--fullscreen-window-top)";
const NATIVE_FULLSCREEN_AUTO_RESUME_MS = 500;
const BOOT_SCREEN_MIN_MS = 2600;
const BUTTON_CLICK_SOUND_SRC = "sounds/universfield-computer-mouse-click-352734.mp3";
const DEFAULT_MUSIC_COVER_ART = "assets/wallpaper/kojima-please-hire-me.png";
const SOUNDCLOUD_MUSIC_TRACKS = [
  {
    label: "Ntreboot - Plastic Love",
    type: "soundcloud",
    soundcloudUrl: "https://soundcloud.com/ntreboot/plastic-love",
    duration: "",
  },
  {
    label: "Ca Hoi Hoang - 2004",
    type: "soundcloud",
    soundcloudUrl: "https://soundcloud.com/nguyetanh3694/2004-ca-hoi-hoang",
    duration: "",
  },
  {
    label: "Anri - I Can't Stop The Loneliness",
    type: "soundcloud",
    soundcloudUrl: "https://soundcloud.com/psych-witches/anri-i-cant-stop-the-loneliness",
    duration: "",
  },
];
const DEFAULT_SOUNDCLOUD_MUSIC_TRACK = SOUNDCLOUD_MUSIC_TRACKS[0];

function completeBootScreen({ immediate = false } = {}) {
  if (!bootScreen || document.body.classList.contains("is-boot-complete")) {
    return;
  }

  if (immediate && !document.body.classList.contains("is-ready")) {
    bootScreen.dataset.skipRequested = "true";
    return;
  }

  const now = typeof performance !== "undefined" ? performance.now() : Date.now();
  const elapsed = now - bootScreenStartedAt;
  const delay = immediate ? 0 : Math.max(0, BOOT_SCREEN_MIN_MS - elapsed);

  window.setTimeout(() => {
    document.body.classList.add("is-boot-complete");
    bootScreen.setAttribute("aria-hidden", "true");
  }, delay);
}

let MUSIC_TRACKS = [
  {
    "label": "Cá Hồi Hoang - 2004",
    "src": "playlists/songs/Cá Hồi Hoang - 2004/2004.mp3",
    "cover": "playlists/songs/Cá Hồi Hoang - 2004/ab67616d0000b273f3405de7a471d45f4e99e9cb.jpg",
    "duration": "4:15"
  },
  {
    "label": "half·alive - Never Been Better",
    "src": "playlists/songs/half·alive - Never Been Better/YTMP3GG_YouTube_half-alive-Never-Been-Better-Audio-ft-Or_Media_gFyn_Dh_fQM_009_128k.mp3",
    "cover": "playlists/songs/half·alive - Never Been Better/images (2).jpg",
    "duration": ""
  },
  {
    "label": "Kanashimi ga Tomaranai - I CAN'T STOP THE LONELINESS",
    "src": "playlists/songs/Kanashimi ga Tomaranai - I CAN'T STOP THE LONELINESS/悲しみがとまらないI CAN'T STOP THE LONELINESS.mp3",
    "cover": "playlists/songs/Kanashimi ga Tomaranai - I CAN'T STOP THE LONELINESS/1900x1900-000000-80-0-0.jpg",
    "duration": ""
  },
  {
    "label": "Low Roar - Bones",
    "src": "playlists/songs/Low Roar - Bones/Low Roar - Bones (feat. Jófríõur Ákadóttir) [Official Music Video].mp3",
    "cover": "playlists/songs/Low Roar - Bones/artworks-tCfwh5SHHQj4-0-t500x500.jpg",
    "duration": ""
  },
  {
    "label": "Low Roar - Don't Be So Serious",
    "src": "playlists/songs/Low Roar - Don't Be So Serious/Don't Be so Serious.mp3",
    "cover": "playlists/songs/Low Roar - Don't Be So Serious/artworks-tCfwh5SHHQj4-0-t500x500.jpg",
    "duration": ""
  },
  {
    "label": "Magnolian - Indigo",
    "src": "playlists/songs/Magnolian - Indigo/Magnolian - Indigo (Official Video).mp3",
    "cover": "playlists/songs/Magnolian - Indigo/IndigoCoverArt.jpg",
    "duration": "5:07"
  },
  {
    "label": "Mariya Takeuchi - Plastic Love",
    "src": "playlists/songs/Mariya Takeuchi - Plastic Love/竹内まりや -  Plastic Love (Official Music Video).mp3",
    "cover": "playlists/songs/Mariya Takeuchi - Plastic Love/r-20684092-1635474559-1118-jpeg.webp",
    "duration": ""
  },
  {
    "label": "Meiko Nakahara - Fantasy",
    "src": "playlists/songs/Meiko Nakahara - Fantasy/Meiko Nakahara - Fantasy (1982).mp3",
    "cover": "playlists/songs/Meiko Nakahara - Fantasy/images.jpg",
    "duration": ""
  },
  {
    "label": "PHÙNG KHÁNH LINH – EM ĐAU",
    "src": "playlists/songs/PHÙNG KHÁNH LINH – EM ĐAU/PHÙNG KHÁNH LINH  EM ĐAU (WITH THÀNH LUKE) (LYRIC VIDEO).mp3",
    "cover": "playlists/songs/PHÙNG KHÁNH LINH – EM ĐAU/ab67616d0000b27375e9c9d2259957c823e20af9.jpg",
    "duration": "4:30"
  },
  {
    "label": "Thành Luke - Cảnh Tiếp Theo",
    "src": "playlists/songs/Thành Luke - Cảnh Tiếp Theo/Thành Luke - Cảnh Tiếp Theo (Lyric Video).mp3",
    "cover": "playlists/songs/Thành Luke - Cảnh Tiếp Theo/maxresdefault.jpg",
    "duration": "4:20"
  },
  {
    "label": "Thành Luke - Cùng",
    "src": "playlists/songs/Thành Luke - Cùng/Thành Luke - Cùng.mp3",
    "cover": "playlists/songs/Thành Luke - Cùng/0x1900-000000-80-0-0.jpg",
    "duration": "3:00"
  },
  {
    "label": "Vaundy - Odoriko",
    "src": "playlists/songs/Vaundy - Odoriko/Vaundy - Odoriko (踊り子) (Lyrics) (RomEng).mp3",
    "cover": "playlists/songs/Vaundy - Odoriko/Vaundy_-_Odoriko.png",
    "duration": ""
  },
  {
    "label": "Yasuha - Flyday Chinatown",
    "src": "playlists/songs/Yasuha - Flyday Chinatown/フライディチャイナタウン 泰葉 Official Lyric Video.mp3",
    "cover": "playlists/songs/Yasuha - Flyday Chinatown/0x1900-000000-80-0-0.jpg",
    "duration": ""
  }
];

let currentlyPlayingTrack = null;
let isMusicShuffleEnabled = false;
let startPanelCloseTimer = null;
let startKeyboardActiveIndex = -1;
let musicKeyboardActiveIndex = -1;

function normalizeMusicAssetPath(src) {
  return src || "";
}

MUSIC_TRACKS = MUSIC_TRACKS.map((track) => ({
  ...track,
  src: normalizeMusicAssetPath(track.src),
  cover: normalizeMusicAssetPath(track.cover),
}));

// Load music tracks from manifest.json
async function loadMusicManifest() {
  try {
    const response = await fetch(`playlists/manifest.json?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Music manifest returned ${response.status}`);
    }
    const data = await response.json();
    if (data.playlists && data.playlists.length > 0) {
      MUSIC_TRACKS = data.playlists[0].tracks.map(track => {
        let src = normalizeMusicAssetPath(track.file || track.src || "");
        let cover = normalizeMusicAssetPath(track.cover || "");
        let label = track.label;

        // Fix paths if they are missing the playlists/ prefix
        if (src && !src.startsWith("http") && !src.startsWith("playlists/")) {
          src = "playlists/" + src;
        }
        if (cover && !cover.startsWith("http") && !cover.startsWith("playlists/")) {
          cover = "playlists/" + cover;
        }

        // Try to derive Artist - Song from folder name if folder exists
        if (src.includes("songs/")) {
          const parts = src.split("/");
          const folderName = parts[parts.length - 2];
          if (folderName && folderName.includes(" - ")) {
            label = folderName;
          }
        }

        return {
          label: label,
          src: src,
          cover: cover,
          duration: track.duration || "",
          type: track.type || (track.soundcloudUrl ? "soundcloud" : (track.youtubeId || track.youtubeUrl ? "youtube" : "audio")),
          soundcloudUrl: track.soundcloudUrl || "",
          youtubeId: track.youtubeId || getYouTubeVideoId(track.youtubeUrl || ""),
          youtubeUrl: track.youtubeUrl || ""
        };
      }).sort(compareMusicTracksByLabel);
      populateMusicTracks();
    }
  } catch (error) {
    console.error("Failed to load music manifest:", error);
    populateMusicTracks();
  }
}
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
      "Status: Playable on itch.io",
    ],
    actions: [
      { label: "Play on itch.io", href: "https://pandabeo04.itch.io/thrifting-101" },
      {
        label: "Download Game",
        href: "https://github.com/pandabeo/WebPortfolioPlayFuture/releases/download/game-downloads/ThriftingShopWin.zip",
        download: "thrifting-101.zip",
      },
    ],
    trailer: {
      src: "assets/game-trailers/thrifting-101-trailer.mp4",
      title: "Thrifting 101 trailer",
    },
    player: {
      src: "https://html-classic.itch.zone/html/15508562/ThriftingShopWebGL/index.html",
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
    shortDescription: "Character-led Unity adventure presented as a browser-playable story project.",
    overview: "Browser-playable Unity adventure structured around character presentation, scene progression, and a compact story-first play session.",
    meta: [
      "Role: Game designer and developer",
      "Format: Unity WebGL",
      "Status: Playable on itch.io",
    ],
    actions: [
      { label: "Play on itch.io", href: "https://pandabeo04.itch.io/tales-of-a-playboy" },
      {
        label: "Download Game",
        href: "https://github.com/pandabeo/WebPortfolioPlayFuture/releases/download/game-downloads/TalesOfAPlayboyWebGL.zip",
        download: "tales-of-a-playboy.zip",
      },
    ],
    trailer: {
      src: "assets/game-trailers/tales-of-a-playboy-trailer.mp4",
      title: "Tales Of A Playboy trailer",
    },
    player: {
      src: "https://html-classic.itch.zone/html/14736783/TalesOfAPlayboyWebGL/index.html",
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
      "Status: Playable on itch.io",
    ],
    actions: [
      { label: "Play on itch.io", href: "https://pandabeo04.itch.io/ame-no-naka" },
      {
        label: "Download Game",
        href: "https://github.com/pandabeo/WebPortfolioPlayFuture/releases/download/game-downloads/Ame.no.Naka.Win.zip",
        download: "ame-no-naka.zip",
      },
    ],
    trailer: {
      src: "assets/game-trailers/ame-no-naka-trailer.mp4",
      title: "Ame no Naka trailer",
    },
    player: {
      src: "https://html-classic.itch.zone/html/10798705/Web/Amen%20no%20Naka%20Mac/index.html",
      title: "Ame no Naka",
    },
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
    shortDescription: "Action-adventure prototype built around exploration, combat pacing, and boss encounters.",
    overview: "Dungeon-style action adventure focused on traversal, encounter pacing, and a clear build path from prototype combat to playable release.",
    meta: [
      "Role: Game designer and developer",
      "Format: Browser release",
      "Status: Published on itch.io",
    ],
    actions: [
      {
        label: "Download Game",
        href: "https://github.com/pandabeo/WebPortfolioPlayFuture/releases/download/game-downloads/Bui.Truong.Thinh_S3975580_Ass1_Homeward_Unity.Build.Project.zip",
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
      "Status: Playable on itch.io",
    ],
    actions: [
      { label: "Play on itch.io", href: "https://pandabeo04.itch.io/coy-commute" },
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
      src: "https://html-classic.itch.zone/html/15019683/CoyCommuteWebGLVer1.0/index.html",
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
    shortDescription: "Browser adventure using color, mood, and visual contrast to shape the emotional tone.",
    overview: "Emotion-led browser adventure where color, contrast, and environmental tone carry the mood of the interaction.",
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
    shortDescription: "Point-and-click puzzle story about social imbalance, hidden truths, and branching outcomes.",
    overview: "Pixel-art point-and-click puzzle project about inequality, social imbalance, and choices that affect the ending of the story.",
    meta: [
      "Role: Solo developer",
      "Format: Point-and-click / browser release",
      "Status: Playable on itch.io",
    ],
    actions: [
      { label: "Play on itch.io", href: "https://pandabeo04.itch.io/equilibrium" },
      {
        label: "Download Game",
        href: "https://github.com/pandabeo/WebPortfolioPlayFuture/releases/download/game-downloads/equilibrium.zip",
        download: "equilibrium.zip",
      },
    ],
    player: {
      src: "https://html-classic.itch.zone/html/14234523/index.html",
      title: "Equilibrium",
    },
    devlog: [],
  },
  "d-fishy-finals": {
    title: "D' Fishy Finals",
    routeSlug: "fishy",
    cover: "assets/game-covers/d-fishy-finals.jpg",
    shortDescription: "Narrative adventure about teenage intrusive thoughts, school pressure, and inner conflict.",
    overview: "Collaborative narrative adventure that frames exam pressure and intrusive thoughts through a short browser-playable experience.",
    meta: [
      "Role: Collaborator",
      "Format: Browser release",
      "Status: Hosted on collaborator account",
    ],
    actions: [
      {
        label: "Download Game",
        href: "https://github.com/pandabeo/WebPortfolioPlayFuture/releases/download/game-downloads/D.Fishy.Final.zip",
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
    shortDescription: "Third-person blockout prototype focused on action readability and level structure.",
    overview: "RMIT GDS4 blockout prototype focused on readable third-person action, encounter layout, and early level structure.",
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
    shortDescription: "Short cozy jam adventure about quiet exploration before the blue hour arrives.",
    overview: "Small-scope cozy jam game built around a compact adventure loop, gentle pacing, and downloadable release access.",
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
    shortDescription: "Tet-themed 3D survival-simulation project built around festive chaos and resource pressure.",
    overview: "Collaborative 3D survival-simulation release that turns Tet preparation into a playful resource and event-management challenge.",
    meta: [
      "Role: Collaborator",
      "Format: Downloadable build",
      "Status: Published on itch.io",
    ],
    actions: [
      {
        label: "Download Game",
        href: "https://github.com/pandabeo/WebPortfolioPlayFuture/releases/download/game-downloads/ChaoTet.FixUI.zip",
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
    shortDescription: "Procedural dungeon prototype with generated layouts, combat encounters, and build releases.",
    overview: "Procedural dungeon experiment focused on generated spaces, repeatable encounters, and a downloadable action prototype loop.",
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
    shortDescription: "Personal high-school narrative game about mistakes, uncertainty, and choosing game design.",
    overview: "Personal narrative game about high school, uncertainty about the future, mistakes along the way, and discovering game design as a passion.",
    meta: [
      "Role: Game designer and developer",
      "Format: HTML5 and Windows build",
      "Status: Playable on itch.io",
    ],
    actions: [
      { label: "Play on itch.io", href: "https://pandabeo04.itch.io/a-game-about-me" },
      {
        label: "Download Game",
        href: "https://github.com/pandabeo/WebPortfolioPlayFuture/releases/download/game-downloads/A.game.about.me.V2.zip",
        download: "a-game-about-me.zip",
      },
    ],
    trailer: {
      src: "assets/game-trailers/a-game-about-me-trailer.mp4",
      title: "A Game About Me trailer",
    },
    player: {
      src: "https://html-classic.itch.zone/html/12053420/A%20game%20about%20me%20WebGL%20V2/index.html",
      title: "A Game About Me",
    },
    devlog: [],
  },
};

const gameCollectionOrder = ["thrifting-101", "coy-commute", "ame-no-naka", "d-fishy-finals"];

const gameFilterTags = {
  "thrifting-101": ["playable", "unity", "2d", "downloadable"],
  "tales-of-a-playboy": ["playable", "unity", "narrative", "downloadable"],
  "ame-no-naka": ["playable", "unity", "2d", "narrative", "downloadable"],
  homeward: ["downloadable", "unity", "2d"],
  "coy-commute": ["playable", "unity", "2d", "downloadable"],
  "my-color-is-not-colorfull": ["narrative"],
  equilibrium: ["playable", "narrative", "downloadable"],
  "d-fishy-finals": ["downloadable", "narrative"],
  blocknout: ["3d"],
  "hours-before-blue": ["downloadable", "narrative"],
  chaotet: ["downloadable", "3d", "unity"],
  "into-the-dungeon": ["downloadable", "unity"],
  "a-game-about-me": ["playable", "narrative", "downloadable"],
};

const gameFilterSearchEntries = [
  {
    filter: "playable",
    label: "Playable Games",
    aliases: "play browser web webgl embedded playable game games",
  },
  {
    filter: "unity",
    label: "Unity Games",
    aliases: "unity csharp c# engine game games",
  },
  {
    filter: "2d",
    label: "2D Games",
    aliases: "2d 2 d two dimensional platformer pixel side scroller game games",
  },
  {
    filter: "3d",
    label: "3D Games",
    aliases: "3d 3 d three dimensional blockout dungeon survival game games",
  },
  {
    filter: "narrative",
    label: "Narrative Games",
    aliases: "narrative story dialogue choice emotional personal game games",
  },
  {
    filter: "downloadable",
    label: "Downloadable Games",
    aliases: "download downloadable windows build zip release game games",
  },
];

const gameCaseStudies = {
  "thrifting-101": {
    problem: "The core challenge was making fashion interpretation feel like reading a person, not solving a shopping checklist. Customer requests needed enough ambiguity to be funny and replayable, while the scoring system still had to be understandable so players could improve after each attempt.",
    role: "I designed and implemented the full request-response loop: customer prompts, outfit item data, scoring rules, submission flow, result feedback, and the Unity UI behavior that connects each step. I also handled the WebGL build and release presentation so the project could be played directly from itch.io.",
    tools: "Unity 2D, C#, ScriptableObjects, Unity Canvas, modular data classes, event-driven UI logic, WebGL build pipeline, itch.io hosting, and GitHub release packaging.",
    built: "I built a data-driven outfit system with reusable item definitions, customer request profiles, weighted evaluation rules, feedback states, dialogue variations, and interface states for browsing, choosing, submitting, and reading results. The system supports outcomes that are more nuanced than pass or fail.",
    systems: "Weighted preference matching, ScriptableObject-driven outfit data, customer constraint parsing, score-to-feedback mapping, result dialogue selection, reusable UI state updates, and a compact browser delivery flow.",
    decisions: "I kept the scoring readable through layered feedback instead of exposing the full formula. Customer reactions explain whether the outfit matched the request, but the next prompt still preserves enough uncertainty to make interpretation part of the play loop.",
    result: "The project became a fast, shareable browser game with strong evidence of systems design. Its performance on itch.io, including high views and likes, also showed that the concept was easy to understand and engaging enough for players to pass around.",
  },
  "coy-commute": {
    problem: "The design problem was communicating emotional pressure through interaction instead of explanation. The player needed to feel state changes in movement, timing, and world response, while still understanding enough to make decisions during a short play session.",
    role: "I built and tuned the state-driven gameplay loop, including emotional state transitions, control response, interaction timing, feedback behavior, and the Unity implementation that linked player input to world reaction.",
    tools: "Unity 2D, C#, ScriptableObjects, modular state-machine logic, animation tuning, audio and visual feedback hooks, playtest iteration, and WebGL release tooling.",
    built: "I built the emotional-state system, movement-response changes, environmental reaction hooks, state feedback, transition timing, and the playable browser release. The implementation connected internal state changes to practical game feel rather than leaving emotion as only narrative text.",
    systems: "Emotion-state parameters, movement modifiers, interaction-speed changes, environmental triggers, adaptive ambience hooks, animation response, event-driven feedback, and data-driven tuning values.",
    decisions: "I made emotion legible through pacing and feel first. Friction, delay, responsiveness, animation, and environmental behavior communicate the player's state before UI or dialogue has to explain it.",
    result: "The final game was polished enough to win 1st Place and People's Choice at Gameloft GameDev Mentorship 2025, and it remains one of the strongest examples in the portfolio of combining system design with emotional game feel.",
  },
  "ame-no-naka": {
    problem: "The project had to balance a serious story with exploration, platforming, dialogue, and puzzle-solving. The risk was that narrative scenes could interrupt the player too often, while pure platforming could make the story feel disconnected.",
    role: "I programmed the core interaction flows and implemented reusable Unity Visual Scripting graphs for dialogue, triggers, puzzle states, scene transitions, and player-facing events across the project.",
    tools: "Unity, Unity Visual Scripting, 2D platforming workflows, scene trigger logic, reusable graph structures, dialogue-state logic, and iterative scene testing.",
    built: "I built modular interaction graphs, dialogue triggers, puzzle-state transitions, scene flow controls, and reusable event patterns that let story beats appear inside exploration rather than only between gameplay segments.",
    systems: "State graphs, trigger volumes, dialogue activation, puzzle state tracking, scene transition control, reusable graph nodes, and interaction gates tied to player progress.",
    decisions: "I used modular graph patterns so narrative beats could be placed, tested, and revised without rewriting the underlying interaction logic. This kept implementation flexible while the story pacing changed during production.",
    result: "The finished game became a complete story-driven platformer and a key learning project for building reusable gameplay logic. It also established a clearer production structure for later Unity projects.",
  },
  "tales-of-a-playboy": {
    problem: "The project needed to communicate a character-led adventure quickly, because players may only spend a short time sampling a browser game from a portfolio page. The presentation had to make the tone, playable access, and story focus clear before launch.",
    role: "I prepared the playable WebGL presentation, project metadata, trailer context, release actions, and portfolio routing. I also shaped the detail page so reviewers can understand the work before opening the embedded build.",
    tools: "Unity WebGL, itch.io embed hosting, trailer capture, portfolio routing, HTML media presentation, release links, and browser-playable deployment.",
    built: "I built the portfolio entry around direct play access, trailer preview, release actions, cover art, metadata, and supporting process sections. The goal was to reduce friction between discovering the project and trying the build.",
    systems: "Unity WebGL delivery, project-detail routing, trailer preview, itch.io embed integration, media loading, and reusable project action rendering.",
    decisions: "I grouped playable access, media, and design notes into one focused view. This keeps the page useful for both quick reviewers who want to launch immediately and deeper reviewers who want context first.",
    result: "The game now has a browser-ready project page with direct play access, trailer context, and clearer framing around its character-led adventure format.",
  },
  homeward: {
    problem: "Homeward needed to present an action-adventure prototype around exploration, combat pacing, and boss encounters even though the available release is primarily downloadable. The case study had to explain the design intent without relying on an embedded browser build.",
    role: "I designed and developed the prototype structure, prepared the release package, and positioned the project in the portfolio as a combat-and-exploration study rather than a simple download link.",
    tools: "Unity, downloadable build packaging, itch.io release hosting, GitHub release storage, level blockout workflows, encounter pacing, and action-adventure prototyping.",
    built: "I built a project entry that highlights traversal, encounter structure, boss-facing progression, release access, and the prototype's role in testing action readability. The portfolio view makes the downloadable build easier to understand before opening itch.io.",
    systems: "Exploration flow, encounter layout, boss pacing, downloadable release routing, project metadata, and external release actions.",
    decisions: "I framed the project around readable action structure instead of only listing it as a published build. That gives the viewer a clearer reason to inspect the prototype and understand what design problem it was exploring.",
    result: "Homeward now reads as an action-adventure prototype with a clear design focus, release path, and production purpose inside the portfolio.",
  },
  "my-color-is-not-colorfull": {
    problem: "The project uses color and contrast as emotional language, so the portfolio entry needed to explain mood and visual tone without over-describing the experience. The risk was making a quiet, atmospheric game sound too generic.",
    role: "I framed the project as an emotion-led browser adventure, organized the release access, and wrote the supporting case-study context around color, tone, and player interpretation.",
    tools: "Browser release workflow, itch.io hosting, visual mood direction, color-contrast design, portfolio metadata, and project-detail presentation.",
    built: "I built a compact project entry that explains the emotional use of color, gives direct access to the release page, and positions the game as a mood-focused narrative experiment.",
    systems: "Color-driven mood signaling, environmental tone, browser release access, project metadata, and reusable portfolio detail rendering.",
    decisions: "I kept the explanation focused on how color and contrast shape player feeling. That is more useful than describing the plot in detail, because the project depends on atmosphere and interpretation.",
    result: "The entry now communicates the game's emotional design intent more clearly and gives reviewers a stronger reason to open the release page.",
  },
  equilibrium: {
    problem: "The game combines point-and-click puzzle structure with a story about imbalance and hidden truths. The case study needed to explain both the interaction format and the social theme without making the entry feel like a plot summary.",
    role: "I positioned the work as a puzzle-story project, connected the playable browser build with download access, and shaped the supporting context around choice, progression, and branching outcomes.",
    tools: "Browser build, pixel-art presentation, itch.io release page, downloadable archive, point-and-click structure, and portfolio release-link handling.",
    built: "I built the portfolio entry with playable access, download action, cover presentation, social-imbalance framing, and concise detail sections that explain the design focus before launch.",
    systems: "Point-and-click interaction, puzzle progression, branching story outcomes, external release links, downloadable archive routing, and project-detail rendering.",
    decisions: "I focused the case study on inequality, puzzle flow, and choice-driven endings instead of generic narrative framing. This makes the entry more specific and helps the project stand apart from other story games.",
    result: "The project now communicates format, intent, access path, and theme more clearly, making it easier for viewers to understand why the puzzle structure matters.",
  },
  "d-fishy-finals": {
    problem: "D' Fishy Finals deals with school pressure, intrusive thoughts, and teenage anxiety, so the portfolio needed to present the game carefully without reducing it to only its subject matter. The entry also had to credit that it is hosted on a collaborator account.",
    role: "I contributed to the collaborative project presentation, release packaging, trailer context, and portfolio framing so the game can be understood as a narrative experience about pressure and inner conflict.",
    tools: "Narrative adventure workflows, trailer media, downloadable build packaging, collaborator itch.io hosting, GitHub release storage, and portfolio metadata.",
    built: "I built the portfolio entry with a trailer, downloadable release action, collaborator-hosted itch.io link, and case-study text that explains the emotional design goal and production context.",
    systems: "Narrative progression, emotional framing, trailer presentation, external hosting links, downloadable release routing, and detail-page media loading.",
    decisions: "I kept the framing centered on player experience: exam pressure, intrusive thought loops, and inner conflict. That makes the entry more respectful and clearer than presenting it as a generic student narrative game.",
    result: "The project page now gives the collaborative release a stronger identity, clearer access path, and more specific explanation of its narrative purpose.",
  },
  blocknout: {
    problem: "BlocknOut is a blockout prototype, so its value is not final visual polish but action readability, level structure, and early encounter pacing. The case study needed to make that prototype purpose obvious.",
    role: "I designed and developed the prototype presentation, organized the external release action, and framed the work around level readability and third-person action testing.",
    tools: "Unity, third-person prototype workflows, level blockout, encounter layout, itch.io release page, and portfolio detail metadata.",
    built: "I built a portfolio entry that explains the project as a readable action prototype with level structure, encounter layout, and a direct release path for viewers who want to inspect the build.",
    systems: "Third-person movement context, blockout layout, encounter pacing, action readability, external release linking, and project-detail rendering.",
    decisions: "I described the prototype as a design test rather than a finished visual showcase. This makes the roughness intentional and helps reviewers evaluate the correct part of the work.",
    result: "BlocknOut now reads as a purposeful action-design prototype focused on structure, readability, and iteration.",
  },
  "hours-before-blue": {
    problem: "This small jam project needed to communicate cozy pacing and compact scope without being overshadowed by larger projects. The case study had to make the limited scope feel intentional.",
    role: "I designed the portfolio framing, release access, and project description around a short, quiet adventure loop built for a constrained jam-style production cycle.",
    tools: "Jam production workflow, downloadable build packaging, itch.io release hosting, GitHub release storage, and compact portfolio presentation.",
    built: "I built a project entry with download access, itch.io link, cover presentation, and case-study text that explains the game's gentle pacing and small-scope adventure structure.",
    systems: "Compact adventure loop, cozy exploration pacing, downloadable release routing, external release links, and project metadata rendering.",
    decisions: "I framed the small scope as a design constraint: the game is meant to be short, focused, and readable rather than expanded with unnecessary systems.",
    result: "The entry now presents Hours Before Blue as a complete small-scope work with a clear mood, release path, and production context.",
  },
  chaotet: {
    problem: "ChaoTet! combines 3D survival-simulation structure with festive Tet chaos, so the portfolio entry needed to explain both the cultural theme and the resource-pressure loop. It also had to make a downloadable-only build feel easy to inspect.",
    role: "I contributed to the collaborative release framing, trailer presentation, download action, and case-study text that explains how the survival-simulation pressure supports the festive premise.",
    tools: "Unity 3D, survival-simulation design, trailer media, downloadable build packaging, itch.io release hosting, GitHub release storage, and portfolio media rendering.",
    built: "I built the portfolio entry with trailer support, downloadable release access, external itch.io link, cover media, and detailed context around festive chaos, resource management, and event pressure.",
    systems: "3D survival-simulation loop, resource pressure, event management, trailer loading, downloadable release routing, and external project actions.",
    decisions: "I described the game through the tension between celebration and management. That makes the premise clearer than listing mechanics alone and helps the Tet theme feel connected to the systems.",
    result: "The project now has a fuller case study that explains its collaborative context, playable access limitations, and design identity as a festive survival-simulation game.",
  },
  "into-the-dungeon": {
    problem: "The project explores procedural dungeon generation, but procedural work can sound abstract unless the portfolio explains what the generated spaces are meant to support. The entry needed to connect generation with repeatable play.",
    role: "I framed the project around generated layouts, combat encounters, downloadable release access, and the prototype value of testing repeatable dungeon structure.",
    tools: "Unity, procedural dungeon prototyping, encounter design, downloadable build packaging, itch.io release hosting, GitHub release storage, and trailer media.",
    built: "I built the portfolio entry with trailer support, downloadable build access, release links, and case-study language focused on generated spaces, replayable layouts, and action-prototype goals.",
    systems: "Procedural layout generation, repeatable encounter structure, action prototype loop, trailer presentation, downloadable release routing, and project-detail rendering.",
    decisions: "I focused the explanation on why generation matters: it supports replayable spaces and repeatable encounter testing, not just technical novelty.",
    result: "IntoTheDungeon now reads as a procedural action prototype with clearer technical intent, release access, and design purpose.",
  },
  "a-game-about-me": {
    problem: "The project is personal, so the portfolio had to explain the autobiographical focus without making the entry feel too private or unclear. It also needed to support both browser play and Windows download access.",
    role: "I structured the playable embed, downloadable build link, trailer media, release actions, and case-study framing around the game's high-school narrative and its connection to choosing game design.",
    tools: "HTML5/WebGL build, itch.io embed hosting, Windows release archive, trailer media, GitHub release storage, and portfolio project routing.",
    built: "I built a detail page that supports browser play, downloadable build access, trailer viewing, cover presentation, and personal narrative context without adding extra navigation steps.",
    systems: "HTML5 build presentation, embedded player loading, downloadable release path, trailer media loading, project routing, and reusable detail-page rendering.",
    decisions: "I kept the page centered on quick access first, then supporting context. Viewers can try the work immediately, but the case study still explains the personal theme behind the project.",
    result: "The entry now presents A Game About Me as both a playable personal narrative and a milestone project about uncertainty, mistakes, and finding a direction in game design.",
  },
};

const defaultGameCaseStudy = {
  problem: "The project needed a portfolio presentation that explains format, contribution, and access path without overwhelming the collection view or forcing viewers to leave the site before understanding the work.",
  role: "I prepared the project metadata, media, release links, and detail-page structure so the game can be evaluated quickly from the portfolio.",
  tools: "Unity, WebGL, itch.io, GitHub release hosting, trailer media, downloadable archives, and the portfolio window system.",
  built: "I built a reusable project detail view with release actions, media sections, routing, cover presentation, and concise project context.",
  systems: "Project routing, trailer and still rendering, release actions, embedded players, downloadable links, and reusable game detail UI.",
  decisions: "I kept the detail page consistent across playable and downloadable projects so each entry remains comparable while still allowing project-specific context.",
  result: "The project page explains format, contribution, and access path more clearly, giving reviewers enough context before they decide to play, download, or open the external release.",
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
let gameDetailTrailerObserver = null;
let gameDetailTrailerLoadObserver = null;
let musicPausedForTrailerAudio = false;
let youtubeMusicPlayer = null;
let youtubeMusicReadyPromise = null;
let resolveYoutubeMusicReady = null;
let isYoutubeMusicPlaying = false;
let soundcloudWidget = null;
let soundcloudWidgetReadyPromise = null;
let isSoundCloudMusicPlaying = false;
let pointerX = 0;
let pointerY = 0;
let isMuted = false;
let buttonClickAudio = null;
let taskbarOrderSeed = 0;
let selectedMusicTrack = null;
const mediaVolumeMemory = new WeakMap();

const desktopModeQuery = window.matchMedia("(min-width: 981px)");
const finePointerQuery = window.matchMedia("(pointer: fine)");
const PANEL_GAP = 18;
const PANEL_SEARCH_STEP = 18;
const PANEL_POSITION_STORAGE_KEY = "webportfolio.panel-positions.v1";
const WALLPAPER_STORAGE_KEY = "webportfolio.wallpaper.v1";
const MEDIA_VOLUME_STORAGE_KEY = "webportfolio.media-volumes.v1";
const GAME_TRAILER_AUDIO_SESSION_KEY = "webportfolio.game-trailer-audio-enabled.session";
const TASKBAR_DRAG_THRESHOLD = 6;
const DEFAULT_DOCUMENT_TARGET = "doc-analysis";
const mediaVolumeBySource = loadStoredMediaVolumes();

let activeTaskbarDrag = null;

function forceVideoMuted(videoEl) {
  if (!videoEl) {
    return;
  }

  const rememberedVolume = getRememberedMediaVolume(videoEl);

  if (Number.isFinite(rememberedVolume)) {
    mediaVolumeMemory.set(videoEl, rememberedVolume);
  } else if (typeof videoEl.volume === "number" && videoEl.volume > 0) {
    storeMediaVolume(videoEl, videoEl.volume);
  }

  videoEl.dataset.suppressVolumeMemory = "true";
  videoEl.muted = true;
  videoEl.defaultMuted = true;
  videoEl.setAttribute("muted", "");
  window.setTimeout(() => {
    delete videoEl.dataset.suppressVolumeMemory;
  }, 0);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function loadStoredMediaVolumes() {
  try {
    const storedVolumes = JSON.parse(window.localStorage.getItem(MEDIA_VOLUME_STORAGE_KEY) || "{}");

    return new Map(
      Object.entries(storedVolumes).filter(([, volume]) => {
        return Number.isFinite(volume) && volume >= 0 && volume <= 1;
      })
    );
  } catch {
    return new Map();
  }
}

function persistStoredMediaVolumes() {
  try {
    window.localStorage.setItem(
      MEDIA_VOLUME_STORAGE_KEY,
      JSON.stringify(Object.fromEntries(mediaVolumeBySource))
    );
  } catch {
    // Storage can be unavailable in privacy modes; in-memory volume memory still works.
  }
}

function getMediaSourceKey(mediaEl) {
  if (!mediaEl) {
    return null;
  }

  const sourceEl = mediaEl.querySelector?.("source");
  const source = mediaEl.currentSrc || mediaEl.src || sourceEl?.src || sourceEl?.getAttribute("src") || "";

  if (!source) {
    return null;
  }

  try {
    return new URL(source, document.baseURI).href;
  } catch {
    return source;
  }
}

function storeMediaVolume(mediaEl, volume) {
  if (!mediaEl || !Number.isFinite(volume)) {
    return;
  }

  const nextVolume = clamp(volume, 0, 1);
  mediaVolumeMemory.set(mediaEl, nextVolume);

  const sourceKey = getMediaSourceKey(mediaEl);

  if (sourceKey) {
    mediaVolumeBySource.set(sourceKey, nextVolume);
    persistStoredMediaVolumes();
  }
}

function getRememberedMediaVolume(mediaEl) {
  if (!mediaEl) {
    return null;
  }

  const sourceKey = getMediaSourceKey(mediaEl);
  const sourceVolume = sourceKey ? mediaVolumeBySource.get(sourceKey) : undefined;

  if (Number.isFinite(sourceVolume)) {
    return sourceVolume;
  }

  if (mediaVolumeMemory.has(mediaEl)) {
    return mediaVolumeMemory.get(mediaEl);
  }

  return null;
}

function isGameTrailerAudioEnabledThisSession() {
  try {
    return window.sessionStorage.getItem(GAME_TRAILER_AUDIO_SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function setGameTrailerAudioEnabledThisSession(isEnabled) {
  try {
    if (isEnabled) {
      window.sessionStorage.setItem(GAME_TRAILER_AUDIO_SESSION_KEY, "true");
    } else {
      window.sessionStorage.removeItem(GAME_TRAILER_AUDIO_SESSION_KEY);
    }
  } catch {
    // Session storage can be unavailable; dataset state still works for this page.
  }
}

function canDragWindows() {
  return desktopModeQuery.matches && finePointerQuery.matches;
}

function isTouchLikePointer() {
  return !finePointerQuery.matches;
}

function getViewportKeyboardInset() {
  if (!window.visualViewport) {
    return 0;
  }

  return Math.max(0, window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop);
}

function syncViewportInsets() {
  document.documentElement.style.setProperty("--mobile-keyboard-inset", `${Math.round(getViewportKeyboardInset())}px`);
}

function isSearchZoomInput(inputEl) {
  return inputEl === startSearchInput || inputEl === musicSearchInput;
}

function blurSearchInputOnOutsidePointer(event) {
  const activeElement = document.activeElement;

  if (!isSearchZoomInput(activeElement) || desktopModeQuery.matches) {
    return;
  }

  if (event.target === activeElement || activeElement.contains?.(event.target)) {
    return;
  }

  activeElement.blur();
  window.setTimeout(syncViewportInsets, 0);
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

function getVisibleWindows() {
  return Array.from(draggableWindows).filter((windowEl) => {
    return !windowEl.classList.contains("is-hidden") && !windowEl.classList.contains("is-closing") && windowEl.dataset.windowId;
  });
}

function normalizeMobileWindowLayout() {
  if (desktopModeQuery.matches) {
    return;
  }

  draggableWindows.forEach((windowEl) => {
    if (windowEl.classList.contains("is-fullscreen")) {
      return;
    }

    windowEl.style.position = "";
    windowEl.style.left = "";
    windowEl.style.top = "";
    windowEl.style.right = "";
    windowEl.style.bottom = "";
    windowEl.style.margin = "";
    windowEl.style.transform = "";
    delete windowEl.dataset.dragReady;
  });
}

function syncMobileActiveWindow() {
  if (desktopModeQuery.matches) {
    return;
  }

  const topWindow = getTopVisibleWindow();

  draggableWindows.forEach((windowEl) => {
    windowEl.classList.toggle("is-active", windowEl === topWindow);
  });
}

function syncResponsiveWindowLayout() {
  normalizeMobileWindowLayout();
  syncMobileActiveWindow();
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
      const cursorTransform = `translate3d(${pointerX - CURSOR_OFFSET_X}px, ${pointerY - CURSOR_OFFSET_Y}px, 0)`;
      cursorDot.style.transform = cursorTransform;
      cursorRing.style.transform = cursorTransform;
      cursorIdle.style.transform = cursorTransform;
    }

    const offsetX = ((pointerX / window.innerWidth) - 0.5) * 18;
    const offsetY = ((pointerY / window.innerHeight) - 0.5) * 18;
    document.documentElement.style.setProperty("--parallax-x", `${offsetX}px`);
    document.documentElement.style.setProperty("--parallax-y", `${offsetY}px`);
  };

  window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    syncCursorPosition();

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
      zIndex: windowEl.style.zIndex,
      dragReady: windowEl.dataset.dragReady || "",
    };

    windowEl.dataset.preFullscreenState = JSON.stringify(snapshot);
    windowEl.classList.add("is-fullscreen");
    windowEl.style.position = "fixed";
    windowEl.style.left = "8px";
    windowEl.style.top = FULLSCREEN_WINDOW_TOP_OFFSET;
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
  windowEl.style.zIndex = snapshot?.zIndex || "";

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
  if (!catMediaGrid || catMediaRendered) {
    return;
  }

  catMediaRendered = true;
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

    if (videoEl.dataset.gameDetailTrailer !== undefined) {
      prepareGameDetailTrailerAutoplay(videoEl);
      syncGameDetailTrailerPlayback();
      return;
    }

    if (videoEl.hasAttribute("controls") && !videoEl.autoplay && !videoEl.hasAttribute("autoplay")) {
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
      if (!isMediaInActiveWindow(videoEl) || !isMediaVisibleInPanel(videoEl)) {
        videoEl.pause();
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

function prepareGameDetailTrailerAutoplay(videoEl = gameDetailTrailer) {
  if (!videoEl) {
    return;
  }

  bindNativeFullscreenResume(videoEl);

  if (isGameTrailerAudioEnabledThisSession()) {
    videoEl.dataset.userAudioEnabled = "true";
  }

  videoEl.autoplay = true;
  videoEl.playsInline = true;
  videoEl.preload = "auto";
  videoEl.setAttribute("autoplay", "");
  videoEl.setAttribute("playsinline", "");

  const rememberedVolume = getRememberedMediaVolume(videoEl);

  if (Number.isFinite(rememberedVolume)) {
    videoEl.volume = clamp(rememberedVolume, 0, 1);
  }

  if (videoEl.dataset.userAudioEnabled !== "true") {
    forceVideoMuted(videoEl);
    return;
  }

  if (!isMuted) {
    videoEl.muted = false;
    videoEl.defaultMuted = false;
    videoEl.removeAttribute("muted");
  }
}

function setGameDetailTrailerState(state, message = "") {
  if (!gameDetailTrailerSection) {
    return;
  }

  if (state) {
    gameDetailTrailerSection.dataset.trailerState = state;
  } else {
    delete gameDetailTrailerSection.dataset.trailerState;
  }

  if (gameDetailTrailerStatus) {
    gameDetailTrailerStatus.textContent = message;
  }
}

function getGameDetailTrailerSrc() {
  return gameDetailTrailer?.dataset.trailerSrc || "";
}

function isGameDetailTrailerLoaded() {
  if (!gameDetailTrailer) {
    return false;
  }

  const trailerSrc = getGameDetailTrailerSrc();

  if (!trailerSrc) {
    return false;
  }

  const loadedSrc = gameDetailTrailer.currentSrc || gameDetailTrailer.getAttribute("src") || "";

  if (!loadedSrc) {
    return false;
  }

  try {
    return new URL(loadedSrc, document.baseURI).href === new URL(trailerSrc, document.baseURI).href;
  } catch {
    return loadedSrc === trailerSrc;
  }
}

function loadGameDetailTrailerSource() {
  if (!gameDetailTrailer) {
    return false;
  }

  const trailerSrc = getGameDetailTrailerSrc();

  if (!trailerSrc) {
    return false;
  }

  if (!isGameDetailTrailerLoaded()) {
    setGameDetailTrailerState("loading", "Loading trailer");
    prepareGameDetailTrailerAutoplay(gameDetailTrailer);
    gameDetailTrailer.src = trailerSrc;
    gameDetailTrailer.load();
  }

  prepareGameDetailTrailerAutoplay(gameDetailTrailer);
  return true;
}

function isMediaNearViewportInPanel(mediaEl, margin = 260) {
  if (!mediaEl) {
    return false;
  }

  const mediaRect = mediaEl.getBoundingClientRect();

  if (mediaRect.width <= 0 || mediaRect.height <= 0) {
    return false;
  }

  const root = getMediaViewportRoot(mediaEl);
  const rootRect = root?.getBoundingClientRect() || {
    top: 0,
    bottom: window.innerHeight,
  };

  return mediaRect.bottom >= rootRect.top - margin && mediaRect.top <= rootRect.bottom + margin;
}

function syncGameDetailTrailerLoading() {
  if (!gameDetailTrailer || !gameDetailTrailerSection || gameDetailTrailerSection.classList.contains("is-hidden")) {
    return;
  }

  if (isMediaNearViewportInPanel(gameDetailTrailer)) {
    loadGameDetailTrailerSource();
  }
}

function pauseBackgroundMusicForTrailerAudio() {
  if (isMuted) {
    return;
  }

  if (musicAudio && !musicAudio.paused) {
    musicPausedForTrailerAudio = true;
    musicAudio.pause();
    updateMusicPlayLabel();
  }

  if (isYouTubeMusicTrack(currentlyPlayingTrack)) {
    pauseYouTubeMusic();
    musicPausedForTrailerAudio = true;
  }

  if (isSoundCloudMusicTrack(currentlyPlayingTrack)) {
    pauseSoundCloudMusic();
    musicPausedForTrailerAudio = true;
  }
}

function resumeBackgroundMusicAfterTrailerAudio() {
  if (!musicPausedForTrailerAudio || isMuted) {
    return;
  }

  musicPausedForTrailerAudio = false;

  if (musicAudio?.src && musicAudio.paused) {
    musicAudio.play().catch(() => {
      updateMusicPlayLabel();
    });
  } else if (isYouTubeMusicTrack(currentlyPlayingTrack)) {
    playYouTubeMusic();
  } else if (isSoundCloudMusicTrack(currentlyPlayingTrack)) {
    toggleSoundCloudMusic();
  }
}

function syncBackgroundMusicForTrailerAudio() {
  if (!gameDetailTrailer) {
    return;
  }

  const trailerHasAudio = gameDetailTrailer.dataset.userAudioEnabled === "true" && !gameDetailTrailer.muted && gameDetailTrailer.volume > 0;

  if (trailerHasAudio && !gameDetailTrailer.paused) {
    pauseBackgroundMusicForTrailerAudio();
    return;
  }

  if (!trailerHasAudio || gameDetailTrailer.paused || gameDetailTrailer.ended) {
    resumeBackgroundMusicAfterTrailerAudio();
  }
}

function syncGameDetailTrailerPlayback() {
  if (!gameDetailTrailer || !gameDetailTrailerSection || gameDetailTrailerSection.classList.contains("is-hidden")) {
    return;
  }

  syncGameDetailTrailerLoading();

  if (!isMediaInActiveWindow(gameDetailTrailer)) {
    gameDetailTrailer.pause();
    syncBackgroundMusicForTrailerAudio();
    return;
  }

  if (!loadGameDetailTrailerSource()) {
    return;
  }

  playGameDetailTrailer();
}

function playGameDetailTrailer() {
  if (!gameDetailTrailer) {
    return;
  }

  gameDetailTrailer.autoplay = true;
  gameDetailTrailer.playsInline = true;
  gameDetailTrailer.preload = "auto";
  gameDetailTrailer.setAttribute("autoplay", "");
  gameDetailTrailer.setAttribute("playsinline", "");

  if (gameDetailTrailer.paused) {
    forceVideoMuted(gameDetailTrailer);
  }

  gameDetailTrailer.play().then(() => {
    syncBackgroundMusicForTrailerAudio();
  }).catch(() => {
    forceVideoMuted(gameDetailTrailer);
    gameDetailTrailer.play().then(() => {
      syncBackgroundMusicForTrailerAudio();
    }).catch(() => {
      // Native controls remain available if the browser still blocks autoplay.
    });
  });
}

function requestGameDetailTrailerAutoplay({ restart = false } = {}) {
  if (!gameDetailTrailer || !gameDetailTrailerSection || gameDetailTrailerSection.classList.contains("is-hidden")) {
    return;
  }

  prepareGameDetailTrailerAutoplay(gameDetailTrailer);

  if (!loadGameDetailTrailerSource()) {
    return;
  }

  if (restart) {
    try {
      gameDetailTrailer.currentTime = 0;
    } catch {
      // The trailer may not be seekable until metadata is available.
    }
  }

  const startPlayback = () => {
    if (!isMediaInActiveWindow(gameDetailTrailer)) {
      return;
    }

    playGameDetailTrailer();
  };

  startPlayback();
  window.requestAnimationFrame(startPlayback);
  window.setTimeout(startPlayback, 120);
  window.setTimeout(startPlayback, 360);
}

function primeGameDetailTrailerFromGesture(gameId) {
  if (!gameId || !gameDetails[gameId] || !gameDetailWindow || !gameDetailTrailer || !gameDetailTrailerSection) {
    return;
  }

  const game = gameDetails[gameId];

  if (!game.trailer?.src) {
    return;
  }

  gameDetailWindow.dataset.gameId = gameId;
  gameDetailTrailerSection.classList.remove("is-hidden");
  gameDetailTrailer.dataset.trailerSrc = game.trailer.src;
  gameDetailTrailer.title = game.trailer.title || `${game.title} trailer`;
  gameDetailTrailer.autoplay = true;
  gameDetailTrailer.preload = "auto";
  gameDetailTrailer.playsInline = true;
  gameDetailTrailer.muted = true;
  gameDetailTrailer.defaultMuted = true;
  gameDetailTrailer.setAttribute("autoplay", "");
  gameDetailTrailer.setAttribute("muted", "");
  gameDetailTrailer.setAttribute("preload", "auto");
  gameDetailTrailer.setAttribute("playsinline", "");

  if (gameDetailTrailer.getAttribute("src") !== game.trailer.src) {
    gameDetailTrailer.src = game.trailer.src;
    gameDetailTrailer.load();
  }

  gameDetailTrailer.play().catch(() => {
    // The normal open flow retries after the detail window is visible.
  });
}

function setupGameDetailTrailerAutoplay() {
  if (!gameDetailTrailer) {
    return;
  }

  prepareGameDetailTrailerAutoplay(gameDetailTrailer);

  if (gameDetailTrailerObserver) {
    gameDetailTrailerObserver.disconnect();
  }

  if (gameDetailTrailerLoadObserver) {
    gameDetailTrailerLoadObserver.disconnect();
  }

  const trailerRoot = getMediaViewportRoot(gameDetailTrailer);

  gameDetailTrailerLoadObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === gameDetailTrailer && entry.isIntersecting) {
          loadGameDetailTrailerSource();
        }
      });
    },
    {
      root: trailerRoot,
      rootMargin: "260px 0px",
      threshold: 0.01,
    }
  );

  gameDetailTrailerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target !== gameDetailTrailer) {
          return;
        }

        if (entry.isIntersecting || isMediaInActiveWindow(gameDetailTrailer)) {
          syncGameDetailTrailerPlayback();
        } else if (!isMediaFullscreen(gameDetailTrailer)) {
          gameDetailTrailer.pause();
        }
      });
    },
    {
      root: trailerRoot,
      threshold: 0.45,
    }
  );

  gameDetailTrailerLoadObserver.observe(gameDetailTrailer);
  gameDetailTrailerObserver.observe(gameDetailTrailer);

  if (gameDetailTrailer.dataset.detailTrailerBound === "true") {
    return;
  }

  gameDetailTrailer.addEventListener("loadstart", () => {
    if (getGameDetailTrailerSrc()) {
      setGameDetailTrailerState("loading", "Loading trailer");
    }
  });

  gameDetailTrailer.addEventListener("loadedmetadata", () => {
    requestGameDetailTrailerAutoplay();
  });

  gameDetailTrailer.addEventListener("loadeddata", () => {
    setGameDetailTrailerState("", "");
    requestGameDetailTrailerAutoplay();
  });

  gameDetailTrailer.addEventListener("canplay", () => {
    setGameDetailTrailerState("", "");
    requestGameDetailTrailerAutoplay();
  });

  gameDetailTrailer.addEventListener("error", () => {
    setGameDetailTrailerState("error", "Trailer could not be loaded.");
    syncBackgroundMusicForTrailerAudio();
  });

  gameDetailTrailer.addEventListener("play", syncBackgroundMusicForTrailerAudio);
  gameDetailTrailer.addEventListener("pause", syncBackgroundMusicForTrailerAudio);
  gameDetailTrailer.addEventListener("ended", syncBackgroundMusicForTrailerAudio);

  gameDetailTrailer.addEventListener("volumechange", () => {
    if (!gameDetailTrailer.muted && gameDetailTrailer.volume > 0) {
      gameDetailTrailer.dataset.userAudioEnabled = "true";
      setGameTrailerAudioEnabledThisSession(true);
    }

    syncBackgroundMusicForTrailerAudio();
  });

  const trailerRootScrollTarget = getMediaViewportRoot(gameDetailTrailer);
  if (trailerRootScrollTarget && trailerRootScrollTarget.dataset.trailerScrollBound !== "true") {
    let trailerScrollFrame = 0;
    trailerRootScrollTarget.addEventListener("scroll", () => {
      if (trailerScrollFrame) {
        return;
      }

      trailerScrollFrame = window.requestAnimationFrame(() => {
        trailerScrollFrame = 0;
        syncGameDetailTrailerLoading();
        syncGameDetailTrailerPlayback();
      });
    }, { passive: true });
    trailerRootScrollTarget.dataset.trailerScrollBound = "true";
  }

  gameDetailTrailer.dataset.detailTrailerBound = "true";
}

function setupHoverTrailerPreviews() {
  hoverTrailerCards.forEach((card) => {
    const videoEl = card.querySelector("video[data-hover-preview='true']");
    const previewImage = card.querySelector("img");

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

    const deactivateTrailerSound = () => {
      delete videoEl.dataset.trailerSoundActive;
      forceVideoMuted(videoEl);
    };

    const startPreview = () => {
      deactivateTrailerSound();
      videoEl.loop = true;
      videoEl.playsInline = true;
      videoEl.setAttribute("loop", "");
      videoEl.setAttribute("playsinline", "");
      videoEl.preload = "metadata";

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
        forceVideoMuted(videoEl);
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

  const rememberedVolume = getRememberedMediaVolume(mediaEl);
  const fallbackVolume = typeof mediaEl.volume === "number" ? mediaEl.volume : 1;
  mediaVolumeMemory.set(mediaEl, Number.isFinite(rememberedVolume) ? rememberedVolume : fallbackVolume);
}

function enforceMediaMuteState(mediaEl) {
  if (!mediaEl) {
    return;
  }

  rememberMediaVolume(mediaEl);

  if (mediaEl.dataset.gameDetailTrailer !== undefined && mediaEl.dataset.userAudioEnabled !== "true") {
    forceVideoMuted(mediaEl);
    return;
  }

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
  const fallbackVolume = getRememberedMediaVolume(mediaEl) ?? 1;
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
    if (mediaEl.dataset.suppressVolumeMemory === "true") {
      return;
    }

    if (isMuted) {
      if (!mediaEl.muted || mediaEl.volume !== 0) {
        mediaEl.volume = 0;
        mediaEl.muted = true;
        mediaEl.defaultMuted = true;
      }
      return;
    }

    if (mediaEl.dataset.hoverPreview === "true") {
      return;
    }

    if (mediaEl.dataset.gameDetailTrailer !== undefined) {
      if (!mediaEl.muted && mediaEl.volume > 0) {
        mediaEl.dataset.userAudioEnabled = "true";
      }
      if (typeof mediaEl.volume === "number") {
        storeMediaVolume(mediaEl, mediaEl.volume);
      }
      return;
    }

    if (mediaEl.tagName === "VIDEO" && (!mediaEl.muted || mediaEl.volume > 0)) {
      mediaEl.dataset.userAudioEnabled = "true";
    }

    if (typeof mediaEl.volume === "number") {
      storeMediaVolume(mediaEl, mediaEl.volume);
    }

    if (!mediaEl.muted && mediaEl.volume > 0) {
      if (mediaEl.tagName === "VIDEO") {
        mediaEl.dataset.userAudioEnabled = "true";
      }
    }
  });

  mediaEl.dataset.muteBound = "true";
}

function getMediaWindow(mediaEl) {
  return mediaEl?.closest(".window") || null;
}

function isMediaFullscreen(mediaEl) {
  if (!mediaEl) {
    return false;
  }

  const fullscreenEl = document.fullscreenElement;
  return Boolean(
    mediaEl.dataset.nativeFullscreenRequested === "true" ||
      fullscreenEl === mediaEl ||
      fullscreenEl?.contains?.(mediaEl)
  );
}

function armNativeFullscreenAutoResume(videoEl) {
  if (!videoEl) {
    return;
  }

  videoEl.dataset.nativeFullscreenAutoResume = "true";
  window.clearTimeout(nativeFullscreenAutoResumeTimers.get(videoEl));

  const timer = window.setTimeout(() => {
    delete videoEl.dataset.nativeFullscreenAutoResume;
    nativeFullscreenAutoResumeTimers.delete(videoEl);
  }, NATIVE_FULLSCREEN_AUTO_RESUME_MS);

  nativeFullscreenAutoResumeTimers.set(videoEl, timer);
}

function resumeNativeFullscreenVideo(videoEl) {
  if (
    !videoEl ||
    videoEl.dataset.nativeFullscreenRequested !== "true" ||
    videoEl.dataset.nativeFullscreenAutoResume !== "true"
  ) {
    return;
  }

  [0, 120, 360].forEach((delay) => {
    window.setTimeout(() => {
      if (
        videoEl.dataset.nativeFullscreenRequested !== "true" ||
        videoEl.dataset.nativeFullscreenAutoResume !== "true" ||
        !videoEl.paused
      ) {
        return;
      }

      videoEl.play().catch(() => {
        // Native controls remain available if the browser blocks the resume.
      });
    }, delay);
  });
}

function bindNativeFullscreenResume(videoEl) {
  if (!videoEl || videoEl.dataset.nativeFullscreenResumeBound === "true") {
    return;
  }

  videoEl.addEventListener("pause", () => {
    if (isMediaFullscreen(videoEl)) {
      resumeNativeFullscreenVideo(videoEl);
    }
  });

  videoEl.addEventListener("webkitbeginfullscreen", () => {
    videoEl.dataset.nativeFullscreenRequested = "true";
    armNativeFullscreenAutoResume(videoEl);
    resumeNativeFullscreenVideo(videoEl);
  });

  videoEl.addEventListener("webkitendfullscreen", () => {
    delete videoEl.dataset.nativeFullscreenRequested;
    delete videoEl.dataset.nativeFullscreenAutoResume;
    window.clearTimeout(nativeFullscreenAutoResumeTimers.get(videoEl));
    nativeFullscreenAutoResumeTimers.delete(videoEl);
    requestMediaVisibilitySync();
  });

  videoEl.dataset.nativeFullscreenResumeBound = "true";
}

function getFullscreenVideoElement() {
  const fullscreenEl = document.fullscreenElement;

  if (!fullscreenEl) {
    return null;
  }

  if (fullscreenEl.tagName === "VIDEO") {
    return fullscreenEl;
  }

  return fullscreenEl.querySelector?.("video") || null;
}

function isMediaInActiveWindow(mediaEl) {
  if (mediaEl === musicAudio) {
    return true;
  }

  if (isMediaFullscreen(mediaEl)) {
    return true;
  }

  const windowEl = getMediaWindow(mediaEl);

  if (!windowEl) {
    return false;
  }

  return windowEl === getTopVisibleWindow();
}

function getMediaViewportRoot(mediaEl) {
  return mediaEl?.closest(".xp-window-body") || mediaEl?.closest(".collection-body") || null;
}

function isMediaVisibleInPanel(mediaEl) {
  if (!mediaEl) {
    return false;
  }

  if (isMediaFullscreen(mediaEl)) {
    return true;
  }

  const mediaRect = mediaEl.getBoundingClientRect();

  if (mediaRect.width <= 0 || mediaRect.height <= 0) {
    return false;
  }

  const root = getMediaViewportRoot(mediaEl);
  const rootRect = root?.getBoundingClientRect() || {
    top: 0,
    left: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
  };

  const visibleLeft = Math.max(mediaRect.left, rootRect.left, 0);
  const visibleTop = Math.max(mediaRect.top, rootRect.top, 0);
  const visibleRight = Math.min(mediaRect.right, rootRect.right, window.innerWidth);
  const visibleBottom = Math.min(mediaRect.bottom, rootRect.bottom, window.innerHeight);
  const visibleWidth = Math.max(0, visibleRight - visibleLeft);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);
  const visibleRatio = (visibleWidth * visibleHeight) / (mediaRect.width * mediaRect.height);

  return visibleRatio >= 0.35;
}

function isElementVisibleInPanel(elementEl) {
  if (!elementEl) {
    return false;
  }

  const elementRect = elementEl.getBoundingClientRect();

  if (elementRect.width <= 0 || elementRect.height <= 0) {
    return false;
  }

  const root = elementEl.closest(".xp-window-body") || elementEl.closest(".collection-body") || null;
  const rootRect = root?.getBoundingClientRect() || {
    top: 0,
    left: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
  };

  const visibleLeft = Math.max(elementRect.left, rootRect.left, 0);
  const visibleTop = Math.max(elementRect.top, rootRect.top, 0);
  const visibleRight = Math.min(elementRect.right, rootRect.right, window.innerWidth);
  const visibleBottom = Math.min(elementRect.bottom, rootRect.bottom, window.innerHeight);
  const visibleWidth = Math.max(0, visibleRight - visibleLeft);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);
  const visibleRatio = (visibleWidth * visibleHeight) / (elementRect.width * elementRect.height);

  return visibleRatio >= 0.35;
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

function stopWindowGameFrames(windowEl) {
  if (!windowEl) {
    return;
  }

  windowEl.querySelectorAll("iframe.game-player-frame").forEach((frameEl) => {
    delete frameEl.dataset.frameSuspended;
    delete frameEl.dataset.gameAudioState;
    delete frameEl.dataset.playerActivated;
    frameEl.src = "about:blank";
  });
}

function syncEmbeddedFrameAudioState() {
  const topWindow = getTopVisibleWindow();

  document.querySelectorAll("iframe.game-player-frame").forEach((frameEl) => {
    const frameWindow = frameEl.closest(".window");
    const frameShouldRun = frameWindow === topWindow && isElementVisibleInPanel(frameEl);
    const isActivated = frameEl.dataset.playerActivated === "true";
    const frameSrc = frameEl.dataset.playerSrc || frameEl.getAttribute("src") || "";

    if (!frameShouldRun) {
      if (frameSrc && frameEl.getAttribute("src") !== "about:blank") {
        frameEl.dataset.playerSrc = frameSrc;
        frameEl.dataset.frameSuspended = "true";
        delete frameEl.dataset.gameAudioState;
        frameEl.src = "about:blank";
        if (frameEl === gameDetailFrame && isActivated) {
          setGamePlayerOverlay({
            state: "paused",
            title: "Game paused",
            note: "The build was unloaded while off-screen so audio cannot keep playing.",
            buttonText: "Resume",
            showButton: false,
          });
        }
      }
      return;
    }

    if (!isActivated) {
      return;
    }

    if (frameEl.dataset.frameSuspended === "true" && frameEl.dataset.playerSrc) {
      delete frameEl.dataset.frameSuspended;
      delete frameEl.dataset.gameAudioState;
      if (frameEl === gameDetailFrame) {
        setGamePlayerOverlay({
          state: "loading",
          title: "Reloading game",
          note: "The game is restoring after being paused off-screen.",
          buttonText: "Reload",
          showButton: false,
        });
      }
      frameEl.src = frameEl.dataset.playerSrc;
      return;
    }

    const audioEnabled = !isMuted;
    const audioState = audioEnabled ? "enabled" : "disabled";

    if (!frameEl.contentWindow) {
      return;
    }

    if (frameEl.dataset.gameAudioState === audioState) {
      return;
    }

    frameEl.dataset.gameAudioState = audioState;

    try {
      frameEl.contentWindow.setGameAudioEnabled?.(audioEnabled);
      frameEl.contentWindow.postMessage({ type: "portfolio-game-audio", enabled: audioEnabled }, "*");
    } catch {
      // Cross-document access can fail while an iframe is navigating.
    }
  });
}

function bindGameFrameAudioSync(root = document) {
  root.querySelectorAll("iframe.game-player-frame").forEach((frameEl) => {
    if (frameEl.dataset.audioSyncBound === "true") {
      return;
    }

    frameEl.addEventListener("load", () => {
      delete frameEl.dataset.gameAudioState;
      if (
        frameEl === gameDetailFrame &&
        frameEl.dataset.playerActivated === "true" &&
        frameEl.getAttribute("src") !== "about:blank"
      ) {
        setGamePlayerOverlay({ state: "playing" });
      }
      syncEmbeddedFrameAudioState();
    });

    frameEl.dataset.audioSyncBound = "true";
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

    if (videoEl.dataset.gameDetailTrailer === undefined && !isMediaVisibleInPanel(videoEl)) {
      videoEl.pause();
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

    if (!isMediaInActiveWindow(mediaEl) || isMuted || (mediaEl.dataset.gameDetailTrailer === undefined && !isMediaVisibleInPanel(mediaEl))) {
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
  syncYouTubeMusicMutedState();
  if (isMuted && isSoundCloudMusicTrack(currentlyPlayingTrack)) {
    pauseSoundCloudMusic();
  }

  document.querySelectorAll("audio, video").forEach((mediaEl) => {
    if (!isMediaInActiveWindow(mediaEl)) {
      pauseAndMuteMedia(mediaEl);
      return;
    }

    if (mediaEl.dataset.hoverPreview === "true") {
      forceVideoMuted(mediaEl);
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

function updateMusicPlayLabel() {
  if (!musicPlayToggle) {
    return;
  }

  const isPlaying = isSoundCloudMusicTrack(currentlyPlayingTrack)
    ? isSoundCloudMusicPlaying
    : isYouTubeMusicTrack(currentlyPlayingTrack)
      ? isYoutubeMusicPlaying
      : Boolean(musicAudio && !musicAudio.paused && !musicAudio.ended);
  musicPlayToggle.textContent = isPlaying ? "Pause" : "Play";
  musicPlayToggle.setAttribute("aria-label", isPlaying ? "Pause music" : "Play music");
  musicPanel?.classList.toggle("is-playing", isPlaying);
}

function updateMusicTrackTitle(label = "") {
  if (!musicTrackTitle) {
    return;
  }

  const title = label || "No track selected";
  musicTrackTitle.textContent = title;
  musicTrackTitle.dataset.title = title;
}

function updateMusicDurationDisplay(duration) {
  const durationInfo = document.getElementById("music-info-duration");
  const nextDuration = duration || "-";

  if (durationInfo) {
    durationInfo.textContent = nextDuration;
  }
}

function compareMusicTracksByLabel(a, b) {
  return (a.label || "").localeCompare(b.label || "", undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function getPlayableMusicTracks() {
  return MUSIC_TRACKS.filter((track) => isSoundCloudMusicTrack(track) && track.label);
}

function getTrackSoundCloudUrl(track) {
  return track?.soundcloudUrl || "";
}

function isSoundCloudMusicTrack(track) {
  return Boolean(track && (track.type === "soundcloud" || getTrackSoundCloudUrl(track)));
}

function getSoundCloudEmbedUrl(track) {
  const soundcloudUrl = getTrackSoundCloudUrl(track);
  if (!soundcloudUrl) {
    return "";
  }

  const params = new URLSearchParams({
    url: soundcloudUrl,
    color: "#ff5500",
    auto_play: "false",
    hide_related: "true",
    show_comments: "false",
    show_user: "true",
    show_reposts: "false",
    show_teaser: "false",
    visual: "false",
  });

  return `https://w.soundcloud.com/player/?${params.toString()}`;
}

function ensureSoundCloudWidget() {
  const soundcloudPlayer = document.getElementById("soundcloud-player");

  if (!soundcloudPlayer || !window.SC?.Widget) {
    return Promise.resolve(null);
  }

  if (soundcloudWidget) {
    return Promise.resolve(soundcloudWidget);
  }

  soundcloudWidget = window.SC.Widget(soundcloudPlayer);
  soundcloudWidgetReadyPromise = new Promise((resolve) => {
    soundcloudWidget.bind(window.SC.Widget.Events.READY, () => {
      setSoundCloudMusicVolume();
      resolve(soundcloudWidget);
    });
    soundcloudWidget.bind(window.SC.Widget.Events.PLAY, () => {
      isSoundCloudMusicPlaying = true;
      updateMusicPlayLabel();
    });
    soundcloudWidget.bind(window.SC.Widget.Events.PAUSE, () => {
      isSoundCloudMusicPlaying = false;
      updateMusicPlayLabel();
    });
    soundcloudWidget.bind(window.SC.Widget.Events.FINISH, () => {
      isSoundCloudMusicPlaying = false;
      updateMusicPlayLabel();
    });
  });

  return soundcloudWidgetReadyPromise;
}

function loadSoundCloudMusic(track) {
  const soundcloudPlayer = document.getElementById("soundcloud-player");
  const embedUrl = getSoundCloudEmbedUrl(track);

  if (!soundcloudPlayer || !embedUrl) {
    return;
  }

  isSoundCloudMusicPlaying = false;
  if (musicProgress) musicProgress.style.width = "0%";
  soundcloudPlayer.src = embedUrl;
  soundcloudWidget = null;
  soundcloudWidgetReadyPromise = null;
  ensureSoundCloudWidget();
}

function toggleSoundCloudMusic() {
  ensureSoundCloudWidget().then((widget) => {
    widget?.toggle?.();
  });
}

function pauseSoundCloudMusic() {
  soundcloudWidget?.pause?.();
  isSoundCloudMusicPlaying = false;
  updateMusicPlayLabel();
}

function setSoundCloudMusicVolume() {
  const nextVolume = Math.round(Number.parseFloat(musicVolume?.value || "0.45") * 100);

  try {
    soundcloudWidget?.setVolume?.(nextVolume);
  } catch {
    // The SoundCloud iframe may not be ready yet.
  }
}

function getYouTubeVideoId(value = "") {
  if (!value) {
    return "";
  }

  const trimmedValue = value.trim();

  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmedValue)) {
    return trimmedValue;
  }

  try {
    const url = new URL(trimmedValue);

    if (url.hostname.includes("youtu.be")) {
      return url.pathname.split("/").filter(Boolean)[0] || "";
    }

    if (url.searchParams.has("v")) {
      return url.searchParams.get("v") || "";
    }

    const embedMatch = url.pathname.match(/\/(?:embed|shorts)\/([a-zA-Z0-9_-]{11})/);
    return embedMatch?.[1] || "";
  } catch {
    return "";
  }
}

function getYouTubePlaylistId(value = "") {
  if (!value) {
    return "";
  }

  try {
    const url = new URL(value.trim());
    return url.searchParams.get("list") || "";
  } catch {
    return "";
  }
}

function getTrackYouTubeId(track) {
  return track?.youtubeId || getYouTubeVideoId(track?.youtubeUrl || "");
}

function getTrackYouTubePlaylistId(track) {
  return track?.youtubePlaylistId || getYouTubePlaylistId(track?.youtubeUrl || "");
}

function isYouTubeMusicTrack(track) {
  return Boolean(track && (track.type === "youtube" || (!track.src && getTrackYouTubeId(track))));
}

function ensureYouTubeMusicApi() {
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (youtubeMusicReadyPromise) {
    return youtubeMusicReadyPromise;
  }

  youtubeMusicReadyPromise = new Promise((resolve) => {
    resolveYoutubeMusicReady = resolve;
    const previousCallback = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve(window.YT);
      resolveYoutubeMusicReady = null;
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
  });

  return youtubeMusicReadyPromise;
}

function onYouTubeMusicStateChange(event) {
  isYoutubeMusicPlaying = event.data === window.YT?.PlayerState?.PLAYING;

  if (event.data === window.YT?.PlayerState?.ENDED) {
    isYoutubeMusicPlaying = false;
  }

  updateMusicPlayLabel();
}

function getYouTubeMusicPlayer(videoId) {
  return ensureYouTubeMusicApi().then((YT) => {
    if (resolveYoutubeMusicReady) {
      resolveYoutubeMusicReady(YT);
      resolveYoutubeMusicReady = null;
    }

    if (youtubeMusicPlayer?.loadVideoById) {
      youtubeMusicPlayer.loadVideoById(videoId);
      return youtubeMusicPlayer;
    }

    const playlistId = getTrackYouTubePlaylistId(currentlyPlayingTrack);

    const playerVars = {
      autoplay: 0,
      controls: 1,
      enablejsapi: 1,
      start_radio: 1,
      playsinline: 1,
      rel: 0,
    };

    if (playlistId) {
      playerVars.list = playlistId;
    }

    if (window.location.origin && window.location.origin !== "null") {
      playerVars.origin = window.location.origin;
    }

    youtubeMusicPlayer = new YT.Player("yt-player", {
      videoId,
      playerVars,
      events: {
        onReady: (event) => {
          event.target.setVolume(Math.round(Number.parseFloat(musicVolume?.value || "0.45") * 100));
        },
        onStateChange: onYouTubeMusicStateChange,
      },
    });

    return youtubeMusicPlayer;
  });
}

function pauseYouTubeMusic() {
  try {
    youtubeMusicPlayer?.pauseVideo?.();
  } catch {
    // The YouTube iframe may not be ready yet.
  }
  isYoutubeMusicPlaying = false;
  updateMusicPlayLabel();
}

function stopYouTubeMusic() {
  try {
    youtubeMusicPlayer?.stopVideo?.();
  } catch {
    // The YouTube iframe may not be ready yet.
  }
  isYoutubeMusicPlaying = false;
}

function playYouTubeMusic() {
  if (isMuted || !youtubeMusicPlayer?.playVideo) {
    return;
  }

  youtubeMusicPlayer.playVideo();
}

function setYouTubeMusicVolume() {
  const nextVolume = Math.round(Number.parseFloat(musicVolume?.value || "0.45") * 100);

  try {
    youtubeMusicPlayer?.setVolume?.(nextVolume);
  } catch {
    // The YouTube iframe may not be ready yet.
  }
}

function syncYouTubeMusicMutedState() {
  try {
    if (isMuted) {
      youtubeMusicPlayer?.mute?.();
      pauseYouTubeMusic();
    } else {
      youtubeMusicPlayer?.unMute?.();
      setYouTubeMusicVolume();
    }
  } catch {
    // The YouTube iframe may not be ready yet.
  }
}

function normalizeMusicSearchText(value = "") {
  return value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/Ä‘/g, "d")
    .replace(/Ä/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getSearchTokens(value = "") {
  return normalizeMusicSearchText(value).split(/\s+/).filter(Boolean);
}

function doesSearchTextMatch(searchText, searchQuery) {
  const tokens = getSearchTokens(searchQuery);

  if (!tokens.length) {
    return true;
  }

  const normalizedText = normalizeMusicSearchText(searchText);
  const textTokens = normalizedText.split(/\s+/).filter(Boolean);
  const compactText = textTokens.join("");

  return tokens.every((token) => {
    return textTokens.some((textToken) => textToken.startsWith(token))
      || (token.length >= 4 && compactText.includes(token));
  });
}

function getMusicSearchText(track) {
  const label = track?.label || "";
  const [artist = "", title = ""] = label.includes(" - ") ? label.split(" - ") : ["", label];
  return `${label} ${artist} ${title}`;
}

function getNextMusicTrack() {
  const tracks = getPlayableMusicTracks();
  if (tracks.length === 0) {
    return null;
  }

  if (!currentlyPlayingTrack) {
    return tracks[0];
  }

  if (isMusicShuffleEnabled && tracks.length > 1) {
    const currentIndex = tracks.indexOf(currentlyPlayingTrack);
    let nextIndex = currentIndex;

    while (nextIndex === currentIndex) {
      nextIndex = Math.floor(Math.random() * tracks.length);
    }

    return tracks[nextIndex];
  }

  const currentIndex = tracks.indexOf(currentlyPlayingTrack);
  const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % tracks.length;
  return tracks[nextIndex];
}

function setActiveMusicTrackButton(track) {
  const list = document.getElementById("music-track-list");
  if (!list) return;

  Array.from(list.children).forEach((child) => {
    child.classList.toggle("is-active", child.dataset.trackLabel === track?.label);
  });
}

function getMusicTrackButtons() {
  return Array.from(musicTrackList?.querySelectorAll(".music-track-item") || []);
}

function setKeyboardActiveMusicTrackButton(button, { syncIndex = false } = {}) {
  const buttons = getMusicTrackButtons();

  buttons.forEach((item) => {
    item.classList.toggle("is-keyboard-active", item === button);
  });

  if (syncIndex) {
    musicKeyboardActiveIndex = button ? buttons.indexOf(button) : -1;
  }

  if (button) {
    button.scrollIntoView({ block: "nearest" });
  }
}

function moveMusicTrackSelection(direction) {
  const buttons = getMusicTrackButtons();

  if (!buttons.length) {
    musicKeyboardActiveIndex = -1;
    return;
  }

  const activeButton = musicKeyboardActiveIndex >= 0 ? buttons[musicKeyboardActiveIndex] : null;
  const currentIndex = buttons.indexOf(activeButton);
  const nextIndex = currentIndex < 0
    ? 0
    : (currentIndex + direction + buttons.length) % buttons.length;

  musicPanel?.classList.add("is-keyboard-navigating");
  musicKeyboardActiveIndex = nextIndex;
  setKeyboardActiveMusicTrackButton(buttons[nextIndex]);
  musicSearchInput?.focus({ preventScroll: true });
}

function playKeyboardActiveMusicTrack() {
  const activeButton = getMusicTrackButtons()[musicKeyboardActiveIndex] || getMusicTrackButtons()[0];

  if (!activeButton) {
    return;
  }

  activeButton.click();
}

function playNextMusicTrack() {
  const nextTrack = getNextMusicTrack();
  if (!nextTrack) {
    return;
  }

  setMusicSource(nextTrack);
  setActiveMusicTrackButton(nextTrack);
}

function getMediaAssetUrl(src) {
  if (!src || src.startsWith("http")) {
    return src || "";
  }

  return encodeURI(src);
}

function setMusicPanelExpanded(isExpanded) {
  if (!musicPanel) {
    return;
  }

  musicPanel.classList.toggle("is-collapsed", !isExpanded);
  musicPanelToggle?.setAttribute("aria-expanded", String(isExpanded));
}

function closeMusicPanel() {
  setMusicPanelExpanded(false);
}

function toggleMusicPanel() {
  setMusicPanelExpanded(musicPanel?.classList.contains("is-collapsed"));
}

function updateMusicUI(track) {
  const musicCoverArt = document.getElementById("music-cover-art");
  const trackInfo = document.getElementById("music-info-track");
  const artistInfo = document.getElementById("music-info-artist");
  const durationInfo = document.getElementById("music-info-duration");

  if (!track) {
    if (musicCoverArt) {
      musicCoverArt.src = getMediaAssetUrl(DEFAULT_MUSIC_COVER_ART);
      musicCoverArt.style.display = "block";
    }
    if (trackInfo) trackInfo.textContent = "No track selected";
    if (artistInfo) artistInfo.textContent = "-";
    if (durationInfo) durationInfo.textContent = "-";
    return;
  }

  // Update Cover Art
  if (musicCoverArt) {
    musicCoverArt.src = getMediaAssetUrl(track.cover || DEFAULT_MUSIC_COVER_ART);
    musicCoverArt.style.display = "block";
  }

  // Update Info
  if (trackInfo && artistInfo) {
    if (track.label.includes(" - ")) {
      const [artist, title] = track.label.split(" - ");
      trackInfo.textContent = title.trim();
      artistInfo.textContent = artist.trim();
    } else {
      trackInfo.textContent = track.label;
      artistInfo.textContent = "-";
    }
  }

  if (durationInfo) {
    updateMusicDurationDisplay(track.duration);
  }
}

function setMusicSource(track) {
  if (!track) return;

  const musicCoverArt = document.getElementById("music-cover-art");
  const ytPlayer = document.getElementById("yt-player");
  const soundcloudPlayer = document.getElementById("soundcloud-player");
  const youtubeId = getTrackYouTubeId(track);

  updateMusicUI(track);
  currentlyPlayingTrack = track;

  if (isSoundCloudMusicTrack(track)) {
    musicAudio?.pause();
    stopYouTubeMusic();
    if (ytPlayer) ytPlayer.style.display = "none";
    if (musicCoverArt) musicCoverArt.style.display = "none";
    if (soundcloudPlayer) {
      soundcloudPlayer.style.display = "block";
    }
    loadSoundCloudMusic(track);
    if (musicTimeDisplay) musicTimeDisplay.textContent = "SoundCloud";
  } else if (isYouTubeMusicTrack(track) && youtubeId) {
    musicAudio?.pause();
    if (musicAudio) musicAudio.src = "";

    if (musicCoverArt) musicCoverArt.style.display = "none";
    if (soundcloudPlayer) soundcloudPlayer.style.display = "none";
    if (ytPlayer) ytPlayer.style.display = "block";

    getYouTubeMusicPlayer(youtubeId).then((player) => {
      const playerFrame = document.getElementById("yt-player");
      if (playerFrame) playerFrame.style.display = "block";
      setYouTubeMusicVolume();
      if (!isMuted) {
        player.playVideo?.();
      }
    });
  } else if (track.src) {
    stopYouTubeMusic();
    if (ytPlayer) ytPlayer.style.display = "none";
    if (soundcloudPlayer) soundcloudPlayer.style.display = "none";

    if (musicAudio) {
      musicAudio.pause();
      musicAudio.currentTime = 0;
      musicAudio.src = getMediaAssetUrl(track.src);
      musicAudio.load();
      musicAudio.muted = false;
      isMuted = false;
      document.body.classList.remove("is-muted");
      musicAudio.volume = Number.parseFloat(musicVolume?.value || "0.45");
      if (musicProgress) musicProgress.style.width = "0%";
      if (musicTimeDisplay) musicTimeDisplay.textContent = `0:00 / ${track.duration || "0:00"}`;
      updateSoundToggleLabel();
      playSelectedMusic();
    }
  }

  updateMusicTrackTitle(track ? track.label : "");
  updateMusicPlayLabel();
}

function populateMusicTracks() {
  const list = document.getElementById("music-track-list");
  if (!list) return;

  const searchQuery = normalizeMusicSearchText(musicSearchInput?.value || "");
  list.innerHTML = "";
  MUSIC_TRACKS = MUSIC_TRACKS.sort(compareMusicTracksByLabel);
  const visibleTracks = MUSIC_TRACKS.filter((track) => {
    if (!isSoundCloudMusicTrack(track) || !track.label) {
      return false;
    }

    return !searchQuery || doesSearchTextMatch(getMusicSearchText(track), searchQuery);
  });

  visibleTracks.forEach((track) => {

    const btn = document.createElement("button");
    btn.className = "music-track-item";
    btn.type = "button";
    btn.textContent = track.label;
    btn.dataset.trackLabel = track.label;
    
    // Direct event assignment for compatibility
    btn.onmouseenter = () => {
      musicPanel?.classList.remove("is-keyboard-navigating");
      setKeyboardActiveMusicTrackButton(btn, { syncIndex: true });
      updateMusicUI(track);
    };
    btn.onfocus = () => setKeyboardActiveMusicTrackButton(btn, { syncIndex: true });
    btn.onmouseleave = () => updateMusicUI(currentlyPlayingTrack);
    btn.onclick = () => {
      currentlyPlayingTrack = track;
      setMusicSource(track);
      setActiveMusicTrackButton(track);
    };
    
    list.appendChild(btn);
  });

  if (visibleTracks.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "music-track-empty";
    emptyState.textContent = searchQuery ? "No matching songs" : "No songs available";
    list.appendChild(emptyState);
  }

  setActiveMusicTrackButton(currentlyPlayingTrack);
  setKeyboardActiveMusicTrackButton(getMusicTrackButtons()[0] || null, { syncIndex: true });
}

function playSelectedMusic() {
  if (isMuted) {
    return;
  }

  if (isSoundCloudMusicTrack(currentlyPlayingTrack)) {
    toggleSoundCloudMusic();
    return;
  }

  if (isYouTubeMusicTrack(currentlyPlayingTrack)) {
    playYouTubeMusic();
    return;
  }

  // Handle HTML5 audio
  if (!musicAudio || !musicAudio.src) {
    return;
  }

  musicAudio.play().catch(() => {
    updateMusicPlayLabel();
  });
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
  const documentWindow = document.querySelector('[data-window-id="document-collection"]');

  if (!documentWindow || documentWindow.classList.contains("is-hidden") || documentWindow.classList.contains("is-closing")) {
    return;
  }

  const activePreview = document.querySelector(".document-preview.is-active");
  const activePdfViewer = activePreview?.querySelector(".pdf-preview-viewer[data-pdf-src]");

  if (!activePdfViewer) {
    return;
  }

  renderPdfPreview(activePdfViewer);
}

function getGameFilters(gameId) {
  return gameFilterTags[gameId] || [];
}

function applyGameFilter(filter = "all") {
  const collectionGrid = document.querySelector("#game-collection .collection-grid");

  if (!collectionGrid) {
    return;
  }

  const cards = Array.from(collectionGrid.querySelectorAll("[data-game-id]"));
  let visibleCount = 0;

  cards.forEach((card) => {
    const gameId = card.dataset.gameId;
    const isVisible = filter === "all" || getGameFilters(gameId).includes(filter);
    card.classList.toggle("is-filtered-out", !isVisible);
    card.hidden = !isVisible;

    if (isVisible) {
      visibleCount += 1;
    }
  });

  gameFilterButtons.forEach((button) => {
    const isActive = button.dataset.gameFilter === filter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (gameFilterCount) {
    const label = visibleCount === 1 ? "project" : "projects";
    gameFilterCount.textContent = `${visibleCount} ${label} shown`;
  }
}

function renderGameCaseStudy(gameId) {
  if (!gameDetailCaseStudySection || !gameDetailCaseStudy) {
    return;
  }

  const caseStudy = gameCaseStudies[gameId] || defaultGameCaseStudy;
  const sections = [
    ["Role", caseStudy.role],
    ["Tools", caseStudy.tools || caseStudy.systems],
    ["What I Built", caseStudy.built || caseStudy.systems],
    ["Design Problem", caseStudy.problem],
    ["Design Choice", caseStudy.decisions],
    ["Result", caseStudy.result],
  ];

  gameDetailCaseStudy.innerHTML = "";

  sections.forEach(([label, body]) => {
    if (!body) {
      return;
    }

    const item = document.createElement("article");
    const title = document.createElement("strong");
    const text = document.createElement("p");

    item.className = "game-case-study-item";
    title.textContent = label;
    text.textContent = body;
    item.append(title, text);
    gameDetailCaseStudy.appendChild(item);
  });

  gameDetailCaseStudySection.classList.toggle("is-hidden", gameDetailCaseStudy.children.length === 0);
}

function setGamePlayerOverlay({ state = "ready", title = "Ready to play", note = "", buttonText = "Play", showButton = true } = {}) {
  if (!gamePlayerShell || !gamePlayerOverlay) {
    return;
  }

  gamePlayerShell.dataset.playerState = state;
  gamePlayerOverlay.classList.toggle("is-hidden", state === "playing");

  if (gamePlayerStatus) {
    gamePlayerStatus.textContent = title;
  }

  if (gamePlayerNote) {
    gamePlayerNote.textContent = note;
  }

  if (gamePlayerLoadButton) {
    gamePlayerLoadButton.textContent = buttonText;
    gamePlayerLoadButton.hidden = !showButton;
  }
}

function activateGameFrame(frameEl = gameDetailFrame) {
  if (!frameEl?.dataset.playerSrc) {
    return;
  }

  frameEl.dataset.playerActivated = "true";
  delete frameEl.dataset.frameSuspended;
  delete frameEl.dataset.gameAudioState;
  setGamePlayerOverlay({
    state: "loading",
    title: "Loading game",
    note: "The browser build is starting. Audio pauses automatically when you leave this area.",
    buttonText: "Reload",
    showButton: false,
  });

  if (frameEl.getAttribute("src") !== frameEl.dataset.playerSrc) {
    frameEl.src = frameEl.dataset.playerSrc;
  }

  syncEmbeddedFrameAudioState();
}

function reorderGameCollection() {
  const collectionGrid = document.querySelector("#game-collection .collection-grid");

  if (!collectionGrid) {
    return;
  }

  const cards = Array.from(collectionGrid.querySelectorAll("[data-game-id]"));
  const cardsByGameId = new Map(cards.map((card) => [card.dataset.gameId, card]));
  const rankedCards = gameCollectionOrder.map((gameId) => cardsByGameId.get(gameId)).filter(Boolean);
  const remainingCards = cards.filter((card) => !gameCollectionOrder.includes(card.dataset.gameId));

  [...rankedCards, ...remainingCards].forEach((card) => {
    collectionGrid.appendChild(card);
  });
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

  renderGameCaseStudy(gameId);

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
        element.rel = "noopener noreferrer";
      }

      gameDetailActions.appendChild(element);
    });
  }

  if (gameDetailTrailerSection && gameDetailTrailer) {
    if (game.trailer?.src) {
      gameDetailTrailer.dataset.trailerSrc = game.trailer.src;
      if (gameDetailTrailer.getAttribute("src") !== game.trailer.src) {
        gameDetailTrailer.removeAttribute("src");
      }
      gameDetailTrailer.title = game.trailer.title || `${game.title} trailer`;
      gameDetailTrailerSection.classList.remove("is-hidden");
      if (!gameDetailTrailer.currentSrc && gameDetailTrailer.getAttribute("src") !== game.trailer.src) {
        gameDetailTrailer.load();
      }
      prepareGameDetailTrailerAutoplay(gameDetailTrailer);
      setGameDetailTrailerState("", "");
      requestGameDetailTrailerAutoplay({ restart: true });
    } else {
      delete gameDetailTrailer.dataset.trailerSrc;
      gameDetailTrailer.removeAttribute("src");
      gameDetailTrailer.load();
      gameDetailTrailer.title = "";
      setGameDetailTrailerState("", "");
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
        link.rel = "noopener noreferrer";
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
      bindGameFrameAudioSync(gameDetailPlayerSection);
      delete gameDetailFrame.dataset.frameSuspended;
      delete gameDetailFrame.dataset.gameAudioState;
      delete gameDetailFrame.dataset.playerActivated;
      gameDetailFrame.src = "about:blank";
      gameDetailFrame.dataset.playerSrc = game.player.src;
      gameDetailFrame.title = game.player.title || game.title;
      gameDetailPlayerSection.classList.remove("is-hidden");
      setGamePlayerOverlay({
        state: "ready",
        title: "Ready to play",
        note: "Load the browser build when you are ready. The build will pause if you scroll away.",
        buttonText: "Play",
        showButton: true,
      });
      syncEmbeddedFrameAudioState();
    } else {
      delete gameDetailFrame.dataset.frameSuspended;
      delete gameDetailFrame.dataset.gameAudioState;
      delete gameDetailFrame.dataset.playerActivated;
      gameDetailFrame.src = "about:blank";
      delete gameDetailFrame.dataset.playerSrc;
      gameDetailFrame.title = "";
      gameDetailPlayerSection.classList.add("is-hidden");
      setGamePlayerOverlay();
      syncEmbeddedFrameAudioState();
    }
  }

  if (gameDetailDevlog) {
    gameDetailDevlog.innerHTML = "";

    const devlogEntries = game.devlog.length
      ? game.devlog
      : [
        {
          title: "Process notes",
          body: "Detailed production notes are not available for this entry yet; the sections above summarize the project format, contribution, and access links.",
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
  requestGameDetailTrailerAutoplay();
}

function bringToFront(windowEl) {
  zIndexSeed += 1;
  draggableWindows.forEach((candidateWindow) => {
    candidateWindow.classList.toggle("is-active", candidateWindow === windowEl);
  });
  windowEl.style.zIndex = windowEl.classList.contains("is-fullscreen")
    ? String(FULLSCREEN_WINDOW_Z_INDEX)
    : String(zIndexSeed);
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
  const visibleWindows = getVisibleWindows();

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
  return document.querySelector(".document-item.is-active")?.dataset.docTarget || DEFAULT_DOCUMENT_TARGET;
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
    setActiveDocumentTarget(DEFAULT_DOCUMENT_TARGET);
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
  stopWindowGameFrames(windowEl);
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
  if (windowEl.dataset.windowId === "cat-collection") {
    renderCatMedia();
  }
  if (windowEl.dataset.windowId === "document-collection") {
    renderActiveDocumentPdf();
  }
  syncResponsiveWindowLayout();
  enableAutoplayForVideos(windowEl);
  syncFullscreenState();
  renderTaskbarTabs();
  syncMediaMutedState();
  requestGameDetailTrailerAutoplay();

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
  if (windowEl.dataset.windowId === "cat-collection") {
    renderCatMedia();
  }
  if (windowEl.dataset.windowId === "document-collection") {
    renderActiveDocumentPdf();
  }
  syncResponsiveWindowLayout();
  enableAutoplayForVideos(windowEl);
  syncFullscreenState();
  renderTaskbarTabs();
  syncMediaMutedState();
  requestGameDetailTrailerAutoplay();

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
  document.body.classList.toggle("has-open-window", visibleWindows.length > 0);

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
    stopWindowGameFrames(windowEl);
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
    const targetId = documentMatch?.[1] || legacyDocumentMatch?.[1] || DEFAULT_DOCUMENT_TARGET;

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
  if (!startPanel) {
    return;
  }

  if (startPanel.classList.contains("is-hidden")) {
    startButton?.setAttribute("aria-expanded", "false");
    return;
  }

  if (startPanelCloseTimer) {
    window.clearTimeout(startPanelCloseTimer);
  }

  startPanel.classList.remove("is-opening");
  startPanel.classList.add("is-closing");
  startButton?.setAttribute("aria-expanded", "false");
  startPanel.classList.remove("is-keyboard-navigating");
  setActiveStartSearchOption(null, { syncIndex: true });

  startPanelCloseTimer = window.setTimeout(() => {
    startPanel.classList.add("is-hidden");
    startPanel.classList.remove("is-closing");
    startPanelCloseTimer = null;
  }, START_PANEL_CLOSE_ANIMATION_MS);
}

function isStartPanelOpen() {
  return Boolean(startPanel && !startPanel.classList.contains("is-hidden") && !startPanel.classList.contains("is-closing"));
}

function toggleStartPanel() {
  if (!startPanel || !startButton) {
    return;
  }

  const willOpen = startPanel.classList.contains("is-hidden");

  if (startPanelCloseTimer) {
    window.clearTimeout(startPanelCloseTimer);
    startPanelCloseTimer = null;
  }

  if (willOpen) {
    startPanel.classList.remove("is-hidden", "is-closing", "is-opening");
    void startPanel.offsetWidth;
    startPanel.classList.add("is-opening");
  } else {
    closeStartPanel();
  }

  startButton.setAttribute("aria-expanded", String(willOpen));

  if (willOpen) {
    syncViewportInsets();
    restoreStoredPanelPosition(startPanel);
    if (!isTouchLikePointer()) {
      startSearchInput?.focus({ preventScroll: true });
    }
    setActiveStartSearchOption(getStartSearchOptions()[0] || null, { syncIndex: true });
  }
}

function openQuickLauncher() {
  if (!startPanel || !startButton) {
    return;
  }

  if (!isStartPanelOpen()) {
    toggleStartPanel();
  }

  window.setTimeout(() => {
    startSearchInput?.focus({ preventScroll: true });
    startSearchInput?.select();
  }, 0);
}

function filterStartMenuItems() {
  if (!startPanel) {
    return;
  }

  const searchQuery = normalizeMusicSearchText(startSearchInput?.value || "");
  let visibleAppCount = 0;

  startPanel.querySelectorAll(".start-panel-body .start-menu-item").forEach((item) => {
    const label = normalizeMusicSearchText(item.textContent || "");
    const isVisible = !searchQuery || label.includes(searchQuery);
    item.hidden = !isVisible;
    if (isVisible) {
      visibleAppCount += 1;
    }
  });

  renderStartSearchResults(searchQuery, visibleAppCount);
  setActiveStartSearchOption(getStartSearchOptions()[0] || null, { syncIndex: true });
}

function getStartSearchOptions() {
  if (!startPanel) {
    return [];
  }

  return Array.from(startPanel.querySelectorAll(".start-panel-body .start-menu-item:not([hidden]), .start-search-result"));
}

function setActiveStartSearchOption(option, { syncIndex = false } = {}) {
  const options = getStartSearchOptions();

  startPanel?.querySelectorAll(".start-menu-item, .start-search-result").forEach((item) => {
    item.classList.toggle("is-keyboard-active", item === option);
  });

  if (syncIndex) {
    startKeyboardActiveIndex = option ? options.indexOf(option) : -1;
  }

  if (option) {
    option.scrollIntoView({ block: "nearest" });
  }
}

function getActiveStartSearchOption() {
  return startPanel?.querySelector(".start-menu-item.is-keyboard-active, .start-search-result.is-keyboard-active") || null;
}

function moveStartSearchSelection(direction) {
  const options = getStartSearchOptions();

  if (!options.length) {
    startKeyboardActiveIndex = -1;
    return;
  }

  const activeIndex = startKeyboardActiveIndex >= 0
    ? startKeyboardActiveIndex
    : options.indexOf(getActiveStartSearchOption());
  const nextIndex = activeIndex < 0
    ? 0
    : (activeIndex + direction + options.length) % options.length;

  startPanel?.classList.add("is-keyboard-navigating");
  startKeyboardActiveIndex = nextIndex;
  setActiveStartSearchOption(options[nextIndex]);
  startSearchInput?.focus({ preventScroll: true });
}

function getStartNavigationKey(event) {
  const key = event.key || "";
  const code = event.code || "";
  const keyCode = event.keyCode || event.which || 0;

  if (key === "ArrowDown" || key === "Down" || code === "ArrowDown" || keyCode === 40) {
    return "down";
  }

  if (key === "ArrowUp" || key === "Up" || code === "ArrowUp" || keyCode === 38) {
    return "up";
  }

  if (key === "Enter" || code === "Enter" || code === "NumpadEnter" || keyCode === 13) {
    return "enter";
  }

  return "";
}

function createStartSearchResult({ label, category, icon, onClick }) {
  const button = document.createElement("button");
  const iconImage = document.createElement("img");
  const textGroup = document.createElement("span");
  const labelText = document.createElement("span");
  const categoryText = document.createElement("span");

  button.className = "start-search-result";
  button.type = "button";
  iconImage.className = "start-menu-icon";
  iconImage.src = icon;
  iconImage.alt = "";
  iconImage.setAttribute("aria-hidden", "true");
  textGroup.className = "start-search-result-text";
  labelText.textContent = label;
  categoryText.className = "start-search-result-category";
  categoryText.textContent = category;

  textGroup.append(labelText, categoryText);
  button.append(iconImage, textGroup);
  button.addEventListener("mouseenter", () => {
    startPanel?.classList.remove("is-keyboard-navigating");
    setActiveStartSearchOption(button, { syncIndex: true });
  });
  button.addEventListener("focus", () => setActiveStartSearchOption(button, { syncIndex: true }));
  button.addEventListener("click", onClick);
  return button;
}

function getAppSearchEntries() {
  return Array.from(startPanel?.querySelectorAll(".start-panel-body .start-menu-item[data-target-window]") || [])
    .map((item) => {
      const targetId = item.dataset.targetWindow;
      const title = item.textContent.trim();
      const icon = item.querySelector("img")?.getAttribute("src") || "assets/xp-icons/taskbar-folder.ico";

      return {
        targetId,
        title,
        icon,
        searchText: `${targetId} ${title}`,
        onClick: () => {
          item.click();
          closeStartPanel();
        },
      };
    });
}

function getDocumentSearchEntries() {
  return Array.from(documentItems).map((item) => {
    const targetId = item.dataset.docTarget;
    const preview = document.querySelector(`.document-preview[data-doc-preview="${targetId}"]`);
    const itemText = item.textContent || "";
    const previewText = preview?.textContent || "";
    const title = item.querySelector("strong")?.textContent?.trim() || preview?.querySelector("h3")?.textContent?.trim() || itemText.trim();

    return {
      targetId,
      title,
      primarySearchText: `${targetId} ${title} ${itemText}`,
      deepSearchText: `${targetId} ${title} ${itemText} ${previewText}`,
    };
  });
}

function getGameSearchText(gameId, game, searchQuery) {
  const tags = getGameFilters(gameId);
  const filterLabels = gameFilterSearchEntries
    .filter((entry) => tags.includes(entry.filter))
    .flatMap((entry) => [entry.label, entry.aliases]);
  const primaryText = [
    gameId,
    game.routeSlug,
    game.title,
    "game",
    "games",
    "project",
    ...tags,
    ...filterLabels,
  ].join(" ");

  if (normalizeMusicSearchText(searchQuery).length < 3) {
    return primaryText;
  }

  return [
    primaryText,
    game.shortDescription,
    game.overview,
    ...(game.meta || []),
    ...(game.actions || []).map((action) => action.label),
    ...(game.devlog || []).flatMap((entry) => [entry.title, entry.body]),
  ].join(" ");
}

function getMatchedGameCategory(gameId, searchQuery) {
  const normalizedQuery = normalizeMusicSearchText(searchQuery);
  const matchedFilter = gameFilterSearchEntries.find((entry) => {
    return getGameFilters(gameId).includes(entry.filter)
      && doesSearchTextMatch(`${entry.label} ${entry.aliases}`, normalizedQuery);
  });

  return matchedFilter ? matchedFilter.label.replace(/s$/, "").toLowerCase() : "game";
}

function getDocumentSearchText(entry, searchQuery) {
  return normalizeMusicSearchText(searchQuery).length < 3
    ? entry.primarySearchText
    : entry.deepSearchText;
}

function openFilteredGameCollection(filter) {
  const gameCollectionWindow = document.querySelector('[data-window-id="game-collection"]');

  if (!gameCollectionWindow) {
    return;
  }

  showWindow(gameCollectionWindow);
  applyGameFilter(filter);
  closeStartPanel();
}

function renderStartSearchResults(searchQuery, visibleAppCount) {
  if (!startSearchResults) {
    return;
  }

  startSearchResults.innerHTML = "";

  if (!searchQuery) {
    startSearchResults.hidden = true;
    return;
  }

  const appMatches = getAppSearchEntries()
    .filter((entry) => doesSearchTextMatch(entry.searchText, searchQuery))
    .slice(0, 5);

  const gameFilterMatches = gameFilterSearchEntries
    .filter((entry) => doesSearchTextMatch(`${entry.label} ${entry.aliases}`, searchQuery))
    .slice(0, 3);

  const gameMatches = Object.entries(gameDetails)
    .filter(([gameId, game]) => {
      return doesSearchTextMatch(getGameSearchText(gameId, game, searchQuery), searchQuery);
    })
    .slice(0, 6);

  const documentMatches = getDocumentSearchEntries()
    .filter((entry) => doesSearchTextMatch(getDocumentSearchText(entry, searchQuery), searchQuery))
    .slice(0, 6);

  appMatches.forEach((entry) => {
    startSearchResults.appendChild(createStartSearchResult({
      label: entry.title,
      category: "app",
      icon: entry.icon,
      onClick: entry.onClick,
    }));
  });

  gameFilterMatches.forEach((entry) => {
    const matchCount = Object.keys(gameDetails).filter((gameId) => getGameFilters(gameId).includes(entry.filter)).length;

    startSearchResults.appendChild(createStartSearchResult({
      label: entry.label,
      category: `${matchCount} ${matchCount === 1 ? "game" : "games"}`,
      icon: "assets/xp-icons/games.ico",
      onClick: () => openFilteredGameCollection(entry.filter),
    }));
  });

  gameMatches.forEach(([gameId, game]) => {
    startSearchResults.appendChild(createStartSearchResult({
      label: game.title,
      category: getMatchedGameCategory(gameId, searchQuery),
      icon: "assets/xp-icons/games.ico",
      onClick: () => {
        if (!gameDetailWindow) return;
        primeGameDetailTrailerFromGesture(gameId);
        renderGameDetail(gameId);
        showWindow(gameDetailWindow);
        closeStartPanel();
      },
    }));
  });

  documentMatches.forEach((entry) => {
    startSearchResults.appendChild(createStartSearchResult({
      label: entry.title,
      category: "document",
      icon: "assets/xp-icons/documents.ico",
      onClick: () => {
        const documentWindow = document.querySelector('[data-window-id="document-collection"]');
        if (!documentWindow) return;
        setActiveDocumentTarget(entry.targetId);
        showWindow(documentWindow);
        closeStartPanel();
      },
    }));
  });

  if (!visibleAppCount && !appMatches.length && !gameFilterMatches.length && !gameMatches.length && !documentMatches.length) {
    const emptyState = document.createElement("div");
    emptyState.className = "start-search-empty";
    emptyState.textContent = "No results";
    startSearchResults.appendChild(emptyState);
  }

  startSearchResults.hidden = false;
}

function getLightboxItemsFromElements(elements) {
  return elements
    .map((element) => {
      const image = element.matches?.("img") ? element : element.querySelector?.("img");
      const src = image?.currentSrc || image?.src || element.href || "";

      if (!src) {
        return null;
      }

      return {
        src,
        alt: image?.alt || element.getAttribute?.("aria-label") || "Preview image",
      };
    })
    .filter(Boolean);
}

function renderMediaLightbox() {
  if (!mediaLightbox || !mediaLightboxImage || !mediaLightboxItems.length) {
    return;
  }

  const item = mediaLightboxItems[mediaLightboxIndex];
  mediaLightboxImage.src = item.src;
  mediaLightboxImage.alt = item.alt;

  if (mediaLightboxCaption) {
    mediaLightboxCaption.textContent = `${item.alt} (${mediaLightboxIndex + 1}/${mediaLightboxItems.length})`;
  }

  const hasMultipleItems = mediaLightboxItems.length > 1;
  if (mediaLightboxPrev) mediaLightboxPrev.hidden = !hasMultipleItems;
  if (mediaLightboxNext) mediaLightboxNext.hidden = !hasMultipleItems;
}

function openMediaLightbox(items, index = 0) {
  if (!mediaLightbox || !items.length) {
    return;
  }

  mediaLightboxItems = items;
  mediaLightboxIndex = clamp(index, 0, items.length - 1);
  renderMediaLightbox();
  mediaLightbox.classList.remove("is-hidden");
  mediaLightboxClose?.focus({ preventScroll: true });
}

function closeMediaLightbox() {
  if (!mediaLightbox) {
    return;
  }

  mediaLightbox.classList.add("is-hidden");
  if (mediaLightboxImage) {
    mediaLightboxImage.src = LIGHTBOX_PLACEHOLDER_SRC;
  }
}

function moveMediaLightbox(step) {
  if (!mediaLightboxItems.length) {
    return;
  }

  mediaLightboxIndex = (mediaLightboxIndex + step + mediaLightboxItems.length) % mediaLightboxItems.length;
  renderMediaLightbox();
}

function getLightboxContextFromTarget(target) {
  const stillLink = target.closest?.(".game-detail-still");
  if (stillLink) {
    const elements = Array.from(stillLink.closest("[data-game-detail-stills]")?.querySelectorAll(".game-detail-still") || []);
    return { elements, active: stillLink };
  }

  const pdfPage = target.closest?.(".pdf-preview-page");
  if (pdfPage?.tagName === "IMG") {
    const elements = Array.from(pdfPage.closest(".pdf-preview-viewer")?.querySelectorAll("img.pdf-preview-page") || []);
    return { elements, active: pdfPage };
  }

  const catImage = target.closest?.(".cat-media-card img");
  if (catImage) {
    const elements = Array.from(catImage.closest("#cat-media-grid")?.querySelectorAll(".cat-media-card img") || []);
    return { elements, active: catImage };
  }

  return null;
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
  syncResponsiveWindowLayout();
  arrangeVisiblePanels();
});

finePointerQuery.addEventListener("change", () => {
  stopDragging();
  syncViewportInsets();
  syncResponsiveWindowLayout();
});

function openShortcutWindow(shortcut, event) {
  const targetId = shortcut.dataset.targetWindow;
  const targetWindow = targetId ? document.querySelector(`[data-window-id="${targetId}"]`) : null;

  if (!targetWindow) {
    return;
  }

  event?.preventDefault();
  closeStartPanel();
  if (shortcut.dataset.gameId) {
    renderGameDetail(shortcut.dataset.gameId);
  }
  showWindow(targetWindow);
}

folderShortcuts.forEach((shortcut) => {
  shortcut.addEventListener("pointerdown", () => {
    if (shortcut.dataset.gameId) {
      primeGameDetailTrailerFromGesture(shortcut.dataset.gameId);
    }
  });

  shortcut.addEventListener("pointerup", (event) => {
    if (event.pointerType === "mouse") {
      return;
    }

    shortcut.dataset.touchOpened = "true";
    window.setTimeout(() => {
      delete shortcut.dataset.touchOpened;
    }, 400);
    openShortcutWindow(shortcut, event);
  });

  shortcut.addEventListener("click", (event) => {
    if (shortcut.dataset.touchOpened === "true") {
      event.preventDefault();
      return;
    }

    openShortcutWindow(shortcut, event);
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

startPanel?.addEventListener("mouseover", (event) => {
  const option = event.target.closest(".start-panel-body .start-menu-item:not([hidden]), .start-search-result");
  if (option) {
    startPanel.classList.remove("is-keyboard-navigating");
    setActiveStartSearchOption(option, { syncIndex: true });
  }
});

startPanel?.addEventListener("focusin", (event) => {
  const option = event.target.closest(".start-panel-body .start-menu-item:not([hidden]), .start-search-result");
  if (option) {
    setActiveStartSearchOption(option, { syncIndex: true });
  }
});

startSearchInput?.addEventListener("input", filterStartMenuItems);

function handleQuickLauncherKeydown(event) {
  if (event.isComposing) {
    return;
  }

  const targetIsEditable = event.target?.matches?.("input, textarea, select, [contenteditable='true']");
  const wantsQuickLauncher = (event.ctrlKey || event.metaKey) && event.key?.toLowerCase() === "k";
  const wantsSlashSearch = event.key === "/" && !targetIsEditable;

  if (!wantsQuickLauncher && !wantsSlashSearch) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  openQuickLauncher();
}

window.addEventListener("keydown", handleQuickLauncherKeydown, true);

function handleStartSearchKeydown(event) {
  if (!isStartPanelOpen() || event.isComposing) {
    return;
  }

  const navigationKey = getStartNavigationKey(event);
  if (!navigationKey) {
    return;
  }

  const targetIsEditable = event.target?.matches?.("input, textarea, select, [contenteditable='true']");
  const eventCameFromStart = startPanel.contains(event.target);

  if (targetIsEditable && !eventCameFromStart) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation?.();

  if (navigationKey === "down") {
    moveStartSearchSelection(1);
    return;
  }

  if (navigationKey === "up") {
    moveStartSearchSelection(-1);
    return;
  }

  if (navigationKey === "enter") {
    const activeOption = getActiveStartSearchOption() || getStartSearchOptions()[0];
    if (!activeOption) {
      return;
    }

    activeOption.click();
  }
}

window.addEventListener("keydown", handleStartSearchKeydown, true);

window.addEventListener("keydown", (event) => {
  if (!mediaLightbox || mediaLightbox.classList.contains("is-hidden")) {
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closeMediaLightbox();
    return;
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveMediaLightbox(-1);
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    moveMediaLightbox(1);
  }
}, true);

function handleMusicSearchKeydown(event) {
  if (!musicPanel || musicPanel.classList.contains("is-collapsed") || event.isComposing) {
    return;
  }

  const navigationKey = getStartNavigationKey(event);
  if (!navigationKey) {
    return;
  }

  const eventCameFromMusicPanel = musicPanel.contains(event.target);
  const targetIsEditable = event.target?.matches?.("input, textarea, select, [contenteditable='true']");

  if (!eventCameFromMusicPanel || (targetIsEditable && event.target !== musicSearchInput)) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation?.();

  if (navigationKey === "down") {
    moveMusicTrackSelection(1);
    return;
  }

  if (navigationKey === "up") {
    moveMusicTrackSelection(-1);
    return;
  }

  if (navigationKey === "enter") {
    playKeyboardActiveMusicTrack();
  }
}

window.addEventListener("keydown", handleMusicSearchKeydown, true);
document.addEventListener("pointerdown", blurSearchInputOnOutsidePointer, true);
document.addEventListener("touchstart", blurSearchInputOnOutsidePointer, true);

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
  updateMusicPlayLabel();
});

musicPanelToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleMusicPanel();
});

musicPanelToggle?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }

  event.preventDefault();
  toggleMusicPanel();
});

musicPlayToggle?.addEventListener("click", () => {
  const hasAudioSrc = musicAudio?.src;
  const hasYouTube = isYouTubeMusicTrack(currentlyPlayingTrack);
  const hasSoundCloud = isSoundCloudMusicTrack(currentlyPlayingTrack);

  if (!hasAudioSrc && !hasYouTube && !hasSoundCloud) {
    playNextMusicTrack();
    return;
  }

  if (hasSoundCloud) {
    toggleSoundCloudMusic();
    updateMusicPlayLabel();
    return;
  }

  if (hasYouTube) {
    if (isYoutubeMusicPlaying) {
      pauseYouTubeMusic();
    } else {
      playYouTubeMusic();
    }
    updateMusicPlayLabel();
  } else {
    if (musicAudio.paused) {
      playSelectedMusic();
    } else {
      musicAudio.pause();
    }
    updateMusicPlayLabel();
  }
});

musicVolume?.addEventListener("input", () => {
  if (musicAudio) {
    musicAudio.volume = Number.parseFloat(musicVolume.value || "0.45");
  }
  setYouTubeMusicVolume();
  setSoundCloudMusicVolume();
});

musicAudio?.addEventListener("play", updateMusicPlayLabel);
musicAudio?.addEventListener("pause", updateMusicPlayLabel);
musicAudio?.addEventListener("loadedmetadata", () => {
  if (!musicAudio.duration || Number.isNaN(musicAudio.duration)) {
    return;
  }

  const duration = formatMusicTime(musicAudio.duration);

  if (currentlyPlayingTrack) {
    currentlyPlayingTrack.duration = duration;
  }

  updateMusicDurationDisplay(duration);

  if (musicTimeDisplay) {
    musicTimeDisplay.textContent = `0:00 / ${duration}`;
  }
});
musicAudio?.addEventListener("timeupdate", () => {
  if (musicAudio.duration) {
    const progress = (musicAudio.currentTime / musicAudio.duration) * 100;
    if (musicProgress) {
      musicProgress.style.width = `${progress}%`;
    }

    // Update time display
    if (musicTimeDisplay) {
      const current = formatMusicTime(musicAudio.currentTime);
      const total = formatMusicTime(musicAudio.duration);
      musicTimeDisplay.textContent = `${current} / ${total}`;
    }
  }
});

musicAudio?.addEventListener("ended", () => {
  playNextMusicTrack();
});

function formatMusicTime(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

musicProgressBar?.addEventListener("click", (event) => {
  if (musicAudio && musicAudio.duration) {
    const rect = musicProgressBar.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const clickedValue = (x / rect.width) * musicAudio.duration;
    musicAudio.currentTime = clickedValue;
  }
});

musicLoopToggle?.addEventListener("click", () => {
  if (!musicAudio) return;
  musicAudio.loop = !musicAudio.loop;
  musicLoopToggle.classList.toggle("is-active", musicAudio.loop);
  musicLoopToggle.title = musicAudio.loop ? "Disable loop" : "Enable loop";
  musicLoopToggle.setAttribute(
    "aria-label",
    musicAudio.loop ? "Disable loop" : "Enable loop"
  );
});

musicShuffleToggle?.addEventListener("click", () => {
  isMusicShuffleEnabled = !isMusicShuffleEnabled;
  musicShuffleToggle.classList.toggle("is-active", isMusicShuffleEnabled);
  musicShuffleToggle.title = isMusicShuffleEnabled ? "Disable shuffle" : "Enable shuffle";
  musicShuffleToggle.setAttribute(
    "aria-label",
    isMusicShuffleEnabled ? "Disable shuffle" : "Enable shuffle"
  );
});

documentItems.forEach((item) => {
  item.addEventListener("click", () => {
    const targetId = item.dataset.docTarget;
    setActiveDocumentTarget(targetId);
    syncRouteWithVisibleWindows({ replace: false });
  });
});

gameFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyGameFilter(button.dataset.gameFilter || "all");
  });
});

gamePlayerLoadButton?.addEventListener("click", () => {
  activateGameFrame(gameDetailFrame);
});

function getVideoForFullscreenButton(button) {
  const card = button.closest(".collection-card, .document-preview, .game-detail-trailer-shell");
  const scopedVideo = card?.querySelector("video");

  if (scopedVideo) {
    return scopedVideo;
  }

  return button.previousElementSibling?.matches?.("video") ? button.previousElementSibling : null;
}

async function requestVideoFullscreen(videoEl, fallbackEl = null) {
  if (!videoEl) {
    return false;
  }

  if (videoEl.webkitEnterFullscreen) {
    videoEl.webkitEnterFullscreen();
    return true;
  }

  if (videoEl.requestFullscreen) {
    await videoEl.requestFullscreen();
    return true;
  }

  if (videoEl.webkitRequestFullscreen) {
    videoEl.webkitRequestFullscreen();
    return true;
  }

  if (fallbackEl?.requestFullscreen) {
    await fallbackEl.requestFullscreen();
    return true;
  }

  if (fallbackEl?.webkitRequestFullscreen) {
    fallbackEl.webkitRequestFullscreen();
    return true;
  }

  return false;
}

videoFullscreenButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    event.stopPropagation();

    const card = button.closest(".collection-card");
    const videoEl = getVideoForFullscreenButton(button);

    if (!videoEl) {
      return;
    }

    bindMediaMuteEnforcement(videoEl);
    bindNativeFullscreenResume(videoEl);
    videoEl.controls = true;
    videoEl.dataset.userAudioEnabled = "true";

    if (isMuted) {
      forceVideoMuted(videoEl);
    } else {
      enforceMediaMuteState(videoEl);
    }

    try {
      videoEl.dataset.nativeFullscreenRequested = "true";
      armNativeFullscreenAutoResume(videoEl);

      const initialPlay = videoEl.play().catch(() => {
        // Fullscreen still needs to be attempted even if playback is temporarily blocked.
      });

      const didRequestFullscreen = await requestVideoFullscreen(videoEl, card);

      if (!didRequestFullscreen) {
        delete videoEl.dataset.nativeFullscreenRequested;
      }

      await initialPlay;
      await videoEl.play().catch(() => {
        // Native controls remain available if the browser still blocks playback.
      });
      resumeNativeFullscreenVideo(videoEl);
    } catch {
      await videoEl.play().catch(() => {
        // Native controls remain available if the browser blocks playback.
      });
      delete videoEl.dataset.nativeFullscreenRequested;
      delete videoEl.dataset.nativeFullscreenAutoResume;
      window.clearTimeout(nativeFullscreenAutoResumeTimers.get(videoEl));
      nativeFullscreenAutoResumeTimers.delete(videoEl);
      // Ignore rejected fullscreen requests triggered by browser policy edge cases.
    }
  });
});

document.addEventListener("fullscreenchange", () => {
  const fullscreenVideo = getFullscreenVideoElement();

  if (fullscreenVideo) {
    bindNativeFullscreenResume(fullscreenVideo);
    fullscreenVideo.dataset.nativeFullscreenRequested = "true";
    armNativeFullscreenAutoResume(fullscreenVideo);
    resumeNativeFullscreenVideo(fullscreenVideo);
  }

  document.querySelectorAll("video[data-native-fullscreen-requested='true']").forEach((videoEl) => {
    if (document.fullscreenElement === videoEl || document.fullscreenElement?.contains?.(videoEl)) {
      armNativeFullscreenAutoResume(videoEl);
      resumeNativeFullscreenVideo(videoEl);
      return;
    }

    delete videoEl.dataset.nativeFullscreenRequested;
    delete videoEl.dataset.nativeFullscreenAutoResume;
    window.clearTimeout(nativeFullscreenAutoResumeTimers.get(videoEl));
    nativeFullscreenAutoResumeTimers.delete(videoEl);
    requestMediaVisibilitySync();
  });
});

let mediaVisibilitySyncFrame = 0;

function requestMediaVisibilitySync() {
  if (mediaVisibilitySyncFrame) {
    return;
  }

  mediaVisibilitySyncFrame = window.requestAnimationFrame(() => {
    mediaVisibilitySyncFrame = 0;
    syncEmbeddedFrameAudioState();
    syncVisibleMediaPlayback();
  });
}

document.addEventListener("scroll", requestMediaVisibilitySync, true);
window.addEventListener("resize", requestMediaVisibilitySync);

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

document.addEventListener("click", (event) => {
  const context = getLightboxContextFromTarget(event.target);

  if (!context?.elements.length) {
    return;
  }

  event.preventDefault();
  const items = getLightboxItemsFromElements(context.elements);
  const index = context.elements.indexOf(context.active);
  openMediaLightbox(items, Math.max(index, 0));
});

mediaLightboxClose?.addEventListener("click", closeMediaLightbox);
mediaLightboxPrev?.addEventListener("click", () => moveMediaLightbox(-1));
mediaLightboxNext?.addEventListener("click", () => moveMediaLightbox(1));
mediaLightbox?.addEventListener("click", (event) => {
  if (event.target === mediaLightbox) {
    closeMediaLightbox();
  }
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

document.addEventListener("pointerdown", (event) => {
  if (!musicPanel || musicPanel.classList.contains("is-collapsed")) {
    return;
  }

  if (musicPanel.contains(event.target)) {
    return;
  }

  closeMusicPanel();
});

syncViewportInsets();
window.visualViewport?.addEventListener("resize", syncViewportInsets);
window.visualViewport?.addEventListener("scroll", syncViewportInsets);
window.visualViewport?.addEventListener("resize", syncResponsiveWindowLayout);
window.visualViewport?.addEventListener("scroll", syncResponsiveWindowLayout);
window.addEventListener("resize", () => {
  syncViewportInsets();
  syncResponsiveWindowLayout();
});

musicSearchInput?.addEventListener("input", populateMusicTracks);

bootScreen?.addEventListener("pointerdown", () => completeBootScreen({ immediate: true }), { once: true });
window.addEventListener("keydown", () => completeBootScreen({ immediate: true }), { once: true });

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
  MUSIC_TRACKS = [...SOUNDCLOUD_MUSIC_TRACKS];
  populateMusicTracks();
  setMusicSource(DEFAULT_SOUNDCLOUD_MUSIC_TRACK);
  if (musicAudio && musicVolume) {
    musicAudio.volume = Number.parseFloat(musicVolume.value || "0.45");
  }
  updateMusicPlayLabel();
  reorderGameCollection();
  applyGameFilter("all");
  setupCursorEffect();
  setupGameDetailTrailerAutoplay();
  setupHoverTrailerPreviews();
  syncResponsiveWindowLayout();
  arrangeVisiblePanels();
  syncFullscreenState();
  updateThemeToggleLabel();
  applyWallpaperMode(getStoredWallpaperMode());
  applyCrtEffectState(false);
  updateSoundToggleLabel();
  initializeVideoMuteDefaults();
  enableAutoplayForVideos();
  bindGameFrameAudioSync();
  syncMediaMutedState();
  renderTaskbarTabs();
  applyRouteFromLocation();
  updateTaskbarClock();
  window.setInterval(updateTaskbarClock, 1000);
  document.body.classList.add("is-ready");
  completeBootScreen({ immediate: bootScreen?.dataset.skipRequested === "true" });
});
