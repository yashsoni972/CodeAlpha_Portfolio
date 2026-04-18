// ===========================
// INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    setupSplashScreen();
    renderSkills();
    renderProjects();
    renderExperience();
    renderEducation();
    setupEventListeners();
    setTimeout(() => {
        document.querySelectorAll('.glass-card').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }, 100);
});

// ===========================
// UTILITY
// ===========================
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); closeMobileMenu(); updateActiveLink(id); }
}
function updateActiveLink(id) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const a = document.querySelector(`button[onclick="scrollToSection('${id}')"]`);
    if (a && a.classList.contains('nav-link')) a.classList.add('active');
}
function closeMobileMenu() { document.getElementById('mobile-menu').classList.remove('open'); }

// ===========================
// NAVBAR & SCROLL
// ===========================
function setupEventListeners() {
    document.getElementById('hamburger').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.toggle('open');
    });
    document.addEventListener('click', e => {
        if (!e.target.closest('.navbar')) closeMobileMenu();
    });
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 300);
    });
    window.addEventListener('scroll', () => {
        let cur = '';
        document.querySelectorAll('section').forEach(s => {
            if (window.scrollY >= s.offsetTop - 200) cur = s.id;
        });
        if (cur) updateActiveLink(cur);
    });
}

// ===========================
// SPLASH SCREEN
// ===========================
function setupSplashScreen() {
    const splash = document.getElementById('splash-screen');
    const domain = document.getElementById('domain-text');
    const tagline = document.getElementById('tagline-text');

    setTimeout(() => { domain.classList.remove('hidden-splash'); domain.classList.add('fade-in-up'); }, 800);
    setTimeout(() => { tagline.classList.remove('hidden-splash'); tagline.classList.add('fade-in-up'); }, 2000);
    setTimeout(() => {
        splash.style.transition = 'opacity 0.7s ease';
        splash.style.opacity = '0';
        setTimeout(() => { splash.style.display = 'none'; }, 700);
        startTypingAnimation();
    }, 4000);
}

// ===========================
// TYPING ANIMATION
// ===========================
function startTypingAnimation() {
    const roles = portfolioData.personalInfo.roles;
    const el = document.getElementById('typing-text');
    let ri = 0, text = '', deleting = false;
    function type() {
        const cur = roles[ri];
        if (!deleting && text.length < cur.length) { text = cur.slice(0, text.length + 1); el.textContent = text; setTimeout(type, 80); }
        else if (!deleting && text.length === cur.length) { deleting = true; setTimeout(type, 2000); }
        else if (deleting && text.length > 0) { text = text.slice(0, -1); el.textContent = text; setTimeout(type, 40); }
        else { deleting = false; ri = (ri + 1) % roles.length; setTimeout(type, 500); }
    }
    type();
}

// ===========================
// RENDER SKILLS
// ===========================
function renderSkills() {
    const container = document.getElementById('skills-container');
    const iconMap = {
        'fa-html5':    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
        'fa-css3':     'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
        'fa-js-square':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
        'fa-python':   'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
        'fa-react':    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
        'fa-tailwind': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
        'fa-git':      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
        'fa-github':   'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
        'fa-code':     'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
        'fa-database': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
        'fa-leaf':     'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
    };
    const catIcons = { 'Languages': '💻', 'Frameworks & Libraries': '⚛️', 'Tools & Platforms': '🛠️', 'Databases': '🗄️' };

    Object.entries(portfolioData.skills).forEach(([cat, items]) => {
        const div = document.createElement('div');
        div.className = 'glass-card skill-category';
        let html = `<div class="skill-cat-header"><span>${catIcons[cat] || '📦'}</span><h3>${cat}</h3></div><div class="skill-grid">`;
        items.forEach(s => {
            html += `<div class="skill-chip"><img src="${iconMap[s.icon]||''}" alt="${s.name}" class="skill-chip-img" onerror="this.style.display='none'"><span>${s.name}</span></div>`;
        });
        html += '</div>';
        div.innerHTML = html;
        container.appendChild(div);
    });
}

