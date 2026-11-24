const english=document.documentElement.lang==='en';
const primaryNav=document.querySelector('.nav');
if(primaryNav){
 const secondary=[...primaryNav.querySelectorAll('a')].filter(link=>/^(?:education|research|certifications|life)\.html/.test(link.getAttribute('href')||''));
 if(secondary.length){
  const more=document.createElement('details');
  more.className='nav-more';
  if(secondary.some(link=>link.hasAttribute('aria-current')))more.classList.add('has-current');
  const summary=document.createElement('summary');
  summary.textContent=english?'More':'更多';
  const menu=document.createElement('div');
  menu.className='nav-more-menu';
  secondary.forEach(link=>menu.append(link));
  more.append(summary,menu);
  primaryNav.append(more);
 }
}
const headerTop=document.querySelector('.header-top');
const headerActions=document.querySelector('.header-actions');
if(headerTop&&primaryNav&&headerActions){
 headerTop.insertBefore(primaryNav,headerActions);
}
const currentNavLink=primaryNav?.querySelector('[aria-current="page"]');
if(primaryNav&&currentNavLink&&primaryNav.scrollWidth>primaryNav.clientWidth){
 requestAnimationFrame(()=>{primaryNav.scrollLeft=currentNavLink.offsetLeft-(primaryNav.clientWidth-currentNavLink.offsetWidth)/2;});
}
const photoDialog=document.getElementById('photo-dialog');
let opener;
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{
 opener=button;
 const image=document.getElementById('large-photo');
 image.src=button.dataset.photo;image.alt=button.dataset.caption;
 document.getElementById('photo-caption').textContent=button.dataset.caption;
 photoDialog.showModal();document.body.style.overflow='hidden';
}));
document.querySelector('.dialog-close')?.addEventListener('click',()=>photoDialog.close());
photoDialog?.addEventListener('close',()=>{document.body.style.overflow='';opener?.focus({preventScroll:true});});
photoDialog?.addEventListener('click',event=>{if(event.target===photoDialog){const r=photoDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)photoDialog.close();}});
document.getElementById('copy-email')?.addEventListener('click',async()=>{
 const status=document.getElementById('copy-status');
 try{await navigator.clipboard.writeText('lint96409@gmail.com');status.textContent=english?'Copied! I look forward to your message :)':'複製好了！期待收到你的訊息 :)';}
 catch{status.textContent=english?'You can copy it manually: lint96409@gmail.com':'也可以手動複製：lint96409@gmail.com';}
});

const researchTabs=[...document.querySelectorAll('[data-research-tab]')];
if(researchTabs.length){
 const researchPanels=[...document.querySelectorAll('.research-tab-panel')];
 const activateResearchTab=(tab,updateHash=false)=>{
  researchTabs.forEach(item=>{
   const active=item===tab;
   item.setAttribute('aria-selected',String(active));
   item.tabIndex=active?0:-1;
  });
  researchPanels.forEach(panel=>panel.hidden=panel.id!==tab.dataset.researchTab);
  if(updateHash)history.replaceState(null,'','#'+tab.dataset.researchTab);
 };
 researchTabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>activateResearchTab(tab,true));
  tab.addEventListener('keydown',event=>{
   let next=index;
   if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%researchTabs.length;
   else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+researchTabs.length)%researchTabs.length;
   else if(event.key==='Home')next=0;
   else if(event.key==='End')next=researchTabs.length-1;
   else return;
   event.preventDefault();researchTabs[next].focus();activateResearchTab(researchTabs[next],true);
  });
 });
 const requested=researchTabs.find(tab=>'#'+tab.dataset.researchTab===location.hash);
 activateResearchTab(requested||researchTabs[0]);
}

const academicTabs=[...document.querySelectorAll('[data-academic-tab]')];
if(academicTabs.length){
 const academicPanels=[...document.querySelectorAll('.academic-tab-panel')];
 const activateAcademicTab=tab=>{
  academicTabs.forEach(item=>{
   const active=item===tab;
   item.setAttribute('aria-selected',String(active));
   item.tabIndex=active?0:-1;
  });
  academicPanels.forEach(panel=>panel.hidden=panel.id!==tab.dataset.academicTab);
 };
 academicTabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>activateAcademicTab(tab));
  tab.addEventListener('keydown',event=>{
   let next=index;
   if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%academicTabs.length;
   else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+academicTabs.length)%academicTabs.length;
   else if(event.key==='Home')next=0;
   else if(event.key==='End')next=academicTabs.length-1;
   else return;
   event.preventDefault();academicTabs[next].focus();activateAcademicTab(academicTabs[next]);
  });
 });
 activateAcademicTab(academicTabs.find(tab=>tab.getAttribute('aria-selected')==='true')||academicTabs[0]);
}

const competitionFilters=[...document.querySelectorAll('[data-competition-filter]')];
if(competitionFilters.length){
 const competitionEvents=[...document.querySelectorAll('.timeline-event[data-rank]')];
 const competitionEras=[...document.querySelectorAll('[data-competition-era]')];
 const competitionCount=document.querySelector('[data-competition-count]');
 const applyCompetitionFilter=filter=>{
  let visibleCount=0;
  competitionEvents.forEach(event=>{
   const visible=filter==='all'||event.dataset.rank===filter;
   event.hidden=!visible;
   if(visible)visibleCount+=1;
  });
  competitionEras.forEach(era=>{
   era.hidden=![...era.querySelectorAll('.timeline-event')].some(event=>!event.hidden);
  });
  competitionFilters.forEach(button=>{
   const active=button.dataset.competitionFilter===filter;
   button.classList.toggle('is-active',active);
   button.setAttribute('aria-pressed',String(active));
  });
  if(competitionCount)competitionCount.textContent=String(visibleCount);
 };
 competitionFilters.forEach(button=>button.addEventListener('click',()=>applyCompetitionFilter(button.dataset.competitionFilter)));
 applyCompetitionFilter('all');
}

// 2026.11 — subtle, accessible page motion
const progress=document.createElement('div');
progress.className='scroll-progress';
progress.setAttribute('aria-hidden','true');
document.body.append(progress);
const updateProgress=()=>{
 const max=document.documentElement.scrollHeight-innerHeight;
 progress.style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%';
};
addEventListener('scroll',updateProgress,{passive:true});updateProgress();

if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
 const revealItems=[...document.querySelectorAll('main > section, main > div, main > article, main > aside, .project-card, .bento, .latest-card, .ongoing-card, .timeline-event')];
 revealItems.forEach((item,index)=>{item.classList.add('reveal-ready');item.style.transitionDelay=Math.min(index%4*.06,.18)+'s';});
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
 }),{threshold:.08,rootMargin:'0px 0px -5%'});
 revealItems.forEach(item=>observer.observe(item));
}

document.querySelectorAll('.project-archive-grid').forEach(grid=>{
 const drawer=document.createElement('details');
 drawer.className='archive-drawer';
 const summary=document.createElement('summary');
 summary.textContent=english?'View the complete project archive':'展開全部競賽作品';
 grid.before(drawer);drawer.append(summary,grid);
});

document.addEventListener('click',event=>{
 document.querySelectorAll('.nav-more[open]').forEach(menu=>{
  if(!menu.contains(event.target))menu.removeAttribute('open');
 });
});
