import {useState} from 'react';


const Presupuesto = ({presupuesto, setPresupuesto, setPresupuestoValido}) => {

    const [error, setError] = useState({
        presupuesto: ''
    })

    const handleChange = (e) => {
        setPresupuesto(parseFloat(e.target.value));
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if(presupuesto < 0 || (!presupuesto)){
            setError({
                presupuesto: 'El presupuesto es incorrecto'
            })
            return;
        }
        setError({
            presupuesto: ''
        })

        setPresupuestoValido(true);

        console.log(presupuesto)
        // resetear el formulario
        setPresupuesto('');
    }


    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form className='formulario' onSubmit={handleSubmit}>
                <div className="campo">
                    <label>Definir presupuesto</label>
                    <input 
                        className='nuevo-presupuesto'
                        type="number" 
                        placeholder= "Añade tu presupuesto"
                        value = {presupuesto}
                        onChange = {handleChange}
                    />
                    <span className="error">{error.presupuesto}</span>
                </div>

                <input 
                    type = "submit" 
                    value = "Añadir"
                />
            </form>
        </div>
        
    )
}

export default Presupuesto