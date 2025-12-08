export const formatInstructions = (rawCookingInstruction) => {
    if (!rawCookingInstruction) {
        return [];
    }

    return rawCookingInstruction
        .trim()
        .split(/\r?\n+/)  // Split on newlines FIRST
        .map((step) => step.trim())
        .filter(Boolean)
        .filter(line => !/^step\s*\d+$/i.test(line))  // Remove lines that are ONLY "step 1", "step 2", etc.
        .flatMap((paragraph) =>
            paragraph
                .split(/(?<=\.)\s+/)  // Then split sentences
                .map((string) => string.trim())
                .filter(Boolean)
        );
}

// Greeting formatter
export const formatGreeting = (timeOfDay) => {
  const currentHour = new Date().getHours()
  
  if (currentHour >= 0 && currentHour < 9) {
    return `Good ${timeOfDay || 'morning'}`
  }
  else if (currentHour >= 9 && currentHour < 12) {
    return `Good ${timeOfDay || 'day'}`
  }
  else if (currentHour >= 12 && currentHour < 17) {
    return `Good ${timeOfDay || 'afternoon'}`
  }
  else {
    return `Good ${timeOfDay || 'evening'}`
  }
}

// Slugify
export function slugify(title)
{
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
}