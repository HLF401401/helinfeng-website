// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 表单提交（判空防护：页面不存在 .contact-form 时不报错）
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    // 阻止默认提交，展示提示并重置表单
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('留言发送成功！感谢您的联系！');
        this.reset();
    });
}

// 页面滚动时导航栏样式变化
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = '#fff';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.backgroundColor = '#fff';
        header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
});

// 作品页搜索（模糊匹配：忽略大小写与空格，按字符顺序匹配）
function initSearch() {
    const input = document.getElementById('worksSearch');
    if (!input) return;
    const cards = Array.from(document.querySelectorAll('.works .card, .works .work-card'));

    // 规范化：转小写并移除空格
    function normalize(s) {
        return (s || '').toLowerCase().replace(/\s+/g, '');
    }

    // 模糊匹配：needle 的每个字符依次在 haystack 中出现即可视为命中
    function fuzzyIncludes(haystack, needle) {
        haystack = normalize(haystack);
        needle = normalize(needle);
        if (!needle) return true;
        let pos = 0;
        for (const ch of needle) {
            pos = haystack.indexOf(ch, pos);
            if (pos === -1) return false;
            pos++;
        }
        return true;
    }

    // 实时过滤：输入事件触发，匹配标题与描述
    function filter() {
        const q = input.value;
        cards.forEach(card => {
            const title = card.querySelector('.work-title')?.textContent || '';
            const desc = card.querySelector('.work-desc')?.textContent || '';
            const hit = fuzzyIncludes(title, q) || fuzzyIncludes(desc, q);
            card.style.display = hit ? '' : 'none';
        });
    }

    input.addEventListener('input', filter);
    input.addEventListener('keyup', filter);
}

document.addEventListener('DOMContentLoaded', initSearch);

const i18n = {
    zh: {
        '.logo': '贺林枫的网站',
        'a[href="#home"]': '首页',
        'a[href="#about"]': '关于我',
        'a[href="#works"]': '我的作品',
        'a[href="#contact"]': '联系方式',
        '.hero-content h1': '你好，我是贺林枫',
        '.hero-content p': '欢迎来到我的个人网站',
        '.hero-content .btn': '了解更多',
        '.modal-title': '欢迎来到贺林枫的网站！',
        '.modal-body p': '欢迎光临',
        '#works h2': '我的作品',
        '.works .card:nth-of-type(1) .work-title': '二维码生成器',
        '.works .card:nth-of-type(1) .work-desc': '在线生成高清二维码，支持文本、网址等内容，可直接保存使用，简单便捷',
        '.works .card:nth-of-type(2) .work-title': '文字和谐处理脚本',
        '.works .card:nth-of-type(2) .work-desc': '自动识别敏感词汇，支持自定义关键词库，适用于内容审核、评论过滤场景',
        '.github-link .btn': '访问 GitHub',
        '.container h2': '留言反馈（QQ邮箱直达）',
        'label[for="qqEmail"]': '你的QQ邮箱（将作为发件人）',
        'label[for="message"]': '留言内容',
        'button[onclick="submitMessage()"]': '提交留言',
        '#contact h2': '联系方式',
        '.contact-info p:nth-child(1)': '邮箱：1340933251@qq.com',
        '.contact-info p:nth-child(2)': '微信：H18954806951',
        '.modal-footer .modal-close': '关闭',
        'footer p': '© 2025 贺林枫的网站. All rights reserved.'
    },
    en: {
        '.logo': "Helinfeng's Website",
        'a[href="#home"]': 'Home',
        'a[href="#about"]': 'About',
        'a[href="#works"]': 'Works',
        'a[href="#contact"]': 'Contact',
        '.hero-content h1': 'Hi, I am Helinfeng',
        '.hero-content p': 'Welcome to my personal website',
        '.hero-content .btn': 'Learn More',
        '.modal-title': "Welcome to Helinfeng's Website!",
        '.modal-body p': 'Welcome',
        '#works h2': 'My Works',
        '.works .card:nth-of-type(1) .work-title': 'QR Code Generator',
        '.works .card:nth-of-type(1) .work-desc': 'Generate high-quality QR codes online for text, URLs; easy to save and use',
        '.works .card:nth-of-type(2) .work-title': 'Text Harmony Script',
        '.works .card:nth-of-type(2) .work-desc': 'Automatically identify sensitive words; customizable list; suitable for moderation',
        '.github-link .btn': 'Visit GitHub',
        '.container h2': 'Feedback (Direct to QQ Mail)',
        'label[for="qqEmail"]': 'Your QQ Email (sender)',
        'label[for="message"]': 'Message',
        'button[onclick="submitMessage()"]': 'Submit Message',
        '#contact h2': 'Contact',
        '.contact-info p:nth-child(1)': 'Email: 1340933251@qq.com',
        '.contact-info p:nth-child(2)': 'WeChat: H18954806951',
        '.modal-footer .modal-close': 'Close',
        'footer p': '© 2025 Helinfeng. All rights reserved.'
    }
};

function applyLang(lang) {
    const dict = i18n[lang];
    Object.entries(dict).forEach(([sel, text]) => {
        document.querySelectorAll(sel).forEach(el => el.textContent = text);
    });
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.getElementById('langZh')?.classList.toggle('active', lang === 'zh');
    document.getElementById('langEn')?.classList.toggle('active', lang === 'en');
}

function initLangSwitch() {
    const zhBtn = document.getElementById('langZh');
    const enBtn = document.getElementById('langEn');
    if (!zhBtn || !enBtn) return;
    zhBtn.addEventListener('click', () => applyLang('zh'));
    enBtn.addEventListener('click', () => applyLang('en'));
    applyLang('zh');
}

document.addEventListener('DOMContentLoaded', initLangSwitch);

// 自动刷新（10分钟）：保持页面最新，但可能清空未提交的留言
setInterval(() => {
    location.reload();
}, 600000);