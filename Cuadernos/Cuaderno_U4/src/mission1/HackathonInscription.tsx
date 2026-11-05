import { string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import './mission1.css';

const HackathonInscription = () => {

    const scheme = z.object({
        name: z.string().min(2, "El nombre necesita al menos 2 letras"),
        email: z.email("Email no válido"),
        level: z.enum(["avanzado", "principiante"], {error: "Elige el un nivel"}),
        languages: z.array(string()).min(1, "Debes elegir al menos un lenguage"),
        github: z.url("URL no válida").optional().or(z.literal("")),
        acceptRules: z.literal(true, {error: "Debes haceptar las normas"})
    }).refine((data) => {
        if(data.level == 'avanzado' && !data!.github) return false;
        return true
    }, {
        message: "Requerido para nivel avanzado",
        path: ["github"]
    });

    async function sendData(data: any) {
        await new Promise((r) => setTimeout(r, 1000));
        alert("Inscripción recibida!!");
        reset();
    }

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(scheme),
        defaultValues: { 
            name: "", 
            languages: []
        },
    });

    return (
        <div className="wholeParent">
            <div className="mision-header">
                <span className="mision-badge">Misión 1</span>
                <h2 className="mision-title">Inscripción al Hackathon</h2>
                <p className="mision-desc">Rellena el formulario con tus datos para participar en el evento.</p>
            </div>
            
            <form onSubmit={handleSubmit(sendData)} noValidate>
                {/*Name field*/}
                <div className="form-group">
                    <label>
                        Nombre
                        <input {...register("name")} placeholder="Tu nombre y apellidos" />
                    </label> 
                    {errors.name && <p className="error">{errors.name.message}</p>}
                </div>

                {/*Email field*/}
                <div className="form-group">
                    <label>
                        Correo
                        <input type="email" {...register("email")} placeholder="ejemplo@correo.com" />
                    </label> 
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>

                {/*Language field*/}
                <div className="form-group">
                    <fieldset>
                        <legend>Lenguages</legend>
                        <div className="checkbox-group">
                            <label className="checkbox-label">
                                <input type="checkbox" value="es" {...register("languages")} />
                                <span>Español</span>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" value="en" {...register("languages")} />
                                <span>Inglés</span>
                            </label>
                        </div>
                        {errors.languages && <p className="error">{errors.languages.message}</p>}
                    </fieldset>
                </div>

                {/*Level field*/}
                <div className="form-group">
                    <label>
                        Nivel
                        <select {...register("level")} defaultValue="">
                            <option value="" disabled>Selecciona tu nivel...</option>
                            <option value="avanzado">Avanzado</option>
                            <option value="principiante">Principiante</option>
                        </select>
                    </label>
                </div>

                {/*Github*/}
                <div className="form-group">
                    <label>
                        Github
                        <input {...register("github")} placeholder="https://github.com/tu-usuario" />
                    </label> 
                    {errors.github && <p className="error">{errors.github.message}</p>}
                </div>
            
                {/*Accept rules*/}
                <div className="form-group">
                    <label className="checkbox-label">
                        <input type="checkbox" {...register("acceptRules")} />
                        <span>Acepta las normas</span>
                    </label> 
                    {errors.acceptRules && <p className="error">{errors.acceptRules.message}</p>}
                </div>

                {/*Dynamic submit button*/}
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <span className="spinner"></span>
                            <span>Enviando...</span>
                        </>
                    ) : (
                        "Inscribirme"
                    )}
                </button>
            </form>
        </div>
    );
}

export default HackathonInscription;
