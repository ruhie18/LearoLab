import { useState, useEffect, useMemo, createContext, useContext } from "react";
import { ArrowLeft, Users, Flame, Award, Palette, Check, Target } from "lucide-react";

const FONT_ID = "kids-trail-fonts-v3";
function useFonts() {
  if (typeof document !== "undefined" && !document.getElementById(FONT_ID)) {
    const link = document.createElement("link");
    link.id = FONT_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700&display=swap";
    document.head.appendChild(link);
  }
}

const ANIM_ID = "learolab-anim-styles";
function useAnimStyles() {
  if (typeof document !== "undefined" && !document.getElementById(ANIM_ID)) {
    const style = document.createElement("style");
    style.id = ANIM_ID;
    style.textContent = `
      @keyframes lpPop {0%{transform:scale(.5);opacity:0}60%{transform:scale(1.18);opacity:1}100%{transform:scale(1);opacity:1}}
      @keyframes lpFloatUp {0%{transform:translateY(6px);opacity:0}30%{opacity:1}100%{transform:translateY(-26px);opacity:0}}
      .lp-pop{animation:lpPop .4s ease;}
      .lp-confetti{display:inline-block;animation:lpFloatUp 1.1s ease forwards;}
    `;
    document.head.appendChild(style);
  }
}

// ---------------- themes ----------------
const THEMES = {
  jungle: {
    key: "jungle", name: "Jungle Explorer", emoji: "🦊",
    bg: "#FFF8EC", ink: "#3A332A", cardBg: "#FFFFFF", border: "#EFE3C8",
    primary: "#4CAF7D", primaryDark: "#3A8F63",
    secondary: "#4FB4E8", secondaryDark: "#2E8FC2",
    tertiary: "#8B6FB3", accent: "#FF6B5B",
    sunny: "#FFC93C", sunnyDark: "#E8A800",
    mascotBody: "#FF8A5B", mascotInner: "#FFE3D0",
  },
  ocean: {
    key: "ocean", name: "Ocean Explorer", emoji: "🐬",
    bg: "#EAF6FB", ink: "#1E3A4A", cardBg: "#FFFFFF", border: "#CDEAF2",
    primary: "#2FA6A6", primaryDark: "#1F7A7A",
    secondary: "#3E7CB1", secondaryDark: "#2A5A87",
    tertiary: "#6E9FD1", accent: "#FF8C6B",
    sunny: "#FFD166", sunnyDark: "#E0A93C",
    mascotBody: "#4FB4E8", mascotInner: "#E3F6FF",
  },
  space: {
    key: "space", name: "Space Voyager", emoji: "🚀",
    bg: "#191B33", ink: "#F1EFFF", cardBg: "#242650", border: "#33355C",
    primary: "#7C6FF0", primaryDark: "#5B4FD1",
    secondary: "#3FC1C9", secondaryDark: "#2A9BA3",
    tertiary: "#F45B9E", accent: "#FF6B5B",
    sunny: "#FFD93C", sunnyDark: "#E8B800",
    mascotBody: "#7C6FF0", mascotInner: "#C9C2FF",
  },
  candy: {
    key: "candy", name: "Candy Kingdom", emoji: "🦄",
    bg: "#FFF0F7", ink: "#5A3350", cardBg: "#FFFFFF", border: "#FBD9EB",
    primary: "#E85D9C", primaryDark: "#C13F7C",
    secondary: "#7C6FF0", secondaryDark: "#5B4FD1",
    tertiary: "#4FB4E8", accent: "#FF9F4F",
    sunny: "#FFD166", sunnyDark: "#E0A93C",
    mascotBody: "#F49AC1", mascotInner: "#FFE3F0",
  },
};

const ThemeContext = createContext(THEMES.jungle);
const useTheme = () => useContext(ThemeContext);

function Logo({ size = 92 }) {
  const t = useTheme();
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={size} height={size * 0.8} viewBox="0 0 200 160" aria-hidden="true">
        <rect x="30" y="18" width="140" height="120" rx="14" fill={t.cardBg} stroke={t.ink} strokeWidth="3" />
        <path d="M 170 108 L 170 138 L 140 138 Z" fill={t.sunny} stroke={t.ink} strokeWidth="2" strokeLinejoin="round" />
        <g stroke={t.ink} strokeWidth="2" fill="none">
          <ellipse cx="40" cy="34" rx="5" ry="8" /><ellipse cx="40" cy="54" rx="5" ry="8" /><ellipse cx="40" cy="74" rx="5" ry="8" />
          <ellipse cx="40" cy="94" rx="5" ry="8" /><ellipse cx="40" cy="114" rx="5" ry="8" /><ellipse cx="40" cy="130" rx="5" ry="8" />
        </g>
        <circle cx="72" cy="46" r="11" fill={t.sunny} stroke={t.ink} strokeWidth="2" />
        <path d="M 66 46 Q 72 51 78 46" stroke={t.ink} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 100 70 L 103 78 L 111 78 L 104 83 L 107 91 L 100 86 L 93 91 L 96 83 L 89 78 L 97 78 Z" fill={t.primary} stroke={t.ink} strokeWidth="1.5" />
        <path d="M 78 108 Q 95 100 112 110 Q 129 120 146 108" stroke={t.accent} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
      <p style={{ fontFamily: "Fredoka", fontWeight: 700, fontSize: 24, margin: "2px 0 0", letterSpacing: 0.2 }}>
        <span style={{ color: t.ink }}>Learo</span><span style={{ color: t.accent }}>Lab</span>
      </p>
    </div>
  );
}

// ---------------- shared bits ----------------
function Mascot({ mood = "happy", size = 64 }) {
  const t = useTheme();
  const mouth =
    mood === "happy" ? "M 40 62 Q 50 72 60 62" : mood === "thinking" ? "M 42 65 Q 50 62 58 65" : "M 40 66 Q 50 58 60 66";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <ellipse cx="50" cy="58" rx="34" ry="30" fill={t.mascotBody} />
      <path d="M 22 34 L 12 8 L 38 26 Z" fill={t.mascotBody} />
      <path d="M 78 34 L 88 8 L 62 26 Z" fill={t.mascotBody} />
      <path d="M 22 34 L 17 16 L 33 27 Z" fill={t.mascotInner} />
      <path d="M 78 34 L 83 16 L 67 27 Z" fill={t.mascotInner} />
      <ellipse cx="50" cy="66" rx="18" ry="14" fill={t.mascotInner} />
      <circle cx="38" cy="52" r="5" fill="#2B2B2B" />
      <circle cx="62" cy="52" r="5" fill="#2B2B2B" />
      <circle cx="39.5" cy="50.5" r="1.4" fill="#fff" />
      <circle cx="63.5" cy="50.5" r="1.4" fill="#fff" />
      <ellipse cx="50" cy="60" rx="4" ry="3" fill="#2B2B2B" />
      <path d={mouth} stroke="#2B2B2B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function TrailDots({ total, current }) {
  const t = useTheme();
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 18 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ width: i === current ? 22 : 12, height: 12, borderRadius: 999, background: i < current ? t.primary : i === current ? t.sunny : t.border, transition: "all .25s ease" }} />
      ))}
    </div>
  );
}

function BigButton({ children, onClick, bg, disabled, fontSize = 20 }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 600, fontSize, color: "#fff", background: bg, border: "none", borderRadius: 18, padding: "14px 16px", cursor: disabled ? "default" : "pointer", boxShadow: "0 4px 0 rgba(0,0,0,0.18)", width: "100%" }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(3px)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {children}
    </button>
  );
}

// Consistent back-navigation header used on every non-hub, non-age-select screen
function ScreenHeader({ title, onBack }) {
  const t = useTheme();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <button
        onClick={onBack}
        aria-label="Back"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 999, background: t.cardBg, border: `2px solid ${t.border}`, color: t.ink, cursor: "pointer", flexShrink: 0 }}
      >
        <ArrowLeft size={18} />
      </button>
      {title && <h2 style={{ fontFamily: "Fredoka", color: t.ink, margin: 0, fontSize: 18 }}>{title}</h2>}
    </div>
  );
}

function LessonShell({ children, mood, title, onExit }) {
  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <ScreenHeader title={title} onBack={onExit} />
      <div style={{ textAlign: "center", marginBottom: 8 }}><Mascot mood={mood} /></div>
      {children}
    </div>
  );
}

// Confetti-pop shown on correct answers
function Celebration() {
  return (
    <div aria-hidden="true" style={{ fontSize: 24, marginTop: 6 }} className="lp-pop">
      <span className="lp-confetti">🎉</span> <span className="lp-confetti" style={{ animationDelay: ".08s" }}>✨</span> <span className="lp-confetti" style={{ animationDelay: ".16s" }}>🎊</span>
    </div>
  );
}

