let selectedBox=null;
let selectedItem=null;
let selectedX=-10, selectedY=-25;
let dragging=false,didDrag=false,lastX=0,lastY=0;
let busy=false,audioStarted=false,audioIndex=0;

const $=id=>document.getElementById(id);
const join=(a,b)=>a.endsWith("/")?a+b:a+"/"+b;

function normalizeFace(faceData){
  if(typeof faceData === "string") return {type:"image",src:faceData};
  return faceData || {type:"image",src:""};
}

function face(cls,url){
  const e=document.createElement("div");
  e.className="face "+cls;
  e.style.backgroundImage=`url("${url}")`;
  return e;
}

function mediaFace(cls,faceData,folder){
  const data=normalizeFace(faceData);
  const src=join(folder,data.src||"");
  if((data.type||"image").toLowerCase()==="video"){
    const wrap=document.createElement("div");
    wrap.className="face "+cls+" video-face";
    const v=document.createElement("video");
    v.src=src;
    v.autoplay=data.autoplay!==false;
    v.loop=data.loop!==false;
    v.muted=data.muted!==false;
    v.playsInline=true;
    v.preload="auto";
    wrap.appendChild(v);
    return wrap;
  }
  return face(cls,src);
}

function addParticles(){
  if(!CONFIG.animation.particles)return;
  for(let i=0;i<32;i++){
    const p=document.createElement("i");
    p.className="particle";
    p.style.left=Math.random()*100+"%";
    p.style.animationDuration=(5+Math.random()*8)+"s";
    p.style.animationDelay=(-Math.random()*8)+"s";
    $("particles").appendChild(p);
  }
}

function buildCube(container,boxData,kind){
  container.innerHTML="";
  const f=boxData.folder;
  const cls=kind==="selected" ? "selected-face" : "opening-face";
  container.append(
    mediaFace(cls+" front",boxData.box.front,f),
    mediaFace(cls+" back",boxData.box.back,f),
    mediaFace(cls+" right",boxData.box.right,f),
    mediaFace(cls+" left",boxData.box.left,f),
    mediaFace(cls+" top",boxData.box.top,f),
    mediaFace(cls+" bottom",boxData.box.bottom,f)
  );
}

function createHomeBox(boxData,index){
  const item=document.createElement("button");
  item.className="home-box";
  item.setAttribute("aria-label","เลือกกล่อง");
  const cube=document.createElement("div");
  cube.className="home-cube";
  buildCube(cube,boxData,"home");
  item.appendChild(cube);
  item.addEventListener("click",e=>{
    e.preventDefault();
    selectBox(boxData,item);
  });
  return item;
}

function renderHome(){
  const grid=$("boxes");
  grid.innerHTML="";
  CONFIG.boxes.forEach((b,i)=>grid.appendChild(createHomeBox(b,i)));
}

function selectBox(boxData,item){
  if(busy)return;
  selectedBox=boxData;
  selectedItem=item;
  selectedX=-10;
  selectedY=-25;

  buildCube($("selectedCube"),boxData,"selected");
  renderSelected();

  $("viewer").classList.remove("hidden");
  requestAnimationFrame(()=>$("viewer").classList.add("show"));
}

function renderSelected(){
  $("selectedCube").style.transform=
    `rotateX(${selectedX}deg) rotateY(${selectedY}deg)`;
}

function closeViewer(){
  if(busy)return;
  $("viewer").classList.remove("show");
  setTimeout(()=>$("viewer").classList.add("hidden"),220);
  selectedBox=null;
  selectedItem=null;
}

function rotate(dx,dy){
  selectedY+=dx*0.55;
  selectedX-=dy*0.55;
  selectedX=Math.max(-75,Math.min(75,selectedX));
  renderSelected();
}

/* Mouse + touch/pointer: drag to inspect every side */
const scene=$("selectedScene");
scene.addEventListener("pointerdown",e=>{
  if(!selectedBox||busy)return;
  dragging=true;didDrag=false;lastX=e.clientX;lastY=e.clientY;
  scene.setPointerCapture(e.pointerId);
});
scene.addEventListener("pointermove",e=>{
  if(!dragging||busy)return;
  if(Math.abs(e.clientX-lastX)+Math.abs(e.clientY-lastY)>3) didDrag=true;
  rotate(e.clientX-lastX,e.clientY-lastY);
  lastX=e.clientX;lastY=e.clientY;
});
scene.addEventListener("pointerup",()=>dragging=false);
scene.addEventListener("pointercancel",()=>dragging=false);

$("selectedCube").addEventListener("click",e=>{
  /* A simple click while not dragging opens the gift.
     Dragging is used only for inspection. */
  if(!dragging && !didDrag && selectedBox) openGift();
  didDrag=false;
});

$("openSelected").addEventListener("click",openGift);
$("viewerClose").addEventListener("click",closeViewer);

function openGift(){
  if(!selectedBox||busy)return;
  busy=true;
  const box=selectedBox;

  $("viewer").classList.remove("show");
  setTimeout(()=>$("viewer").classList.add("hidden"),180);

  buildCube($("openingCube"),box,"opening");
  $("opening").classList.remove("hidden");
  sound(CONFIG.sounds.open);

  setTimeout(()=>{
    $("opening").classList.add("hidden");
    showReward(box.reward);
    busy=false;
  },CONFIG.animation.openingDuration||1800);
}

function showReward(reward){
  $("rewardImage").style.backgroundImage=`url("${reward.image}")`;
  $("rewardTitle").textContent=reward.title||"";
  $("rewardMessage").textContent=reward.message||"";
  $("rewardLayer").classList.remove("hidden");
  sound(CONFIG.sounds.card);
}

$("closeReward").addEventListener("click",()=>{
  $("rewardLayer").classList.add("hidden");
});

function sound(src){
  if(!audioStarted||!src)return;
  const a=new Audio(src);
  a.volume=.7;
  a.play().catch(()=>{});
}

function startMusic(){
  const list=CONFIG.music.playlist||[];
  if(!list.length)return;
  audioStarted=true;
  audioIndex=0;
  const audio=$("bgm");
  audio.volume=CONFIG.music.volume;
  audio.src=list[0];
  audio.onended=()=>{
    audioIndex=(audioIndex+1)%list.length;
    audio.src=list[audioIndex];
    audio.play().catch(()=>{});
  };
  audio.play().catch(()=>{});
}

$("startBtn").addEventListener("click",()=>{
  $("start").classList.add("hidden");
  startMusic();
});

$("sound").addEventListener("click",()=>{
  const audio=$("bgm");
  if(audio.paused){
    audio.play().catch(()=>{});
    $("sound").textContent="🔊";
  }else{
    audio.pause();
    $("sound").textContent="🔇";
  }
});

$("title").textContent=CONFIG.page.title;
$("subtitle").textContent=CONFIG.page.subtitle;
$("hint").textContent=CONFIG.page.hint;
$("startTitle").textContent=CONFIG.page.startTitle;
$("startMessage").textContent=CONFIG.page.startMessage;
const bgEl=document.querySelector(".bg");
bgEl.style.backgroundImage=`url("${CONFIG.page.background}")`;
const overlayOpacity=Number(CONFIG.page.backgroundOverlayOpacity ?? 0);
document.querySelector(".overlay").style.background=`rgba(0,0,0,${Math.max(0,Math.min(1,overlayOpacity))})`;
if(CONFIG.animation.backgroundZoom)document.querySelector(".bg").classList.add("zoom");

addParticles();
renderHome();