const loader = document.getElementById("loader");
const cursorGlow = document.getElementById("cursorGlow");


window.addEventListener("load", () => {
    setTimeout(() => {
        if (loader) {
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.remove();
            }, 500);
        }
    }, 2000);
});

if (cursorGlow) {
    document.addEventListener("mousemove", (e) => {
        cursorGlow.style.left = `${e.clientX - 100}px`;
        cursorGlow.style.top = `${e.clientY - 100}px`;
    });
}

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

revealElements.forEach((el) => observer.observe(el));

const counters = document.querySelectorAll("[data-target]");

counters.forEach((counter) => {
    let started = false;

    const startCounter = () => {
        if (started) return;

        started = true;

        const target = Number(counter.dataset.target);
        let current = 0;

        const step = Math.max(1, Math.ceil(target / 100));

        const interval = setInterval(() => {
            current += step;

            if (current >= target) {
                current = target;
                clearInterval(interval);
            }

            counter.textContent = current.toLocaleString();
        }, 20);
    };

    new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startCounter();
        }
    }).observe(counter);
});

const quotes = [
    "Creativity is everything.",
    "Be different.",
    "Turn weird into art."
];

const quoteElement = document.getElementById("quote");

if (quoteElement) {
    let index = 0;

    setInterval(() => {
        index++;

        if (index >= quotes.length) {
            index = 0;
        }

        quoteElement.textContent = quotes[index];
    }, 3000);
}
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./service-worker.js")
            .then(reg => {
                console.log("PWA ativo:", reg.scope);
            })
            .catch(err => {
                console.error("Erro SW:", err);
            });
    });
}
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".gallery-item img").forEach(img => {

    img.addEventListener("click", () => {
        lightbox.classList.add("active");
        lightboxImg.src = img.src;
    });

});

lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
});