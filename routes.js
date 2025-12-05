/**
 * Routing System
 * Handles page navigation and routing
 */

const routes = {
    '/': 'home',
    '/login': 'login',
    '/signup': 'signup',
    '/onboarding': 'onboarding',
    '/dashboard': 'dashboard',
    '/invoices': 'invoices',
    '/invoices/new': 'invoiceNew',
    '/invoices/:id': 'invoiceDetail',
    '/expenses': 'expenses',
    '/expenses/new': 'expenseNew',
    '/products': 'products',
    '/products/new': 'productNew',
    '/clients': 'clients',
    '/clients/new': 'clientNew',
    '/reports': 'reports',
    '/settings': 'settings'
};

let currentPage = 'home';
let isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

// Get current route
function getCurrentRoute() {
    const hash = window.location.hash.slice(1) || '/';
    return hash;
}

// Match route
function matchRoute(path) {
    for (const [pattern, page] of Object.entries(routes)) {
        if (pattern === path) {
            return { page, params: {} };
        }
        
        // Handle dynamic routes
        const patternParts = pattern.split('/');
        const pathParts = path.split('/');
        
        if (patternParts.length === pathParts.length) {
            const params = {};
            let matches = true;
            
            for (let i = 0; i < patternParts.length; i++) {
                if (patternParts[i].startsWith(':')) {
                    params[patternParts[i].slice(1)] = pathParts[i];
                } else if (patternParts[i] !== pathParts[i]) {
                    matches = false;
                    break;
                }
            }
            
            if (matches) {
                return { page, params };
            }
        }
    }
    
    return { page: 'home', params: {} };
}

// Navigate to route
function navigateTo(path) {
    window.location.hash = path;
    handleRoute();
}

// Handle route change
function handleRoute() {
    const route = getCurrentRoute();
    const { page, params } = matchRoute(route);
    
    // Check authentication for protected routes
    const protectedRoutes = ['dashboard', 'invoices', 'expenses', 'products', 'clients', 'reports', 'settings'];
    if (protectedRoutes.includes(page) && !isAuthenticated) {
        navigateTo('/login');
        return;
    }
    
    // Redirect authenticated users away from login/signup
    if ((page === 'login' || page === 'signup') && isAuthenticated) {
        navigateTo('/dashboard');
        return;
    }
    
    currentPage = page;
    loadPage(page, params);
    updateActiveNav();
}

// Update active navigation
function updateActiveNav() {
    // Update desktop nav
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Update mobile nav
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === currentPage) {
            item.classList.add('active');
        }
    });
}

// Initialize routing
function initRouting() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
}

// Export
window.router = {
    navigateTo,
    getCurrentRoute,
    currentPage,
    isAuthenticated: () => isAuthenticated,
    setAuthenticated: (value) => {
        isAuthenticated = value;
        localStorage.setItem('isAuthenticated', value);
    }
};

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRouting);
} else {
    initRouting();
}

