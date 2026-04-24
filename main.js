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
});
