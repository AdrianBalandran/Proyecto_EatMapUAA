export interface Pedido {
    id_usuario: number; 
    id_cafeteria: number; 
    id_sucursal: number; 
    orden: number; 
    pagado: Boolean; 
    tiempo: number; 
    tipo_de_pago: string; 
}
