export interface Institucion {
  id: number;
  nombre: string;
  representante_legal: string;
  ruc: string;
  numero_beneficiarios: number;
  created_at: string;
  updated_at: string;
  actividades: Actividad[];
  caracterizacion: Caracterizacion[];
  sectorizacion: Sectorizacion[];
  tipos_poblacion: TiposPoblacion[];
  estado: Estado[];
  direccion: Direccion[];
  red_bda: RedBda[];
  contactos: Contacto[];
  clasificacion: Clasificacion[];
}

export interface Actividad {
  id: number;
  nombre_actividad: string;
}

export interface Caracterizacion {
  id: number;
  nombre_caracterizacion: string;
}

export interface Sectorizacion {
  id: number;
  nombre_sectorizacion: string;
}

export interface TiposPoblacion {
  id: number;
  tipo_poblacion: string;
  institucion_id: number;
}

export interface Estado {
  id: number;
  nombre_estado: string;
  institucion_id: number;
}

export interface Direccion {
  id: number;
  direccion_nombre: string;
  url_direccion: string;
  latitud: string;
  longitud: string;
  institucion_id: number;
}

export interface RedBda {
  id: number;
  mes_ingreso: string;
  anio_ingreso: number;
  institucion_id: number;
}

export interface Contacto {
  id: number;
  nombre: string;
  apellido: string;
  institucion_id: number;
  created_at: string;
  updated_at: string;
  correos: Correo[];
  telefonos: Telefono[];
}

export interface Correo {
  id: number;
  correo_contacto: string;
}

export interface Telefono {
  id: number;
  telefono_contacto: string;
}

export interface Clasificacion {
  id: number;
  nombre_clasificacion: string;
  condicion: boolean;
  institucion_id: number;
}
