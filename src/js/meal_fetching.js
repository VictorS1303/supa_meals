export const fetchAllMeals = async () =>
{
    const letters = 'abcdefghijklmnopqrstuvwxyz'
    const splitLetters = letters.split('')
    let allMeals = []

    for(const letter of splitLetters)
    {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)

        const data = await response.json()

        if(data.meals)
        {
            allMeals.push(...data.meals)
        }
    }

    return allMeals
}