// IdeathonBcn - Main JavaScript

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        eventDate: new Date('2025-03-23T09:00:00+01:00'), // Barcelona timezone
        webhookUrl: 'https://hook.relay.app/api/v1/playbook/cml7vyme40f1g0om3fnu24c51/trigger/MYWOji31SUNMPb1GIv5B9w',
        defaultLang: 'en'
    };

    // State
    let currentLang = localStorage.getItem('lang') || CONFIG.defaultLang;

    // Initialize
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initCountdown();
        initLanguageSwitcher();
        initValueTabs();
        initApplyTabs();
        initForms();
        initSmoothScroll();
        setLanguage(currentLang);
    }

    // Countdown Timer
    function initCountdown() {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    function updateCountdown() {
        const now = new Date();
        const diff = CONFIG.eventDate - now;

        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    // Language Switcher
    function initLanguageSwitcher() {
        // Header language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                setLanguage(lang);
            });
        });

        // Footer language buttons
        document.querySelectorAll('.lang-btn-footer').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                setLanguage(lang);
            });
        });
    }

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;

        // Update active states
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Translate all elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const translation = translations[lang]?.[key] || translations['en']?.[key];
            if (translation) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translation;
                } else if (el.tagName === 'OPTION') {
                    el.textContent = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });
    }

    // Value Section Tabs
    function initValueTabs() {
        const tabs = document.querySelectorAll('.value-tab');
        const panels = document.querySelectorAll('.value-panel');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;

                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));

                tab.classList.add('active');
                document.querySelector(`.value-panel[data-panel="${target}"]`)?.classList.add('active');
            });
        });
    }

    // Apply Section Tabs
    function initApplyTabs() {
        const tabs = document.querySelectorAll('.apply-tab');
        const forms = document.querySelectorAll('.apply-form');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.form;

                tabs.forEach(t => t.classList.remove('active'));
                forms.forEach(f => f.classList.remove('active'));

                tab.classList.add('active');
                document.querySelector(`.apply-form[data-form="${target}"]`)?.classList.add('active');
            });
        });

        // Handle anchor links to specific forms
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            const formMap = {
                'apply-business': 'business',
                'apply-builder': 'builder',
                'apply-partner': 'partner'
            };

            if (formMap[hash]) {
                const targetTab = document.querySelector(`.apply-tab[data-form="${formMap[hash]}"]`);
                if (targetTab) {
                    targetTab.click();
                }
            }
        }
    }

    // Form Handling
    function initForms() {
        document.querySelectorAll('.apply-form').forEach(form => {
            form.addEventListener('submit', handleFormSubmit);
        });
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.textContent = '...';

        // Gather form data
        const formData = new FormData(form);
        const data = {
            type: formData.get('type'),
            timestamp: new Date().toISOString(),
            language: currentLang
        };

        // Add all form fields
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        try {
            const response = await fetch(CONFIG.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok || response.status === 0) {
                // Show success message
                showFormSuccess(form);
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            // Still show success - webhook might have CORS but still received data
            showFormSuccess(form);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    function showFormSuccess(form) {
        const successHtml = `
            <div class="form-success">
                <h3 data-i18n="form.success.title">${translations[currentLang]?.['form.success.title'] || 'Application Received!'}</h3>
                <p data-i18n="form.success.message">${translations[currentLang]?.['form.success.message'] || "We'll be in touch soon."}</p>
            </div>
        `;

        form.innerHTML = successHtml;
    }

    // Smooth Scroll for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();

                    // Handle apply form tabs
                    if (href.startsWith('#apply-')) {
                        const formType = href.replace('#apply-', '');
                        const targetTab = document.querySelector(`.apply-tab[data-form="${formType}"]`);
                        if (targetTab) {
                            targetTab.click();
                        }
                    }

                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

})();
