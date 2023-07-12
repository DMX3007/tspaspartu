interface ICreateMap {
    (countries: string[],nums: number[]):Map<string, number>;
}

export const createMap: ICreateMap = (countries, nums):Map<string, number> => {
    const map = new Map<string, number>();
    for (let i = 0; i < countries.length; i++) {
        map.set(countries[i] as string, nums[i] as number);
    }
    return map;
}