import Link from "next/link";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-indigo-700">Terms of Service</h1>
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
            These Terms of Service ("Terms") govern your use of LetsAGoal, a goal tracking application and related services provided by LetsAGoal ("we," "us," or "our").
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, 
              you may not use our services. These Terms apply to all users of our services, including users with Pro accounts.
            </p>
          </section>

          {/* Description of Services */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Description of Services</h2>
            <p className="text-gray-600 mb-4">
              LetsAGoal provides a goal tracking platform that allows users to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Create and manage personal goals</li>
              <li>Track progress and completion status</li>
              <li>Set deadlines and reminders</li>
              <li>Share goals publicly (Pro feature)</li>
              <li>Receive community support and encouragement (Pro feature)</li>
            </ul>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">User Accounts</h2>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Account Creation</h3>
            <p className="text-gray-600 mb-4">
              To use our services, you must create an account. You agree to provide accurate, current, and complete information 
              during registration and to update such information to keep it accurate, current, and complete.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Account Security</h3>
            <p className="text-gray-600 mb-4">
              You are responsible for safeguarding your account credentials and for all activities that occur under your account. 
              You must notify us immediately of any unauthorized use of your account.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Account Termination</h3>
            <p className="text-gray-600">
              You may delete your account at any time through your account settings. Upon deletion, we will remove your personal 
              information in accordance with our Privacy Policy.
            </p>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Acceptable Use</h2>
            <p className="text-gray-600 mb-4">
              You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Use our services for any illegal or unauthorized purpose</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Upload or share content that is harmful, offensive, or inappropriate</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt our services</li>
              <li>Use automated systems to access our services without permission</li>
              <li>Share your account credentials with others</li>
            </ul>
          </section>

          {/* User Content */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">User Content</h2>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Ownership</h3>
            <p className="text-gray-600 mb-4">
              You retain ownership of any content you create, upload, or share through our services. By using our services, 
              you grant us a limited license to use, store, and display your content solely for the purpose of providing our services.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Content Standards</h3>
            <p className="text-gray-600 mb-4">
              You are responsible for all content you create or share. Content must not:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Contain hate speech, harassment, or discrimination</li>
              <li>Include personal information of others without consent</li>
              <li>Be spam, misleading, or fraudulent</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Content Moderation</h3>
            <p className="text-gray-600">
              We reserve the right to remove or modify any content that violates these Terms or is otherwise objectionable. 
              We may also suspend or terminate accounts that repeatedly violate these Terms.
            </p>
          </section>

          {/* Pro Features and Payments */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Pro Features and Payments</h2>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Pro Subscription</h3>
            <p className="text-gray-600 mb-4">
              Pro features are available through a one-time payment of $4.99. This payment grants you lifetime access to Pro features 
              for your account. Pro features include public goal sharing and community interaction capabilities.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Payment Processing</h3>
            <p className="text-gray-600 mb-4">
              All payments are processed securely through Stripe. By making a payment, you agree to Stripe's terms of service. 
              We do not store your payment information on our servers.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Refunds</h3>
            <p className="text-gray-600 mb-4">
              We offer a 30-day money-back guarantee for Pro upgrades. If you are not satisfied with Pro features within 30 days 
              of purchase, contact us for a full refund.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Pro Feature Availability</h3>
            <p className="text-gray-600">
              Pro features are provided "as is" and may be modified or discontinued at any time. We will provide reasonable notice 
              of any material changes to Pro features.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              Our services, including all content, features, and functionality, are owned by LetsAGoal and are protected by 
              copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-gray-600">
              You may not copy, modify, distribute, sell, or lease any part of our services without our prior written consent.
            </p>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Privacy</h2>
            <p className="text-gray-600">
              Your privacy is important to us. Our collection and use of your personal information is governed by our{' '}
              <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700 underline">
                Privacy Policy
              </Link>, which is incorporated into these Terms by reference.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Disclaimers</h2>
            <p className="text-gray-600 mb-4">
              Our services are provided "as is" and "as available" without warranties of any kind. We disclaim all warranties, 
              express or implied, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Warranties of merchantability and fitness for a particular purpose</li>
              <li>Warranties that our services will be uninterrupted or error-free</li>
              <li>Warranties regarding the accuracy or reliability of any information</li>
              <li>Warranties that defects will be corrected</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Limitation of Liability</h2>
            <p className="text-gray-600">
              To the maximum extent permitted by law, LetsAGoal shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of 
              or relating to your use of our services.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Indemnification</h2>
            <p className="text-gray-600">
              You agree to indemnify and hold harmless LetsAGoal from any claims, damages, or expenses arising out of your 
              use of our services or violation of these Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Governing Law</h2>
            <p className="text-gray-600">
              These Terms are governed by and construed in accordance with the laws of the State of California, 
              without regard to its conflict of law principles.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Dispute Resolution</h2>
            <p className="text-gray-600">
              Any disputes arising out of or relating to these Terms or our services shall be resolved through binding arbitration 
              in California, in accordance with the rules of the American Arbitration Association.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Changes to Terms</h2>
            <p className="text-gray-600">
              We may update these Terms from time to time. We will notify you of any material changes by posting the new Terms 
              on this page and updating the "Last updated" date. Your continued use of our services after such changes constitutes 
              acceptance of the updated Terms.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Severability</h2>
            <p className="text-gray-600">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated 
              to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>Email:</strong>{' '}
                <a href="mailto:austinmann12@gmail.com" className="text-indigo-600 hover:text-indigo-700">
                  austinmann12@gmail.com
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