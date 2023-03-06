import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import React, { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

	const { user, error, isLoading } = useUser();
	const [response, setResponse] = useState();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const text = e.target.text.value;
		try {
			const res = await fetch('/api/yt-transcribe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ link: text }),
			});
			const data = await res.json();
			console.log('data: ', data);

			setResponse(data);
		} catch (err) {
			console.log('err', err);
		}
	}


  return (
    <>
      <Head>
        <title>audio2x</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className={styles.main}>
				{user ? (<div className={styles.logout}><Link href="/api/auth/logout"><u>Logout</u></Link></div>) : null}
				<h1>Transcribe a youtube video</h1>
				{user ?
					(<div>
						<form onSubmit={handleSubmit}>
							<div className="upload-image">
								<label htmlFor="text">insert the url: </label>
								<input type="text" id="text" name="text" placeholder='ex: https://www.youtube.com/watch?v=ugIuHWc6Nuc'/>
								<button type="submit">Transcribe</button>
							</div>
						</form>
					</div>)
					: 
					(<div>
						<input type="text" id="text" name="text"/>
						<Link href="/api/auth/login"><button>Transcribe</button></Link>
					</div>)
				}
				<div className={styles.transcription}>
					{response?.prediction.map((item: Object) =>
						{
							return (<div key={item.time_begin}>
								<p>{item.time_begin}</p>
								<p>{item.transcription}</p>
							</div>)
						}
					)}
				</div>
      </main>
    </>
  )
}
