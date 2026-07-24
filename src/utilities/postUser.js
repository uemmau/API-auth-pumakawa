import { supabase } from './supabase.js';
import * as utils from './uIndex.js';

export async function postUser(user, pwd, email, nombre, tokenValidacion) {
    const givenId = utils.idGen();
    const { data, error } = await supabase
        .from('users')
        .insert([
            {
                id: givenId,
                username: user,
                password: pwd,
                email: email,
                nombre: nombre,
                validado: false,
                tokenValidacion: tokenValidacion
            }
        ])

    if (error) {
        console.error('Error in "postUser":', error);
        throw error;
    }
    return data;
}