import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingNavbar = ({ onJobsClick, onFeateresClick, onContactsClick }) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate()

  return (
    <nav className="w-full bg-black text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-500">
          ZecPath
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-gray-300">
          <li className="hover:text-blue-500 cursor-pointer">Home</li>

          <li 
            className="hover:text-blue-500 cursor-pointer"
            onClick={onJobsClick}
          >
            Jobs
          </li> 

          <li 
            className="hover:text-blue-500 cursor-pointer" 
            onClick={onFeateresClick}
          >
            Features
          </li>

          <li  
            className="hover:text-blue-500 cursor-pointer"
            onClick={onContactsClick}
          >
            Contact
          </li>
        </ul>

        {/* CTA */}
        <button 
            className="hidden md:block bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full"
            onClick={() => navigate('/app')}
        >
          Get Started
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 bg-[#111] rounded-xl p-4 space-y-4">
          <p className="text-gray-300">Home</p>

          <p 
            className="text-gray-300"
            onClick={() => {
                onJobsClick()
                setOpen(false)
            }}
          >
            Jobs
          </p>

          <p 
            className="text-gray-300"
            onClick={() => {
                onFeateresClick()
                setOpen(false)
            }}
          >
            Features
          </p>


          <p 
            className="text-gray-300"
            onClick={() => {
                onContactsClick()
                setOpen(false)
            }}
          >
            Contacts
          </p>
          <button
            onClick={() => navigate('/app')}
            className="w-full bg-blue-600 py-2 rounded-full mt-10"
          
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
