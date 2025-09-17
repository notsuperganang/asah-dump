// Data untuk skills dan projects
const skillsData = [
    { name: "Next.js", level: 90, icon: "⚡" },
    { name: "React.js", level: 88, icon: "⚛️" },
    { name: "Python", level: 85, icon: "🐍" },
    { name: "TensorFlow", level: 82, icon: "🧠" },
    { name: "PyTorch", level: 80, icon: "🔥" },
    { name: "Node.js", level: 85, icon: "🟢" },
    { name: "TypeScript", level: 83, icon: "💙" },
    { name: "FastAPI", level: 78, icon: "🚀" },
    { name: "PostgreSQL", level: 75, icon: "🐘" },
    { name: "MongoDB", level: 73, icon: "🍃" },
    { name: "Docker", level: 70, icon: "🐳" },
    { name: "AWS", level: 68, icon: "☁️" },
    { name: "Scikit-learn", level: 75, icon: "📊" },
    { name: "Pandas", level: 80, icon: "🐼" },
    { name: "NumPy", level: 78, icon: "🔢" },
    { name: "Keras", level: 76, icon: "🎯" }
];

const projectsData = [
    {
        title: "Sikupi",
        description: "Platform marketplace sirkular untuk produk turunan ampas kopi dengan AI image analyzer untuk prediksi harga realtime ampas kopi. Membantu menciptakan ekonomi sirkular dari limbah kopi.",
        tech: "Next.js, OpenAI Model, Supabase, Computer Vision",
        image: "asset/sikupi.png",
        url: "https://sikupi.com",
        shortDesc: "Marketplace sirkular untuk produk turunan ampas kopi dengan AI image analyzer"
    },
    {
        title: "Purrpal",
        description: "Platform komunitas vegetarian untuk pemilik kucing dengan AI powered. Pemilik dapat berbagi kucing mereka, tips perawatan, dilengkapi computer vision untuk deteksi penyakit kucing dan chatbot cerdas.",
        tech: "Next.js, TensorFlow, Computer Vision, AI Chatbot",
        image: "asset/purrpal.png",
        url: "https://fe-purrpal.vercel.app/",
        shortDesc: "Platform komunitas untuk pemilik kucing dengan AI powered dan computer vision"
    },
    {
        title: "GitHub Portfolio",
        description: "Kunjungi repositori GitHub saya untuk melihat lebih banyak project dan kontribusi open source. Mari berkolaborasi dan terhubung!",
        tech: "Berbagai Tech Stack & Open Source Projects",
        url: "https://github.com/notsuperganang",
        shortDesc: "Repositori project dan kontribusi open source"
    }
];

// Toggle mobile menu
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Toggle dropdown
function toggleDropdown() {
    const dropdown = document.getElementById('dropdownContent');
    dropdown.classList.toggle('active');
}

// Scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: 'smooth' });

    // Close dropdown after click
    document.getElementById('dropdownContent').classList.remove('active');
}

// Generate skills grid menggunakan looping
function generateSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    skillsGrid.innerHTML = ''; // Clear existing content

    skillsData.forEach((skill, index) => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.innerHTML = `
            <h4>${skill.icon} ${skill.name}</h4>
            <div class="skill-bar">
                <div class="skill-progress" id="progress-${index}" style="width: 0%"></div>
            </div>
            <p>${skill.level}% Proficiency</p>
        `;
        skillsGrid.appendChild(skillCard);

        // Animate progress bar
        setTimeout(() => {
            document.getElementById(`progress-${index}`).style.width = `${skill.level}%`;
        }, 500 + (index * 200));
    });
}

// Generate project slides menggunakan looping
function generateProjects() {
    const projectSlides = document.getElementById('projectSlides');
    projectSlides.innerHTML = ''; // Clear existing content

    projectsData.forEach((project, index) => {
        const slide = document.createElement('div');
        slide.className = 'project-slide';
        slide.dataset.url = project.url; // Store URL for click handling
        
        // Add background image if available
        if (project.image) {
            slide.style.backgroundImage = `linear-gradient(rgba(18, 52, 88, 0.6), rgba(3, 3, 3, 0.6)), url('${project.image}')`;
            slide.style.backgroundSize = 'cover';
            slide.style.backgroundPosition = 'center';
        }
        
        // Main content (always visible)
        slide.innerHTML = `
            <div class="project-content">
                <h3 style="color: #F1EFEC;">${project.title}</h3>
                <p>${project.description}</p>
                <p><strong>Tech Stack:</strong> ${project.tech}</p>
            </div>
            
            <div class="project-overlay">
                <div class="project-overlay-content">
                    <h3>${project.title}</h3>
                    <p>${project.shortDesc}</p>
                    <a href="${project.url}" target="_blank" class="project-visit-btn" onclick="event.stopPropagation()">
                        Kunjungi Project
                    </a>
                </div>
            </div>
        `;
        
        projectSlides.appendChild(slide);
    });
}

// Project slider functionality
let currentSlide = 0;
const totalSlides = projectsData.length;

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function updateSlider() {
    const slides = document.getElementById('projectSlides');
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Auto-play slider with pause on hover
let autoSlideInterval;
let isHovered = false;

function startAutoSlide() {
    if (!isHovered && !autoSlideInterval) {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

function pauseAutoSlide() {
    isHovered = true;
    stopAutoSlide();
}

function resumeAutoSlide() {
    isHovered = false;
    setTimeout(() => {
        if (!isHovered) {
            startAutoSlide();
        }
    }, 100); // Small delay to prevent rapid start/stop
}

// Start auto-slide initially
startAutoSlide();

// Social media alert
function showSocialAlert(platform) {
    alert(`Menuju ke ${platform}! Terima kasih telah mengunjungi portfolio saya.`);
}

// Scroll Animation Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe articles and aside
    document.querySelectorAll('article, aside').forEach(el => {
        observer.observe(el);
    });

    // Observe skill cards with stagger effect
    setTimeout(() => {
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach((card, index) => {
            setTimeout(() => {
                observer.observe(card);
            }, index * 100);
        });
    }, 1000);
}

// Add click handlers and hover events for project slides
function addProjectClickHandlers() {
    document.querySelectorAll('.project-slide').forEach(slide => {
        slide.addEventListener('click', function() {
            const url = this.dataset.url;
            if (url) {
                window.open(url, '_blank');
            }
        });
    });
    
    // Add hover events to the project slider container only (not individual slides)
    const projectSlider = document.querySelector('.project-slider');
    if (projectSlider) {
        projectSlider.addEventListener('mouseenter', pauseAutoSlide);
        projectSlider.addEventListener('mouseleave', resumeAutoSlide);
    }
    
    // Also pause when hovering over slider controls
    const sliderControls = document.querySelector('.slider-controls');
    if (sliderControls) {
        sliderControls.addEventListener('mouseenter', pauseAutoSlide);
        sliderControls.addEventListener('mouseleave', resumeAutoSlide);
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function () {
    generateSkills();
    generateProjects();
    addProjectClickHandlers();
    initScrollAnimations();

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');

        if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (event) {
        const dropdown = document.getElementById('dropdownContent');
        const dropdownBtn = document.querySelector('.dropdown-btn');

        if (!dropdown.contains(event.target) && !dropdownBtn.contains(event.target)) {
            dropdown.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(18, 52, 88, 0.95)';
    } else {
        header.style.backgroundColor = 'transparent';
    }
});