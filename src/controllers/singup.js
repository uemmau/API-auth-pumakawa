import app from '../../app.js';
import * as services from '../services/sIndex.js';

export function signupMenu(req, res) {
    res.json({ text: 'Choose a name and a password to sign in' });
}

export async function signupScript(req, res) {
    try {
        const { user, pwd } = req.body;
        await services.signUserUp(user, pwd);
        res.json({ text: 'User registered successfully' });
    } catch (err) {
        console.error('Error in signupScript:', err);
        res.status(500).json({ text: 'Error in "signupScript":', error: err.message || err });
    }
}

