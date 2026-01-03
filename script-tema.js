(function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999999';

    let width, height;
    let particles = [];
    let fireworkCount = 0;
    const colors = ['#FFFFFF', '#FFD700', '#FFCC00', '#F0E68C', '#FFFFFF'];

    // Variáveis de controle
    let animationFrameId = null;
    let launchTimeoutId = null;
    let isRunning = false;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor(x, y, color, angle, speed) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed
            };
            this.alpha = 1;
            this.friction = 0.95;
            this.gravity = 0.12;
            this.decay = Math.random() * 0.015 + 0.015;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.restore();
        }

        update() {
            this.velocity.x *= this.friction;
            this.velocity.y *= this.friction;
            this.velocity.y += this.gravity;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= this.decay;
        }
    }

    function createFirework() {
        // Trava extra: se não estiver rodando ou aba oculta, não cria nada
        if (!isRunning || document.hidden) return;
        if (fireworkCount >= 3) return;

        fireworkCount++;
        const x = Math.random() * width;
        const y = Math.random() * (height * 0.4) + (height * 0.1);
        const color = colors[Math.floor(Math.random() * colors.length)];

        const particleCount = 120;
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 / particleCount) * i;
            const speed = Math.random() * 8 + 4;
            particles.push(new Particle(x, y, color, angle, speed));
        }

        setTimeout(() => {
            if (fireworkCount > 0) fireworkCount--;
        }, 2000);
    }

    function launchLoop() {
        // Trava crítica: Se o usuário saiu, aborta o loop imediatamente
        if (!isRunning || document.hidden) return;

        const delay = Math.random() * 750 + 500;
        
        launchTimeoutId = setTimeout(() => {
            createFirework();
            // Só chama o próximo se ainda estivermos visíveis
            if (isRunning && !document.hidden) {
                launchLoop();
            }
        }, delay);
    }

    function animate() {
        // Trava crítica: Se o usuário saiu, para de desenhar imediatamente
        if (!isRunning || document.hidden) return;

        ctx.clearRect(0, 0, width, height);

        // Filtra e atualiza
        particles = particles.filter(p => p.alpha > 0);
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        animationFrameId = requestAnimationFrame(animate);
    }

    function startSystem() {
        if (isRunning) return; // Evita duplicação
        isRunning = true;
        
        // Garante que o canvas está limpo e tamanho correto
        resize();
        
        animate();
        launchLoop();
    }

    function stopSystem() {
        isRunning = false;
        
        // 1. Cancela o loop de animação
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        
        // 2. Cancela o agendamento de novos fogos
        if (launchTimeoutId) clearTimeout(launchTimeoutId);
        
        // 3. LIMPEZA TOTAL (O segredo para não travar)
        // Remove todas as partículas da memória para o navegador não tentar desenhá-las depois
        particles = []; 
        fireworkCount = 0;
        
        // 4. Limpa o canvas visualmente
        ctx.clearRect(0, 0, width, height);
    }

    // Gerenciador de visibilidade
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopSystem();
        } else {
            // Pequeno delay ao voltar para garantir que o navegador "acordou"
            setTimeout(startSystem, 100);
        }
    });

    // Inicialização segura
    if (document.readyState === 'complete') {
        if (!document.hidden) startSystem();
    } else {
        window.addEventListener('load', () => {
            if (!document.hidden) startSystem();
        });
    }
})();