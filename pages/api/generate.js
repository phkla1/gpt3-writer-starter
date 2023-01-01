import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `
Write a comprehensive tutorial in powerpoint slide format on the topic below.It should have more than 40 slides, be segmented into sections, and be targeted at Nigerian small business owners. Include discussion and usage examples of the top 3 management tools and techniques relevant to the topic. Sections should consist of a relevant quote from a famous person (one slide), an explanation of the relevant topic/concept for that section (multiple slides), a FMCG case study, and a suggestion for a practical 10-20 minute activity for students. 
Topic:  
`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 4000,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;