// Date and Hour Formatter
import moment from "moment";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
import Link from "next/link";

export default function Project({ project }) {

    const { darkMode } = useContextProvider();

    const { _id, website_type, description, state, createdAt } = project;

    return (
        <Link href={`/admin/project/${_id}`} className={`gap-5 px-8 py-6 shadow-md rounded-xl border ${darkMode ? 'border-neutral-800' : 'border-neutral-200'} hover:border-primary transition-colors cursor-pointer`}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:gap-2 text-xl">
                    <div className="font-bold uppercase">Tipo de software</div>
                    <div className="hidden sm:block">-</div>
                    <div className={`font-semibold text-primary-2`}>{website_type == 'website' ? 'Sitio web' : website_type == 'ecommerce' ? 'E-Commerce' : website_type == 'app' && 'Aplicación'}</div>
                </div>
                <div className="flex flex-col">
                    <div className="font-bold uppercase">Descripción</div>
                    <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'} text-ellipsis-3`}>{description}</div>
                </div>
                {/* <div className="flex flex-col">
                    <div className="font-bold uppercase">Presupuesto</div>
                    <div className="flex items-center gap-1">
                        <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Entre</div>
                        <div className="font-semibold">{currencyFormatter(budget.from)}</div>    
                        <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>y</div>
                        <div className="font-semibold">{currencyFormatter(budget.to)}</div>    
                    </div>    
                </div> */}
                <div className="flex items-center gap-4">
                    <div className={`${state == 'onhold' ? 'bg-yellow-500' : state == 'inprogress' ? 'bg-orange-500' : state == 'completed' ? 'bg-primary' : 'bg-red-500'} px-3 py-1 rounded-full text-white uppercase w-fit font-semibold select-none`}>{state == 'onhold' ? 'En espera' : state == 'inprogress' ? 'En desarrollo' : state == 'completed' ? 'Completado' : 'Cancelado'}</div>
                </div>
                <div className="font-semibold uppercase">{moment(createdAt).format('LLL')}</div>
            </div>
        </Link>
    )
}