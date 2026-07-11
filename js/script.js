/* ===== Theme Toggle ===== */
(function() {
    const toggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const saved = localStorage.getItem('theme');
    if (saved) { html.setAttribute('data-theme', saved); }
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) { html.setAttribute('data-theme', 'dark'); }
    toggle.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
})();

/* ===== Welcome Modal ===== */
(function() {
    const mask = document.getElementById('welcomeModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    const shown = sessionStorage.getItem('welcomeShown');
    if (shown) return;
    function open() {
        mask.style.display = 'flex';
        requestAnimationFrame(() => { mask.classList.add('active'); });
        document.body.style.overflow = 'hidden';
    }
    function close() {
        mask.classList.remove('active');
        setTimeout(() => { mask.style.display = 'none'; document.body.style.overflow = ''; }, 350);
    }
    window.addEventListener('load', () => { setTimeout(open, 400); });
    closeBtn.addEventListener('click', close);
    mask.addEventListener('click', (e) => { if (e.target === mask) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && mask.style.display === 'flex') close(); });
    sessionStorage.setItem('welcomeShown', '1');
})();

/* ===== Smooth Scroll & Active Nav ===== */
(function() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
        });
        navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });
    });
})();
/* ===== i18n ===== */
const i18n = {
    zh: {
        'modal.title': '欢迎来到贺林枫的网站！', 'modal.body': '欢迎光临', 'modal.close': '关闭',
        'nav.logo': '贺林枫的网站', 'nav.home': '首页', 'nav.about': '关于我', 'nav.works': '我的作品', 'nav.contact': '联系方式',
        'hero.greeting': '你好，我是', 'hero.subtitle': '欢迎来到我的个人网站', 'hero.cta': '了解更多', 'hero.works': '查看作品', 'hero.scroll': '向下滚动',
        'about.title': '关于我', 'about.subtitle': '一个热爱技术与创造的普通人',
        'about.p1': '你好，我是贺林枫。一个喜欢折腾各种技术、热爱创造的开发者。',
        'about.p2': '我相信技术应该让生活更简单、更有趣。无论是制作实用工具，还是探索新的可能性，我都享受从零到一的过程。',
        'works.title': '我的作品', 'works.subtitle': '一些我制作的小工具', 'works.search': '搜索我的作品...', 'works.empty': '没有找到匹配的作品',
        'works.card1.title': '二维码生成器', 'works.card1.desc': '在线生成高清二维码，支持文本、网址等内容，可直接保存使用，简单便捷',
        'works.card2.title': '文字和谐处理脚本', 'works.card2.desc': '自动识别敏感词汇，支持自定义关键词库，适用于内容审核、评论过滤场景',
        'works.card3.title': '文字和谐处理脚本（AI版）', 'works.card3.desc': '使用AI识别并屏蔽脏话，实现文字和谐，需填充阿里云key',
        'works.card4.title': '电影票房预测', 'works.card4.desc': '基于历史数据与市场趋势，智能预测电影票房表现，支持多维度数据分析与可视化展示',
        'contact.title': '联系我', 'contact.subtitle': '欢迎留言或通过以下方式联系',
        'contact.form.title': '留言反馈（QQ邮箱直达）', 'contact.form.email': '你的QQ邮箱（将作为发件人）',
        'contact.form.message': '留言内容', 'contact.form.captcha': '验证码（点击刷新）', 'contact.form.submit': '提交留言',
        'contact.info.title': '联系方式',
        'footer.copy': '\u00a9 2025 贺林枫的网站. All rights reserved.'
    },
    en: {
        'modal.title': "Welcome to Helinfeng's Website!", 'modal.body': 'Welcome', 'modal.close': 'Close',
        'nav.logo': "Helinfeng's Website", 'nav.home': 'Home', 'nav.about': 'About', 'nav.works': 'Works', 'nav.contact': 'Contact',
        'hero.greeting': 'Hi, I am', 'hero.subtitle': 'Welcome to my personal website', 'hero.cta': 'Learn More', 'hero.works': 'View Works', 'hero.scroll': 'Scroll Down',
        'about.title': 'About Me', 'about.subtitle': 'An ordinary person who loves technology and creating',
        'about.p1': "Hi, I'm Helinfeng. A developer who loves tinkering with technology and creating things.",
        'about.p2': 'I believe technology should make life simpler and more fun. Whether building practical tools or exploring new possibilities, I enjoy the journey from zero to one.',
        'works.title': 'My Works', 'works.subtitle': 'Some tools I have built', 'works.search': 'Search my works...', 'works.empty': 'No matching works found',
        'works.card1.title': 'QR Code Generator', 'works.card1.desc': 'Generate high-quality QR codes online for text, URLs; easy to save and use',
        'works.card2.title': 'Text Harmony Script', 'works.card2.desc': 'Automatically identify sensitive words; customizable list; suitable for content moderation',
        'works.card3.title': 'Text Harmony Script (AI)', 'works.card3.desc': 'AI-powered text filtering with profanity detection; requires Alibaba Cloud API key',
        'works.card4.title': 'Movie Box Office Forecast', 'works.card4.desc': 'Intelligent movie box office prediction based on historical data and market trends, with multi-dimensional analysis and visualization',
        'contact.title': 'Contact Me', 'contact.subtitle': 'Leave a message or reach out directly',
        'contact.form.title': 'Feedback (Direct to QQ Mail)', 'contact.form.email': 'Your QQ Email (sender)',
        'contact.form.message': 'Message', 'contact.form.captcha': 'Captcha (click to refresh)', 'contact.form.submit': 'Submit',
        'contact.info.title': 'Contact Info',
        'footer.copy': '\u00a9 2025 Helinfeng. All rights reserved.'
    }
};

