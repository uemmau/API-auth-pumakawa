import * as controllers from '../controllers/cIndex.js';
import * as utils from '../utilities/uIndex.js';
import * as services from '../services/sIndex.js';
import { supabase } from '../utilities/supabase.js';

export async function deleteUser(id, user) {
    await utils.userMatchChk(id, user);
    const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)
    
    if (error) {
        console.log('Error in "deleteUser":', error);
        throw error
    }
    return data;
}