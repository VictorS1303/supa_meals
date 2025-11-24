// Filter meals
// export const filterMeals = (searchType, searchTerm) =>
// {
//     const endpoints = {
//         s: 'search.php',
//         a: 'filter.php',
//     }

//     const selectedEndPoint = endpoints[searchType]
//     const apiUrl = `https://www.themealdb.com/api/json/v1/1/${selectedEndPoint}?${searchType}=${searchTerm}`

//     const filteredMeals = fetch(apiUrl)
//                             .then((res) => res.json())
//                             .then((data) => data.meals)

//     return filteredMeals || []
// }


// Filter meals by search
export const filterMealsBySearch = async (searchTerm) =>
{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
    
    try
    {
        const response = await fetch(url)
        const data = await response.json()

        return data.meals || []
    }
    catch (error)
    {
        console.log('Error fetching meals: ', error)
        return []
    }
}