// ---------------- question banks ----------------
const READING_TIERS = {
  1: [
    { word: "SUN", emoji: "☀️", options: ["SUN", "FUN", "RUN"] },
    { word: "CAT", emoji: "🐱", options: ["BAT", "CAT", "HAT"] },
    { word: "DOG", emoji: "🐶", options: ["DOG", "LOG", "FOG"] },
    { word: "PIG", emoji: "🐷", options: ["PIG", "BIG", "DIG"] },
    { word: "BUS", emoji: "🚌", options: ["BUS", "BUN", "BUD"] },
    { word: "CUP", emoji: "☕", options: ["CUP", "CUT", "CUB"] },
    { word: "HAT", emoji: "🎩", options: ["HAT", "HAM", "HAS"] },
    { word: "BED", emoji: "🛏️", options: ["BED", "BEG", "BEE"] },
    { word: "BOX", emoji: "📦", options: ["BOX", "FOX", "BOY"] },
    { word: "BEE", emoji: "🐝", options: ["BEE", "SEE", "TEA"] },
    { word: "MAT", emoji: "🧘", options: ["MAT", "BAT", "MAP"] },
    { word: "JAM", emoji: "🍯", options: ["JAM", "HAM", "JAR"] },
    { word: "FAN", emoji: "🌬️", options: ["FAN", "FUN", "MAN"] },
    { word: "POT", emoji: "🍲", options: ["POT", "POP", "DOT"] },
    { word: "RUG", emoji: "🟫", options: ["RUG", "RUN", "BUG"] },
    { word: "MUG", emoji: "☕", options: ["MUG", "MUD", "BUG"] },
    { word: "PEN", emoji: "🖊️", options: ["PEN", "PET", "TEN"] },
    { word: "NET", emoji: "🥅", options: ["NET", "NEW", "WET"] },
    { word: "GEM", emoji: "💎", options: ["GEM", "GET", "HEM"] },
    { word: "TOP", emoji: "🔝", options: ["TOP", "TIP", "TOY"] },
  ],
  2: [
    { word: "FROG", emoji: "🐸", options: ["FROG", "FLAG", "FRAY"] },
    { word: "STAR", emoji: "⭐", options: ["START", "STAR", "SCAR"] },
    { word: "FISH", emoji: "🐟", options: ["FISH", "WISH", "DISH"] },
    { word: "TREE", emoji: "🌳", options: ["TREE", "FREE", "THREE"] },
    { word: "MOON", emoji: "🌙", options: ["MOON", "NOON", "SOON"] },
    { word: "BOOK", emoji: "📖", options: ["BOOK", "LOOK", "COOK"] },
    { word: "DUCK", emoji: "🦆", options: ["DUCK", "LUCK", "TUCK"] },
    { word: "KITE", emoji: "🪁", options: ["KITE", "BITE", "SITE"] },
    { word: "LION", emoji: "🦁", options: ["LION", "LOAN", "LOON"] },
    { word: "SHIP", emoji: "🚢", options: ["SHIP", "CHIP", "SHOP"] },
    { word: "BEAR", emoji: "🐻", options: ["BEAR", "BEAT", "BEAM"] },
    { word: "CAKE", emoji: "🎂", options: ["CAKE", "LAKE", "CASE"] },
    { word: "LEAF", emoji: "🍁", options: ["LEAF", "LOAF", "LEAK"] },
    { word: "NEST", emoji: "🪹", options: ["NEST", "BEST", "NEXT"] },
    { word: "SNOW", emoji: "❄️", options: ["SNOW", "SHOW", "SLOW"] },
    { word: "WAVE", emoji: "🌊", options: ["WAVE", "CAVE", "WAVY"] },
    { word: "BELL", emoji: "🔔", options: ["BELL", "BALL", "BULL"] },
    { word: "GOAT", emoji: "🐐", options: ["GOAT", "COAT", "BOAT"] },
    { word: "CLAM", emoji: "🦪", options: ["CLAM", "CLAP", "CLAW"] },
    { word: "VASE", emoji: "🏺", options: ["VASE", "BASE", "CASE"] },
  ],
  3: [
    { word: "PLANET", emoji: "🪐", options: ["PLANET", "PLANT", "PLATE"] },
    { word: "FLOWER", emoji: "🌸", options: ["FLOUR", "FLOWER", "FLAVOR"] },
    { word: "DRAGON", emoji: "🐉", options: ["DRAGON", "WAGON", "DRAGGED"] },
    { word: "RAINBOW", emoji: "🌈", options: ["RAINBOW", "RAINCOAT", "RAINY"] },
    { word: "ELEPHANT", emoji: "🐘", options: ["ELEPHANT", "ELEGANT", "ELEMENT"] },
    { word: "MOUNTAIN", emoji: "⛰️", options: ["MOUNTAIN", "FOUNTAIN", "COUNTING"] },
    { word: "BUTTERFLY", emoji: "🦋", options: ["BUTTERFLY", "BUTTERCUP", "BATTERY"] },
    { word: "OCTOPUS", emoji: "🐙", options: ["OCTOPUS", "OCTAGON", "OCTOBER"] },
    { word: "PENGUIN", emoji: "🐧", options: ["PENGUIN", "PENCIL", "PENNANT"] },
    { word: "VOLCANO", emoji: "🌋", options: ["VOLCANO", "VOLUME", "VOYAGE"] },
    { word: "DINOSAUR", emoji: "🦕", options: ["DINOSAUR", "DINNER", "DISASTER"] },
    { word: "CRYSTAL", emoji: "💎", options: ["CRYSTAL", "CRISPY", "CRYING"] },
    { word: "TELESCOPE", emoji: "🔭", options: ["TELESCOPE", "TELEPHONE", "TELEVISION"] },
    { word: "ADVENTURE", emoji: "🗺️", options: ["ADVENTURE", "ADVENTURED", "ADVENT"] },
    { word: "TREASURE", emoji: "💰", options: ["TREASURE", "TREATMENT", "TREASON"] },
    { word: "WHISPER", emoji: "🤫", options: ["WHISPER", "WHISTLE", "WINTER"] },
    { word: "GALAXY", emoji: "🌌", options: ["GALAXY", "GALLERY", "GALLON"] },
    { word: "JOURNEY", emoji: "🧭", options: ["JOURNEY", "JOURNAL", "JOUST"] },
    { word: "SHADOW", emoji: "🌑", options: ["SHADOW", "SHALLOW", "SHATTER"] },
    { word: "CASTLE", emoji: "🏰", options: ["CASTLE", "CATTLE", "CASTAWAY"] },
  ],
};
const SCIENCE_TIERS = {
  1: [
    { q: "Which animal says 'Moo'?", correct: "Cow", options: [{ l: "Cow", e: "🐮" }, { l: "Dog", e: "🐶" }, { l: "Cat", e: "🐱" }] },
    { q: "What do we use to see?", correct: "Eyes", options: [{ l: "Eyes", e: "👀" }, { l: "Ears", e: "👂" }, { l: "Nose", e: "👃" }] },
    { q: "Which one is a fruit?", correct: "Apple", options: [{ l: "Apple", e: "🍎" }, { l: "Carrot", e: "🥕" }, { l: "Potato", e: "🥔" }] },
    { q: "What do we use to hear?", correct: "Ears", options: [{ l: "Ears", e: "👂" }, { l: "Eyes", e: "👀" }, { l: "Mouth", e: "👄" }] },
    { q: "Which animal has a trunk?", correct: "Elephant", options: [{ l: "Elephant", e: "🐘" }, { l: "Dog", e: "🐶" }, { l: "Cat", e: "🐱" }] },
    { q: "What do bees make?", correct: "Honey", options: [{ l: "Honey", e: "🍯" }, { l: "Milk", e: "🥛" }, { l: "Juice", e: "🧃" }] },
    { q: "Which of these can fly?", correct: "Bird", options: [{ l: "Bird", e: "🐦" }, { l: "Fish", e: "🐟" }, { l: "Frog", e: "🐸" }] },
    { q: "What color is grass?", correct: "Green", options: [{ l: "Green", e: "🟢" }, { l: "Blue", e: "🔵" }, { l: "Red", e: "🔴" }] },
    { q: "Which animal says 'Woof'?", correct: "Dog", options: [{ l: "Dog", e: "🐶" }, { l: "Cat", e: "🐱" }, { l: "Cow", e: "🐮" }] },
    { q: "What do we drink when thirsty?", correct: "Water", options: [{ l: "Water", e: "💧" }, { l: "Sand", e: "🏖️" }, { l: "Rocks", e: "🪨" }] },
    { q: "Which animal says 'Meow'?", correct: "Cat", options: [{ l: "Cat", e: "🐱" }, { l: "Dog", e: "🐶" }, { l: "Cow", e: "🐮" }] },
    { q: "What do we use to smell?", correct: "Nose", options: [{ l: "Nose", e: "👃" }, { l: "Eyes", e: "👀" }, { l: "Ears", e: "👂" }] },
    { q: "Which one is a vegetable?", correct: "Carrot", options: [{ l: "Carrot", e: "🥕" }, { l: "Apple", e: "🍎" }, { l: "Banana", e: "🍌" }] },
    { q: "How many wings does a bird have?", correct: "2", options: [{ l: "2", e: "2️⃣" }, { l: "4", e: "4️⃣" }, { l: "6", e: "6️⃣" }] },
    { q: "Which animal lives in water?", correct: "Fish", options: [{ l: "Fish", e: "🐟" }, { l: "Dog", e: "🐶" }, { l: "Cat", e: "🐱" }] },
    { q: "What do we use to walk?", correct: "Legs", options: [{ l: "Legs", e: "🦵" }, { l: "Arms", e: "💪" }, { l: "Head", e: "🗣️" }] },
    { q: "Which season comes right after winter?", correct: "Spring", options: [{ l: "Spring", e: "🌱" }, { l: "Summer", e: "☀️" }, { l: "Fall", e: "🍂" }] },
    { q: "What do cows give us?", correct: "Milk", options: [{ l: "Milk", e: "🥛" }, { l: "Honey", e: "🍯" }, { l: "Juice", e: "🧃" }] },
    { q: "Which fruit is yellow and curved?", correct: "Banana", options: [{ l: "Banana", e: "🍌" }, { l: "Apple", e: "🍎" }, { l: "Grape", e: "🍇" }] },
    { q: "Which one is a bird?", correct: "Duck", options: [{ l: "Duck", e: "🦆" }, { l: "Fish", e: "🐟" }, { l: "Frog", e: "🐸" }] },
  ],
  2: [
    { q: "What do plants need to grow?", correct: "Water", options: [{ l: "Water", e: "💧" }, { l: "Rocks", e: "🪨" }, { l: "Shoes", e: "👟" }] },
    { q: "What is a baby dog called?", correct: "Puppy", options: [{ l: "Puppy", e: "🐶" }, { l: "Kitten", e: "🐱" }, { l: "Cub", e: "🐻" }] },
    { q: "Where do fish live?", correct: "Water", options: [{ l: "Water", e: "🌊" }, { l: "Trees", e: "🌳" }, { l: "Sky", e: "☁️" }] },
    { q: "What is a baby cow called?", correct: "Calf", options: [{ l: "Calf", e: "🐄" }, { l: "Kitten", e: "🐱" }, { l: "Puppy", e: "🐶" }] },
    { q: "Which season is the coldest?", correct: "Winter", options: [{ l: "Winter", e: "❄️" }, { l: "Summer", e: "☀️" }, { l: "Spring", e: "🌱" }] },
    { q: "What do we call frozen water?", correct: "Ice", options: [{ l: "Ice", e: "🧊" }, { l: "Steam", e: "💨" }, { l: "Sand", e: "🏖️" }] },
    { q: "Which part of a plant grows underground?", correct: "Roots", options: [{ l: "Roots", e: "🌱" }, { l: "Leaves", e: "🍃" }, { l: "Flowers", e: "🌸" }] },
    { q: "Which animal lives in a hive?", correct: "Bee", options: [{ l: "Bee", e: "🐝" }, { l: "Ant", e: "🐜" }, { l: "Spider", e: "🕷️" }] },
    { q: "What do caterpillars turn into?", correct: "Butterfly", options: [{ l: "Butterfly", e: "🦋" }, { l: "Ladybug", e: "🐞" }, { l: "Grasshopper", e: "🦗" }] },
    { q: "Which of these is a mammal?", correct: "Whale", options: [{ l: "Whale", e: "🐳" }, { l: "Shark", e: "🦈" }, { l: "Octopus", e: "🐙" }] },
    { q: "What do we call a baby sheep?", correct: "Lamb", options: [{ l: "Lamb", e: "🐑" }, { l: "Kid", e: "🐐" }, { l: "Calf", e: "🐄" }] },
    { q: "Which sense do we use to taste food?", correct: "Tongue", options: [{ l: "Tongue", e: "👅" }, { l: "Nose", e: "👃" }, { l: "Ears", e: "👂" }] },
    { q: "What is the main gas in the air we breathe?", correct: "Oxygen", options: [{ l: "Oxygen", e: "🫁" }, { l: "Helium", e: "🎈" }, { l: "Smoke", e: "💨" }] },
    { q: "Which planet is known as the Red Planet?", correct: "Mars", options: [{ l: "Mars", e: "🔴" }, { l: "Earth", e: "🌍" }, { l: "Venus", e: "🌟" }] },
    { q: "Which organ pumps blood in our body?", correct: "Heart", options: [{ l: "Heart", e: "❤️" }, { l: "Lungs", e: "🫁" }, { l: "Brain", e: "🧠" }] },
    { q: "What do spiders spin?", correct: "Webs", options: [{ l: "Webs", e: "🕸️" }, { l: "Nests", e: "🪹" }, { l: "Cocoons", e: "🐛" }] },
    { q: "In which season do leaves usually fall?", correct: "Autumn", options: [{ l: "Autumn", e: "🍂" }, { l: "Spring", e: "🌱" }, { l: "Summer", e: "☀️" }] },
    { q: "What do we call water falling from clouds?", correct: "Rain", options: [{ l: "Rain", e: "🌧️" }, { l: "Snow", e: "❄️" }, { l: "Fog", e: "🌫️" }] },
    { q: "Which animal is the tallest in the world?", correct: "Giraffe", options: [{ l: "Giraffe", e: "🦒" }, { l: "Elephant", e: "🐘" }, { l: "Horse", e: "🐴" }] },
    { q: "What do we call an animal that eats both plants and meat?", correct: "Omnivore", options: [{ l: "Omnivore", e: "🍽️" }, { l: "Herbivore", e: "🌿" }, { l: "Carnivore", e: "🍖" }] },
  ],
  3: [
    { q: "Which planet do we live on?", correct: "Earth", options: [{ l: "Earth", e: "🌍" }, { l: "Mars", e: "🔴" }, { l: "Moon", e: "🌕" }] },
    { q: "What gives us light in the day?", correct: "Sun", options: [{ l: "Sun", e: "☀️" }, { l: "Moon", e: "🌙" }, { l: "Stars", e: "✨" }] },
    { q: "What do bees make?", correct: "Honey", options: [{ l: "Honey", e: "🍯" }, { l: "Milk", e: "🥛" }, { l: "Bread", e: "🍞" }] },
    { q: "How many planets are in our solar system?", correct: "8", options: [{ l: "8", e: "🪐" }, { l: "6", e: "🪐" }, { l: "10", e: "🪐" }] },
    { q: "What do we call animals that only eat plants?", correct: "Herbivores", options: [{ l: "Herbivores", e: "🌿" }, { l: "Carnivores", e: "🍖" }, { l: "Omnivores", e: "🍽️" }] },
    { q: "What force pulls objects toward Earth?", correct: "Gravity", options: [{ l: "Gravity", e: "🌎" }, { l: "Magnetism", e: "🧲" }, { l: "Friction", e: "⚙️" }] },
    { q: "What do plants use sunlight to make?", correct: "Food", options: [{ l: "Food", e: "🌱" }, { l: "Rocks", e: "🪨" }, { l: "Metal", e: "⚙️" }] },
    { q: "Which gas do plants release that we breathe in?", correct: "Oxygen", options: [{ l: "Oxygen", e: "🫁" }, { l: "Carbon Dioxide", e: "💨" }, { l: "Nitrogen", e: "🎈" }] },
    { q: "What is the closest planet to the sun?", correct: "Mercury", options: [{ l: "Mercury", e: "☄️" }, { l: "Venus", e: "🌟" }, { l: "Earth", e: "🌍" }] },
    { q: "Which of these is the largest ocean?", correct: "Pacific", options: [{ l: "Pacific", e: "🌊" }, { l: "Atlantic", e: "🌊" }, { l: "Arctic", e: "🌊" }] },
    { q: "What is the process plants use to make food called?", correct: "Photosynthesis", options: [{ l: "Photosynthesis", e: "🌿" }, { l: "Respiration", e: "🫁" }, { l: "Digestion", e: "🍽️" }] },
    { q: "Which layer of Earth is the hottest?", correct: "Core", options: [{ l: "Core", e: "🌋" }, { l: "Crust", e: "🪨" }, { l: "Mantle", e: "🌍" }] },
    { q: "What do we call the study of stars and space?", correct: "Astronomy", options: [{ l: "Astronomy", e: "🔭" }, { l: "Biology", e: "🧬" }, { l: "Geology", e: "🪨" }] },
    { q: "Which gas makes up most of Earth's atmosphere?", correct: "Nitrogen", options: [{ l: "Nitrogen", e: "💨" }, { l: "Oxygen", e: "🫁" }, { l: "Carbon Dioxide", e: "🎈" }] },
    { q: "What is the smallest unit of matter called?", correct: "Atom", options: [{ l: "Atom", e: "⚛️" }, { l: "Cell", e: "🦠" }, { l: "Molecule", e: "🧪" }] },
    { q: "Which of these animals is a reptile?", correct: "Snake", options: [{ l: "Snake", e: "🐍" }, { l: "Dog", e: "🐶" }, { l: "Cat", e: "🐱" }] },
    { q: "What do we call a group of stars forming a pattern?", correct: "Constellation", options: [{ l: "Constellation", e: "✨" }, { l: "Galaxy", e: "🌌" }, { l: "Nebula", e: "💫" }] },
    { q: "Which body part controls the entire body?", correct: "Brain", options: [{ l: "Brain", e: "🧠" }, { l: "Heart", e: "❤️" }, { l: "Lungs", e: "🫁" }] },
    { q: "Which planet has famous rings around it?", correct: "Saturn", options: [{ l: "Saturn", e: "🪐" }, { l: "Jupiter", e: "🪐" }, { l: "Mars", e: "🔴" }] },
    { q: "What is the chemical formula for water?", correct: "H2O", options: [{ l: "H2O", e: "💧" }, { l: "CO2", e: "💨" }, { l: "O2", e: "🫁" }] },
  ],
};
const GK_TIERS = {
  1: [
    { q: "What color is the sky?", correct: "Blue", options: [{ l: "Blue", e: "🔵" }, { l: "Green", e: "🟢" }, { l: "Red", e: "🔴" }] },
    { q: "How many legs does a dog have?", correct: "4", options: [{ l: "2", e: "2️⃣" }, { l: "4", e: "4️⃣" }, { l: "6", e: "6️⃣" }] },
    { q: "Which one is a shape?", correct: "Circle", options: [{ l: "Circle", e: "⭕" }, { l: "Banana", e: "🍌" }, { l: "Dog", e: "🐶" }] },
    { q: "How many eyes do you have?", correct: "2", options: [{ l: "1", e: "1️⃣" }, { l: "2", e: "2️⃣" }, { l: "3", e: "3️⃣" }] },
    { q: "Which one is a fruit?", correct: "Apple", options: [{ l: "Apple", e: "🍎" }, { l: "Carrot", e: "🥕" }, { l: "Bread", e: "🍞" }] },
    { q: "Which color do you get mixing blue and yellow?", correct: "Green", options: [{ l: "Green", e: "🟢" }, { l: "Purple", e: "🟣" }, { l: "Orange", e: "🟠" }] },
    { q: "Which shape has 3 sides?", correct: "Triangle", options: [{ l: "Triangle", e: "🔺" }, { l: "Square", e: "⬛" }, { l: "Star", e: "⭐" }] },
    { q: "Which one is a vegetable?", correct: "Carrot", options: [{ l: "Carrot", e: "🥕" }, { l: "Apple", e: "🍎" }, { l: "Banana", e: "🍌" }] },
    { q: "What do you wear on your feet?", correct: "Shoes", options: [{ l: "Shoes", e: "👟" }, { l: "Hat", e: "🧢" }, { l: "Gloves", e: "🧤" }] },
    { q: "Which one is a pet?", correct: "Cat", options: [{ l: "Cat", e: "🐱" }, { l: "Lion", e: "🦁" }, { l: "Shark", e: "🦈" }] },
    { q: "Which is a farm animal?", correct: "Cow", options: [{ l: "Cow", e: "🐮" }, { l: "Lion", e: "🦁" }, { l: "Tiger", e: "🐯" }] },
    { q: "What do we use to write?", correct: "Pencil", options: [{ l: "Pencil", e: "✏️" }, { l: "Spoon", e: "🥄" }, { l: "Fork", e: "🍴" }] },
    { q: "Which one is a bird?", correct: "Parrot", options: [{ l: "Parrot", e: "🦜" }, { l: "Dog", e: "🐶" }, { l: "Fish", e: "🐟" }] },
    { q: "What do we call the star closest to Earth?", correct: "Sun", options: [{ l: "Sun", e: "☀️" }, { l: "Moon", e: "🌙" }, { l: "Star", e: "⭐" }] },
    { q: "Which is a cold food?", correct: "Ice cream", options: [{ l: "Ice cream", e: "🍦" }, { l: "Soup", e: "🍲" }, { l: "Tea", e: "☕" }] },
    { q: "How many fingers are on one hand?", correct: "5", options: [{ l: "3", e: "3️⃣" }, { l: "5", e: "5️⃣" }, { l: "7", e: "7️⃣" }] },
    { q: "Which of these is a mode of transport?", correct: "Car", options: [{ l: "Car", e: "🚗" }, { l: "Chair", e: "🪑" }, { l: "Table", e: "🍽️" }] },
    { q: "What do we use to cut paper?", correct: "Scissors", options: [{ l: "Scissors", e: "✂️" }, { l: "Spoon", e: "🥄" }, { l: "Comb", e: "💇" }] },
    { q: "What color is a banana?", correct: "Yellow", options: [{ l: "Yellow", e: "🟡" }, { l: "Purple", e: "🟣" }, { l: "Blue", e: "🔵" }] },
    { q: "How many wheels does a bicycle have?", correct: "2", options: [{ l: "1", e: "1️⃣" }, { l: "2", e: "2️⃣" }, { l: "4", e: "4️⃣" }] },
  ],
  2: [
    { q: "How many days are in a week?", correct: "7", options: [{ l: "5", e: "5️⃣" }, { l: "7", e: "7️⃣" }, { l: "10", e: "🔟" }] },
    { q: "What do we call a baby cat?", correct: "Kitten", options: [{ l: "Kitten", e: "🐱" }, { l: "Puppy", e: "🐶" }, { l: "Cub", e: "🐻" }] },
    { q: "Which country has the Eiffel Tower?", correct: "France", options: [{ l: "France", e: "🇫🇷" }, { l: "Italy", e: "🇮🇹" }, { l: "Spain", e: "🇪🇸" }] },
    { q: "How many months are in a year?", correct: "12", options: [{ l: "10", e: "🗓️" }, { l: "12", e: "🗓️" }, { l: "15", e: "🗓️" }] },
    { q: "Which shape has 4 equal sides?", correct: "Square", options: [{ l: "Square", e: "⬛" }, { l: "Triangle", e: "🔺" }, { l: "Star", e: "⭐" }] },
    { q: "What is the opposite of hot?", correct: "Cold", options: [{ l: "Cold", e: "🥶" }, { l: "Warm", e: "☀️" }, { l: "Sunny", e: "🌤️" }] },
    { q: "Which meal do we usually eat in the morning?", correct: "Breakfast", options: [{ l: "Breakfast", e: "🍳" }, { l: "Dinner", e: "🍽️" }, { l: "Midnight snack", e: "🌙" }] },
    { q: "Which animal is known as man's best friend?", correct: "Dog", options: [{ l: "Dog", e: "🐶" }, { l: "Cat", e: "🐱" }, { l: "Bird", e: "🐦" }] },
    { q: "What do we call a person who teaches at school?", correct: "Teacher", options: [{ l: "Teacher", e: "👩‍🏫" }, { l: "Doctor", e: "🩺" }, { l: "Police officer", e: "👮" }] },
    { q: "Which continent has the ancient pyramids?", correct: "Africa", options: [{ l: "Africa", e: "🌍" }, { l: "Americas", e: "🌎" }, { l: "Asia", e: "🌏" }] },
    { q: "Which planet is known for its rings?", correct: "Saturn", options: [{ l: "Saturn", e: "🪐" }, { l: "Mars", e: "🔴" }, { l: "Venus", e: "🌟" }] },
    { q: "What do we call money used in a country?", correct: "Currency", options: [{ l: "Currency", e: "💵" }, { l: "Currently", e: "⏳" }, { l: "Curriculum", e: "📚" }] },
    { q: "Which instrument has 88 keys?", correct: "Piano", options: [{ l: "Piano", e: "🎹" }, { l: "Guitar", e: "🎸" }, { l: "Drum", e: "🥁" }] },
    { q: "What is the freezing point of water?", correct: "0°C", options: [{ l: "0°C", e: "🧊" }, { l: "10°C", e: "🌡️" }, { l: "20°C", e: "☀️" }] },
    { q: "Which country is known for sushi?", correct: "Japan", options: [{ l: "Japan", e: "🇯🇵" }, { l: "France", e: "🇫🇷" }, { l: "Italy", e: "🇮🇹" }] },
    { q: "What do we call a doctor for animals?", correct: "Veterinarian", options: [{ l: "Veterinarian", e: "🐾" }, { l: "Dentist", e: "🦷" }, { l: "Nurse", e: "💉" }] },
    { q: "Which shape has no corners?", correct: "Circle", options: [{ l: "Circle", e: "⭕" }, { l: "Square", e: "⬛" }, { l: "Triangle", e: "🔺" }] },
    { q: "What is the largest mammal in the ocean?", correct: "Whale", options: [{ l: "Whale", e: "🐳" }, { l: "Shark", e: "🦈" }, { l: "Dolphin", e: "🐬" }] },
    { q: "What do we call the place where books are kept?", correct: "Library", options: [{ l: "Library", e: "📚" }, { l: "Museum", e: "🖼️" }, { l: "Bakery", e: "🥖" }] },
    { q: "What do we call a person who flies a plane?", correct: "Pilot", options: [{ l: "Pilot", e: "✈️" }, { l: "Captain", e: "🚢" }, { l: "Driver", e: "🚗" }] },
  ],
  3: [
    { q: "How many continents are there?", correct: "7", options: [{ l: "5", e: "5️⃣" }, { l: "7", e: "7️⃣" }, { l: "9", e: "9️⃣" }] },
    { q: "What is the capital of Japan?", correct: "Tokyo", options: [{ l: "Tokyo", e: "🗼" }, { l: "Beijing", e: "🏯" }, { l: "Seoul", e: "🏙️" }] },
    { q: "Which ocean is the largest?", correct: "Pacific", options: [{ l: "Pacific", e: "🌊" }, { l: "Atlantic", e: "🌊" }, { l: "Arctic", e: "🌊" }] },
    { q: "Which river is the longest in the world?", correct: "Nile", options: [{ l: "Nile", e: "🏞️" }, { l: "Amazon", e: "🏞️" }, { l: "Mississippi", e: "🏞️" }] },
    { q: "How many oceans are there on Earth?", correct: "5", options: [{ l: "3", e: "3️⃣" }, { l: "5", e: "5️⃣" }, { l: "7", e: "7️⃣" }] },
    { q: "What is the largest planet in our solar system?", correct: "Jupiter", options: [{ l: "Jupiter", e: "🪐" }, { l: "Earth", e: "🌍" }, { l: "Mars", e: "🔴" }] },
    { q: "Which country is known for the Great Wall?", correct: "China", options: [{ l: "China", e: "🇨🇳" }, { l: "Japan", e: "🇯🇵" }, { l: "India", e: "🇮🇳" }] },
    { q: "What is the tallest mountain in the world?", correct: "Everest", options: [{ l: "Everest", e: "🏔️" }, { l: "Kilimanjaro", e: "⛰️" }, { l: "Fuji", e: "🗻" }] },
    { q: "What do we call baby frogs?", correct: "Tadpoles", options: [{ l: "Tadpoles", e: "🐸" }, { l: "Cubs", e: "🐻" }, { l: "Fry", e: "🐟" }] },
    { q: "How many days are in a leap year?", correct: "366", options: [{ l: "365", e: "🗓️" }, { l: "366", e: "🗓️" }, { l: "367", e: "🗓️" }] },
    { q: "Which is the smallest country in the world?", correct: "Vatican City", options: [{ l: "Vatican City", e: "⛪" }, { l: "Monaco", e: "🏙️" }, { l: "Malta", e: "🏝️" }] },
    { q: "What do we call a scientist who studies weather?", correct: "Meteorologist", options: [{ l: "Meteorologist", e: "🌦️" }, { l: "Geologist", e: "🪨" }, { l: "Biologist", e: "🧬" }] },
    { q: "Which desert is the largest hot desert in the world?", correct: "Sahara", options: [{ l: "Sahara", e: "🏜️" }, { l: "Gobi", e: "🏜️" }, { l: "Kalahari", e: "🏜️" }] },
    { q: "What is the currency used in the USA?", correct: "Dollar", options: [{ l: "Dollar", e: "💵" }, { l: "Euro", e: "💶" }, { l: "Yen", e: "💴" }] },
    { q: "Which ancient civilization built the pyramids of Giza?", correct: "Egyptians", options: [{ l: "Egyptians", e: "🏺" }, { l: "Romans", e: "🏛️" }, { l: "Greeks", e: "🏺" }] },
    { q: "What do we call the imaginary line around Earth's middle?", correct: "Equator", options: [{ l: "Equator", e: "🌍" }, { l: "Meridian", e: "🧭" }, { l: "Horizon", e: "🌅" }] },
    { q: "Which language has the most native speakers worldwide?", correct: "Mandarin Chinese", options: [{ l: "Mandarin Chinese", e: "🈶" }, { l: "English", e: "🔤" }, { l: "Spanish", e: "🔤" }] },
    { q: "What is the hardest natural substance on Earth?", correct: "Diamond", options: [{ l: "Diamond", e: "💎" }, { l: "Gold", e: "🥇" }, { l: "Iron", e: "⚙️" }] },
    { q: "How many bones are in the adult human body?", correct: "206", options: [{ l: "206", e: "🦴" }, { l: "150", e: "🦴" }, { l: "300", e: "🦴" }] },
    { q: "Which country did paper originate from?", correct: "China", options: [{ l: "China", e: "🇨🇳" }, { l: "Egypt", e: "🇪🇬" }, { l: "Greece", e: "🇬🇷" }] },
  ],
};
const WORDS_TIERS = {
  1: [
    { word: "BIG", emoji: "🐘", meaning: "Very large in size", options: ["Very large in size", "Very small in size", "Very loud noise"] },
    { word: "FAST", emoji: "🐆", meaning: "Moves very quickly", options: ["Moves very quickly", "Moves very slowly", "Stands still"] },
    { word: "HAPPY", emoji: "😊", meaning: "Feeling glad", options: ["Feeling glad", "Feeling sad", "Feeling sleepy"] },
    { word: "SMALL", emoji: "🐭", meaning: "Little in size", options: ["Little in size", "Very large in size", "Very loud"] },
    { word: "LOUD", emoji: "📢", meaning: "Makes a big sound", options: ["Makes a big sound", "Makes no sound", "Very quiet"] },
    { word: "SOFT", emoji: "🧸", meaning: "Gentle to touch", options: ["Gentle to touch", "Hard as a rock", "Very sharp"] },
    { word: "COLD", emoji: "❄️", meaning: "Low in temperature", options: ["Low in temperature", "High in temperature", "Very bright"] },
    { word: "SLEEPY", emoji: "😴", meaning: "Wanting to sleep", options: ["Wanting to sleep", "Full of energy", "Very hungry"] },
    { word: "SHINY", emoji: "✨", meaning: "Reflects light brightly", options: ["Reflects light brightly", "Very dark", "Very rough"] },
    { word: "TALL", emoji: "🦒", meaning: "Great in height", options: ["Great in height", "Short in height", "Round in shape"] },
    { word: "WARM", emoji: "🔥", meaning: "Slightly hot", options: ["Slightly hot", "Very cold", "Very wet"] },
    { word: "WET", emoji: "💧", meaning: "Covered in liquid", options: ["Covered in liquid", "Completely dry", "Very hot"] },
    { word: "DRY", emoji: "🏜️", meaning: "Having no water", options: ["Having no water", "Full of water", "Very cold"] },
    { word: "KIND", emoji: "💗", meaning: "Caring and gentle to others", options: ["Caring and gentle to others", "Mean and unkind", "Very quiet"] },
    { word: "FUNNY", emoji: "😄", meaning: "Makes you laugh", options: ["Makes you laugh", "Makes you cry", "Makes you sleep"] },
    { word: "STRONG", emoji: "💪", meaning: "Having great power", options: ["Having great power", "Having no power", "Very small"] },
    { word: "QUIET", emoji: "🤫", meaning: "Making very little sound", options: ["Making very little sound", "Making a lot of sound", "Very fast"] },
    { word: "EMPTY", emoji: "📭", meaning: "Having nothing inside", options: ["Having nothing inside", "Completely full", "Very heavy"] },
    { word: "SHARP", emoji: "🔪", meaning: "Has a fine cutting edge", options: ["Has a fine cutting edge", "Very dull", "Very soft"] },
    { word: "HEAVY", emoji: "⚖️", meaning: "Weighs a lot", options: ["Weighs a lot", "Weighs very little", "Very tall"] },
  ],
  2: [
    { word: "BRAVE", emoji: "🦸", meaning: "Not afraid of danger", options: ["Not afraid of danger", "Very afraid of everything", "Very sleepy all day"] },
    { word: "GIANT", emoji: "🗻", meaning: "Extremely large", options: ["Extremely large", "Extremely tiny", "Extremely cold"] },
    { word: "CURIOUS", emoji: "🔍", meaning: "Eager to learn or know", options: ["Eager to learn or know", "Not interested at all", "Feeling very tired"] },
    { word: "GENTLE", emoji: "🐑", meaning: "Kind and careful", options: ["Kind and careful", "Rough and careless", "Loud and angry"] },
    { word: "CLEVER", emoji: "🦊", meaning: "Quick to learn and understand", options: ["Quick to learn and understand", "Slow to understand", "Very forgetful"] },
    { word: "PATIENT", emoji: "⏳", meaning: "Able to wait calmly", options: ["Able to wait calmly", "Always in a rush", "Easily upset"] },
    { word: "FRAGILE", emoji: "🥚", meaning: "Easily broken", options: ["Easily broken", "Very strong", "Very heavy"] },
    { word: "JOYFUL", emoji: "🎉", meaning: "Full of happiness", options: ["Full of happiness", "Full of sadness", "Full of worry"] },
    { word: "ENORMOUS", emoji: "🐋", meaning: "Very, very big", options: ["Very, very big", "Very, very small", "Medium sized"] },
    { word: "SILENT", emoji: "🤫", meaning: "Completely quiet", options: ["Completely quiet", "Extremely loud", "Somewhat noisy"] },
    { word: "HONEST", emoji: "🤝", meaning: "Always telling the truth", options: ["Always telling the truth", "Always telling lies", "Never speaking"] },
    { word: "CLUMSY", emoji: "🤦", meaning: "Awkward and likely to drop things", options: ["Awkward and likely to drop things", "Very graceful", "Extremely careful"] },
    { word: "EAGER", emoji: "🙋", meaning: "Very excited and ready", options: ["Very excited and ready", "Very tired and slow", "Not interested"] },
    { word: "STUBBORN", emoji: "🐴", meaning: "Refusing to change your mind", options: ["Refusing to change your mind", "Easily changing your mind", "Always agreeing"] },
    { word: "GRACEFUL", emoji: "🩰", meaning: "Moving in a smooth, beautiful way", options: ["Moving in a smooth, beautiful way", "Moving in a clumsy way", "Standing very still"] },
    { word: "FURIOUS", emoji: "😡", meaning: "Extremely angry", options: ["Extremely angry", "Extremely happy", "Extremely tired"] },
    { word: "ANXIOUS", emoji: "😰", meaning: "Feeling worried or nervous", options: ["Feeling worried or nervous", "Feeling calm and relaxed", "Feeling very sleepy"] },
    { word: "LOYAL", emoji: "🐕", meaning: "Faithful and devoted", options: ["Faithful and devoted", "Always changing sides", "Never trustworthy"] },
    { word: "CHEERFUL", emoji: "😃", meaning: "Happy and full of good spirits", options: ["Happy and full of good spirits", "Sad and gloomy", "Angry and upset"] },
    { word: "LAZY", emoji: "🦥", meaning: "Not willing to work or move", options: ["Not willing to work or move", "Always working hard", "Very energetic"] },
  ],
  3: [
    { word: "ENORMOUS", emoji: "🐳", meaning: "Extremely large in size", options: ["Extremely large in size", "Extremely small in size", "Extremely quiet"] },
    { word: "GENEROUS", emoji: "🎁", meaning: "Willing to give and share", options: ["Willing to give and share", "Unwilling to share anything", "Always in a hurry"] },
    { word: "ANCIENT", emoji: "🏛️", meaning: "Very old, from long ago", options: ["Very old, from long ago", "Brand new today", "Made of gold"] },
    { word: "MYSTERIOUS", emoji: "🔮", meaning: "Difficult to understand or explain", options: ["Difficult to understand or explain", "Completely obvious", "Very boring"] },
    { word: "DETERMINED", emoji: "🎯", meaning: "Firmly decided to succeed", options: ["Firmly decided to succeed", "Ready to give up", "Feeling confused"] },
    { word: "MAGNIFICENT", emoji: "🏰", meaning: "Extremely beautiful or impressive", options: ["Extremely beautiful or impressive", "Very plain and dull", "Slightly broken"] },
    { word: "CAUTIOUS", emoji: "⚠️", meaning: "Careful to avoid danger", options: ["Careful to avoid danger", "Reckless and careless", "Always in a hurry"] },
    { word: "ABUNDANT", emoji: "🌾", meaning: "Existing in large amounts", options: ["Existing in large amounts", "Very rare and scarce", "Completely absent"] },
    { word: "PECULIAR", emoji: "🎭", meaning: "Strange or unusual", options: ["Strange or unusual", "Perfectly normal", "Very organized"] },
    { word: "TRIUMPHANT", emoji: "🏆", meaning: "Feeling victorious after success", options: ["Feeling victorious after success", "Feeling defeated", "Feeling bored"] },
    { word: "RESILIENT", emoji: "🌱", meaning: "Able to recover quickly from difficulty", options: ["Able to recover quickly from difficulty", "Easily broken forever", "Never facing challenges"] },
    { word: "METICULOUS", emoji: "🔬", meaning: "Extremely careful and precise", options: ["Extremely careful and precise", "Very careless and sloppy", "Always in a rush"] },
    { word: "BENEVOLENT", emoji: "🕊️", meaning: "Kind and generous", options: ["Kind and generous", "Cruel and selfish", "Angry and rude"] },
    { word: "INEVITABLE", emoji: "⏳", meaning: "Certain to happen", options: ["Certain to happen", "Impossible to happen", "Very unlikely"] },
    { word: "PERSEVERANCE", emoji: "🏔️", meaning: "Continued effort despite difficulty", options: ["Continued effort despite difficulty", "Giving up quickly", "Avoiding challenges"] },
    { word: "ELOQUENT", emoji: "🗣️", meaning: "Fluent and persuasive in speaking", options: ["Fluent and persuasive in speaking", "Unable to speak clearly", "Very quiet and shy"] },
    { word: "VIGILANT", emoji: "👀", meaning: "Keeping careful watch for danger", options: ["Keeping careful watch for danger", "Ignoring all warnings", "Sleeping deeply"] },
    { word: "INGENIOUS", emoji: "💡", meaning: "Clever, original, and inventive", options: ["Clever, original, and inventive", "Dull and unoriginal", "Confused and lost"] },
    { word: "TENACIOUS", emoji: "🦾", meaning: "Holding firmly, not giving up", options: ["Holding firmly, not giving up", "Giving up easily", "Very forgetful"] },
    { word: "SERENE", emoji: "🧘", meaning: "Calm and peaceful", options: ["Calm and peaceful", "Loud and chaotic", "Angry and tense"] },
  ],
};

