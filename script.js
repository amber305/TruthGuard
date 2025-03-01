document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      document.querySelectorAll('.bar').forEach(bar => {
        bar.classList.toggle('active');
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
      
      // Close mobile menu if open
      if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        document.querySelectorAll('.bar').forEach(bar => {
          bar.classList.remove('active');
        });
      }
    });
  });

  // Testimonial slider
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.slider-dot');
  let currentTestimonial = 0;
  
  function showTestimonial(index) {
    testimonials.forEach(testimonial => {
      testimonial.classList.remove('active');
    });
    
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
  }
  
  // Initialize slider
  if (testimonials.length > 0) {
    showTestimonial(0);
    
    // Auto slide every 5 seconds
    setInterval(() => {
      let nextIndex = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(nextIndex);
    }, 5000);
    
    // Click events for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showTestimonial(index);
      });
    });
  }

  // Fake news detection form
  const newsForm = document.getElementById('news-form');
  const resultSection = document.getElementById('result');
  
  if (newsForm) {
    newsForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const newsText = document.getElementById('news-text').value.trim();
      if (!newsText) {
        alert('Please enter some news content to analyze.');
        return;
      }
      
      // Show loading state
      const analyzeBtn = document.getElementById('analyze-btn');
      const btnText = analyzeBtn.querySelector('.btn-text');
      const spinner = analyzeBtn.querySelector('.spinner');
      
      btnText.textContent = 'Analyzing...';
      spinner.classList.remove('hidden');
      
      // Simulate API call with timeout
      setTimeout(() => {
        // Generate random result for demo purposes
        const isFake = Math.random() > 0.5;
        const confidence = Math.floor(Math.random() * 30) + 70; // Random confidence between 70-99%
        
        displayResult(isFake, confidence);
        
        // Reset button state
        btnText.textContent = 'Analyze Content';
        spinner.classList.add('hidden');
        
        // Scroll to result
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 2000);
    });
  }

  // Contact form
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }
      
      // Simulate form submission
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }

  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
});

// Function to display the analysis result
function displayResult(isFake, confidence) {
  const resultSection = document.getElementById('result');
  const resultIcon = document.getElementById('result-icon');
  const resultTitle = document.getElementById('result-title');
  const resultDescription = document.getElementById('result-description');
  const confidenceBar = document.getElementById('confidence-bar');
  const confidencePercentage = document.getElementById('confidence-percentage');
  const contentAnalysis = document.getElementById('content-analysis');
  const statisticalEvaluation = document.getElementById('statistical-evaluation');
  
  // Show the result section
  resultSection.classList.remove('hidden');
  
  // Set the result icon
  resultIcon.innerHTML = isFake ? '⚠️' : '✅';
  resultIcon.className = 'result-icon ' + (isFake ? 'false' : 'true');
  
  // Set the result title and description
  resultTitle.textContent = isFake ? 'Potentially Misleading Content' : 'Likely Authentic Content';
  resultDescription.textContent = isFake 
    ? 'Our analysis indicates this content may contain misleading information.' 
    : 'Our analysis suggests this content is likely to be factual.';
  
  // Set the confidence meter
  confidenceBar.style.width = confidence + '%';
  confidenceBar.className = 'meter-bar ' + (isFake ? 'false' : 'true');
  confidencePercentage.textContent = confidence + '%';
  confidencePercentage.style.color = isFake ? 'var(--danger-color)' : 'var(--success-color)';
  
  // Set the detailed analysis
  contentAnalysis.textContent = isFake 
    ? 'The content contains patterns often found in misleading articles, such as sensationalist language and emotional manipulation.' 
    : 'The content follows patterns consistent with factual reporting, using measured language and presenting information clearly.';
  
  statisticalEvaluation.textContent = isFake 
    ? `Our algorithm is ${confidence}% confident that this content contains misleading information based on statistical analysis.` 
    : `Our algorithm is ${confidence}% confident that this content is factually accurate based on statistical analysis.`;
}

// Add scroll event for sticky header
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Add CSS for mobile menu when active
document.head.insertAdjacentHTML('beforeend', `
  <style>
    @media (max-width: 768px) {
      .nav-links.show {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        background-color: white;
        padding: 20px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        z-index: 1000;
      }
      
      .bar.active:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      
      .bar.active:nth-child(2) {
        opacity: 0;
      }
      
      .bar.active:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
      }
      
      header.scrolled {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }
      
      section.animate {
        animation: fadeInUp 0.8s ease forwards;
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  </style>
`);