import { services } from '../constant/services';
import configureApi from '../utils/axios';
import { TokenService } from './token.service';

export class LogoutUser {
    constructor(
        private tokenService= new TokenService()
    ) {}

    async run(sessionId: string) {
        this.tokenService.delete();
        localStorage.clear();
        await configureApi().delete(`${services.users}/logout/${sessionId}`)
    }
}