document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
  });

  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
    });
  });

  const form = document.getElementById('contactForm');
  const confirmBox = document.getElementById('confirmBox');
  const sendBtn = document.getElementById('sendBtn');
  const backBtn = document.getElementById('backBtn');

  const courseNames = {
    '': '未選択',
    'piano': 'ピアノ',
    'solfege': 'ソルフェージュ',
    'cello': 'チェロ',
    'contrabass': 'コントラバス',
    'other': 'その他'
  };

  function showConfirm() {
    document.getElementById('cfName').textContent = form.name.value.trim() || '—';
    document.getElementById('cfEmail').textContent = form.email.value.trim() || '—';
    document.getElementById('cfPhone').textContent = form.phone.value.trim() || '—';
    document.getElementById('cfCourse').textContent = courseNames[form.course.value] || '—';
    document.getElementById('cfTrial').textContent = form.trial.checked ? '希望する' : '希望しない';
    document.getElementById('cfMessage').textContent = form.message.value.trim() || '—';
    form.style.display = 'none';
    confirmBox.style.display = 'block';
    confirmBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function backToForm() {
    confirmBox.style.display = 'none';
    form.style.display = 'block';
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function sendForm() {
    sendBtn.textContent = '送信中...';
    sendBtn.disabled = true;

    const data = new FormData(form);
    const params = new URLSearchParams();
    data.forEach((value, key) => params.append(key, value));

    fetch('https://formspree.io/f/mdaqqgpp', {
      method: 'POST',
      body: params,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        confirmBox.innerHTML = '<div style="text-align:center;padding:40px 0;"><h3 style="color:#d4895a;margin-bottom:1rem;">お問い合わせありがとうございます</h3><p style="color:#6b5544;">内容を確認の上、折り返しご連絡いたします。</p></div>';
      } else {
        throw new Error('送信に失敗しました');
      }
    })
    .catch(() => {
      sendBtn.textContent = '送信する';
      sendBtn.disabled = false;
      alert('送信に失敗しました。お手数ですが、InstagramまたはX（Twitter）のDMからお問い合わせください。');
    });
  }

  if (form && confirmBox) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showConfirm();
    });
  }

  if (sendBtn) sendBtn.addEventListener('click', sendForm);
  if (backBtn) backBtn.addEventListener('click', backToForm);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
});
