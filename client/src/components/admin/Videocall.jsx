// Nextjs
import { useRouter } from "next/router";
// Date and Hour Formatter
import moment from "moment";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
import Link from "next/link";

export default function VideoCall({ videocall }) {

    const { darkMode } = useContextProvider();

    const router = useRouter();

    const redirectToVideoCall = (id) => {
        router.push(`/admin/videocall/${id}`)
    }

    const { _id, full_name, email, date, hour, state, createdAt } = videocall;

    return (
        <Link href={`/admin/videocall/${_id}`} className={`px-8 py-6 shadow-md rounded-xl border ${darkMode ? 'border-neutral-800' : 'border-neutral-200'} hover:border-primary transition-colors cursor-pointer`}>
            <div className="flex flex-col gap-3">
                <div className={"flex flex-col gap-1"}>
                    <div className="flex items-center gap-2">
                        <div className="font-bold uppercase">Nombre</div>
                        <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{full_name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="font-bold uppercase">Email</div>
                        <a href={`mailto:${email}`} className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'} text-ellipsis-5`}>{email}</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`uppercase font-semibold text-lg`}>Estado</div>
                        <div className={`${state == 'pending' ? 'bg-orange-500' : state == 'concluded' ? 'bg-primary' : 'bg-red-500'} px-3 rounded-full text-white uppercase w-fit font-semibold select-none`}>{state == 'pending' ? 'Pendiente' : state == 'concluded' ? 'Concluido' : 'Cancelado'}</div>
                    </div>
                </div>
                <div className={`flex items-center gap-1 uppercase font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    <div>{moment(date).format('LL')},</div>
                    <div>a las {hour}</div>
                </div>
            </div>
        </Link>
    )
}