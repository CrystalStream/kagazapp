export function parseError(error): IError {
  let message: string;
  if (error.error.error.message) {
    switch (error.error.error.message) {
      case 'INVALID_EMAIL':
        message = 'Email incorrecto! \nPorfavor corrige e intenta de nuevo'
        break;

      case 'INVALID_PASSWORD':
        message = 'Password incorrecto! \nPorfavor corrige e intenta de nuevo'
        break;

      case 'EMAIL_NOT_FOUND':
        message = 'No se han encontrado datos con esas credenciales!'
        break;

      case 'EMAIL_EXISTS':
        message = 'El email ya registrado! Intenta con un nuevo email'
        break;

      case 'MISSING_PASSWORD':
        message = 'Contraseña no valida! Ingresa una contraseña valida para tu cuenta'
        break;
    
      default:
        message = 'Error del servidor! \nContacta al administrador';
        break;
    }
  }
  return {
    status: error.status,
    statusText: error.statusText,
    message: message
  }
}