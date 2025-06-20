export default function About() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 min-h-screen">
      {/* Hero Section */}
      <section className="w-full px-4 pt-24 pb-12 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-4">
          About LetsAGoal
        </h1>
        <p className="text-lg sm:text-xl text-indigo-900 max-w-3xl mb-8">
          We believe everyone deserves support in achieving their goals. 
          Whether you prefer to work privately or thrive in a community, 
          we're here to help you succeed.
        </p>
      </section>

      {/* Mission Section */}
      <section className="w-full max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white/80 rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Our Mission</h2>
          <p className="text-indigo-900 text-lg leading-relaxed mb-6">
            LetsAGoal was born from a simple idea: goal achievement shouldn't be a lonely journey. 
            We created a platform that respects your privacy while offering the option to connect 
            with like-minded individuals who can provide encouragement, advice, and accountability.
          </p>
          <p className="text-indigo-900 text-lg leading-relaxed">
            Whether you're building a business, learning a new skill, or working on personal growth, 
            our community is here to support you every step of the way.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 text-center mb-8">Meet the Team</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white/80 rounded-xl p-6 shadow-md text-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">👨‍💻</span>
            </div>
            <h3 className="font-bold text-lg text-indigo-700 mb-2">Alex Chen</h3>
            <p className="text-indigo-900 text-sm">Founder & CEO</p>
          </div>
          <div className="bg-white/80 rounded-xl p-6 shadow-md text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">👩‍🎨</span>
            </div>
            <h3 className="font-bold text-lg text-indigo-700 mb-2">Sarah Kim</h3>
            <p className="text-indigo-900 text-sm">Head of Design</p>
          </div>
          <div className="bg-white/80 rounded-xl p-6 shadow-md text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">👨‍🔬</span>
            </div>
            <h3 className="font-bold text-lg text-indigo-700 mb-2">Mike Johnson</h3>
            <p className="text-indigo-900 text-sm">Lead Developer</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Ready to Start Your Journey?</h2>
        <p className="text-indigo-900 mb-6">
          Join thousands of users who are already achieving their goals with LetsAGoal.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow transition">
            Get Started Free
          </button>
          <button className="bg-white border border-indigo-300 hover:bg-indigo-50 text-indigo-700 font-semibold px-8 py-3 rounded-full shadow transition">
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
} 