export const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return '';

    const userStr = localStorage.getItem('budgetpro_user');
    let currency = 'INR';
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            if (user.currency) currency = user.currency;
        } catch (e) {
            console.error(e);
        }
    }

    const locales = {
        'INR': 'en-IN',
        'USD': 'en-US',
        'EUR': 'en-DE',
        'GBP': 'en-GB'
    };

    return Number(amount).toLocaleString(locales[currency] || 'en-US', {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 0
    });
};
