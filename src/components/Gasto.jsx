import { formatearFecha } from '../helpers';
import iconoAhorro from '../assets/icono_ahorro.svg';
import iconoCasa from '../assets/icono_casa.svg';
import iconoComida from '../assets/icono_comida.svg';
import iconoGastos from '../assets/icono_gastos.svg';
import iconoOcio from '../assets/icono_ocio.svg';
import iconoSalud from '../assets/icono_salud.svg';
import iconoSuscripciones from '../assets/icono_suscripciones.svg';

const diccionarioIconos = {
    'ahorro': iconoAhorro,
    'casa': iconoCasa,
    'comida': iconoComida,
    'gastos': iconoGastos,
    'ocio': iconoOcio,
    'salud': iconoSalud,
    'suscripciones': iconoSuscripciones
};

const Gasto = ({ gasto, setGastoEdit, eliminarGasto}) => {
    const { categoria, valor, nombre, fecha } = gasto;

    // handle para editar gasto
    const handleEditExpense = () => {
        setGastoEdit(gasto); 
    }

    // handle para eliminar gasto
    const handleDeleteExpense = () => {
        eliminarGasto(gasto.id);
    }


    return (
        <div className='gasto sombra'>
            <div className="contenido-gasto">
                <img src={diccionarioIconos[categoria]} alt={categoria} />
                {/* {console.log(diccionarioIconos[categoria])} */}
                <div className="descripcion-gasto">
                    <p className='categoria'>{categoria}</p>
                    <p className='nombre-gasto'>{nombre}</p>
                    <p className='fecha-gasto'>Agregado el: <span>{formatearFecha(fecha)}</span></p>
                </div>
            </div>

            <div className="editContainer">
                <p className='cantidad-gasto'>${valor}</p>
                <div className="buttonsEdit">
                    <button className='deleteButton' onClick={handleEditExpense}>Editar</button>
                    <button className='deleteButton' onClick={handleDeleteExpense}>Eliminar</button>
                </div>
            </div>
            
        </div>
    )
}

export default Gasto;
