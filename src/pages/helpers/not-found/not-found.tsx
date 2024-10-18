import { CircleAlert } from "lucide-react"
import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch } from "../../../utils/hooks/redux-hooks"
import { appActions } from "../../../slices/app-slice"

function NotFound() {
    const back: any = -1
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(appActions.setTitle("Erro 400"))
    }, [])

    return (
        <div className="center p-6 w-full h-full flex-col ">
            <span className="">
                <div className="flex gap-3 bg-red-100 border-red-500 text-red-700 border rounded p-6 items-center">
                    <CircleAlert className="text-red-700" />
                    <p>Erro: Essa pagina não foi encontrada. <Link className="text-blue-800 font-bold" to={"/home"}>Voltar para página inicial.</Link></p>
                </div>
            </span>
        </div>
    )
}

export default NotFound