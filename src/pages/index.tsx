import Head from 'next/head'
import React from 'react'
import { Profile } from '../components/Profile'

export default function Home() {
  return (
    <div className="container">
      <section>
        <div>
          <Profile />
        </div>
        <div></div>
      </section>
    </div>
  )
}