function genMathQuestion(difficulty, level = 1) {
  const base = difficulty === 1 ? 5 : difficulty === 2 ? 10 : 20;
  const max = Math.min(base + (level - 1) * 3, base + 15); // gently grows with level, capped
  let a = 1 + Math.floor(Math.random() * max);
  let b = 1 + Math.floor(Math.random() * max);
  let op = difficulty === 3 && Math.random() > 0.5 ? "-" : "+";
  if (op === "-" && b > a) [a, b] = [b, a];
  const answer = op === "+" ? a + b : a - b;
  const icon = ["🍎", "⭐", "🐝", "🎈"][Math.floor(Math.random() * 4)];
  return { a, b, op, answer, icon };
}

const ROUND_SIZE = 10;
const READING_POOL = [...READING_TIERS[1], ...READING_TIERS[2], ...READING_TIERS[3]];
const SCIENCE_POOL = [...SCIENCE_TIERS[1], ...SCIENCE_TIERS[2], ...SCIENCE_TIERS[3]];
const GK_POOL = [...GK_TIERS[1], ...GK_TIERS[2], ...GK_TIERS[3]];
const WORDS_POOL = [...WORDS_TIERS[1], ...WORDS_TIERS[2], ...WORDS_TIERS[3]];

// Picks 10 questions for the given level, cycling through the pool so each of the
// first 3 levels is entirely fresh content; content repeats (same order) from level 4 on.
function getRoundQuestions(pool, level) {
  const start = ((level - 1) * ROUND_SIZE) % pool.length;
  return Array.from({ length: ROUND_SIZE }, (_, i) => pool[(start + i) % pool.length]);
}

