const english=document.documentElement.lang==='en';
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
