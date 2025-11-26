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

// 自动刷新（10分钟）：保持页面最新，但可能清空未提交的留言
setInterval(() => {
    location.reload();
}, 600000);