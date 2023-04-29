  export function validateEmail(email: string): boolean {
    const matches = [...email.matchAll(/\w+[-_]?@\w+[-_]?.\w+/g)];
    return matches.length === 1 ? true : false;
  }

  export function validatePassword(password: string): boolean {
    const matches = [...password.matchAll(/^(?!.*[#!])(?=.*[A-Z])(?=.*[0-9]).{9,}$/g)];
    return matches.length === 1 ? true : false;
  }