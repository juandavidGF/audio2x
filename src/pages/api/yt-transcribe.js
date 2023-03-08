const axios = require('axios');
const FormData = require('form-data');
var fs = require('fs');

const apiKey = process.env["API_KEY_YT_TRANSCRIPTION"]
const endpoint = process.env["ENPOINT_VIDEO_2_TEXT"]

export default async function handler(req, res) {
	const { body, method } = req;
	const { link, testMode } = body;

	if(method == "POST") {
		try {
			let response = {};
			if(testMode == true) {
				response = { 
					data: {
						prediction: [0.39, "To achieve that, I'm going to restart real-time translation. But this time, we will use TrueVoice", 8.67, 'Hola, Adam. Buenos dias. Como estas?', 12.6, 'Hello, good morning, how are you?', 16.44, "Hello, Lewis. I'm great", 18.66, 'Happy Friday', 22.05, "I'm Dan Lewis. Estoy genial", 24.33, 'Phonies be honest', 26.43, '¿Me puedes decir cómo está el clima en Seattle?', 31.86, 'Can you tell me what the weather is like in Seattle?', 35.88, "Today's pretty cold. It's almost freezing", 38.79, "At least it's not raiding", 42.33, 'Oh yes, it was 10 to 3', 44.31, "It's almost frozen, but at least it's not raining", 48.18, 'And tell me, how is your dog?', 52.71, 'and tell me how is your puppy?', 55.53, "Oh, he's great", 57.03, 'You just learned a fetch', 58.68, 'And now all he wants to do is play', 62.25, "It's Tim Wein", 63.6, 'I cover the up in the day']
					}
				}
			} else if(testMode === false) {
				const form = new FormData();
				form.append('audio_url', link);
				form.append('language', 'english');
				form.append('language_behaviour', 'automatic single language');
				form.append('output_format', 'json');
	
				response = await axios.post(
					endpoint,
						form,
						{
							headers: {
								...form.getHeaders(),
								'accept': 'application/json',
								'x-gladia-key': apiKey,
								'Content-Type': 'multipart/form-data'
							}
						}
				);
				// console.log('handler#response.data: ', response.data)
				// await fs.writeFileSync('./data.json', JSON.stringify(response.data)
			}
			
			return res.status(200).json(response.data);

		} catch (error) {
			console.log('handler#err', error);
			return res.status(500);
		}
	}
}
