import type { Info } from "../model/Info";


export default function ranking({ranking}: {ranking: Info[]}) {
    return (
        <>
            <ol>
                {ranking.map(item => {
                    <li></li>
                })}

            </ol>
        </>
    );
}