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
	const [suscribted, setSuscribted] = useState(false);

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

		const email = e.target.email.value;
		const name = e.target.name.value;
		if (!email || !name) {
			alert("debes completar los campos")
			return;
		};
		console.log(email, name);

		const res = await fetch('/api/suscription', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},

			body: JSON.stringify({
				name: name,
				email: email,
				appName: "multi-cap"
			}),
		});

		const data = await res.json();
		console.log(data);
		
		if(data.success === 'Ok') {
			setSuscribted(true);
			document.getElementById('status').style.color  = "green"
			document.getElementById('status').innerHTML = 'Successful Subscription';
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
							{!suscribted ? (
								<form className={styles.form} onSubmit={handleSuscription}>
									<input type="text" name="name" placeholder={t('Full Name')} />
									<input type="email" name="email" placeholder="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
									<button className={styles.suscribe} type="submit">{t('Sing Up')}</button>
								</form>
							) : null}
							<div id='status'></div>
						</div>
					) : null}
				</div>
					{true ? (
						<div className={styles.two}>
							<h2><span className={styles.multiCap}>multi-cap</span> <span>{t('title')}</span></h2>
							<p>{t('subtitle')}<span className={styles.multiCap}> {t('span subtitle')}</span>. </p>
							<div/>
							<button className={styles.getStarted} style={!start ? {visibility: 'visible'} : {visibility: 'collapse'} } onClick={getStarted}>{t('Get Started')}</button>
						</div>
					) : null}
      </main>
    </>
  )
}
