import React from 'react'
import Hero from '../components/Landing/Hero'
import Features from '../components/Landing/Features'
import CTA from '../components/Landing/CTA'
import Footer from '../components/Landing/Footer'

const Landing = () => {
  return (
    <main className='bg-slate-900 text-white'>
        <Hero />
        <Features /> 
        <CTA /> 
        <Footer />
    </main>
  )
}

export default Landing