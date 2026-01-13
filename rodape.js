document.addEventListener("DOMContentLoaded", function() {
    const footerHTML = `
    <footer class="footer" id="footer">
        <div class="container">
            <p>© 2026 - Todos os direitos reservados a Rseg Monitoramento e Internet.</p>
            <p>CNPJ 26.016.250/0001-03</p>
        </div>
    </footer>`;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
});