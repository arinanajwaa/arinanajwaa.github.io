// ===========================
// LOAD DATA & RENDER
// ===========================
async function loadPortfolioData() {
  try {
    const res = await fetch("data.json");
    if (!res.ok) throw new Error("Gagal memuat data.json");
    const data = await res.json();
    renderProfile(data.profile);
    renderSkills(data.skills);
    renderProjects(data.projects);
    renderEducation(data.education);
    renderCertificates(data.certificates);
  } catch (err) {
    console.error(err);
  }
}

function renderProfile(profile) {
  if (!profile) return;

  setText("heroName", profile.name);
  setText("heroTagline", profile.tagline);
  setText("aboutText", profile.about);
  setText("factLocation", profile.location);
  setText("factEmail", profile.email);
  setText("factPhone", profile.phone);
  setText("factTitle", profile.title);
  setText("footerText", `© ${new Date().getFullYear()} ${profile.name} — dibuat dengan ❤ dan sedikit solder.`);

  document.title = `${profile.name} | Portofolio Elektronika`;

  const heroPhoto = document.getElementById("heroPhoto");
  if (heroPhoto && profile.photo) heroPhoto.src = profile.photo;

  // CV download links
  ["downloadCvBtn", "downloadCvBtn2"].forEach((id) => {
    const el = document.getElementById(id);
    if (el && profile.cv) {
      el.href = profile.cv;
      el.setAttribute("download", "");
    }
  });

  // Email button
  const emailBtn = document.getElementById("emailBtn");
  if (emailBtn && profile.email) {
    emailBtn.href = `mailto:${profile.email}`;
  }

  // Social row
  const socialRow = document.getElementById("socialRow");
  if (socialRow && profile.social) {
    const icons = { github: "GH", linkedin: "in", instagram: "IG" };
    socialRow.innerHTML = Object.entries(profile.social)
      .map(([key, url]) => {
        const label = icons[key] || key.slice(0, 2).toUpperCase();
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${key}">${label}</a>`;
      })
      .join("");
  }
}

function renderSkills(skills) {
  const grid = document.getElementById("skillsGrid");
  if (!grid || !Array.isArray(skills)) return;

  grid.innerHTML = skills
    .map(
      (skill) => `
      <div class="skill-card reveal" data-category="${skill.category}">
        <div class="skill-top">
          <span>${skill.name}</span>
          <span class="pct">${skill.level}%</span>
        </div>
        <div class="skill-bar">
          <div class="skill-fill" data-level="${skill.level}"></div>
        </div>
      </div>
    `
    )
    .join("");
}
function renderProjects(projects) {
  const grid = document.getElementById("projectsGrid");
  if (!grid || !Array.isArray(projects)) return;

  grid.innerHTML = projects
    .map(
      (p) => `
      <article class="project-card reveal">
        <div class="project-thumb">
          <img src="${p.image}" alt="Thumbnail proyek ${p.title}" loading="lazy">
        </div>
        <div class="project-body">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="tag-row">
            ${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
          </div>
        </div>
      </article>
    `
    )
    .join("");
}

function renderExperience(experience) {
  const list = document.getElementById("experienceList");
  if (!list || !Array.isArray(experience)) return;
 
  list.innerHTML = `<div class="timeline">${experience
    .map(
      (e) => `
      <div class="timeline-item reveal">
        <h3>${e.role}</h3>
        <div class="meta">${e.organization} · ${e.period}</div>
        <p>${e.description}</p>
      </div>
    `
    )
    .join("")}</div>`;
}

function renderEducation(education) {
  const list = document.getElementById("educationList");
  if (!list || !Array.isArray(education)) return;

  list.innerHTML = education
    .map(
      (e) => `
      <div class="timeline-item reveal">
        <h3>${e.degree}</h3>
        <div class="meta">${e.institution} · ${e.year}</div>
        <p>${e.description}</p>
      </div>
    `
    )
    .join("");
}

function renderCertificates(certificates) {
  const list = document.getElementById("certList");
  if (!list || !Array.isArray(certificates)) return;

  list.innerHTML = certificates
    .map(
      (c, i) => `
      <div class="cert-item reveal">
        <div class="cert-icon">${String(i + 1).padStart(2, "0")}</div>
        <div>
          <h3>${c.title}</h3>
          <div class="meta">${c.issuer} · ${c.year}</div>
        </div>
      </div>
    `
    )
    .join("");
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined) el.textContent = value;
}

// ===========================
// NAVBAR TOGGLE (MOBILE)
// ===========================
function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ===========================
// SCROLL REVEAL
// ===========================
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          // Trigger skill bar fill animation when visible
          const fill = entry.target.querySelector(".skill-fill");
          if (fill && !fill.dataset.filled) {
            fill.style.width = `${fill.dataset.level}%`;
            fill.dataset.filled = "true";
          }

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((item) => observer.observe(item));
}

// Re-observe newly rendered .reveal elements after data loads
function refreshRevealObserver() {
  // Small delay to ensure DOM has rendered
  setTimeout(initScrollReveal, 50);
}

// ===========================
// INIT
// ===========================
document.addEventListener("DOMContentLoaded", async () => {
  initNavToggle();
  await loadPortfolioData();
  refreshRevealObserver();
});
