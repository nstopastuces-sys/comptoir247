/* COMPTOIR 247 — interactions
   - transitions de page « mur de casiers »
   - distributeur animé (hero)
   - vitrines / portes qui s'ouvrent au défilement
   - vidéos lues uniquement quand elles sont visibles
*/
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("js");

  /* ---------- Transition de page ---------- */
  var curtain = document.querySelector(".curtain");

  // Les 18 portes sont dans le HTML (6×3 sur grand écran, 3×6 sur mobile) ;
  // on ne fait que régler l'ordre de la cascade selon la grille affichée.
  function buildCurtain() {
    if (!curtain) return;
    var cols = window.innerWidth < 700 ? 3 : 6;
    var letters = "ABCDEF";
    curtain.querySelectorAll(".curtain__door").forEach(function (d, i) {
      var c = i % cols, r = Math.floor(i / cols);
      d.setAttribute("data-n", letters[r] + (c + 1));
      d.style.setProperty("--d", (c * 0.045 + r * 0.05).toFixed(3) + "s");
    });
  }
  buildCurtain();

  // Boutons .btn--peek : après l'ouverture de la page, leur porte s'entrouvre une fois
  // pour montrer le texte rouge caché derrière (utile aussi sur mobile, sans survol).
  var peeked = false;
  function peekButtons() {
    if (peeked || reduceMotion) return;
    peeked = true;
    document.querySelectorAll(".btn--peek").forEach(function (b, i) {
      setTimeout(function () { b.classList.add("is-peek"); }, 1500 + i * 450);
      setTimeout(function () { b.classList.remove("is-peek"); }, 4300 + i * 450);
    });
  }

  function openCurtain() {
    if (!root.classList.contains("is-arriving")) return;
    // deux frames : les portes sont dessinées fermées, puis s'ouvrent
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        root.classList.add("is-opening");
        root.classList.remove("is-arriving");
        setTimeout(function () { root.classList.remove("is-opening"); }, 1300);
        peekButtons();
      });
    });
  }
  if (document.readyState === "complete") openCurtain();
  else window.addEventListener("load", openCurtain);
  // ne jamais faire attendre trop longtemps si une ressource traîne
  setTimeout(openCurtain, 900);

  window.addEventListener("pageshow", function (e) {
    if (e.persisted) root.classList.remove("is-leaving", "is-arriving", "is-opening");
  });

  function isInternal(a) {
    if (!a || !a.href) return false;
    if (a.target && a.target !== "_self") return false;
    if (a.hasAttribute("download")) return false;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return false;
    if (!/^https?:$/.test(url.protocol)) return false;
    if (url.pathname === location.pathname && url.hash) return false;
    if (/\.(jpe?g|png|webp|mp4|pdf|xml|txt|svg)$/i.test(url.pathname)) return false;
    return true;
  }

  document.addEventListener("click", function (e) {
    if (reduceMotion || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest("a");
    if (!isInternal(a)) return;
    e.preventDefault();
    var href = a.href;
    root.classList.add("is-leaving");
    setTimeout(function () { window.location.href = href; }, 820);
  });

  /* ---------- En-tête ---------- */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.querySelector("use").setAttribute("href", open ? "#i-close" : "#i-menu");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) toggle.click();
    });
  }

  /* ---------- Apparitions au défilement ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      el.classList.add("is-in");
      if (el.classList.contains("vitrine") || el.classList.contains("film")) {
        setTimeout(function () { el.classList.add("is-open"); }, el.classList.contains("film") ? 250 : 350);
      }
      io.unobserve(el);
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }) : null;

  document.querySelectorAll(".mountains.draw path").forEach(function (p) {
    try { p.style.setProperty("--len", Math.ceil(p.getTotalLength())); } catch (err) {}
  });

  var watched = document.querySelectorAll(".reveal, .vitrine, .film, .mountains.draw");
  if (io && !reduceMotion) watched.forEach(function (el) { io.observe(el); });
  else watched.forEach(function (el) { el.classList.add("is-in", "is-open"); });

  /* ---------- Vidéos : lecture seulement à l'écran ---------- */
  var videos = document.querySelectorAll("video[data-autoplay]");
  if (!reduceMotion && "IntersectionObserver" in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) {
          if (v.preload === "none") { v.preload = "auto"; }
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.15 });
    videos.forEach(function (v) { v.muted = true; vio.observe(v); });
  }

  /* ---------- Distributeur animé ---------- */
  var machine = document.querySelector(".machine");
  if (machine) {
    var led = machine.querySelector("[data-clock]");
    var screen = machine.querySelector("[data-screen]");
    var lockers = Array.prototype.slice.call(machine.querySelectorAll(".locker"));

    var tick = function () {
      if (!led) return;
      var d = new Date();
      led.textContent = String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
    };
    tick();
    setInterval(tick, 15000);

    var setScreen = function (locker) {
      if (!screen) return;
      var strong = document.createElement("strong");
      strong.textContent = locker ? "Casier " + locker.getAttribute("data-n") + " · ouvert" : "Choisissez un ou plusieurs casiers";
      screen.replaceChildren(strong, document.createTextNode(locker ? locker.getAttribute("data-product") : "Produits frais & locaux, 24h/24"));
    };

    lockers.forEach(function (l) {
      l.addEventListener("click", function () {
        var open = !l.classList.contains("is-open");
        l.classList.toggle("is-open", open);
        l.setAttribute("aria-pressed", open ? "true" : "false");
        setScreen(open ? l : null);
      });
      l.addEventListener("mouseenter", function () { setScreen(l); });
    });

    if (!reduceMotion) {
      // ouverture en cascade à l'arrivée, puis une porte s'ouvre de temps en temps
      var cascade = [0, 4, 8, 2, 6];
      cascade.forEach(function (i, k) {
        setTimeout(function () { if (lockers[i]) lockers[i].classList.add("is-open"); }, 1100 + k * 220);
        setTimeout(function () { if (lockers[i]) lockers[i].classList.remove("is-open"); }, 2900 + k * 160);
      });
      var last = -1;
      setInterval(function () {
        if (document.hidden || machine.matches(":hover")) return;
        lockers.forEach(function (l) { if (l.getAttribute("aria-pressed") !== "true") l.classList.remove("is-open"); });
        var i;
        do { i = Math.floor(Math.random() * lockers.length); } while (i === last && lockers.length > 1);
        last = i;
        lockers[i].classList.add("is-open");
        setScreen(lockers[i]);
      }, 2600);
    }
  }

  /* ---------- Formulaire de contact : Netlify Forms ----------
     La demande est envoyée en arrière-plan à Netlify (data-endpoint), qui la conserve
     et la transfère par e-mail. Sans data-endpoint (démo hors Netlify), on ouvre la messagerie.
     En cas d'échec, on propose d'ouvrir la messagerie avec le message pré-rempli. */
  var form = document.querySelector("form[data-mailto]");
  if (form) {
    var params = new URLSearchParams(location.search);
    var preset = params.get("profil");
    // Comparaison directe (pas de sélecteur CSS construit à partir de l'URL : un paramètre
    // malformé ferait planter le script et le formulaire partirait sans être traité).
    if (preset) {
      form.querySelectorAll('input[name="profil"]').forEach(function (r) { if (r.value === preset) r.checked = true; });
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var data = new FormData(form);
      var profil = data.get("profil") || "Demande";
      var body = [
        "Nom : " + (data.get("nom") || ""),
        "Raison sociale : " + (data.get("raison_sociale") || "-"),
        "Email : " + (data.get("email") || ""),
        "Téléphone : " + (data.get("telephone") || "-"),
        "Profil : " + profil,
        "",
        data.get("message") || ""
      ].join("\n");
      var subject = "[Site] " + profil + " — " + (data.get("nom") || "");
      var to = form.getAttribute("data-mailto");
      var endpoint = form.getAttribute("data-endpoint");
      var status = form.querySelector(".form__status");
      var submit = form.querySelector('button[type="submit"]');
      var mailto = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      var say = function (msg, ok) {
        if (!status) return;
        status.textContent = msg;
        status.classList.toggle("is-ok", !!ok);
        status.classList.toggle("is-error", ok === false);
      };
      var fallback = function () {
        say("L'envoi n'a pas abouti. ", false);
        if (status) {
          var a = document.createElement("a");
          a.href = mailto;
          a.textContent = "Ouvrir ma messagerie avec le message pré-rempli";
          status.appendChild(a);
          status.appendChild(document.createTextNode(" ou écrivez-nous à " + to + "."));
        }
      };
      if (!endpoint || !window.fetch) { window.location.href = mailto; return; }
      if (data.get("_honey")) return; // robot
      if (submit) submit.disabled = true;
      say("Envoi en cours…");
      data.set("subject", subject); // objet de l'e-mail de notification Netlify
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString()
      })
        .then(function (r) {
          if (r.ok) {
            form.reset();
            say("Merci, votre demande est bien envoyée. Nous vous répondons rapidement.", true);
          } else fallback();
        })
        .catch(fallback)
        .then(function () { if (submit) submit.disabled = false; });
    });
  }

  /* ---------- Année ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Redimensionnement : recompose le rideau ---------- */
  var rt;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      if (!root.classList.contains("is-leaving") && !root.classList.contains("is-opening")) buildCurtain();
    }, 250);
  });
})();
