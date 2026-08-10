import React, { useState, useEffect, useMemo, createContext, useContext } from "react";
import { Star, ArrowLeft, Users, Flame, Award, Palette, Check } from "lucide-react";

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

const DIFFICULTY_LABEL = { 1: "Beginner", 2: "Growing", 3: "Confident" };


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

function BigButton({ children, onClick, bg, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 600, fontSize: 20, color: "#fff", background: bg, border: "none", borderRadius: 18, padding: "16px 18px", cursor: disabled ? "default" : "pointer", boxShadow: "0 4px 0 rgba(0,0,0,0.18)", width: "100%" }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(3px)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {children}
    </button>
  );
}

function LessonShell({ children, mood, onExit }) {
  const t = useTheme();
  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 8 }}><Mascot mood={mood} /></div>
      {children}
      <button onClick={onExit} style={{ display: "flex", alignItems: "center", gap: 6, margin: "18px auto 0", background: "none", border: "none", color: t.ink, opacity: 0.6, fontFamily: "Nunito", cursor: "pointer" }}>
        <ArrowLeft size={16} /> Back to trail map
      </button>
    </div>
  );
}

// ---------------- question banks ----------------
const READING_TIERS = {
  1: [{ word: "SUN", emoji: "☀️", options: ["SUN", "FUN", "RUN"] }, { word: "CAT", emoji: "🐱", options: ["BAT", "CAT", "HAT"] }, { word: "DOG", emoji: "🐶", options: ["DOG", "LOG", "FOG"] }],
  2: [{ word: "FROG", emoji: "🐸", options: ["FROG", "FLAG", "FRAY"] }, { word: "STAR", emoji: "⭐", options: ["START", "STAR", "SCAR"] }, { word: "FISH", emoji: "🐟", options: ["FISH", "WISH", "DISH"] }],
  3: [{ word: "PLANET", emoji: "🪐", options: ["PLANET", "PLANT", "PLATE"] }, { word: "FLOWER", emoji: "🌸", options: ["FLOUR", "FLOWER", "FLAVOR"] }, { word: "DRAGON", emoji: "🐉", options: ["DRAGON", "WAGON", "DRAGGED"] }],
};
const SCIENCE_TIERS = {
  1: [{ q: "Which animal says 'Moo'?", correct: "Cow", options: [{ l: "Cow", e: "🐮" }, { l: "Dog", e: "🐶" }, { l: "Cat", e: "🐱" }] }, { q: "What do we use to see?", correct: "Eyes", options: [{ l: "Eyes", e: "👀" }, { l: "Ears", e: "👂" }, { l: "Nose", e: "👃" }] }, { q: "Which one is a fruit?", correct: "Apple", options: [{ l: "Apple", e: "🍎" }, { l: "Carrot", e: "🥕" }, { l: "Potato", e: "🥔" }] }],
  2: [{ q: "What do plants need to grow?", correct: "Water", options: [{ l: "Water", e: "💧" }, { l: "Rocks", e: "🪨" }, { l: "Shoes", e: "👟" }] }, { q: "What is a baby dog called?", correct: "Puppy", options: [{ l: "Puppy", e: "🐶" }, { l: "Kitten", e: "🐱" }, { l: "Cub", e: "🐻" }] }, { q: "Where do fish live?", correct: "Water", options: [{ l: "Water", e: "🌊" }, { l: "Trees", e: "🌳" }, { l: "Sky", e: "☁️" }] }],
  3: [{ q: "Which planet do we live on?", correct: "Earth", options: [{ l: "Earth", e: "🌍" }, { l: "Mars", e: "🔴" }, { l: "Moon", e: "🌕" }] }, { q: "What gives us light in the day?", correct: "Sun", options: [{ l: "Sun", e: "☀️" }, { l: "Moon", e: "🌙" }, { l: "Stars", e: "✨" }] }, { q: "What do bees make?", correct: "Honey", options: [{ l: "Honey", e: "🍯" }, { l: "Milk", e: "🥛" }, { l: "Bread", e: "🍞" }] }],
};
function genMathQuestion(difficulty) {
  const max = difficulty === 1 ? 5 : difficulty === 2 ? 10 : 20;
  let a = 1 + Math.floor(Math.random() * max);
  let b = 1 + Math.floor(Math.random() * max);
  let op = difficulty === 3 && Math.random() > 0.5 ? "-" : "+";
  if (op === "-" && b > a) [a, b] = [b, a];
  const answer = op === "+" ? a + b : a - b;
  const icon = ["🍎", "⭐", "🐝", "🎈"][Math.floor(Math.random() * 4)];
  return { a, b, op, answer, icon };
}

