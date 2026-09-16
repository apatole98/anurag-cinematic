/**
 * Scene 2 — Journey: career timeline.
 * Vanilla JS + GSAP/ScrollTrigger. Reads content from js/config.js.
 */
(function () {
  "use strict";

  var cfg = window.HERO_CONFIG;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var journeyEyebrow = document.getElementById("journeyEyebrow");
  var journeyTitle = document.getElementById("journey-title");
  var journeyIntro = document.getElementById("journeyIntro");
  var timelineList = document.getElementById("timelineList");
  var timelineProgress = document.getElementById("timelineProgress");
  var siteHeader = document.getElementById("siteHeader");

  function populateJourney() {
    var j = cfg.journey;
    if (!j) return;
    journeyEyebrow.textContent = j.eyebrow;
    journeyTitle.textContent = j.title;
    journeyIntro.textContent = j.intro;

    timelineList.innerHTML = "";
    (j.milestones || []).forEach(function (m) {
      var li = document.createElement("li");
      li.className = "timeline-item";

      var dot = document.createElement("span");
      dot.className = "timeline-dot";
      dot.setAttribute("aria-hidden", "true");

      var content = document.createElement("div");
      content.className = "timeline-content";

      var year = document.createElement("span");
      year.className = "timeline-year";
      year.textContent = m.year;

      var role = document.createElement("h3");
      role.className = "timeline-role";
      role.textContent = m.role;

      var desc = document.createElement("p");
      desc.className = "timeline-desc";
      desc.textContent = m.description;

      content.appendChild(year);
      content.appendChild(role);
      content.appendChild(desc);
      li.appendChild(dot);
      li.appendChild(content);
      timelineList.appendChild(li);
    });
  }

  populateJourney();

  // ---------------------------------------------------------------
  // Header scrolled-state backdrop
  // ---------------------------------------------------------------
  (function headerScrollState() {
    if (!siteHeader) return;
    var ticking = false;
    function update() {
      siteHeader.classList.toggle("is-scrolled", window.scrollY > 80);
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  })();

  // ---------------------------------------------------------------
  // Timeline reveal + progress line
  // ---------------------------------------------------------------
  if (reduceMotion || !window.gsap || !window.ScrollTrigger) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  var items = document.querySelectorAll(".timeline-item");
  items.forEach(function (item) {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 82%",
        toggleActions: "play none none reverse",
        toggleClass: { targets: item, className: "is-active" },
      },
    });
  });

  gsap.fromTo(
    timelineProgress,
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#timeline",
        start: "top 65%",
        end: "bottom 75%",
        scrub: 0.4,
      },
    }
  );

  window.addEventListener("load", function () {
    ScrollTrigger.refresh();
  });
})();
