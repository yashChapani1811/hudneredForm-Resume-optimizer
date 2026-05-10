const ANALYTICS_CONFIG = {
    gaMeasurementId: "G-S0Q62HTX5L",
    events: {
        pageView: "page_view",
        fileUpload: "file_upload",
        buttonClick: "button_click",
        scrollDepth: "scroll_depth",
        formSubmit: "form_submit",
        download: "download",
        videoPlay: "video_play"
    },
    scrollThresholds: [25, 50, 75, 90, 100],
    performanceMetrics: ["navigationStart", "loadEventEnd", "domContentLoadedEventEnd", "firstContentfulPaint", "largestContentfulPaint"]
};

function initializeTracking() {
    initializePageTracking(), initializeEventTracking(), initializeScrollTracking(), initializePerformanceTracking(), initializeErrorTracking(), initializeUserSession(), console.log("Analytics tracking initialized")
}

function initializePageTracking() {
    trackPageView(), document.addEventListener("visibilitychange", function() {
        document.hidden ? trackEvent("page_hidden", {
            time_on_page: getTimeOnPage()
        }) : trackEvent("page_visible", {
            return_time: (new Date).toISOString()
        })
    }), window.addEventListener("beforeunload", function() {
        trackEvent("page_unload", {
            time_on_page: getTimeOnPage(),
            scroll_depth: getMaxScrollDepth()
        })
    })
}

function initializeEventTracking() {
    document.addEventListener("click", function(e) {
        const t = e.target.closest("button, .btn, a");
        t && trackButtonClick(t)
    });
    document.querySelectorAll("form").forEach(e => {
        e.addEventListener("submit", function(t) {
            trackFormSubmit(e)
        });
        e.querySelectorAll("input, textarea, select").forEach(e => {
            e.addEventListener("focus", function() {
                trackEvent("form_field_focus", {
                    field_name: e.name || e.type,
                    field_type: e.type
                })
            })
        })
    });
    document.querySelectorAll('input[type="file"]').forEach(e => {
        e.addEventListener("change", function(e) {
            e.target.files.length > 0 && trackFileUpload(e.target.files[0])
        })
    }), document.addEventListener("click", function(e) {
        const t = e.target.closest("a[href]");
        if (t && t.href) {
            t.hostname !== window.location.hostname && trackEvent("external_link_click", {
                url: t.href,
                link_text: t.textContent.trim()
            })
        }
    })
}

function initializeScrollTracking() {
    let e = new Set,
        t = 0;
    const n = Utils.throttle(function() {
        const n = getScrollPercentage();
        t = Math.max(t, n), ANALYTICS_CONFIG.scrollThresholds.forEach(t => {
            n >= t && !e.has(t) && (e.add(t), trackEvent("scroll_depth", {
                threshold: t,
                scroll_depth: n,
                time_to_threshold: getTimeOnPage()
            }))
        })
    }, 1e3);
    window.addEventListener("scroll", n), window.getMaxScrollDepth = function() {
        return t
    }
}

function initializePerformanceTracking() {
    window.addEventListener("load", function() {
        setTimeout(() => {
            trackPerformanceMetrics()
        }, 0)
    })
}

function initializeErrorTracking() {
    window.addEventListener("error", function(e) {
        trackError("javascript_error", {
            message: e.message,
            filename: e.filename,
            lineno: e.lineno,
            colno: e.colno,
            stack: e.error?.stack
        })
    }), window.addEventListener("unhandledrejection", function(e) {
        trackError("promise_rejection", {
            reason: e.reason,
            stack: e.reason?.stack
        })
    })
}

function initializeUserSession() {
    let e = sessionStorage.getItem("session_id");
    e || (e = generateSessionId(), sessionStorage.setItem("session_id", e), sessionStorage.setItem("session_start", Date.now()));
    const t = parseInt(sessionStorage.getItem("session_start"));
    trackEvent("session_info", {
        session_id: e,
        session_duration: Date.now() - t,
        page_views: parseInt(sessionStorage.getItem("page_views") || "0") + 1
    }), sessionStorage.setItem("page_views", parseInt(sessionStorage.getItem("page_views") || "0") + 1)
}

function trackPageView() {
    const e = {
        page_title: document.title,
        page_location: window.location.href,
        page_referrer: document.referrer,
        user_agent: navigator.userAgent,
        timestamp: (new Date).toISOString(),
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight
    };
    "undefined" != typeof gtag && gtag("config", ANALYTICS_CONFIG.gaMeasurementId, e), sendToAnalytics(ANALYTICS_CONFIG.events.pageView, e), console.log("Page view tracked:", e)
}

function trackButtonClick(e) {
    const t = {
        button_text: e.textContent.trim(),
        button_class: e.className,
        button_id: e.id,
        button_type: e.type || "button",
        parent_section: getClosestSection(e),
        timestamp: (new Date).toISOString()
    };
    trackEvent(ANALYTICS_CONFIG.events.buttonClick, t)
}

