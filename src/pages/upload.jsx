import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router'
import axios from 'axios';
import { useState } from 'react'
import Link from 'next/link'
import styles from '@/styles/Upload.module.css'
// import FormData from 'form-data';
// import fs from 'fs';


// import { authOptions } from 'pages/api/auth/[...auth0]'
// import { unstable_getServerSession } from "next-auth/next"

// export async function getServerSideProps(context) {
//   const session = await unstable_getServerSession(context.req, context.res, authOptions)

// 	console.log(session)

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: {
//       session,
//     },
//   }
// }

const UPLOAD_FILES = false;

export default function Upload() {
	const { user, errorUser, isLoading } = useUser();
	const router = useRouter()

	const [file, setFile] = useState();
	const [progress, setProgress] = useState();
	const [errorUpload, setErrorUpload] = useState(null);
	const [submitting, setSubmitting] = useState(false);

	const [modalOpen, setModalOpen] = useState(false);


	if (isLoading) return <div>Loading...</div>;
  if (errorUser) return <div>{errorUser.message}</div>;

	if(!user) router.push('/')

	const handleChange = (e) => {
		setFile(e.target.files[0]);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!file) {
			alert("not Files")
			return;
		}


		if(!UPLOAD_FILES) {
			setTimeout(()=> setModalOpen(true), 2_500)

			return;
		}

		setSubmitting(true)

		const formData = new FormData();
		formData.append("file", file);
		formData.append("fileName", file.name);

		const config = {
			headers: {
				"content-type": "multipart/form-data"
			},
			onUploadProgress: (progress) => {
				const percentComplete = Math.round(progress.loaded * 100) / progress.total;
			}
		}

		try {
			await axios.post("/api/upload", formData, config)
		} catch (error) {
			setError(e.message);
		} finally {
			setSubmitting(false);
			setProgress(0);
		}
	}

	const handleGoPaymentClose = async ()  => {

		const config = {
			headers: {
				"content-type": "application/json"
			}
		}

		const data = {
			key: "goToPayEmail",
			name: user.name,
			email: user.email
		}

		await axios.post("/api/sg-upload", data, config);

		setModalOpen(!modalOpen);
		router.push('/api/auth/logout');
		// router.push('/');
	}

	return (
		<div className={styles.content}>
			{user && (
				<div>
					<div>
						{/* <img src={user.picture} alt={user.name} /> */}
						{errorUpload && <p>{errorUpload}</p>}
						{submitting && <p>{progress}%</p>}
						<form onSubmit={handleSubmit}>
							<div className={styles.form}>
								<h3>Upload files:</h3>
								{/* <input type="file" onChange={handleChange} id="files" name="files" multiple/> */}
								<input type="file" onChange={handleChange} id="file" name="file"/>
								<button type="submit">Upload</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
  );
}