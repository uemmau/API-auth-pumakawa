import * as utils from './uIndex.js';

export async function uniqueUserChk(username) {
    const exists = await utils.getUser(username);

    if (exists) {
        throw new Error('Username in use');
    }
}