import Link from "next/link";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-indigo-700">Privacy Policy</h1>
            <Link 
              href="/" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
          
          <p className="text-gray-600 mb-4">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          
          <p className="text-gray-600">
            This Privacy Policy describes how LetsAGoal ("we," "us," or "our") collects, uses, and shares your personal information when you use our goal tracking application and related services.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Information We Collect</h2>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information You Provide</h3>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
              <li>Account information (email address, password)</li>
              <li>Profile information (name, profile picture)</li>
              <li>Goals and tasks you create</li>
              <li>Progress updates and completion status</li>
              <li>Communications with us (support requests, feedback)</li>
              <li>Payment information (processed securely through Stripe)</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Automatically Collected Information</h3>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, features used, time spent)</li>
              <li>Cookies and similar technologies</li>
              <li>Log data (access times, error logs)</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Provide and maintain our services</li>
              <li>Process your Pro upgrades and payments</li>
              <li>Send you important updates and notifications</li>
              <li>Provide customer support</li>
              <li>Improve our services and develop new features</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell, rent, or trade your personal information to third parties. We may share your information in the following limited circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>Service Providers:</strong> With trusted third-party services (Supabase, Stripe) to operate our platform</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication</li>
              <li>Secure hosting infrastructure</li>
              <li>Regular backups and disaster recovery</li>
            </ul>
          </section>

          {/* Your Rights - CCPA/CPRA */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Your Privacy Rights (California Residents)</h2>
            <p className="text-gray-600 mb-4">
              Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), California residents have the following rights:
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Right to Know</h3>
                <p className="text-gray-600">You can request information about the personal data we collect, use, and share about you.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Right to Delete</h3>
                <p className="text-gray-600">You can request deletion of your personal information, subject to certain exceptions.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Right to Correct</h3>
                <p className="text-gray-600">You can request correction of inaccurate personal information we maintain about you.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Right to Portability</h3>
                <p className="text-gray-600">You can request a copy of your personal information in a portable format.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Right to Opt-Out</h3>
                <p className="text-gray-600">You can opt-out of the sale or sharing of your personal information (we do not sell personal information).</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Right to Limit Use</h3>
                <p className="text-gray-600">You can request that we limit the use of your sensitive personal information.</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-blue-800 mb-2">Exercising Your Rights</h4>
              <p className="text-blue-700 text-sm">
                To exercise any of these rights, please contact us at{' '}
                <a href="mailto:privacy@letsagoal.com" className="underline">privacy@letsagoal.com</a> or through our{' '}
                <Link href="/contact" className="underline">contact form</Link>. 
                We will respond to your request within 45 days.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Cookies and Tracking Technologies</h2>
            <p className="text-gray-600 mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Remember your preferences and settings</li>
              <li>Analyze how you use our services</li>
              <li>Provide personalized content</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
            <p className="text-gray-600 mt-4">
              You can control cookies through your browser settings, though disabling certain cookies may affect functionality.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Data Retention</h2>
            <p className="text-gray-600">
              We retain your personal information for as long as necessary to provide our services and comply with legal obligations. 
              When you delete your account, we will delete or anonymize your personal information within 30 days, 
              except where we need to retain certain information for legal or legitimate business purposes.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Children's Privacy</h2>
            <p className="text-gray-600">
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information 
              from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">International Data Transfers</h2>
            <p className="text-gray-600">
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new 
              Privacy Policy on this page and updating the "Last updated" date. Your continued use of our services after such 
              changes constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>Email:</strong>{' '}
                <a href="mailto:privacy@letsagoal.com" className="text-indigo-600 hover:text-indigo-700">
                  privacy@letsagoal.com
                </a>
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Contact Form:</strong>{' '}
                <Link href="/contact" className="text-indigo-600 hover:text-indigo-700">
                  Contact Us
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 