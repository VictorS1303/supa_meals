export const getYouTubeId = (url) =>
{
    if(!url)
    {
        return null
    }

    url = url.trim()

    try {
    // Standard YouTube URL
    if (url.includes("watch?v=")) {
      const parsed = new URL(url);
      return parsed.searchParams.get("v");
    }

    // Shortened URL
    if (url.includes("youtu.be/")) {
      const parts = url.split("youtu.be/");
      return parts[1].split("?")[0]; // remove extra query params if any
    }
  } catch (err) {
    console.error("Invalid YouTube URL:", url);
    return null;
  }

  return null;
}