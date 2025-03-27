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


// 添加到 script.js
function startQuiz() {
  const questions = [
    { q: "when was us first video call？", a: "2024-12-24" },
    { q: "what is my favorite color？", a: "blue" }
  ];
  
  let score = 0;
  questions.forEach((item, i) => {
    const answer = prompt(`Question ${i+1}: ${item.q}`);
    if (answer?.toLowerCase() === item.a.toLowerCase()) {
      score++;
      alert("Correct！");
    } else {
      alert(`Answer is: ${item.a}`);
    }
  });
  
  alert(`The result of the compatibility test is: ${score}/${questions.length}\n${ 
    score === questions.length ? "We are born to be together！" : "Need to know me better my love, love u anyway tho~"
  }`);
}

// 提示彩蛋存在（添加到页面某个角落）
console.log("%c💡 enter startQuiz() Test our compatibility！", 
  "color: #ff6b8b; font-size: 16px;");
// 修改 script.js 中的地图标记代码
hisCity.on('click', () => {
  const answer = prompt("enter my birthday（MMDD）unlock secret:");
  if (answer === "1120") { // 替换为真实日期
    hisCity.setPopupContent("<b>Surprise！</b><br>When the time we met, I'll give u a lot kisses, and we'll have a road trip, yay!❤️").openPopup();
  }
});
/* === 手机触控适配（不影响原有代码）=== */
// 双指缩放触发烟花
let scaleCount = 0;
document.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) { // 双指操作
    scaleCount++;
    if (scaleCount === 3) {
      // 直接调用原有烟花函数
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
      scaleCount = 0;
    }
  }
}, { passive: false });

// 长按触发情书（兼容原有点击计数）
let pressTimer;
document.addEventListener('touchstart', (e) => {
  if (e.touches[0].clientX < 100 && e.touches[0].clientY < 100) {
    pressTimer = setTimeout(() => {
      const letter = document.createElement('div');
      letter.className = 'love-letter';
      letter.innerHTML = `
        <h3>To My Love in Pennsylvania:</h3>
        <p>${messages.join('<br>')}</p >
        <button onclick="this.parentElement.remove()">❤️ Close</button>
      `;
      document.body.appendChild(letter);
    }, 1500);
  }
});
document.addEventListener('touchend', () => clearTimeout(pressTimer));

// 摇一摇触发测试（保留控制台触发）
if ('DeviceMotionEvent' in window) {
  let lastShake = 0;
  window.addEventListener('devicemotion', (e) => {
    const accel = e.accelerationIncludingGravity;
    if (Math.abs(accel.x) > 15 || Math.abs(accel.y) > 15) {
      if (Date.now() - lastShake > 3000) {
        startQuiz(); // 直接调用原有测试函数
        lastShake = Date.now();
      }
    }
  });
}
