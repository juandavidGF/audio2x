import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import React, { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const inter = Inter({ subsets: ['latin'] });


export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
}

export default function Home() {

	const { t } = useTranslation('common');
	
	const handleSubmitChat = async (e) => {
		e.preventDefault();
		const question = e.target.question.value;

		const answer = await makeQuestion(arrTranscription, question, false);

		setConversation(conversation => [...conversation, {
			question: question,
			answer: answer.text
		}]);
	}


	const makeQuestion = async (arrTranscriptionLocal, question, test) => {
		const res = await fetch('/api/question', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ 
				document: arrTranscriptionLocal, 
				question: question,
				testMode: test
			}),
		});
		const answer = await res.json();
		return answer;
	}
	
	const handleSuscription = async (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const res = await fetch('/api/suscription', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},

			body: JSON.stringify({
				email: email
			}),
		});
		const answer = await res.json();
		console.log(answer);
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
				<h1 className={styles.title}>{t('title')}</h1>
				<p>{t('p2')}</p>
				<p>{t('p3')}</p>
				<form action={handleSuscription}></form>
      </main>
    </>
  )
}