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