// ===========================
// RENDER PROJECTS — clean professional cards
// ===========================
function renderProjects() {
    const container = document.getElementById('projects-container');
    const logoMap = { 'citysolve': 'citysolve-logo.png', 'gallery-hub': 'gallery-logo.svg', 'calculator-pro': 'calculator-logo.png' };
    const topColors = [
        'linear-gradient(135deg,#005f73,#0a9396)',
        'linear-gradient(135deg,#0a9396,#94d2bd)',
        'linear-gradient(135deg,#ee9b00,#ca6702)'
    ];

    portfolioData.projects.forEach((p, idx) => {
        const card = document.createElement('div');
        card.className = 'glass-card proj-card';

        let html = `<div class="proj-top-bar" style="background:${topColors[idx%3]}"></div>`;
        if (p.badge) html += `<div class="project-badge">${p.badge}</div>`;
        html += `
        <div class="proj-body">
            <div class="proj-header">
                <div class="proj-logo">
                    <img src="${logoMap[p.id]||''}" alt="${p.title}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
                    <span style="display:none;font-size:1.8rem">${p.icon}</span>
                </div>
                <div>
                    <h3 class="proj-title">${p.title}</h3>
                    <p class="proj-subtitle">${p.subtitle}</p>
                </div>
            </div>
            <p class="proj-desc">${p.description}</p>
            <div class="proj-features">`;
        p.features.forEach(f => { html += `<span class="proj-feat"><i class="fas fa-check-circle"></i>${f}</span>`; });
        html += `</div><div class="proj-tags">`;
        p.tags.forEach(t => { html += `<span class="proj-tag">${t}</span>`; });
        html += `</div><div class="proj-links">`;
        if (p.demo) html += `<a href="${p.demo}" target="_blank" rel="noreferrer" class="proj-btn-demo"><i class="fas fa-external-link-alt"></i> Live Demo</a>`;
        if (p.github) html += `<a href="${p.github}" target="_blank" rel="noreferrer" class="proj-btn-github"><i class="fab fa-github"></i> GitHub</a>`;
        html += `</div></div>`;

        card.innerHTML = html;
        container.appendChild(card);
    });
}

// ===========================
// RENDER EXPERIENCE — hover to reveal details
// ===========================
function renderExperience() {
    const container = document.getElementById('experience-container');
    portfolioData.experience.forEach(exp => {
        const card = document.createElement('div');
        card.className = 'exp-card glass-card exp-hover-card';
        const isHack = exp.type === 'hackathon';
        const logoHtml = exp.type === 'internship'
            ? `<img src="codealpha.jpeg" alt="CodeAlpha" class="exp-logo" onerror="this.style.display='none'">`
            : `<span style="font-size:1.5rem">🏆</span>`;
        const topColor = isHack ? 'linear-gradient(135deg,#ee9b00,#ca6702)' : 'linear-gradient(135deg,#005f73,#0a9396)';

        let details = '';
        if (exp.projects) {
            details += `<div class="exp-detail-section"><div class="exp-detail-label">Projects Built</div><div class="exp-tags">`;
            exp.projects.forEach(p => { details += `<span class="exp-tag green">${p}</span>`; });
            details += `</div></div>`;
        }
        if (exp.contributions) {
            details += `<div class="exp-detail-section"><div class="exp-detail-label">Contributions</div><ul class="exp-list">`;
            exp.contributions.forEach(c => { details += `<li><i class="fas fa-check-circle"></i>${c}</li>`; });
            details += `</ul></div>`;
        }
        details += `<div class="exp-tags" style="margin-top:0.75rem">`;
        exp.tags.forEach(t => { details += `<span class="exp-tag">${t}</span>`; });
        details += `</div>`;

        card.innerHTML = `
            <div class="exp-card-top" style="background:${topColor}"></div>
            <div class="exp-card-body">
                ${exp.badge ? `<span class="exp-badge">${exp.badge}</span>` : ''}
                <div class="exp-header">
                    <div class="exp-logo-wrap">${logoHtml}</div>
                    <div class="exp-info">
                        <h3 class="exp-title">${exp.title}</h3>
                        <p class="exp-company">${exp.company}</p>
                        <p class="exp-period">${exp.period}</p>
                    </div>
                </div>
                <p class="exp-desc">${exp.description}</p>
                <div class="exp-details exp-hover-details">${details}</div>
                
            </div>`;
        container.appendChild(card);
    });
}

