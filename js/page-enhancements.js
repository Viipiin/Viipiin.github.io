/*
 * Shared, self-contained enhancement for long vault guide pages:
 *   1. A small "Updated <date>" badge (fixed, top-right).
 *   2. A floating "On this page" TOC built from h2/h3 headings (fixed, bottom-right),
 *      auto-skipped on pages with too few headings to need one.
 *
 * Usage: <script defer src="../js/page-enhancements.js" data-updated="YYYY-MM-DD"></script>
 * Zero page-specific CSS or markup required — everything is injected and scoped
 * under the pe- prefix so it cannot collide with a page's own styles.
 */
(function () {
  "use strict";

  var THIS_SCRIPT = document.currentScript;
  var MIN_HEADINGS_FOR_TOC = 4;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function formatUpdated(iso) {
    if (!iso) return null;
    var parts = iso.split("-");
    if (parts.length !== 3) return iso;
    var d = new Date(Date.UTC(+parts[0], +parts[1] - 1, +parts[2]));
    if (isNaN(d.getTime())) return iso;
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[d.getUTCMonth()] + " " + d.getUTCDate() + ", " + d.getUTCFullYear();
  }

  function injectStyles() {
    var css = [
      ".pe-badge{position:fixed;top:14px;right:14px;z-index:99990;",
      "background:rgba(20,20,28,0.82);color:#f2f2f7;border:1px solid rgba(255,255,255,0.14);",
      "backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-radius:999px;",
      "padding:6px 12px;font:500 12px/1.4 -apple-system,Segoe UI,Inter,sans-serif;",
      "box-shadow:0 4px 14px rgba(0,0,0,0.25);letter-spacing:.2px;pointer-events:none;",
      "user-select:none;white-space:nowrap;}",
      "@media (max-width:480px){.pe-badge{font-size:10.5px;padding:5px 9px;top:8px;right:8px}}",

      ".pe-toc-btn{position:fixed;bottom:18px;right:18px;z-index:99991;width:46px;height:46px;",
      "border-radius:50%;background:rgba(20,20,28,0.88);color:#f2f2f7;border:1px solid rgba(255,255,255,0.16);",
      "backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);box-shadow:0 6px 18px rgba(0,0,0,0.3);",
      "display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:19px;line-height:1;",
      "transition:transform .15s ease;}",
      ".pe-toc-btn:hover{transform:scale(1.06)}",
      ".pe-toc-btn:active{transform:scale(0.96)}",

      ".pe-toc-panel{position:fixed;bottom:72px;right:18px;z-index:99991;width:min(300px,calc(100vw - 36px));",
      "max-height:min(60vh,480px);overflow-y:auto;background:rgba(18,18,26,0.92);color:#e8e8f0;",
      "border:1px solid rgba(255,255,255,0.14);border-radius:12px;backdrop-filter:blur(10px);",
      "-webkit-backdrop-filter:blur(10px);box-shadow:0 10px 30px rgba(0,0,0,0.35);padding:10px 0;",
      "font:13px/1.5 -apple-system,Segoe UI,Inter,sans-serif;",
      "opacity:0;transform:translateY(8px);pointer-events:none;transition:opacity .16s ease,transform .16s ease;}",
      ".pe-toc-panel.pe-open{opacity:1;transform:translateY(0);pointer-events:auto}",
      ".pe-toc-title{font-size:10.5px;text-transform:uppercase;letter-spacing:.6px;color:#9a9ab0;",
      "padding:2px 16px 8px;font-weight:600;}",
      ".pe-toc-panel a{display:block;padding:6px 16px;color:#d6d6e4;text-decoration:none;",
      "border-left:2px solid transparent;}",
      ".pe-toc-panel a.pe-h3{padding-left:28px;font-size:12.3px;color:#b7b7c8}",
      ".pe-toc-panel a:hover{background:rgba(255,255,255,0.06);color:#fff}",
      ".pe-toc-panel a.pe-active{border-left-color:#7c9fff;color:#fff;background:rgba(124,159,255,0.1)}",
      "@media (max-width:480px){.pe-toc-btn{width:42px;height:42px;bottom:14px;right:14px}",
      ".pe-toc-panel{right:14px;bottom:64px}}"
    ].join("");
    var style = document.createElement("style");
    style.setAttribute("data-pe-style", "");
    style.textContent = css;
    document.head.appendChild(style);
  }

  function addBadge(iso) {
    var label = formatUpdated(iso);
    if (!label) return;
    var badge = document.createElement("div");
    badge.className = "pe-badge";
    badge.textContent = "Updated " + label;
    document.body.appendChild(badge);
  }

  function slugify(text, used) {
    var base = text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 60) || "section";
    var slug = base, n = 2;
    while (used[slug]) { slug = base + "-" + n++; }
    used[slug] = true;
    return slug;
  }

  function buildToc() {
    var headings = Array.prototype.slice.call(document.querySelectorAll("h2, h3"))
      .filter(function (h) {
        return h.textContent.trim().length > 0 && !h.closest("#vk-auth-overlay");
      });

    if (headings.length < MIN_HEADINGS_FOR_TOC) return;

    var used = {};
    Array.prototype.forEach.call(document.querySelectorAll("[id]"), function (el) { used[el.id] = true; });

    var panel = document.createElement("nav");
    panel.className = "pe-toc-panel";
    panel.setAttribute("role", "navigation");
    panel.setAttribute("aria-label", "Table of contents");
    panel.setAttribute("aria-hidden", "true");

    var title = document.createElement("div");
    title.className = "pe-toc-title";
    title.textContent = "On this page";
    panel.appendChild(title);

    var links = [];
    headings.forEach(function (h) {
      if (!h.id) h.id = slugify(h.textContent, used);
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent.trim();
      if (h.tagName === "H3") a.className = "pe-h3";
      a.addEventListener("click", function (e) {
        e.preventDefault();
        h.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        closePanel();
      });
      panel.appendChild(a);
      links.push({ heading: h, link: a });
    });

    var btn = document.createElement("button");
    btn.className = "pe-toc-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "Table of contents");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = "&#9776;";

    var isOpen = false;
    function openPanel() {
      isOpen = true;
      panel.classList.add("pe-open");
      panel.setAttribute("aria-hidden", "false");
      btn.setAttribute("aria-expanded", "true");
      btn.innerHTML = "&times;";
    }
    function closePanel() {
      isOpen = false;
      panel.classList.remove("pe-open");
      panel.setAttribute("aria-hidden", "true");
      btn.setAttribute("aria-expanded", "false");
      btn.innerHTML = "&#9776;";
    }
    btn.addEventListener("click", function () { isOpen ? closePanel() : openPanel(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && isOpen) closePanel(); });
    document.addEventListener("click", function (e) {
      if (isOpen && !panel.contains(e.target) && e.target !== btn) closePanel();
    });

    document.body.appendChild(panel);
    document.body.appendChild(btn);

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var match = links.filter(function (l) { return l.heading === entry.target; })[0];
          if (!match) return;
          if (entry.isIntersecting) {
            links.forEach(function (l) { l.link.classList.remove("pe-active"); });
            match.link.classList.add("pe-active");
          }
        });
      }, { rootMargin: "0px 0px -75% 0px", threshold: 0 });
      headings.forEach(function (h) { observer.observe(h); });
    }
  }

  function init() {
    injectStyles();
    if (THIS_SCRIPT) addBadge(THIS_SCRIPT.getAttribute("data-updated"));
    buildToc();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
