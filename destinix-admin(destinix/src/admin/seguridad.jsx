import React, { useEffect, useState } from "react";
import {
    getSeguridad,
    addSeguridad,
    updateSeguridad,
    deleteSeguridad,
} from "../services/admin/api";

const Seguridad = () => {
    const [registros, setRegistros] = useState([]);
    const [email_usu, setEmailUsu] = useState("");
    const [contra_usu, setContraUsu] = useState("");
    const [token_reset, setTokenReset] = useState("");
    const [expira_reset, setExpiraReset] = useState("");
    const [verificado, setVerificado] = useState("");
    const [token_verificacion, setTokenVerificacion] = useState("");
    const [editando, setEditando] = useState(null);

    const cargarSeguridad = async () => {
        const data = await getSeguridad();
        setRegistros(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevoRegistro = {
            email_usu,
            contra_usu,
            token_reset,
            expira_reset,
            verificado,
            token_verificacion,
        };

        if (editando) {
            await updateSeguridad(editando, nuevoRegistro);
        } else {
            await addSeguridad(nuevoRegistro);
        }

        setEmailUsu("");
        setContraUsu("");
        setTokenReset("");
        setExpiraReset("");
        setVerificado("");
        setTokenVerificacion("");
        setEditando(null);
        cargarSeguridad();
    };

    const handleEditar = (registro) => {
        setEmailUsu(registro.email_usu);
        setContraUsu(registro.contra_usu);
        setTokenReset(registro.token_reset);
        setExpiraReset(registro.expira_reset);
        setVerificado(registro.verificado);
        setTokenVerificacion(registro.token_verificacion);
        setEditando(registro.id_seguridad);
    };

    const handleEliminar = async (id) => {
        await deleteSeguridad(id);
        cargarSeguridad();
    };

    useEffect(() => {
        cargarSeguridad();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Gestión de Seguridad</h2>

            <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-2 gap-2">
                <input
                    type="email"
                    value={email_usu}
                    onChange={(e) => setEmailUsu(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Email"
                />
                <input
                    type="text"
                    value={contra_usu}
                    onChange={(e) => setContraUsu(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Contraseña"
                />
                <input
                    type="text"
                    value={token_reset}
                    onChange={(e) => setTokenReset(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Token Reset"
                />
                <input
                    type="text"
                    value={expira_reset}
                    onChange={(e) => setExpiraReset(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Expira Reset"
                />
                <input
                    type="text"
                    value={verificado}
                    onChange={(e) => setVerificado(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Verificado"
                />
                <input
                    type="text"
                    value={token_verificacion}
                    onChange={(e) => setTokenVerificacion(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Token Verificación"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded col-span-2">
                    {editando ? "Actualizar" : "Agregar"}
                </button>
            </form>

            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Contraseña</th>
                        <th className="p-2 border">Token Reset</th>
                        <th className="p-2 border">Expira Reset</th>
                        <th className="p-2 border">Verificado</th>
                        <th className="p-2 border">Token Verificación</th>
                        <th className="p-2 border">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map((registro) => (
                        <tr key={registro.id_seguridad}>
                            <td className="p-2 border">{registro.id_seguridad}</td>
                            <td className="p-2 border">{registro.email_usu}</td>
                            <td className="p-2 border">{registro.contra_usu}</td>
                            <td className="p-2 border">{registro.token_reset}</td>
                            <td className="p-2 border">{registro.expira_reset}</td>
                            <td className="p-2 border">{registro.verificado}</td>
                            <td className="p-2 border">{registro.token_verificacion}</td>
                            <td className="p-2 border">
                                <button
                                    onClick={() => handleEditar(registro)}
                                    className="bg-yellow-400 text-white px-2 py-1 mr-2 rounded"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleEliminar(registro.id_seguridad)}
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

export default Seguridad;
