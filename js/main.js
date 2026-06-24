document.addEventListener('DOMContentLoaded', () => {
    // 1. Mengatur Tahun Otomatis di Footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }

    // 2. Mengambil Data dari data.json
    fetch('data.json') // Ganti menjadi 'js/data.json' jika file JSON ada di dalam folder js
        .then(response => {
            if (!response.ok) {
                throw new Error(`Gagal memuat file JSON (Status: ${response.status})`);
            }
            return response.json();
        })
        .then(data => {
            renderProfile(data.profile);
            renderSkills(data.profile.skills); // Mengambil array skills dari dalam profile
            renderEducation(data.education);
            renderExperience(data.experience);
            renderProjects(data.projects);
        })
        .catch(error => {
            console.error('Waduh, ada error saat memuat data:', error);
        });
});

// === FUNGSI UNTUK MERENDER DATA KE HTML ===

// 1. Render Profil
function renderProfile(profile) {
    if (!profile) return;
    
    document.getElementById('profile-name').innerText = profile.name;
    document.getElementById('profile-description').innerText = profile.description;
    document.getElementById('profile-email').innerText = profile.email;
    document.getElementById('profile-phone').innerText = profile.phone;
    document.getElementById('profile-pic').src = profile.profile_pic;
    
    const cvBtn = document.getElementById('cv-download');
    if (cvBtn) cvBtn.href = profile.cv_url;

    // Render Media Sosial
    const socialContainer = document.getElementById('social-links');
    if (socialContainer && profile.social_links) {
        socialContainer.innerHTML = '';
        profile.social_links.forEach(soc => {
            socialContainer.innerHTML += `
                <a href="${soc.url}" target="_blank" title="${soc.platform}">
                    <i class="${soc.icon}"></i>
                </a>
            `;
        });
    }
}

// 2. Render Kehlian (Skills)
function renderSkills(skills) {
    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid || !skills) return;

    skillsGrid.innerHTML = '';
    skills.forEach(skill => {
        skillsGrid.innerHTML += `
            <div class="skill-item">
                <i class="fas fa-check-circle" style="color: #007bff; margin-right: 8px;"></i>
                <span>${skill}</span>
            </div>
        `;
    });
}

// 3. Render Edukasi
function renderEducation(educationList) {
    const eduContainer = document.getElementById('education-list');
    if (!eduContainer || !educationList) return;

    eduContainer.innerHTML = '';
    educationList.forEach(edu => {
        eduContainer.innerHTML += `
            <div class="education-item" style="margin-bottom: 25px; border-left: 3px solid #007bff; padding-left: 15px;">
                <h3 style="margin: 0 0 5px 0; color: #333;">${edu.degree}</h3>
                <h4 style="margin: 0 0 5px 0; color: #555; font-weight: 600;">${edu.institution}</h4>
                <span class="period" style="font-size: 0.9rem; color: #888; display: block; margin-bottom: 8px;">
                    <i class="fas fa-calendar-alt"></i> ${edu.period}
                </span>
                <p style="margin: 0; color: #666; line-height: 1.5;">${edu.description}</p>
            </div>
        `;
    });
}

// 4. Render Pengalaman & Sertifikasi
function renderExperience(experienceList) {
    const expContainer = document.getElementById('experience-list');
    if (!expContainer || !experienceList) return;

    expContainer.innerHTML = '';
    experienceList.forEach(exp => {
        // Membuat list untuk tugas/keterangan pekerjaan jika ada
        let tasksHTML = '';
        if (exp.tasks && exp.tasks.length > 0) {
            tasksHTML = `<ul style="margin: 8px 0 0 0; padding-left: 20px; color: #666; line-height: 1.5;">`;
            exp.tasks.forEach(task => {
                tasksHTML += `<li>${task}</li>`;
            });
            tasksHTML += `</ul>`;
        }

        expContainer.innerHTML += `
            <div class="experience-item" style="margin-bottom: 25px; border-left: 3px solid #28a745; padding-left: 15px;">
                <h3 style="margin: 0 0 5px 0; color: #333;">${exp.role}</h3>
                <h4 style="margin: 0 0 5px 0; color: #555; font-weight: 600;">${exp.company}</h4>
                <span class="period" style="font-size: 0.9rem; color: #888; display: block; margin-bottom: 8px;">
                    <i class="fas fa-calendar-alt"></i> ${exp.period}
                </span>
                ${tasksHTML}
            </div>
        `;
    });
}

// 5. Render Proyek
function renderProjects(projectList) {
    const projectGrid = document.getElementById('projects-grid');
    if (!projectGrid || !projectList) return;

    projectGrid.innerHTML = '';
    projectList.forEach(proj => {
        // Membuat badge komponen/teknologi (tags)
        let tagsHTML = '';
        if (proj.tech_stack) {
            tagsHTML = proj.tech_stack.map(tag => `
                <span class="tag" style="display:inline-block; background:#e9ecef; color:#495057; padding: 3px 10px; border-radius:15px; font-size:0.8rem; margin: 0 5px 5px 0;">
                    ${tag}
                </span>
            `).join('');
        }

        projectGrid.innerHTML += `
            <div class="project-card" style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden; background: #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.05); margin-bottom: 20px;">
                <img src="${proj.image}" alt="${proj.title}" style="width: 100%; height: 200px; object-fit: cover; background: #f8f9fa;">
                <div class="project-info" style="padding: 20px;">
                    <h3 style="margin: 0 0 10px 0; color:#333;">${proj.title}</h3>
                    <p style="color:#666; font-size:0.95rem; line-height:1.5; margin-bottom: 15px;">${proj.description}</p>
                    <div class="project-tags" style="margin-bottom: 15px;">
                        ${tagsHTML}
                    </div>
                    <a href="${proj.link}" class="project-link" style="color: #007bff; text-decoration: none; font-weight: bold; font-size: 0.9rem;">
                        Lihat Proyek <i class="fas fa-arrow-right" style="font-size: 0.8rem;"></i>
                    </a>
                </div>
            </div>
        `;
    });
}
