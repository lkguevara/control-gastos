export const generateId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)

    return random + fecha
}

export const formatearFecha = (fecha) => {
    const date = new Date(fecha)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return `${day}/${month}/${year}`
}
