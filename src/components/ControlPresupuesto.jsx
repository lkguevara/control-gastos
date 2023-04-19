import {useState} from 'react'
import Modal from './Modal';
import { generateId } from '../helpers';
import ListaGastos from './ListaGastos';


const ControlPresupuesto = ({presupuesto}) => {

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString(
            'en-US',
            {
                style: 'currency',
                currency: 'USD'
            }
        );
    }

    // modal add expense
    const [ modal, setModal ] = useState(false);
    const [ animarModal, setAnimarModal ] = useState(false);
    const [ gastos, setGastos ] = useState([]);

    const guardarGasto = gasto => {
        gasto.id = generateId();
        gasto.fecha = Date.now();
      setGastos([
        ...gastos,
        gasto
      ])

        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }
        , 500);

    }
    
    // handle add expense
    const handleAddExpense = () => {
        setModal(true);
    }

    setTimeout(() => {
        setAnimarModal(true);
    }, 1000);



  return (
    <div className={modal ? 'fijar' : ''}>
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <p>Gráfica</p>
            <div className="contenido-presupuesto">

                <button className='add__expense' onClick={handleAddExpense}>Añadir gasto</button>
                <button className='reset__app'>Reset app</button>


                <p>
                    <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
                </p>

                <p>
                    <span>Disponible:</span> {formatearCantidad(0)}
                </p>

                <p>
                    <span>Gastado:</span> {formatearCantidad(0)}
                </p>
            </div>
            
        </div>

            
        {
            modal && 
                <Modal 
                    setModal={setModal} 
                    animarModal={animarModal} 
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                />
        }
        <ListaGastos gastos={gastos}/>
     
    </div>
   
  )
}

export default ControlPresupuesto