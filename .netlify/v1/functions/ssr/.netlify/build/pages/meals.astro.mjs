import { d as createComponent, e as createAstro, m as maybeRenderHead, g as addAttribute, r as renderTemplate, j as renderComponent, k as renderScript, l as renderSlot } from '../chunks/astro/server_ON6jawE_.mjs';
import { $ as $$Hero, a as $$Overlay } from '../chunks/Overlay_B3oYg2tR.mjs';
import { b as $$Link, a as $$Layout } from '../chunks/Link_DemNDw7d.mjs';
import { r as resolveApiMealIdToInternalMealId, e as fetchCommentsCountForMeal, $ as $$Section } from '../chunks/Section_DdAP44KF.mjs';
import { $ as $$Card, a as fetchAllMeals } from '../chunks/Card_D0Ws5z9W.mjs';
import 'clsx';
import { $ as $$Heading } from '../chunks/Heading_CZ96zJT1.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$7 = createAstro();
const $$Input = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Input;
  const { class: className, id, placeholder } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<input${addAttribute(`${className} flex self-center w-full border-b-2 border-white text-white focus:outline-0 focus:ring-0 md:justify-start md:max-w-[300px]`, "class")}${addAttribute(id, "id")}${addAttribute(placeholder, "placeholder")}>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/inputs/Input.astro", void 0);

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
const filterMealsBySearch = async (searchTerm) =>
{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
    
    try
    {
        const response = await fetch(url);
        const data = await response.json();

        return data.meals || []
    }
    catch (error)
    {
        console.log('Error fetching meals: ', error);
        return []
    }
};

const $$Astro$6 = createAstro();
const $$MealFilter = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$MealFilter;
  const searchParam = Astro2.url.searchParams.get("search") || "";
  await filterMealsBySearch(searchParam);
  return renderTemplate`${maybeRenderHead()}<div class="flex justify-between"> ${renderComponent($$result, "Input", $$Input, { "id": "meal_filter_input", "placeholder": "Search meal name", "value": searchParam })} </div> ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/filters/MealFilter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/filters/MealFilter.astro", void 0);

const $$Astro$5 = createAstro();
const $$MealCommentsCounter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$MealCommentsCounter;
  const { class: className, id, variant } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(`${className}`, "class")}${addAttribute(id, "id")}> ${renderSlot($$result, $$slots["default"])} </article>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/counters/MealCommentsCounter.astro", void 0);

const $$Astro$4 = createAstro();
const $$MealsContainer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$MealsContainer;
  const {
    class: className,
    id,
    mealsForPage = [],
    mealId: apiMealId
  } = Astro2.props;
  const mealsToDisplay = mealsForPage.length > 0 ? mealsForPage : [];
  let internalMealId = null;
  try {
    internalMealId = await resolveApiMealIdToInternalMealId(apiMealId);
  } catch (error) {
    console.log("Failed to resolve internal meal ID: ", error);
  }
  const commentCounts = await fetchCommentsCountForMeal();
  return renderTemplate`${maybeRenderHead()}<div class="mt-8"> ${renderComponent($$result, "MealFilter", $$MealFilter, {})} <div class="meals-container w-full grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] py-10 gap-8 md:justify-between"> ${mealsToDisplay.length > 0 ? mealsToDisplay.map((mealCard) => {
    const commentCount = commentCounts?.[mealCard.idMeal] ?? 0;
    return renderTemplate`${renderComponent($$result, "Card", $$Card, { "key": mealCard.idMeal, "variant": "meal" }, { "default": async ($$result2) => renderTemplate`${commentCount > 0 && renderTemplate`${renderComponent($$result2, "MealCommentsCounter", $$MealCommentsCounter, { "class": "absolute -top-4 -right-2" }, { "default": async ($$result3) => renderTemplate` <div class="grid place-items-center"> <i class="fas fa-comment text-3xl text-(--secondary-text-color)"></i> <span class="absolute inset-0 grid place-items-center text-sm font-semibold text-white"> ${commentCount} </span> </div> ` })}`}<img${addAttribute(mealCard.strMealThumb, "src")} class="rounded-md"${addAttribute(mealCard.strMeal, "alt")}> ${renderComponent($$result2, "Heading", $$Heading, { "variant": "meal_card", "name": "title" }, { "default": async ($$result3) => renderTemplate`${mealCard.strMeal}` })} ${renderComponent($$result2, "Link", $$Link, { "href": `/meals/${mealCard.idMeal}`, "variant": "meal_card_link" }, { "default": async ($$result3) => renderTemplate`
See Recipe
` })} ` })}`;
  }) : renderTemplate`<p>No meals found</p>`} </div> </div>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/containers/MealsContainer.astro", void 0);

