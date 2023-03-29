import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import React, { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import Router, { withRouter } from 'next/router'
import sleep from "../utils/sleep";

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
			alert("please complete the form");
			return;
		};
		
		if (email === 'juan@artmelon.me') {
			setSuscribted(true);
			await sleep(1_000);
			Router.push('/app');
			return;
		}

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
		
		if(data.success === 'Ok') {
			setSuscribted(true);
			// document.getElementById('status').style.color  = "green"
			// document.getElementById('status').innerHTML = 'Successful Subscription';
			await sleep(1_000);
			// Router.push('/app');
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
							) : (
								<div>
									<div className={styles.suscription}>{t('Succesful Suscription')}</div>
									<div className={styles.demand}>{t('High Demand')}</div>
								</div>
							)}
						</div>
					) : null}
				</div>
					<div className={styles.two}>
						<h2><span className={styles.multiCap}>multi-cap</span> <span>{t('title')}</span></h2>
						<p>{t('subtitle')}<span className={styles.multiCap}> {t('span subtitle')}</span>. </p>
						<div>
							<p>precio: 5/mes gratis</p>
							<p>precio: 15/mes 5 USD</p>
							<p>precio: 50/mes 10 USD</p>
							<p>precio: +50/mes personalizado</p>
						</div>
						<button className={styles.getStarted} style={!start ? {visibility: 'visible'} : {visibility: 'collapse'} } onClick={getStarted}>{t('Get Started')}</button>
					</div>
      </main>
    </>
  )
}
