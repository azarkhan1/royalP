/**
 * Sample Data
 * Mock data for demonstration
 */

// Sample invoices
let invoices = JSON.parse(localStorage.getItem('invoices')) || [
    {
        id: '1',
        number: 'INV-001',
        clientId: '1',
        clientName: 'شرکت نمونه',
        date: '2024-01-15',
        dueDate: '2024-02-15',
        items: [
            { name: 'خدمات مشاوره', quantity: 10, price: 500000, total: 5000000 },
            { name: 'طراحی وب', quantity: 1, price: 2000000, total: 2000000 }
        ],
        subtotal: 7000000,
        tax: 1050000,
        total: 8050000,
        status: 'paid',
        currency: 'IRR'
    },
    {
        id: '2',
        number: 'INV-002',
        clientId: '2',
        clientName: 'فروشگاه آنلاین',
        date: '2024-01-20',
        dueDate: '2024-02-20',
        items: [
            { name: 'توسعه اپلیکیشن', quantity: 1, price: 5000000, total: 5000000 }
        ],
        subtotal: 5000000,
        tax: 750000,
        total: 5750000,
        status: 'pending',
        currency: 'IRR'
    }
];

// Sample expenses
let expenses = JSON.parse(localStorage.getItem('expenses')) || [
    {
        id: '1',
        category: 'اداری',
        description: 'خرید کاغذ و لوازم التحریر',
        amount: 500000,
        date: '2024-01-10',
        currency: 'IRR',
        receipt: null
    },
    {
        id: '2',
        category: 'نرم‌افزار',
        description: 'اشتراک سرویس ابری',
        amount: 2000000,
        date: '2024-01-05',
        currency: 'IRR',
        receipt: null
    },
    {
        id: '3',
        category: 'سفر',
        description: 'هزینه سفر کاری',
        amount: 3000000,
        date: '2024-01-12',
        currency: 'IRR',
        receipt: null
    }
];

// Sample clients
let clients = JSON.parse(localStorage.getItem('clients')) || [
    {
        id: '1',
        name: 'شرکت نمونه',
        email: 'info@example.com',
        phone: '09123456789',
        address: 'تهران، خیابان نمونه',
        taxId: '1234567890',
        currency: 'IRR',
        createdAt: '2024-01-01'
    },
    {
        id: '2',
        name: 'فروشگاه آنلاین',
        email: 'contact@shop.com',
        phone: '09187654321',
        address: 'اصفهان، خیابان اصلی',
        taxId: '0987654321',
        currency: 'IRR',
        createdAt: '2024-01-05'
    }
];

// Sample products
let products = JSON.parse(localStorage.getItem('products')) || [
    {
        id: '1',
        name: 'خدمات مشاوره',
        description: 'مشاوره تخصصی در زمینه کسب و کار',
        price: 500000,
        unit: 'ساعت',
        category: 'خدمات',
        currency: 'IRR',
        taxRate: 9
    },
    {
        id: '2',
        name: 'طراحی وب',
        description: 'طراحی و توسعه وبسایت',
        price: 2000000,
        unit: 'پروژه',
        category: 'خدمات',
        currency: 'IRR',
        taxRate: 9
    },
    {
        id: '3',
        name: 'توسعه اپلیکیشن',
        description: 'توسعه اپلیکیشن موبایل',
        price: 5000000,
        unit: 'پروژه',
        category: 'خدمات',
        currency: 'IRR',
        taxRate: 9
    }
];

// Expense categories
const expenseCategories = [
    'اداری',
    'نرم‌افزار',
    'سخت‌افزار',
    'سفر',
    'بازاریابی',
    'حقوق',
    'اجاره',
    'آب و برق',
    'اینترنت',
    'سایر'
];

// Product categories
const productCategories = [
    'خدمات',
    'محصولات دیجیتال',
    'مشاوره',
    'آموزش',
    'سایر'
];

// Currency options
const currencies = [
    { code: 'IRR', name: 'ریال ایران', symbol: 'ریال' },
    { code: 'AFN', name: 'افغانی', symbol: 'افغانی' },
    { code: 'USD', name: 'دلار آمریکا', symbol: '$' },
    { code: 'EUR', name: 'یورو', symbol: '€' }
];

// User settings
let userSettings = JSON.parse(localStorage.getItem('userSettings')) || {
    theme: 'light',
    currency: 'IRR',
    language: 'fa',
    taxRate: 9,
    companyName: 'شرکت من',
    companyAddress: '',
    companyPhone: '',
    companyEmail: '',
    companyTaxId: ''
};

// Save data to localStorage
function saveData() {
    localStorage.setItem('invoices', JSON.stringify(invoices));
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('clients', JSON.stringify(clients));
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
}

// Export data
window.dataStore = {
    invoices,
    expenses,
    clients,
    products,
    expenseCategories,
    productCategories,
    currencies,
    userSettings,
    saveData
};

