import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export const loadDocument = async (file: File) => {
  const loader = new PDFLoader(file, {
    splitPages: false,
  });
  const docs = await loader.load();
  return docs;
};