// ---------------- Math Trail ----------------
function MathTrail({ tier, onAnswer, onExit }) {
  const t = useTheme();
  const [step, setStep] = useState(0);
  const [q, setQ] = useState(() => genMathQuestion(tier));
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
    if (step + 1 >= 3) return onExit();
    setStep((s) => s + 1);
    setQ(genMathQuestion(tier));
    setSelected(null);
    setStatus("idle");
  }

  return (
    <LessonShell mood={status === "wrong" ? "thinking" : "happy"} onExit={onExit}>
      <TrailDots total={3} current={step} />
      <div style={{ background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 24, padding: "26px 20px", textAlign: "center" }}>
        <p style={{ fontFamily: "Nunito", opacity: 0.7, margin: 0, fontSize: 13, color: t.ink }}>Math Trail · {DIFFICULTY_LABEL[tier]}</p>
        <div style={{ fontSize: q.op === "+" ? 26 : 34, letterSpacing: 3, margin: "10px 0", fontFamily: "Fredoka", color: t.ink }}>
          {q.op === "+" ? (<>{q.icon.repeat(q.a)} <span style={{ color: t.accent }}>+</span> {q.icon.repeat(q.b)}</>) : (<>{q.a} <span style={{ color: t.accent }}>−</span> {q.b}</>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 18 }}>
          {options.map((opt) => (
            <BigButton key={opt} bg={status !== "idle" && selected === opt ? (opt === q.answer ? t.primary : t.accent) : t.secondary} onClick={() => choose(opt)} disabled={status === "correct"}>{opt}</BigButton>
          ))}
        </div>
        {status === "wrong" && <p style={{ color: t.accent, fontWeight: 700, marginTop: 12, fontFamily: "Nunito" }}>Not quite — try again!</p>}
        {status === "correct" && (<><p style={{ color: t.primaryDark, fontWeight: 700, marginTop: 12, fontFamily: "Nunito" }}>Great job! +10 XP ⭐</p><div style={{ marginTop: 10 }}><BigButton bg={t.sunnyDark} onClick={next}>{step + 1 >= 3 ? "Finish trail" : "Next"}</BigButton></div></>)}
      </div>
    </LessonShell>
  );
}

// ---------------- Word Grove ----------------
function WordGrove({ tier, onAnswer, onExit }) {
  const t = useTheme();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("idle");
  const q = READING_TIERS[tier][step];

  function choose(opt) {
    if (status === "correct") return;
    const correct = opt === q.word;
    setStatus(correct ? "correct" : "wrong");
    onAnswer(correct);
  }
  function next() {
    if (step + 1 >= READING_TIERS[tier].length) return onExit();
    setStep((s) => s + 1);
    setStatus("idle");
  }

  return (
    <LessonShell mood={status === "wrong" ? "thinking" : "happy"} onExit={onExit}>
      <TrailDots total={READING_TIERS[tier].length} current={step} />
      <div style={{ background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 24, padding: "26px 20px", textAlign: "center" }}>
        <p style={{ fontFamily: "Nunito", opacity: 0.7, margin: 0, fontSize: 13, color: t.ink }}>Word Grove · {DIFFICULTY_LABEL[tier]}</p>
        <div style={{ fontSize: 52, margin: "12px 0" }}>{q.emoji}</div>
        <div style={{ display: "grid", gap: 10 }}>
          {q.options.map((opt) => (
            <BigButton key={opt} bg={status !== "idle" && opt === q.word ? t.primary : t.secondary} onClick={() => choose(opt)} disabled={status === "correct"}>{opt}</BigButton>
          ))}
        </div>
        {status === "wrong" && <p style={{ color: t.accent, fontWeight: 700, marginTop: 12, fontFamily: "Nunito" }}>Sound it out and try again!</p>}
        {status === "correct" && (<><p style={{ color: t.primaryDark, fontWeight: 700, marginTop: 12, fontFamily: "Nunito" }}>You got it! +10 XP ⭐</p><div style={{ marginTop: 10 }}><BigButton bg={t.sunnyDark} onClick={next}>{step + 1 >= READING_TIERS[tier].length ? "Finish grove" : "Next"}</BigButton></div></>)}
      </div>
    </LessonShell>
  );
}