function applyLang(lang) {
    const dict = i18n[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) el.placeholder = dict[key];
    });
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.getElementById('langZh').classList.toggle('active', lang === 'zh');
    document.getElementById('langEn').classList.toggle('active', lang === 'en');
    localStorage.setItem('lang', lang);
}

(function() {
    const zh = document.getElementById('langZh');
    const en = document.getElementById('langEn');
    const saved = localStorage.getItem('lang') || 'zh';
    applyLang(saved);
    zh.addEventListener('click', () => applyLang('zh'));
    en.addEventListener('click', () => applyLang('en'));
})();

/* ===== Captcha ===== */
(function() {
    const canvas = document.getElementById('captchaCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz';
    let validCode = '';

    function rnd(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }
    function rndColor(min, max) { return `rgb(${rnd(min,max)},${rnd(min,max)},${rnd(min,max)})`; }

    window.drawCaptcha = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        validCode = '';
        for (let i = 0; i < 4; i++) {
            const ch = chars[rnd(0, chars.length - 1)];
            validCode += ch;
            ctx.font = `${rnd(28,36)}px Arial,sans-serif`;
            ctx.fillStyle = rndColor(50, 160);
            ctx.textBaseline = 'middle';
            const angle = rnd(-30, 30) * Math.PI / 180;
            ctx.save();
            ctx.translate(35 * i + 18, canvas.height / 2);
            ctx.rotate(angle);
            ctx.fillText(ch, -10, 0);
            ctx.restore();
        }
        for (let i = 0; i < 4; i++) {
            ctx.strokeStyle = rndColor(100, 200);
            ctx.lineWidth = rnd(1, 2);
            ctx.beginPath();
            ctx.moveTo(rnd(0, canvas.width), rnd(0, canvas.height));
            ctx.lineTo(rnd(0, canvas.width), rnd(0, canvas.height));
            ctx.stroke();
        }
        for (let i = 0; i < 60; i++) {
            ctx.fillStyle = rndColor(150, 220);
            ctx.beginPath();
            ctx.arc(rnd(0, canvas.width), rnd(0, canvas.height), 1, 0, Math.PI * 2);
            ctx.fill();
        }
        document.getElementById('captchaMessage').textContent = '';
    };

    window.verifyCaptcha = function() {
        const input = document.getElementById('captchaInput').value.trim().toUpperCase();
        const msg = document.getElementById('captchaMessage');
        if (!input) { msg.textContent = '\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801'; msg.className = 'captcha-message'; return false; }
        if (input === validCode.toUpperCase()) {
            msg.textContent = '\u2713 \u9a8c\u8bc1\u6210\u529f'; msg.className = 'captcha-message success'; return true;
        }
        msg.textContent = '\u2717 \u9a8c\u8bc1\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165'; msg.className = 'captcha-message';
        drawCaptcha(); document.getElementById('captchaInput').value = ''; return false;
    };

    drawCaptcha();
    canvas.addEventListener('click', drawCaptcha);
    document.getElementById('captchaInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') verifyCaptcha(); });
})();

