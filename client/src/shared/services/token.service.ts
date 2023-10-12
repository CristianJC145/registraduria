export class TokenService {
    private tokenKey = 'token';

    get(): string | boolean {
        const token = localStorage.getItem(this.tokenKey);

        if (token) {
            return token;
        }

        return false;
    }

    set(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    delete() {
        localStorage.removeItem(this.tokenKey);
    }
}