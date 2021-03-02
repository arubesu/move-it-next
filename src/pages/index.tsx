import Head from 'next/head'
import { GetServerSideProps } from 'next'
import React from 'react'
import { ChallengeBox } from '../components/ChallengeBox'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { CountDown } from '../components/CountDown'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { ChallengeContextProvider } from '../contexts/ChallengesContext'
import { CountdownContextProvider } from '../contexts/CountdownContext'
import styles from '../styles/pages/Home.module.css'

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <div className={styles.container}>
      <ChallengeContextProvider
        level={props.level}
        challengesCompleted={props.challengesCompleted}
        currentExperience={props.currentExperience}>
        <Head>
          <title>Início | Move.it</title>
        </Head>
        <ExperienceBar />

        <CountdownContextProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <CountDown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownContextProvider>
      </ChallengeContextProvider>
    </div >
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const {
    level,
    currentExperience,
    challengesCompleted
  } = context.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