function trackFormSubmit(e) {
    const t = {
        form_id: e.id,
        form_class: e.className,
        form_action: e.action,
        form_method: e.method,
        field_count: e.elements.length,
        parent_section: getClosestSection(e),
        timestamp: (new Date).toISOString()
    };
    trackEvent(ANALYTICS_CONFIG.events.formSubmit, t)
}

function trackFileUpload(e) {
    const t = {
        file_name: e.name,
        file_size: e.size,
        file_type: e.type,
        upload_timestamp: (new Date).toISOString()
    };
    trackEvent(ANALYTICS_CONFIG.events.fileUpload, t)
}

function trackEvent(e, t = {}) {
    const n = {
        event_name: e,
        event_data: t,
        timestamp: (new Date).toISOString(),
        session_id: sessionStorage.getItem("session_id"),
        page_url: window.location.href,
        user_agent: navigator.userAgent
    };
    "undefined" != typeof gtag && gtag("event", e, t), sendToAnalytics(e, n), console.log("Event tracked:", n)
}

function trackError(e, t) {
    const n = {
        error_type: e,
        error_data: t,
        timestamp: (new Date).toISOString(),
        session_id: sessionStorage.getItem("session_id"),
        page_url: window.location.href,
        user_agent: navigator.userAgent
    };
    sendToAnalytics("error", n), console.error("Error tracked:", n)
}

function trackPerformanceMetrics() {
    if (!window.performance || !window.performance.timing) return;
    const e = window.performance.timing,
        t = window.performance.navigation,
        n = {
            domContentLoaded: e.domContentLoadedEventEnd - e.navigationStart,
            loadComplete: e.loadEventEnd - e.navigationStart,
            dnsLookup: e.domainLookupEnd - e.domainLookupStart,
            tcpConnection: e.connectEnd - e.connectStart,
            serverResponse: e.responseEnd - e.requestStart,
            domProcessing: e.domComplete - e.domLoading,
            redirectCount: t.redirectCount,
            navigationType: t.type,
            timestamp: (new Date).toISOString()
        };
    if (window.performance.getEntriesByType) {
        window.performance.getEntriesByType("paint").forEach(e => {
            n[e.name.replace("-", "_")] = e.startTime
        })
    }
    trackEvent("performance_metrics", n)
}

function sendToAnalytics(e, t) {
    try {
        const n = JSON.parse(localStorage.getItem("hundredform_analytics") || "[]");
        n.push({
            event: e,
            data: t,
            timestamp: (new Date).toISOString()
        }), n.length > 100 && n.splice(0, n.length - 100), localStorage.setItem("hundredform_analytics", JSON.stringify(n))
    } catch (e) {
        console.error("Failed to send analytics data:", e)
    }
}

function getScrollPercentage() {
    const e = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return Math.round(window.scrollY / e * 100)
}

function getTimeOnPage() {
    const e = parseInt(sessionStorage.getItem("session_start") || Date.now());
    return Math.round((Date.now() - e) / 1e3)
}

function getClosestSection(e) {
    const t = e.closest("section[id]");
    return t ? t.id : null
}

function generateSessionId() {
    return "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
}

function getAnalyticsData() {
    try {
        return JSON.parse(localStorage.getItem("hundredform_analytics") || "[]")
    } catch (e) {
        return console.error("Failed to get analytics data:", e), []
    }
}

function clearAnalyticsData() {
    localStorage.removeItem("hundredform_analytics")
}

function exportAnalyticsData() {
    const e = getAnalyticsData(),
        t = new Blob([JSON.stringify(e, null, 2)], {
            type: "application/json"
        }),
        n = URL.createObjectURL(t),
        i = document.createElement("a");
    i.href = n, i.download = "hundredform-analytics.json", i.click(), URL.revokeObjectURL(n)
}
document.addEventListener("DOMContentLoaded", function() {
    initializeTracking()
});
const AnalyticsUtils = {
    trackEvent: trackEvent,
    trackPageView: trackPageView,
    getAnalyticsData: getAnalyticsData,
    clearAnalyticsData: clearAnalyticsData,
    exportAnalyticsData: exportAnalyticsData,
    getTimeOnPage: getTimeOnPage,
    getScrollPercentage: getScrollPercentage
};
window.AnalyticsUtils = AnalyticsUtils, "undefined" != typeof window && (window.debugAnalytics = {
    getData: getAnalyticsData,
    clearData: clearAnalyticsData,
    exportData: exportAnalyticsData,
    trackEvent: trackEvent
}), "undefined" != typeof module && module.exports && (module.exports = {
    initializeTracking: initializeTracking,
    AnalyticsUtils: AnalyticsUtils,
    trackEvent: trackEvent,
    trackPageView: trackPageView
});