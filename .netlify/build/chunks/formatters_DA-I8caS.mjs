const formatInstructions = (rawCookingInstruction) => {
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
};

// Greeting formatter
const formatGreeting = (timeOfDay) => {
  const currentHour = new Date().getHours();
  
  if (currentHour >= 0 && currentHour < 9) {
    return `Good ${'morning'}`
  }
  else if (currentHour >= 9 && currentHour < 12) {
    return `Good ${'day'}`
  }
  else if (currentHour >= 12 && currentHour < 17) {
    return `Good ${'afternoon'}`
  }
  else {
    return `Good ${'evening'}`
  }
};

// Date formatter
const formatCommentPostDate = (timeSinceCommentPost) => {
  const now = Date.now();
  const timeDifference = now - timeSinceCommentPost;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (seconds < 60) {
    return 'Just now'
  }
  
  if (minutes < 60) {
    return `Comment posted ${minutes} minute${minutes > 1 ? 's' : ''} ago`
  }
  
  if (hours < 60) {
    return `Comment posted ${hours} minute${hours > 1 ? 's' : ''} ago`
  }
  
  if (days < 7) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  }
  
  // If comments are more than a week old, show the actual date
  const date = new Date(timeSinceCommentPost);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
  
  return formattedDate
};

// Format date
const formatDate = (dateFormat, monthFormat, dayFormat, yearFormat) =>
{
  const date = new Date(dateFormat);
  
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: monthFormat,
    day: dayFormat,
    year: yearFormat,
  })
  .format(date);

  return formattedDate
};

export { formatDate as a, formatInstructions as b, formatCommentPostDate as c, formatGreeting as f };
