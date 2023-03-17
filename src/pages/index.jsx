import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import React, { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
}

export default function Home() {

	const [start, setStarted] = useState(false);
	const { t } = useTranslation('common');
	
	// const handleSubmitChat = async (e) => {
	// 	e.preventDefault();
	// 	const question = e.target.question.value;

	// 	const answer = await makeQuestion(arrTranscription, question, false);

	// 	setConversation(conversation => [...conversation, {
	// 		question: question,
	// 		answer: answer.text
	// 	}]);
	// }


	// const makeQuestion = async (arrTranscriptionLocal, question, test) => {
	// 	const res = await fetch('/api/question', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({ 
	// 			document: arrTranscriptionLocal, 
	// 			question: question,
	// 			testMode: test
	// 		}),
	// 	});
	// 	const answer = await res.json();
	// 	return answer;
	// }
	
	const handleSuscription = async (e) => {
		e.preventDefault();

		const email = e.target.email.value;if (!email) return;

		const res = await fetch('/api/suscription', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},

			body: JSON.stringify({
				email: email,
				appName: "multi-caption"
			}),
		});

		const answer = await res.json();
		console.log(answer);
		
		if(data.success === 'Ok') {
			document.getElementById('status').style.color  = "green"
			document.getElementById('status').innerHTML = 'Subscription successful';
		} else {
			document.getElementById('status').style.color  = "red"
			document.getElementById('status').innerHTML = 'Error';
		}
	}

	const getStarted = () => {
		setStarted(true);
	}

  return (
    <>
      <Head>
        <title>captions multi-language</title>
        <meta name="description" content="generate captions multi-language"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className={styles.main}>
				<div className={styles.one}>
					{start ? (
						<div className={styles.formContainer}>
							<form className={styles.form} action={handleSuscription}>
								<input type="email" name="email" placeholder="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
								<button className={styles.suscribe} type="submit">{t('cta-button')} </button>
								<div id='status'></div>
							</form>
						</div>
					) : null}
				</div>
					{true ? (
						<div className={styles.two}>
							{/* <h1 className={styles.title}>Create multi-language captions</h1> */}
							<h2><span className={styles.multiCap}>multi-cap</span> <span>generate subtitles in any language for your videos 🎧</span></h2>
							<p>we enable the borders to disappear and help your influence goes beyond the <span className={styles.multiCap}>language barriers</span>. </p>
							{/* <p>Crate a global audience</p> */}
							<div/>
							<button className={styles.getStarted} style={!start ? {visibility: 'visible'} : {visibility: 'hidden'} } onClick={getStarted}>Get Started</button>
						</div>
					) : null}
      </main>
    </>
  )
}