/* ===== Email Submission ===== */
const API_BASE_URL = 'https://api.hlf-website.site';

function validateQQEmail(email) {
    return /^[1-9]\d{4,10}@qq\.com$/.test(email);
}

function showFormTip(text, type) {
    const tip = document.getElementById('formTip');
    tip.textContent = text;
    tip.className = 'form-tip ' + (type || '');
}

function submitMessage() {
    const emailInput = document.getElementById('qqEmail');
    const msgInput = document.getElementById('messageText');
    const captchaInput = document.getElementById('captchaInput');
    const submitBtn = document.getElementById('submitBtn');

    if (!verifyCaptcha()) {
        showFormTip('\u8bf7\u5148\u5b8c\u6210\u9a8c\u8bc1\u7801\u9a8c\u8bc1', 'error');
        return;
    }

    const senderEmail = emailInput.value.trim();
    const content = msgInput.value.trim();

    if (!validateQQEmail(senderEmail)) {
        showFormTip('\u8bf7\u8f93\u5165\u6709\u6548\u7684QQ\u90ae\u7bb1\uff08\u683c\u5f0f\uff1axxx@qq.com\uff09', 'error');
        return;
    }
    if (!content) { showFormTip('\u7559\u8a00\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a', 'error'); return; }
    if (content.length > 1000) { showFormTip('\u7559\u8a00\u5185\u5bb9\u4e0d\u80fd\u8d85\u8fc71000\u5b57', 'error'); return; }

    submitBtn.disabled = true;
    submitBtn.textContent = '\u53d1\u9001\u4e2d...';
    showFormTip('\u6b63\u5728\u53d1\u9001\uff0c\u8bf7\u7a0d\u5019...', 'loading');

    axios.post(API_BASE_URL + '/api/send-direct', {
        senderEmail: senderEmail,
        content: content
    }, { headers: { 'Content-Type': 'application/json' } })
    .then(res => {
        if (res.data.success) {
            showFormTip('\u2713 \u53d1\u9001\u6210\u529f\uff01\u4f60\u7684\u7559\u8a00\u5df2\u76f4\u8fbe\u76ee\u6807\u90ae\u7bb1', 'success');
            emailInput.value = ''; msgInput.value = ''; captchaInput.value = '';
            drawCaptcha();
        } else {
            showFormTip('\u2717 \u53d1\u9001\u5931\u8d25\uff1a' + (res.data.message || '\u672a\u77e5\u9519\u8bef'), 'error');
        }
    })
    .catch(() => { showFormTip('\u2717 \u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u540e\u91cd\u8bd5', 'error'); })
    .finally(() => { submitBtn.disabled = false; submitBtn.textContent = '\u63d0\u4ea4\u7559\u8a00'; });
}

/* ===== Works Search ===== */
(function() {
    const input = document.getElementById('worksSearch');
    if (!input) return;
    const cards = document.querySelectorAll('.work-card');
    const empty = document.getElementById('worksEmpty');

    function normalize(s) { return (s || '').toLowerCase().replace(/\s+/g, ''); }

    function fuzzyMatch(haystack, needle) {
        haystack = normalize(haystack);
        needle = normalize(needle);
        if (!needle) return true;
        let pos = 0;
        for (const ch of needle) { pos = haystack.indexOf(ch, pos); if (pos === -1) return false; pos++; }
        return true;
    }

    function filter() {
        const q = input.value;
        let anyVisible = false;
        cards.forEach(card => {
            const title = card.querySelector('.work-card-title')?.textContent || '';
            const desc = card.querySelector('.work-card-desc')?.textContent || '';
            const hit = fuzzyMatch(title, q) || fuzzyMatch(desc, q);
            card.style.display = hit ? '' : 'none';
            if (hit) anyVisible = true;
        });
        empty.style.display = anyVisible ? 'none' : '';
    }

    input.addEventListener('input', filter);
})();

/* ===== Back to Top ===== */
(function() {
    const btn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

/* ===== Scroll Reveal ===== */
(function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();
