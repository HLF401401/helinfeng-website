// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 表单提交
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
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

function initSearch() {
    const input = document.getElementById('worksSearch');
    if (!input) return;
    const cards = Array.from(document.querySelectorAll('.works .work-card'));

    function normalize(s) {
        return (s || '').toLowerCase().replace(/\s+/g, '');
    }

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

setInterval(() => {
    location.reload();
}, 600000);