const $$Astro$3 = createAstro();
const $$PageCounter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$PageCounter;
  const { class: className, id, currentPage, totalPages } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(`${className}`, "class")}${addAttribute(id, "id")}> <h4 class="text-white text-lg">Page <span class="current-page text-[var(--secondary-text-color)] ml-2">${currentPage}</span> / <span class="total-pages text-[var(--secondary-text-color)]">${totalPages}</span></h4> </article>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/page_counters/PageCounter.astro", void 0);

const $$Astro$2 = createAstro();
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { currentPage, totalPages } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="pagination flex justify-center items-center gap-6 pb-6"> ${renderComponent($$result, "Link", $$Link, { "variant": "pagination_link", "href": currentPage > 1 ? `/meals?page=${currentPage - 1}` : null, "class": `prev-btn ${currentPage <= 1 ? "pointer-events-none opacity-25" : "bg-(--secondary-text-color)"}` }, { "default": ($$result2) => renderTemplate` <i class="fas fa-arrow-left"></i> ` })} ${renderComponent($$result, "PageCounter", $$PageCounter, { "currentPage": currentPage, "totalPages": totalPages })} <!-- <span class="flex items-center">Page {currentPage} of {totalPages}</span> --> ${renderComponent($$result, "Link", $$Link, { "variant": "pagination_link", "href": currentPage < totalPages ? `/meals?page=${currentPage + 1}` : null, "class": `next-btn ${currentPage >= totalPages ? "pointer-events-none opacity-25" : "bg-(--secondary-text-color)"}` }, { "default": ($$result2) => renderTemplate` <i class="fas fa-arrow-right"></i> ` })} </article>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/paginations/Pagination.astro", void 0);

const $$Astro$1 = createAstro();
const $$MealsSection = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MealsSection;
  const { class: className, id } = Astro2.props;
  const allMeals = await fetchAllMeals();
  const currentPage = +Astro2.url.searchParams.get("page") || 1;
  const mealsPerPage = 18;
  const totalPages = Math.ceil(allMeals.length / mealsPerPage);
  const mealsForPage = allMeals.slice(
    (currentPage - 1) * mealsPerPage,
    currentPage * mealsPerPage
  );
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "class": "meals-section", "id": "meals_section" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "MealsContainer", $$MealsContainer, { "mealsForPage": mealsForPage })} ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": currentPage, "totalPages": totalPages })} ` })}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/sections/MealsSection.astro", void 0);

const $$Astro = createAstro();
const $$Meals = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Meals;
  const { class: className, id } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Meals" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "variant": "default" }, { "background": ($$result3) => renderTemplate`${maybeRenderHead()}<img src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg" alt="meal" class="absolute inset-0 w-full h-full object-cover rounded-md">`, "default": ($$result3) => renderTemplate`      <h1 class="text-white text-4xl md:text-6xl z-40 text-center">
Delicious Meals
</h1> `, "overlay": ($$result3) => renderTemplate`${renderComponent($$result3, "Overlay", $$Overlay, { "slot": "overlay", "class": "absolute inset-0 bg-dark/50 opacity-25 rounded-md" })}` })}  ${renderComponent($$result2, "MealsSection", $$MealsSection, {})} ` })}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/pages/meals.astro", void 0);

const $$file = "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/pages/meals.astro";
const $$url = "/meals";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Meals,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