function LessonProgress({ current, total }) {
  const t = useTheme();
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ height: 10, background: t.border, borderRadius: 999, overflow: "hidden" }}>
        <div style={{ width: `${(current / total) * 100}%`, height: "100%", background: t.primary, transition: "width .25s ease" }} />
      </div>
      <p style={{ textAlign: "center", fontFamily: "Nunito", fontSize: 12, color: t.ink, opacity: 0.6, margin: "6px 0 0" }}>Question {current + 1} of {total}</p>
    </div>
  );
}

const AGE_GROUPS = [
  { id: "tiny", label: "Ages 1–4", tier: 1, emoji: "🐣", blurb: "Big pictures, simple counting" },
  { id: "junior", label: "Ages 5–7", tier: 2, emoji: "🦁", blurb: "Reading, adding, first facts" },
  { id: "super", label: "Ages 8–10", tier: 3, emoji: "🦉", blurb: "Trickier words, bigger numbers" },
];

// ---------------- story banks (seed content — 3 per subject, expanding toward 20) ----------------
const STORY_BANKS = {
  math: [
    { id: "m1", tier: 1, title: "The Counting Caterpillar", cover: "🐛", pages: [
      { emoji: "🍃", text: "Casey the caterpillar loved to count leaves on her way to school." },
      { emoji: "🍃🍃", text: '"One leaf, two leaves!" she said, munching happily.' },
      { emoji: "🍃🍃🍃🍃🍃", text: "By lunchtime, Casey had counted all the way to five delicious leaves!" },
      { emoji: "🦋", text: "Full and happy, Casey turned into a butterfly and counted her new wings — one, two!" },
    ] },
    { id: "m2", tier: 2, title: "The Fair Share Forest", cover: "🌰", pages: [
      { emoji: "🐿️🐿️🐿️", text: "Three squirrel friends found a big pile of twelve acorns." },
      { emoji: "🌰", text: '"Let\'s share equally!" said Nutkin, splitting the pile into three groups.' },
      { emoji: "4️⃣", text: "Twelve acorns shared by three friends means everyone gets four acorns each!" },
      { emoji: "🎉", text: "They stored their acorns for winter, proud of sharing so fairly." },
    ] },
    { id: "m3", tier: 3, title: "The Puzzle of Wobble Bridge", cover: "🌉", pages: [
      { emoji: "🌉", text: "To cross Wobble Bridge, Mira had to solve a number riddle at every plank." },
      { emoji: "➕", text: '"What is 15 plus 8?" asked the bridge troll. Mira thought hard: twenty-three!' },
      { emoji: "➖", text: 'The next plank asked, "What is 30 minus 12?" Mira answered: eighteen!' },
      { emoji: "🏆", text: "With every correct answer, a plank appeared, until Mira crossed safely to the other side." },
    ] },
  ],
  reading: [
    { id: "r1", tier: 1, title: "Sam the Sun Says Hi", cover: "☀️", pages: [
      { emoji: "☀️", text: 'Sam the Sun woke up and said, "Hi!" to everyone below.' },
      { emoji: "🐱", text: '"Hi, Sun!" said the cat, stretching in the warm light.' },
      { emoji: "🌻", text: '"Hi, Sun!" said the flower, opening its petals wide.' },
      { emoji: "😴", text: 'At night, Sam said, "Bye!" and the moon said hello instead.' },
    ] },
    { id: "r2", tier: 2, title: "The Frog Who Lost His Song", cover: "🐸", pages: [
      { emoji: "🐸", text: "Freddy the frog woke up one morning and couldn't remember his ribbit song." },
      { emoji: "⭐", text: "He asked the star and the fish for help, but nothing sounded quite right." },
      { emoji: "🎵", text: 'A wise old turtle reminded him: "Just open your mouth and let it out!"' },
      { emoji: "🐸🎶", text: "Freddy ribbited so loudly that the whole pond cheered — his song was back!" },
    ] },
    { id: "r3", tier: 3, title: "The Dragon's Secret Garden", cover: "🐉", pages: [
      { emoji: "🐉", text: "Deep in the mountains lived a dragon who guarded a secret, glowing garden." },
      { emoji: "🌸", text: "Every flower in the garden could only bloom if someone spoke a kind word to it." },
      { emoji: "🧒", text: "A curious girl named Elara wandered in and whispered kindness to every petal." },
      { emoji: "🌈", text: "The garden burst into color — kindness was the real magic all along." },
    ] },
  ],
  science: [
    { id: "s1", tier: 1, title: "Why the Sky is Blue", cover: "🌤️", pages: [
      { emoji: "☀️", text: "Sunlight looks white, but it is actually made of many colors hiding together." },
      { emoji: "🔵", text: "When sunlight hits the sky, blue light bounces around the most." },
      { emoji: "🌤️", text: "That bouncing blue light is what fills the sky above us every clear day!" },
    ] },
    { id: "s2", tier: 2, title: "The Seed That Wouldn't Sleep", cover: "🌱", pages: [
      { emoji: "🌰", text: "A tiny seed was planted in the dark soil and felt very sleepy." },
      { emoji: "💧", text: "But rain came, and water woke the seed right up!" },
      { emoji: "☀️", text: "Sunlight reached down through the soil, giving the seed energy to grow." },
      { emoji: "🌻", text: "Days later, a bright sunflower stretched up toward the sky, wide awake at last." },
    ] },
    { id: "s3", tier: 3, title: "The Water Cycle Adventure", cover: "💧", pages: [
      { emoji: "🌊", text: "A drop of water named Ripple lived in the ocean, until the sun warmed her into steam." },
      { emoji: "☁️", text: "Ripple floated up and joined thousands of droplets to form a fluffy cloud." },
      { emoji: "🌧️", text: "When the cloud got too heavy, Ripple fell back down to earth as rain." },
      { emoji: "🔁", text: "She landed in a river that carried her back to the ocean — ready to start again!" },
    ] },
  ],
  gk: [
    { id: "g1", tier: 1, title: "Around My Town", cover: "🏘️", pages: [
      { emoji: "🚒", text: "The firefighter's job is to keep everyone safe from fires." },
      { emoji: "🩺", text: "The doctor's job is to help people feel better when they are sick." },
      { emoji: "📮", text: "The mail carrier's job is to bring letters and packages to every house." },
    ] },
    { id: "g2", tier: 2, title: "A Trip Around the World", cover: "🌍", pages: [
      { emoji: "🗼", text: "In France, you might see the tall Eiffel Tower standing over Paris." },
      { emoji: "🏯", text: "In Japan, ancient castles and cherry blossom trees color the streets pink each spring." },
      { emoji: "🦘", text: "In Australia, kangaroos hop across wide open land under a very sunny sky." },
      { emoji: "🌍", text: "Every country has its own special sights, sounds, and stories to discover." },
    ] },
    { id: "g3", tier: 3, title: "The Great Wonders", cover: "🏛️", pages: [
      { emoji: "🏛️", text: "Long ago, people built the Great Pyramids of Giza — some of the oldest structures still standing." },
      { emoji: "🧱", text: "In China, the Great Wall stretches for thousands of miles across mountains and valleys." },
      { emoji: "🗿", text: "On a faraway island, giant stone statues called Moai stand watching over Easter Island." },
      { emoji: "🌏", text: "Each wonder reminds us how creative and determined people have always been." },
    ] },
  ],
};
const SUBJECT_META = {
  math: { label: "Math Trail", emoji: "🧮" },
  reading: { label: "Word Grove", emoji: "🌳" },
  science: { label: "Science Lab", emoji: "🔬" },
  gk: { label: "General Knowledge", emoji: "🌍" },
};

