const english=document.documentElement.lang==='en';
const primaryNav=document.querySelector('.nav');
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
