/**
 * Hunderedform Landing Page - Constants and Configuration
 * Centralized configuration values for the application
 */

// Application Constants
export const APP_CONFIG = {
    // App Information
    NAME: 'Hunderedform',
    TAGLINE: 'Make Your Resume 100% Perfect',
    DESCRIPTION: 'AI-powered resume optimizer that helps you create the perfect resume',
    VERSION: '1.0.0',
    
    // URLs
    BASE_URL: 'https://hunderedform.com',
    API_URL: 'https://api.hunderedform.com',
    CDN_URL: 'https://cdn.hunderedform.com',
    
    // Contact
    SUPPORT_EMAIL: 'support@hunderedform.com',
    SALES_EMAIL: 'sales@hunderedform.com',
    
    // Social Media
    SOCIAL: {
        FACEBOOK: 'https://facebook.com/hunderedform',
        TWITTER: 'https://twitter.com/hunderedform',
        LINKEDIN: 'https://linkedin.com/company/hunderedform',
        INSTAGRAM: 'https://instagram.com/hunderedform'
    }
};

// Color Scheme
export const COLORS = {
    // Primary Colors
    PRIMARY_BLUE: '#2563EB',
    PRIMARY_PURPLE: '#7C3AED',
    
    // Gradients
    GRADIENT_PRIMARY: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
    GRADIENT_REVERSE: 'linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)',
    
    // Text Colors
    TEXT_PRIMARY: '#1F2937',
    TEXT_SECONDARY: '#6B7280',
    TEXT_LIGHT: '#9CA3AF',
    TEXT_WHITE: '#FFFFFF',
    
    // Background Colors
    BG_PRIMARY: '#FFFFFF',
    BG_SECONDARY: '#F9FAFB',
    BG_TERTIARY: '#F3F4F6',
    
    // Border Colors
    BORDER_PRIMARY: '#E5E7EB',
    BORDER_LIGHT: '#F3F4F6',
    
    // Status Colors
    SUCCESS: '#10B981',
    WARNING: '#F59E0B',
    ERROR: '#EF4444',
    INFO: '#3B82F6'
};

// Typography
export const TYPOGRAPHY = {
    // Font Families
    FONT_FAMILY_PRIMARY: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    FONT_FAMILY_MONO: "'Fira Code', 'Monaco', 'Consolas', monospace",
    
    // Font Sizes (in pixels)
    FONT_SIZES: {
        XS: 12,
        SM: 14,
        BASE: 16,
        LG: 18,
        XL: 20,
        '2XL': 24,
        '3XL': 30,
        '4XL': 36,
        '5XL': 48,
        '6XL': 60
    },
    
    // Font Weights
    FONT_WEIGHTS: {
        THIN: 100,
        LIGHT: 300,
        NORMAL: 400,
        MEDIUM: 500,
        SEMIBOLD: 600,
        BOLD: 700,
    EXTRABOLD: 800,
        BLACK: 900
    },
    
    // Line Heights
    LINE_HEIGHTS: {
        TIGHT: 1.25,
        NORMAL: 1.5,
        RELAXED: 1.75,
        LOOSE: 2
    }
};

// Spacing
export const SPACING = {
    // Base unit (in pixels)
    BASE: 4,
    
    // Spacing scale (in pixels)
    SCALE: {
        0: 0,
        1: 4,
        2: 8,
        3: 12,
        4: 16,
        5: 20,
        6: 24,
        8: 32,
        10: 40,
        12: 48,
        16: 64,
        20: 80,
        24: 96,
        32: 128
    }
};

// Breakpoints
export const BREAKPOINTS = {
    // Screen sizes (in pixels)
    XS: 0,
    SM: 576,
    MD: 768,
    LG: 992,
    XL: 1200,
    XXL: 1400,
    
    // Media queries
    QUERIES: {
        XS: '(max-width: 575px)',
        SM: '(min-width: 576px) and (max-width: 767px)',
        MD: '(min-width: 768px) and (max-width: 991px)',
        LG: '(min-width: 992px) and (max-width: 1199px)',
        XL: '(min-width: 1200px) and (max-width: 1399px)',
        XXL: '(min-width: 1400px)',
        MOBILE: '(max-width: 767px)',
        TABLET: '(min-width: 768px) and (max-width: 1199px)',
        DESKTOP: '(min-width: 1200px)'
    }
};

