/*
=========================================================
3D GIFT BOX TEMPLATE V3
แก้รูป/เพลง/ข้อความได้จากไฟล์นี้และ assets/
=========================================================
*/

const CONFIG = {
  page: {
    title: "A Little Surprise",
    subtitle: "เลือกกล่อง แล้วหมุนดูรอบ ๆ ก่อนเปิดของขวัญ",
    hint: "คลิกกล่องเพื่อเลือก • ลากเพื่อหมุน • คลิกกล่องซ้ำเพื่อเปิด",
    startTitle: "A Special Surprise",
    startMessage: "พร้อมเปิดกล่องของขวัญหรือยัง?",
    background: "assets/background/background.jpg"
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
  เพิ่มกล่องได้เรื่อย ๆ
  ไม่ต้องใส่ชื่อกล่อง
  id ใช้แยกกล่องภายในระบบเท่านั้น
  */
  boxes: [
    {
      id: "box01",
      folder: "assets/boxes/box01/",
      box: {
        front: "front.jpg",
        back: "back.jpg",
        left: "left.jpg",
        right: "right.jpg",
        top: "top.jpg",
        bottom: "bottom.jpg"
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
        front: "front.jpg",
        back: "back.jpg",
        left: "left.jpg",
        right: "right.jpg",
        top: "top.jpg",
        bottom: "bottom.jpg"
      },
      reward: {
        image: "assets/cards/card02.jpg",
        title: "🎂 Happy Birthday!",
        message: "ขอให้วันนี้เต็มไปด้วยรอยยิ้มและความสุข"
      }
    },
    {
      id: "box01",
      folder: "assets/boxes/box01/",
      box: {
        front: "front.jpg",
        back: "back.jpg",
        left: "left.jpg",
        right: "right.jpg",
        top: "top.jpg",
        bottom: "bottom.jpg"
      },
      reward: {
        image: "assets/cards/card01.jpg",
        title: "💕 My Special Gift",
        message: "ของขวัญชิ้นนี้ตั้งใจเตรียมไว้ให้เธอโดยเฉพาะนะ"
      }
    },
    {
      id: "box01",
      folder: "assets/boxes/box01/",
      box: {
        front: "front.jpg",
        back: "back.jpg",
        left: "left.jpg",
        right: "right.jpg",
        top: "top.jpg",
        bottom: "bottom.jpg"
      },
      reward: {
        image: "assets/cards/card01.jpg",
        title: "💕 My Special Gift",
        message: "ของขวัญชิ้นนี้ตั้งใจเตรียมไว้ให้เธอโดยเฉพาะนะ"
      }
    }
  ]
};