import {getProductos, addProducto} from '../models/productoModel.js';

export const obtenerProductos = (req_prod, res_prod) => {
    getProductos((err, resultados) => {
        if (err) return req_prod.status(500).json({error: err.message});
        res_prod.json(resultados);
    });
};
export const crearProducto= (req_prod, respuesta_prod) => {
    const producto = req_prod.body;
    addProducto(producto, (err, resultado) => {
        if (err) return respuesta_prod.status(500).json({ error: err.message});
        respuesta_prod.json({ mensaje_prod: 'Producto Agregado', id:resultado.insertId});
    });
};