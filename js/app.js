(function () {
  var S = window.SITE, P = window.PROJECTS, X = window.EXPERIENCE, SK = window.SKILLS;
  var app = document.getElementById("app");

  // ---------- helpers ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function media(item, label, cls) {
    if (item.image) {
      return '<div class="media ' + (cls || "") + '"><img src="' + esc(item.image) + '" alt="' + esc(item.title) + '" loading="lazy"></div>';
    }
    return '<div class="media ph ' + (cls || "") + '"><span>' + esc(label) + "</span><span>image soon</span></div>";
  }
  function tags(list) {
    return '<div class="tags">' + list.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>";
  }
  function code(prefix, i) { return prefix + "-" + String(i + 1).padStart(2, "0"); }
  function findAny(id) {
    for (var i = 0; i < P.length; i++) if (P[i].id === id) return { kind: "projects", item: P[i] };
    for (var j = 0; j < X.length; j++) if (X[j].id === id) return { kind: "experience", item: X[j] };
    return null;
  }

  // ---------- pieces ----------
  function projectCard(p, i) {
    return '<a class="card" href="#/projects/' + p.id + '">' +
      media(p, code("P", i)) +
      '<div class="card-body">' +
        '<div class="meta"><span class="k">' + esc(p.kind) + '</span><span class="k">' + esc(p.year) + "</span></div>" +
        "<h3>" + esc(p.title) + "</h3>" +
        "<p>" + esc(p.summary) + "</p>" +
        tags(p.stack.slice(0, 4)) +
      "</div></a>";
  }
  function xpRow(x) {
    return '<a class="xp" href="#/experience/' + x.id + '">' +
      '<span class="when">' + esc(x.period) + "</span>" +
      "<div><h3>" + esc(x.title) + ' <span class="org">· ' + esc(x.org) + "</span></h3><p>" + esc(x.summary) + "</p></div>" +
      '<span class="arrow">→</span></a>';
  }

  // ---------- views ----------
  function home() {
    var photo = S.photo
      ? '<div class="sheet-photo media"><img src="' + esc(S.photo) + '" alt="Portrait of ' + esc(S.name) + '"></div>'
      : '<div class="sheet-photo ph"><span>PORTRAIT</span><span>image soon</span></div>';
    var rows = [
      ["study", "B.Sc. Computer Science, TU Hamburg (since 2022)"],
      ["now", X.filter(function (x) { return x.current !== false; }).map(function (x) { return x.org.replace(" GmbH", ""); }).join(" · ")],
      ["focus", S.focus.join(" · ")],
      ["based", S.location],
      ["speaks", S.languages],
    ];
    return '<section class="hero">' +
        "<div>" +
          '<span class="k">' + esc(S.role) + "</span>" +
          "<h1>" + esc(S.name) + "</h1>" +
          '<p class="intro">' + esc(S.intro) + "</p>" +
          '<div class="now"><div class="k">Currently working on</div><ul>' +
            (window.NOW || []).map(function (n) {
              var inner = '<span class="now-t">' + esc(n.title) + "</span>" + (n.note ? '<span class="now-n">' + esc(n.note) + "</span>" : "");
              if (!n.link) return "<li><div>" + inner + "</div></li>";
              var ext = n.link.indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : "";
              return '<li><a href="' + esc(n.link) + '"' + ext + ">" + inner + '<span class="arrow">→</span></a></li>';
            }).join("") +
          "</ul></div>" +
        "</div>" +
        '<aside class="sheet">' +
          '<div class="sheet-head"><span class="k">Profile</span><span class="k">YO · 2026</span></div>' +
          photo +
          "<dl>" + rows.map(function (r) { return '<div class="row"><dt>' + r[0] + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("") + "</dl>" +
        "</aside>" +
      "</section>";
  }

  var activeFilter = "All";
  function projects() {
    var kinds = ["All"];
    P.forEach(function (p) { if (kinds.indexOf(p.kind) < 0) kinds.push(p.kind); });
    var list = P.map(function (p, i) { return { p: p, i: i }; })
      .filter(function (o) { return activeFilter === "All" || o.p.kind === activeFilter; });
    return '<section class="page">' +
      '<div class="page-head"><span class="k">Projects · ' + P.length + "</span><h1>Things I have built</h1>" +
      "<p>University projects, my thesis and work on the side. Open one to see the problem, what I did and the stack.</p></div>" +
      '<div class="filters" role="group" aria-label="Filter projects">' +
        kinds.map(function (k) { return '<button type="button" data-filter="' + esc(k) + '" aria-pressed="' + (k === activeFilter) + '">' + esc(k) + "</button>"; }).join("") +
      "</div>" +
      '<div class="grid">' + list.map(function (o) { return projectCard(o.p, o.i); }).join("") + "</div>" +
    "</section>";
  }

  function experience() {
    return '<section class="page">' +
      '<div class="page-head"><span class="k">Experience</span><h1>Where I work</h1>' +
      "<p>Alongside my studies I write software for a product team and for a driverless race car.</p></div>" +
      "<div>" + X.map(xpRow).join("") + "</div>" +
      '<div class="block"><div class="block-head"><span class="k">Education</span></div>' +
        '<div class="xp" style="cursor:default"><span class="when">Oct 2022 – now</span><div><h3>B.Sc. Computer Science <span class="org">· TU Hamburg</span></h3>' +
        "<p>Bachelor thesis in 2026 on flash file systems for embedded devices.</p></div><span></span></div>" +
      "</div>" +
    "</section>";
  }

  function detail(kind, id) {
    var list = kind === "projects" ? P : X;
    var idx = -1;
    for (var i = 0; i < list.length; i++) if (list[i].id === id) idx = i;
    if (idx < 0) return notFound();
    var it = list[idx];
    var isP = kind === "projects";
    var facts = isP
      ? [["type", it.kind], ["year", it.year], ["where", it.place]]
      : [["role", it.title], ["at", it.org], ["type", it.type], ["when", it.period], ["where", it.place]];
    var links = (it.links || []).map(function (l) {
      return '<div class="row"><div class="k">link</div><div class="v"><a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + " ↗</a></div></div>";
    }).join("");
    var prev = list[idx - 1], next = list[idx + 1];
    var heading = isP ? it.title : it.title + " at " + it.org.replace(" GmbH", "");
    return '<article class="page">' +
      '<div class="page-head"><a class="crumb" href="#/' + kind + '">← ' + (isP ? "all projects" : "all experience") + "</a>" +
      "<h1>" + esc(heading) + "</h1><p>" + esc(it.summary) + "</p></div>" +
      '<div class="detail">' +
        "<div>" +
          media(it, (isP ? code("P", idx) : code("X", idx)) + " · " + it.id.toUpperCase(), "big") +
          '<div class="prose">' +
            it.body.map(function (b) { return "<p>" + esc(b) + "</p>"; }).join("") +
            "<h2>What I did</h2><ul>" + it.did.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") + "</ul>" +
            (it.outcome ? "<h2>Outcome</h2><p>" + esc(it.outcome) + "</p>" : "") +
          "</div>" +
        "</div>" +
        '<aside class="aside">' +
          facts.map(function (f) { return '<div class="row"><div class="k">' + f[0] + '</div><div class="v">' + esc(f[1]) + "</div></div>"; }).join("") +
          '<div class="row"><div class="k">stack</div>' + tags(it.stack) + "</div>" +
          links +
        "</aside>" +
      "</div>" +
      '<nav class="pager">' +
        (prev ? '<a href="#/' + kind + "/" + prev.id + '"><span class="k">← previous</span><span class="t">' + esc(prev.title) + "</span></a>" : "") +
        (next ? '<a class="next" href="#/' + kind + "/" + next.id + '"><span class="k">next →</span><span class="t">' + esc(next.title) + "</span></a>" : "") +
      "</nav>" +
    "</article>";
  }

  var activeSkill = null;
  function skillPanel() {
    if (!activeSkill) {
      return '<span class="k">Select a skill</span><h3>Where I used it</h3>' +
        '<p class="none">Click any skill to see the projects and jobs behind it.</p>';
    }
    var used = activeSkill.used.map(findAny).filter(Boolean);
    return '<span class="k">' + esc(activeSkill.group) + "</span><h3>" + esc(activeSkill.name) + "</h3>" +
      (used.length
        ? "<ul>" + used.map(function (u) {
            var label = u.kind === "projects" ? u.item.title : u.item.title + " · " + u.item.org.replace(" GmbH", "");
            return '<li><a href="#/' + u.kind + "/" + u.item.id + '">' + esc(label) + " →</a></li>";
          }).join("") + "</ul>"
        : '<p class="none">From coursework and smaller exercises, not tied to a listed project yet.</p>');
  }
  function skills() {
    return '<section class="page">' +
      '<div class="page-head"><span class="k">Skills</span><h1>What I work with</h1>' +
      "<p>Every skill links back to where I actually used it. The number shows how many projects or jobs.</p></div>" +
      skillsBody() +
    "</section>";
  }
  function skillsBody() {
    return '<div class="skills"><div>' +
        SK.map(function (g) {
          return '<div class="sk-group"><div class="k">' + esc(g.group) + '</div><div class="sk-list">' +
            g.items.map(function (s) {
              var on = activeSkill && activeSkill.name === s.name;
              return '<button type="button" class="sk" data-skill="' + esc(s.name) + '" data-group="' + esc(g.group) + '" aria-pressed="' + !!on + '">' +
                esc(s.name) + (s.used.length ? '<span class="n">' + s.used.length + "</span>" : "") + "</button>";
            }).join("") + "</div></div>";
        }).join("") +
        '<div class="sk-group"><div class="k">Speaking</div><p style="margin:0">' + esc(S.languages) + "</p></div>" +
        '<div class="sk-group"><div class="k">Relevant courses</div><ul class="courses">' +
          window.COURSES.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul></div>" +
      '</div><aside class="sk-panel" id="skPanel" aria-live="polite">' + skillPanel() + "</aside></div>";
  }

  function contact() {
    return '<section class="page">' +
      '<div class="page-head"><span class="k">Contact</span><h1>Get in touch</h1>' +
      "<p>Open to working-student roles, internships and interesting projects in embedded, robotics and AI. Email is the fastest way to reach me.</p></div>" +
      contactBody() +
    "</section>";
  }
  function contactBody() {
    var rows = [
      ["email", S.email, "mailto:" + S.email],
      ["github", S.links.github.replace("https://", ""), S.links.github],
      ["linkedin", "LinkedIn profile", S.links.linkedin],
    ];
    return '<div class="contact-list">' + rows.map(function (r) {
        var ext = r[2].indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : "";
        return '<a href="' + esc(r[2]) + '"' + ext + '><span class="k">' + r[0] + '</span><span class="v">' + esc(r[1]) + '</span><span class="arrow">→</span></a>';
      }).join("") + "</div>";
  }

  function notFound() {
    return '<section class="page"><div class="page-head"><span class="k">404</span><h1>Nothing here</h1>' +
      '<p><a href="#/">Back to the start</a></p></div></section>';
  }

  // ---------- router ----------
  function render() {
    var parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    var view = parts[0] || "";
    var html, title = S.short;
    if (!view) html = home();
    else if (view === "projects" && parts[1]) html = detail("projects", parts[1]);
    else if (view === "experience" && parts[1]) html = detail("experience", parts[1]);
    else if (view === "projects") html = projects();
    else if (view === "experience") html = experience();
    else if (view === "skills") html = skills();
    else if (view === "contact") html = contact();
    else html = notFound();

    if (view) title = view.charAt(0).toUpperCase() + view.slice(1) + " · " + S.short;
    if (parts[1]) { var f = findAny(parts[1]); if (f) title = f.item.title + " · " + S.short; }
    document.title = title;

    app.innerHTML = '<div class="enter">' + html + "</div>";
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      var on = a.dataset.nav === view;
      a.classList.toggle("on", on);
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    window.scrollTo(0, 0);
  }

  // clicks inside views (filters, skills)
  app.addEventListener("click", function (e) {
    var f = e.target.closest("[data-filter]");
    if (f) { activeFilter = f.dataset.filter; render(); return; }
    var s = e.target.closest("[data-skill]");
    if (s) {
      var g = SK.filter(function (x) { return x.group === s.dataset.group; })[0];
      var item = g.items.filter(function (x) { return x.name === s.dataset.skill; })[0];
      activeSkill = activeSkill && activeSkill.name === item.name ? null : { name: item.name, used: item.used, group: g.group };
      document.querySelectorAll(".sk").forEach(function (b) {
        b.setAttribute("aria-pressed", String(!!activeSkill && b.dataset.skill === activeSkill.name));
      });
      document.getElementById("skPanel").innerHTML = skillPanel();
    }
  });

  // theme toggle
  document.getElementById("themeBtn").addEventListener("click", function () {
    var root = document.documentElement;
    var dark = root.dataset.theme ? root.dataset.theme === "dark" : !matchMedia("(prefers-color-scheme: light)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  });

  document.getElementById("footLeft").textContent = S.short + " · " + S.location.split(",")[0] + " · updated " + S.updated;
  window.addEventListener("hashchange", render);
  render();
})();