// ---------------- Science Lab ----------------
function ScienceLab({ tier, onAnswer, onExit }) {
  const t = useTheme();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("idle");
  const q = SCIENCE_TIERS[tier][step];

  function choose(label) {
    if (status === "correct") return;
    const correct = label === q.correct;
    setStatus(correct ? "correct" : "wrong");
    onAnswer(correct);
  }
  function next() {
    if (step + 1 >= SCIENCE_TIERS[tier].length) return onExit();
    setStep((s) => s + 1);
    setStatus("idle");
  }

  return (
    <LessonShell mood={status === "wrong" ? "thinking" : "happy"} onExit={onExit}>
      <TrailDots total={SCIENCE_TIERS[tier].length} current={step} />
      <div style={{ background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 24, padding: "26px 20px", textAlign: "center" }}>
        <p style={{ fontFamily: "Nunito", opacity: 0.7, margin: 0, fontSize: 13, color: t.ink }}>Science Lab · {DIFFICULTY_LABEL[tier]}</p>
        <p style={{ fontFamily: "Fredoka", fontSize: 19, color: t.ink, margin: "12px 0" }}>{q.q}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {q.options.map((opt) => (
            <BigButton key={opt.l} bg={status !== "idle" && opt.l === q.correct ? t.primary : t.tertiary} onClick={() => choose(opt.l)} disabled={status === "correct"}>{opt.e}<br />{opt.l}</BigButton>
          ))}
        </div>
        {status === "wrong" && <p style={{ color: t.accent, fontWeight: 700, marginTop: 12, fontFamily: "Nunito" }}>Good guess — try again!</p>}
        {status === "correct" && (<><p style={{ color: t.primaryDark, fontWeight: 700, marginTop: 12, fontFamily: "Nunito" }}>Nice thinking! +10 XP ⭐</p><div style={{ marginTop: 10 }}><BigButton bg={t.sunnyDark} onClick={next}>{step + 1 >= SCIENCE_TIERS[tier].length ? "Finish lab" : "Next"}</BigButton></div></>)}
      </div>
    </LessonShell>
  );
}

// ---------------- Badges ----------------
const BADGE_DEFS = [
  { id: "first_star", label: "First Star", emoji: "🌟", check: (s) => s.totalCorrect >= 1 },
  { id: "hot_streak", label: "Hot Streak", emoji: "🔥", check: (s) => s.overallStreak >= 5 },
  { id: "explorer", label: "Explorer", emoji: "🧭", check: (s) => s.tried.size >= 3 },
  { id: "level_up", label: "Leveled Up", emoji: "🚀", check: (s) => Object.values(s.progress).some((p) => p.difficulty >= 3) },
  { id: "century", label: "Century Club", emoji: "🏆", check: (s) => s.xp >= 100 },
];

// ---------------- Quest card ----------------
function QuestCard({ title, subtitle, emoji, color, onStart, stats }) {
  const t = useTheme();
  const acc = stats.total ? Math.round((stats.correct / stats.total) * 100) : null;
  return (
    <div style={{ background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 22, padding: 18, flex: 1, minWidth: 200 }}>
      <div style={{ fontSize: 36 }}>{emoji}</div>
      <h3 style={{ fontFamily: "Fredoka", color: t.ink, margin: "6px 0 2px", fontSize: 20 }}>{title}</h3>
      <p style={{ fontFamily: "Nunito", color: t.ink, opacity: 0.6, margin: "0 0 10px", fontSize: 13 }}>{subtitle}</p>
      <p style={{ fontFamily: "Nunito", color: t.ink, opacity: 0.55, margin: "0 0 12px", fontSize: 12 }}>{DIFFICULTY_LABEL[stats.difficulty]} level{acc !== null ? ` · ${acc}% correct` : ""}</p>
      <BigButton bg={color} onClick={onStart}>{stats.total ? "Play again" : "Start"}</BigButton>
    </div>
  );
}

// ---------------- Theme Picker ----------------
function ThemePicker({ current, onSelect, onExit }) {
  const t = useTheme();
  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <Palette size={20} color={t.ink} />
        <h2 style={{ fontFamily: "Fredoka", color: t.ink, margin: 0, fontSize: 20 }}>Choose your world</h2>
      </div>
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
      <button onClick={onExit} style={{ display: "flex", alignItems: "center", gap: 6, margin: "20px auto 0", background: "none", border: "none", color: t.ink, opacity: 0.6, fontFamily: "Nunito", cursor: "pointer" }}>
        <ArrowLeft size={16} /> Back to trail map
      </button>
    </div>
  );
}

