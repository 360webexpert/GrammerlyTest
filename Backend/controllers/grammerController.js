const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: "sk-d18144e948fb430aaf1a7e77f46ce0dd", // Relace with your OpenAI API key
});

exports.checkGrammer = async (req, res) => {
    const { text } = req.body;
    console.log('text', text)
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    contact: `Correct the grammer and spelling in the following text: "${text}". Highlight incorrect 
                words with **.`,
                },
            ],
        });
        const correctedText = response.data.choices[0].message.content;
        res.json({ correctedText });
    } catch (error) {
        res.status(500).json({ error: "Error checking grammer" });
    }
};