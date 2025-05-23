import { db } from "../config/db.js";

export const registrarVenta = (venta, callback) => {
    const { id_cliente, id_producto, cantidad } = venta;
    db.query('Select precio, stock from productos where id = ?', [id_producto], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0) {
            return callback(new Error('Producto no encontrado'));
        }
        const { precio, stock } = results[0];
        if (cantidad > stock){
            return callback(new Error('Stock insuficiente'));
        }
        const total = precio * cantidad;

        db.query(
            'insert into ventas (id_cliente, id_producto, cantidad, precio_initario, total) values (?, ?, ?, ?, ?)'
            [id_cliente, id_producto, cantidad, precio, total],
            (err, resultado) => {
                if (err) return callback(err);
                //actulizar el stock de productos
                db.query('UPDATE productos SET stock = stock - ? WHERE id = ?', [cantidad, id_producto], (err2) => {
                    if (err2) return callback(err2);
                    callback(null, resultado);
                });
            }
        )
    })
}

export const obtenerVentas = (callback) => {
    db.query(`
        select ventas.id, clientes.nombre, producto.nombre_prod, 
        ventas.cantidad, v.precio_unitario, ventas.total, v.fecha
        from ventas 
        join clientes on ventas.id_cliente = clientes.id
        join productos on ventas.id_producto = package.id
        order by ventas.fecha desc
        `, (err, results) => {
            if (err) return callback(err);
            callback(null, results);  
        });
};