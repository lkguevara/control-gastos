import cerrar from '../assets/cerrar.svg'
import {useState, useEffect} from 'react'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEdit}) => {

    const [ form, setForm ] = useState({
        nombre: '',
        valor: '',
        categoria: ''
    });

    const [error, setError] = useState({
        nombre: '',
        valor: '',
        categoria: ''
    })

    const [id, setId] = useState('');

    useEffect(() => {
        if (Object.keys(gastoEdit).length > 0) {
            setForm(gastoEdit);
            setId(gastoEdit.id);
        }
    }, [gastoEdit]);

    const ocultarModal = () => {
        setModal(false);
        setAnimarModal(false);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!form.nombre){
            setError({
                nombre: 'El nombre es obligatorio',
            })
            
            setTimeout(() => {
                setError({
                    nombre: ''
                })
            }
            , 500);
            return;
        }
        else if (/^\d+$/.test(form.nombre)) {
            setError({
                nombre: 'El nombre no puede ser un número',
            });
            setTimeout(() => {
                setError({
                    nombre: ''
                })
            }
            , 3000);
            return;
        }

        else if(!form.valor){
            setError({
                valor: 'El valor es obligatorio',
            })
            setTimeout(() => {
                setError({
                    valor: ''
                })
            }
            , 3000);
            return;
        }
        else if(!form.categoria){
            setError({
                categoria: 'La categoría es obligatoria',
            });
            setTimeout(() => {
                setError({
                    categoria: ''
                })
            }
            , 3000);
            return;
        }

        setError({
            nombre: '',
            valor: '',
            categoria: ''
        })

        guardarGasto({ ...form, id});
    

        // resetear el formulario
        setForm({
            nombre: '',
            valor: '',
            categoria: ''
        })

        // console.log(form)


    }



    return (
        <div className='modal'>
            <div className="cerrar-modal">
                <img 
                    src={cerrar}
                    alt="cerrar modal"
                    onClick={ocultarModal}
                >
                    
                </img>
            </div>

            <form className= {`formulario ${animarModal ? "animar" : 'cerrar'}`} onSubmit= {handleSubmit }>
                <legend>
                    {gastoEdit.nombre ? 'Editar gasto' : 'Añadir gasto'}
                </legend>

                <div className="campo">
                    <label htmlFor='nombre'>Nombre del gasto</label>
                    <input
                        type="text"
                        id='nombre'
                        placeholder='Añade el nombre del gasto'
                        value={form.nombre}
                        onChange={handleChange}
                    />
                    <span className="error">{error.nombre}</span>
                </div>

                <div className="campo">
                    <label htmlFor='valor'>Valor</label>
                    <input
                        type="number"
                        id='valor'
                        placeholder='Añade el valor del gasto'
                        value={form.valor}
                        onChange={handleChange}
                    />
                    <span className="error">{error.valor}</span>
                </div>

                <div className="campo">
                    <label htmlFor='categoria'>Categoría</label>
                    <select id="categoria" value={form.categoria} onChange={handleChange}>
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="varios">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                    <span className="error">{error.categoria}</span>
                </div>

                <input
                    type="submit"
                    value= {gastoEdit.nombre ? 'Guardar cambios' : 'Añadir gasto'}
                />
                
            </form>
        </div>
    )
}

export default Modal