// ---------------- Parent Dashboard ----------------
function ParentDashboard({ progress, xp, level, badges, minutes, onExit, onReset }) {
  const t = useTheme();
  const [confirming, setConfirming] = useState(false);
  const subjects = [{ key: "math", label: "Math Trail", emoji: "🧮" }, { key: "reading", label: "Word Grove", emoji: "🌳" }, { key: "science", label: "Science Lab", emoji: "🔬" }];
  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <Users size={22} color={t.ink} />
        <h2 style={{ fontFamily: "Fredoka", color: t.ink, margin: 0, fontSize: 22 }}>Parent Dashboard</h2>
      </div>
      <div style={{ background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 20, padding: 18, marginBottom: 14 }}>
        <p style={{ fontFamily: "Nunito", margin: 0, opacity: 0.6, fontSize: 13, color: t.ink }}>This session</p>
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
              <p style={{ fontFamily: "Nunito", margin: 0, fontSize: 12, opacity: 0.6, color: t.ink }}>{p.total ? `${p.correct}/${p.total} correct · ${acc}% accuracy` : "Not tried yet"} · {DIFFICULTY_LABEL[p.difficulty]} level</p>
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
        <button onClick={onExit} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: t.ink, opacity: 0.6, fontFamily: "Nunito", cursor: "pointer" }}>
          <ArrowLeft size={16} /> Back to trail map
        </button>
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

