import React from 'react'
import Presupuesto from './Presupuesto'
import ControlPresupuesto from './ControlPresupuesto'


const Header = ({ presupuesto, setPresupuesto, presupuestoValido, setPresupuestoValido}) => {
  return (
    <header>
        <h1>PLANIFICADOR DE GASTOS</h1>

        {
          presupuestoValido 
          ? <ControlPresupuesto 
              presupuesto = {presupuesto}
              setPresupuesto = {setPresupuesto}
              setPresupuestoValido = {setPresupuestoValido}
            />
            
          : <Presupuesto 
            presupuesto = {presupuesto}
            setPresupuesto = {setPresupuesto}
            setPresupuestoValido = {setPresupuestoValido}
          />
        }

        
    </header>
  )
}

export default Header