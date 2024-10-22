export function objectToFormData(data){
    const formData = new FormData()

    Object.keys(data).forEach(e=>[
        formData.append(e,data[e])
    ])

    return formData
}