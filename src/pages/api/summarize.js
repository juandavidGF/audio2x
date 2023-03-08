import { OpenAI } from "langchain/llms";
import { loadQAChain } from "langchain/chains";
import { Document } from "langchain/document";

const llm = new OpenAI({});
const chain = loadQAChain(llm);


export default async function handler(req, res) {
	const { body, method } = req;
	const document = body.document;
	const testMode = body.testMode;

	if(method == "POST") {
		let summary = {};
		try {
			if(testMode) {
				console.log('summarize#testModexxxxxxxx');
				summary = {
					text: " Dan Lewis is using TrueVoice real-time translation to communicate with Adam and Lewis. The weather in Seattle is very cold, but not raining. Dan's puppy has learned how to fetch and loves to play."
				}
			} else {
				let docs = [];
				console.log('summarize#document', document);
				for(let item of document) {
					docs.push(new Document({ pageContent: item}));
				}
				summary = await chain.call({
					input_documents: docs,
					question: "make a summarization in 4 points",
				});
				console.log("summarize#prodMode#res", summary);
			}

			res.status(200).json(summary);
		} catch (error) {
			console.log('summarize#handler#err', error);
			return res.status(500);
		}
	}
}