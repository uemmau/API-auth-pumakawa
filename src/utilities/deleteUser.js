import { supabase } from './supabase.js';

export async function deleteUser(id) {
    const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error in "deleteUser":', error);
        throw error;
    }
    return data;
}
