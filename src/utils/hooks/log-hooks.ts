import { useEffect } from "react"

function useEffectLog(componenteName?) {
    componenteName ?
        console.log("The component " + componenteName + " is rendered.") :
        console.log("The component is rendered.")
}

export {
    useEffectLog
}