// Animal buddy characters — one per category, for a friendlier, kid-facing feel
const BUDDIES = {
  math: { animal: "🦊", name: "Foxy" },
  reading: { animal: "🦉", name: "Ollie" },
  science: { animal: "🐵", name: "Momo" },
  gk: { animal: "🐘", name: "Ellie" },
  words: { animal: "🦜", name: "Kiwi" },
  stories: { animal: "🦁", name: "Leo" },
};

// ---------------- Math Trail ----------------
function MathTrail({ tier, level, ageLabel, onAnswer, onExit }) {
  const t = useTheme();
  const [step, setStep] = useState(0);
  const [q, setQ] = useState(() => genMathQuestion(tier, level));
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("idle");

  const options = useMemo(() => {
    const set = new Set([q.answer]);
    while (set.size < 3) {
      const d = 1 + Math.floor(Math.random() * 3);
      set.add(Math.random() > 0.5 ? q.answer + d : Math.max(0, q.answer - d));
    }
    return Array.from(set).sort(() => Math.random() - 0.5);
  }, [q]);

  function choose(opt) {
    if (status === "correct") return;
    setSelected(opt);
    const correct = opt === q.answer;
    setStatus(correct ? "correct" : "wrong");
    onAnswer(correct);
  }
  function next() {
    if (step + 1 >= ROUND_SIZE) return onExit();
    setStep((s) => s + 1);
    setQ(genMathQuestion(tier, level));
    setSelected(null);
    setStatus("idle");
  }

  return (
    <LessonShell mood={status === "wrong" ? "thinking" : "happy"} title="Math Trail" onExit={onExit}>
      <LessonProgress current={step} total={ROUND_SIZE} />
      <div style={{ background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 24, padding: "26px 20px", textAlign: "center" }}>
        <p style={{ fontFamily: "Nunito", opacity: 0.7, margin: 0, fontSize: 13, color: t.ink }}>Math Trail · {ageLabel} · Level {level}</p>
        <div style={{ fontSize: q.op === "+" ? 26 : 34, letterSpacing: 3, margin: "10px 0", fontFamily: "Fredoka", color: t.ink }}>
          {q.op === "+" ? (<>{q.icon.repeat(q.a)} <span style={{ color: t.accent }}>+</span> {q.icon.repeat(q.b)}</>) : (<>{q.a} <span style={{ color: t.accent }}>−</span> {q.b}</>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 18 }}>
          {options.map((opt) => (
            <BigButton key={opt} bg={status !== "idle" && selected === opt ? (opt === q.answer ? t.primary : t.accent) : t.secondary} onClick={() => choose(opt)} disabled={status === "correct"}>{opt}</BigButton>
          ))}
        </div>
        {status === "wrong" && <p style={{ color: t.accent, fontWeight: 700, marginTop: 12, fontFamily: "Nunito" }}>Not quite — try again!</p>}
        {status === "correct" && (<><Celebration /><p style={{ color: t.primaryDark, fontWeight: 700, marginTop: 6, fontFamily: "Nunito" }}>Great job! +10 XP ⭐</p><div style={{ marginTop: 10 }}><BigButton bg={t.sunnyDark} onClick={next}>{step + 1 >= ROUND_SIZE ? "Finish level" : "Next"}</BigButton></div></>)}
      </div>
    </LessonShell>
  );
}

