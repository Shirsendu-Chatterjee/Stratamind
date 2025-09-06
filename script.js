// Backend Configuration
const BACKEND_URL = "https://s-chatterjee2005-stratamind.hf.space";

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backendStatus = document.getElementById('backend-status');
const knowledgeInput = document.getElementById('knowledge-input');
const uploadBtn = document.getElementById('upload-btn');
const chatMessages = document.getElementById('chat-messages');
const questionInput = document.getElementById('question-input');
const sendBtn = document.getElementById('send-btn');
const contactForm = document.getElementById('contact-form');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    checkBackendConnection();
    initializeDemoSection();
    initializeContactForm();
    initializeCursorFollower();
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Animation initialization
function initializeAnimations() {
    // Typing animation for hero text
    animateTypingText();
    
    // Intersection Observer for scroll animations
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

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

function animateTypingText() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const originalText = typingElement.textContent;
    typingElement.textContent = '';
    
    let charIndex = 0;
    const typingSpeed = 100;

    function typeChar() {
        if (charIndex < originalText.length) {
            typingElement.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, typingSpeed);
        }
    }

    setTimeout(typeChar, 1000);
}

// Cursor follower for robot animations
function initializeCursorFollower() {
    const robots = document.querySelectorAll('.robot');
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    robots.forEach((robot, index) => {
        let robotX = 0;
        let robotY = 0;
        const speed = 0.02 + (index * 0.01);

        function animateRobot() {
            const deltaX = mouseX - robotX;
            const deltaY = mouseY - robotY;

            robotX += deltaX * speed;
            robotY += deltaY * speed;

            robot.style.left = robotX + 'px';
            robot.style.top = robotY + 'px';

            requestAnimationFrame(animateRobot);
        }

        animateRobot();
    });
}

// Backend connection management
async function checkBackendConnection() {
    const statusElement = backendStatus;
    
    try {
        statusElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Connecting to backend...</span>';
        
        const response = await fetch(`${BACKEND_URL}/health`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (response.ok) {
            statusElement.innerHTML = '<i class="fas fa-check-circle"></i><span>Backend Connected</span>';
            statusElement.className = 'status-indicator connected';
            enableDemoControls(true);
        } else {
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (error) {
        console.error('Backend connection error:', error);
        statusElement.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>Backend Offline</span>';
        statusElement.className = 'status-indicator error';
        enableDemoControls(false);
        
        // Retry connection after 10 seconds
        setTimeout(checkBackendConnection, 10000);
    }
}

function enableDemoControls(enabled) {
    const controls = [uploadBtn, sendBtn, questionInput, knowledgeInput];
    controls.forEach(control => {
        if (control) {
            control.disabled = !enabled;
            if (enabled) {
                control.classList.remove('disabled');
            } else {
                control.classList.add('disabled');
            }
        }
    });
}

// Demo section functionality
function initializeDemoSection() {
    // Upload knowledge functionality
    if (uploadBtn) {
        uploadBtn.addEventListener('click', uploadKnowledge);
    }

    // Send question functionality
    if (sendBtn) {
        sendBtn.addEventListener('click', sendQuestion);
    }

    // Enter key support for question input
    if (questionInput) {
        questionInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendQuestion();
            }
        });
    }

    // Auto-resize textarea
    if (knowledgeInput) {
        knowledgeInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }
}

async function uploadKnowledge() {
    const text = knowledgeInput.value.trim();
    
    if (!text) {
        addMessage('system', 'Please enter some knowledge text before uploading.');
        return;
    }

    try {
        uploadBtn.disabled = true;
        uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';

        const blob = new Blob([text], { type: 'text/plain' });
        const formData = new FormData();
        formData.append('file', blob, 'knowledge.txt');

        const response = await fetch(`${BACKEND_URL}/upload_text/`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        addMessage('system', data.message || 'Knowledge uploaded successfully!');
        knowledgeInput.value = '';
        
    } catch (error) {
        console.error('Upload error:', error);
        addMessage('system', `Upload failed: ${error.message}`);
    } finally {
        uploadBtn.disabled = false;
        uploadBtn.innerHTML = '<i class="fas fa-upload"></i> Upload Knowledge';
    }
}

async function sendQuestion() {
    const question = questionInput.value.trim();
    
    if (!question) {
        return;
    }

    // Add user message
    addMessage('user', question);
    questionInput.value = '';

    try {
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        // Add typing indicator
        const typingMessage = addMessage('ai', 'AI is thinking...');
        typingMessage.classList.add('loading');

        const formData = new FormData();
        formData.append('question', question);

        const response = await fetch(`${BACKEND_URL}/ask/`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Remove typing indicator
        typingMessage.remove();
        
        // Add AI response
        addMessage('ai', data.answer || 'Sorry, I couldn\'t generate a response.');
        
    } catch (error) {
        console.error('Question error:', error);
        
        // Remove typing indicator if it exists
        const typingIndicator = chatMessages.querySelector('.loading');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        
        addMessage('ai', `Sorry, I encountered an error: ${error.message}`);
    } finally {
        sendBtn.disabled = false;
        sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
    }
}

function addMessage(type, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const senderDiv = document.createElement('div');
    senderDiv.className = 'message-sender';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;
    
    switch(type) {
        case 'user':
            senderDiv.textContent = 'You';
            break;
        case 'ai':
            senderDiv.textContent = 'AI Assistant';
            break;
        case 'system':
            senderDiv.textContent = 'System';
            break;
    }
    
    messageDiv.appendChild(senderDiv);
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return messageDiv;
}

// Contact form functionality
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

async function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate form submission (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        contactForm.reset();
        
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(0, 255, 136, 0.9)' : 'rgba(255, 107, 157, 0.9)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;
document.head.appendChild(notificationStyles);

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(12, 12, 12, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(12, 12, 12, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth reveal animations for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.service-card, .pricing-card, .tech-item');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add revealed class styles
const revealStyles = document.createElement('style');
revealStyles.textContent = `
    .service-card,
    .pricing-card,
    .tech-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .service-card.revealed,
    .pricing-card.revealed,
    .tech-item.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyles);

// Initialize reveal on load
document.addEventListener('DOMContentLoaded', revealOnScroll);