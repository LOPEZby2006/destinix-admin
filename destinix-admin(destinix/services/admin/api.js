const CALIFICACION_URL = "http://localhost/destinix/calificacion.php";

export const getCalificaciones = async () => {
    const response = await fetch(CALIFICACION_URL);
    return await response.json();
};

export const addCalificacion = async (puntuacion) => {
    const formData = new FormData();
    formData.append("puntuacion", puntuacion);

    const response = await fetch(CALIFICACION_URL, {
        method: "POST",
        body: formData,
    });
    return await response.json();
};

export const updateCalificacion = async (id, puntuacion) => {
    const response = await fetch(CALIFICACION_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_calificacion: id, puntuacion }),
    });
    return await response.json();
};

export const deleteCalificacion = async (id) => {
    const response = await fetch(`${CALIFICACION_URL}?id=${id}`, {
        method: "DELETE",
    });
    return await response.json();
};

const CATEGORIA_URL = "http://localhost/destinix/categoria.php";


export const getCategoria = async () => {
    const response = await fetch(CATEGORIA_URL);
    return await response.json();
};


export const addCategoria = async (nombre_cate, desc_cate) => {
    const formData = new FormData();
    formData.append("nombre_cate", nombre_cate);
    formData.append("desc_cate", desc_cate);

    const response = await fetch(CATEGORIA_URL, {
        method: "POST",
        body: formData,
    });
    return await response.json();
};


export const updateCategoria = async (id, nombre_cate, desc_cate) => {
    const response = await fetch(CATEGORIA_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id_categoria: id,
            nombre_cate,
            desc_cate,
        }),
    });
    return await response.json();
};


export const deleteCategoria = async (id) => {
    const response = await fetch(`${CATEGORIA_URL}?id=${id}`, {
        method: "DELETE",
    });
    return await response.json();
};

const COMENTARIOS_URL = "http://localhost/destinix/comentarios.php";


export const getComentarios = async () => {
    const response = await fetch(COMENTARIOS_URL);
    return await response.json();
};


export const addComentarios = async (comentario) => {
    const formData = new FormData();
    formData.append("persona_id_persona", comentario.persona_id_persona);
    formData.append("id_sitio", comentario.id_sitio);
    formData.append("id_hoteles", comentario.id_hoteles);
    formData.append("id_restaurante", comentario.id_restaurante);
    formData.append("contenido", comentario.contenido);
    formData.append("fecha_comentario", comentario.fecha_comentario);
    formData.append("id_calificacion", comentario.id_calificacion);

    const response = await fetch(COMENTARIOS_URL, {
        method: "POST",
        body: formData,
    });
    return await response.json();
};


export const updateComentarios = async (id, comentario) => {
    const response = await fetch(COMENTARIOS_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id_comentario: id,
            ...comentario,
        }),
    });
    return await response.json();
};

export const deleteComentarios = async (id) => {
    const response = await fetch(`${COMENTARIOS_URL}?id=${id}`, {
        method: "DELETE",
    });
    return await response.json();
};

const EMPRESA_URL = "http://localhost/destinix/empresa.php";


export const getEmpresas = async () => {
    const response = await fetch(EMPRESA_URL);
    return await response.json();
};

export const addEmpresa = async (empresa) => {
    const formData = new FormData();
    formData.append("nombre_emp", empresa.nombre_emp);
    formData.append("direccion_emp", empresa.direccion_emp);
    formData.append("correo_empresa", empresa.correo_empresa);
    formData.append("telefono_empresa", empresa.telefono_empresa);
    formData.append("persona_id_persona", empresa.persona_id_persona);
    formData.append("id_categoria", empresa.id_categoria);

    const response = await fetch(EMPRESA_URL, {
        method: "POST",
        body: formData,
    });
    return await response.json();
};


export const updateEmpresa = async (empresa) => {
    const res = await fetch("http://localhost/destinix/empresa.php", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(empresa),
    });
    return res.json();
};


export const deleteEmpresa = async (id) => {
    const res = await fetch(`http://localhost/destinix/empresa.php?id=${id}`, {
        method: "DELETE",
    });
    return res.json();
};


const ESTADO_URL = "http://localhost/destinix/estado.php";

export const getEstados = async () => {
    const response = await fetch(ESTADO_URL);
    return await response.json();
};

export const addEstado = async (desc_estado) => {
    const response = await fetch("http://localhost/destinix/estado.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ desc_estado }),
    });

    const raw = await response.text();
    console.log("Respuesta del backend:", raw);

    try {
        return JSON.parse(raw);
    } catch (e) {
        throw new Error("No es JSON válido. Verifica la consola.");
    }
};





export const updateEstado = async (id, desc_estado) => {
    const response = await fetch(ESTADO_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id_estado: id,
            desc_estado,
        }),
    });
    return await response.json();
};

export const deleteEstado = async (id) => {
    const response = await fetch(`${ESTADO_URL}?id=${id}`, {
        method: "DELETE",
    });
    return await response.json();
};

const Hoteles_URL = "http://localhost/destinix/hoteles.php";

export const getHoteles = async () => {
    const res = await fetch(Hoteles_URL);
    return await res.json();
};

export const addHotel = async (formData) => {
    const res = await fetch(Hoteles_URL, {
        method: "POST",
        body: formData, 
    });
    return await res.json();
};

