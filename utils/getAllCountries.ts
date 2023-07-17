export const getDestinations = async () => {
    const countries = await fetch('/api//countries')
    return await countries.json()
}