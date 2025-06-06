import React, { useEffect, useState } from "react";
import {
    getRol,
    addRol,
    updateRol,
    deleteRol,
} from "../services/admin/api";

const Rol = () => {
    const [registros, setRegistros] = useState([]);
    const [Tipo_Rol, setTipoRol] = useState("");
    const [editando, setEditando] = useState(null);

    const cargarRoles = async () => {
        const data = await getRol();
        setRegistros(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevoRegistro = { Tipo_Rol };

        if (editando) {
            await updateRol(editando, nuevoRegistro);
        } else {
            await addRol(nuevoRegistro);
        }

        setTipoRol("");
        setEditando(null);
        cargarRoles();
    };

    const handleEditar = (registro) => {
        setTipoRol(registro.Tipo_Rol);
        setEditando(registro.idRol);
    };

    const handleEliminar = async (id) => {
        await deleteRol(id);
        cargarRoles();
    };

    useEffect(() => {
        cargarRoles();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Gestión de Roles</h2>

            <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
                <input
                    type="text"
                    value={Tipo_Rol}
                    onChange={(e) => setTipoRol(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Tipo de Rol"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    {editando ? "Actualizar" : "Agregar"}
                </button>
            </form>

            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Tipo de Rol</th>
                        <th className="p-2 border">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map((registro) => (
                        <tr key={registro.idRol}>
                            <td className="p-2 border">{registro.idRol}</td>
                            <td className="p-2 border">{registro.Tipo_Rol}</td>
                            <td className="p-2 border">
                                <button
                                    onClick={() => handleEditar(registro)}
                                    className="bg-yellow-400 text-white px-2 py-1 mr-2 rounded"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleEliminar(registro.idRol)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Rol;
