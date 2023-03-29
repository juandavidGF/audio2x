import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/App.module.css'
import Link from 'next/link'
import React, { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import DropZone from "../components/DropZone"
import sleep from "../utils/sleep"

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
	const [loading, setLoading] = useState(false);
	const [videoURL, setVideoURL] = useState(null);

	const { t } = useTranslation('common');

	const getStarted = () => {
		setStarted(true);
	}

	const handleVideoChange = async (newVideo) => {
		const urlVideo = URL.createObjectURL(newVideo);
    setVideoURL(urlVideo);
  };

	const handleTranslate = async () => {
		if(!videoURL) {
			alert("Please upload a video");
			return;
		}

		setLoading(true);
		await sleep(10_000);
		const urlVideo = '/video_with_captions.mp4';
		setLoading(false);
		setVideoURL(urlVideo);
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
				<DropZone onVideoChange={handleVideoChange} loading={loading} setLoading={setLoading} videoURL={videoURL}/>
				<button onClick={handleTranslate}>{t('Translation')}</button>
      </main>
    </>
  )
}
