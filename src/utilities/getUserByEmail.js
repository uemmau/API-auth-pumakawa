import { supabase } from './supabase.js';

export async function getUserByEmail(email) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            return null; // Not found
        }
        console.error('Error in "getUserByEmail":', error);
        throw error;
    }
    return data;
}
