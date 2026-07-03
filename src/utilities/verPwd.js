import bcrypt from 'bcrypt';

export async function verPwd(pwd, pwdHash) {
    const valid = await bcrypt.compare(pwd, pwdHash);
    if (!valid) {
        console.error("Invalid password");
        return false;
    }
    return true;
}
