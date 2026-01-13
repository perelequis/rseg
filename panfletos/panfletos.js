function toggleTheme() {
    const flyer = document.getElementById('flyer-element');
    flyer.classList.toggle('flipped');
    document.body.classList.toggle('theme-blue');
}

document.body.onkeyup = function (e) {
    if (e.key === " " || e.code === "Space") {
        generateSalesPDF();
    }
}

function generateSalesPDF() {
    const front = document.querySelector('.face-front').cloneNode(true);
    const back = document.querySelector('.face-back').cloneNode(true);
    const printContainer = document.createElement('div');
    printContainer.style.width = '210mm';
    printContainer.style.background = '#fff';

    [front, back].forEach(page => {
        page.style.position = 'relative';
        page.style.transform = 'none';
        page.style.borderRadius = '0';
        page.style.boxShadow = 'none';
        page.style.width = '210mm';
        page.style.height = '297mm';
        page.style.padding = '20mm';
        page.style.display = 'flex';
        page.style.flexDirection = 'column';
        page.style.justifyContent = 'space-between';
        page.style.pageBreakAfter = 'always';

        const cta = page.querySelector('.cta-box');
        if (cta) {
            cta.style.border = '2px solid #ddd';
        }

        printContainer.appendChild(page);
    });

    if (printContainer.lastChild) {
        printContainer.lastChild.style.pageBreakAfter = 'auto';
    }

    const opt = {
        margin: 0,
        filename: 'panfleto.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(printContainer).set(opt).save();
}