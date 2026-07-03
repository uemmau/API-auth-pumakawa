import app from '../../app.js';
import * as utils from '../utilities/uIndex.js';
import * as services from '../services/sIndex.js';


export function loginMenu(req, res) {
    res.json({ text: 'Log in with your username and password' });
}

export async function loginAuth(req, res) {
    const { user, pwd } = req.body;

    const admin = await utils.getUser(user);
    if (!admin) {
        return res.status(401).json({ text: 'Invalid credentials' });
    }

    const pwdChk = await utils.verPwd(pwd, admin.password);
    if (!pwdChk) {
        return res.status(401).json({ text: 'Invalid credentials' });
    }

    const token = services.jwtPayload(admin);

    res.json({ text: 'Login succesful', token });
}

