/**
 * Scene 1 — Hero: choreography, parallax, scroll, particles, grain.
 * Vanilla JS + GSAP/ScrollTrigger (loaded via CDN in index.html).
 */
(function () {
  "use strict";

  var cfg = window.HERO_CONFIG;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // ---------------------------------------------------------------
  // DOM refs
  // ---------------------------------------------------------------
  var heroEl = document.getElementById("hero");
  var stageEl = document.getElementById("heroStage");
  var plateImg = document.getElementById("plateImg");
  var wordmarkEl = document.getElementById("wordmark");
  var wordmarkGlow = document.getElementById("wordmarkGlow");
  var anuragImg = document.getElementById("anuragImg");
  var welcomeLine = document.getElementById("welcomeLine");
  var pillTopRight = document.getElementById("pillTopRight");
  var pillBottomLeft = document.getElementById("pillBottomLeft");
  var headerLine = document.getElementById("headerLine");
  var brandBlock = document.getElementById("brandBlock");
  var brandMark = document.getElementById("brandMark");
  var brandRoles = document.getElementById("brandRoles");
  var siteNav = document.getElementById("siteNav");
  var mobileNav = document.getElementById("mobileNav");
  var menuBtn = document.getElementById("menuBtn");
  var scrollHint = document.getElementById("scrollHint");
  var sceneFade = document.getElementById("sceneFade");
  var dustCanvas = document.getElementById("dustCanvas");
  var grainCanvas = document.getElementById("grainCanvas");
  var dotGridTL = document.querySelector(".dot-grid-tl");
  var dotGridBR = document.querySelector(".dot-grid-br");
  var heroH1 = document.getElementById("hero-h1");

  // ---------------------------------------------------------------
  // Populate content from config
  // ---------------------------------------------------------------
  function buildDotGrid(el) {
    if (!el) return;
    for (var i = 0; i < 15; i++) {
      var span = document.createElement("span");
      el.appendChild(span);
    }
  }

  function buildWordmark() {
    var text = cfg.wordmark || "";
    wordmarkEl.innerHTML = "";
    for (var i = 0; i < text.length; i++) {
      var span = document.createElement("span");
      var ch = text[i];
      if (ch === " ") {
        span.className = "ch sp";
        span.innerHTML = "&nbsp;";
      } else {
        span.className = "ch";
        span.textContent = ch;
      }
      wordmarkEl.appendChild(span);
    }
  }

  function buildNav(container) {
    container.innerHTML = "";
    (cfg.header.nav || []).forEach(function (item) {
      var a = document.createElement("a");
      var href = item.href || "#";
      a.href = href;
      a.textContent = item.label;
      if (href === "#") {
        a.addEventListener("click", function (e) {
          e.preventDefault();
        });
      } else {
        a.addEventListener("click", function () {
          mobileNav.classList.remove("is-open");
          menuBtn.setAttribute("aria-expanded", "false");
        });
      }
      container.appendChild(a);
    });
  }

  function populateContent() {
    heroH1.textContent = cfg.hiddenH1;
    welcomeLine.textContent = cfg.welcomeLine;
    pillTopRight.textContent = cfg.pills.topRight;
    pillBottomLeft.textContent = cfg.pills.bottomLeft;
    brandMark.textContent = cfg.header.mark;
    brandRoles.textContent = cfg.header.roles;
    menuBtn.textContent = cfg.header.menuLabel;
    document.querySelector(".scroll-hint-label").textContent = cfg.scrollHint;

    buildNav(siteNav);
    buildNav(mobileNav);
    buildWordmark();
    buildDotGrid(dotGridTL);
    buildDotGrid(dotGridBR);
  }

  // ---------------------------------------------------------------
  // Responsive plate selection
  // ---------------------------------------------------------------
  function isPortraitLayout() {
    return window.innerWidth <= cfg.portraitBreakpoint;
  }

  function applyPlateSrc() {
    var src = isPortraitLayout() ? cfg.assets.platePortrait : cfg.assets.platesLandscape;
    if (plateImg.getAttribute("src") !== src) {
      plateImg.src = src;
    }
  }

  populateContent();
  anuragImg.src = cfg.assets.anurag;
  applyPlateSrc();

  // ---------------------------------------------------------------
  // Menu toggle
  // ---------------------------------------------------------------
  menuBtn.addEventListener("click", function () {
    var open = mobileNav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // ---------------------------------------------------------------
  // Intro choreography (GSAP timeline)
  // ---------------------------------------------------------------
  var introTl = gsap.timeline({ paused: true });

  function buildIntroTimeline() {
    var letters = wordmarkEl.querySelectorAll(".ch");
    var furniture = [welcomeLine, pillTopRight, pillBottomLeft, dotGridTL, dotGridBR];
    var arrows = document.querySelectorAll(".arrow");

    gsap.set(sceneFade, { opacity: 1 });
    gsap.set(".plate-layer", { scale: 1.08 });
    gsap.set(letters, { yPercent: 45, autoAlpha: 0, filter: "blur(18px)" });
    gsap.set(wordmarkGlow, { opacity: 0 });
    gsap.set(anuragImg, { opacity: 0, y: 26, "--a-blur": "16px", "--a-bright": 0.35 });
    gsap.set(furniture, { autoAlpha: 0, scale: 0.86 });
    gsap.set(arrows, { autoAlpha: 0, scale: 0.7 });
    gsap.set(headerLine, { scaleX: 0 });
    gsap.set([brandBlock, siteNav, menuBtn, scrollHint], { autoAlpha: 0, y: -8 });

    introTl
      .to(sceneFade, { opacity: 0, duration: 0.9, ease: "power2.out" }, 0)
      .to(".plate-layer", { scale: 1.0, duration: 1.3, ease: "power2.out" }, 0)
      .to(letters, { yPercent: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.85, ease: "power3.out", stagger: 0.045 }, 0.25)
      .to(wordmarkGlow, { opacity: 0.75, duration: 1.0, ease: "power2.out" }, 0.4)
      .to(anuragImg, { opacity: 1, y: 0, "--a-blur": "0px", "--a-bright": 1, duration: 0.95, ease: "back.out(1.5)" }, 0.55)
      .to(furniture, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2.4)" }, 1.5)
      .to(arrows, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2.6)", stagger: 0.03 }, 1.5)
      .to(headerLine, { scaleX: 1, duration: 0.4, ease: "power2.inOut" }, 1.95)
      .to([brandBlock, siteNav, menuBtn], { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.07 }, 2.05)
      .to(scrollHint, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, 2.2);
  }

  buildIntroTimeline();

  // ---------------------------------------------------------------
  // Idle / settled continuous life
  // ---------------------------------------------------------------
  var idleTweens = [];
  function startIdleLoops() {
    if (reduceMotion) return;
    idleTweens.push(gsap.to(".fog-1", { xPercent: 6, yPercent: -3, duration: 20, ease: "sine.inOut", yoyo: true, repeat: -1 }));
    idleTweens.push(gsap.to(".fog-2", { xPercent: -7, yPercent: 4, duration: 26, ease: "sine.inOut", yoyo: true, repeat: -1 }));
    idleTweens.push(gsap.to(".fog-3", { xPercent: 4, duration: 16, ease: "sine.inOut", yoyo: true, repeat: -1 }));
    idleTweens.push(gsap.to(wordmarkGlow, { opacity: 0.55, duration: 4.2, ease: "sine.inOut", yoyo: true, repeat: -1 }));
    idleTweens.push(
      gsap.to(anuragImg, { scale: 1.005, duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "bottom center" })
    );
    idleTweens.push(gsap.to(scrollHint, { y: 6, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1 }));
  }

  // ---------------------------------------------------------------
  // Dev helpers: ?t=end skips to settled state, ?t=1.2 starts at 1.2s
  // ---------------------------------------------------------------
  function initIntro() {
    var params = new URLSearchParams(window.location.search);
    var tParam = params.get("t");

    if (reduceMotion || tParam === "end") {
      introTl.progress(1);
      startIdleLoops();
      return;
    }

    introTl.eventCallback("onComplete", startIdleLoops);

    if (tParam !== null && !isNaN(parseFloat(tParam))) {
      introTl.play(parseFloat(tParam));
    } else {
      introTl.play(0);
    }
  }

  initIntro();

  // ---------------------------------------------------------------
  // Scroll choreography (pinned + scrubbed)
  // ---------------------------------------------------------------
  if (!reduceMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    var scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "+=90%",
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
      },
    });

    scrollTl
      .to("#wordmarkLayer", { yPercent: -20, autoAlpha: 0.12, duration: 1 }, 0)
      .to(anuragImg, { scale: 1.14, duration: 1, ease: "none" }, 0)
      .to([".fog-1", ".fog-2", ".fog-3"], { opacity: "+=0.35", filter: "blur(48px)", duration: 1 }, 0)
      .to("#furnitureLayer", { autoAlpha: 0, duration: 0.6 }, 0.05)
      .to(scrollHint, { autoAlpha: 0, duration: 0.3 }, 0)
      .to(sceneFade, { opacity: 1, duration: 0.45 }, 0.6);

    window.addEventListener("load", function () {
      ScrollTrigger.refresh();
    });
  }

  // ---------------------------------------------------------------
  // Mouse / device parallax by depth
  // ---------------------------------------------------------------
  var parallaxLayers = [];
  if (!reduceMotion) {
    var depthEls = document.querySelectorAll(".layer[data-depth]");
    depthEls.forEach(function (el) {
      var depth = parseFloat(el.getAttribute("data-depth")) || 0;
      parallaxLayers.push({
        el: el,
        setX: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" }),
        setY: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" }),
        depth: depth,
      });
    });
  }

  var PARALLAX_BASE = 230;

  function applyParallax(nx, ny) {
    parallaxLayers.forEach(function (layer) {
      layer.setX(nx * layer.depth * PARALLAX_BASE);
      layer.setY(ny * layer.depth * PARALLAX_BASE * 0.6);
    });
  }

  if (!reduceMotion && parallaxLayers.length) {
    if (!isTouch) {
      heroEl.addEventListener("pointermove", function (e) {
        var nx = e.clientX / window.innerWidth - 0.5;
        var ny = e.clientY / window.innerHeight - 0.5;
        applyParallax(nx, ny);
      });
      heroEl.addEventListener("pointerleave", function () {
        applyParallax(0, 0);
      });
    } else {
      var orientationGranted = false;

      function onDeviceOrientation(e) {
        if (e.gamma === null || e.beta === null) return;
        var nx = Math.max(-1, Math.min(1, e.gamma / 30));
        var ny = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
        applyParallax(nx, ny);
      }

      function startAutoDrift() {
        idleTweens.push(
          gsap.to(
            { t: 0 },
            {
              t: 1,
              duration: 16,
              repeat: -1,
              ease: "none",
              onUpdate: function () {
                var t = this.targets()[0].t;
                var nx = Math.sin(t * Math.PI * 2) * 0.22;
                var ny = Math.cos(t * Math.PI * 2 * 0.7) * 0.14;
                applyParallax(nx, ny);
              },
            }
          )
        );
      }

      if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
        var requestOnce = function () {
          DeviceOrientationEvent.requestPermission()
            .then(function (state) {
              if (state === "granted") {
                orientationGranted = true;
                window.addEventListener("deviceorientation", onDeviceOrientation);
              } else {
                startAutoDrift();
              }
            })
            .catch(function () {
              startAutoDrift();
            });
          window.removeEventListener("touchstart", requestOnce);
        };
        window.addEventListener("touchstart", requestOnce, { once: true });
        // Fallback in case the user never taps: drift after a short delay.
        setTimeout(function () {
          if (!orientationGranted) startAutoDrift();
        }, 2500);
      } else if (typeof DeviceOrientationEvent !== "undefined") {
        window.addEventListener("deviceorientation", onDeviceOrientation);
      } else {
        startAutoDrift();
      }
    }
  }

  // ---------------------------------------------------------------
  // Dust particles (canvas)
  // ---------------------------------------------------------------
  (function dustParticles() {
    if (!dustCanvas) return;
    var ctx = dustCanvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var particles = [];
    var running = false;
    var rafId = null;
    var w = 0,
      h = 0;

    function resize() {
      var rect = heroEl.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dustCanvas.width = w * dpr;
      dustCanvas.height = h * dpr;
      dustCanvas.style.width = w + "px";
      dustCanvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var count = Math.min(60, Math.max(24, Math.round((w * h) / 26000)));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push(makeParticle());
      }
    }

    function makeParticle() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.6,
        vx: (Math.random() - 0.5) * 6,
        vy: -4 - Math.random() * 10,
        alpha: 0.08 + Math.random() * 0.22,
      };
    }

    function step() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx * 0.016;
        p.y += p.vy * 0.016;
        if (p.y < -10 || p.x < -10 || p.x > w + 10) {
          p.x = Math.random() * w;
          p.y = h + 10;
        }
        ctx.beginPath();
        ctx.fillStyle = "rgba(245, 197, 130, " + p.alpha + ")";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      rafId = requestAnimationFrame(step);
    }

    function start() {
      if (running || reduceMotion) return;
      running = true;
      rafId = requestAnimationFrame(step);
    }

    function stop() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
    }

    resize();
    if (!reduceMotion) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) start();
            else stop();
          });
        },
        { threshold: 0 }
      );
      io.observe(heroEl);
    }

    window.addEventListener("resize", debounce(resize, 200));
  })();

  // ---------------------------------------------------------------
  // Film grain (canvas)
  // ---------------------------------------------------------------
  (function filmGrain() {
    if (!grainCanvas) return;
    var ctx = grainCanvas.getContext("2d");
    var size = 128;
    grainCanvas.width = size;
    grainCanvas.height = size;
    var imageData = ctx.createImageData(size, size);

    function draw() {
      var buf = imageData.data;
      for (var i = 0; i < buf.length; i += 4) {
        var v = (Math.random() * 255) | 0;
        buf[i] = v;
        buf[i + 1] = v;
        buf[i + 2] = v;
        buf[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
    }

    draw();

    if (reduceMotion) return;

    var running = true;
    var frame = 0;
    function loop() {
      if (!running) return;
      frame++;
      if (frame % 3 === 0) draw();
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          running = entry.isIntersecting;
          if (running) requestAnimationFrame(loop);
        });
      },
      { threshold: 0 }
    );
    io.observe(heroEl);
  })();

  // ---------------------------------------------------------------
  // Utilities
  // ---------------------------------------------------------------
  function debounce(fn, wait) {
    var t;
    return function () {
      clearTimeout(t);
      var args = arguments;
      t = setTimeout(function () {
        fn.apply(null, args);
      }, wait);
    };
  }

  window.addEventListener(
    "resize",
    debounce(function () {
      applyPlateSrc();
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }, 200)
  );
})();
