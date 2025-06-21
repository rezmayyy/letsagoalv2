import Link from "next/link";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-indigo-700">Get in Touch</h1>
            <Link 
              href="/" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              ← Back to Home
            </Link>
          </div>

          <p className="text-lg text-indigo-600 mb-8">
            Have questions about LetsAGoal? Want to share feedback or suggestions? We'd love to hear from you!
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <a href="mailto:hello@letsagoal.com" className="text-indigo-600 hover:text-indigo-700">
                      hello@letsagoal.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🐦</span>
                  <div>
                    <p className="font-medium text-gray-800">Twitter</p>
                    <a 
                      href="https://twitter.com/letsagoal" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700"
                    >
                      @letsagoal
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💬</span>
                  <div>
                    <p className="font-medium text-gray-800">Discord</p>
                    <a 
                      href="https://discord.gg/letsagoal" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700"
                    >
                      Join our community
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-lg p-4">
                <h3 className="font-semibold text-indigo-800 mb-2">Response Time</h3>
                <p className="text-indigo-700 text-sm">
                  We typically respond within 24 hours during business days. For urgent matters, please use email.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Send us a Message</h2>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option>General Question</option>
                    <option>Feature Request</option>
                    <option>Bug Report</option>
                    <option>Pro Upgrade Help</option>
                    <option>Feedback</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-3">
                This is a placeholder form. In a real app, this would connect to your backend.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">How do I upgrade to Pro?</h3>
              <p className="text-gray-600">You can upgrade to Pro from your goals dashboard. Look for the "Upgrade to Pro" button in your account summary.</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Is Pro a subscription?</h3>
              <p className="text-gray-600">No! Pro is a one-time payment of $4.99. Pay once and unlock all Pro features forever.</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Can I export my goals?</h3>
              <p className="text-gray-600">Currently, this feature is in development. We're working on adding data export functionality soon.</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">How do I delete my account?</h3>
              <p className="text-gray-600">You can delete your account from the Profile dropdown in the navbar. Look for "Delete Account" in the menu.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Is my data secure?</h3>
              <p className="text-gray-600">Yes! We use industry-standard security practices and your data is encrypted and stored securely.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 