const axios = require('axios');
const FormData = require('form-data');
var fs = require('fs');

const apiKey = process.env["API_KEY_YT_TRANSCRIPTION"]
const endpoint = process.env["ENPOINT_VIDEO_2_TEXT"]



// prediction: [0.39, "To achieve that, I'm going to restart real-time translation. But this time, we will use TrueVoice", 8.67, 'Hola, Adam. Buenos dias. Como estas?', 12.6, 'Hello, good morning, how are you?', 16.44, "Hello, Lewis. I'm great", 18.66, 'Happy Friday', 22.05, "I'm Dan Lewis. Estoy genial", 24.33, 'Phonies be honest', 26.43, '¿Me puedes decir cómo está el clima en Seattle?', 31.86, 'Can you tell me what the weather is like in Seattle?', 35.88, "Today's pretty cold. It's almost freezing", 38.79, "At least it's not raiding", 42.33, 'Oh yes, it was 10 to 3', 44.31, "It's almost frozen, but at least it's not raining", 48.18, 'And tell me, how is your dog?', 52.71, 'and tell me how is your puppy?', 55.53, "Oh, he's great", 57.03, 'You just learned a fetch', 58.68, 'And now all he wants to do is play', 62.25, "It's Tim Wein", 63.6, 'I cover the up in the day']

