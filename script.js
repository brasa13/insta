    function toggleMenu(){
      const nav = document.querySelector('nav ul');
      nav.classList.toggle('active');
    }

    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click',e=>{
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if(target){
          target.scrollIntoView({behavior:'smooth', block:'start'});
          document.querySelector('nav ul').classList.remove('active');
        }
      })
    })

    function updateScrollProgress(){
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
    }

    function handleHeaderScroll(){
      const header = document.querySelector('header');
      if(window.scrollY > 100){
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.addEventListener('DOMContentLoaded', () => {
      const animatedElements = document.querySelectorAll('.card, .project, .skill');
      animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
      });

      window.addEventListener('scroll', () => {
        updateScrollProgress();
        handleHeaderScroll();
      });
        
      document.addEventListener('click', (e) => {
        const nav = document.querySelector('nav ul');
        const toggle = document.querySelector('.mobile-toggle');
        if(!nav.contains(e.target) && !toggle.contains(e.target)){
          nav.classList.remove('active');
        }
      });

      const heroTitle = document.querySelector('.intro h1');
      if(heroTitle){
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        const typeWriter = () => {
          if(i < text.length){
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
          }
        };
        setTimeout(typeWriter, 500);
      }
    });

    document.querySelectorAll('.project').forEach(project => {
      project.addEventListener('mouseenter', () => {
        project.style.transform = 'translateY(-8px) scale(1.02)';
      });
      project.addEventListener('mouseleave', () => {
        project.style.transform = 'translateY(0) scale(1)';
      });
    });

    document.querySelectorAll('.btn, .cta').forEach(btn => {
      btn.addEventListener('click', function(e){
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  
