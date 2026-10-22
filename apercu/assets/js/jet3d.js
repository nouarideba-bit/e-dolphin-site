/* Simplified 3D model of IRUKA for the configurator: built from code (no CAD file yet),
   turned by dragging, painted with the selected livery. Three.js loads only when 3D is opened. */
window.Jet3D = (() => {
  const THREE_URL = (document.documentElement.lang === 'en' ? '../' : '') + 'assets/js/vendor-three.min.js'; // three.js r149, MIT
  let T, renderer, scene, camera, group, mats, host, colors, raf, auto = true, loading = null;

  const load = () => loading || (loading = new Promise((ok, ko) => {
    if (window.THREE) return ok();
    const s = document.createElement('script'); s.src = THREE_URL; s.onload = ok; s.onerror = ko; document.head.appendChild(s);
  }));

  // Hull lofted from cross-sections, stern (t=0) to bow (t=1). Coordinates: x length, y up, z width.
  const LEN = 3.3, N = 48;
  const halfW = t => t < .35 ? .52 + .1 * t / .35 : .62 * Math.sqrt(Math.max(0, 1 - Math.pow((t - .35) / .65, 2.2)));
  const deckY = t => t < .55 ? .56 + .06 * t / .55 : t < .8 ? .62 + .16 * Math.sin((t - .55) / .25 * Math.PI / 2) : .78 - .38 * Math.pow((t - .8) / .2, 1.4);
  const keelY = t => t < .6 ? 0 : .36 * Math.pow((t - .6) / .4, 1.8);
  // Section outline (one side), from the keel up to the deck centre; band ids pick the material
  const section = t => {
    const w = halfW(t), k = keelY(t), d = Math.max(deckY(t), k + .05), c = Math.max(.2, k + .02);
    return [
      [0, k, 0], [w * .82, c, 0], [w, c + .1, 1], [w * .98, c + .22, 1], [w * .9, d - .06, 2], [w * .55, d, 2], [0, d + .01, 2]
    ];
  };
  const hull = () => {
    const bands = [[], [], []];
    for (let i = 0; i < N; i++) {
      const t0 = i / N, t1 = (i + 1) / N, x0 = -LEN / 2 + t0 * LEN, x1 = -LEN / 2 + t1 * LEN;
      const a = section(t0), b = section(t1);
      for (let j = 0; j < a.length - 1; j++) {
        for (const side of [1, -1]) {
          const p = (s, x, k) => [x, s[k][1], side * s[k][0]];
          const q = [p(a, x0, j), p(b, x1, j), p(b, x1, j + 1), p(a, x0, j + 1)];
          const tri = side > 0 ? [q[0], q[2], q[1], q[0], q[3], q[2]] : [q[0], q[1], q[2], q[0], q[2], q[3]];
          bands[a[j + 1][2]].push(...tri.flat());
        }
      }
    }
    // Transom (flat stern)
    const s = section(0), x = -LEN / 2;
    for (let j = 0; j < s.length - 1; j++) for (const side of [1, -1]) {
      const tri = [[x, s[j][1], side * s[j][0]], [x, s[j + 1][1], side * s[j + 1][0]], [x, s[j + 1][1], 0]];
      bands[0].push(...(side > 0 ? tri : tri.reverse()).flat());
    }
    return bands.map(arr => { const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(arr, 3)); g.computeVertexNormals(); return g; });
  };

  const build = () => {
    T = window.THREE;
    scene = new T.Scene();
    camera = new T.PerspectiveCamera(32, 16 / 9, .1, 100);
    camera.position.set(0, 1.9, 6.4); camera.lookAt(0, .62, 0);
    renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = .85;

    mats = {
      lower: new T.MeshStandardMaterial({ color: 0x1b1f23, roughness: .45, metalness: .3, side: T.DoubleSide }),
      accent: new T.MeshStandardMaterial({ roughness: .35, metalness: .25, side: T.DoubleSide }),
      base: new T.MeshStandardMaterial({ roughness: .28, metalness: .35, side: T.DoubleSide }),
      seat: new T.MeshStandardMaterial({ color: 0x0b0c0d, roughness: .92 }),
      chrome: new T.MeshStandardMaterial({ color: 0xc9d1d6, roughness: .18, metalness: 1 }),
      dark: new T.MeshStandardMaterial({ color: 0x0c0e10, roughness: .4, metalness: .6 }),
      glass: new T.MeshStandardMaterial({ color: 0x0a2a33, roughness: .1, metalness: .2, emissive: 0x0FA3B1, emissiveIntensity: .35 })
    };
    group = new T.Group();
    const [lo, mid, up] = hull();
    group.add(new T.Mesh(lo, mats.lower), new T.Mesh(mid, mats.accent), new T.Mesh(up, mats.base));

    // Seat
    const seat = new T.Mesh(new T.CapsuleGeometry(.16, 1.1, 8, 20), mats.seat);
    seat.rotation.z = Math.PI / 2; seat.scale.set(1, .8, 1.15); seat.position.set(-.45, .7, 0); group.add(seat);
    // Steering column, handlebar, grips, screen
    const col = new T.Mesh(new T.CylinderGeometry(.05, .07, .42, 16), mats.dark);
    col.position.set(.42, .93, 0); col.rotation.z = .35; group.add(col);
    const bar = new T.Mesh(new T.CylinderGeometry(.025, .025, .82, 12), mats.dark);
    bar.rotation.x = Math.PI / 2; bar.position.set(.36, 1.13, 0); group.add(bar);
    for (const z of [.37, -.37]) { const g = new T.Mesh(new T.CylinderGeometry(.04, .04, .14, 12), mats.seat); g.rotation.x = Math.PI / 2; g.position.set(.36, 1.13, z); group.add(g); }
    const screen = new T.Mesh(new T.BoxGeometry(.04, .2, .34), mats.glass);
    screen.position.set(.6, 1.0, 0); screen.rotation.z = .6; group.add(screen);
    // Twin jet nozzles at the stern
    for (const z of [.16, -.16]) {
      const n = new T.Mesh(new T.CylinderGeometry(.1, .085, .3, 24, 1, true), mats.chrome);
      n.rotation.z = Math.PI / 2; n.position.set(-LEN / 2 - .1, .26, z); group.add(n);
      const inner = new T.Mesh(new T.CircleGeometry(.085, 24), mats.dark);
      inner.rotation.y = -Math.PI / 2; inner.position.set(-LEN / 2 - .249, .26, z); group.add(inner);
    }
    // Display stand
    for (const z of [.32, -.32]) {
      const rail = new T.Mesh(new T.CylinderGeometry(.025, .025, 1.9, 12), mats.chrome);
      rail.rotation.z = Math.PI / 2; rail.position.set(-.1, -.28, z); group.add(rail);
      for (const x of [-.85, .65]) { const leg = new T.Mesh(new T.CylinderGeometry(.022, .022, .3, 10), mats.chrome); leg.position.set(x, -.14, z); group.add(leg); }
    }
    // Livery slashes on both flanks (accent colour), angled like the renders
    for (const side of [1, -1]) for (const [t, len, ang] of [[.32, .55, .5], [.5, .7, .45], [.68, .45, .55]]) {
      const w = halfW(t), c = Math.max(.2, keelY(t) + .02);
      const slash = new T.Mesh(new T.BoxGeometry(len, .045, .012), mats.accent);
      slash.position.set(-LEN / 2 + t * LEN, c + .3, side * (w * .93 + .012));
      slash.rotation.set(0, side * -.12, ang); group.add(slash);
    }
    group.position.y = .3;
    group.rotation.y = -.6;
    scene.add(group);

    // Floor and studio light
    const floor = new T.Mesh(new T.CircleGeometry(14, 64), new T.MeshStandardMaterial({ color: 0x0b0d0f, roughness: .85, metalness: 0 }));
    floor.rotation.x = -Math.PI / 2; floor.position.y = 0; scene.add(floor);
    scene.add(new T.HemisphereLight(0xdfe8ee, 0x0b0d0f, .45));
    scene.fog = new T.Fog(0x0b0d0f, 6, 11);
    const key = new T.DirectionalLight(0xffffff, 1.6); key.position.set(3, 5, 4); scene.add(key);
    const fill = new T.DirectionalLight(0xbfd7e6, .9); fill.position.set(-4, 3, -3); scene.add(fill);
    scene.userData.rim = new T.PointLight(0x7CFF3A, 1.6, 7); scene.userData.rim.position.set(-1.5, 2.4, -2.6); scene.add(scene.userData.rim);
  };

  const resize = () => {
    if (!host) return;
    const w = host.clientWidth, h = host.clientHeight || w * 9 / 16;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  };

  const tick = () => {
    if (auto) group.rotation.y += .004;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };

  function paint(c) {
    colors = c;
    if (!mats) return;
    mats.base.color.set(c[0]); mats.accent.color.set(c[1]);
    scene.userData.rim.color.set(c[1]);
  }

  async function mount(el, c) {
    host = el; colors = c;
    if (!el.dataset.ready) {
      el.innerHTML = `<p class="grid h-full place-items-center text-sm text-white/70">${LANG === 'fr' ? 'Chargement de la 3D…' : 'Loading 3D…'}</p>`;
      try { await load(); } catch (_) { el.innerHTML = `<p class="grid h-full place-items-center text-sm text-white/70">${LANG === 'fr' ? '3D indisponible sur ce navigateur.' : '3D unavailable in this browser.'}</p>`; return; }
      if (!renderer) build();
      el.innerHTML = ''; el.appendChild(renderer.domElement);
      Object.assign(renderer.domElement.style, { width: '100%', height: '100%', display: 'block', cursor: 'grab', touchAction: 'pan-y' });
      let x0 = null;
      renderer.domElement.addEventListener('pointerdown', e => { x0 = e.clientX; auto = false; renderer.domElement.setPointerCapture(e.pointerId); renderer.domElement.style.cursor = 'grabbing'; });
      renderer.domElement.addEventListener('pointermove', e => { if (x0 === null) return; group.rotation.y += (e.clientX - x0) * .012; x0 = e.clientX; });
      const up = () => { x0 = null; renderer.domElement.style.cursor = 'grab'; };
      renderer.domElement.addEventListener('pointerup', up); renderer.domElement.addEventListener('pointercancel', up);
      addEventListener('resize', resize);
      el.dataset.ready = '1';
    }
    paint(colors); resize();
    cancelAnimationFrame(raf); tick();
  }
  const turn = (d) => { auto = false; if (group) group.rotation.y += d * Math.PI / 6; };
  const stop = () => cancelAnimationFrame(raf);
  return { mount, paint, turn, stop };
})();
