export const getResorts = async () => {
    const data = await fetch('/api//resorts');
    const arr: Array<string> = await data.json();
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i].title_ru);
    }
    return result;
}