/**
 * DEV DOMAIN MASTERS - JavaScript
 * Landing Page Scripts - Versión Estática
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
    lucide.createIcons();
    
      // ==================== FAQ ACCORDION ====================
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('open');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      
      // Toggle current item
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ==================== MOBILE MENU ====================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
  const closeIcon = mobileMenuBtn.querySelector('.close-icon');
  const mobileNavLinks = mobileNav.querySelectorAll('a');

  function toggleMobileMenu() {
    const isOpen = !mobileNav.classList.contains('hidden');
    
    if (isOpen) {
      mobileNav.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMenuBtn.setAttribute('aria-label', 'Abrir menú');
    } else {
      mobileNav.classList.remove('hidden');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      mobileMenuBtn.setAttribute('aria-label', 'Cerrar menú');
    }
  }

  mobileMenuBtn.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when clicking on links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileNav.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // ==================== HEADER SCROLL EFFECT ====================
  const header = document.getElementById('header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      header.style.background = 'hsla(222, 47%, 6%, 0.95)';
    } else {
      header.style.background = 'hsla(222, 47%, 6%, 0.8)';
    }
    
    lastScrollY = currentScrollY;
  });

  // ==================== SMOOTH SCROLL ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==================== FORM VALIDATION ====================
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const toast = document.getElementById('toast');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
  }

  function clearError(input, errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
  }

  function validateForm() {
    let isValid = true;

    // Validate name
    if (nameInput.value.trim().length < 2) {
      showError(nameInput, nameError, 'El nombre debe tener al menos 2 caracteres');
      isValid = false;
    } else {
      clearError(nameInput, nameError);
    }

    // Validate email
    if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, emailError, 'Por favor ingresa un correo válido');
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    // Validate message
    if (messageInput.value.trim().length < 10) {
      showError(messageInput, messageError, 'El mensaje debe tener al menos 10 caracteres');
      isValid = false;
    } else {
      clearError(messageInput, messageError);
    }

    return isValid;
  }

  // Real-time validation
  nameInput.addEventListener('blur', function() {
    if (this.value.trim().length < 2 && this.value.length > 0) {
      showError(this, nameError, 'El nombre debe tener al menos 2 caracteres');
    } else {
      clearError(this, nameError);
    }
  });

  emailInput.addEventListener('blur', function() {
    if (!validateEmail(this.value.trim()) && this.value.length > 0) {
      showError(this, emailError, 'Por favor ingresa un correo válido');
    } else {
      clearError(this, emailError);
    }
  });

  messageInput.addEventListener('blur', function() {
    if (this.value.trim().length < 10 && this.value.length > 0) {
      showError(this, messageError, 'El mensaje debe tener al menos 10 caracteres');
    } else {
      clearError(this, messageError);
    }
  });

  // Form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (validateForm()) {
      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Enviando...</span>';

      // Simulate API call
      setTimeout(function() {
        // Show success toast
        showToast('¡Mensaje enviado! Te contactaremos pronto.');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        lucide.createIcons();
      }, 1500);
    }
  });

  // ==================== TOAST NOTIFICATION ====================
  function showToast(message) {
    const toastMessage = toast.querySelector('.toast-message');
    toastMessage.textContent = message;
    toast.classList.remove('hidden');

    setTimeout(function() {
      toast.classList.add('hidden');
    }, 4000);
  }

  // ==================== SCROLL ANIMATIONS ====================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    '.service-card, .value-card, .process-step, .stat-card'
  );

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
    
    // ==================== DYNAMIC YEAR IN FOOTER ====================
    const currentYearSpan = document.getElementById('currentYear');
    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;

   });
