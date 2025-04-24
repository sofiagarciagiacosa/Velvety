export const getData= (key) => {
    const res =JSON.parse( localStorage.getItem(key))
    return res ? res : []
}


export const setData= (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value))
        console.log("item añadido")
    } catch (error) {
        console.log(error)
    }
}

