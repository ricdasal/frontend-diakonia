export const menuRol = Object.freeze({
  ADMINISTRADOR: [
    { name: 'Mapa', routerLink: '/mapa' },
    { name: 'Instituciones Sociales', routerLink: '/instituciones' },
    { name: 'Dashboard', routerLink: '/dashboard' },
    {
      name: 'Instituciones Invitado',
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
    { name: 'Instituciones', routerLink: '/instituciones' },
  ],
});

export const menuNagivation = {
  ADMINISTRADOR: [
    { name: 'Instituciones', routerLink: '/instituciones' },
    { name: 'Mapa', routerLink: '/mapa' },
    { name: 'Usuarios', routerLink: '/adminuser' },
  ],
  USUARIO_INVITADO: [],
  USUARIO_GENERAL: [
    { name: 'Instituciones', routerLink: '/instituciones' },
  ],
};
