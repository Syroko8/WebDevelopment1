import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contentStates, contentTypes, ItemSchema, type CreateItemInput, type Item } from "../schemas/ItemSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem, updateItem } from "../services/itemService";

const Formulary = (
    {itemToEdit, onCancelEdit}:
    {itemToEdit: Item | null, onCancelEdit: () => void}

) => {

    const EMPTY_VALUES = { title: "", author_studio: "", type: "", state: "", rating: undefined };

    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(ItemSchema),
        defaultValues: itemToEdit ?
            {
                title: itemToEdit.title,
                author_studio: itemToEdit.author_studio ?? "",
                type: itemToEdit.type,
                state: itemToEdit.state,
                rating: itemToEdit.rating ?? undefined,
            } :
            EMPTY_VALUES,
    });

    const mutation = useMutation({
        mutationFn: (data: CreateItemInput) => 
            itemToEdit ? updateItem(itemToEdit.id, data) : createItem(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["items"]});
            if (itemToEdit) onCancelEdit();
            else reset(EMPTY_VALUES);
        }     
    });

    function handleClear() {
        mutation.reset();
        if (itemToEdit) onCancelEdit();
        else reset(EMPTY_VALUES);
    }

    return (
        <>
            <form onSubmit={handleSubmit((data) => mutation.mutate(data))} noValidate>
                {/** Title field */}
                <div className="field">
                    <label htmlFor="title">Título</label>
                    <input 
                        id="title" placeholder="Nombre de la obra"
                        aria-describedby="title-error"
                        {...register("title")}
                    />
                    {errors.title && <p id="title-error" role="alert" className="error">{errors.title.message}</p>}
                </div>
                
                {/** Type field */}
                <div className="field">
                    <label htmlFor="form-type">Tipo</label>
                    <select 
                        id="form-type"
                        aria-describedby="type-error"
                        {...register("type")}
                    >
                        <option value="" disabled>Selecciona un tipo</option>
                        {contentTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                    {errors.type && <p id="type-error" role="alert" className="error">{errors.type.message}</p>}
                </div>

                {/** State field */}
                <div className="field">
                    <label htmlFor="state">Estado</label>
                    <select 
                        id="state"
                        aria-describedby="state-error"
                        {...register("state", {deps: ["rating"]})}
                    >
                        <option value="" disabled>Selecciona un estado</option>
                        {contentStates.map((state) => <option key={state} value={state}>{state}</option>)}
                    </select>
                    {errors.state && <p id="state-error" role="alert" className="error">{errors.state.message}</p>}
                </div>

                {/** Author field */}
                <div className="field">
                    <label htmlFor="author_studio">Autor/Estudio</label>
                    <input 
                        type="text" id="author_studio" 
                        aria-describedby="author_studio-error"
                        {...register("author_studio")}
                    />
                    {errors.author_studio && <p id="author_studio-error" role="alert" className="error">{errors.author_studio.message}</p>}
                </div>

                {/** Rating field */}
                <div className="field">
                    <label htmlFor="rating">Valoración</label>
                    <input 
                        type="number" id="rating" 
                        aria-describedby="rating-error"
                        {...register("rating")}
                    />
                    {errors.rating && <p id="rating-error" role="alert" className="error">{errors.rating.message}</p>}
                </div>
                
                {mutation.isError && <p role="alert" className="error">No se pudo guardar: {mutation.error.message}</p>}
                {mutation.isSuccess && <p role="status" className="ok">¡Guardado!</p>}

                <div className="buttons">
                    <button type="button" onClick={handleClear}>Limpiar</button>

                    <button 
                        type="submit"
                        className="submit-btn"
                        disabled={mutation.isPending}
                        aria-disabled={mutation.isPending}
                    >
                        {mutation.isPending ? 
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