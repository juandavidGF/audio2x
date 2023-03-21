import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/App.module.css'
import Link from 'next/link'
import React, { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import DropZone from "../components/DropZone";

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
}

export default function Home() {

	const [loading, setLoading] = useState(false);
	const [video, setVideo] = useState(null);

	const { t } = useTranslation('common');

	const getStarted = () => {
		setStarted(true);
	}

	const handleVideoChange = (newVideo) => {
    setVideo(newVideo);
  };

	const uploadVideo = async (e) => {
		e.preventDefault();
		// const video = e.target.video.value;
		console.log(e.target)
		setLoading(true);
		await sleep(3_000);
	}

	const handleClick = async () => {
		await sleep(3_000);
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
				{video ? (
					<div className={styles.videoContainer}>
						<p>Video selected: {video.name}</p>
						<video
							src={URL.createObjectURL(video)}
							controls
							style={{ maxWidth: '500px', maxHeight: '500px' }}
						></video>
					</div>
					) : (
						<DropZone onVideoChange={handleVideoChange} />
					)
				}
      </main>
    </>
  )
}
