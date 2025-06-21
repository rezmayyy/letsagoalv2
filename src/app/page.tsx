import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 min-h-screen flex flex-col justify-between font-sans">
      {/* Hero Section */}
      <section className="w-full px-4 pt-16 pb-12 flex flex-col items-center text-center bg-gradient-to-b from-blue-100/80 to-transparent">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-4 drop-shadow-sm">
          LetsAGoal – Your Goals, Encouraged
        </h1>
        <p className="text-lg sm:text-xl text-indigo-900 max-w-2xl mb-8">
          Track your goals privately or share them for support from a like-minded community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow transition">
            Get Started Free
          </button>
          <button className="bg-white border border-indigo-300 hover:bg-indigo-50 text-indigo-700 font-semibold px-8 py-3 rounded-full shadow transition">
            Upgrade to Pro
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-4xl mx-auto px-4 py-12 grid gap-8 sm:grid-cols-3 text-center">
        <div className="bg-white/80 rounded-xl p-6 shadow-md flex flex-col items-center">
          <span className="text-3xl mb-2">🎯</span>
          <h3 className="font-bold text-lg text-indigo-700 mb-1">Goal Tracking</h3>
          <p className="text-indigo-900 text-sm">Set, update, and complete your goals with ease.</p>
        </div>
        <div className="bg-white/80 rounded-xl p-6 shadow-md flex flex-col items-center">
          <span className="text-3xl mb-2">📝</span>
          <h3 className="font-bold text-lg text-indigo-700 mb-1">Task Management</h3>
          <p className="text-indigo-900 text-sm">Break goals into actionable tasks and stay organized.</p>
        </div>
        <div className="bg-white/80 rounded-xl p-6 shadow-md flex flex-col items-center">
          <span className="text-3xl mb-2">⏰</span>
          <h3 className="font-bold text-lg text-indigo-700 mb-1">Deadline Reminders</h3>
          <p className="text-indigo-900 text-sm">Never miss a deadline with gentle reminders.</p>
        </div>
      </section>

      {/* Pro Section */}
      <section className="w-full max-w-4xl mx-auto px-4 py-12 flex flex-col items-center text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-4">Unlock Pro Features</h2>
        <div className="grid gap-8 sm:grid-cols-3 w-full">
          <div className="bg-purple-50 rounded-xl p-6 shadow flex flex-col items-center">
            <span className="text-3xl mb-2">🌐</span>
            <h3 className="font-semibold text-purple-700 mb-1">Shareable Public Goals</h3>
            <p className="text-purple-900 text-sm">Inspire others and get feedback by sharing your progress.</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-6 shadow flex flex-col items-center">
            <span className="text-3xl mb-2">💬</span>
            <h3 className="font-semibold text-purple-700 mb-1">Comments & Encouragement</h3>
            <p className="text-purple-900 text-sm">Receive tips and encouragement from the community.</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-6 shadow flex flex-col items-center">
            <span className="text-3xl mb-2">🔓</span>
            <h3 className="font-semibold text-purple-700 mb-1">One-Time Upgrade</h3>
            <p className="text-purple-900 text-sm">Pay once, unlock forever. No subscriptions.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full max-w-3xl mx-auto px-4 py-12 flex flex-col items-center text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8">Simple Pricing</h2>
        <div className="flex flex-col sm:flex-row gap-8 w-full justify-center">
          <div className="flex-1 bg-white/90 rounded-xl p-8 shadow border border-indigo-100">
            <h3 className="text-lg font-bold text-indigo-700 mb-2">Free</h3>
            <p className="text-indigo-900 mb-4">Basic goal tracking for everyone.</p>
            <div className="text-3xl font-extrabold text-indigo-600 mb-2">$0</div>
            <ul className="text-indigo-900 text-sm mb-4">
              <li>✔️ Unlimited goals</li>
              <li>✔️ Task management</li>
              <li>✔️ Deadline reminders</li>
            </ul>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-full shadow transition">
              Get Started
            </button>
          </div>
          <div className="flex-1 bg-purple-50 rounded-xl p-8 shadow border border-purple-100">
            <h3 className="text-lg font-bold text-purple-700 mb-2">Pro</h3>
            <p className="text-purple-900 mb-4">Unlock community features with a one-time payment.</p>
            <div className="text-3xl font-extrabold text-purple-600 mb-2">$4.99</div>
            <div className="text-xs text-purple-700 mb-4">One-time payment, no subscriptions</div>
            <ul className="text-purple-900 text-sm mb-4">
              <li>✔️ Everything in Free</li>
              <li>✔️ Share public goals</li>
              <li>✔️ Comments & encouragement</li>
            </ul>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-full shadow transition">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="w-full max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 text-center mb-8">What Our Users Say</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="bg-white/80 rounded-xl p-6 shadow flex flex-col items-center">
            <p className="text-indigo-900 italic mb-2">“LetsAGoal helped me finally finish my side project. The community support is amazing!”</p>
            <span className="text-indigo-700 font-semibold">– Jamie L.</span>
          </div>
          <div className="bg-white/80 rounded-xl p-6 shadow flex flex-col items-center">
            <p className="text-indigo-900 italic mb-2">“I love the simple design and the one-time Pro upgrade. No subscriptions!”</p>
            <span className="text-indigo-700 font-semibold">– Alex P.</span>
          </div>
          <div className="bg-white/80 rounded-xl p-6 shadow flex flex-col items-center">
            <p className="text-indigo-900 italic mb-2">“Tracking my goals privately was great, but sharing them made all the difference.”</p>
            <span className="text-indigo-700 font-semibold">– Morgan S.</span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 text-center mb-8">Get in Touch</h2>
        <div className="bg-white/90 rounded-xl p-8 shadow-md text-center">
          <p className="text-indigo-900 mb-6 max-w-2xl mx-auto">
            Have questions about LetsAGoal? Want to share feedback or suggestions? We'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:hello@letsagoal.com" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full shadow transition"
            >
              📧 Email Us
            </a>
            <a 
              href="https://twitter.com/letsagoal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow transition"
            >
              🐦 Follow on Twitter
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-4 bg-gradient-to-t from-indigo-100/60 to-transparent text-center text-indigo-800 text-sm flex flex-col sm:flex-row gap-4 justify-center items-center border-t border-indigo-200">
        <Link href="/about" className="hover:underline">About</Link>
        <span className="hidden sm:inline">|</span>
        <Link href="#" className="hover:underline">Privacy</Link>
        <span className="hidden sm:inline">|</span>
        <Link href="#" className="hover:underline">Terms</Link>
        <span className="hidden sm:inline">|</span>
        <Link href="#contact" className="hover:underline">Contact</Link>
      </footer>
    </div>
  );
}
