import { supabase } from './supabase.js';

export async function getUser(user) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', user)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            return null;
        }
        console.error('Error in "getUser":', error);
        throw error;
    }
    return data;
}