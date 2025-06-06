import React, { useEffect, useState } from "react";
import {
    getReservas,
    addReserva,
    updateReserva,
    deleteReserva,
} from "../services/admin/api";

const Reserva = () => {
    const [reservas, setReservas] = useState([]);
    const [formData, setFormData] = useState({
        fecha_reserva: "",
        fecha_visita: "",
        cantidad_personas: "",
        restaurante_id: "",
        sitio_id: "",
        hotel_id: "",
        estado_id: "",
        empresa_id: "",
        id_itinerario: ""
    });
    const [editando, setEditando] = useState(null);

    const cargarReservas = async () => {
        const data = await getReservas();
        setReservas(data);
    };

    useEffect(() => {
        cargarReservas();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editando) {
            await updateReserva(editando, formData);
        } else {
            await addReserva(formData);
        }
        setFormData({
            fecha_reserva: "",
            fecha_visita: "",
            cantidad_personas: "",
            restaurante_id: "",
            sitio_id: "",
            hotel_id: "",
            estado_id: "",
            empresa_id: "",
            id_itinerario: ""
        });
        setEditando(null);
        cargarReservas();
    };

    const handleEditar = (reserva) => {
        setEditando(reserva.id_reserva);
        setFormData({
            fecha_reserva: reserva.fecha_reserva,
            fecha_visita: reserva.fecha_visita,
            cantidad_personas: reserva.cantidad_personas,
            restaurante_id: reserva.restaurante_id,
            sitio_id: reserva.sitio_id,
            hotel_id: reserva.hotel_id,
            estado_id: reserva.estado_id,
            empresa_id: reserva.empresa_id,
            id_itinerario: reserva.id_itinerario,
        });
    };

    const handleEliminar = async (id) => {
        await deleteReserva(id);
        cargarReservas();
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Gestión de Reservas</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-4">
                <input name="fecha_reserva" type="date" value={formData.fecha_reserva} onChange={handleChange} className="border p-2 rounded" required />
                <input name="fecha_visita" type="date" value={formData.fecha_visita} onChange={handleChange} className="border p-2 rounded" required />
                <input name="cantidad_personas" type="number" value={formData.cantidad_personas} onChange={handleChange} className="border p-2 rounded" required />
                <input name="restaurante_id" type="number" value={formData.restaurante_id} onChange={handleChange} className="border p-2 rounded" />
                <input name="sitio_id" type="number" value={formData.sitio_id} onChange={handleChange} className="border p-2 rounded" />
                <input name="hotel_id" type="number" value={formData.hotel_id} onChange={handleChange} className="border p-2 rounded" />
                <input name="estado_id" type="number" value={formData.estado_id} onChange={handleChange} className="border p-2 rounded" required />
                <input name="empresa_id" type="number" value={formData.empresa_id} onChange={handleChange} className="border p-2 rounded" required />
                <input name="id_itinerario" type="number" value={formData.id_itinerario} onChange={handleChange} className="border p-2 rounded" />

                <button type="submit" className="col-span-2 bg-blue-500 text-white py-2 rounded">
                    {editando ? "Actualizar" : "Agregar"}
                </button>
            </form>

            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Fecha Reserva</th>
                        <th className="p-2 border">Fecha Visita</th>
                        <th className="p-2 border">Personas</th>
                        <th className="p-2 border">Restaurante</th>
                        <th className="p-2 border">Sitio</th>
                        <th className="p-2 border">Hotel</th>
                        <th className="p-2 border">Estado</th>
                        <th className="p-2 border">Empresa</th>
                        <th className="p-2 border">Itinerario</th>
                        <th className="p-2 border">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map((reserva) => (
                        <tr key={reserva.id_reserva}>
                            <td className="p-2 border">{reserva.id_reserva}</td>
                            <td className="p-2 border">{reserva.fecha_reserva}</td>
                            <td className="p-2 border">{reserva.fecha_visita}</td>
                            <td className="p-2 border">{reserva.cantidad_personas}</td>
                            <td className="p-2 border">{reserva.restaurante_id}</td>
                            <td className="p-2 border">{reserva.sitio_id}</td>
                            <td className="p-2 border">{reserva.hotel_id}</td>
                            <td className="p-2 border">{reserva.estado_id}</td>
                            <td className="p-2 border">{reserva.empresa_id}</td>
                            <td className="p-2 border">{reserva.id_itinerario}</td>
                            <td className="p-2 border">
                                <button onClick={() => handleEditar(reserva)} className="bg-yellow-400 text-white px-2 py-1 mr-2 rounded">Editar</button>
                                <button onClick={() => handleEliminar(reserva.id_reserva)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reserva;