export const updateHotel = async (id, data) => {
    const res = await fetch(Hoteles_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_hoteles: id, ...data }),
    });
    return await res.json();
};

export const deleteHotel = async (id) => {
    const res = await fetch(Hoteles_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_hoteles: id }),
    });
    return await res.json();
};


// services/api.js
const BASE_URL = "http://localhost/destinix/usuario.php";

// Obtener todos los registros
export const getPersonas = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};

// Agregar una persona (usando FormData por la imagen)
export const addPersona = async (formData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
};

// Eliminar una persona
export const deletePersona = async (id_persona) => {
  const response = await fetch(BASE_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id_persona }),
  });
  const data = await response.json();
  return data;
};

// Actualizar una persona
export const updatePersona = async (formData) => {
  const response = await fetch(BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  return data;
};




const RESERVA_URL = "http://localhost/destinix/reserva.php";


export const getReservas = async () => {
    const response = await fetch(RESERVA_URL);
    return await response.json();
};


export const addReserva = async (reserva) => {
    const formData = new FormData();
    formData.append("fecha_reserva", reserva.fecha_reserva);
    formData.append("fecha_visita", reserva.fecha_visita);
    formData.append("cantidad_personas", reserva.cantidad_personas);
    formData.append("restaurante_id", reserva.restaurante_id);
    formData.append("sitio_id", reserva.sitio_id);
    formData.append("hotel_id", reserva.hotel_id);
    formData.append("estado_id", reserva.estado_id);
    formData.append("empresa_id", reserva.empresa_id);
    formData.append("id_itinerario", reserva.id_itinerario);

    const response = await fetch(RESERVA_URL, {
        method: "POST",
        body: formData,
    });
    return await response.json();
};


export const updateReserva = async (id, reserva) => {
    const response = await fetch(RESERVA_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id_reserva: id,
            ...reserva,
        }),
    });
    return await response.json();
};


export const deleteReserva = async (id) => {
    const response = await fetch(`${RESERVA_URL}?id=${id}`, {
        method: "DELETE",
    });
    return await response.json();
};
const API_URL = "http://localhost/destinix/restaurantes.php";

// Obtener todos los restaurantes
export const getRestaurantes = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener restaurantes:", error);
        return [];
    }
};

// Agregar nuevo restaurante
export const addRestaurante = async (formData) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al agregar restaurante:", error);
        return { error: "Error al agregar restaurante" };
    }
};

// Actualizar restaurante
export const updateRestaurante = async (id, restauranteData) => {
    try {
        const response = await fetch(API_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_restaurante: id, ...restauranteData }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al actualizar restaurante:", error);
        return { error: "Error al actualizar restaurante" };
    }
};

// Eliminar restaurante
export const deleteRestaurante = async (id) => {
    try {
        const response = await fetch(API_URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_restaurante: id }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al eliminar restaurante:", error);
        return { error: "Error al eliminar restaurante" };
    }
};


const ROL_URL = "http://localhost/destinix/roles.php";

export const getRol = async () => {
    const response = await fetch(ROL_URL);
    return await response.json();
};

export const addRol = async (rol) => {
    const formData = new FormData();
    formData.append("Tipo_Rol", rol.Tipo_Rol);

    const response = await fetch(ROL_URL, {
        method: "POST",
        body: formData,
    });
    return await response.json();
};

export const updateRol = async (id, rol) => {
    const response = await fetch(ROL_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idRol: id,
            ...rol,
        }),
    });
    return await response.json();
};

export const deleteRol = async (id) => {
    const response = await fetch(`${ROL_URL}?id=${id}`, {
        method: "DELETE",
    });
    return await response.json();
};

const SEGURIDAD_URL = "http://localhost/destinix/seguridad.php";

export const getSeguridad = async () => {
    const response = await fetch(SEGURIDAD_URL);
    return await response.json();
};

export const addSeguridad = async (data) => {
    const formData = new FormData();
    formData.append("email_usu", data.email_usu);
    formData.append("contra_usu", data.contra_usu);
    formData.append("token_reset", data.token_reset);
    formData.append("expira_reset", data.expira_reset);
    formData.append("verificado", data.verificado);
    formData.append("token_verificacion", data.token_verificacion);

    const response = await fetch(SEGURIDAD_URL, {
        method: "POST",
        body: formData,
    });
    return await response.json();
};

export const updateSeguridad = async (id, data) => {
    const response = await fetch(SEGURIDAD_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id_seguridad: id,
            ...data,
        }),
    });
    return await response.json();
};

export const deleteSeguridad = async (id) => {
    const response = await fetch(`${SEGURIDAD_URL}?id=${id}`, {
        method: "DELETE",
    });
    return await response.json();
};

const SitiosTuristicos_URL ="http://localhost/destinix/sitios.php";

export const getSitiosTuristicos = async () => {
    const res = await fetch(SitiosTuristicos_URL);
    return await res.json();
};

export const addSitioTuristico = async (formData) => {
    const res = await fetch(SitiosTuristicos_URL, {
        method: "POST",
        body: formData, 
    });
    return await res.json();
};

export const updateSitioTuristico = async (id, data) => {
    const res = await fetch(SitiosTuristicos_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_sitio: id, ...data }),
    });
    return await res.json();
};

export const deleteSitioTuristico = async (id) => {
    const res = await fetch(SitiosTuristicos_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_sitio: id }),
    });
    return await res.json();
};