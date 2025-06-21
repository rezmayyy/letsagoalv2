import Link from "next/link";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-indigo-600 max-w-2xl mx-auto">
            Start free, upgrade when you're ready. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto mb-12">
          {/* Free Plan */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-indigo-100">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-indigo-700 mb-2">Free</h2>
              <p className="text-indigo-600 mb-4">Perfect for getting started</p>
              <div className="text-4xl font-bold text-indigo-600 mb-2">$0</div>
              <p className="text-sm text-gray-500">Forever free</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Unlimited goals</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Task management</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Deadline reminders</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Progress tracking</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Mobile responsive</span>
              </li>
            </ul>

            <Link 
              href="/signup" 
              className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg p-8 border-2 border-purple-200 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-purple-700 mb-2">Pro</h2>
              <p className="text-purple-600 mb-4">Unlock community features</p>
              <div className="text-4xl font-bold text-purple-600 mb-2">$4.99</div>
              <p className="text-sm text-gray-500">One-time payment</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Everything in Free</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Share public goals</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Comments & encouragement</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Community support</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Priority support</span>
              </li>
            </ul>

            <Link 
              href="/signup" 
              className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Feature Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Feature</th>
                  <th className="text-center py-3 px-4 font-semibold text-indigo-700">Free</th>
                  <th className="text-center py-3 px-4 font-semibold text-purple-700">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4 text-gray-700">Goal Creation</td>
                  <td className="text-center py-3 px-4 text-green-500">✓</td>
                  <td className="text-center py-3 px-4 text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">Task Management</td>
                  <td className="text-center py-3 px-4 text-green-500">✓</td>
                  <td className="text-center py-3 px-4 text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">Progress Tracking</td>
                  <td className="text-center py-3 px-4 text-green-500">✓</td>
                  <td className="text-center py-3 px-4 text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">Deadline Reminders</td>
                  <td className="text-center py-3 px-4 text-green-500">✓</td>
                  <td className="text-center py-3 px-4 text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">Public Goal Sharing</td>
                  <td className="text-center py-3 px-4 text-red-500">✗</td>
                  <td className="text-center py-3 px-4 text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">Community Comments</td>
                  <td className="text-center py-3 px-4 text-red-500">✗</td>
                  <td className="text-center py-3 px-4 text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">Priority Support</td>
                  <td className="text-center py-3 px-4 text-red-500">✗</td>
                  <td className="text-center py-3 px-4 text-green-500">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Is Pro a subscription?</h3>
              <p className="text-gray-600">No! Pro is a one-time payment of $4.99. Pay once and unlock all Pro features forever.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I upgrade later?</h3>
              <p className="text-gray-600">Absolutely! You can upgrade to Pro at any time from your goals dashboard.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards through our secure Stripe payment system.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I get a refund?</h3>
              <p className="text-gray-600">We offer a 30-day money-back guarantee if you're not satisfied with Pro features.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Do I lose my data if I don't upgrade?</h3>
              <p className="text-gray-600">No! All your goals and progress are safe. You just won't have access to Pro features.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Is my payment secure?</h3>
              <p className="text-gray-600">Yes! We use Stripe for secure payment processing and never store your payment information.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of users who are already achieving their goals with LetsAGoal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup" 
              className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Start Free
            </Link>
            <Link 
              href="/home" 
              className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 