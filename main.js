document.addEventListener('DOMContentLoaded', function(){
  const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
  const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const header = document.querySelector('.top-nav');

  function setNavHeightVar(){
    if(header) document.documentElement.style.setProperty('--nav-height', header.offsetHeight + 'px');
  }
  setNavHeightVar();
  window.addEventListener('resize', setNavHeightVar);

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`.nav-list a[href="#${id}"]`);
      if(entry.isIntersecting){
        navLinks.forEach(l => l.classList.remove('active'));
        if(link) link.classList.add('active');
      }
    });
  },{root:null,rootMargin:'0px 0px -40% 0px',threshold:0});

  sections.forEach(s => io.observe(s));

  // Smooth scroll offset handling
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if(!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if(!target) return;
      e.preventDefault();
      const navH = header ? header.offsetHeight : 72;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navH - 10;
      window.scrollTo({top,behavior:'smooth'});
    });
  });

  // Accommodation image toggle button
  const toggleBtn = document.getElementById('toggle-accom-image');
  const accomContainer = document.getElementById('accom-image-container');
  if (toggleBtn && accomContainer) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = accomContainer.hasAttribute('hidden');
      if (isHidden) {
        accomContainer.removeAttribute('hidden');
        accomContainer.setAttribute('aria-hidden', 'false');
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.textContent = 'Skrýt mapu ubytování';
        accomContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        accomContainer.setAttribute('hidden', '');
        accomContainer.setAttribute('aria-hidden', 'true');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.textContent = 'Zobrazit mapu ubytování';
      }
    });
  }
});
