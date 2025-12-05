/**
 * Utility Functions
 * Helper functions for the application
 */

// Persian number conversion
const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function toPersianNumber(num) {
    if (typeof num !== 'string') num = String(num);
    return num.replace(/\d/g, (w) => persianNumbers[+w]);
}

function toEnglishNumber(str) {
    return str.replace(/[۰-۹]/g, (w) => englishNumbers[persianNumbers.indexOf(w)]);
}

// Format currency
function formatCurrency(amount, currency = 'IRR') {
    const formatted = new Intl.NumberFormat('fa-IR').format(amount);
    const currencySymbols = {
        'IRR': 'ریال',
        'AFN': 'افغانی',
        'USD': '$',
        'EUR': '€'
    };
    return `${toPersianNumber(formatted)} ${currencySymbols[currency] || currency}`;
}

// Format date (Jalali)
function formatJalaliDate(date) {
    if (!date) return '';
    const d = new Date(date);
    // Simple Jalali conversion (for demo purposes)
    // In production, use a proper Jalali date library
    const jalali = gregorianToJalali(d.getFullYear(), d.getMonth() + 1, d.getDate());
    return `${toPersianNumber(jalali[0])}/${toPersianNumber(String(jalali[1]).padStart(2, '0'))}/${toPersianNumber(String(jalali[2]).padStart(2, '0'))}`;
}

// Simple Gregorian to Jalali conversion
function gregorianToJalali(gy, gm, gd) {
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let jy = (gy <= 1600) ? 0 : 979;
    gy -= (gy <= 1600) ? 621 : 1600;
    const gy2 = (gm > 2) ? (gy + 1) : gy;
    let days = (365 * gy) + (parseInt((gy2 + 3) / 4)) - (parseInt((gy2 + 99) / 100)) + (parseInt((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
    jy += 33 * (parseInt(days / 12053));
    days %= 12053;
    jy += 4 * (parseInt(days / 1461));
    days %= 1461;
    jy += parseInt((days - 1) / 365);
    if (days > 365) days = (days - 1) % 365;
    const jm = (days < 186) ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30);
    const jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
    return [jy, jm, jd];
}

// Get current Jalali date
function getCurrentJalaliDate() {
    const now = new Date();
    return gregorianToJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

// Show toast notification
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button class="modal-close" onclick="this.parentElement.remove()" style="margin-right: auto;">&times;</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastSlideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Show loading overlay
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.classList.add('active');
}

// Hide loading overlay
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.classList.remove('active');
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone (Persian format)
function validatePhone(phone) {
    const re = /^(\+98|0)?9\d{9}$/;
    return re.test(toEnglishNumber(phone));
}

// Get form data
function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    return data;
}

// Set form data
function setFormData(form, data) {
    Object.keys(data).forEach(key => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) {
            if (input.type === 'checkbox') {
                input.checked = data[key];
            } else {
                input.value = data[key];
            }
        }
    });
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 بایت';
    const k = 1024;
    const sizes = ['بایت', 'کیلوبایت', 'مگابایت', 'گیگابایت'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return toPersianNumber(Math.round(bytes / Math.pow(k, i) * 100) / 100) + ' ' + sizes[i];
}

// Copy to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('کپی شد', 'success');
    } catch (err) {
        showToast('خطا در کپی', 'error');
    }
}

// Download as JSON
function downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

// Check online/offline status
function updateOfflineStatus() {
    const indicator = document.getElementById('offlineIndicator');
    if (!indicator) return;

    if (navigator.onLine) {
        indicator.classList.remove('offline');
        indicator.title = 'آنلاین';
    } else {
        indicator.classList.add('offline');
        indicator.title = 'آفلاین';
    }
}

// Initialize offline status
window.addEventListener('online', updateOfflineStatus);
window.addEventListener('offline', updateOfflineStatus);
updateOfflineStatus();

// Export utilities to window
window.utils = {
    toPersianNumber,
    toEnglishNumber,
    formatCurrency,
    formatJalaliDate,
    getCurrentJalaliDate,
    showToast,
    showLoading,
    hideLoading,
    debounce,
    generateId,
    validateEmail,
    validatePhone,
    getFormData,
    setFormData,
    formatFileSize,
    copyToClipboard,
    downloadJSON,
    updateOfflineStatus
};