// ---------------- Word Grove ----------------
function WordGrove({ tier, level, ageLabel, onAnswer, onExit }) {
  const t = useTheme();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("idle");
  const round = useMemo(() => getRoundQuestions(READING_POOL, level), [level]);
  const q = round[step];

  function choose(opt) {
    if (status === "correct") return;
    const correct = opt === q.word;
    setStatus(correct ? "correct" : "wrong");
    onAnswer(correct);
  }
  function next() {
    if (step + 1 >= ROUND_SIZE) return onExit();
    setStep((s) => s + 1);
    setStatus("idle");
  }

  return (
    <LessonShell mood={status === "wrong" ? "thinking" : "happy"} title="Word Grove" onExit={onExit}>
      <LessonProgress current={step} total={ROUND_SIZE} />
      <div style={{ background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 24, padding: "26px 20px", textAlign: "center" }}>
        <p style={{ fontFamily: "Nunito", opacity: 0.7, margin: 0, fontSize: 13, color: t.ink }}>Word Grove · {ageLabel} · Level {level}</p>
        <div style={{ fontSize: 52, margin: "12px 0" }}>{q.emoji}</div>
        <div style={{ display: "grid", gap: 10 }}>
          {q.options.map((opt) => (
            <BigButton key={opt} bg={status !== "idle" && opt === q.word ? t.primary : t.secondary} onClick={() => choose(opt)} disabled={status === "correct"}>{opt}</BigButton>
          ))}
        </div>
        {status === "wrong" && <p style={{ color: t.accent, fontWeight: 700, marginTop: 12, fontFamily: "Nunito" }}>Sound it out and try again!</p>}
        {status === "correct" && (<><Celebration /><p style={{ color: t.primaryDark, fontWeight: 700, marginTop: 6, fontFamily: "Nunito" }}>You got it! +10 XP ⭐</p><div style={{ marginTop: 10 }}><BigButton bg={t.sunnyDark} onClick={next}>{step + 1 >= ROUND_SIZE ? "Finish level" : "Next"}</BigButton></div></>)}
      </div>
    </LessonShell>
  );
}

// ---------------- Science Lab ----------------
function ScienceLab({ tier, level, ageLabel, onAnswer, onExit }) {
  const t = useTheme();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("idle");
  const round = useMemo(() => getRoundQuestions(SCIENCE_POOL, level), [level]);
  const q = round[step];

  function choose(label) {
    if (status === "correct") return;
    const correct = label === q.correct;
    setStatus(correct ? "correct" : "wrong");
    onAnswer(correct);
  }
  function next() {
    if (step + 1 >= ROUND_SIZE) return onExit();
    setStep((s) => s + 1);
    setStatus("idle");
  }

  return (
    <LessonShell mood={status === "wrong" ? "thinking" : "happy"} title="Science Lab" onExit={onExit}>
      <LessonProgress current={step} total={ROUND_SIZE} />
      <div style={{ background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 24, padding: "26px 20px", textAlign: "center" }}>
        <p style={{ fontFamily: "Nunito", opacity: 0.7, margin: 0, fontSize: 13, color: t.ink }}>Science Lab · {ageLabel} · Level {level}</p>
        <p style={{ fontFamily: "Fredoka", fontSize: 19, color: t.ink, margin: "12px 0" }}>{q.q}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {q.options.map((opt) => (
            <BigButton key={opt.l} bg={status !== "idle" && opt.l === q.correct ? t.primary : t.tertiary} onClick={() => choose(opt.l)} disabled={status === "correct"}>{opt.e}<br />{opt.l}</BigButton>
          ))}
        </div>
        {status === "wrong" && <p style={{ color: t.accent, fontWeight: 700, marginTop: 12, fontFamily: "Nunito" }}>Good guess — try again!</p>}
        {status === "correct" && (<><Celebration /><p style={{ color: t.primaryDark, fontWeight: 700, marginTop: 6, fontFamily: "Nunito" }}>Nice thinking! +10 XP ⭐</p><div style={{ marginTop: 10 }}><BigButton bg={t.sunnyDark} onClick={next}>{step + 1 >= ROUND_SIZE ? "Finish level" : "Next"}</BigButton></div></>)}
      </div>
    </LessonShell>
  );
}

// ---------------- General Knowledge ----------------
function GKLab({ tier, level, ageLabel, onAnswer, onExit }) {
  const t = useTheme();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("idle");
  const round = useMemo(() => getRoundQuestions(GK_POOL, level), [level]);
  const q = round[step];

  function choose(label) {
    if (status === "correct") return;
    const correct = label === q.correct;
    setStatus(correct ? "correct" : "wrong");
    onAnswer(correct);
  }
  function next() {
    if (step + 1 >= ROUND_SIZE) return onExit();
    setStep((s) => s + 1);
    setStatus("idle");
  }

  return (
    <LessonShell mood={status === "wrong" ? "thinking" : "happy"} title="General Knowledge" onExit={onExit}>
      <LessonProgress current={step} total={ROUND_SIZE} />
      <div style={{ background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 24, padding: "26px 20px", textAlign: "center" }}>
        <p style={{ fontFamily: "Nunito", opacity: 0.7, margin: 0, fontSize: 13, color: t.ink }}>General Knowledge · {ageLabel} · Level {level}</p>
        <p style={{ fontFamily: "Fredoka", fontSize: 19, color: t.ink, margin: "12px 0" }}>{q.q}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {q.options.map((opt) => (
            <BigButton key={opt.l} bg={status !== "idle" && opt.l === q.correct ? t.primary : t.tertiary} onClick={() => choose(opt.l)} disabled={status === "correct"}>{opt.e}<br />{opt.l}</BigButton>
          ))}
        </div>
        {status === "wrong" && <p style={{ color: t.accent, fontWeight: 700, marginTop: 12, fontFamily: "Nunito" }}>Good guess — try again!</p>}
        {status === "correct" && (<><Celebration /><p style={{ color: t.primaryDark, fontWeight: 700, marginTop: 6, fontFamily: "Nunito" }}>Nice thinking! +10 XP ⭐</p><div style={{ marginTop: 10 }}><BigButton bg={t.sunnyDark} onClick={next}>{step + 1 >= ROUND_SIZE ? "Finish level" : "Next"}</BigButton></div></>)}
      </div>
    </LessonShell>
  );
}

// ---------------- New Words (vocabulary) ----------------
function WordsLab({ tier, level, ageLabel, onAnswer, onExit }) {
  const t = useTheme();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("idle");
  const round = useMemo(() => getRoundQuestions(WORDS_POOL, level), [level]);
  const q = round[step];
  const options = useMemo(() => [...q.options].sort(() => Math.random() - 0.5), [q]);

  function choose(opt) {
    if (status === "correct") return;
    const correct = opt === q.meaning;
    setStatus(correct ? "correct" : "wrong");
    onAnswer(correct);
  }
  function next() {
    if (step + 1 >= ROUND_SIZE) return onExit();
    setStep((s) => s + 1);
    setStatus("idle");
  }

  return (
    <LessonShell mood={status === "wrong" ? "thinking" : "happy"} title="New Words" onExit={onExit}>
      <LessonProgress current={step} total={ROUND_SIZE} />
      <div style={{ background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 24, padding: "26px 20px", textAlign: "center" }}>
        <p style={{ fontFamily: "Nunito", opacity: 0.7, margin: 0, fontSize: 13, color: t.ink }}>New Words · {ageLabel} · Level {level}</p>
        <div style={{ fontSize: 44, margin: "10px 0 2px" }}>{q.emoji}</div>
        <p style={{ fontFamily: "Fredoka", fontSize: 26, color: t.ink, margin: "0 0 4px", letterSpacing: 1 }}>{q.word}</p>
        <p style={{ fontFamily: "Nunito", fontSize: 13, color: t.ink, opacity: 0.6, margin: "0 0 14px" }}>What does this word mean?</p>
        <div style={{ display: "grid", gap: 10 }}>
          {options.map((opt) => (
            <BigButton key={opt} fontSize={14} bg={status !== "idle" && opt === q.meaning ? t.primary : t.secondary} onClick={() => choose(opt)} disabled={status === "correct"}>{opt}</BigButton>
          ))}
        </div>
        {status === "wrong" && <p style={{ color: t.accent, fontWeight: 700, marginTop: 12, fontFamily: "Nunito" }}>Not quite — try again!</p>}
        {status === "correct" && (<><Celebration /><p style={{ color: t.primaryDark, fontWeight: 700, marginTop: 6, fontFamily: "Nunito" }}>New word learned! +10 XP ⭐</p><div style={{ marginTop: 10 }}><BigButton bg={t.sunnyDark} onClick={next}>{step + 1 >= ROUND_SIZE ? "Finish level" : "Next"}</BigButton></div></>)}
      </div>
    </LessonShell>
  );
}

