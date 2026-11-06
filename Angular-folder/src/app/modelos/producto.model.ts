export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    imagen: string;
    peso: number;
    cantidadKilos?: number; // Cantidad en kilos, opcional
}
