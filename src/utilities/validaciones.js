export function validarPassword(password) {
    const errores = [];
    if (!password || typeof password !== 'string') {
        errores.push('La contraseña es obligatoria');
        return errores;
    }
    if (password.length < 8) errores.push('La contraseña debe tener al menos 8 caracteres');
    if (password.length > 30) errores.push('La contraseña no puede superar los 30 caracteres');
    if (!/[A-Z]/.test(password)) errores.push('Debe tener al menos una letra mayúscula');
    if (!/[a-z]/.test(password)) errores.push('Debe tener al menos una letra minúscula');
    if (!/[0-9]/.test(password)) errores.push('Debe tener al menos un número');
    if (!/[!@#$%^&*(),.?":{}|<>_\-]/.test(password)) errores.push('Debe tener al menos un carácter especial');
    if (/\s/.test(password)) errores.push('No puede contener espacios');
    return errores;
}

export function validarRegistro(usuario, password, nombre, email) {
    const errores = [];
    
    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
        errores.push('Debes proporcionar un email válido');
    }
    
    if (!usuario || typeof usuario !== 'string') {
        errores.push('El usuario es obligatorio');
    } else {
        if (usuario.length < 3) errores.push('El usuario debe tener al menos 3 caracteres');
        if (usuario.length > 30) errores.push('El usuario no puede superar los 30 caracteres');
        if (!/^[a-zA-Z0-9_]+$/.test(usuario)) {
            errores.push('El usuario solo puede contener letras, números y guion bajo (_)');
        }
    }
    errores.push(...validarPassword(password));
    if (nombre && nombre.length > 30) {
        errores.push('El nombre no puede superar los 30 caracteres');
    }
    return errores;
}