// ===========================
// RENDER EDUCATION — hover to reveal details
// ===========================
function renderEducation() {
    const container = document.getElementById('education-container');
    const logos = ['college-logo.png', 'R.P.T.P.png', 'M.U.PATEL.jpg'];

    portfolioData.education.forEach((edu, i) => {
        const item = document.createElement('div');
        item.className = 'edu-item';
        item.innerHTML = `
            <div class="edu-dot-wrap">
                <div class="edu-dot"></div>
                ${i < portfolioData.education.length - 1 ? '<div class="edu-line"></div>' : ''}
            </div>
            <div class="edu-card glass-card edu-hover-card">
                <div class="edu-card-header">
                    <div class="edu-logo-wrap">
                        <img src="${logos[i]}" alt="${edu.institute}" class="edu-logo-img" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
                        <span class="edu-logo-fallback" style="display:none">${edu.icon}</span>
                    </div>
                    <div class="edu-main">
                        <span class="edu-period-badge">${edu.period}</span>
                        <h3 class="edu-degree">${edu.degree}</h3>
                        <p class="edu-institute">${edu.institute}</p>
                    </div>
                </div>
                
                <div class="edu-details edu-hover-details">
                    <p class="edu-desc">${edu.description}</p>
                    <div class="edu-subjects">${edu.subjects.map(s => `<span class="subject-tag">${s}</span>`).join('')}</div>
                </div>
            </div>`;
        container.appendChild(item);
    });
}

// ===========================
// CONTACT FORM
// ===========================
function handleContactForm(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    window.location.href = `mailto:75soniyashmayurkumar@gmail.com?subject=Contact from ${name}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    document.getElementById('contact-form').reset();
}

// ===========================
// CHATBOT
// ===========================
function toggleChatbot() {
    document.getElementById('chatbot-window').classList.toggle('open');
    document.getElementById('new-message-indicator').classList.remove('show');
}
function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;
    addChatMessage(msg, 'user');
    input.value = '';
    setTimeout(() => addChatMessage(getBotResponse(msg), 'bot'), 500);
}
function handleChatInput(e) { if (e.key === 'Enter') sendChatMessage(); }
function addChatMessage(text, sender) {
    const box = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `chat-message ${sender}-message`;
    div.innerHTML = `<p>${text}</p>`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}
function getBotResponse(msg) {
    const m = msg.toLowerCase();
    const k = portfolioData.chatbotKnowledge;
    if (/^(hi|hello|hey)/.test(m)) return "👋 Hi! I'm Yash's assistant. Ask me about his skills, projects, experience, or how to contact him!";
    if (m.includes('skill') || m.includes('tech') || m.includes('stack')) return k.skills;
    if (m.includes('project') || m.includes('work') || m.includes('built')) return k.projects;
    if (m.includes('citysolve') || m.includes('hackathon')) return k.citysolve;
    if (m.includes('experience') || m.includes('intern')) return k.experience;
    if (m.includes('education') || m.includes('college') || m.includes('degree')) return k.education;
    if (m.includes('contact') || m.includes('email') || m.includes('phone')) return k.contact;
    if (m.includes('resume') || m.includes('cv')) return k.resume;
    if (m.includes('hire') || m.includes('job')) return k.hire;
    if (m.includes('about') || m.includes('who')) return k.about;
    return "I can help with:\n• 💻 Skills\n• 🚀 Projects\n• 💼 Experience\n• 🎓 Education\n• 📧 Contact\n• 📄 Resume";
}
