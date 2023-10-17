import { TokenService } from './token.service';

export class LogoutUser {
    constructor(
        private tokenService= new TokenService('%jg1!#h%2wl33$v=l!y^74xg2mghgr4^li3$_c+*3dd(wp6_9=')
    ) {}

    run() {
        this.tokenService.delete();
        localStorage.clear();
    }
}