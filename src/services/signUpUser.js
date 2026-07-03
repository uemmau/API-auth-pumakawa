import * as controllers from '../controllers/cIndex.js';
import * as utils from '../utilities/uIndex.js';
import * as services from './sIndex.js';

export async function signUserUp(user, pwd) {
    await utils.uniqueUserChk(user);
    const pwdHash = await utils.encrypt(pwd);
    await utils.postUser(user, pwdHash);
}

