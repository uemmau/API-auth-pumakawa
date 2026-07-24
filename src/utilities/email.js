export const enviarCorreoValidacion = async (email, nombre, token) => {
    const urlValidacion = `http://localhost:${process.env.PORT || 3000}/auth/validar/${token}`;
    
    // Simulación de envío de correo en consola ya que no podemos usar nodemailer
    console.log('=============================================');
    console.log(`[SIMULACIÓN DE EMAIL] PARA: ${email}`);
    console.log(`ASUNTO: ¡Bienvenido a Pumakawa! Valida tu cuenta`);
    console.log(`MENSAJE: ¡Bienvenido ${nombre}! Por favor valida tu cuenta.`);
    console.log(`Enlace de validación: ${urlValidacion}`);
    console.log(`Token: ${token}`);
    console.log('=============================================');
};

export const enviarAlertaLogin = async (email, nombre) => {
    console.log('=============================================');
    console.log(`[SIMULACIÓN DE ALERTA] PARA: ${email}`);
    console.log(`ASUNTO: Alerta de Seguridad: Nuevo inicio de sesión`);
    console.log(`MENSAJE: Hola ${nombre}, se acaba de iniciar sesión en tu cuenta de Pumakawa.`);
    console.log('=============================================');
};
