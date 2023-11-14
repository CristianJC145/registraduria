export class TokenLtiService {
    private tokenKey = 'ltik';
  
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
  
    delete(): void {
        localStorage.removeItem(this.tokenKey);
    }
}