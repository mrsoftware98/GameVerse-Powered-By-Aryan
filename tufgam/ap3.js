// Data
const gamesData = [
    {
        title: "Cyber Legends",
        genre: "FPS",
        players: "125K Online"
    },
    {
        title: "Fantasy Realm",
        genre: "MMORPG",
        players: "89K Online"
    },
    {
        title: "Speed Racers",
        genre: "Racing",
        players: "45K Online"
    },
    {
        title: "Battle Royale X",
        genre: "Battle Royale",
        players: "250K Online"
    },
    {
        title: "Strategy Masters",
        genre: "Strategy",
        players: "32K Online"
    },
    {
        title: "Horror Nights",
        genre: "Horror",
        players: "18K Online"
    }
];

const tournamentsData = [
    {
        title: "Winter Championship",
        prize: "$50,000",
        date: "Dec 15, 2025",
        participants: "256/512 Joined"
    },
    {
        title: "Pro League Season 4",
        prize: "$100,000",
        date: "Jan 10, 2026",
        participants: "128/256 Joined"
    },
    {
        title: "Rookie Cup",
        prize: "$10,000",
        date: "Nov 30, 2025",
        participants: "512/1024 Joined"
    },
    {
        title: "Masters Invitational",
        prize: "$250,000",
        date: "Feb 20, 2026",
        participants: "32/64 Joined"
    }
];

const storeData = [
    {
        title: "Premium Skins Pack",
        price: "$19.99"
    },
    {
        title: "Battle Pass - Season 8",
        price: "$9.99"
    },
    {
        title: "Weapon Bundle",
        price: "$14.99"
    },
    {
        title: "Character Bundle",
        price: "$24.99"
    },
    {
        title: "XP Booster (30 Days)",
        price: "$7.99"
    },
    {
        title: "Elite Membership",
        price: "$49.99"
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderGames();
    renderTournaments();
    renderStore();
    setupNavigation();
    setupAnimations();
    setupNewsletterForm();
});

// Render Games
function renderGames() {
    const grid = document.getElementById('gamesGrid');
    
    gamesData.forEach((game, index) => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="game-image"></div>
            <div class="game-content">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-genre">${game.genre}</p>
                <div class="game-players">
                    <span>🟢</span>
                    <span>${game.players}</span>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            showGameDetails(game);
        });
        
        grid.appendChild(card);
    });
}

// Render Tournaments
function renderTournaments() {
    const grid = document.getElementById('tournamentsGrid');
    
    tournamentsData.forEach((tournament, index) => {
        const card = document.createElement('div');
        card.className = 'tournament-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="tournament-header">
                <h3>${tournament.title}</h3>
                <span class="tournament-prize">${tournament.prize}</span>
            </div>
            <p class="tournament-date">📅 ${tournament.date}</p>
            <p class="tournament-participants">👥 ${tournament.participants}</p>
            <button class="btn-primary" style="width: 100%; margin-top: 1rem;">Join Tournament</button>
        `;
        
        card.querySelector('button').addEventListener('click', () => {
            joinTournament(tournament);
        });
        
        grid.appendChild(card);
    });
}

// Render Store
function renderStore() {
    const grid = document.getElementById('storeGrid');
    
    storeData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'store-item';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="store-image"></div>
            <div class="store-content">
                <h3>${item.title}</h3>
                <p class="store-price">${item.price}</p>
                <button class="btn-primary" style="width: 100%;">Purchase</button>
            </div>
        `;
        
        card.querySelector('button').addEventListener('click', () => {
            purchaseItem(item);
        });
        
        grid.appendChild(card);
    });
}

// Navigation
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Close mobile menu
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Scroll spy
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Animations
function setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards
    const cards = document.querySelectorAll('.game-card, .tournament-card, .store-item, .community-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

// Newsletter Form
function setupNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            
            if (email) {
                showNotification('Success! You\'re now subscribed to our newsletter.', 'success');
                form.reset();
            }
        });
    }
}

// Game Details
function showGameDetails(game) {
    showNotification(`Opening ${game.title}...`, 'info');
    console.log('Game selected:', game);
}

// Tournament Actions
function joinTournament(tournament) {
    showNotification(`Joining ${tournament.title}...`, 'success');
    console.log('Tournament joined:', tournament);
}

// Purchase Actions
function purchaseItem(item) {
    showNotification(`Adding ${item.title} to cart...`, 'success');
    console.log('Item purchased:', item);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 2rem',
        background: type === 'success' ? '#06ffa5' : type === 'error' ? '#ff4655' : '#667eea',
        color: '#0a0e27',
        borderRadius: '8px',
        fontWeight: '600',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease-out',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
    });
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(10, 14, 39, 0.98);
        padding: 2rem;
        gap: 1rem;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .nav-menu.active {
            display: flex;
        }
    }
`;
document.head.appendChild(style);

// Stats Counter Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const isPlus = target.includes('+');
        const num = parseInt(target.replace(/[^0-9]/g, ''));
        const suffix = target.replace(/[0-9]/g, '');
        
        let current = 0;
        const increment = num / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
                stat.textContent = num + suffix;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    });
}

// Trigger stats animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const hero = document.querySelector('.hero');
if (hero) {
    heroObserver.observe(hero);
}

// Dynamic background particles (optional enhancement)
function createParticles() {
    const hero = document.querySelector('.hero-background');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        Object.assign(particle.style, {
            position: 'absolute',
            width: Math.random() * 4 + 'px',
            height: Math.random() * 4 + 'px',
            background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.5)`,
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`,
            animationDelay: Math.random() * 5 + 's'
        });
        hero.appendChild(particle);
    }
}

// Add float animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
        }
        25% {
            transform: translateY(-20px) translateX(10px);
        }
        50% {
            transform: translateY(-40px) translateX(-10px);
        }
        75% {
            transform: translateY(-20px) translateX(10px);
        }
    }
`;
document.head.appendChild(floatStyle);

// Initialize particles
createParticles();

// Performance optimization - Lazy load images
function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.background = img.dataset.bg || img.style.background;
                imageObserver.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('.game-image, .store-image');
    images.forEach(img => imageObserver.observe(img));
}

lazyLoadImages();

console.log('🎮 GameVerse - Website Initialized Successfully!');