// Animation
export const ANIMATION = {
    // Durations (in milliseconds)
    DURATIONS: {
        FAST: 150,
        NORMAL: 300,
        SLOW: 500,
        SLOWER: 750
    },
    
    // Easing functions
    EASING: {
        LINEAR: 'linear',
        EASE: 'ease',
        EASE_IN: 'ease-in',
        EASE_OUT: 'ease-out',
        EASE_IN_OUT: 'ease-in-out',
        CUSTOM_BEZIER: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    
    // Animation classes
    CLASSES: {
        FADE_IN: 'animate-fade-in',
        FADE_OUT: 'animate-fade-out',
        SLIDE_UP: 'animate-slide-up',
        SLIDE_DOWN: 'animate-slide-down',
        SLIDE_LEFT: 'animate-slide-left',
        SLIDE_RIGHT: 'animate-slide-right',
        SCALE_IN: 'animate-scale-in',
        SCALE_OUT: 'animate-scale-out',
        ROTATE: 'animate-rotate',
        PULSE: 'animate-pulse',
        BOUNCE: 'animate-bounce',
        SHAKE: 'animate-shake'
    }
};

// File Upload
export const FILE_UPLOAD = {
    // Allowed file types
    ALLOWED_TYPES: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    
    // Allowed extensions
    ALLOWED_EXTENSIONS: ['.pdf', '.doc', '.docx'],
    
    // File size limits (in bytes)
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    MIN_FILE_SIZE: 1024, // 1KB
    
    // Validation messages
    MESSAGES: {
        INVALID_TYPE: 'Please upload a PDF, DOC, or DOCX file',
        FILE_TOO_LARGE: 'File size must be less than 10MB',
        FILE_TOO_SMALL: 'File size must be at least 1KB',
        UPLOAD_SUCCESS: 'File uploaded successfully',
        UPLOAD_ERROR: 'Error uploading file'
    }
};

// API Configuration
export const API = {
    // Endpoints
    ENDPOINTS: {
        ANALYZE_RESUME: '/api/resume/analyze',
        UPLOAD_RESUME: '/api/resume/upload',
        GET_TEMPLATES: '/api/templates',
        GET_PRICING: '/api/pricing',
        SUBSCRIBE_NEWSLETTER: '/api/newsletter/subscribe',
        CONTACT_SALES: '/api/contact/sales',
        TRACK_EVENT: '/api/analytics/event'
    },
    
    // HTTP methods
    METHODS: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
        PATCH: 'PATCH'
    },
    
    // Status codes
    STATUS_CODES: {
        OK: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500
    },
    
    // Headers
    HEADERS: {
        CONTENT_TYPE: 'Content-Type',
        AUTHORIZATION: 'Authorization',
        ACCEPT: 'Accept',
        USER_AGENT: 'User-Agent'
    },
    
    // Timeouts (in milliseconds)
    TIMEOUTS: {
        DEFAULT: 10000,
        UPLOAD: 30000,
        ANALYSIS: 60000
    }
};

// Form Validation
export const VALIDATION = {
    // Email validation
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    
    // Password requirements
    PASSWORD: {
        MIN_LENGTH: 8,
        REQUIRE_UPPERCASE: true,
        REQUIRE_LOWERCASE: true,
        REQUIRE_NUMBERS: true,
        REQUIRE_SPECIAL_CHARS: true,
        SPECIAL_CHARS: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    },
    
    // Validation messages
    MESSAGES: {
        REQUIRED: 'This field is required',
        EMAIL_INVALID: 'Please enter a valid email address',
        PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long',
        PASSWORD_WEAK: 'Password must contain uppercase, lowercase, numbers, and special characters',
        NAME_INVALID: 'Please enter a valid name',
        PHONE_INVALID: 'Please enter a valid phone number'
    }
};

// Pricing Plans
export const PRICING = {
    // Plan types
    PLANS: {
        FREE: 'free',
        PRO: 'pro',
        ENTERPRISE: 'enterprise'
    },
    
    // Plan features
    FEATURES: {
        FREE: [
            'Basic resume analysis',
            '3 resume uploads per month',
            'Basic templates (5)',
            'Email support'
        ],
        PRO: [
            'Advanced AI analysis',
            'Unlimited resume uploads',
            'Premium templates (50+)',
            'ATS optimization',
            'Priority support',
            'Export to PDF & DOCX',
            'Industry insights'
        ],
        ENTERPRISE: [
            'Everything in Pro',
            'Team collaboration tools',
            'Advanced analytics dashboard',
            'Custom branding',
            'Dedicated account manager',
            'API access',
            'Custom integrations',
            'SLA guarantee'
        ]
    },
    
    // Pricing (in USD)
    PRICES: {
        FREE: 0,
        PRO_MONTHLY: 19,
        PRO_ANNUALLY: 15, // $180/year = $15/month
        ENTERPRISE: 'Custom'
    },
    
    // Billing cycles
    BILLING_CYCLES: {
        MONTHLY: 'monthly',
        ANNUALLY: 'annually'
    }
};

