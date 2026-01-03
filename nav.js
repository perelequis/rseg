document.addEventListener('DOMContentLoaded', function () {
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = 'nav.css';
    document.head.appendChild(styleLink);

    const nav = document.querySelector('nav');

    if (nav) {
        const ul = nav.querySelector('ul');

        if (ul && !nav.querySelector('.menu-toggle')) {
            let pageName = 'INÍCIO';
            const path = window.location.pathname.toLowerCase();

            if (path.includes('sobre')) {
                pageName = 'SOBRE';
            } else if (path.includes('servicos') || path.includes('serviços')) {
                pageName = 'SERVIÇOS';
            } else if (path.includes('contato')) {
                pageName = 'CONTATO';
            }

            const menuButton = document.createElement('button');
            menuButton.classList.add('menu-toggle');
            menuButton.innerHTML = `<span class="menu-icon">&#9776;</span><span class="menu-text">${pageName}</span>`;
            menuButton.setAttribute('aria-label', 'Abrir Menu');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.setAttribute('aria-controls', 'nav-list');

            ul.id = 'nav-list';

            nav.insertBefore(menuButton, ul);

            const toggleMenu = () => {
                const isActive = ul.classList.toggle('active');
                menuButton.setAttribute('aria-expanded', isActive);

                const iconSpan = menuButton.querySelector('.menu-icon');
                if (iconSpan) {
                    iconSpan.innerHTML = isActive ? '&times;' : '&#9776;';
                }

                menuButton.setAttribute('aria-label', isActive ? 'Fechar Menu' : 'Abrir Menu');
                document.body.style.overflow = isActive ? 'hidden' : '';
            };

            menuButton.addEventListener('click', function (e) {
                e.stopPropagation();
                toggleMenu();
            });

            const navLinks = ul.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (ul.classList.contains('active')) {
                        toggleMenu();
                    }
                });
            });

            document.addEventListener('click', function (event) {
                const isClickInside = nav.contains(event.target);
                const isOverlayClick = event.target === ul;

                if (ul.classList.contains('active')) {
                    if (!isClickInside || isOverlayClick) {
                        toggleMenu();
                    }
                }
            });
        }
    }
});

