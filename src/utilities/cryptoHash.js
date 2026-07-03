import bcrypt from 'bcrypt';

export async function encrypt(data) {
    return await bcrypt.hash(data, 14);
}