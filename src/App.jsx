import Header from "./components/Header"
import React, { useState, useEffect } from 'react'

function App() {
  
  const [ presupuesto, setPresupuesto ] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [ presupuestoValido, setPresupuestoValido ] = useState(false);

  // localStorage para presupesto
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  }, [presupuesto]);

  // si hay un presupuesto en localStorage, quiero que el formulario no se muestre
  useEffect(() => {
    const presupuestoLs = Number(localStorage.getItem('presupuesto')) ?? 0;
    if (presupuestoLs > 0) {
      setPresupuestoValido(true);
    }
  }, []);

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
