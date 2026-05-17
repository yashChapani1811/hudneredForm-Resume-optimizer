(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasGsap = typeof window.gsap !== 'undefined';

    if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    document.documentElement.classList.add('post-enhanced');

    if (!hasGsap || reduceMotion) {
        document.documentElement.classList.add('post-ready');
        return;
    }

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const Lenis = window.Lenis;

    if (ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    let lenis = null;
    if (Lenis) {
        lenis = new Lenis({
            duration: 1.05,
            easing: function (t) {
                return Math.min(1, 1.001 - Math.pow(2, -10 * t));
            },
            smoothWheel: true,
            smoothTouch: false,
            wheelMultiplier: 0.85,
        });

        lenis.on('scroll', function () {
            if (ScrollTrigger) {
                ScrollTrigger.update();
            }
        });

        gsap.ticker.add(function (time) {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
        document.documentElement.classList.add('lenis-enabled');
    }

    gsap.set(['.eyebrow', 'h1', '.excerpt', '.meta', '.hero-image'], {
        autoAlpha: 0,
        y: 22,
    });

    gsap.set('.nav', {
        autoAlpha: 0,
        y: -14,
    });

    gsap.set('.content', {
        autoAlpha: 0,
        y: 34,
    });

    const intro = gsap.timeline({
        defaults: {
            duration: 0.56,
            ease: 'power3.out',
        },
        onStart: function () {
            document.documentElement.classList.add('post-ready');
        },
    });

    intro
        .to('.nav', {
            autoAlpha: 1,
            y: 0,
            duration: 0.36,
        })
        .to('.eyebrow', {
            autoAlpha: 1,
            y: 0,
        }, '-=0.15')
        .to('h1', {
            autoAlpha: 1,
            y: 0,
        }, '-=0.55')
        .to('.excerpt', {
            autoAlpha: 1,
            y: 0,
        }, '-=0.48')
        .to('.meta', {
            autoAlpha: 1,
            y: 0,
        }, '-=0.45')
        .to('.hero-image', {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.64,
        }, '-=0.72');

    gsap.fromTo('.hero-image', {
        scale: 0.985,
    }, {
        scale: 1.015,
        ease: 'none',
        scrollTrigger: ScrollTrigger ? {
            trigger: '.article',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
        } : undefined,
    });

    if (ScrollTrigger) {
        gsap.to('.content', {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.content',
                start: 'top 78%',
                once: true,
            },
        });

        gsap.utils.toArray('.content h2, .content p, .content li, .cta-box').forEach((element) => {
            gsap.from(element, {
                autoAlpha: 0,
                y: 18,
                duration: 0.62,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 86%',
                    once: true,
                },
            });
        });
    } else {
        gsap.to('.content', {
            autoAlpha: 1,
            y: 0,
            delay: 0.45,
            duration: 0.75,
            ease: 'power3.out',
        });
    }

    let lastScrollY = window.scrollY;
    const nav = document.querySelector('.nav');
    function updateNav(scrollY) {
        const currentScrollY = scrollY || window.scrollY;
        nav?.classList.toggle('is-compact', currentScrollY > 24);
        nav?.classList.toggle('is-hidden', currentScrollY > lastScrollY && currentScrollY > 360);
        lastScrollY = currentScrollY;
    }

    if (lenis) {
        lenis.on('scroll', function (event) {
            updateNav(event.scroll);
        });
    } else {
        window.addEventListener('scroll', function () {
            updateNav(window.scrollY);
        }, { passive: true });
    }
}());
