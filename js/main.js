document.addEventListener('DOMContentLoaded', function() {
    // 페이지 로드 시 상단으로 강제 이동
    window.scrollTo(0, 0);
    
    // 추가 보장을 위해 약간의 지연 후 다시 한번 실행
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
    
    // 페이지 로드 완료 후에도 한번 더 실행
    window.addEventListener('load', function() {
        window.scrollTo(0, 0);
    });
    
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
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
        });
    });
    
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    const emailChars = document.querySelectorAll('.email-char');
    emailChars.forEach((char, index) => {
        char.addEventListener('mouseenter', function() {
            setTimeout(() => {
                this.style.transform = 'translateY(-3px) scale(1.1)';
            }, index * 50);
        });
        
        char.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < text.length) {
                mainTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        typeWriter();
    }
    
    // Add floating animation to scroll indicator
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        setInterval(() => {
            scrollArrow.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                scrollArrow.style.transform = 'translateY(0)';
            }, 1000);
        }, 2000);
    }
    
    const modal = document.getElementById('aboutModal');
    const readMoreBtn = document.querySelector('.read-more');
    const closeBtn = document.querySelector('.close');
    
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    const blogLinkBtn = document.querySelector('.blog-link');
    if (blogLinkBtn) {
        blogLinkBtn.addEventListener('click', function() {
            alert('블로그로 이동하는 기능을 구현할 수 있습니다!');
        });
    }
    
    const contactBtn = document.querySelector('.contact-button');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            window.location.href = 'mailto:yoon.jj5539@gmail.com';
        });
    }
    
    let isScrolling = false;
    let hasUserInteracted = false;
    
    document.addEventListener('wheel', function() {
        hasUserInteracted = true;
    }, { once: true });
    
    window.addEventListener('wheel', function(e) {
        if (isScrolling || !hasUserInteracted) return;
        
        const currentSection = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
        const section = currentSection.closest('section');
        
        if (section && section.classList.contains('hero')) {
            isScrolling = true;
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
            
            e.preventDefault();
            
            const delta = e.deltaY;
            
            if (delta > 0) {
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        }
    }, { passive: false });
});

// Project Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Add a subtle animation effect
            const activePanel = document.getElementById(targetTab);
            activePanel.style.opacity = '0';
            activePanel.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                activePanel.style.opacity = '1';
                activePanel.style.transform = 'translateY(0)';
            }, 50);
        });
    });
    
    // Add hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects for tech tags
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Contact-me button functionality (About section)
    const contactMeButton = document.querySelector('.contact-me');
    if (contactMeButton) {
        contactMeButton.addEventListener('click', function() {
            window.location.href = 'tel:01033445539';
        });
    }
    
    // Contact button functionality (Contact section)
    const contactButton = document.querySelector('.contact-button');
    if (contactButton) {
        contactButton.addEventListener('click', function() {
            window.location.href = 'mailto:yoon.jj5539@gmail.com';
        });
    }
});
