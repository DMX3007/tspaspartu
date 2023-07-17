export const getResorts = async () => {
    const data = await fetch('/api//resorts');
    const arr = await data.json();
    if (Array.isArray(arr)) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(arr[i]);
        }
        return result;
    }
    throw new Error('Custom Error: getResorts - const arr possibly undefined or something else')
}