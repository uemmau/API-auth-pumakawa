import { supabase } from './supabase.js';

export async function userMatchChk(id, user) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .eq('username', user)
        .single();  
        
    if (error) {
        if (error.code === 'PGRST116') {
            throw new Error('User-ID mismatch');
        }
        console.error('Error in "userMatchChk":', error);
        throw error;
    }

    if (!data) {
        throw new Error('User-ID mismatch');
    }

    return data;
}