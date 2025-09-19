javascript:(function(){
  const dpr = window.devicePixelRatio || 1;
  const t = document.createElement('canvas');
  t.id = 'cg-draw-canvas';
  t.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:999999;touch-action:none;background:rgba(0,0,0,.1);display:none;cursor:crosshair;';
  document.body.appendChild(t);

  const ctx = t.getContext('2d');
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  function resizeCanvas(){
    t.width  = Math.floor(window.innerWidth * dpr);
    t.height = Math.floor(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let drawing = false, last = {x:0,y:0};

  function getPos(e){ return { x: e.clientX, y: e.clientY }; }

  t.addEventListener('pointerdown', (e)=>{
    e.preventDefault();
    t.setPointerCapture(e.pointerId);
    drawing = true;
    last = getPos(e);
  }, {passive:false});

  t.addEventListener('pointermove',(e)=>{
    if(!drawing) return;
    e.preventDefault();
    const p = getPos(e);
    ctx.strokeStyle = 'red';
    ctx.lineWidth= 4;
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last = p;
  }, {passive:false});

  t.addEventListener('pointerup', (e)=>{
    drawing = false;
    try{ t.releasePointerCapture(e.pointerId); } catch(_) {}
  });
t.addEventListener('pointercancel', ()=>{ drawing = false; });
function Btn(label,pos,fn) {
  const b = document.createElement('button');
  b.textContent = label;
  b.style.cssText = "all:unset !important;padding:6px 12px !important;font-size:20px !important;cursor:pointer !important;position:fixed !important;bottom:0% !important;right:"+pos+" !important;z-index:1000001 !important;background:#ffffff !important; color: #000 !important;border: 2px solid #000 !important";
  b.onclick=fn;
  document.body.appendChild(b);
  return b;
}
Btn('desenh','10%',()=> { t.style.display = (t.style.display === 'none') ? 'block' : 'none'; });
Btn('limpar','80%',()=> { ctx.clearRect(0,0,t.width,t.height);});
})();
