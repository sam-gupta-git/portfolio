import * as THREE from "three";
import { CATS, type CatId } from "@/data/portfolio";

export type SceneApi = {
  focus(id: CatId | null): void;
  dispose(): void;
};

type SceneOpts = {
  canvas: HTMLCanvasElement;
  labels: HTMLDivElement;
  /** read every frame: the open section and the section hovered in the list */
  getFocus: () => { active: CatId | null; hover: CatId | null };
  onHoverChange: (id: CatId | null) => void;
  onSelect: (id: CatId, leaf?: string) => void;
  onBackground: () => void;
};

type HitData = { kind: "core" } | { kind: "cat"; id: CatId } | { kind: "leaf"; id: CatId; leaf: string };

type LeafRT = { base: THREE.Vector3; cur: THREE.Vector3; mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>; phase: number; label: HTMLDivElement };

type CatRT = {
  id: CatId;
  base: THREE.Vector3;
  cur: THREE.Vector3;
  from: THREE.Vector3;
  node: THREE.Group;
  fillM: THREE.MeshBasicMaterial;
  edgeM: THREE.LineBasicMaterial;
  col: THREE.Color;
  phase: number;
  label: HTMLDivElement;
  leaves: LeafRT[];
};

type Filament = {
  a: () => THREE.Vector3;
  b: () => THREE.Vector3;
  cat: CatRT;
  isLeaf: boolean;
  bow: number;
  N: number;
  geo: THREE.BufferGeometry;
  mat: THREE.LineBasicMaterial;
  phase: number;
  sparks: number[];
};

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Builds the helix-and-filament viewport. Returns null when WebGL is unavailable. */
export function initScene(opts: SceneOpts): SceneApi | null {
  const { canvas, labels } = opts;
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.autoClear = false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const cssv = (n: string) => getComputedStyle(document.documentElement).getPropertyValue(n).trim() || "#888888";
  const col = { ink: new THREE.Color(), ink2: new THREE.Color(), line: new THREE.Color(), nodeFill: new THREE.Color(), fog: new THREE.Color() };
  const readCols = () => {
    col.ink.set(cssv("--ink"));
    col.ink2.set(cssv("--ink-2"));
    col.line.set(cssv("--line"));
    col.nodeFill.set(cssv("--node-fill"));
    col.fog.set(cssv("--fog"));
  };
  readCols();

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(col.fog, 14, 34);
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  const world = new THREE.Group();
  scene.add(world);

  // ---------- materials (kept together so a theme change can recolor them)
  const M = {
    ink: new THREE.LineBasicMaterial({ color: col.ink, transparent: true, opacity: 0.55 }),
    faint: new THREE.LineBasicMaterial({ color: col.line, transparent: true, opacity: 0.5 }),
    grid: new THREE.LineBasicMaterial({ color: col.line, transparent: true, opacity: 0.28 }),
    dash: new THREE.LineDashedMaterial({ color: col.line, dashSize: 0.09, gapSize: 0.07, transparent: true, opacity: 0.9 }),
    strandA: new THREE.MeshBasicMaterial({ color: col.ink }),
    strandB: new THREE.MeshBasicMaterial({ color: 0xffffff }),
    hit: new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
    spark: new THREE.PointsMaterial({ color: 0xffffff, vertexColors: true, size: 0.085, sizeAttenuation: true, transparent: true, opacity: 0.95, depthWrite: false }),
  };

  // ---------- helix core
  const core = new THREE.Group();
  world.add(core);
  const PAIRS = 26, HH = 3.6, HR = 0.55, TURNS = 2.2;
  const sph = new THREE.SphereGeometry(0.05, 10, 8);
  const sA = new THREE.InstancedMesh(sph, M.strandA, PAIRS);
  const sB = new THREE.InstancedMesh(sph, M.strandB, PAIRS);
  const dm = new THREE.Object3D();
  const rung: number[] = [];
  const helixAt = (u: number, off: number) => {
    const a = u * TURNS * Math.PI * 2 + off;
    return new THREE.Vector3(Math.cos(a) * HR, (u - 0.5) * HH, Math.sin(a) * HR);
  };
  for (let i = 0; i < PAIRS; i++) {
    const u = i / (PAIRS - 1), a = helixAt(u, 0), b = helixAt(u, Math.PI);
    dm.position.copy(a); dm.updateMatrix(); sA.setMatrixAt(i, dm.matrix);
    dm.position.copy(b); dm.updateMatrix(); sB.setMatrixAt(i, dm.matrix);
    rung.push(a.x, a.y, a.z, b.x, b.y, b.z);
  }
  core.add(sA, sB);
  const rungGeo = new THREE.BufferGeometry();
  rungGeo.setAttribute("position", new THREE.Float32BufferAttribute(rung, 3));
  core.add(new THREE.LineSegments(rungGeo, M.faint));
  [0, Math.PI].forEach((off) => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 140; i++) pts.push(helixAt(i / 140, off));
    core.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), M.ink));
  });

  // dashed datum ring, ticks, and the core axis
  const ringPts: THREE.Vector3[] = [];
  for (let i = 0; i <= 96; i++) {
    const a = (i / 96) * Math.PI * 2;
    ringPts.push(new THREE.Vector3(Math.cos(a) * 1.35, 0, Math.sin(a) * 1.35));
  }
  const ring = new THREE.Line(new THREE.BufferGeometry().setFromPoints(ringPts), M.dash);
  ring.computeLineDistances();
  world.add(ring);
  const tk: number[] = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2, r1 = 1.35, r2 = i % 3 ? 1.45 : 1.6;
    tk.push(Math.cos(a) * r1, 0, Math.sin(a) * r1, Math.cos(a) * r2, 0, Math.sin(a) * r2);
  }
  const tkGeo = new THREE.BufferGeometry();
  tkGeo.setAttribute("position", new THREE.Float32BufferAttribute(tk, 3));
  world.add(new THREE.LineSegments(tkGeo, M.faint));
  const axis = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -HH * 0.75, 0), new THREE.Vector3(0, HH * 0.75, 0)]), M.dash);
  axis.computeLineDistances();
  world.add(axis);
  const coreHit = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, HH, 8), M.hit);
  coreHit.userData = { kind: "core" } satisfies HitData;
  world.add(coreHit);

  // ---------- floor grid
  const gp: number[] = [];
  for (let i = -20; i <= 20; i++) gp.push(i, 0, -20, i, 0, 20, -20, 0, i, 20, 0, i);
  const gGeo = new THREE.BufferGeometry();
  gGeo.setAttribute("position", new THREE.Float32BufferAttribute(gp, 3));
  const grid = new THREE.LineSegments(gGeo, M.grid);
  grid.position.y = -4.4;
  scene.add(grid);

  // ---------- section nodes + leaves
  const GEOS = {
    box: () => new THREE.BoxGeometry(0.62, 0.62, 0.62),
    ico: () => new THREE.IcosahedronGeometry(0.44, 0),
    oct: () => new THREE.OctahedronGeometry(0.48, 0),
    cyl: () => new THREE.CylinderGeometry(0.3, 0.3, 0.6, 14, 1),
    tet: () => new THREE.TetrahedronGeometry(0.5, 0),
  };
  const hitTargets: THREE.Object3D[] = [coreHit];
  const filaments: Filament[] = [];
  const mkLabel = (cls: string, html: string) => {
    const d = document.createElement("div");
    d.className = "lbl " + cls;
    d.innerHTML = html;
    labels.appendChild(d);
    return d;
  };
  const coreLabel = mkLabel("core", "<span>SAM GUPTA</span>");

  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  const makeFil = (a: () => THREE.Vector3, b: () => THREE.Vector3, cat: CatRT, isLeaf: boolean, bow: number, sparks: number): Filament => {
    const N = 48, geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    const mat = new THREE.LineBasicMaterial({ color: col.ink, transparent: true, opacity: 0.5 });
    world.add(new THREE.Line(geo, mat));
    return { a, b, cat, isLeaf, bow, N, geo, mat, phase: rnd() * 6.28, sparks: Array.from({ length: sparks }, (_, i) => i / sparks + rnd() * 0.1) };
  };

  const cats: CatRT[] = CATS.map((c, ci) => {
    const g = GEOS[c.geo]();
    const fillM = new THREE.MeshBasicMaterial({ color: col.nodeFill, transparent: true, opacity: 0.94, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
    const edgeM = new THREE.LineBasicMaterial({ color: col.ink });
    const node = new THREE.Group();
    node.add(new THREE.Mesh(g, fillM), new THREE.LineSegments(new THREE.EdgesGeometry(g), edgeM));
    const hit = new THREE.Mesh(new THREE.SphereGeometry(0.75, 10, 8), M.hit);
    hit.userData = { kind: "cat", id: c.id } satisfies HitData;
    node.add(hit);
    hitTargets.push(hit);
    world.add(node);

    const base = new THREE.Vector3(...c.pos);
    const label = mkLabel("cat", `${esc(c.label)}<span class="n">${String(c.leaves.length).padStart(2, "0")}</span>`);
    label.style.setProperty("--sc", `var(--c-${c.id})`);
    const rt: CatRT = {
      id: c.id, base, cur: base.clone(), node, fillM, edgeM, label, leaves: [],
      col: new THREE.Color(cssv(`--c-${c.id}`)),
      phase: ci * 1.7,
      from: new THREE.Vector3(0, Math.max(-HH / 2, Math.min(HH / 2, base.y * 0.55)), 0),
    };

    // leaves fan out on a small disc facing away from the core
    const out = base.clone().normalize();
    const u = new THREE.Vector3().crossVectors(out, new THREE.Vector3(0, 1, 0)).normalize();
    if (u.lengthSq() < 0.01) u.set(1, 0, 0);
    const v = new THREE.Vector3().crossVectors(out, u).normalize();
    rt.leaves = c.leaves.map((lf, li) => {
      const n = c.leaves.length;
      const a = n === 1 ? 0.6 : (li / n) * Math.PI * 2 + ci;
      const r = n === 1 ? 0.4 : 1.15 + rnd() * 0.3;
      const lb = base.clone().addScaledVector(out, 1.1 + rnd() * 0.4).addScaledVector(u, Math.cos(a) * r).addScaledVector(v, Math.sin(a) * r);
      const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.075, 0), new THREE.MeshBasicMaterial({ color: col.ink2 }));
      const h = new THREE.Mesh(new THREE.SphereGeometry(0.26, 8, 6), M.hit);
      h.userData = { kind: "leaf", id: c.id, leaf: lf.id } satisfies HitData;
      m.add(h);
      hitTargets.push(h);
      world.add(m);
      const o: LeafRT = { base: lb, cur: lb.clone(), mesh: m, phase: rnd() * 6.28, label: mkLabel("leaf", esc(lf.label)) };
      filaments.push(makeFil(() => rt.cur, () => o.cur, rt, true, 0.35, 1));
      return o;
    });
    filaments.push(makeFil(() => rt.from, () => rt.cur, rt, false, 1, 4));
    return rt;
  });

  // colored strand: one shared color drifting through the section palette; settles on the focused section
  const strandCol = cats[0].col.clone(), cycleCol = new THREE.Color();

  // sparks travelling along filaments
  const sparkCount = filaments.reduce((s, f) => s + f.sparks.length, 0);
  const sparkGeo = new THREE.BufferGeometry();
  sparkGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(sparkCount * 3), 3));
  sparkGeo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(sparkCount * 3), 3));
  world.add(new THREE.Points(sparkGeo, M.spark));

  // ---------- orientation triad (bottom-left inset, shown only while dragging)
  const tScene = new THREE.Scene();
  const tCam = new THREE.PerspectiveCamera(40, 1, 0.1, 10);
  tCam.position.set(0, 0, 3.4);
  const triad = new THREE.Group();
  tScene.add(triad);
  const triadMats: THREE.Material[] = [];
  const tm = <T extends THREE.Material>(m: T): T => {
    m.transparent = true;
    m.opacity = 0;
    triadMats.push(m);
    return m;
  };
  let triadA = 0;
  (
    [
      ["X", "#e0524e", [1, 0, 0]],
      ["Y", "#3daa5c", [0, 1, 0]],
      ["Z", "#3d7fe0", [0, 0, 1]],
    ] as const
  ).forEach(([n, c, d]) => {
    const dir = new THREE.Vector3(...d);
    triad.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), dir]), tm(new THREE.LineBasicMaterial({ color: c }))));
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 10), tm(new THREE.MeshBasicMaterial({ color: c })));
    cone.position.copy(dir);
    cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    triad.add(cone);
    const cv = document.createElement("canvas");
    cv.width = cv.height = 64;
    const x = cv.getContext("2d");
    if (x) {
      x.fillStyle = c;
      x.font = '500 40px "IBM Plex Mono", monospace';
      x.textAlign = "center";
      x.textBaseline = "middle";
      x.fillText(n, 32, 34);
    }
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    const sp = new THREE.Sprite(tm(new THREE.SpriteMaterial({ map: tex, depthTest: false })));
    sp.scale.set(0.34, 0.34, 1);
    sp.position.copy(dir).multiplyScalar(1.32);
    triad.add(sp);
  });

  // ---------- view state
  let W = 1, H = 1, narrow = false;
  let rotY = -0.35, rotX = 0.12, velY = 0, velX = 0;
  let rotTarget: { x: number; y: number } | null = null;
  let dist = 34, distBase = 15, zoomMul = 1;
  const look = new THREE.Vector3(), lookTarget = new THREE.Vector3();
  let offX = 0;
  let intro = reduce ? 1 : 0;

  const resize = () => {
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    narrow = W < 760;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    const asp = W / H;
    distBase = asp < 0.7 ? 23 : asp < 1.1 ? 18 : 14.5;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener("resize", resize);

  // ---------- pointer
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  let ptr: { x: number; y: number } | null = null;
  let down: { moved: number } | null = null;
  let dragging = false;
  const pick = (): HitData | null => {
    if (!ptr) return null;
    ndc.set((ptr.x / W) * 2 - 1, -(ptr.y / H) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(hitTargets, false)[0];
    return hit ? (hit.object.userData as HitData) : null;
  };
  const localPtr = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const onDown = (e: PointerEvent) => {
    canvas.setPointerCapture(e.pointerId);
    down = { moved: 0 };
    dragging = true;
    velX = velY = 0;
  };
  const onMove = (e: PointerEvent) => {
    ptr = localPtr(e);
    if (dragging && down) {
      const dx = e.movementX || 0, dy = e.movementY || 0;
      down.moved += Math.abs(dx) + Math.abs(dy);
      if (down.moved > 4) {
        canvas.classList.add("drag");
        rotTarget = null;
        velY = dx * 0.006;
        velX = dy * 0.004;
        rotY += velY;
        rotX = Math.max(-0.7, Math.min(0.8, rotX + velX));
      }
    }
  };
  const onUp = (e: PointerEvent) => {
    canvas.classList.remove("drag");
    dragging = false;
    if (down && down.moved <= 4) {
      ptr = localPtr(e);
      const h = pick();
      const { active } = opts.getFocus();
      if (!h || (h.kind === "core" && active)) opts.onBackground();
      else if (h.kind === "core") { rotTarget = null; zoomMul = 1; }
      else opts.onSelect(h.id, h.kind === "leaf" ? h.leaf : undefined);
    }
    down = null;
  };
  const onLeave = () => { ptr = null; };
  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    zoomMul = Math.max(0.55, Math.min(1.7, zoomMul * (1 + e.deltaY * 0.0012)));
  };
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointerleave", onLeave);
  canvas.addEventListener("wheel", onWheel, { passive: false });

  // ---------- theme
  const recolor = () => {
    readCols();
    (scene.fog as THREE.Fog).color.copy(col.fog);
    M.ink.color.copy(col.ink);
    M.faint.color.copy(col.line);
    M.grid.color.copy(col.line);
    M.dash.color.copy(col.line);
    M.strandA.color.copy(col.ink);
    cats.forEach((c) => {
      c.fillM.color.copy(col.nodeFill);
      c.col.set(cssv(`--c-${c.id}`));
    });
  };
  const darkMq = window.matchMedia("(prefers-color-scheme: dark)");
  darkMq.addEventListener("change", recolor);
  const themeObs = new MutationObserver(recolor);
  themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  // ---------- helpers
  const q = new THREE.Vector3(), tmp = new THREE.Vector3(), ctl = new THREE.Vector3(), side = new THREE.Vector3(), UP = new THREE.Vector3(0, 1, 0);
  const bez = (a: THREE.Vector3, c: THREE.Vector3, b: THREE.Vector3, t: number, out: THREE.Vector3) => {
    const s = 1 - t;
    return out.set(
      s * s * a.x + 2 * s * t * c.x + t * t * b.x,
      s * s * a.y + 2 * s * t * c.y + t * t * b.y,
      s * s * a.z + 2 * s * t * c.z + t * t * b.z,
    );
  };
  const angDiff = (a: number, b: number) => {
    let d = (b - a) % (Math.PI * 2);
    if (d > Math.PI) d -= Math.PI * 2;
    if (d < -Math.PI) d += Math.PI * 2;
    return d;
  };
  const place = (el: HTMLElement, p: THREE.Vector3, op: number) => {
    tmp.copy(p).applyMatrix4(world.matrixWorld);
    const z = tmp.z;
    tmp.project(camera);
    if (tmp.z > 1) { el.style.opacity = "0"; return; }
    const x = ((tmp.x + 1) / 2) * W, y = ((1 - tmp.y) / 2) * H;
    const depth = Math.max(0.25, Math.min(1, 0.62 + z / 10));
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    el.style.opacity = (op * depth).toFixed(3);
  };

  // ---------- loop
  let last = performance.now(), t = 0, raf = 0, lastHover: CatId | null = null;
  const frame = (now: number) => {
    const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
    last = now;
    if (!reduce) t += dt;
    intro = Math.min(1, intro + dt / 1.8);
    const ease = 1 - Math.pow(1 - intro, 3);
    const { active, hover } = opts.getFocus();

    // hover
    const h = !dragging && ptr ? pick() : null;
    const pickedCat = h && h.kind !== "core" ? h.id : null;
    if (pickedCat !== lastHover) { lastHover = pickedCat; opts.onHoverChange(pickedCat); }
    canvas.classList.toggle("hot", !!h);
    const hoverCat = pickedCat ?? hover;
    const focusCat = active ?? hoverCat;

    // rotation
    if (rotTarget !== null) {
      rotY += angDiff(rotY, rotTarget.y) * Math.min(1, dt * 3.2);
      rotX += (rotTarget.x - rotX) * Math.min(1, dt * 3.2);
    } else if (!dragging) {
      rotY += velY;
      rotX = Math.max(-0.7, Math.min(0.8, rotX + velX));
      velY *= 0.94;
      velX *= 0.9;
      if (!active && !reduce && !hoverCat) rotY += dt * 0.07;
    }
    world.rotation.set(rotX, rotY, 0);
    core.rotation.y = t * 0.35;

    const fc = focusCat ? cats.find((c) => c.id === focusCat) : undefined;
    const n = cats.length;
    const ph = (((t * 0.22) % n) + n) % n, k = Math.floor(ph) % n, f = ph - k, sm = f * f * (3 - 2 * f);
    cycleCol.copy(cats[k].col).lerp(cats[(k + 1) % n].col, sm);
    strandCol.lerp(fc ? fc.col : cycleCol, Math.min(1, dt * (fc ? 6 : 2.5)));
    M.strandB.color.copy(strandCol);

    // camera
    const distTarget = distBase * zoomMul * (active ? 0.78 : 1);
    dist += (distTarget - dist) * Math.min(1, dt * (intro < 1 ? 2.2 : 3));
    const offTarget = active && !narrow ? Math.min(400, W * 0.32) / 2 : 0;
    offX += (offTarget - offX) * Math.min(1, dt * 4);
    lookTarget.set(0, narrow && active ? -2.4 : 0, 0);
    look.lerp(lookTarget, Math.min(1, dt * 3));
    camera.position.set(look.x, look.y + dist * 0.1, dist);
    camera.lookAt(look);
    camera.setViewOffset(W, H, offX, 0, W, H);
    world.updateMatrixWorld();

    // nodes
    cats.forEach((c) => {
      c.cur
        .set(
          c.base.x + Math.sin(t * 0.5 + c.phase) * 0.18,
          c.base.y + Math.sin(t * 0.7 + c.phase * 1.3) * 0.22,
          c.base.z + Math.cos(t * 0.45 + c.phase) * 0.18,
        )
        .multiplyScalar(0.35 + 0.65 * ease);
      c.node.position.copy(c.cur);
      const on = c.id === focusCat;
      c.node.rotation.y += dt * (on ? 1.1 : 0.25);
      c.node.rotation.x += dt * (on ? 0.5 : 0.1);
      const s = c.node.scale.x;
      c.node.scale.setScalar(s + ((on ? 1.18 : 1) - s) * Math.min(1, dt * 8));
      c.edgeM.color.copy(on ? c.col : col.ink);
      const dim = focusCat && !on;
      place(c.label, c.cur, ease * (dim ? 0.55 : 1));
      c.label.classList.toggle("on", on);
      c.leaves.forEach((o) => {
        o.cur
          .copy(o.base)
          .add(q.set(Math.sin(t * 0.8 + o.phase) * 0.12, Math.cos(t * 0.6 + o.phase) * 0.12, Math.sin(t * 0.5 + o.phase * 2) * 0.12))
          .multiplyScalar(0.2 + 0.8 * ease);
        o.mesh.position.copy(o.cur);
        o.mesh.rotation.y += dt * 0.8;
        o.mesh.material.color.copy(on ? c.col : col.ink2);
        place(o.label, o.cur, on ? ease : 0);
        o.label.classList.toggle("on", on);
      });
    });
    place(coreLabel, q.set(0, -HH / 2 - 0.55, 0), ease * (active ? 0.3 : 0.9));

    // filaments + sparks
    const sp = sparkGeo.attributes.position.array as Float32Array;
    const sc = sparkGeo.attributes.color.array as Float32Array;
    let si = 0;
    filaments.forEach((fl) => {
      const a = fl.a(), b = fl.b();
      side.subVectors(b, a);
      const len = side.length();
      side.cross(UP).normalize();
      ctl
        .addVectors(a, b)
        .multiplyScalar(0.5)
        .addScaledVector(UP, Math.sin(t * 0.55 + fl.phase) * 0.55 * fl.bow + 0.5 * fl.bow)
        .addScaledVector(side, Math.cos(t * 0.4 + fl.phase) * 0.45 * fl.bow * Math.min(1, len / 4));
      const arr = fl.geo.attributes.position.array as Float32Array;
      for (let i = 0; i < fl.N; i++) {
        bez(a, ctl, b, i / (fl.N - 1), q);
        arr[i * 3] = q.x; arr[i * 3 + 1] = q.y; arr[i * 3 + 2] = q.z;
      }
      fl.geo.attributes.position.needsUpdate = true;
      fl.geo.setDrawRange(0, Math.max(2, Math.round(fl.N * ease)));
      const on = fl.cat.id === focusCat;
      fl.mat.color.copy(on ? fl.cat.col : col.ink);
      fl.mat.opacity = on ? 0.95 : focusCat ? 0.18 : fl.isLeaf ? 0.3 : 0.5;
      const speed = (on ? 0.55 : 0.16) * (fl.isLeaf ? 1.4 : 1);
      fl.sparks.forEach((s, j) => {
        fl.sparks[j] = (s + dt * speed) % 1;
        const vis = intro >= 1 && (on || !focusCat);
        bez(a, ctl, b, fl.sparks[j], q);
        if (!vis) q.set(0, -999, 0);
        sc[si] = fl.cat.col.r; sc[si + 1] = fl.cat.col.g; sc[si + 2] = fl.cat.col.b;
        sp[si++] = q.x; sp[si++] = q.y; sp[si++] = q.z;
      });
    });
    sparkGeo.attributes.position.needsUpdate = true;
    sparkGeo.attributes.color.needsUpdate = true;

    // triad shows only while a drag (or its momentum) is turning the model
    const turning = (dragging && !!down && down.moved > 4) || (rotTarget === null && Math.abs(velY) + Math.abs(velX) > 0.0015);
    triadA += ((turning ? 1 : 0) - triadA) * Math.min(1, dt * (turning ? 8 : 2.5));
    triadMats.forEach((m) => { m.opacity = triadA; });

    // render main + triad inset
    renderer.setScissorTest(false);
    renderer.setViewport(0, 0, W, H);
    renderer.clear();
    renderer.render(scene, camera);
    if (!narrow && triadA > 0.01) {
      const s = 96, x = 14, y = 46;
      triad.quaternion.copy(camera.quaternion).invert().multiply(world.quaternion);
      renderer.setScissorTest(true);
      renderer.setScissor(x, y, s, s);
      renderer.setViewport(x, y, s, s);
      renderer.clearDepth();
      renderer.render(tScene, tCam);
      renderer.setScissorTest(false);
    }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  return {
    focus(id) {
      if (!id) { rotTarget = null; zoomMul = 1; return; }
      const c = cats.find((x) => x.id === id);
      if (!c) return;
      rotTarget = { y: -Math.atan2(c.base.x, c.base.z), x: Math.max(-0.4, Math.min(0.5, c.base.y * 0.12)) };
      zoomMul = 1;
    },
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("wheel", onWheel);
      darkMq.removeEventListener("change", recolor);
      themeObs.disconnect();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose());
      });
      renderer.dispose();
      labels.replaceChildren();
    },
  };
}
