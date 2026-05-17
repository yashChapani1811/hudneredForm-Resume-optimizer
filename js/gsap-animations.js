document.addEventListener("DOMContentLoaded", () => {
    if ("undefined" == typeof gsap || "undefined" == typeof ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger), "undefined" != typeof Lenis && (window.lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: !0
    }), lenis.on("scroll", ScrollTrigger.update), gsap.ticker.add(t => {
        lenis.raf(1e3 * t)
    }), gsap.ticker.lagSmoothing(0)), window.addEventListener("load", () => {
        setTimeout(() => ScrollTrigger.refresh(), 200)
    });
    const t = "sub" === document.body.getAttribute("data-page");
    t || gsap.to(".page-atmosphere", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: ".page-content",
            start: "top top",
            end: "bottom top",
            scrub: !0
        }
    }), gsap.fromTo(".stat-item", {
        y: 40,
        autoAlpha: 0
    }, {
        scrollTrigger: {
            trigger: ".stat-item",
            start: "top 90%"
        },
        y: 0,
        autoAlpha: 1,
        duration: .8,
        stagger: .15,
        ease: "back.out(1.7)",
        clearProps: "transform,opacity"
    }), t && ScrollTrigger.batch(".surface-glass,.glass,article", {
        start: "top 88%",
        once: !0,
        onEnter: t => {
            gsap.from(t, {
                y: 24,
                autoAlpha: 0,
                duration: .6,
                ease: "power2.out",
                stagger: .08,
                clearProps: "transform,opacity"
            })
        }
    }), gsap.fromTo(".feature-card", {
        y: 50,
        autoAlpha: 0
    }, {
        scrollTrigger: {
            trigger: "#features",
            start: "top 80%"
        },
        y: 0,
        autoAlpha: 1,
        duration: .6,
        stagger: .1,
        ease: "power2.out",
        clearProps: "transform,opacity"
    }), gsap.fromTo(".step-item", {
        y: 30,
        autoAlpha: 0
    }, {
        scrollTrigger: {
            trigger: "#how-it-works",
            start: "top 80%"
        },
        y: 0,
        autoAlpha: 1,
        duration: .7,
        stagger: .2,
        ease: "power3.out",
        clearProps: "transform,opacity"
    });
    gsap.timeline({
        scrollTrigger: {
            trigger: "#advantage",
            start: "top 70%",
            end: "bottom 80%",
            scrub: !1
        }
    }).fromTo(".advantage-header", {
        y: -30,
        autoAlpha: 0
    }, {
        y: 0,
        autoAlpha: 1,
        duration: .6,
        clearProps: "transform,opacity"
    }).fromTo(".adv-item", {
        x: -50,
        autoAlpha: 0
    }, {
        x: 0,
        autoAlpha: 1,
        duration: .5,
        stagger: .2,
        clearProps: "transform,opacity"
    }, "-=0.3").fromTo(".advantage-visual", {
        scale: .8,
        autoAlpha: 0
    }, {
        scale: 1,
        autoAlpha: 1,
        duration: .6,
        ease: "back.out(1.5)",
        clearProps: "transform,opacity"
    }, "-=0.2").fromTo(".adv-progress", {
        width: "0%"
    }, {
        width: (t, e) => e.getAttribute("data-target"),
        duration: 1.2,
        ease: "power2.out"
    }, "-=0.2");
    let e = {
        val: 0
    };
    gsap.to(e, {
        val: 97,
        roundProps: "val",
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".adv-score",
            start: "top 85%"
        },
        onUpdate: function() {
            const t = document.querySelector(".adv-score");
            t && (t.innerHTML = e.val)
        }
    });
    const a = gsap.timeline({
        repeat: -1,
        repeatDelay: 5,
        scrollTrigger: {
            trigger: "#demo",
            start: "top 75%"
        }
    });
    let o = {
        val: 0
    };
    a.to(".demo-panel-left", {
        y: 0,
        autoAlpha: 1,
        duration: .6,
        ease: "power2.out"
    }).to(".seq-label", {
        autoAlpha: 1,
        duration: .3
    }).to(".seq-name", {
        text: "Yash Patel",
        duration: .8,
        ease: "none"
    }).to(".seq-role", {
        autoAlpha: 1,
        duration: .4
    }).to(".seq-skel", {
        x: 0,
        autoAlpha: 1,
        duration: .4,
        stagger: .15,
        ease: "power2.out"
    }).to(".seq-box", {
        scale: 1,
        autoAlpha: 1,
        duration: .5,
        stagger: .2,
        ease: "back.out(1.2)"
    }).to(".demo-typewriter", {
        text: "Led design systems for a B2B SaaS platform serving 40k+ MAU. Shipped onboarding flows that improved activation by 18%.",
        duration: 2.5,
        ease: "none"
    }).to(".seq-skills", {
        autoAlpha: 1,
        duration: .4
    }).to([".demo-score-panel", ".demo-sugg-panel"], {
        y: 0,
        autoAlpha: 1,
        duration: .6,
        stagger: .2,
        ease: "power2.out"
    }, "-=0.5").to(o, {
        val: 82,
        roundProps: "val",
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
            const t = document.querySelector(".demo-score-text");
            t && (t.innerHTML = o.val)
        }
    }, "-=0.2").to(".demo-progress-ring", {
        strokeDasharray: "82, 100",
        duration: 2,
        ease: "power2.out"
    }, "<").to(".demo-score-desc", {
        autoAlpha: 1,
        duration: .4
    }, "-=0.5").to(".seq-sugg-title", {
        autoAlpha: 1,
        duration: .4
    }, "-=1.5");
    document.querySelectorAll(".seq-type-sugg").forEach((t, e) => {
        const o = t.getAttribute("data-text"),
            r = t.querySelector(".seq-sugg-bullet"),
            s = t.querySelector(".seq-sugg-text");
        r && s && a.to(r, {
            autoAlpha: 1,
            duration: .2
        }, 0 === e ? "-=1.0" : "").to(s, {
            text: o,
            duration: 1.2,
            ease: "none"
        })
    }), gsap.fromTo(".testimonial-card", {
        scale: .9,
        autoAlpha: 0
    }, {
        scrollTrigger: {
            trigger: "#testimonials",
            start: "top 80%"
        },
        scale: 1,
        autoAlpha: 1,
        duration: .6,
        stagger: .15,
        ease: "back.out(1.2)",
        clearProps: "transform,opacity,scale"
    }), gsap.fromTo(".pricing-card", {
        y: 40,
        autoAlpha: 0
    }, {
        scrollTrigger: {
            trigger: "#pricing",
            start: "top 80%"
        },
        y: 0,
        autoAlpha: 1,
        duration: .7,
        stagger: .2,
        ease: "power2.out",
        clearProps: "transform,opacity"
    })
});