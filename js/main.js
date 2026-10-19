// Script
(()=>{
    const d=document,rm=matchMedia('(prefers-reduced-motion:reduce)').matches;

    const h=d.querySelector('header'),b=d.querySelector('.burger'),n=d.querySelector('nav');

    const on=()=>h.classList.toggle('s',scrollY>40);
    on();
    addEventListener('scroll',on,{passive:true});

    b.onclick=()=>{
        const o=n.classList.toggle('open');
        b.setAttribute('aria-expanded',o);
        d.body.style.overflow=o?'hidden':''
    };

    n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
        n.classList.remove('open');
        b.setAttribute('aria-expanded',false);
        d.body.style.overflow=''
    }));

    const els=d.querySelectorAll('.r,.mk');

    if(!('IntersectionObserver' in window)||rm){
        els.forEach(e=>e.classList.add('in'))
    }else{
        const io=new IntersectionObserver(es=>es.forEach(e=>{
            if(e.isIntersecting){
                e.target.classList.add('in');
                io.unobserve(e.target)
            }
        }),{threshold:.12,rootMargin:'0px 0px -6% 0px'});

        els.forEach(e=>io.observe(e));
        setTimeout(()=>els.forEach(e=>e.classList.add('in')),6000)
    }

    const bg=d.querySelector('.hero .bg'),tl=d.querySelector('.tl');let t=false;

    const f=()=>{
        t=false;
        const y=scrollY;

        if(bg&&!rm&&y<innerHeight*1.2)bg.style.transform=`translate3d(0,${y*.12}px,0)`;

        if(tl){
            const r=tl.getBoundingClientRect();
            tl.style.setProperty('--p',Math.max(0,Math.min(1,(innerHeight*.7-r.top)/r.height)))
        }
    };

    addEventListener('scroll',()=>{
        if(!t){
            t=true;
            requestAnimationFrame(f)
        }
    },{passive:true});

    f();

    const fm=d.querySelector('form');

    if(fm)fm.addEventListener('submit',e=>{
        e.preventDefault();

        const v=Object.fromEntries(new FormData(fm));

        location.href='mailto:info@moliendaschana.com?subject='+encodeURIComponent(v.asunto+' - '+v.nombre)+'&body='+encodeURIComponent(v.mensaje+'\n\n'+v.nombre+' <'+v.email+'>');

        d.querySelector('.ok').textContent='Abriendo tu cliente de correo para enviar la consulta.'
    });
})();