// Analytics Events
export const ANALYTICS_EVENTS = {
    // Page events
    PAGE_VIEW: 'page_view',
    PAGE_LEAVE: 'page_leave',
    
    // User interactions
    BUTTON_CLICK: 'button_click',
    LINK_CLICK: 'link_click',
    FORM_SUBMIT: 'form_submit',
    FORM_FIELD_FOCUS: 'form_field_focus',
    
    // Feature events
    FILE_UPLOAD: 'file_upload',
    RESUME_ANALYSIS: 'resume_analysis',
    TEMPLATE_DOWNLOAD: 'template_download',
    
    // Business events
    TRIAL_STARTED: 'trial_started',
    SUBSCRIPTION_STARTED: 'subscription_started',
    UPGRADE_CLICKED: 'upgrade_clicked',
    CONTACT_SALES: 'contact_sales',
    
    // Engagement events
    SCROLL_DEPTH: 'scroll_depth',
    TIME_ON_PAGE: 'time_on_page',
    VIDEO_PLAY: 'video_play',
    VIDEO_COMPLETE: 'video_complete'
};

// Error Messages
export const ERROR_MESSAGES = {
    // General errors
    GENERIC: 'Something went wrong. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
    TIMEOUT: 'Request timed out. Please try again.',
    
    // File upload errors
    FILE_TOO_LARGE: 'File size exceeds the maximum limit of 10MB.',
    INVALID_FILE_TYPE: 'Invalid file type. Please upload PDF, DOC, or DOCX.',
    UPLOAD_FAILED: 'Failed to upload file. Please try again.',
    
    // Form errors
    INVALID_EMAIL: 'Please enter a valid email address.',
    REQUIRED_FIELD: 'This field is required.',
    INVALID_PHONE: 'Please enter a valid phone number.',
    
    // API errors
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    FORBIDDEN: 'Access denied.',
    NOT_FOUND: 'The requested resource was not found.',
    SERVER_ERROR: 'Server error. Please try again later.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
    // File upload
    FILE_UPLOADED: 'File uploaded successfully!',
    RESUME_ANALYZED: 'Resume analysis completed!',
    
    // Form submissions
    CONTACT_SENT: 'Message sent successfully! We\'ll get back to you soon.',
    NEWSLETTER_SUBSCRIBED: 'Successfully subscribed to newsletter!',
    DEMO_SCHEDULED: 'Demo scheduled! We\'ll contact you shortly.',
    
    // Account actions
    TRIAL_STARTED: 'Free trial started! Enjoy full access for 14 days.',
    SUBSCRIPTION_UPDATED: 'Subscription updated successfully!',
    PASSWORD_RESET: 'Password reset link sent to your email.'
};

// Local Storage Keys
export const STORAGE_KEYS = {
    // User data
    USER_TOKEN: 'hunderedform_token',
    USER_EMAIL: 'hunderedform_email',
    USER_PLAN: 'hunderedform_plan',
    
    // App state
    THEME: 'hunderedform_theme',
    LANGUAGE: 'hunderedform_language',
    ONBOARDING_COMPLETED: 'hunderedform_onboarding_completed',
    
    // Analytics
    SESSION_ID: 'hunderedform_session_id',
    ANALYTICS_DATA: 'hunderedform_analytics',
    
    // Preferences
    NEWSLETTER_SUBSCRIBED: 'hunderedform_newsletter_subscribed',
    NOTIFICATIONS_ENABLED: 'hunderedform_notifications_enabled'
};

// Default Settings
export const DEFAULTS = {
    // App settings
    THEME: 'light',
    LANGUAGE: 'en',
    NOTIFICATIONS_ENABLED: true,
    
    // Animation settings
    ANIMATION_DURATION: 300,
    SCROLL_BEHAVIOR: 'smooth',
    
    // API settings
    API_TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
    
    // File upload settings
    CHUNK_SIZE: 1024 * 1024, // 1MB chunks
    SIMULTANEOUS_UPLOADS: 3
};

// Export all constants as a single object for convenience
export const CONSTANTS = {
    APP_CONFIG,
    COLORS,
    TYPOGRAPHY,
    SPACING,
    BREAKPOINTS,
    ANIMATION,
    FILE_UPLOAD,
    API,
    VALIDATION,
    PRICING,
    ANALYTICS_EVENTS,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    STORAGE_KEYS,
    DEFAULTS
};

// Make constants available globally for non-module usage
if (typeof window !== 'undefined') {
    window.HunderedformConstants = CONSTANTS;
}
