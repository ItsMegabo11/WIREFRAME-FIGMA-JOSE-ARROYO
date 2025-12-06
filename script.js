document.addEventListener("DOMContentLoaded", function () {
    console.log("¡The Battle Cats Wiki cargada al 100%!");

    // ================== 1. HEADER EFECTO SCROLL ==================
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            header.style.background = "rgba(255, 215, 0, 0.96)";
            header.style.backdropFilter = "blur(12px)";
            header.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)";
        } else {
            header.style.background = "#FFD700";
            header.style.backdropFilter = "none";
        }
    });

    // ================== 2. BOTONES INICIO EFECTO 3D ==================
    document.querySelectorAll(".home-buttons article").forEach(btn => {
        btn.addEventListener("mouseenter", () => {
            btn.style.transform = "translateY(-30px) scale(1.1)";
        });
        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "translateY(0) scale(1)";
        });
    });

    // ================== 3. ANIMACIÓN DE TARJETAS ==================
    const tarjetas = document.querySelectorAll("main article");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }, i * 120);
            }
        });
    }, { threshold: 0.1 });

    tarjetas.forEach(t => {
        t.style.opacity = "0";
        t.style.transform = "translateY(70px)";
        t.style.transition = "all 0.9s ease-out";
        observer.observe(t);
    });

    // ================== 4. BUSCADOR FIJO DEBAJO DEL HEADER (PERFECTO) ==================
    if (location.pathname.includes("Unidades") || location.pathname.includes("Enemigos")) {
        const barra = document.createElement("div");
        barra.style.cssText = `
            position:fixed;top:${header.offsetHeight}px;left:0;width:100%;
            background:linear-gradient(#FFD700, #FFF8E1);padding:18px 20px;
            text-align:center;z-index:998;box-shadow:0 6px 20px rgba(0,0,0,0.3);
            transition:top 0.3s;
        `;

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Buscar gato o enemigo...";
        input.style.cssText = `
            width:90%;max-width:600px;padding:16px 28px;
            font-size:1.3em;font-family:"Arial Black",sans-serif;
            border:5px solid #333;border-radius:50px;
            background:white;outline:none;
            box-shadow:inset 0 4px 12px rgba(0,0,0,0.2);
            transition:all 0.3s;
        `;

        input.addEventListener("focus", () => input.style.borderColor = "#FF4500");
        input.addEventListener("blur", () => input.style.borderColor = "#333");

        input.addEventListener("input", function () {
            const busqueda = this.value.toLowerCase();
            tarjetas.forEach(t => {
                t.style.display = t.textContent.toLowerCase().includes(busqueda) ? "inline-block" : "none";
            });
        });

        barra.appendChild(input);
        document.body.appendChild(barra);

        // Ajustar el main para que no quede tapado
        document.querySelector("main").style.marginTop = (header.offsetHeight + barra.offsetHeight + 30) + "px";

        // Hacer que se pegue arriba al hacer scroll
        window.addEventListener("scroll", () => {
            barra.style.top = window.scrollY > header.offsetHeight ? "0px" : header.offsetHeight + "px";
        });
    }

    // ================== 5. TÍTULO CON MÁQUINA DE ESCRIBIR ==================
    const titulo = document.querySelector("main > h2:first-of-type");
    if (titulo) {
        const texto = titulo.textContent;
        titulo.textContent = "";
        titulo.style.borderRight = "5px solid #333";
        let i = 0;
        const escribir = () => {
            if (i < texto.length) {
                titulo.textContent += texto.charAt(i);
                i++;
                setTimeout(escribir, 90);
            } else {
                titulo.style.borderRight = "none";
            }
        };
        setTimeout(escribir, 700);
    }

    // ================== 6. GATOS VOLADORES (sí, siguen aquí) ==================
    function crearGatoVolador() {
        const gato = document.createElement("img");
        gato.src = "IMAGES/CatFlying.png";
        gato.style.cssText = `
            position:fixed;width:70px;pointer-events:none;z-index:997;
            left:-100px;top:${Math.random() * 70 + 15}%;
            animation:volar ${Math.random() * 12 + 10}s linear forwards;
        `;
        document.body.appendChild(gato);
        setTimeout(() => gato.remove(), 25000);
    }
    setInterval(crearGatoVolador, 8000);

    // ================== ESTILOS EXTRA ==================
    const style = document.createElement("style");
    style.textContent = `
        @keyframes volar { to { transform: translateX(120vw) rotate(720deg); } }
        main article { opacity:0; transform:translateY(70px); transition:all 0.9s ease-out; }
        .home-buttons article { transition:all 0.5s ease !important; }
    `;
    document.head.appendChild(style);
});