export default async function handler(req, res) {
	const { body, method } = req;
	const { link, testMode } = body;

	if(method == "POST") {
		try {
			let response = {};
			if(testMode == true) {
				response = { 
					data: {
						prediction: [
							{
								time_begin: 5, 
								transcription: "thank you I'm honored to be with you today for your commencement from one of the finest universities in the world truth be told I never graduated from college and this is the closest I've ever gotten to a college graduation today I want to tell you three stories from my life that's it no big deal just three stories the first story is about connecting the dots I dropped out of Reed College after the first six months but then stayed around as a drop-in for another 18 months or so before I really quit so why did I drop"
							},
							{
								time_begin: 55, 
								transcription: "out it started before I was born my biological mother was a young unwed graduate student and she decided to put me up for adoption she felt very strongly that I should be adopted by college graduates so everything was all set for me to be adopted at Birth by a lawyer and his wife except that when I popped out they decided at the last minute that they really wanted a girl so my parents who were on a waiting list got a call in the middle of the night asking we've got an unexpected baby boy do you want him they said of course my"
							},
							{
								time_begin: 96, 
								transcription: "biological mother found out later that my mother had never graduated from college and that my father had never graduated from high school she refused to sign the final adoption papers she only relented a few months later when my parents promised that I would go to college this was the start in my life and 17 years later I did go to college but I naively chose a college that was almost as expensive as Stanford and all of my working-class parents savings were being spent on my college tuition after six months I"
							},
							{
								time_begin: 134, 
								transcription: "couldn't see the value in it I had no idea what I wanted to do with my life and no idea how college was going to help me figure it out and here I was spending all the money my parents had saved their entire life so I decided to drop out and trust that it would all work out okay it was pretty scary at the time but looking back it was one of the best decisions I ever made the minute I dropped out I could stop taking the required classes that didn't interest me and begin dropping in on the ones that looked far more interesting it wasn't"
							},
							{
								time_begin: 170, 
								transcription: "all romantic I didn't have a dorm room so I slept on the floor in friends rooms I returned coke bottles for the 5 cent deposits to buy food with and I would walk the seven miles across town every Sunday night to get one good meal a week at the Hari Krishna temple I loved it and much of what I stumbled into by following my curiosity and intuition turned out to be priceless later on let me give you one example Reed College at that time offered perhaps the best calligraphy instruction in the country throughout the campus every poster every"
							},
							{
								time_begin: 206,
								transcription: "label on every drawer was beautifully hand calligraphed because I had dropped out and didn't have to take the normal classes I decided to take a calligraphy class to learn how to do this I learned about serif and sans-serif typefaces about varying the amount of space between different letter combinations about what makes great typography great it was beautiful historical artistically subtle in a way that science can't capture and I found it fascinating none of this had even a hope of any practical application in my life but 10 years"
							},
							{
								time_begin: 243, 
								transcription: "later when we were designing the first Macintosh computer it all came back to me and we designed it all into the Mac it was the first computer with beautiful typography if I had never dropped in on that single course in college the Mac would have never had multiple typefaces or proportionally spaced fonts and since windows just copied the Mac it's likely that no personal computer have them if I had never dropped out I would have never dropped in on that calligraphy class and personal computers might not have the wonderful typography"
							},
							{
								time_begin: 281, 
								transcription: "that they do of course it was impossible to connect the dots looking forward when I was in college but it was very very clear looking backwards ten years later again you can't connect the dots looking forward you can only connect them looking backwards so you have to trust that the dots will somehow connect in your future you have to trust in something your gut destiny life karma whatever because believing that the dots will connect down the road will give you the confidence to follow your heart even when it leads you off the well-worn path"
							},
							{
								time_begin: 315, 
								transcription: "and that will make all the difference my second story is about love and loss I was lucky I found what I loved to do early in life woz and I started Apple in my parent's garage when I was 20 we worked hard and in 10 years Apple had grown from just the two of us in a garage into a two billion dollar company with over 4,000 employees we just released our finest creation the Macintosh a year earlier and I just turned 30 and then I got fired how can you get fired from a company you started well as Apple grew we hired someone who"
							},
							{
								time_begin: 360, 
								transcription: "I thought was very talented to run the company with me and for the first year or so things went well but then our visions of the future began to diverge and eventually we had a falling out when we did our Board of Directors sided with him and so at 30 I was out and very publicly out what had been the focus of my entire adult life was gone and it was devastating I really didn't know what to do for a few months I felt that I had let the previous generation of entrepreneurs down that I had dropped the baton as it was being passed to me I"
							},
							{
								time_begin: 392, 
								transcription: "met with David Packard and Bob Noyce and tried to apologize for screwing up so badly I was a very public and I even thought about running away from the valley but something slowly began to dawn on me I still loved what I did the turn of events at Apple had not changed that one bit I've been rejected but I was still in love and so I decided to start over I didn't see it then but it turned out that getting fired from Apple was the best thing that could have ever happened to me the heaviness of being successful was replaced by the"
							},
							{
								time_begin: 428, 
								transcription: "lightness of being a beginner again less sure about everything it freed me to enter one of the most creative periods in my life during the next five years I started a company named next another company named Pixar and fell in love with an amazing woman who would become my wife Pixar went on to create the world's first computer animated feature film Toy Story and is now the most successful animation studio in the world in a remarkable turn of events Apple bought next and I returned to Apple and the technology we developed it next is at"
							},
							{
								time_begin: 482, 
								transcription: "the heart of Apple's current Renaissance and Laureen and I have a wonderful family together I'm pretty sure none of this would have happened if I hadn't been fired from Apple it was awful tasting medicine but I guess the patient needed it sometime life sometimes life's gonna hit you in the head with a brick don't lose faith I'm convinced that the only thing that kept me going was that I loved what I did you've got to find what you love and that is as true for work as it is for your lovers"
							},
							{
								time_begin: 492, 
								transcription: "your work is gonna fill a large part of your life and the only way to be truly satisfied is to do what you believe is great work and the only way to do great work is to love what you do if you haven't found it yet keep looking and don't settle as with all matters of the heart you'll know when you find it and like any great relationship it just gets better and better as the years roll on so keep looking don't settle my third story is about death when I was 17 I read a quote that went something"
							},
							{
								time_begin: 536,
								transcription: "like if you live each day as if it was your last someday you'll most certainly be right it made an impression on me and since then for the past 33 years I've looked in the mirror every morning and asked myself if today were the last day of my life what I want to do what I am about to do today and whenever the answer has been no for too many days in a row I know I need to change something remembering that all be dead soon is the most important tool I've ever encountered to help me make the big choices in life"
							},
							{
								time_begin: 572,
								transcription: "because almost everything all external expectations all pride all fear of embarrassment or failure these things just fall away in the face of death leaving only what is truly important remembering that you are going to die is the best way I know to avoid the trap of thinking you have something to lose you are already naked there is no reason not to follow your heart about a year ago I was diagnosed with cancer I had a scan at 7:30 in the morning and it clearly showed a tumor on my pancreas I didn't even know what a"
							},
							{
								time_begin: 609,
								transcription: "pancreas was the doctors told me this was almost certainly a type of cancer that is incurable and that I should expect to live no longer than three to six months my doctor advised me to go home and get my affairs in order which is doctors code for prepare to die it means to try and tell your kids everything you thought you'd have the next 10 years to tell them in just a few months it means to make sure everything is buttoned up so that will be as easy as possible for your family it means to say your goodbyes I live with that"
							},
							{
								time_begin: 646,
								transcription: "diagnosis all day later that evening I had a biopsy where they stuck an endoscope down my throat through my stomach and into my intestines put a needle into my pancreas and got a few cells from the tumor I was sedated but my wife who was there told me that when they viewed the cells under a microscope the doctor started crying because it turned out to be a very rare form of pancreatic cancer that is curable with surgery I had the surgery and thankfully I'm fine now this was the closest I've been to facing"
							},
							{
								time_begin: 687,
								transcription: "death and I hope it's the closest I get for a few more decades having lived through it I can now say this to you with a bit more certainty than when death was a useful but purely intellectual concept no one wants to die even people who want to go to heaven don't want to die to get there and yet death is the destination we all share no one has ever escaped it and that is as it should be because death is very likely the single best invention of life its life's change agent it clears out the old to make way for the new"
							},
							{
								time_begin: 723,
								transcription: "right now the new is you but some day not too long from now you will gradually become the old and be cleared away sorry to be so dramatic but it's quite true your time is limited so don't waste it living someone else's life don't be trapped by Dogma which is living with the results of other people's thinking don't let the noise of others opinions drown out your own inner voice and most important have the courage to follow your heart and intuition they somehow already know what you truly want to become everything else"
							},
							{
								time_begin: 761,
								transcription: "is secondary when I was young there was an amazing publication called the Whole Earth Catalog which was one of the Bible's of my generation it was created by a fellow named Stuart brand not far from here in Menlo Park and he brought it to life with his poetic touch this was in the late 60s before personal computers and desktop publishing so it was all made with typewriters scissors and Polaroid cameras it was sort of like Google and paperback form 35 years before Google came along it was idealistic overflowing"
							},
							{
								time_begin: 806,
								transcription: "with neat tools and great notions Stuart and his team put out several issues of the Whole Earth Catalog and then when it had run its course they put out a final issue it was the mid-1970s and I was your age on the back cover of their final issue was a photograph of an early-morning country road the kind you might find yourself hitchhiking on if you were so adventurous beneath it were the words stay hungry stay foolish it was their farewell message as they signed off stay hungry stay foolish and I have always"
							},
							{
								time_begin: 845,
								transcription: "wished that for myself and now as you graduate to begin anew I wish that for you stay hungry stay foolish thank you all very much"
							}
						]
					}
				}
				await waitforme(2000);
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


function waitforme(millisec) {
	return new Promise(resolve => {
			setTimeout(() => { resolve('') }, millisec);
	})
}
