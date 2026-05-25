// Small interactions for the Fardin portfolio
document.addEventListener('DOMContentLoaded', function(){
  const btns = Array.from(document.querySelectorAll('.btn'));
  if(btns.length){
    const contact = btns[0];
    const hire = btns[1];
    contact.addEventListener('click', ()=>{
      window.location.href = 'mailto:fardin@example.com?subject=Hello%20Fardin';
    });
    hire.addEventListener('click', ()=>{
      window.location.href = 'mailto:business@fardin.example?subject=Opportunity%20for%20your%20startup';
    });
  }
  // Animated hero particle background
  const canvas = document.getElementById('hero-canvas');
  if(canvas && canvas.getContext){
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    const TAU = Math.PI * 2;

    function resize(){
      w = canvas.width = canvas.clientWidth * devicePixelRatio;
      h = canvas.height = canvas.clientHeight * devicePixelRatio;
      particles = [];
      const count = Math.max(24, Math.floor(w * 0.02));
      for(let i=0;i<count;i++) particles.push(new Particle());
    }

    function rand(min, max){ return Math.random() * (max - min) + min }

    function Particle(){
      this.x = rand(0, w);
      this.y = rand(0, h);
      this.r = rand(1.2, 3.6) * devicePixelRatio;
      this.vx = rand(-0.3, 0.3) * devicePixelRatio;
      this.vy = rand(-0.2, 0.2) * devicePixelRatio;
      this.life = rand(60, 220);
      this.hue = rand(200, 290);
    }
    Particle.prototype.step = function(){
      this.x += this.vx; this.y += this.vy;
      if(this.x < -20 || this.x > w + 20) this.x = (this.x + w) % w;
      if(this.y < -20 || this.y > h + 20) this.y = (this.y + h) % h;
    }

    function draw(){
      ctx.clearRect(0,0,w,h);
      // subtle glow background
      for(let p of particles){
        p.step();
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r*8);
        g.addColorStop(0, 'rgba(124,58,237,0.12)');
        g.addColorStop(0.35, 'rgba(6,182,212,0.06)');
        g.addColorStop(1, 'rgba(2,6,23,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r*6, 0, TAU); ctx.fill();
      }

      // connecting lines
      ctx.lineWidth = Math.max(0.4, devicePixelRatio*0.4);
      for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx*dx+dy*dy);
          if(d < (w * 0.12)){
            const alpha = 0.18 * (1 - d / (w * 0.12));
            ctx.strokeStyle = `rgba(124,58,237,${alpha})`;
            ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', ()=>{resize()});
    resize();
    requestAnimationFrame(draw);
  }

  // Navigation smooth scroll & active link
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = Array.from(document.querySelectorAll('section, .hero'));

  function setActiveLink(id){
    navLinks.forEach(a=>{
      a.classList.toggle('active', a.getAttribute('href') === ('#'+id));
    });
  }

  navLinks.forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  function onScroll(){
    const offset = window.innerHeight * 0.25;
    let current = sections[0];
    for(const s of sections){
      const rect = s.getBoundingClientRect();
      if(rect.top - offset <= 0) current = s;
    }
    if(current.id) setActiveLink(current.id);
  }

  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
});