// ---------------- Story Hub & Reader ----------------
function StoryHub({ tier, ageLabel, onOpen, onExit, readStories }) {
  const t = useTheme();
  const stories = Object.entries(STORY_BANKS).flatMap(([subjectKey, list]) =>
    list.filter((s) => s.tier === tier).map((s) => ({ ...s, subjectKey }))
  );
  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <ScreenHeader title="Fun Stories" onBack={onExit} />
      <p style={{ fontFamily: "Nunito", fontSize: 13, color: t.ink, opacity: 0.6, margin: "-6px 0 14px", textAlign: "center" }}>{ageLabel} · pick a story to read with {BUDDIES.stories.name} {BUDDIES.stories.animal}</p>
      <div style={{ display: "grid", gap: 12 }}>
        {stories.map((s) => {
          const meta = SUBJECT_META[s.subjectKey];
          const read = readStories.has(s.id);
          return (
            <button key={s.id} onClick={() => onOpen(s)} style={{ display: "flex", alignItems: "center", gap: 14, textAlign: "left", cursor: "pointer", background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 18, padding: 14 }}>
              <div style={{ fontSize: 34 }}>{s.cover}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "Fredoka", fontSize: 16, color: t.ink, margin: 0 }}>{s.title}</p>
                <p style={{ fontFamily: "Nunito", fontSize: 12, color: t.ink, opacity: 0.55, margin: "2px 0 0" }}>{meta.emoji} {meta.label}{read ? " · Read ✓" : ""}</p>
              </div>
            </button>
          );
        })}
      </div>
      <p style={{ fontFamily: "Nunito", fontSize: 12, color: t.ink, opacity: 0.45, textAlign: "center", marginTop: 16 }}>
        {stories.length} stories for this age group so far — more added regularly
      </p>
    </div>
  );
}

function StoryReader({ story, onFinish, onExit }) {
  const t = useTheme();
  const [page, setPage] = useState(0);
  const p = story.pages[page];
  const isLast = page === story.pages.length - 1;
  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <ScreenHeader title={story.title} onBack={onExit} />
      <TrailDots total={story.pages.length} current={page} />
      <div style={{ background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 24, padding: "34px 22px", textAlign: "center" }}>
        <div style={{ fontSize: 62, marginBottom: 14 }}>{p.emoji}</div>
        <p style={{ fontFamily: "Nunito", fontSize: 16, color: t.ink, lineHeight: 1.55, margin: 0 }}>{p.text}</p>
        <div style={{ marginTop: 22 }}>
          <BigButton bg={t.primary} onClick={() => (isLast ? onFinish() : setPage((pg) => pg + 1))}>
            {isLast ? "Finish story ⭐" : "Next page"}
          </BigButton>
        </div>
      </div>
    </div>
  );
}

// ---------------- Badges ----------------
const BADGE_DEFS = [
  { id: "first_star", label: "First Star", emoji: "🌟", check: (s) => s.totalCorrect >= 1 },
  { id: "hot_streak", label: "Hot Streak", emoji: "🔥", check: (s) => s.overallStreak >= 5 },
  { id: "explorer", label: "Explorer", emoji: "🧭", check: (s) => s.tried.size >= 5 },
  { id: "century", label: "Century Club", emoji: "🏆", check: (s) => s.xp >= 100 },
  { id: "storyteller", label: "Storyteller", emoji: "📚", check: (s) => s.readStories.size >= 3 },
];

// ---------------- Quest card ----------------
function QuestCard({ title, subtitle, buddy, color, level, onStart, stats }) {
  const t = useTheme();
  const acc = stats.total ? Math.round((stats.correct / stats.total) * 100) : null;
  return (
    <div style={{ background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 22, padding: 18, flex: 1, minWidth: 200, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -6, right: -4, fontSize: 46, opacity: 0.14 }}>{buddy.animal}</div>
      <div style={{ fontSize: 34 }}>{buddy.animal}</div>
      <h3 style={{ fontFamily: "Fredoka", color: t.ink, margin: "6px 0 2px", fontSize: 20 }}>{title}</h3>
      <p style={{ fontFamily: "Nunito", color: t.ink, opacity: 0.6, margin: "0 0 10px", fontSize: 13 }}>{subtitle} · with {buddy.name}</p>
      <p style={{ fontFamily: "Nunito", color: t.ink, opacity: 0.55, margin: "0 0 12px", fontSize: 12 }}>
        {level ? `Level ${level}` : ""}{acc !== null ? ` · ${acc}% correct` : level ? "" : "Not tried yet"}{stats.streak >= 2 ? ` · 🔥${stats.streak}` : ""}
      </p>
      <BigButton bg={color} onClick={onStart}>{stats.total ? "Play again" : "Start"}</BigButton>
    </div>
  );
}

