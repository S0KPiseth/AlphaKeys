export const fetchRandomWords = async (count) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_RANDOM_WORD_API_URL}?number=${count}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching words:", error);
        return [];
    }
};
