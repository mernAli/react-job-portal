import { Link, useNavigate } from "react-router-dom";

const CTA = () => {

    const navigate = useNavigate();

  return (
    <section className="py-20 px-6 bg-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold">
          Ready to take the next step?
        </h2>

        <p className="mt-4 text-slate-400">
          Join thousands of professionals finding better opportunities.
        </p>

        <button 
            onClick={() => navigate('/app')}
            className="mt-8 px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

export default CTA;
