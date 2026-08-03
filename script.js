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
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      const originalText = btn.textContent;
      btn.textContent = '送信中...';
      btn.disabled = true;

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
          form.innerHTML = '<div style="text-align:center;padding:40px 0;"><h3 style="color:#d4895a;margin-bottom:1rem;">お問い合わせありがとうございます</h3><p style="color:#6b5544;">内容を確認の上、折り返しご連絡いたします。</p></div>';
        } else {
          throw new Error('送信に失敗しました');
        }
      })
      .catch(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        alert('送信に失敗しました。お手数ですが、InstagramまたはX（Twitter）のDMからお問い合わせください。');
      });
    });
  }

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
