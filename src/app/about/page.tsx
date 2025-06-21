import Link from "next/link";

export default function About() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 min-h-screen">
      {/* Hero Section */}
      <section className="w-full px-4 pt-24 pb-12 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-4">
          About LetsAGoal
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Let&apos;s A Goal is your personal goal-setting companion, designed to help you achieve your dreams one step at a time. Whether you&apos;re working towards fitness goals, career milestones, or personal development, our platform provides the tools and motivation you need to succeed.
        </p>
      </section>

      {/* Mission Section */}
      <section className="w-full max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white/80 rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Our Mission</h2>
          <p className="text-indigo-900 text-lg leading-relaxed mb-6">
            To empower individuals to set, track, and achieve their goals through an intuitive and motivating platform that makes goal-setting accessible to everyone.
          </p>
          <p className="text-indigo-900 text-lg leading-relaxed">
            Whether you&apos;re building a business, learning a new skill, or working on personal growth, 
            our community is here to support you every step of the way.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 text-center mb-8">Meet the Team</h2>
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-1 max-w-2xl mx-auto">
          <div className="bg-white/80 rounded-xl p-6 shadow-md text-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">👨‍💻</span>
            </div>
            <h3 className="font-bold text-lg text-indigo-700 mb-2">Austin Mann</h3>
            <p className="text-indigo-900 text-sm">Founder & Developer</p>
            <p className="text-indigo-600 text-sm mt-2">
              Building tools to help people achieve their goals, one step at a time.
            </p>
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
          <Link href="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow transition">
            Get Started Free
          </Link>
          <Link href="/pricing" className="bg-white border border-indigo-300 hover:bg-indigo-50 text-indigo-700 font-semibold px-8 py-3 rounded-full shadow transition">
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
} 