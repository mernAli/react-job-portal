import React, { useRef } from 'react'
import Hero from '../components/Landing/Hero'
import Features from '../components/Landing/Features'
import CTA from '../components/Landing/CTA'
import Footer from '../components/Landing/Footer'
import LandingNavbar from '../components/Landing/LandingNavbar'
import JobGrid from '../components/Landing/JobGrid'

const Landing = () => {

  const jobsRef = useRef(null);
  const featuresRef = useRef(null);
  const contactsRef = useRef(null);

  return (
    <main className='bg-slate-900 text-white'>
        <LandingNavbar 
          onJobsClick={() => 
            jobsRef.current.scrollIntoView({ behavior: "smooth" })
          }
          onFeateresClick={() => 
            featuresRef.current.scrollIntoView({ behavior: "smooth" })
          }
          onContactsClick={() => 
            contactsRef.current.scrollIntoView({ behavior: "smooth" })
          }
        />

        <Hero />

        {/* Jobs section */}
        <div ref={jobsRef}>
          <JobGrid />
        </div>
        
        {/* Features section */}
        <div ref={featuresRef}>
          <Features />
        </div>
         
        <CTA /> 

        {/* Foooter sectionis treating as contact section */}
        <div ref={contactsRef}>
          <Footer />
        </div>
        
    </main>
  )
}

export default Landing