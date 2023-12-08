export const menuRol = Object.freeze({
  ADMINISTRADOR: [
    { name: 'Mapa', routerLink: '/mapa' },
    { name: 'Ingresar Institucion', routerLink: '/instituciones' },
    { name: 'Dashboard', routerLink: '/dashboard' },
    {
      name: 'Instituciones Sociales',
      routerLink: '/informacion-instituciones',
    },
  ],
  USUARIO_INVITADO: [
    {
      name: 'Instituciones Sociales',
      routerLink: '/informacion-instituciones',
    },
  ],
  USUARIO_GENERAL: [
    { name: 'Ingresar Institucion', routerLink: '/instituciones' },
  ],
});

export const menuNagivation = {
  ADMINISTRADOR: [
    { name: 'instituciones', routerLink: '/instituciones' },
    { name: 'mapa', routerLink: '/mapa' },
    { name: 'usuarios', routerLink: '/adminuser' },
  ],
  USUARIO_INVITADO: [],
  USUARIO_GENERAL: [
    { name: 'Ingresar Institucion', routerLink: '/instituciones' },
  ],
};
