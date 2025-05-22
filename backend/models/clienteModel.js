import {db} from '../config/db.js';

export const getClientes = (callback) => {
    db.query('select * from clientes', callback);
};
export const addCliente = (cliente, callback) => {
    db.query('insert into clientes set ?', cliente, callback);
};