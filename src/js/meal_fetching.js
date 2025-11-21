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

// Fetch meal by ID
export const fetchSingleMealById = async (mealId) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch meal");
  }

  const data = await res.json();

  
  return data.meals ? data.meals[0] : null;
}
