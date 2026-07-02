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
    renderExperience(data.experience);
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
  setText("footerText", `© ${new Date().getFullYear()} ${profile.name} — Electronic Engineering ❤`);

  document.title = `${profile.name} | Portofolio Elektronika`;

  const heroPhoto = document.getElementById("heroPhoto");
  if (heroPhoto && profile.photo) heroPhoto.src = profile.photo;

  ["downloadCvBtn", "downloadCvBtn2"].forEach((id) => {
    const el = document.getElementById(id);
    if (el && profile.cv) {
      el.href = profile.cv;
      el.setAttribute("download", "");
    }
  });

  const emailBtn = document.getElementById("emailBtn");
  if (emailBtn && profile.email) {
    emailBtn.href = `mailto:${profile.email}`;
  }

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
    .filter((skill) => skill.name)
    .map(
      (skill, i) => `
      <div class="skill-card" style="transition-delay: ${i * 60}ms">
        <span class="skill-dot"></span>
        <span>${skill.name}</span>
      </div>
    `
    )
    .join("");

  // Trigger staggered pop-in animation
  requestAnimationFrame(() => {
    setTimeout(() => {
      grid.querySelectorAll(".skill-card").forEach((card) => {
        card.classList.add("is-visible");
      });
    }, 100);
  });
}

function renderExperience(experience) {
  const list = document.getElementById("experienceList");
  if (!list || !Array.isArray(experience)) return;

  list.innerHTML = experience
    .map(
      (e) => `
      <div class="timeline-item reveal">
        <h3>${e.role}</h3>
        <div class="meta">${e.organization} · ${e.period}</div>
        <p>${e.description}</p>
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

function refreshRevealObserver() {
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
