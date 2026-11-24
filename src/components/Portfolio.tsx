"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { initScene, type SceneApi } from "./scene";
import { CATS, COURSES, GITHUB_URL, JOBS, PROJECTS, SKILLS, isCatId, type CatId } from "@/data/portfolio";

const pad = (n: number) => String(n).padStart(2, "0");
const host = (u: string) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const clockFmt = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", hour: "2-digit", minute: "2-digit", hour12: false, timeZoneName: "short" });

function Tags({ list }: { list: string[] }) {
  return (
    <div className="tags">
      {list.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  );
}

function PanelBody({ id }: { id: CatId }) {
  switch (id) {
    case "experience":
      return JOBS.map((j) => (
        <div className="row" data-id={j.id} key={j.id}>
          <div className="row-top">
            <h3>{j.title}</h3>
            <span className="meta">{j.when}</span>
          </div>
          <div className="org">{j.org}</div>
          <p>{j.line}</p>
          <Tags list={j.tags} />
        </div>
      ));
    case "projects":
      return PROJECTS.map((p) => (
        <div className="row" data-id={p.id} key={p.id}>
          <div className="row-top">
            <h3>{p.label}</h3>
            <a className="go" href={p.link} target="_blank" rel="noopener noreferrer">
              {/github\.com/.test(p.link) ? "source" : "live"} ↗
            </a>
          </div>
          <p>{p.line}</p>
          <Tags list={p.tags} />
        </div>
      ));
    case "skills":
      return (
        <dl className="sk-list">
          {SKILLS.map((s) => (
            <div className="sk" data-id={s.id} key={s.id}>
              <dt>{s.label}</dt>
              <dd>{s.list.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      );
    case "education":
      return (
        <div className="row">
          <div className="row-top">
            <h3>University of Texas at Austin</h3>
            <span className="meta">May 2024</span>
          </div>
          <div className="org">B.S. Computer Science</div>
          <Tags list={COURSES} />
        </div>
      );
    case "contact":
      return (
        <div className="row" data-id="github">
          <p>Open to software development roles. Say hi on GitHub.</p>
          <div>
            <a className="cta" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              Open GitHub ↗
            </a>
          </div>
          <div className="handle">{host(GITHUB_URL)}</div>
        </div>
      );
  }
}

export default function Portfolio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<SceneApi | null>(null);

  const [active, setActive] = useState<CatId | null>(null);
  // the section whose content the panel shows; kept after closing so it can slide out with its content
  const [shown, setShown] = useState<CatId>("projects");
  const [listHover, setListHover] = useState<CatId | null>(null);
  const [sceneHover, setSceneHover] = useState<CatId | null>(null);
  const [leaf, setLeaf] = useState<{ id: string; n: number } | null>(null);
  const [hintGone, setHintGone] = useState(false);
  const [clock, setClock] = useState("");
  const [noGL, setNoGL] = useState(false);

  // the scene reads these every frame
  const focusRef = useRef<{ active: CatId | null; hover: CatId | null }>({ active: null, hover: null });
  useEffect(() => {
    focusRef.current = { active, hover: listHover };
  }, [active, listHover]);

  const select = useCallback((id: CatId, leafId?: string, fromKeyboard?: boolean) => {
    setActive(id);
    setShown(id);
    setLeaf(leafId ? { id: leafId, n: Date.now() } : null);
    apiRef.current?.focus(id);
    try {
      history.replaceState(null, "", "#" + id);
    } catch {}
    if (fromKeyboard) requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true }));
  }, []);

  const close = useCallback(() => {
    setActive((was) => {
      if (was && panelRef.current?.contains(document.activeElement)) {
        document.querySelector<HTMLButtonElement>(`.tree [data-cat="${was}"]`)?.focus();
      }
      return null;
    });
    apiRef.current?.focus(null);
    try {
      history.replaceState(null, "", location.pathname + location.search);
    } catch {}
  }, []);

  // stable handles for the scene's callbacks
  const selectRef = useRef(select);
  const closeRef = useRef(close);
  useEffect(() => {
    selectRef.current = select;
    closeRef.current = close;
  }, [select, close]);

  useEffect(() => {
    const canvas = canvasRef.current, labels = labelsRef.current;
    if (!canvas || !labels) return;
    const api = initScene({
      canvas,
      labels,
      getFocus: () => focusRef.current,
      onHoverChange: setSceneHover,
      onSelect: (id, l) => selectRef.current(id, l),
      onBackground: () => closeRef.current(),
    });
    apiRef.current = api;
    const glTimer = api ? 0 : window.setTimeout(() => setNoGL(true), 0);

    const h = location.hash.slice(1);
    const hashTimer = isCatId(h) ? window.setTimeout(() => selectRef.current(h), 0) : 0;

    return () => {
      clearTimeout(glTimer);
      clearTimeout(hashTimer);
      api?.dispose();
      apiRef.current = null;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    document.addEventListener("keydown", onKey);
    const tick = () => {
      try {
        setClock(clockFmt.format(new Date()));
      } catch {}
    };
    const first = window.setTimeout(tick, 0);
    const clockTimer = window.setInterval(tick, 15000);
    const hintTimer = window.setTimeout(() => setHintGone(true), 4500);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(first);
      clearInterval(clockTimer);
      clearTimeout(hintTimer);
    };
  }, []);

  // flash the item that was clicked in 3D
  useEffect(() => {
    if (!leaf) return;
    const row = bodyRef.current?.querySelector<HTMLElement>(`[data-id="${leaf.id}"]`);
    if (!row) return;
    row.classList.add("hl");
    row.scrollIntoView({ block: "nearest" });
    const timer = window.setTimeout(() => row.classList.remove("hl"), 1600);
    return () => clearTimeout(timer);
  }, [leaf]);

  const shownCat = CATS.find((c) => c.id === shown)!;
  const hot = sceneHover ?? listHover;

  return (
    <div className="app">
      <canvas
        ref={canvasRef}
        id="gl"
        aria-label="Interactive 3D map of portfolio sections. Use the section list to navigate by keyboard."
      />
      <div ref={labelsRef} id="labels" aria-hidden="true" />

      <h1 className="sr-only">Sam Gupta, Software Developer</h1>

      <nav className="ov tree gx-l" aria-label="Sections" onMouseLeave={() => setListHover(null)}>
        <div className="tree-root">
          <i />
          sam_gupta.asm
        </div>
        <ul>
          {CATS.map((c) => (
            <li key={c.id}>
              <button
                data-cat={c.id}
                aria-current={active === c.id}
                className={hot === c.id ? "hot" : undefined}
                style={{ "--sc": `var(--c-${c.id})` } as CSSProperties}
                onMouseEnter={() => setListHover(c.id)}
                onClick={(e) => (active === c.id ? close() : select(c.id, undefined, e.detail === 0))}
              >
                <span className="g" />
                <span>{c.label}</span>
                <span className="c">{pad(c.leaves.length)}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <footer className="ov status">
        <span className={`hint${hintGone ? " gone" : ""}`}>
          <span>
            <b>Drag</b> orbit
          </span>
          <span>
            <b>Scroll</b> zoom
          </span>
          <span>
            <b>Click</b> open
          </span>
        </span>
        <span className="loc">30.27°N 97.74°W{clock ? ` · ${clock}` : ""}</span>
      </footer>

      <aside
        ref={panelRef}
        className={`panel${active ? " open" : ""}`}
        aria-labelledby="p-title"
        tabIndex={-1}
        style={{ "--accent": `var(--c-${shown})` } as CSSProperties}
      >
        <div className="p-head">
          <h2 id="p-title">
            {shownCat.label}
            <span className="n">{pad(shownCat.leaves.length)}</span>
          </h2>
          <button className="p-close" aria-label="Close panel" onClick={close}>
            Close <kbd>Esc</kbd>
          </button>
        </div>
        <div className="p-body" ref={bodyRef}>
          <PanelBody id={shown} />
        </div>
      </aside>

      {noGL && <div className="nogl">3D view unavailable in this browser. Use the section list to explore.</div>}
    </div>
  );
}
