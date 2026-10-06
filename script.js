let selectedBox = null;
let selectedItem = null;

let selectedX = -10;
let selectedY = -25;

let dragging = false;
let didDrag = false;
let lastX = 0;
let lastY = 0;

let busy = false;
let audioStarted = false;
let audioIndex = 0;

const $ = id => document.getElementById(id);

const join = (a, b) =>
  a.endsWith("/") ? a + b : a + "/" + b;


/* =========================
   FACE / MEDIA
========================= */

function normalizeFace(faceData) {
  if (typeof faceData === "string") {
    return {
      type: "image",
      src: faceData
    };
  }

  return faceData || {
    type: "image",
    src: ""
  };
}


function face(cls, url) {
  const e = document.createElement("div");

  e.className = "face " + cls;

  e.style.backgroundImage = `url("${url}")`;

  return e;
}


function mediaFace(cls, faceData, folder) {

  const data = normalizeFace(faceData);

  const src = join(folder, data.src || "");

  /* VIDEO */
  if ((data.type || "image").toLowerCase() === "video") {

    const wrap = document.createElement("div");

    wrap.className =
      "face " + cls + " video-face";

    const v = document.createElement("video");

    v.src = src;

    v.autoplay =
      data.autoplay !== false;

    v.loop =
      data.loop !== false;

    v.muted =
      data.muted !== false;

    v.playsInline = true;

    v.preload = "auto";

    wrap.appendChild(v);

    return wrap;
  }

  /* IMAGE */
  return face(cls, src);
}


/* =========================
   PARTICLES
========================= */

function addParticles() {

  if (!CONFIG.animation.particles) {
    return;
  }

  for (let i = 0; i < 32; i++) {

    const p = document.createElement("i");

    p.className = "particle";

    p.style.left =
      Math.random() * 100 + "%";

    p.style.animationDuration =
      5 + Math.random() * 8 + "s";

    p.style.animationDelay =
      -Math.random() * 8 + "s";

    $("particles").appendChild(p);
  }
}


/* =========================
   BUILD 3D CUBE
========================= */

function buildCube(container, boxData, kind) {

  container.innerHTML = "";

  const folder = boxData.folder;

  const cls =
    kind === "selected"
      ? "selected-face"
      : "opening-face";

  container.append(

    mediaFace(
      cls + " front",
      boxData.box.front,
      folder
    ),

    mediaFace(
      cls + " back",
      boxData.box.back,
      folder
    ),

    mediaFace(
      cls + " right",
      boxData.box.right,
      folder
    ),

    mediaFace(
      cls + " left",
      boxData.box.left,
      folder
    ),

    mediaFace(
      cls + " top",
      boxData.box.top,
      folder
    ),

    mediaFace(
      cls + " bottom",
      boxData.box.bottom,
      folder
    )
  );
}


/* =========================
   HOME BOX
========================= */

function createHomeBox(boxData, index) {

  const item =
    document.createElement("button");

  item.className = "home-box";

  item.setAttribute(
    "aria-label",
    "เลือกกล่อง"
  );

  const cube =
    document.createElement("div");

  cube.className = "home-cube";

  buildCube(
    cube,
    boxData,
    "home"
  );

  item.appendChild(cube);


  item.addEventListener("click", e => {

    e.preventDefault();

    selectBox(
      boxData,
      item
    );

  });


  return item;
}


/* =========================
   HOME
========================= */

function renderHome() {

  const grid = $("boxes");

  grid.innerHTML = "";

  CONFIG.boxes.forEach(
    (box, index) => {

      grid.appendChild(
        createHomeBox(
          box,
          index
        )
      );

    }
  );
}


/* =========================
   SELECT BOX
========================= */

function selectBox(boxData, item) {

  if (busy) {
    return;
  }

  selectedBox = boxData;

  selectedItem = item;

  selectedX = -10;

  selectedY = -25;


  buildCube(
    $("selectedCube"),
    boxData,
    "selected"
  );


  renderSelected();


  $("viewer")
    .classList
    .remove("hidden");


  requestAnimationFrame(() => {

    $("viewer")
      .classList
      .add("show");

  });
}


/* =========================
   ROTATE
========================= */

function renderSelected() {

  $("selectedCube").style.transform =
    `rotateX(${selectedX}deg) rotateY(${selectedY}deg)`;
}


function rotate(dx, dy) {

  selectedY += dx * 0.55;

  selectedX -= dy * 0.55;


  selectedX =
    Math.max(
      -75,
      Math.min(75, selectedX)
    );


  renderSelected();
}


/* =========================
   CLOSE VIEWER
========================= */

function closeViewer() {

  if (busy) {
    return;
  }

  $("viewer")
    .classList
    .remove("show");


  setTimeout(() => {

    $("viewer")
      .classList
      .add("hidden");

  }, 220);


  selectedBox = null;

  selectedItem = null;
}


/* =========================
   3D MOUSE / TOUCH
========================= */

const scene =
  $("selectedScene");


scene.addEventListener(
  "pointerdown",
  e => {

    if (!selectedBox || busy) {
      return;
    }

    dragging = true;

    didDrag = false;

    lastX = e.clientX;

    lastY = e.clientY;


    scene.setPointerCapture(
      e.pointerId
    );

  }
);


