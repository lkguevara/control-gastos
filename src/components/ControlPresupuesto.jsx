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

    // modales
    const [ modal, setModal ] = useState(false);
    const [ animarModal, setAnimarModal ] = useState(false);

    // gastos
    const [ gastos, setGastos ] = useState([]);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    // editar los gastos
    const [gastoEdit, setGastoEdit] = useState({});

    useEffect(() => {
        // sumar los gastos
        const totalGastos = gastos.reduce((total, gasto) => total + gasto.valor, 0);
        setGastado(totalGastos);
        // restar del presupuesto
        const totalDisponible = presupuesto - totalGastos;
        setDisponible(totalDisponible);
    }, [gastos]);

    useEffect(() => {
        if (Object.keys(gastoEdit).length > 0) {
            setModal(true);
            setTimeout(() => {
                setAnimarModal(true);
            }, 300);
        }
    }, [gastoEdit]);

    const guardarGasto = gasto => {
        if (gasto.id) {
          // actualizar gasto
          const actualizarGastos = gastos.map(gastoActual => {
            if (gastoActual.id === gasto.id) {
              return {
                ...gastoActual,
                valor: parseFloat(gasto.valor)
              }
            } else {
              return gastoActual
            }
          })
          setGastos(actualizarGastos)
        } else {
          // nuevo gasto
          const nuevoGasto = {
            ...gasto,
            id: generateId(),
            fecha: Date.now(),
            valor: parseFloat(gasto.valor)
          }
          setGastos([
            ...gastos,
            nuevoGasto
          ])
        }
      
        setAnimarModal(false)
        setTimeout(() => {
          setModal(false)
        }, 500)
      }

    //   eliminar gasto
    const eliminarGasto = id => {
        const confirmacion = window.confirm("¿Está seguro que desea eliminar este gasto?");
      
        if (confirmacion) {
          // trae los id que no sean iguales al id que se le pasa
          const gastosFiltrados = gastos.filter(gasto => gasto.id !== id);
          //   actualiza el estado
          setGastos(gastosFiltrados); 
        }
      }
      
    
    // handle add expense
    const handleAddExpense = () => {
        setModal(true);

        setGastoEdit({});
        setTimeout(() => {
            setAnimarModal(true);
        }, 500);
    }


  return (
    <div className={modal ? 'fijar' : ''}>
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <p>Gráfica</p>
            <div className="contenido-presupuesto">

                <button className='add__expense' onClick={handleAddExpense}>Añadir gasto</button>
                <button className='reset__app'>Reset app</button>


                <p>
                    <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
                    {console.log(presupuesto)}
                </p>

                <p>
                    <span>Disponible:</span> {formatearCantidad(disponible)}
                    {console.log(disponible)}
                </p>

                <p>
                    <span>Gastado:</span> {formatearCantidad(gastado)}
                    {console.log(gastado)}
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
                    gastoEdit={gastoEdit}
                />
        }
        <ListaGastos 
            gastos={gastos}
            setGastoEdit={setGastoEdit}
            eliminarGasto={eliminarGasto}
        />
     
    </div>
   
  )
}

export default ControlPresupuesto