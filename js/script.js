
document.addEventListener('DOMContentLoaded', function(){
  // Tram animation steps for 6 frames (exposed for export if needed)
  const tramWrapper = document.querySelector('.tram-wrapper');
  if(tramWrapper){
    let step = 0; const steps = 6; const start = -220; const end = window.innerWidth + 100;
    const positions = Array.from({length:steps}, (_,i)=>Math.round(start + (end-start)*(i/(steps-1))));
    console.log('Tram frame positions:', positions);
    setInterval(()=>{ step=(step+1)%steps; tramWrapper.style.left = positions[step] + 'px'; }, 600);
  }

  // Simple carousel for landmarks page
  const track = document.querySelector('.carousel-track');
  const slides = track ? Array.from(track.children) : [];
  let index = 0;
  function updateCarousel(){
    if(!track) return;
    track.style.transform = `translateX(-${index*100}%)`;
    // update caption info
    const info = document.querySelector('.controls .info');
    const current = slides[index];
    if(current && info){
      info.textContent = current.getAttribute('data-title') + ' — ' + current.getAttribute('data-year');
    }
  }
  const prev = document.querySelector('.controls .prev');
  const next = document.querySelector('.controls .next');
  if(prev) prev.addEventListener('click', ()=>{ index = (index-1+slides.length)%slides.length; updateCarousel(); });
  if(next) next.addEventListener('click', ()=>{ index = (index+1)%slides.length; updateCarousel(); });
  updateCarousel();

  // lazy load maps (simple)
  const mapIframe = document.querySelector('iframe[data-src]');
  if(mapIframe){
    mapIframe.setAttribute('src', mapIframe.getAttribute('data-src'));
  }
});
