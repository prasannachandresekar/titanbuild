// TITANBUILD - PREMIUM CONSTRUCTION WEBSITE JAVASCRIPT

// THEME TOGGLE FUNCTIONALITY
function toggleTheme() {
    const current = document.body.getAttribute("data-theme");
    
    if (current === "dark") {
        document.body.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        // Update all theme toggle buttons
        document.querySelectorAll(".theme-toggle").forEach(btn => {
            btn.innerHTML = "🌙";
        });
    } else {
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        // Update all theme toggle buttons
        document.querySelectorAll(".theme-toggle").forEach(btn => {
            btn.innerHTML = "☀️";
        });
    }
}

// Load saved theme and initialize theme toggles
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
        document.body.setAttribute("data-theme", "dark");
        // Update all theme toggle buttons
        document.querySelectorAll(".theme-toggle").forEach(btn => {
            btn.innerHTML = "☀️";
        });
    }
    
    // Add click listeners to all theme toggle buttons
    document.querySelectorAll(".theme-toggle").forEach(btn => {
        btn.addEventListener("click", toggleTheme);
    });
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize form validation
    initFormValidation();
});

// MOBILE MENU FUNCTIONALITY
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    
    // Hamburger toggle for main navigation and mobile drawer
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Toggle main nav-links for tablet (768px and below)
            if (navLinks) {
                navLinks.classList.toggle('active');
            }
            
            // Toggle mobile drawer for phone (360px and below)
            if (mobileMenu && window.innerWidth <= 360) {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    // Mobile drawer menu functionality
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// SCROLL ANIMATIONS
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with animation class
    const animateElements = document.querySelectorAll('.card, .stat-card, .testimonial-card, .blog-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// FORM VALIDATION
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const formErrors = validateForm(form);
            
            if (formErrors.length === 0) {
                // Show success message
                showNotification('Form submitted successfully!', 'success');
                form.reset();
            } else {
                // Show errors
                showNotification(formErrors.join(', '), 'error');
            }
        });
    });
}

function validateForm(form) {
    const errors = [];
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            errors.push(`${field.name || field.placeholder} is required`);
        }
        
        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                errors.push('Please enter a valid email address');
            }
        }
    });
    
    return errors;
}

// NOTIFICATION SYSTEM
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#10b981';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        default:
            notification.style.backgroundColor = '#3b82f6';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// SMOOTH SCROLLING
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// DASHBOARD FUNCTIONALITY
function initDashboard() {
    // Sample data for dashboard
    const dashboardData = {
        projects: 42,
        clients: 128,
        revenue: 2847500,
        team: 16
    };
    
    // Update dashboard stats
    updateDashboardStats(dashboardData);
    
    // Initialize charts if needed
    initCharts();
}

function updateDashboardStats(data) {
    const statElements = document.querySelectorAll('.stat-card-small .number');
    
    // Animate numbers
    statElements.forEach((el, index) => {
        const targetValue = Object.values(data)[index];
        animateNumber(el, targetValue);
    });
}

function animateNumber(element, target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number
        if (target > 1000) {
            element.textContent = formatNumber(current);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function initCharts() {
    // Simple chart implementation using CSS
    const chartContainers = document.querySelectorAll('.chart-container');
    
    chartContainers.forEach(container => {
        // Add basic chart functionality
        container.style.position = 'relative';
        container.style.height = '300px';
        container.style.backgroundColor = 'var(--section-bg)';
        container.style.borderRadius = '8px';
        container.style.padding = '1rem';
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        container.style.color = 'var(--text-secondary)';
        container.innerHTML = '<div>Chart visualization would go here</div>';
    });
}

// SEARCH FUNCTIONALITY (for blog)
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            blogCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const content = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// LAZY LOADING FOR IMAGES
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// UTILITY FUNCTIONS
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSearch();
    initLazyLoading();
    
    // Check if we're on dashboard page
    if (document.body.classList.contains('dashboard-page')) {
        initDashboard();
    }
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Handle responsive adjustments
    if (window.innerWidth > 768) {
        // Close mobile menu if open
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}, 250));
