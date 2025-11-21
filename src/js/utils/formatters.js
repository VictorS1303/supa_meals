export const formatInstructions = (rawCookingInstruction) =>
{
    if(!rawCookingInstruction)
    {
        return []
    }

    return rawCookingInstruction
        .replace(/\s+/g, ' ')
        .trim()  
        .split(/\r?\n+/)
        .map((step) => step.trim())
        .filter(Boolean)
        .flatMap((paragraph) =>
            paragraph
                .split(/(?<=\.)\s+/)
                .map((string) => string.trim())
                .filter(Boolean)
        )

        .filter(
            sentence => !/^step\s*\d+/i.test(sentence)  // remove sentences like "Step 1" (case-insensitive)
        );
}