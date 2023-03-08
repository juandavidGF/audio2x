import { OpenAI } from "langchain/llms";
import { loadQAChain } from "langchain/chains";
import { Document } from "langchain/document";

const llm = new OpenAI({});
const chain = loadQAChain(llm);


export default async function handler(req, res) {
	const { body, method } = req;
	const document = body.document;
	const testMode = body.testMode;
	const question = body.question;

	if(method == "POST") {
		let answer = {};
		try {
			if(testMode) {
				answer = {
					text: " 1. Connect the dots in your life by following your curiosity and intuition. 2. Find what you love and strive for great work. 3. Remember that you are going to die to help make the big decisions in life. 4. Stay hungry and stay foolish."
				}
			} else {
				let docs = [];
				console.log('summarize#document', document);
				for(let item of document) {
					// TODO concatenate the array
					docs.push(new Document({ pageContent: item}));
				}
				answer = await chain.call({
					input_documents: docs,
					question: question,
				});
				// console.log("summarize#prodMode#res", answer);
			}

			res.status(200).json(answer);
		} catch (error) {
			console.log('summarize#handler#err', error);
			return res.status(500);
		}
	}
}