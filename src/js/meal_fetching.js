let cachedMeals = null

export const fetchAllMeals = async () =>
{
    if(cachedMeals)
    {
        return cachedMeals
    }

    const letters = 'abccdefghijklmnopqrstuvwxyz'.split('')

    const requests = letters.map((letter) => (
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
            .then((res) => res.json())
    ))

    const results = await Promise.all(requests)

    const allMeals = []

    for(const result of results)
    {
        if(result.meals)
        {
            allMeals.push(...result.meals)
        }
    }

    cachedMeals = allMeals
    return allMeals
}