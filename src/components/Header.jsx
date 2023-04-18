import React from 'react'
import Presupuesto from './Presupuesto'

const Header = ({ presupuesto, setPresupuesto, presupuestoValido, setPresupuestoValido}) => {
  return (
    <header>
        <h1>PLANIFICADOR DE GASTOS</h1>

        {
          presupuestoValido 
          ? <p>control presupuesto</p>
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