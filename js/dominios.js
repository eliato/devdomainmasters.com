/**
 * Dev Domain Masters - Dominios Landing Page
 * JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Initialize all modules
  initMobileMenu();
  initSmoothScroll();
  initFAQ();
  initScrollAnimations();
  initHeaderScroll();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navMobile = document.getElementById('nav-mobile');
  
  if (!menuBtn || !navMobile) return;
  
  menuBtn.addEventListener('click', function() {
    const isHidden = navMobile.classList.contains('hidden');
    
    if (isHidden) {
      navMobile.classList.remove('hidden');
      menuBtn.setAttribute('aria-label', 'Cerrar menú');
    } else {
      navMobile.classList.add('hidden');
      menuBtn.setAttribute('aria-label', 'Abrir menú');
    }
    
    // Toggle icon visibility
    const menuIcon = menuBtn.querySelector('.menu-icon');
    const closeIcon = menuBtn.querySelector('.close-icon');
    
    if (menuIcon && closeIcon) {
      menuIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    }
  });
  
  // Close menu when clicking on a link
  navMobile.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      navMobile.classList.add('hidden');
      
      const menuIcon = menuBtn.querySelector('.menu-icon');
      const closeIcon = menuBtn.querySelector('.close-icon');
      
      if (menuIcon && closeIcon) {
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
      
      menuBtn.setAttribute('aria-label', 'Abrir menú');
    });
  });
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      
      if (target) {
        e.preventDefault();
        
        const header = document.getElementById('header');
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * FAQ Accordion
 */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    
    if (!question) return;
    
    question.addEventListener('click', function() {
      const isOpen = item.classList.contains('open');
      
      // Close all other items
      faqItems.forEach(function(otherItem) {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          const otherQuestion = otherItem.querySelector('.faq-question');
          if (otherQuestion) {
            otherQuestion.setAttribute('aria-expanded', 'false');
          }
        }
      });
      
      // Toggle current item
      if (isOpen) {
        item.classList.remove('open');
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Scroll Animations with Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.tipo-card, .ventaja-card, .proceso-step, .faq-item, .sv-card'
  );
  
  if (animatedElements.length === 0) return;
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(function(el) {
    observer.observe(el);
  });
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  
  if (!header) return;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
      header.style.boxShadow = 'none';
    }
  }, { passive: true });
}