// ---------------- App ----------------
function AppInner({ themeKey, setThemeKey, progress, setProgress, xp, setXp, overallStreak, setOverallStreak, tried, setTried, badges, setBadges, onReset }) {
  const t = useTheme();
  const [screen, setScreen] = useState("hub");
  const [toast, setToast] = useState(null);
  const [sessionStart] = useState(() => Date.now());
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setMinutes(Math.round((Date.now() - sessionStart) / 60000)), 15000);
    return () => clearInterval(id);
  }, [sessionStart]);

  function handleAnswer(subject, correct) {
    setProgress((prev) => {
      const p = { ...prev[subject] };
      p.total += 1;
      if (correct) {
        p.correct += 1; p.streak += 1; p.missStreak = 0;
        if (p.streak >= 3 && p.difficulty < 3) { p.difficulty += 1; p.streak = 0; }
      } else {
        p.streak = 0; p.missStreak += 1;
        if (p.missStreak >= 2 && p.difficulty > 1) { p.difficulty -= 1; p.missStreak = 0; }
      }
      return { ...prev, [subject]: p };
    });
    setTried((prev) => new Set(prev).add(subject));
    setOverallStreak((prev) => (correct ? prev + 1 : 0));
    if (correct) setXp((prev) => prev + 10);
  }

  useEffect(() => {
    const totalCorrect = Object.values(progress).reduce((a, p) => a + p.correct, 0);
    const snapshot = { totalCorrect, overallStreak, tried, progress, xp };
    BADGE_DEFS.forEach((b) => {
      if (!badges.includes(b.id) && b.check(snapshot)) {
        setBadges((prev) => [...prev, b.id]);
        setToast(b);
        setTimeout(() => setToast(null), 2800);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, xp, overallStreak, tried]);

  const level = Math.floor(xp / 50) + 1;
  const xpIntoLevel = xp % 50;

  return (
    <div style={{ minHeight: 520, background: t.bg, fontFamily: "Nunito, sans-serif", padding: "26px 16px", borderRadius: 12, position: "relative", transition: "background .3s ease" }}>
      {toast && (
        <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", background: t.ink, color: t.bg, padding: "8px 16px", borderRadius: 999, fontFamily: "Fredoka", fontSize: 14, display: "flex", gap: 8, alignItems: "center", zIndex: 10 }}>
          <Award size={16} /> Badge unlocked: {toast.emoji} {toast.label}
        </div>
      )}

      {screen === "hub" && (
        <div style={{ maxWidth: 540, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => setScreen("theme")} style={{ display: "flex", alignItems: "center", gap: 6, background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 999, padding: "6px 12px", fontFamily: "Nunito", fontSize: 12, color: t.ink, cursor: "pointer" }}>
              <Palette size={14} /> Customize
            </button>
          </div>
          <div style={{ marginTop: -20, marginBottom: 6 }}><Logo size={84} /></div>
          <p style={{ fontFamily: "Nunito", color: t.ink, opacity: 0.6, textAlign: "center", fontSize: 14, margin: "0 0 16px" }}>Let's explore today!</p>

          <div style={{ background: t.cardBg, border: `2px solid ${t.border}`, borderRadius: 16, padding: "12px 16px", marginBottom: 18, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontFamily: "Fredoka", color: t.sunnyDark, fontSize: 15 }}>Lv.{level}</div>
            <div style={{ flex: 1, height: 10, background: t.border, borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: `${(xpIntoLevel / 50) * 100}%`, height: "100%", background: t.sunny }} />
            </div>
            <div style={{ fontFamily: "Nunito", fontSize: 12, opacity: 0.6, color: t.ink }}>{xpIntoLevel}/50 XP</div>
            {overallStreak >= 2 && (<div style={{ display: "flex", alignItems: "center", gap: 3, color: t.accent, fontFamily: "Fredoka", fontSize: 13 }}><Flame size={15} /> {overallStreak}</div>)}
          </div>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <QuestCard title="Math Trail" subtitle="Count & add" emoji="🧮" color={t.primary} onStart={() => setScreen("math")} stats={progress.math} />
            <QuestCard title="Word Grove" subtitle="Match words" emoji="🌳" color={t.secondaryDark} onStart={() => setScreen("reading")} stats={progress.reading} />
            <QuestCard title="Science Lab" subtitle="Fun facts" emoji="🔬" color={t.tertiary} onStart={() => setScreen("science")} stats={progress.science} />
          </div>

          <button onClick={() => setScreen("dashboard")} style={{ display: "flex", alignItems: "center", gap: 6, margin: "22px auto 0", background: "none", border: "none", color: t.ink, opacity: 0.55, fontFamily: "Nunito", fontSize: 13, cursor: "pointer" }}>
            <Users size={15} /> Parent Dashboard
          </button>
        </div>
      )}

      {screen === "math" && <MathTrail tier={progress.math.difficulty} onAnswer={(c) => handleAnswer("math", c)} onExit={() => setScreen("hub")} />}
      {screen === "reading" && <WordGrove tier={progress.reading.difficulty} onAnswer={(c) => handleAnswer("reading", c)} onExit={() => setScreen("hub")} />}
      {screen === "science" && <ScienceLab tier={progress.science.difficulty} onAnswer={(c) => handleAnswer("science", c)} onExit={() => setScreen("hub")} />}
      {screen === "dashboard" && <ParentDashboard progress={progress} xp={xp} level={level} badges={badges} minutes={minutes} onExit={() => setScreen("hub")} onReset={onReset} />}
      {screen === "theme" && <ThemePicker current={themeKey} onSelect={setThemeKey} onExit={() => setScreen("hub")} />}
    </div>
  );
}

const STORAGE_KEY = "learolab:save";
const DEFAULT_PROGRESS = {
  math: { correct: 0, total: 0, difficulty: 1, streak: 0, missStreak: 0 },
  reading: { correct: 0, total: 0, difficulty: 1, streak: 0, missStreak: 0 },
  science: { correct: 0, total: 0, difficulty: 1, streak: 0, missStreak: 0 },
};

export default function LearoLab() {
  useFonts();
  const [loaded, setLoaded] = useState(false);
  const [themeKey, setThemeKey] = useState("jungle");
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const [xp, setXp] = useState(0);
  const [overallStreak, setOverallStreak] = useState(0);
  const [tried, setTried] = useState(new Set());
  const [badges, setBadges] = useState([]);

  // Load any saved game on first mount
  useEffect(() => {
    (async () => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const data = JSON.parse(saved);
          if (data.themeKey) setThemeKey(data.themeKey);
          if (data.progress) setProgress(data.progress);
          if (typeof data.xp === "number") setXp(data.xp);
          if (typeof data.overallStreak === "number") setOverallStreak(data.overallStreak);
          if (Array.isArray(data.tried)) setTried(new Set(data.tried));
          if (Array.isArray(data.badges)) setBadges(data.badges);
        }
      } catch (err) {
        // no save yet, or storage unavailable — start fresh
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // Save whenever anything meaningful changes, after the initial load completes
  useEffect(() => {
    if (!loaded) return;
    const data = { themeKey, progress, xp, overallStreak, tried: Array.from(tried), badges };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [loaded, themeKey, progress, xp, overallStreak, tried, badges]);

  function handleReset() {
    setThemeKey("jungle");
    setProgress(DEFAULT_PROGRESS);
    setXp(0);
    setOverallStreak(0);
    setTried(new Set());
    setBadges([]);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  if (!loaded) {
    return (
      <div style={{ minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center", background: THEMES.jungle.bg, borderRadius: 12, fontFamily: "Nunito, sans-serif", color: THEMES.jungle.ink }}>
        Loading your trail…
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={THEMES[themeKey]}>
      <AppInner
        themeKey={themeKey} setThemeKey={setThemeKey}
        progress={progress} setProgress={setProgress}
        xp={xp} setXp={setXp}
        overallStreak={overallStreak} setOverallStreak={setOverallStreak}
        tried={tried} setTried={setTried}
        badges={badges} setBadges={setBadges}
        onReset={handleReset}
      />
    </ThemeContext.Provider>
  );
}
