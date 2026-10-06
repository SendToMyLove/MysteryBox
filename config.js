/*
=========================================================
3D GIFT BOX TEMPLATE V4
รูป + วิดีโอในแต่ละด้านของกล่องได้
แก้รูป/วิดีโอ/เพลง/ข้อความได้จากไฟล์นี้และ assets/
=========================================================
*/

const CONFIG = {
  page: {
    title: "",
    subtitle: "",
    hint: "",
    startTitle: "Are you readay?",
    startMessage: "",
    background: "assets/background/background.jpg",
    // 0 = ไม่ทำให้พื้นหลังมืดลง, แนะนำ 0.03–0.10 ถ้าต้องการให้อ่านข้อความง่ายขึ้น
    backgroundOverlayOpacity: 0
  },

  music: {
    playlist: [
      "assets/music/song01.mp3",
      "assets/music/song02.mp3",
      "assets/music/song03.mp3"
    ],
    volume: 0.45
  },

  sounds: {
    open: "assets/effects/box-open.mp3",
    card: "assets/effects/card-reveal.mp3"
  },

  animation: {
    particles: true,
    backgroundZoom: true,
    openingDuration: 1800
  },

  /*
  แต่ละด้านรองรับ image หรือ video
  ตัวอย่าง image:
    front: { type: "image", src: "front.jpg" }

  ตัวอย่าง video:
    right: { type: "video", src: "right.mp4", loop: true, muted: true, autoplay: true }

  เพื่อความง่าย ระบบยังรองรับรูปแบบเดิม เช่น front: "front.jpg"
  */
  boxes: [
    {
      id: "box01",
      folder: "assets/boxes/box01/",
      box: {
        front: { type: "image", src: "front.jpg" },
        back: { type: "image", src: "back.jpg" },
        left: { type: "image", src: "left.jpg" },
        right: { type: "video", src: "right.mp4",loop:true,muted:true,autoplay:true },
        top: { type: "image", src: "top.jpg" },
        bottom: { type: "image", src: "bottom.jpg" }
      },
      reward: {
        image: "assets/cards/card01.jpg",
        title: "💕IPHONE18 PROMAX",
        message: "For My Love"
      }
    },

    {
      id: "box02",
      folder: "assets/boxes/box02/",
      box: {
        front: { type: "image", src: "front.jpg" },
        back: { type: "image", src: "back.jpg" },
        left: { type: "image", src: "left.jpg" },
        right: { type: "image", src: "right.jpg" },
        top: { type: "image", src: "top.jpg" },
        bottom: { type: "image", src: "bottom.jpg" }
      },
      reward: {
        image: "assets/cards/card02.jpg",
        title: "💕 My Special Gift",
        message: "💙🌹 รักที่มีแค่เธอคนเดียว"
      }
    },
    {
       id: "box02",
      folder: "assets/boxes/box02/",
      box: {
        front: { type: "image", src: "front.jpg" },
        back: { type: "image", src: "back.jpg" },
        left: { type: "image", src: "left.jpg" },
        right: { type: "image", src: "right.jpg" },
        top: { type: "image", src: "top.jpg" },
        bottom: { type: "image", src: "bottom.jpg" }
      },
      reward: {
        image: "assets/cards/card01.jpg",
        title: "💕 My Special Gift",
        message: "ของขวัญชิ้นนี้ตั้งใจเตรียมไว้ให้เธอโดยเฉพาะนะ"
      }
    },
    {
       id: "box02",
      folder: "assets/boxes/box02/",
      box: {
        front: { type: "image", src: "front.jpg" },
        back: { type: "image", src: "back.jpg" },
        left: { type: "image", src: "left.jpg" },
        right: { type: "image", src: "right.jpg" },
        top: { type: "image", src: "top.jpg" },
        bottom: { type: "image", src: "bottom.jpg" }
      },
      reward: {
        image: "assets/cards/card01.jpg",
        title: "💕 My Special Gift",
        message: "ของขวัญชิ้นนี้ตั้งใจเตรียมไว้ให้เธอโดยเฉพาะนะ"
      }
    }
  ]
};