scene.addEventListener(
  "pointermove",
  e => {

    if (!dragging || busy) {
      return;
    }


    const dx =
      e.clientX - lastX;

    const dy =
      e.clientY - lastY;


    if (
      Math.abs(dx) +
      Math.abs(dy) > 5
    ) {

      didDrag = true;

    }


    rotate(dx, dy);


    lastX = e.clientX;

    lastY = e.clientY;

  }
);


/*
   IMPORTANT

   ปล่อยนิ้ว/เมาส์แล้ว:
   - ถ้าไม่ได้ลาก = เปิดกล่อง
   - ถ้าลาก = หมุนอย่างเดียว
*/

scene.addEventListener(
  "pointerup",
  e => {

    dragging = false;


    if (
      !didDrag &&
      selectedBox &&
      !busy
    ) {

      openGift();

    }


    didDrag = false;


    try {

      scene.releasePointerCapture(
        e.pointerId
      );

    } catch (err) {}

  }
);


scene.addEventListener(
  "pointercancel",
  () => {

    dragging = false;

    didDrag = false;

  }
);


/* =========================
   OPEN GIFT
========================= */

function openGift() {

  if (!selectedBox || busy) {
    return;
  }

  busy = true;

  const box = selectedBox;


  $("viewer")
    .classList
    .remove("show");


  setTimeout(() => {

    $("viewer")
      .classList
      .add("hidden");

  }, 180);


  buildCube(
    $("openingCube"),
    box,
    "opening"
  );


  $("opening")
    .classList
    .remove("hidden");


  sound(
    CONFIG.sounds.open
  );


  setTimeout(() => {

    $("opening")
      .classList
      .add("hidden");


    showReward(
      box.reward
    );


    busy = false;

  }, CONFIG.animation.openingDuration || 1800);
}


/* =========================
   REWARD
========================= */

function showReward(reward) {

  $("rewardImage")
    .style
    .backgroundImage =
    `url("${reward.image}")`;


  $("rewardTitle")
    .textContent =
    reward.title || "";


  $("rewardMessage")
    .textContent =
    reward.message || "";


  $("rewardLayer")
    .classList
    .remove("hidden");


  sound(
    CONFIG.sounds.card
  );
}


/* =========================
   CLOSE REWARD
========================= */

$("closeReward")
  .addEventListener(
    "click",
    () => {

      $("rewardLayer")
        .classList
        .add("hidden");

    }
  );


/* =========================
   SOUND EFFECT
========================= */

function sound(src) {

  if (!audioStarted || !src) {
    return;
  }

  const a =
    new Audio(src);

  a.volume = 0.7;

  a.play().catch(() => {});

}


/* =========================
   BACKGROUND MUSIC
========================= */

function startMusic() {

  const list =
    CONFIG.music.playlist || [];


  if (!list.length) {
    return;
  }


  audioStarted = true;

  audioIndex = 0;


  const audio =
    $("bgm");


  audio.volume =
    CONFIG.music.volume;


  audio.src =
    list[0];


  audio.onended = () => {

    audioIndex =
      (audioIndex + 1) %
      list.length;


    audio.src =
      list[audioIndex];


    audio.play().catch(() => {});

  };


  audio.play().catch(() => {});
}


/* =========================
   START
========================= */

$("startBtn")
  .addEventListener(
    "click",
    () => {

      $("start")
        .classList
        .add("hidden");


      startMusic();

    }
  );


/* =========================
   SOUND BUTTON
========================= */

$("sound")
  .addEventListener(
    "click",
    () => {

      const audio =
        $("bgm");


      if (audio.paused) {

        audio
          .play()
          .catch(() => {});


        $("sound")
          .textContent = "🔊";

      } else {

        audio.pause();

        $("sound")
          .textContent = "🔇";

      }

    }
  );


/* =========================
   VIEWER CLOSE
========================= */

$("viewerClose")
  .addEventListener(
    "click",
    closeViewer
  );


/* =========================
   PAGE TEXT
========================= */

$("title")
  .textContent =
  CONFIG.page.title;


$("subtitle")
  .textContent =
  CONFIG.page.subtitle;


$("hint")
  .textContent =
  CONFIG.page.hint;


$("startTitle")
  .textContent =
  CONFIG.page.startTitle;


$("startMessage")
  .textContent =
  CONFIG.page.startMessage;


/* =========================
   BACKGROUND
========================= */

const bgEl =
  document.querySelector(".bg");


bgEl.style.backgroundImage =
  `url("${CONFIG.page.background}")`;


const overlayOpacity =
  Number(
    CONFIG.page.backgroundOverlayOpacity ?? 0
  );


document.querySelector(
  ".overlay"
).style.background =
  `rgba(
    0,
    0,
    0,
    ${Math.max(
      0,
      Math.min(
        1,
        overlayOpacity
      )
    )}
  )`;


if (
  CONFIG.animation.backgroundZoom
) {

  document
    .querySelector(".bg")
    .classList
    .add("zoom");

}


/* =========================
   START PAGE
========================= */

addParticles();

renderHome();