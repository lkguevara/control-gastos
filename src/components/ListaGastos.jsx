import React from 'react'
import Gasto from './Gasto'

const ListaGastos = ({gastos, setGastoEdit, eliminarGasto}) => {
  return (
    <div className='listado-gastos contenedor-gasto'>
        <h2>{gastos.length > 0 ? 'Gastos' : 'No hay gastos'}</h2>
        {
            gastos.map(gasto => (
                <Gasto
                    key={gasto.id}
                    gasto={gasto}
                    setGastoEdit={setGastoEdit}
                    eliminarGasto={eliminarGasto}
                />
            ))
        }
    </div>

  )
}

export default ListaGastos