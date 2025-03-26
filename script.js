// 1. 初始化地图
const map = L.map('map').setView([39.8283, -98.5795], 3); // 默认居中美国

// 使用OpenStreetMap底图
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// 2. 标记两地
const yourCity = L.marker([23.1571, 113.2734]).addTo(map) // 广州白云区
    .bindPopup("<b>广州</b><br>我在这里等你").openPopup();

const hisCity = L.marker([40.9696, -75.9273]).addTo(map) // 宾夕法尼亚
    .bindPopup("<b>Pennsylvania</b><br>你的城市");

// 3. 画一条连接线
const line = L.polyline(
    [[23.1571, 113.2734], [40.9696, -75.9273]],
    {color: 'red', dashArray: '10, 10'}
).addTo(map);

// 4. 自动缩放地图以显示所有标记
map.fitBounds([
    [23.1571, 113.2734],
    [40.9696, -75.9273]
]);

// 5. 倒计时功能
const countdownDate = new Date("2025-03-28").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
}

setInterval(updateCountdown, 1000);

// 6. 情话和爱心特效
const messages = [
    "From Guangzhou to Pennsylvania, love has no distance",
    "Every night, I count the stars until we meet",
    "下次见面，我要把100天的思念都给你"
];

document.addEventListener("mousemove", function(e) {
    // 创建漂浮爱心
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";
    heart.style.left = e.pageX + "px";
    heart.style.top = e.pageY + "px";
    document.body.appendChild(heart);
    
    // 3秒后移除爱心
    setTimeout(() => {
        heart.remove();
    }, 3000);
    
    // 随机显示情话
    if (Math.random() > 0.95) {
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        document.getElementById("love-message").textContent = randomMsg;
    }
});
// 添加到 script.js 末尾
document.addEventListener('keydown', (e) => {
  const secretCode = '20250328';
  let input = '';
  
  input += e.key;
  if (input === secretCode) {
    // 创建烟花效果
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = Math.random() * 100 + 'vw';
        firework.style.top = Math.random() * 100 + 'vh';
        firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.body.appendChild(firework);
        
        setTimeout(() => firework.remove(), 1000);
      }, i * 30);
    }
  }
});

/* 添加到 style.css */
.firework {
  position: fixed;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  pointer-events: none;
  animation: explode 1s ease-out;
}

@keyframes explode {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(20); opacity: 0; }
}
// 添加到 script.js
let clickCount = 0;
document.addEventListener('click', (e) => {
  if (e.clientX < 50 && e.clientY < 50) { // 左上角点击
    clickCount++;
    if (clickCount === 5) {
      const letter = document.createElement('div');
      letter.className = 'love-letter';
      letter.innerHTML = `
        <h3>To My Love in Pennsylvania:</h3>
        <p>${messages.join('<br>')}</p >
        <button onclick="this.parentElement.remove()">❤️ Close</button>
      `;
      document.body.appendChild(letter);
      clickCount = 0;
    }
  }
});

/* 添加到 style.css */
.love-letter {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
  z-index: 1000;
  max-width: 80%;
}
