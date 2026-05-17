document.addEventListener("DOMContentLoaded", () => {
    if ("undefined" == typeof gsap || "undefined" == typeof ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    if ("undefined" != typeof Lenis && !window.lenis) {
        window.lenis = new Lenis({
            duration: 1.1,
            easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: !0
        });
    }
    if (window.lenis) {
        window.lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(t => {
            window.lenis.raf(1e3 * t);
        });
        gsap.ticker.lagSmoothing(0);
    }
    window.addEventListener("load", () => {
        setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    const t = [".stat-item", ".step-item", ".surface-glass", ".glass", "article", "main section h2", "main section h3", "main section p"].join(",");
    gsap.set(t, {
        autoAlpha: 0,
        y: 24
    }), ScrollTrigger.batch(t, {
        start: "top 92%",
        once: !0,
        onEnter: t => {
            gsap.to(t, {
                y: 0,
                autoAlpha: 1,
                duration: .65,
                ease: "power2.out",
                stagger: .08,
                clearProps: "transform,opacity"
            })
        }
    });
});
