3D RANDOM GIFT BOX TEMPLATE V3
================================

รูปแบบใหม่:
1. หน้าแรกไม่มีชื่อกล่อง
2. กล่องจัดเรียงอัตโนมัติให้อยู่ตรงกลาง
3. จำนวนกล่องมากขึ้นจะขึ้นแถวใหม่อย่างเป็นระเบียบ
4. รองรับ Desktop / iPad / มือถือ
5. คลิกกล่องครั้งแรก = เข้าโหมดดู/หมุนกล่อง
6. ลากเมาส์หรือนิ้ว = หมุนดูได้ทุกด้าน 360°
7. คลิกกล่องอีกครั้ง หรือกด OPEN GIFT = เปิดของขวัญ
8. ไม่มีระบบสุ่ม
9. กล่องแต่ละใบผูกกับ Reward ที่กำหนดไว้ใน config.js
10. การ์ดมีรูป + หัวข้อ + ข้อความ และไม่มีปุ่ม Open Again

เพิ่มกล่อง:
สร้าง:
assets/boxes/box03/
  front.jpg
  back.jpg
  left.jpg
  right.jpg
  top.jpg
  bottom.jpg

แล้วเพิ่ม object ใน CONFIG.boxes:
{
 id:"box03",
 folder:"assets/boxes/box03/",
 box:{
  front:"front.jpg",
  back:"back.jpg",
  left:"left.jpg",
  right:"right.jpg",
  top:"top.jpg",
  bottom:"bottom.jpg"
 },
 reward:{
  image:"assets/cards/card03.jpg",
  title:"หัวข้อการ์ด",
  message:"ข้อความบนการ์ด"
 }
}

เพลง:
ใส่เพลงกี่เพลงก็ได้ใน assets/music แล้วเพิ่มชื่อไฟล์ใน playlist
- 1 เพลง = วนซ้ำ
- หลายเพลง = เล่นต่อกันตามลำดับ แล้ววนกลับเพลงแรก
- เริ่มเพลงเมื่อกด START

หมายเหตุ:
โหมดดูตัวอย่างตั้งใจให้คลิกครั้งแรกเลือกกล่องและเปิด Viewer
จากนั้นลากดูได้ทุกด้าน และคลิกที่ตัวกล่องอีกครั้งหรือปุ่ม OPEN GIFT เพื่อเปิด Reward

เปิด index.html ด้วย Chrome/Edge เพื่อทดลอง
