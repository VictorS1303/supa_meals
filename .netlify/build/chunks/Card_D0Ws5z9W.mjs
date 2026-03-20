import { d as createComponent, e as createAstro, m as maybeRenderHead, g as addAttribute, s as spreadAttributes, l as renderSlot, r as renderTemplate } from './astro/server_ON6jawE_.mjs';
import 'clsx';

let cachedMeals = null;

const fetchAllMeals = async () =>
{
    if(cachedMeals)
    {
        return cachedMeals
    }

    const letters = 'abccdefghijklmnopqrstuvwxyz'.split('');

    const requests = letters.map((letter) => (
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
            .then((res) => res.json())
    ));

    const results = await Promise.all(requests);

    const allMeals = [];

    for(const result of results)
    {
        if(result.meals)
        {
            allMeals.push(...result.meals);
        }
    }

    cachedMeals = allMeals;
    return allMeals
};

// Fetch meal by ID
const fetchSingleMealById = async (mealId) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch meal");
  }

  const data = await res.json();

  
  return data.meals ? data.meals[0] : null;
};

const $$Astro = createAstro();
const $$Card = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Card;
  const { class: className = "", id, variant = "default", ...rest } = Astro2.props;
  const cardBaseClasses = `
  bg-white rounded-md
`;
  const cardVariantClasses = {
    default: "",
    meal: "w-full  p-4 flex flex-col relative",
    liked: "relative grid w-[225px] h-[250px] overflow-hidden group",
    comment: "relative w-full p-4 flex flex-col gap-6 md:max-w-[400px]"
  };
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(id, "id")}${spreadAttributes(rest)}${addAttribute(`
    ${cardBaseClasses}
    ${cardVariantClasses[variant]}
    ${className}
  `, "class")}> ${renderSlot($$result, $$slots["default"])} </article>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/cards/Card.astro", void 0);

export { $$Card as $, fetchAllMeals as a, fetchSingleMealById as f };
