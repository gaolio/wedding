// 页面加载完成后执行
document.addEventListener("DOMContentLoaded", function () {
  // 显示加载动画
  showLoading();

  // 模拟加载时间
  setTimeout(hideLoading, 2000);

  // 初始化各种功能
  initScrollEffects();
  initSnowEffect();
  initParallax();
  initTypingEffect();
});

// 加载动画
function showLoading() {
  const loading = document.createElement("div");
  loading.className = "loading";
  loading.innerHTML = '<div class="loading-spinner"></div>';
  document.body.appendChild(loading);
}

function hideLoading() {
  const loading = document.querySelector(".loading");
  if (loading) {
    loading.classList.add("hide");
    setTimeout(() => loading.remove(), 500);
  }
}

// 滚动效果
function initScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // 观察所有需要动画的元素
  const animateElements = document.querySelectorAll(
    ".section, .info-card, .timeline-item"
  );
  animateElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
}

// 雪花效果
function initSnowEffect() {
  const snowCount = 50;

  for (let i = 0; i < snowCount; i++) {
    createSnowflake();
  }
}

function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.className = "snowflake";
  snowflake.innerHTML = "❄";
  snowflake.style.left = Math.random() * 100 + "%";
  snowflake.style.animationDelay = Math.random() * 10 + "s";
  snowflake.style.fontSize = Math.random() * 10 + 10 + "px";
  snowflake.style.opacity = Math.random() * 0.6 + 0.4;

  document.body.appendChild(snowflake);

  // 雪花落下后重新创建
  setTimeout(() => {
    snowflake.remove();
    createSnowflake();
  }, 10000);
}

// 视差效果
function initParallax() {
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector(".cover-decoration");
    if (parallax) {
      const speed = scrolled * 0.5;
      parallax.style.transform = `translate(-50%, -50%) rotate(${
        speed * 0.1
      }deg)`;
    }

    // 背景视差
    const coverSection = document.querySelector(".cover-section");
    if (coverSection) {
      coverSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
}

// 打字机效果
function initTypingEffect() {
  const texts = [
    "我们的爱情故事即将开始新的篇章",
    "期待与您共同见证这美好时刻",
  ];
  let textIndex = 0;
  let charIndex = 0;
  const typingElement = document.querySelector(".typing-text");

  if (!typingElement) return;

  function typeText() {
    if (charIndex < texts[textIndex].length) {
      typingElement.textContent += texts[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeText, 100);
    } else {
      setTimeout(() => {
        typingElement.textContent = "";
        charIndex = 0;
        textIndex = (textIndex + 1) % texts.length;
        typeText();
      }, 2000);
    }
  }

  typeText();
}

// 音乐控制增强
let isPlaying = false;
let audio = null;

function toggleMusic() {
  const musicIcon = document.getElementById("musicIcon");
  const musicControl = document.querySelector(".music-control");

  if (!audio) {
    // 创建音频上下文用于生成简单的背景音
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    // 这里可以替换成实际的音乐文件URL
    // audio = new Audio('path/to/your/wedding-music.mp3');

    // 模拟音乐播放
    audio = {
      play: () => {
        console.log("音乐开始播放");
        return Promise.resolve();
      },
      pause: () => {
        console.log("音乐暂停");
      },
    };
  }

  if (!isPlaying) {
    audio
      .play()
      .then(() => {
        musicIcon.textContent = "🎵";
        musicControl.classList.add("playing");
        isPlaying = true;
      })
      .catch((error) => {
        console.log("音乐播放失败:", error);
      });
  } else {
    audio.pause();
    musicIcon.textContent = "🔇";
    musicControl.classList.remove("playing");
    isPlaying = false;
  }
}

// 表单提交增强
function submitForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  // 显示提交动画
  const submitBtn = event.target.querySelector(".btn-submit");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "提交中...";
  submitBtn.disabled = true;

  // 模拟提交过程
  setTimeout(() => {
    // 这里可以添加实际的API调用
    showSuccessMessage(data);

    // 恢复按钮状态
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    // 重置表单
    event.target.reset();
  }, 1500);
}

function showSuccessMessage(data) {
  const message = document.createElement("div");
  message.className = "success-message";
  message.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✅</div>
            <h3>确认成功！</h3>
            <p>感谢 ${data.name} 的确认！</p>
            <p>我们已收到您的参与确认，期待与您相聚！</p>
            <button onclick="this.parentElement.parentElement.remove()">确定</button>
        </div>
    `;

  message.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

  const style = document.createElement("style");
  style.textContent = `
        .success-content {
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 300px;
            animation: slideUp 0.3s ease;
        }
        .success-icon {
            font-size: 48px;
            margin-bottom: 20px;
        }
        .success-content h3 {
            color: #333;
            margin-bottom: 15px;
        }
        .success-content p {
            color: #666;
            margin-bottom: 10px;
            line-height: 1.5;
        }
        .success-content button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            cursor: pointer;
            margin-top: 20px;
            font-size: 16px;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;

  document.head.appendChild(style);
  document.body.appendChild(message);
}

// 分享功能
function shareInvitation() {
  if (navigator.share) {
    navigator
      .share({
        title: "婚礼邀请函",
        text: "诚挚邀请您参加我们的婚礼",
        url: window.location.href,
      })
      .catch(console.error);
  } else {
    // 复制链接到剪贴板
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("链接已复制到剪贴板");
      })
      .catch(() => {
        alert("请手动复制链接分享");
      });
  }
}

// 添加分享按钮
function addShareButton() {
  const shareBtn = document.createElement("div");
  shareBtn.className = "share-button";
  shareBtn.innerHTML = "📤";
  shareBtn.onclick = shareInvitation;
  shareBtn.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: rgba(255,255,255,0.9);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 1000;
        font-size: 20px;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    `;

  shareBtn.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
  });

  shareBtn.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });

  document.body.appendChild(shareBtn);
}

// 平滑滚动到指定区域
function scrollToSection(sectionClass) {
  const section = document.querySelector(sectionClass);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// 添加点击事件
document.addEventListener("click", function (e) {
  // 封面点击滚动
  if (e.target.closest(".cover-section")) {
    scrollToSection(".couple-intro");
  }

  // 滚动提示点击
  if (e.target.closest(".scroll-hint")) {
    scrollToSection(".couple-intro");
  }
});

// 页面完全加载后添加分享按钮
window.addEventListener("load", function () {
  addShareButton();
});

// 防止页面刷新时的闪烁
document.documentElement.style.visibility = "hidden";
window.addEventListener("load", function () {
  document.documentElement.style.visibility = "visible";
});
