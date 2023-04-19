import {useState, useEffect} from 'react'
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

    // estados
    const [ modal, setModal ] = useState(false);
    const [ animarModal, setAnimarModal ] = useState(false);
    const [ gastos, setGastos ] = useState([]);

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);


    useEffect(() => {
        const totalGastos = gastos.reduce((total, gasto) => total + gasto.valor, 0);
        setGastado(totalGastos);

        const totalDisponible = presupuesto - totalGastos;
        setDisponible(totalDisponible);



        console.log(totalGastos);
    }, [gastos]);

    const guardarGasto = gasto => {
        gasto.id = generateId();
        gasto.fecha = Date.now();
        gasto.valor = parseFloat(gasto.valor);
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
                    <span>Disponible:</span> {formatearCantidad(disponible)}
                </p>

                <p>
                    <span>Gastado:</span> {formatearCantidad(gastado)}
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