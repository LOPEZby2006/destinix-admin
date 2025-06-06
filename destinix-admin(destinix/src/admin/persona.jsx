import React, { useState, useEffect } from "react";
import {
    getPersonas,
    addPersona,
    updatePersona,
    deletePersona,
} from "../services/admin/api";

const Persona = () => {
    const [personas, setPersonas] = useState([]);
    const [formData, setFormData] = useState({
        nombre_usu: "",
        apellido_usu: "",
        tipo_documento: "",
        documento: "",
        email_usu: "",
        telefono_usu: "",
        genero: "",
        localidad: "",
        fecha_nacimiento: "",
        contraseña: "",
        id_seguridad: "",
        rol_idRol: "",
        foto_perfil: null,
    });
    const [editando, setEditando] = useState(null);

    const cargarPersonas = async () => {
        const data = await getPersonas();
        setPersonas(data);
    };

    useEffect(() => {
        cargarPersonas();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editando) {
            const { foto_perfil, ...sinFoto } = formData;
            await updatePersona(editando, sinFoto);
        } else {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });
            await addPersona(data);
        }

        setFormData({
            nombre_usu: "",
            apellido_usu: "",
            tipo_documento: "",
            documento: "",
            email_usu: "",
            telefono_usu: "",
            genero: "",
            localidad: "",
            fecha_nacimiento: "",
            contraseña: "",
            id_seguridad: "",
            rol_idRol: "",
            foto_perfil: null,
        });
        setEditando(null);
        cargarPersonas();
    };

    const handleEditar = (persona) => {
        setEditando(persona.id_persona);
        setFormData({
            nombre_usu: persona.nombre_usu,
            apellido_usu: persona.apellido_usu,
            tipo_documento: persona.tipo_documento,
            documento: persona.documento,
            email_usu: persona.email_usu,
            telefono_usu: persona.telefono_usu,
            genero: persona.genero,
            localidad: persona.localidad,
            fecha_nacimiento: persona.fecha_nacimiento,
            contraseña: "", // No mostramos contraseña actual
            id_seguridad: persona.id_seguridad,
            rol_idRol: persona.rol_idRol,
            foto_perfil: null, // Se actualiza solo si se carga nueva imagen
        });
    };

    const handleEliminar = async (id) => {
        await deletePersona(id);
        cargarPersonas();
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Gestión de Personas</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
                <input type="text" name="nombre_usu" placeholder="Nombre" value={formData.nombre_usu} onChange={handleChange} className="border p-2 rounded" required />
                <input type="text" name="apellido_usu" placeholder="Apellido" value={formData.apellido_usu} onChange={handleChange} className="border p-2 rounded" required />
                <input type="text" name="tipo_documento" placeholder="Tipo de Documento" value={formData.tipo_documento} onChange={handleChange} className="border p-2 rounded" required />
                <input type="text" name="documento" placeholder="Documento" value={formData.documento} onChange={handleChange} className="border p-2 rounded" required />
                <input type="email" name="email_usu" placeholder="Correo" value={formData.email_usu} onChange={handleChange} className="border p-2 rounded" required />
                <input type="text" name="telefono_usu" placeholder="Teléfono" value={formData.telefono_usu} onChange={handleChange} className="border p-2 rounded" required />
                <input type="text" name="genero" placeholder="Género" value={formData.genero} onChange={handleChange} className="border p-2 rounded" />
                <input type="text" name="localidad" placeholder="Localidad" value={formData.localidad} onChange={handleChange} className="border p-2 rounded" />
                <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} className="border p-2 rounded" />
                <input type="password" name="contraseña" placeholder="Contraseña" value={formData.contraseña} onChange={handleChange} className="border p-2 rounded" />
                <input type="number" name="id_seguridad" placeholder="ID Seguridad" value={formData.id_seguridad} onChange={handleChange} className="border p-2 rounded" />
                <input type="number" name="rol_idRol" placeholder="ID Rol" value={formData.rol_idRol} onChange={handleChange} className="border p-2 rounded" />
                <input type="file" name="foto_perfil" accept="image/*" onChange={handleChange} className="col-span-2 border p-2 rounded" />
                <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded">
                    {editando ? "Actualizar" : "Agregar"}
                </button>
            </form>

            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Nombre</th>
                        <th className="p-2 border">Documento</th>
                        <th className="p-2 border">Correo</th>
                        <th className="p-2 border">Teléfono</th>
                        <th className="p-2 border">Género</th>
                        <th className="p-2 border">Localidad</th>
                        <th className="p-2 border">Nacimiento</th>
                        <th className="p-2 border">Rol</th>
                        <th className="p-2 border">Foto</th>
                        <th className="p-2 border">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {personas.map((persona) => (
                        <tr key={persona.id_persona}>
                            <td className="p-2 border">{persona.id_persona}</td>
                            <td className="p-2 border">{persona.nombre_usu} {persona.apellido_usu}</td>
                            <td className="p-2 border">{persona.documento}</td>
                            <td className="p-2 border">{persona.email_usu}</td>
                            <td className="p-2 border">{persona.telefono_usu}</td>
                            <td className="p-2 border">{persona.genero}</td>
                            <td className="p-2 border">{persona.localidad}</td>
                            <td className="p-2 border">{persona.fecha_nacimiento}</td>
                            <td className="p-2 border">{persona.rol_idRol}</td>
                            <td className="p-2 border">
                                {persona.foto_perfil && (
                                    <img src={persona.foto_perfil} alt="perfil" className="w-14 h-14 rounded-full object-cover" />
                                )}
                            </td>
                            <td className="p-2 border">
                                <button onClick={() => handleEditar(persona)} className="bg-yellow-400 text-white px-2 py-1 mr-2 rounded">Editar</button>
                                <button onClick={() => handleEliminar(persona.id_persona)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Persona;
