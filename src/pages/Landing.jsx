import React, { useRef } from 'react'
import Hero from '../components/Landing/Hero'
import Features from '../components/Landing/Features'
import CTA from '../components/Landing/CTA'
import Footer from '../components/Landing/Footer'
import LandingNavbar from '../components/Landing/LandingNavbar'
import JobGrid from '../components/Landing/JobGrid'

const Landing = () => {

  const homeRef = useRef(null)
  const jobsRef = useRef(null);
  const featuresRef = useRef(null);
  const contactsRef = useRef(null);

  
  return (

    <main className='relative bg-slate-900 text-white min-h-screen overflow-hidden'>

        <div className='relative z-10'>
        <LandingNavbar 
          onHomeClick={() =>
            homeRef.current.scrollIntoView({ behavior: "smooth" })
          }
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

        <div ref={homeRef}>
          <Hero />
        </div>
        

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
       </div> 
    </main>
  )
}

export default Landing