// ---------------- Theme Picker ----------------
function ThemePicker({ current, onSelect, onExit }) {
  const t = useTheme();
  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <ScreenHeader title="Choose your world" onBack={onExit} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {Object.values(THEMES).map((th) => (
          <button
            key={th.key}
            onClick={() => onSelect(th.key)}
            style={{
              cursor: "pointer", textAlign: "left", border: current === th.key ? `3px solid ${th.primary}` : `2px solid ${t.border}`,
              borderRadius: 20, padding: 14, background: th.bg, position: "relative",
            }}
          >
            {current === th.key && (
              <div style={{ position: "absolute", top: 10, right: 10, background: th.primary, borderRadius: 999, width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check size={14} color="#fff" />
              </div>
            )}
            <div style={{ fontSize: 32 }}>{th.emoji}</div>
            <p style={{ fontFamily: "Fredoka", fontSize: 16, color: th.ink, margin: "8px 0 8px" }}>{th.name}</p>
            <div style={{ display: "flex", gap: 6 }}>
              {[th.primary, th.secondary, th.tertiary, th.sunny].map((c) => (
                <div key={c} style={{ width: 16, height: 16, borderRadius: "50%", background: c }} />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------- Parent Dashboard ----------------
function ParentDashboard({ progress, xp, level, badges, minutes, ageGroup, onExit, onReset }) {
  const t = useTheme();
  const [confirming, setConfirming] = useState(false);
  const subjects = [
    { key: "math", label: "Math Trail", emoji: "🧮" },
    { key: "reading", label: "Word Grove", emoji: "🌳" },
    { key: "science", label: "Science Lab", emoji: "🔬" },
    { key: "gk", label: "General Knowledge", emoji: "🌍" },
    { key: "words", label: "New Words", emoji: "📖" },
  ];
  const age = AGE_GROUPS.find((a) => a.id === ageGroup);
  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <ScreenHeader title="Parent Dashboard" onBack={onExit} />
      <div style={{ background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 20, padding: 18, marginBottom: 14 }}>
        <p style={{ fontFamily: "Nunito", margin: 0, opacity: 0.6, fontSize: 13, color: t.ink }}>This session {age ? `· ${age.label}` : ""}</p>
        <div style={{ display: "flex", gap: 18, marginTop: 6, flexWrap: "wrap" }}>
          <div><b style={{ fontFamily: "Fredoka", fontSize: 20, color: t.ink }}>{minutes}</b><span style={{ fontFamily: "Nunito", fontSize: 12, opacity: 0.6, color: t.ink }}> min active</span></div>
          <div><b style={{ fontFamily: "Fredoka", fontSize: 20, color: t.ink }}>Lv.{level}</b><span style={{ fontFamily: "Nunito", fontSize: 12, opacity: 0.6, color: t.ink }}> ({xp} XP)</span></div>
          <div><b style={{ fontFamily: "Fredoka", fontSize: 20, color: t.ink }}>{badges.length}</b><span style={{ fontFamily: "Nunito", fontSize: 12, opacity: 0.6, color: t.ink }}> badges</span></div>
        </div>
      </div>
      <p style={{ fontFamily: "Nunito", fontWeight: 700, color: t.ink, margin: "6px 0" }}>By subject</p>
      {subjects.map((s) => {
        const p = progress[s.key];
        const acc = p.total ? Math.round((p.correct / p.total) * 100) : null;
        const weak = p.total >= 3 && acc < 60;
        return (
          <div key={s.key} style={{ background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 16, padding: 14, marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 26 }}>{s.emoji}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "Fredoka", margin: 0, color: t.ink, fontSize: 15 }}>{s.label}</p>
              <p style={{ fontFamily: "Nunito", margin: 0, fontSize: 12, opacity: 0.6, color: t.ink }}>{p.total ? `${p.correct}/${p.total} correct · ${acc}% accuracy` : "Not tried yet"}{p.streak >= 2 ? ` · 🔥${p.streak} streak` : ""}</p>
            </div>
            {weak && <span style={{ fontFamily: "Nunito", fontSize: 11, background: "#FFE9E5", color: "#C13F1E", padding: "4px 8px", borderRadius: 999, fontWeight: 700 }}>Needs practice</span>}
          </div>
        );
      })}
      <p style={{ fontFamily: "Nunito", fontWeight: 700, color: t.ink, margin: "14px 0 6px" }}>Badges earned</p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
        {badges.length === 0 && <p style={{ fontFamily: "Nunito", opacity: 0.5, fontSize: 13, color: t.ink }}>None yet — keep exploring!</p>}
        {badges.map((id) => {
          const b = BADGE_DEFS.find((x) => x.id === id);
          return (
            <div key={id} style={{ background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 14, padding: "8px 12px", textAlign: "center", fontFamily: "Nunito", fontSize: 12, color: t.ink }}>
              <div style={{ fontSize: 20 }}>{b.emoji}</div>{b.label}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {!confirming ? (
          <button onClick={() => setConfirming(true)} style={{ background: "none", border: "none", color: t.ink, opacity: 0.4, fontFamily: "Nunito", fontSize: 12, cursor: "pointer" }}>
            Reset progress
          </button>
        ) : (
          <button onClick={() => { onReset(); setConfirming(false); }} style={{ background: "none", border: "none", color: "#C13F1E", fontFamily: "Nunito", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
            Tap again to erase everything
          </button>
        )}
      </div>
    </div>
  );
}

// ---------------- Age Select ----------------
function AgeSelect({ onSelect }) {
  const t = useTheme();
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
      <Logo size={84} />
      <p style={{ fontFamily: "Nunito", color: t.ink, opacity: 0.65, fontSize: 15, margin: "4px 0 22px" }}>How old is our explorer today?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {AGE_GROUPS.map((a) => (
          <button
            key={a.id}
            onClick={() => onSelect(a.id)}
            style={{ display: "flex", alignItems: "center", gap: 14, textAlign: "left", cursor: "pointer", background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 20, padding: "16px 18px" }}
          >
            <div style={{ fontSize: 34 }}>{a.emoji}</div>
            <div>
              <p style={{ fontFamily: "Fredoka", fontSize: 19, color: t.ink, margin: 0 }}>{a.label}</p>
              <p style={{ fontFamily: "Nunito", fontSize: 13, color: t.ink, opacity: 0.6, margin: "2px 0 0" }}>{a.blurb}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------- App ----------------
const DAILY_GOAL = 15;

function AppInner({ themeKey, setThemeKey, ageGroup, setAgeGroup, progress, setProgress, xp, setXp, overallStreak, setOverallStreak, tried, setTried, badges, setBadges, readStories, setReadStories, onReset }) {
  const t = useTheme();
  const [screen, setScreen] = useState("hub");
  const [activeStory, setActiveStory] = useState(null);
  const [toast, setToast] = useState(null);
  const [sessionStart] = useState(() => Date.now());
  const [minutes, setMinutes] = useState(0);
  const [sessionAnswered, setSessionAnswered] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setMinutes(Math.round((Date.now() - sessionStart) / 60000)), 15000);
    return () => clearInterval(id);
  }, [sessionStart]);

  function handleAnswer(subject, correct) {
    const newTotal = progress[subject].total + 1;
    if (newTotal % ROUND_SIZE === 0) {
      const newLevel = newTotal / ROUND_SIZE + 1;
      setTimeout(() => {
        setToast({ emoji: "🏅", label: `Level ${newLevel} unlocked!` });
        setTimeout(() => setToast(null), 2800);
      }, 300);
    }
    setProgress((prev) => {
      const p = { ...prev[subject] };
      p.total += 1;
      if (correct) { p.correct += 1; p.streak += 1; } else { p.streak = 0; }
      return { ...prev, [subject]: p };
    });
    setTried((prev) => new Set(prev).add(subject));
    setOverallStreak((prev) => (correct ? prev + 1 : 0));
    setSessionAnswered((n) => n + 1);
    if (correct) setXp((prev) => prev + 10);
  }

  function finishStory() {
    if (!activeStory) return setScreen("storyHub");
    setReadStories((prev) => {
      if (prev.has(activeStory.id)) return prev;
      setXp((x) => x + 15);
      return new Set(prev).add(activeStory.id);
    });
    setScreen("storyHub");
  }

  useEffect(() => {
    if (sessionAnswered === DAILY_GOAL) {
      setToast({ emoji: "🎯", label: "Session goal reached!" });
      setTimeout(() => setToast(null), 2800);
    }
  }, [sessionAnswered]);

  useEffect(() => {
    const totalCorrect = Object.values(progress).reduce((a, p) => a + p.correct, 0);
    const snapshot = { totalCorrect, overallStreak, tried, progress, xp, readStories };
    BADGE_DEFS.forEach((b) => {
      if (!badges.includes(b.id) && b.check(snapshot)) {
        setBadges((prev) => [...prev, b.id]);
        setToast(b);
        setTimeout(() => setToast(null), 2800);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, xp, overallStreak, tried, readStories]);

  const level = Math.floor(xp / 50) + 1;
  const xpIntoLevel = xp % 50;
  const age = AGE_GROUPS.find((a) => a.id === ageGroup);
  const tier = age ? age.tier : 1;
  const goalPct = Math.min(100, Math.round((sessionAnswered / DAILY_GOAL) * 100));
  const levelOf = (subject) => Math.floor(progress[subject].total / ROUND_SIZE) + 1;

  return (
    <div style={{ minHeight: 520, background: t.bg, fontFamily: "Nunito, sans-serif", padding: "26px 16px", borderRadius: 12, position: "relative", transition: "background .3s ease" }}>
      {toast && (
        <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", background: t.ink, color: t.bg, padding: "8px 16px", borderRadius: 999, fontFamily: "Fredoka", fontSize: 14, display: "flex", gap: 8, alignItems: "center", zIndex: 10 }}>
          <Award size={16} /> {toast.label.includes("Reached") || toast.label.includes("reached") ? toast.emoji : "Badge unlocked:"} {toast.emoji} {toast.label}
        </div>
      )}

      {!ageGroup && <AgeSelect onSelect={setAgeGroup} />}

      {ageGroup && screen === "hub" && (
        <div style={{ maxWidth: 540, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => setScreen("theme")} style={{ display: "flex", alignItems: "center", gap: 6, background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 999, padding: "6px 12px", fontFamily: "Nunito", fontSize: 12, color: t.ink, cursor: "pointer" }}>
              <Palette size={14} /> Customize
            </button>
          </div>
          <div style={{ marginTop: -20, marginBottom: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <Mascot size={44} />
            <Logo size={72} />
          </div>
          <p style={{ fontFamily: "Nunito", color: t.ink, opacity: 0.6, textAlign: "center", fontSize: 14, margin: "0 0 4px" }}>Let's explore today!</p>
          <button onClick={() => setAgeGroup(null)} style={{ display: "block", margin: "0 auto 16px", background: "none", border: "none", color: t.ink, opacity: 0.5, fontFamily: "Nunito", fontSize: 12, cursor: "pointer" }}>
            {age.emoji} {age.label} · change
          </button>

          <div style={{ background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 16, padding: "12px 16px", marginBottom: 12, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontFamily: "Fredoka", color: t.sunnyDark, fontSize: 15 }}>Lv.{level}</div>
            <div style={{ flex: 1, height: 10, background: t.border, borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: `${(xpIntoLevel / 50) * 100}%`, height: "100%", background: t.sunny }} />
            </div>
            <div style={{ fontFamily: "Nunito", fontSize: 12, opacity: 0.6, color: t.ink }}>{xpIntoLevel}/50 XP</div>
            {overallStreak >= 2 && (<div style={{ display: "flex", alignItems: "center", gap: 3, color: t.accent, fontFamily: "Fredoka", fontSize: 13 }}><Flame size={15} /> {overallStreak}</div>)}
          </div>

          <div style={{ background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 16, padding: "12px 16px", marginBottom: 18, display: "flex", alignItems: "center", gap: 14 }}>
            <Target size={16} color={t.primary} />
            <div style={{ flex: 1, height: 10, background: t.border, borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: `${goalPct}%`, height: "100%", background: t.primary, transition: "width .3s ease" }} />
            </div>
            <div style={{ fontFamily: "Nunito", fontSize: 12, opacity: 0.6, color: t.ink }}>{Math.min(sessionAnswered, DAILY_GOAL)}/{DAILY_GOAL} goal</div>
          </div>

          {badges.length > 0 && (
            <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
              {badges.map((id) => {
                const b = BADGE_DEFS.find((x) => x.id === id);
                return <div key={id} title={b.label} style={{ fontSize: 20, background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 999, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>{b.emoji}</div>;
              })}
            </div>
          )}

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <QuestCard title="Math Trail" subtitle="Count & add" buddy={BUDDIES.math} color={t.primary} level={levelOf("math")} onStart={() => setScreen("math")} stats={progress.math} />
            <QuestCard title="Science Lab" subtitle="Fun facts" buddy={BUDDIES.science} color={t.tertiary} level={levelOf("science")} onStart={() => setScreen("science")} stats={progress.science} />
            <QuestCard title="General Knowledge" subtitle="World & everyday facts" buddy={BUDDIES.gk} color={t.accent} level={levelOf("gk")} onStart={() => setScreen("gk")} stats={progress.gk} />
            <QuestCard title="New Words" subtitle="Learn a new word" buddy={BUDDIES.words} color={t.primaryDark} level={levelOf("words")} onStart={() => setScreen("words")} stats={progress.words} />
            <QuestCard title="Word Grove" subtitle="Match words" buddy={BUDDIES.reading} color={t.secondaryDark} level={levelOf("reading")} onStart={() => setScreen("reading")} stats={progress.reading} />
            <QuestCard title="Fun Stories" subtitle="Read & discover" buddy={BUDDIES.stories} color={t.sunnyDark} onStart={() => setScreen("storyHub")} stats={{ total: readStories.size, correct: readStories.size, streak: 0 }} />
          </div>

          <button onClick={() => setScreen("dashboard")} style={{ display: "flex", alignItems: "center", gap: 6, margin: "22px auto 0", background: "none", border: "none", color: t.ink, opacity: 0.55, fontFamily: "Nunito", fontSize: 13, cursor: "pointer" }}>
            <Users size={15} /> Parent Dashboard
          </button>
        </div>
      )}

      {ageGroup && screen === "math" && <MathTrail tier={tier} level={levelOf("math")} ageLabel={age.label} onAnswer={(c) => handleAnswer("math", c)} onExit={() => setScreen("hub")} />}
      {ageGroup && screen === "reading" && <WordGrove tier={tier} level={levelOf("reading")} ageLabel={age.label} onAnswer={(c) => handleAnswer("reading", c)} onExit={() => setScreen("hub")} />}
      {ageGroup && screen === "science" && <ScienceLab tier={tier} level={levelOf("science")} ageLabel={age.label} onAnswer={(c) => handleAnswer("science", c)} onExit={() => setScreen("hub")} />}
      {ageGroup && screen === "gk" && <GKLab tier={tier} level={levelOf("gk")} ageLabel={age.label} onAnswer={(c) => handleAnswer("gk", c)} onExit={() => setScreen("hub")} />}
      {ageGroup && screen === "words" && <WordsLab tier={tier} level={levelOf("words")} ageLabel={age.label} onAnswer={(c) => handleAnswer("words", c)} onExit={() => setScreen("hub")} />}
      {ageGroup && screen === "storyHub" && <StoryHub tier={tier} ageLabel={age.label} readStories={readStories} onOpen={(s) => { setActiveStory(s); setScreen("storyReader"); }} onExit={() => setScreen("hub")} />}
      {ageGroup && screen === "storyReader" && activeStory && <StoryReader story={activeStory} onFinish={finishStory} onExit={() => setScreen("storyHub")} />}
      {ageGroup && screen === "dashboard" && <ParentDashboard progress={progress} xp={xp} level={level} badges={badges} minutes={minutes} ageGroup={ageGroup} onExit={() => setScreen("hub")} onReset={onReset} />}
      {ageGroup && screen === "theme" && <ThemePicker current={themeKey} onSelect={setThemeKey} onExit={() => setScreen("hub")} />}
    </div>
  );
}

const STORAGE_KEY = "learolab:save";
const DEFAULT_PROGRESS = {
  math: { correct: 0, total: 0, streak: 0 },
  reading: { correct: 0, total: 0, streak: 0 },
  science: { correct: 0, total: 0, streak: 0 },
  gk: { correct: 0, total: 0, streak: 0 },
  words: { correct: 0, total: 0, streak: 0 },
};

export default function LearoLab() {
  useFonts();
  useAnimStyles();

  const [loaded, setLoaded] = useState(false);
  const [themeKey, setThemeKey] = useState("jungle");
  const [ageGroup, setAgeGroup] = useState(null);
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const [xp, setXp] = useState(0);
  const [overallStreak, setOverallStreak] = useState(0);
  const [tried, setTried] = useState(new Set());
  const [badges, setBadges] = useState([]);
  const [readStories, setReadStories] = useState(new Set());

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const data = JSON.parse(saved);

        if (data.themeKey && THEMES[data.themeKey]) {
          setThemeKey(data.themeKey);
        }

        if (data.ageGroup) {
          setAgeGroup(data.ageGroup);
        }

        if (data.progress) {
          setProgress({
            ...DEFAULT_PROGRESS,
            ...data.progress,
          });
        }

        if (typeof data.xp === "number") {
          setXp(data.xp);
        }

        if (typeof data.overallStreak === "number") {
          setOverallStreak(data.overallStreak);
        }

        if (Array.isArray(data.tried)) {
          setTried(new Set(data.tried));
        }

        if (Array.isArray(data.badges)) {
          setBadges(data.badges);
        }

        if (Array.isArray(data.readStories)) {
          setReadStories(new Set(data.readStories));
        }
      }
    } catch (err) {
      console.error("Could not load LearoLab progress:", err);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const data = {
      themeKey,
      ageGroup,
      progress,
      xp,
      overallStreak,
      tried: Array.from(tried),
      badges,
      readStories: Array.from(readStories),
    };

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error("Could not save LearoLab progress:", err);
    }
  }, [
    loaded,
    themeKey,
    ageGroup,
    progress,
    xp,
    overallStreak,
    tried,
    badges,
    readStories,
  ]);

  function handleReset() {
    setThemeKey("jungle");
    setAgeGroup(null);
    setProgress(DEFAULT_PROGRESS);
    setXp(0);
    setOverallStreak(0);
    setTried(new Set());
    setBadges([]);
    setReadStories(new Set());

    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error("Could not reset LearoLab progress:", err);
    }
  }

  if (!loaded) {
    return (
      <div
        style={{
          minHeight: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: THEMES.jungle.bg,
          borderRadius: 12,
          fontFamily: "Nunito, sans-serif",
          color: THEMES.jungle.ink,
        }}
      >
        Loading your trail…
      </div>
    );
  }

  const activeTheme = THEMES[themeKey] || THEMES.jungle;

  return (
    <ThemeContext.Provider value={activeTheme}>
      <AppInner
        themeKey={themeKey}
        setThemeKey={setThemeKey}
        ageGroup={ageGroup}
        setAgeGroup={setAgeGroup}
        progress={progress}
        setProgress={setProgress}
        xp={xp}
        setXp={setXp}
        overallStreak={overallStreak}
        setOverallStreak={setOverallStreak}
        tried={tried}
        setTried={setTried}
        badges={badges}
        setBadges={setBadges}
        readStories={readStories}
        setReadStories={setReadStories}
        onReset={handleReset}
      />
    </ThemeContext.Provider>
  );
}
