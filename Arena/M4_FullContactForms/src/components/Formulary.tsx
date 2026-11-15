import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contentStates, contentTypes, ItemSchema } from "../schemas/ItemSchema";

const Formulary = () => {

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(ItemSchema),
        defaultValues: { 
            title: "", 
            author_studio: "",
            type: "",
            state: "",
            rating: undefined,
        },
    });

    function sendData(data: any) {
        reset();
    }

    return (
        <>
            <form onSubmit={handleSubmit(sendData)} noValidate>
                {/** Title field */}
                <div className="field">
                    <label htmlFor="title">Título</label>
                    <input 
                        id="title" placeholder="Nombre de la obra"
                        aria-describedby="title-error"
                        {...register("title")}
                    />
                    {errors.title && <p className="error">{errors.title.message}</p>}
                </div>
                
                {/** Type field */}
                <div className="field">
                    <label htmlFor="type">Tipo</label>
                    <select 
                        id="type"
                        aria-describedby="type-error"
                        {...register("type")}
                    >
                        <option value="" disabled>Selecciona un tipo</option>
                        {contentTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                    {errors.type && <p className="error">{errors.type.message}</p>}
                </div>

                {/** State field */}
                <div className="field">
                    <label htmlFor="state">Estado</label>
                    <select 
                        id="state"
                        aria-describedby="state-error"
                        {...register("state")}
                    >
                        <option value="" disabled>Selecciona un estado</option>
                        {contentStates.map((state) => <option key={state} value={state}>{state}</option>)}
                    </select>
                    {errors.state && <p className="error">{errors.state.message}</p>}
                </div>

                {/** Author field */}
                <div className="field">
                    <label htmlFor="author_studio">Autor/Estudio</label>
                    <input 
                        type="text" id="author_studio" 
                        aria-describedby="author_studio-error"
                        {...register("author_studio")}
                    />
                    {errors.author_studio && <p className="error">{errors.author_studio.message}</p>}
                </div>

                {/** Rating field */}
                <div className="field">
                    <label htmlFor="rating">Valoración</label>
                    <input 
                        type="number" id="rating" 
                        aria-describedby="rating-error"
                        {...register("rating")}
                    />
                    {errors.rating && <p className="error">{errors.rating.message}</p>}
                </div>
                
                <div className="buttons">
                    <button onClick={() => reset()}>Limpiar</button>

                    <button 
                        type="submit"
                        className="submit-btn"
                        disabled={isSubmitting}
                        aria-disabled={isSubmitting}
                    >
                        {isSubmitting ? 
                            (
                                <>
                                    <span className="spinner"></span>
                                    <span>Guardando...</span>
                                </>
                            ) :
                            "Guardar"
                    }
                    </button>
                </div>
            </form>
        </>
    );
}

export default Formulary;