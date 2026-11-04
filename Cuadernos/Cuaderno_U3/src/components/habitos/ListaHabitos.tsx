import TargetaHabito from "./TarjetaHabito"

const ListaHabitos = ({ habitList }: { habitList: string[] }) => {

    return (
        <>
            <div className="habit-container">
                {habitList.map(habit => (
                    <TargetaHabito key={habit} habit={habit} />
                ))}
            </div>
        </>
    )
}

export default ListaHabitos