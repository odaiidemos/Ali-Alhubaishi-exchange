// Add validation logic for login and signup forms

// Validate login form inputs
function validateLoginForm(username, password) {
    if (!username || username.trim() === '') {
        return 'اسم المستخدم مطلوب.';
    }
    if (!password || password.trim() === '') {
        return 'كلمة المرور مطلوبة.';
    }
    return null; // No errors
}

// Validate signup form inputs
function validateSignupForm(username, email, password) {
    if (!username || username.trim() === '') {
        return 'اسم المستخدم مطلوب.';
    }
    if (!email || email.trim() === '' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        return 'يرجى إدخال بريد إلكتروني صالح.';
    }
    if (!password || password.trim() === '' || password.length < 6) {
        return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.';
    }
    return null; // No errors
}

// Export validation functions for use in other scripts
export { validateLoginForm, validateSignupForm };
