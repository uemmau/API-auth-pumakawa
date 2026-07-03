import app from '../../app.js';
import * as services from '../services/sIndex.js';

export function deleteMenu(req, res) {
    res.json({ text: 'Enter the username and ID of the user to delete' });
}

export async function deleteScript(req, res) {
    try {
        const { id, user } = req.body;
        await services.deleteUser(id, user);
        res.json({ text: 'User deleted successfully' });
    } catch (err) {
        console.error('Error in "deleteScript":', err);
        res.status(500).json({ text: 'Error in "deleteScript":', error: err.message || err })
    }
}