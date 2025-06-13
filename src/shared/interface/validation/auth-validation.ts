export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  success: boolean;
  errors: ValidationError[];
}

export function validateRegistrationInput(
    username: string,
    email: string, 
    password: string
): ValidationResult {
    const errors: ValidationError[] = [];

    if (!username || username.trim().length === 0) {
        errors.push({ field: 'username', message: 'Username is required' });
    } else if (username.trim().length < 2) {
        errors.push({ field: 'username', message: 'Username must be at least 2 characters' });
    } else if (username.trim().length > 50) {
        errors.push({ field: 'username', message: 'Username must be less than 50 characters' });
    } else if (!isValidUsername(username.trim())) {
        errors.push({ field: 'username', message: 'Username can only contain letters, numbers, and underscores' });
    }

    if (!email || email.trim().length === 0) {
        errors.push({ field: 'email', message: 'Email is required' });
    } else if (email.trim().length > 254) {
        errors.push({ field: 'email', message: 'Email must be less than 254 characters' });
    } else if (!isValidEmail(email.trim())) {
        errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }

    if (!password || password.length === 0) {
        errors.push({ field: 'password', message: 'Password is required' });
    } else if (password.length < 3) {
        errors.push({ field: 'password', message: 'Password must be at least 3 characters' });
    } else if (password.length > 128) {
        errors.push({ field: 'password', message: 'Password must be less than 128 characters' });
    }

    return {
        success: errors.length === 0,
        errors
    };
}

export function validateLoginInput(
    email: string,
    password: string  
): ValidationResult {
    const errors: ValidationError[] = [];

    if (!email || email.trim().length === 0) {
        errors.push({ field: 'email', message: 'Email is required' });
    } else if (!isValidEmail(email.trim())) {
        errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }

    if (!password || password.length === 0) {
        errors.push({ field: 'password', message: 'Password is required' });
    }

    return {
        success: errors.length === 0,
        errors
    };
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
}

function isValidUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return usernameRegex.test(username);
}
