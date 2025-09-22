export enum ClientClass {
  EXTERNAL = 'cliente_externo',
  INTERNAL = 'cliente_interno',
  BRANCH = 'sucursal',
}

/**
 * Representa a una empresa cliente en el dominio.
 */
export default interface Client {
  name: string;
  contactPerson: string;
  contactEmail: string;
  class: ClientClass;
}