// https://www.youtube.com/watch?v=LTfrJCmWyDU
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.API_KEY_SENDGRID);

// import busboy from "busboy"
// import { S3Client } from "@aws-sdk/client-s3"
// import { Upload } from "@aws-sdk/lib-storage"

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const s3 = new S3Client({ region: process.env.REGION })

// const uploadFile = (req, res) => {
// 	const bb = busboy({ headers: req.headers });

// 	bb.on("file", async (_, file, info) => {
// 		const fileName = info.filename;
// 		console.log("file", file)
// 		console.log("info", info)

// 		try {
// 			console.log("flag");
// 			const parallelUploads = new Upload({
// 				client: s3,
// 				queueSize: 4,
// 				partSize: 1024 * 1024 * 5,
// 				leavePartsOnError: false,
// 				params: {
// 					Bucket: process.env.S3_BUCKET,
// 					Key: `${Math.random().toString(26).substring(2)}-${fileName}`,
// 					Body: file
// 				}
// 			})
// 			console.log("parallelUploads", parallelUploads)
// 		} catch (e) {
// 			console.error(e);
// 		}
// 	});

// 	bb.on("close", () => {
// 		console.log("flag 2");
// 		res.writeHead(200, { Connection: "close"});
// 		res.end('File Uploaded')
// 	})

// 	req.pipe(bb);
// 	return "Ok";
// }

export default async function handler(req, res) {

	let response;

	if(req.method == "POST") {
		console.log('flag1');
		console.log('body', req.body)
		const { key, name, email} = req.body;
		console.log('flag2');


		if(key==="goToPayEmail") {
			const txt = `name: ${name}, email" ${email} , have clicked the ${key} button`
			const subject = `${key} - ${name}`;

			const msg = {
				to: 'juanchoda12@gmail.com', // Recipent
				from: 'support@artmelon.me', // Verified sender
				subject: subject,
				text: txt,
				html: `<strong>${txt}</strong>`,
			}

			try {
				response = await sgMail.send(msg);
			} catch (error) {
				console.error(error);
			}

			console.log("flag2")

			res.status(200).json(response);
		}
	} else {
		switch (req.method) {
			case "POST":
				return uploadFile(req, res);
		}
	}

}