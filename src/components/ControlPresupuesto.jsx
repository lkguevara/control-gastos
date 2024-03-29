import {useState, useEffect} from 'react'
import Modal from './Modal';
import { generateId } from '../helpers';
import ListaGastos from './ListaGastos';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({presupuesto, setPresupuesto, setPresupuestoValido}) => {

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
    const [ gastos, setGastos ] = useState(
        localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
    );
    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    // localStorage para gastos
    useEffect(() => {
        // json.stringify convierte un arreglo a string
        localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
    }, [gastos]);




    // editar los gastos
    const [gastoEdit, setGastoEdit] = useState({});

    useEffect(() => {
        // sumar los gastos
        const totalGastos = gastos.reduce((total, gasto) => total + gasto.valor, 0);
        setGastado(totalGastos);

        // restar del presupuesto
        const totalDisponible = presupuesto - totalGastos;
        setDisponible(totalDisponible);

        // calcular el porcentaje gastado
        const porcentajeGastado = (totalGastos / presupuesto) * 100;
        setPorcentaje(porcentajeGastado);

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
          setGastoEdit({})
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

    // reset app
    const handleResetApp = () => {
      const confirmacion = window.confirm("¿Está seguro que desea resetear la app?");
      if (confirmacion) {
        setGastos([]);
        setPresupuesto(0);
        setPresupuestoValido (false);
      }

    }



  return (
    <div className={modal ? 'fijar' : ''}>
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div className="">
                <CircularProgressbar 
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DB2777': '#2B3467',
                        trailColor: '#f5f5f5',
                        // cambiar el color del texto
                        textColor: '#2B3467',
                    })}
                    value={gastado}
                    maxValue={presupuesto}
                    text={`${porcentaje.toFixed(2)}% Gastado`}

                />
            </div>

            <div className="contenido-presupuesto">

                <button className='add__expense' onClick={handleAddExpense}>Añadir gasto</button>
                <button className='reset__app' onClick={handleResetApp}>Reset app</button>


                <p>
                    <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
                    {/* {console.log(presupuesto)} */}
                </p>

                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible:</span> {formatearCantidad(disponible)}
                    {/* {console.log(disponible)} */}
                </p>

                <p>
                    <span>Gastado:</span> {formatearCantidad(gastado)}
                    {/* {console.log(gastado)} */}
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
                    setGastoEdit={setGastoEdit}
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