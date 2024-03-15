import { useSelector } from "react-redux"
import React from 'react'

export default function useStore() {

    const emails = useSelector(({ email }: any) => email.value).map(i => {
        return { ...i, value: i.id, label: i.username + '@' + i.provider.signature }
    })
    
    const platforms = useSelector(({ platform }: any) => platform.value).map(i => {
        return { ...i, value: i.id, label: i.name }
    })

    return {
        emails,
        platforms
    }
}


