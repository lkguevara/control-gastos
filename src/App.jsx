import Header from "./components/Header"
import React, { useState } from 'react'
import ListaGastos from "./components/ListaGastos"

function App() {
  
  const [ presupuesto, setPresupuesto ] = useState('');
  const [ presupuestoValido, setPresupuestoValido ] = useState(false);


  return (
    <div>
     <Header 
      presupuesto = {presupuesto}
      setPresupuesto = {setPresupuesto}
      presupuestoValido = {presupuestoValido}
      setPresupuestoValido = {setPresupuestoValido}
     />

     {
        presupuestoValido && <ListaGastos />
     }
    </div>
  )
}

export default App
