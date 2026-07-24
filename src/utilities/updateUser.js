import { supabase } from './supabase.js';

export async function updateUser(id, updates) {
    const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error in "updateUser":', error);
        throw error;
    }
    return data;
}
