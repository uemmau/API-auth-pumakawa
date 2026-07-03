import * as controllers from '../controllers/cIndex.js';
import * as utils from '../utilities/uIndex.js';
import * as services from '../services/sIndex.js';

export async function loginAuthentication(user, pwd) {
    const admin = await utils.getUser(user);
    if (admin) {
        await utils.verPwd(pwd, admin.password);
        services.jwtPayload(admin);
    }
}

