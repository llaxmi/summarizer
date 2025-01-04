import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { OpenAI } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

const llm = new OpenAI({
  model: "gpt-4o",
  temperature: 0,
  apiKey: process.env.OPENAI_API_KEY,
});
export const summarizePDF = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const loader = new PDFLoader(new Blob([buffer]));
  const docs = await loader.load();

  const prompt = PromptTemplate.fromTemplate(
    `You are an expert document summarizer. Your goal is to provide a clear and concise summary of the retrieved documents. 
    Follow these guidelines:
    
    - Write **at least two well-structured paragraphs** that summarize the main themes and ideas but make as short as possible.
    - Highlight the key points in **bullet format** within separate paragraphs.
    - Use **bold text for titles** or significant headings.
    - Ensure the summary is clean, professional, and to the point.
    - Be mindful of formatting: maintain proper new lines and spacing for readability.
    
    Context: {context}`
  );

  const chain = await createStuffDocumentsChain({
    llm: llm,
    outputParser: new StringOutputParser(),
    prompt,
  });
  const result = await chain.invoke({ context: docs });
  return result;
};
