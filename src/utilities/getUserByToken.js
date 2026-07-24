import { supabase } from './supabase.js';

export async function getUserByToken(token) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('tokenValidacion', token)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            return null; // Not found
        }
        console.error('Error in "getUserByToken":', error);
        throw error;
    }
    return data;
}
