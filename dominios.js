/**
 * Dev Domain Masters - Dominios Landing Page
 * JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Mobile Menu Toggle
  initMobileMenu();
  
  // Smooth Scroll for anchor links
  initSmoothScroll();
  
  // FAQ Accordion
  initFAQ();
  
  // Scroll animations
  initScrollAnimations();
  
  // Header scroll effect
  initHeaderScroll();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  
  if (!menuBtn || !navLinks) return;
  
  menuBtn.addEventListener('click', function() {
    const isActive = navLinks.classList.contains('mobile-active');
    
    if (isActive) {
      navLinks.classList.remove('mobile-active');
      menuBtn.classList.remove('active');
      menuBtn.setAttribute('aria-label', 'Abrir menú');
    } else {
      navLinks.classList.add('mobile-active');
      menuBtn.classList.add('active');
      menuBtn.setAttribute('aria-label', 'Cerrar menú');
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
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.classList.remove('mobile-active');
      menuBtn.classList.remove('active');
      
      const menuIcon = menuBtn.querySelector('.menu-icon');
      const closeIcon = menuBtn.querySelector('.close-icon');
      
      if (menuIcon && closeIcon) {
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
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
        
        const headerHeight = document.getElementById('header')?.offsetHeight || 72;
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
    const trigger = item.querySelector('.faq-trigger');
    
    if (!trigger) return;
    
    trigger.addEventListener('click', function() {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(function(otherItem) {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          if (otherTrigger) {
            otherTrigger.setAttribute('aria-expanded', 'false');
          }
        }
      });
      
      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.tipo-card, .ventaja-card, .sv-card, .proceso-step, .faq-item'
  );
  
  // Add animation class
  animatedElements.forEach(function(el) {
    el.classList.add('animate-fade-in');
  });
  
  // Intersection Observer for animations
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
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
      header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = function() {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
