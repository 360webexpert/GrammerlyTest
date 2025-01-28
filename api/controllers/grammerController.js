const { OpenAI } = require('openai');
const openai = new OpenAI({

    apiKey: "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", // Relace with your OpenAI API key
});

// const openai = new OpenAI(configuration);

exports.checkGrammer = async (req, res) => {
    const { text } = req.body;
    console.log('text', text)
    if (!text || typeof text !== "string" || text.trim() === "") {
        return res.status(400).json({ error: "Invalid input: 'text' must be a non-empty string." });
    }
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",

            messages: [
                {
                    role: "user",
                    content: `Correct the grammar and spelling in the following text: "${text}". Highlight incorrect words with underlines and provide the corrected text. Also, list the incorrect words along with their suggested corrections in this format:
          
          Incorrect: [incorrect word]
          Correct: [suggested correction]
          
          Return the corrected text and the list of incorrect words with suggestions.`,
                },
            ],
        }
        );
        console.log('deepseekresponse', response)
        const responseText = response?.choices[0]?.message.content;

        const correctedText = responseText.split("\n\n")[0];

        const suggestions = responseText.split("\n\n").slice(1).join("\n\n");

        // const differences = diff?.diffWords(text, correctedText)

        // const incorrectWords = differences.filter(
        //     (diff) => diff.added || diff.removed
        // )
        //     .map((part) => part.value.trim()).filter((word) => word !== "**")
        res.json({ correctedText, suggestions });
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ error: "Error checking grammer" });
    }
};