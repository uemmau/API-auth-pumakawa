import { supabase } from './supabase.js';
import * as utils from './uIndex.js';

export async function postUser(user, pwd) {
    const givenId = utils.idGen();
    const { data, error } = await supabase
        .from('users')
        .insert([
            {
                id: givenId,
                username: user,
                password: pwd
            }
        ])

    if (error) {
        console.error('Error in "postUser":', error);
        throw error;
    }
    return data;
}