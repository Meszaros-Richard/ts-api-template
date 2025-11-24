const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const IsMatching = (a: any, b: any): boolean => {
    return a === b;
}

export const IsValidPassword = (password: string): boolean => {
    return passwordRegex.test(password);
}

export const IsValidEmail = (email: string): boolean => {
    return emailRegex.test(email);
}