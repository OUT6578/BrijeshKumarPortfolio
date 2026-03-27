import { useState, useEffect, useRef } from "react";

/* ── GLOBAL STYLES ── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=JetBrains+Mono:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; background: #030712; color: white; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: #030712; }
    ::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#7c3aed,#ec4899,#06b6d4); border-radius: 2px; }

    /* Keyframes */
    @keyframes fadeUp       { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:none; } }
    @keyframes fadeLeft     { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:none; } }
    @keyframes fadeRight    { from { opacity:0; transform:translateX(28px);  } to { opacity:1; transform:none; } }
    @keyframes scaleIn      { from { opacity:0; transform:scale(.88); }        to { opacity:1; transform:scale(1); } }
    @keyframes blink        { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes floatY       { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes gradShift    { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
    @keyframes spin         { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes spinR        { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
    @keyframes pulse        { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(.96)} }
    @keyframes shimmer      { from{background-position:-200% center} to{background-position:200% center} }
    @keyframes borderGlow   { 0%,100%{box-shadow:0 0 0 0 rgba(139,92,246,.4)} 50%{box-shadow:0 0 0 6px rgba(139,92,246,0)} }
    @keyframes slideBar     { from{width:0} to{width:var(--w)} }
    @keyframes marq         { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes particleDrift { 0%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.1)} 66%{transform:translate(-20px,15px) scale(.9)} 100%{transform:translate(0,0) scale(1)} }
    @keyframes typewriter   { from{width:0} to{width:100%} }
    @keyframes cursorBlink  { 0%,100%{border-color:transparent} 50%{border-color:#a78bfa} }
    @keyframes countUp      { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
    @keyframes ripple       { 0%{transform:scale(0);opacity:.6} 100%{transform:scale(2.5);opacity:0} }
    @keyframes glow         { 0%,100%{filter:brightness(1)} 50%{filter:brightness(1.3)} }

    .syne      { font-family: 'Syne', sans-serif; }
    .mono      { font-family: 'JetBrains Mono', monospace; }
    .dm        { font-family: 'DM Sans', sans-serif; }

    /* Shimmer text */
    .text-shimmer {
      background: linear-gradient(90deg, #a78bfa, #f472b6, #34d399, #60a5fa, #a78bfa);
      background-size: 300% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 4s linear infinite;
    }

    /* Animated gradient bg */
    .grad-bg {
      background: linear-gradient(-45deg, #1e1b4b, #0f172a, #042f2e, #0f172a);
      background-size: 400% 400%;
      animation: gradShift 12s ease infinite;
    }

    /* Scroll reveal */
    .reveal { opacity:0; transform:translateY(24px); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
    .reveal.visible { opacity:1; transform:none; }
    .reveal-l { opacity:0; transform:translateX(-24px); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
    .reveal-l.visible { opacity:1; transform:none; }
    .reveal-r { opacity:0; transform:translateX(24px); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
    .reveal-r.visible { opacity:1; transform:none; }

    /* Hover card lift */
    .card-lift { transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s; }
    .card-lift:hover { transform: translateY(-5px); }

    /* Glowing border on hover */
    .glow-hover { transition: box-shadow .35s; }
    .glow-hover:hover { box-shadow: 0 0 0 1px rgba(167,139,250,.5), 0 8px 32px rgba(139,92,246,.2); }

    /* Skill pill */
    .skill-pill {
      position: relative;
      overflow: hidden;
      transition: color .25s, border-color .25s;
    }
    .skill-pill::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(139,92,246,.3), rgba(236,72,153,.3));
      transform: scaleX(0);
      transform-origin: left;
      transition: transform .3s cubic-bezier(.16,1,.3,1);
    }
    .skill-pill:hover::before { transform: scaleX(1); }
    .skill-pill span { position: relative; z-index: 1; }

    /* Nav link underline */
    .nav-link { position: relative; }
    .nav-link::after { content:''; position:absolute; bottom:-3px; left:0; width:0; height:2px; background:linear-gradient(90deg,#a78bfa,#f472b6); transition:width .3s cubic-bezier(.16,1,.3,1); }
    .nav-link:hover::after, .nav-link.active::after { width: 100%; }

    /* Button ripple */
    .btn-ripple { position: relative; overflow: hidden; }
    .btn-ripple::after { content:''; position:absolute; inset:0; background:radial-gradient(circle, rgba(255,255,255,.25) 0%, transparent 70%); opacity:0; transition:opacity .3s; }
    .btn-ripple:hover::after { opacity:1; }

    /* Floating orbs */
    .orb { position:absolute; border-radius:50%; pointer-events:none; }
  `}</style>
);

/* ── DATA ── */
const DATA = {
  name: ["BRAJESH", "KUMAR"],
  role: ".NET Full Stack Developer",
  tagline: "ASP.NET Core · Angular · SQL Server · Clean Architecture",
  email: "brajeshk8200@gmail.com",
  phone: "8200129130",
  location: "Noida, Sector-15, India",
  links: {
    linkedin: "https://www.linkedin.com/in/braj%20eshkumar-9a1212212/",
    github: "https://github.com/brajeshkumar60730",
    leetcode: "https://leetcode.com/u/BrajeshCodeTech/",
  },
  about:
    "I build robust, scalable full-stack applications with relentless focus on performance, security, and clean architecture. From core banking systems processing millions in transactions to HIPAA-compliant healthcare APIs — I thrive on complex domains where mistakes cost real money.",
  stats: [
    { label: "Years Exp", value: 2, suffix: "+", color: "#a78bfa", glow: "rgba(167,139,250,.4)" },
    { label: "DSA Solved", value: 50, suffix: "+", color: "#38bdf8", glow: "rgba(56,189,248,.4)" },
    { label: "Countries", value: 4, suffix: "", color: "#34d399", glow: "rgba(52,211,153,.4)" },
    { label: "CGPA", value: 8.66, suffix: "", color: "#fb923c", glow: "rgba(251,146,60,.4)" },
  ],
  skills: {
    Languages: { items: ["C#","JavaScript","TypeScript","Python","Java"], color: "#a78bfa", gradient: "from-violet-500 to-purple-600" },
    Backend:   { items: ["ASP.NET Core","ASP.NET MVC","Web API","ADO.NET","Entity Framework"], color: "#38bdf8", gradient: "from-blue-500 to-indigo-600" },
    Frontend:  { items: ["Angular","HTML5","CSS3","jQuery","Bootstrap"], color: "#34d399", gradient: "from-emerald-500 to-teal-600" },
    Databases: { items: ["SQL Server","MySQL","PostgreSQL"], color: "#fb923c", gradient: "from-orange-500 to-amber-500" },
    Tools:     { items: ["Git","GitHub","Postman","TFS","JIRA"], color: "#f472b6", gradient: "from-pink-500 to-rose-600" },
    Concepts:  { items: ["REST APIs","JWT Auth","HIPAA","Perf Tuning","Clean Arch"], color: "#a3e635", gradient: "from-lime-500 to-green-600" },
  },
  experience: [
    {
      company: "CETPA Infotech",
      sub: "E-Governance · DFCCIL · Ministry of Railways, GoI",
      role: "Software Engineer",
      period: "Jan 2026 – Present",
      location: "Noida, Sector-15",
      project: "DFCCIL – Leave Management & Beat Tracking",
      current: true,
      color: "#a78bfa",
      gradient: "from-violet-500 to-purple-600",
      tech: ["ASP.NET MVC","Entity Framework","SQL Server","JavaScript","RBAC"],
      bullets: [
        "Architected Leave Management & Beat Tracking System for DFCCIL under Ministry of Railways.",
        "Engineered multi-level approval workflows, real-time attendance tracking with complete audit trails.",
        "Designed robust MVC + Entity Framework backend with strict RBAC and business-rule validation.",
        "Automated reporting pipelines cut manual effort ~40% and enabled real-time operational visibility.",
      ],
    },
    {
      company: "Craft Silicon",
      sub: "Banking Software Solutions",
      role: "Software Engineer",
      period: "Oct 2024 – Jan 2026",
      location: "Ahmedabad, India",
      project: "Nibbles – Core Banking System",
      current: false,
      color: "#38bdf8",
      gradient: "from-blue-500 to-indigo-600",
      tech: ["ASP.NET MVC","ADO.NET Core","SQL Server","jQuery","HTML/CSS"],
      bullets: [
        "Developed mission-critical core banking modules (Client, Account, Loan, Gold Loan).",
        "Delivered ASP.NET MVC + ADO.NET Core system ensuring secure regulatory-compliant data flows.",
        "Revamped UI/UX reducing manual data-entry errors by ~20%.",
        "Executed 4 international deployments: Sri Lanka, Ethiopia, and Mauritius.",
      ],
    },
    {
      company: "J2ML Infotech",
      sub: "Healthcare Technology — US Market",
      role: "Software Engineer",
      period: "Nov 2023 – Jun 2024",
      location: "Ahmedabad, India",
      project: "Simplified – Eligibility Dentistry",
      current: false,
      color: "#34d399",
      gradient: "from-emerald-500 to-teal-600",
      tech: ["ASP.NET Core","Entity Framework Core","MySQL","REST API","HIPAA"],
      bullets: [
        "Built production-grade backend APIs for a US dental insurance eligibility verification platform.",
        "Optimized stored procedures and data-access, improving response time ~30%.",
        "Implemented end-to-end HIPAA-compliant workflows for secure PHI handling.",
        "Reduced development cycle ~25% via modular service architecture.",
      ],
    },
  ],
  projects: [
    {
      num: "01",
      title: "Hotel Booking Application",
      period: "Nov 2020 – Jun 2023",
      desc: "Full-stack hotel reservation platform with user auth, advanced search, booking engine, payments, and automated notifications.",
      metrics: ["~20% Faster Login", "~30% Quicker Search", "100% Secure Pay", "~40% Alert Rate"],
      tags: ["ASP.NET","SQL Server","JavaScript","MVC","Bootstrap"],
      color: "#a78bfa",
      gradient: "from-violet-500 to-fuchsia-500",
    },
    {
      num: "02",
      title: "PDF Generate API",
      period: "Personal Project",
      desc: "Scalable RESTful API for dynamic PDF generation with Razor-style templates, validation, and Swagger auto-docs.",
      metrics: ["Dynamic Templates","REST Design","Auto Validation","Swagger Docs"],
      tags: ["ASP.NET Core","Web API","C#","REST"],
      color: "#38bdf8",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      num: "03",
      title: "Topic Talk WebAPI",
      period: "Personal Project",
      desc: "Topic-based REST API with JWT auth, role-based access control, structured user interaction, and response management.",
      metrics: ["JWT Auth","RBAC Roles","REST Endpoints","Modular Design"],
      tags: ["ASP.NET Core","C#","REST API","JWT"],
      color: "#34d399",
      gradient: "from-emerald-500 to-teal-500",
    },
  ],
  achievements: [
    { icon: "⭐", title: "HackerRank Java", desc: "Rated 3★ — top percentile Java badge", color: "#fb923c" },
    { icon: "🧩", title: "LeetCode DSA", desc: "50+ problems: Arrays, Trees, DP, Graphs", color: "#38bdf8" },
    { icon: "🏆", title: "Academic Topper", desc: "Top rank — 5th & 6th Semester (GTU)", color: "#a78bfa" },
    { icon: "🌍", title: "Global Deployments", desc: "4 live banking deployments, 3 continents", color: "#34d399" },
  ],
  education: {
    degree: "B.E. Computer Engineering",
    inst: "Marwadi Education Foundation (GTU), Rajkot",
    period: "Jun 2019 – Jul 2023",
    cgpa: "8.66 / 10",
  },
};

/* ── HOOKS ── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-l, .reveal-r");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useCounter(target: number, decimals = 0): [number, React.RefObject<HTMLDivElement | null>] {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let cur = 0;
        const steps = 60;
        const inc = target / steps;
        const iv = setInterval(() => {
          cur += inc;
          if (cur >= target) { setVal(target); clearInterval(iv); }
          else setVal(parseFloat(cur.toFixed(decimals)));
        }, 18);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return [val, ref];
}

/* ── FLOATING PARTICLES ── */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let W = (c.width = window.innerWidth), H = (c.height = window.innerHeight);
    let mx = W / 2, my = H / 2;
    const colors = ["#a78bfa", "#f472b6", "#38bdf8", "#34d399", "#fb923c"];
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      r: Math.random() * 1.5 + .5,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * .4 + .1,
    }));
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onResize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const dx = p.x - mx, dy = p.y - my, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) { p.x += (dx / d) * .5; p.y += (dy / d) * .5; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(167,139,250,${(1 - d / 100) * .12})`;
          ctx.lineWidth = .6;
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: .55 }} />;
}

/* ── TYPEWRITER ── */
function TypeWriter({ texts, speed = 80 }: { texts: string[], speed?: number }) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[idx % texts.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (display.length < current.length) setDisplay(current.slice(0, display.length + 1));
        else setTimeout(() => setDeleting(true), 1800);
      } else {
        if (display.length > 0) setDisplay(display.slice(0, -1));
        else { setDeleting(false); setIdx((i) => i + 1); }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [display, deleting, idx, texts]);
  return (
    <span>
      {display}
      <span style={{ borderRight: "2px solid #a78bfa", marginLeft: 2, animation: "blink .9s step-end infinite", display: "inline-block", height: "1em", verticalAlign: "text-bottom" }} />
    </span>
  );
}

/* ── SECTION HEADING ── */
function SH({ num, title, color = "#a78bfa" }: { num: string, title: string, color?: string }) {
  return (
    <div className="reveal" style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
      <span className="mono" style={{ fontSize: ".6rem", letterSpacing: ".25em", color: color + "aa", textTransform: "uppercase" }}>{num}</span>
      <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg, ${color}44, transparent)` }} />
      <h2 className="syne" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, background: `linear-gradient(135deg, ${color}, #fff)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{title}</h2>
    </div>
  );
}

/* ── NAV ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setActive(id); };
  const links = ["home", "about", "experience", "projects", "skills", "contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(3,7,18,.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,.08)" : "1px solid transparent",
      transition: "all .4s",
    }}>
      <button onClick={() => go("home")} style={{ background: "none", border: "none", cursor: "pointer" }}>
        <span className="syne" style={{ fontSize: "1.5rem", fontWeight: 800, background: "linear-gradient(135deg,#a78bfa,#f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>BK</span>
        <span className="mono" style={{ fontSize: ".55rem", color: "rgba(255,255,255,.3)", letterSpacing: ".2em", marginLeft: 4 }}>.dev</span>
      </button>

      {/* Desktop */}
      <div style={{ display: "flex", gap: "2rem" }} className="hm-links">
        {links.map((l) => (
          <button key={l} onClick={() => go(l)} className={`nav-link ${active === l ? "active" : ""}`}
            style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "JetBrains Mono, monospace", fontSize: ".6rem", letterSpacing: ".18em", textTransform: "uppercase", color: active === l ? "#fff" : "rgba(255,255,255,.45)", transition: "color .25s" }}>
            {l}
          </button>
        ))}
      </div>

      {/* Status badge */}
      <div style={{ display: "flex", alignItems: "center", gap: ".5rem", padding: ".4rem 1rem", borderRadius: 99, background: "rgba(52,211,153,.08)", border: "1px solid rgba(52,211,153,.25)" }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399", animation: "pulse 2s ease-in-out infinite", display: "inline-block" }} />
        <span className="mono text-shimmer" style={{ fontSize: ".6rem", letterSpacing: ".12em" }}>OPEN TO WORK</span>
      </div>

      <style>{`@media(max-width:768px){.hm-links{display:none!important;}}`}</style>
    </nav>
  );
}

/* ── HERO ── */
function Hero() {
  const [mouse, setMouse] = useState({ x: .5, y: .5 });
  useEffect(() => {
    const fn = (e: MouseEvent) => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: "6rem" }}>
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, background: "#030712" }} />
      <div style={{
        position: "absolute", inset: 0, transition: "all .8s",
        background: `
          radial-gradient(ellipse 90% 70% at ${35 + mouse.x * 15}% ${25 + mouse.y * 20}%, rgba(139,92,246,.25) 0%, transparent 55%),
          radial-gradient(ellipse 70% 50% at ${70 - mouse.x * 10}% ${65 + mouse.y * 10}%, rgba(59,130,246,.2) 0%, transparent 55%),
          radial-gradient(ellipse 50% 40% at 15% 85%, rgba(16,185,129,.15) 0%, transparent 50%)
        `,
      }} />
      {/* Animated rings */}
      {[300, 200, 100].map((size, i) => (
        <div key={i} style={{
          position: "absolute", right: "8%", top: "50%",
          width: size, height: size,
          border: "1px solid rgba(167,139,250,.1)",
          borderRadius: "50%",
          animation: `${i % 2 === 0 ? "spin" : "spinR"} ${30 - i * 6}s linear infinite`,
          transform: "translate(0,-50%)",
        }} />
      ))}
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, opacity: .04, backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      <div style={{ position: "relative", zIndex: 5, maxWidth: "80rem", margin: "0 auto", padding: "5rem 2rem", width: "100%" }}>
        {/* Pill badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".4rem 1rem", borderRadius: 99, background: "rgba(167,139,250,.08)", border: "1px solid rgba(167,139,250,.25)", marginBottom: "2rem", animation: "fadeUp .6s .2s cubic-bezier(.16,1,.3,1) both" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#a78bfa", animation: "pulse 2s ease-in-out infinite", display: "inline-block" }} />
          <span className="mono" style={{ fontSize: ".6rem", letterSpacing: ".18em", color: "#c4b5fd" }}>FULL STACK DEVELOPER · NOIDA, INDIA</span>
        </div>

        {/* Name */}
        <div>
          {DATA.name.map((word, wi) => (
            <div key={wi} style={{ overflow: "visible", paddingBottom: "0.5rem" }}>
              <h1 className="syne" style={{
                fontSize: "clamp(3rem,10vw,8rem)", fontWeight: 800, lineHeight: .95,
                letterSpacing: "-0.02em",
                background: wi === 0
                  ? "linear-gradient(135deg,#fff 0%,rgba(255,255,255,.7) 100%)"
                  : "linear-gradient(135deg,#a78bfa,#f472b6,#38bdf8)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                animation: wi === 0
                  ? "fadeUp .7s .5s cubic-bezier(.16,1,.3,1) both"
                  : "fadeUp .7s .7s cubic-bezier(.16,1,.3,1) both, shimmer 4s linear infinite",
              }}>{word}</h1>
            </div>
          ))}
        </div>

        {/* Role typewriter */}
        <div style={{ marginTop: "1.5rem", marginBottom: "1rem", animation: "fadeUp .7s 1s cubic-bezier(.16,1,.3,1) both" }}>
          <span className="mono" style={{ fontSize: "clamp(.8rem,2vw,1.1rem)", color: "rgba(255,255,255,.6)" }}>
            <TypeWriter texts={[DATA.role, "ASP.NET Core Expert", "Angular Developer", "Clean Architecture Advocate"]} />
          </span>
        </div>

        <p style={{ maxWidth: 500, color: "rgba(255,255,255,.5)", lineHeight: 1.75, marginBottom: "2.5rem", fontSize: ".95rem", animation: "fadeUp .7s 1.2s cubic-bezier(.16,1,.3,1) both" }}>
          {DATA.about}
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", marginBottom: "4rem", animation: "fadeUp .7s 1.4s cubic-bezier(.16,1,.3,1) both" }}>
          <a href={`mailto:${DATA.email}`} className="btn-ripple" style={{
            display: "inline-block", padding: ".85rem 2rem", borderRadius: 12,
            background: "linear-gradient(135deg,#7c3aed,#ec4899)",
            backgroundSize: "200% 200%", animation: "gradShift 4s ease infinite",
            color: "#fff", fontWeight: 600, fontSize: ".9rem", textDecoration: "none",
            boxShadow: "0 8px 32px rgba(139,92,246,.4)", transition: "transform .25s, box-shadow .25s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(139,92,246,.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(139,92,246,.4)"; }}>
            Get In Touch →
          </a>
          <a href="/DotNet__FullStackDeveloper.pdf" download="Brajesh_Kumar_Resume.pdf" style={{
            display: "inline-block", padding: ".85rem 1.8rem", borderRadius: 12,
            background: "linear-gradient(135deg,#059669,#0d9488)",
            backgroundSize: "200% 200%", animation: "gradShift 4s ease infinite",
            color: "#fff", fontWeight: 600, fontSize: ".9rem", textDecoration: "none",
            boxShadow: "0 8px 32px rgba(5,150,105,.4)", transition: "transform .25s, box-shadow .25s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(5,150,105,.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(5,150,105,.4)"; }}>
            📄 Download Resume
          </a>
          {[["GitHub ↗", DATA.links.github], ["LinkedIn ↗", DATA.links.linkedin]].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" style={{
              display: "inline-block", padding: ".85rem 1.8rem", borderRadius: 12,
              background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.15)",
              color: "rgba(255,255,255,.8)", fontWeight: 500, fontSize: ".9rem", textDecoration: "none", transition: "all .25s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.15)"; }}>
              {label}
            </a>
          ))}
        </div>

        {/* Stats */}s
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: "1rem", maxWidth: 600, animation: "fadeUp .7s 1.6s cubic-bezier(.16,1,.3,1) both" }}>
          {DATA.stats.map((s, i) => {
            const [val, ref] = useCounter(s.value, s.value % 1 !== 0 ? 2 : 0);
            return (
              <div key={i} ref={ref as any} className="card-lift" style={{
                padding: "1.25rem", borderRadius: 16,
                background: "rgba(255,255,255,.03)", border: `1px solid ${s.color}22`,
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 0% 0%, ${s.color}15, transparent 70%)` }} />
                <div className="syne" style={{ fontSize: "2rem", fontWeight: 800, color: s.color, textShadow: `0 0 20px ${s.glow}`, lineHeight: 1 }}>
                  {val}{s.suffix}
                </div>
                <div className="mono" style={{ fontSize: ".55rem", letterSpacing: ".18em", color: "rgba(255,255,255,.4)", textTransform: "uppercase", marginTop: ".4rem" }}>{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── ABOUT ── */
function About() {
  return (
    <section id="about" style={{ padding: "6rem 2rem", background: "#030712", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,92,246,.06), transparent)", pointerEvents: "none" }} />
      <div style={{ maxWidth: "80rem", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <SH num="01 /" title="About Me" color="#a78bfa" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "3rem", alignItems: "start" }}>
          <div>
            <h3 className="reveal syne" style={{ fontSize: "clamp(1.2rem,3vw,1.8rem)", fontWeight: 700, lineHeight: 1.3, marginBottom: "1.5rem" }}>
              Turning complex domains into{" "}
              <span className="text-shimmer" style={{ fontStyle: "italic" }}>clean, reliable code.</span>
            </h3>
            <p className="reveal" style={{ color: "rgba(255,255,255,.55)", lineHeight: 1.85, marginBottom: "2rem", transitionDelay: ".1s" }}>{DATA.about}</p>
            <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem", transitionDelay: ".2s" }}>
              {DATA.achievements.map((a, i) => (
                <div key={i} className="card-lift glow-hover" style={{
                  padding: "1rem", borderRadius: 12,
                  background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)",
                  transition: "all .35s",
                }}>
                  <span style={{ fontSize: "1.3rem" }}>{a.icon}</span>
                  <div className="syne" style={{ fontSize: ".85rem", fontWeight: 700, color: a.color, marginTop: ".4rem" }}>{a.title}</div>
                  <div style={{ fontSize: ".75rem", color: "rgba(255,255,255,.4)", marginTop: ".2rem" }}>{a.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-r" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Contact card */}
            <div style={{ borderRadius: 16, border: "1px solid rgba(167,139,250,.2)", overflow: "hidden", background: "rgba(255,255,255,.02)" }}>
              <div style={{ padding: ".75rem 1.25rem", background: "linear-gradient(135deg,rgba(167,139,250,.15),rgba(244,114,182,.1))", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                <span className="mono" style={{ fontSize: ".6rem", letterSpacing: ".2em", color: "rgba(255,255,255,.5)", textTransform: "uppercase" }}>Contact Info</span>
              </div>
              {[["✉", "Email", DATA.email], ["📱", "Phone", DATA.phone], ["📍", "Location", DATA.location]].map(([icon, k, v]) => (
                <div key={k} style={{ display: "flex", gap: ".75rem", padding: ".85rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,.04)", alignItems: "flex-start" }}>
                  <span style={{ fontSize: ".9rem", marginTop: 2 }}>{icon}</span>
                  <div>
                    <div className="mono" style={{ fontSize: ".55rem", color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: ".18em" }}>{k}</div>
                    <div style={{ fontSize: ".85rem", color: "rgba(255,255,255,.75)", wordBreak: "break-all", marginTop: ".15rem" }}>{v}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Education card */}
            <div style={{ borderRadius: 16, border: "1px solid rgba(52,211,153,.2)", overflow: "hidden", background: "rgba(255,255,255,.02)" }}>
              <div style={{ padding: ".75rem 1.25rem", background: "linear-gradient(135deg,rgba(52,211,153,.1),rgba(20,184,166,.1))", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                <span className="mono" style={{ fontSize: ".6rem", letterSpacing: ".2em", color: "rgba(255,255,255,.5)", textTransform: "uppercase" }}>Education</span>
              </div>
              <div style={{ padding: "1.25rem" }}>
                <div className="syne" style={{ fontWeight: 700, marginBottom: ".4rem" }}>{DATA.education.degree}</div>
                <div style={{ fontSize: ".8rem", color: "rgba(255,255,255,.45)", marginBottom: ".25rem" }}>{DATA.education.inst}</div>
                <div className="mono" style={{ fontSize: ".7rem", color: "rgba(255,255,255,.3)", marginBottom: ".75rem" }}>{DATA.education.period}</div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".35rem .85rem", borderRadius: 99, background: "rgba(52,211,153,.1)", border: "1px solid rgba(52,211,153,.25)" }}>
                  <span className="syne" style={{ fontWeight: 800, color: "#34d399", fontSize: ".85rem" }}>CGPA {DATA.education.cgpa}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── EXPERIENCE ── */
function Experience() {
  const [open, setOpen] = useState(0);
  return (
    <section id="experience" style={{ padding: "6rem 2rem", background: "#030712", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(56,189,248,.05), transparent)", pointerEvents: "none" }} />
      <div style={{ maxWidth: "80rem", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <SH num="02 /" title="Experience" color="#38bdf8" />
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {DATA.experience.map((exp, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="reveal" style={{
                borderRadius: 16, overflow: "hidden",
                border: `1px solid ${isOpen ? exp.color + "44" : "rgba(255,255,255,.08)"}`,
                background: isOpen ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.02)",
                transition: "all .4s cubic-bezier(.16,1,.3,1)",
                boxShadow: isOpen ? `0 8px 32px ${exp.color}18` : "none",
                transitionDelay: `${i * .08}s`,
              }}>
                {/* Color top bar */}
                <div style={{ height: isOpen ? 3 : 0, background: `linear-gradient(90deg, ${exp.gradient ? exp.color : "#a78bfa"}, transparent)`, transition: "height .3s" }} />
                <button onClick={() => setOpen(isOpen ? -1 : i)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "1.5rem", textAlign: "left" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: exp.color, marginTop: 6, flexShrink: 0, boxShadow: `0 0 ${isOpen ? "12px 4px" : "0 0"} ${exp.color}`, transition: "box-shadow .4s", animation: exp.current ? "pulse 2s ease-in-out infinite" : "none" }} />
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: ".6rem", flexWrap: "wrap", marginBottom: ".3rem" }}>
                          <span className="syne" style={{ fontSize: "1.15rem", fontWeight: 800, background: `linear-gradient(135deg,${exp.color},#fff)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{exp.company}</span>
                          {exp.current && <span className="mono" style={{ fontSize: ".55rem", letterSpacing: ".15em", padding: ".15rem .6rem", borderRadius: 99, background: "rgba(52,211,153,.1)", border: "1px solid rgba(52,211,153,.3)", color: "#34d399" }}>● CURRENT</span>}
                        </div>
                        <div className="mono" style={{ fontSize: ".62rem", color: "rgba(255,255,255,.35)", marginBottom: ".4rem" }}>{exp.sub}</div>
                        <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap", alignItems: "center" }}>
                          <span style={{ fontSize: ".85rem", color: "rgba(255,255,255,.7)", fontWeight: 500 }}>{exp.role}</span>
                          <span style={{ color: "rgba(255,255,255,.2)" }}>·</span>
                          <span style={{ fontSize: ".8rem", color: "rgba(255,255,255,.4)" }}>{exp.project}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div className="mono" style={{ fontSize: ".65rem", color: "rgba(255,255,255,.4)" }}>{exp.period}</div>
                      <div className="mono" style={{ fontSize: ".6rem", color: "rgba(255,255,255,.25)", marginTop: ".2rem" }}>{exp.location}</div>
                      <div style={{ fontSize: "1rem", color: isOpen ? exp.color : "rgba(255,255,255,.3)", marginTop: ".4rem", transition: "transform .3s, color .3s", transform: isOpen ? "rotate(180deg)" : "none", display: "inline-block" }}>↓</div>
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div style={{ padding: "0 1.5rem 1.5rem", animation: "fadeUp .4s cubic-bezier(.16,1,.3,1) both" }}>
                    <div style={{ paddingLeft: "1.6rem", marginBottom: "1.2rem", display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
                      {exp.tech.map((t) => (
                        <span key={t} className="mono" style={{ fontSize: ".6rem", padding: ".2rem .65rem", borderRadius: 6, background: exp.color + "18", border: `1px solid ${exp.color}33`, color: exp.color }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ paddingLeft: "1.6rem", display: "flex", flexDirection: "column", gap: ".85rem" }}>
                      {exp.bullets.map((b, j) => (
                        <div key={j} style={{ display: "flex", gap: ".85rem", alignItems: "flex-start", animation: `fadeUp .4s ${j * 80}ms cubic-bezier(.16,1,.3,1) both` }}>
                          <span className="mono" style={{ fontSize: ".65rem", color: exp.color, flexShrink: 0, marginTop: 3, minWidth: 20 }}>0{j + 1}</span>
                          <span style={{ fontSize: ".88rem", color: "rgba(255,255,255,.65)", lineHeight: 1.8 }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── PROJECTS ── */
function Projects() {
  return (
    <section id="projects" style={{ padding: "6rem 2rem", background: "#030712", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(52,211,153,.05), transparent)", pointerEvents: "none" }} />
      <div style={{ maxWidth: "80rem", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <SH num="03 /" title="Selected Work" color="#34d399" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem" }}>
          {DATA.projects.map((p, i) => (
            <div key={i} className="reveal card-lift" style={{
              borderRadius: 20, border: `1px solid ${p.color}22`,
              background: "rgba(255,255,255,.025)", overflow: "hidden",
              display: "flex", flexDirection: "column", position: "relative",
              transitionDelay: `${i * .1}s`,
              transition: "transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s, border-color .35s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = p.color + "55"; e.currentTarget.style.boxShadow = `0 16px 48px ${p.color}20`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = p.color + "22"; e.currentTarget.style.boxShadow = "none"; }}>
              {/* Gradient top bar */}
              <div style={{ height: 3, background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <span className="mono" style={{ fontSize: ".6rem", color: "rgba(255,255,255,.3)", letterSpacing: ".12em" }}>{p.period}</span>
                  <span className="syne" style={{ fontSize: "3rem", fontWeight: 900, lineHeight: 1, color: p.color, opacity: .18, transition: "opacity .3s" }}>{p.num}</span>
                </div>
                <h3 className="syne" style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: ".6rem", color: "#fff" }}>{p.title}</h3>
                <p style={{ fontSize: ".82rem", color: "rgba(255,255,255,.5)", lineHeight: 1.75, marginBottom: "1.25rem", flex: 1 }}>{p.desc}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".4rem", marginBottom: "1.25rem" }}>
                  {p.metrics.map((m, j) => (
                    <div key={j} style={{ padding: ".6rem .8rem", borderRadius: 8, background: p.color + "10", border: `1px solid ${p.color}20`, textAlign: "center" }}>
                      <span className="mono" style={{ fontSize: ".62rem", color: p.color + "cc" }}>{m}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
                  {p.tags.map((t) => (
                    <span key={t} className="mono" style={{ fontSize: ".58rem", padding: ".18rem .55rem", borderRadius: 5, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.5)" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SKILLS ── */
function Skills() {
  const [active, setActive] = useState("Languages");
  const categories = Object.keys(DATA.skills);

  return (
    <section id="skills" style={{ padding: "6rem 2rem", background: "#030712", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(251,146,60,.05), transparent)", pointerEvents: "none" }} />
      <div style={{ maxWidth: "80rem", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <SH num="04 /" title="Technical Skills" color="#fb923c" />

        {/* Marquee */}
        <div className="reveal" style={{ borderTop: "1px solid rgba(255,255,255,.06)", borderBottom: "1px solid rgba(255,255,255,.06)", padding: "1rem 0", overflow: "hidden", position: "relative", marginBottom: "2.5rem" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(90deg,#030712,transparent)", zIndex: 1 }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(270deg,#030712,transparent)", zIndex: 1 }} />
          <div style={{ display: "flex", gap: "2.5rem", width: "max-content", animation: "marq 25s linear infinite" }}>
            {[...Object.values(DATA.skills).flatMap(s => s.items), ...Object.values(DATA.skills).flatMap(s => s.items)].map((sk, i) => (
              <span key={i} className="mono" style={{ fontSize: ".75rem", color: "rgba(255,255,255,.35)", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: ".6rem" }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#a78bfa", display: "inline-block" }} />
                {sk}
              </span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", marginBottom: "1.75rem" }}>
          {categories.map((cat) => {
            const isActive = active === cat;
            const col = (DATA.skills as any)[cat].color;
            return (
              <button key={cat} onClick={() => setActive(cat)} style={{
                padding: ".5rem 1.2rem", borderRadius: 10, cursor: "pointer",
                fontFamily: "JetBrains Mono, monospace", fontSize: ".62rem", letterSpacing: ".12em", textTransform: "uppercase",
                border: `1px solid ${isActive ? col + "66" : "rgba(255,255,255,.1)"}`,
                background: isActive ? col + "18" : "rgba(255,255,255,.03)",
                color: isActive ? col : "rgba(255,255,255,.45)",
                transition: "all .25s", boxShadow: isActive ? `0 0 16px ${col}28` : "none",
              }}>
                {cat}
              </button>
            );
          })}
        </div>

        {/* Active pills */}
        <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", minHeight: 56, marginBottom: "2.5rem", transitionDelay: ".1s" }}>
          {(DATA.skills as any)[active].items.map((sk: string, i: number) => (
            <span key={sk} className="skill-pill mono" style={{
              padding: ".5rem 1.1rem", borderRadius: 10, cursor: "default",
              fontSize: ".75rem", border: `1px solid ${(DATA.skills as any)[active].color}44`,
              background: (DATA.skills as any)[active].color + "12",
              color: (DATA.skills as any)[active].color,
              animation: `scaleIn .3s ${i * 50}ms cubic-bezier(.16,1,.3,1) both`,
            }}>
              <span>{sk}</span>
            </span>
          ))}
        </div>

        {/* All skill boxes */}
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "1rem", transitionDelay: ".15s" }}>
          {Object.entries(DATA.skills).map(([cat, info]) => (
            <div key={cat} className="card-lift" style={{
              borderRadius: 14, border: `1px solid ${info.color}22`,
              background: "rgba(255,255,255,.025)", padding: "1.25rem",
              transition: "border-color .3s, transform .35s, box-shadow .35s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = info.color + "55"; e.currentTarget.style.boxShadow = `0 8px 24px ${info.color}18`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = info.color + "22"; e.currentTarget.style.boxShadow = "none"; }}>
              <div className="mono" style={{ fontSize: ".58rem", letterSpacing: ".2em", color: info.color + "cc", textTransform: "uppercase", marginBottom: ".85rem", paddingBottom: ".7rem", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", justifyContent: "space-between" }}>
                <span>{cat}</span>
                <span style={{ color: "rgba(255,255,255,.2)" }}>{info.items.length}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
                {info.items.map((sk) => (
                  <span key={sk} style={{ fontSize: ".72rem", padding: ".22rem .6rem", borderRadius: 6, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", color: "rgba(255,255,255,.6)", cursor: "default", transition: "all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.color = info.color; e.currentTarget.style.borderColor = info.color + "44"; e.currentTarget.style.background = info.color + "12"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; e.currentTarget.style.background = "rgba(255,255,255,.04)"; }}>
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CONTACT ── */
function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(DATA.email); setCopied(true); setTimeout(() => setCopied(false), 2200); };
  return (
    <section id="contact" style={{ padding: "6rem 2rem 4rem", background: "#030712", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(244,114,182,.06), transparent)", pointerEvents: "none" }} />
      <div style={{ maxWidth: "80rem", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <SH num="05 /" title="Let's Talk" color="#f472b6" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "4rem", alignItems: "center" }}>
          <div>
            <h2 className="reveal syne" style={{ fontSize: "clamp(2.5rem,7vw,5rem)", fontWeight: 900, lineHeight: .95, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
              Let's build<br />
              <span className="text-shimmer">something</span><br />
              <span style={{ fontSize: "clamp(1rem,3vw,1.5rem)", fontWeight: 400, color: "rgba(255,255,255,.3)", fontStyle: "italic" }}>remarkable together.</span>
            </h2>
            <p className="reveal" style={{ color: "rgba(255,255,255,.45)", lineHeight: 1.8, marginBottom: "2rem", transitionDelay: ".1s" }}>Open to full-time roles, freelance engagements, and interesting engineering problems worth solving.</p>
            <div className="reveal" style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", transitionDelay: ".2s" }}>
              {[["LinkedIn", DATA.links.linkedin, "#3b82f6"], ["GitHub", DATA.links.github, "#6b7280"], ["LeetCode", DATA.links.leetcode, "#f59e0b"]].map(([l, h, col]) => (
                <a key={l} href={h} target="_blank" rel="noreferrer" style={{
                  padding: ".6rem 1.4rem", borderRadius: 10, fontWeight: 600, fontSize: ".85rem",
                  background: col + "20", border: `1px solid ${col}44`, color: col,
                  textDecoration: "none", transition: "all .25s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = col + "35"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = col + "20"; e.currentTarget.style.transform = "none"; }}>
                  {l} ↗
                </a>
              ))}
            </div>
          </div>

          <div className="reveal-r" style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,.08)", overflow: "hidden", background: "rgba(255,255,255,.02)" }}>
            {[
              { k: "Email", v: DATA.email, action: copy, actionLabel: copied ? "Copied ✓" : "Copy" },
              { k: "Phone", v: DATA.phone },
              { k: "Location", v: DATA.location },
            ].map(({ k, v, action, actionLabel }) => (
              <div key={k} style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <div>
                  <div className="mono" style={{ fontSize: ".55rem", color: "rgba(255,255,255,.25)", textTransform: "uppercase", letterSpacing: ".18em", marginBottom: ".3rem" }}>{k}</div>
                  <div className="mono" style={{ fontSize: ".82rem", color: "rgba(255,255,255,.75)", wordBreak: "break-all" }}>{v}</div>
                </div>
                {action && (
                  <button onClick={action} style={{
                    padding: ".45rem 1rem", borderRadius: 8, border: "none", cursor: "pointer",
                    background: copied ? "linear-gradient(135deg,#34d399,#14b8a6)" : "linear-gradient(135deg,#7c3aed,#ec4899)",
                    backgroundSize: "200% 200%", animation: "gradShift 4s ease infinite",
                    color: "#fff", fontWeight: 600, fontSize: ".75rem", flexShrink: 0, transition: "transform .2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "none"}>
                    {actionLabel}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer style={{ background: "#030712", borderTop: "1px solid rgba(255,255,255,.06)", padding: "2rem", textAlign: "center" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <span className="syne" style={{ fontSize: "1.1rem", fontWeight: 800, background: "linear-gradient(135deg,#a78bfa,#f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>BRAJESH KUMAR</span>
        <span className="mono" style={{ fontSize: ".6rem", color: "rgba(255,255,255,.25)", letterSpacing: ".18em" }}>© {new Date().getFullYear()} · NOIDA, INDIA · BUILT WITH PASSION</span>
      </div>
    </footer>
  );
}

/* ── APP ── */
export default function Portfolio() {
  useScrollReveal();
  return (
    <div style={{ background: "#030712", minHeight: "100vh", color: "#fff" }}>
      <GlobalStyles />
      <Particles />
      <div style={{ position: "relative", zIndex: 2 }}>
        <Nav />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}