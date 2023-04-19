import Header from "./components/Header"
import React, { useState } from 'react'

function App() {
  
  const [ presupuesto, setPresupuesto ] = useState('');
  const [ presupuestoValido, setPresupuestoValido ] = useState(false);


  return (
    <div >
     <Header 
      presupuesto = {presupuesto}
      setPresupuesto = {setPresupuesto}
      presupuestoValido = {presupuestoValido}
      setPresupuestoValido = {setPresupuestoValido}
     />

    </div>
  )
}

export default App
