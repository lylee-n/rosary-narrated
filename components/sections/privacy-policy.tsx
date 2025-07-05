"use client"

export function PrivacyPolicySection() {
  return (
    <section className="bg-black text-white/80 font-inter py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-sora text-center mb-12 text-white">Privacy Policy</h1>

          <div className="space-y-8 text-gray-300 prose prose-invert prose-lg max-w-none">
            <p>
              <strong>Last Updated:</strong>{" "}
              {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>

            <p>
              This Privacy Policy describes how Rosary Narrated ("we," "us," or "our") collects, uses, and handles your
              information when you use our website (the "Service"). We are committed to protecting your privacy and
              ensuring that your personal data is handled in a safe and responsible manner in compliance with the
              General Data Protection Regulation (GDPR). We respect that you come to our site for prayer and spiritual
              reflection, and we honor that sacred intention by maintaining the highest standards of privacy protection.
            </p>

            <h2 className="text-2xl font-bold text-white/90 mt-10">1. Data We Collect</h2>
            <p>
              We believe in data minimization and only collect information that is necessary to improve your experience
              and provide you with spiritual content.
            </p>

            <h3 className="text-xl font-semibold text-[#82FAFA] mt-6">Website Analytics</h3>
            <p>
              We use GoatCounter to collect anonymous website usage statistics. The data collected includes:
            </p>
            <ul className="ml-6 space-y-2">
              <li>• Number of page views</li>
              <li>• Which pages are visited</li>
              <li>• General location (country level only)</li>
              <li>• Referral sources</li>
            </ul>
            <p className="mt-4">
              No cookies are used, no personal information is collected, and your IP address is not stored.
            </p>

            <h3 className="text-xl font-semibold text-[#82FAFA] mt-6">Email Newsletter</h3>
            <p>
              If you choose to subscribe to our newsletter, we collect:
            </p>
            <ul className="ml-6 space-y-2">
              <li>• Your email address</li>
              <li>• The date and time of your subscription</li>
              <li>• Your consent preferences</li>
            </ul>
            <p className="mt-4">
              Newsletter subscription is entirely optional. You can unsubscribe at any time using the link in any email
              we send you.
            </p>

            <h3 className="text-xl font-semibold text-[#82FAFA] mt-6">No User Accounts</h3>
            <p>
              The Service does not require you to create an account. All prayer features are accessible without
              logging in, maintaining your anonymity during your spiritual practice.
            </p>

            <h2 className="text-2xl font-bold text-white/90 mt-10">2. How We Use Information</h2>
            
            <h3 className="text-xl font-semibold text-[#82FAFA] mt-6">Analytics Data</h3>
            <p>
              We use anonymous analytics data to:
            </p>
            <ul className="ml-6 space-y-2">
              <li>• Improve the website's performance and user experience</li>
              <li>• Identify and fix technical issues</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#82FAFA] mt-6">Email Newsletter</h3>
            <p>
              If you subscribe to our newsletter, we use your email address to:
            </p>
            <ul className="ml-6 space-y-2">
              <li>• Send you periodic spiritual content and prayer resources</li>
              <li>• Notify you about significant updates to the Rosary Narrated service</li>
            </ul>
            <p className="mt-4">
              We will never send you marketing emails for third-party products or services. Our communications focus
              solely on spiritual content and our prayer service.
            </p>

            <h2 className="text-2xl font-bold text-white/90 mt-10">3. Data Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties, except as
              described below:
            </p>
            <ul className="ml-6 space-y-2">
              <li>• <strong>GoatCounter:</strong> Anonymous website usage data is processed by GoatCounter</li>
              <li>• <strong>Email Service Provider:</strong> If you subscribe to our newsletter, your email address is stored with our email service provider to deliver newsletters</li>
              <li>• <strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights</li>
            </ul>

            <h2 className="text-2xl font-bold text-white/90 mt-10">4. Your Rights Under GDPR</h2>
            <p>
              Under the GDPR, you have the following rights regarding your personal data:
            </p>
            <ul className="ml-6 space-y-2">
              <li>• <strong>Right to be informed:</strong> You have the right to know how we process your data</li>
              <li>• <strong>Right of access:</strong> You can request a copy of the personal data we hold about you</li>
              <li>• <strong>Right to rectification:</strong> You can ask us to correct inaccurate data</li>
              <li>• <strong>Right to erasure:</strong> You can request deletion of your data</li>
              <li>• <strong>Right to restrict processing:</strong> You can limit how we use your data</li>
              <li>• <strong>Right to data portability:</strong> You can request your data in a portable format</li>
              <li>• <strong>Right to object:</strong> You can object to processing of your data</li>
              <li>• <strong>Right to withdraw consent:</strong> You can withdraw consent at any time</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us at the email address provided below.
            </p>

            <h2 className="text-2xl font-bold text-white/90 mt-10">5. Data Security</h2>
            <p>
              The security of your data is important to us. We implement appropriate technical and organizational
              measures to protect your personal information against unauthorized access, alteration, disclosure, or
              destruction. However, please note that no method of transmission over the Internet or electronic storage
              is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-white/90 mt-10">6. Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary:
            </p>
            <ul className="ml-6 space-y-2">
              <li>• <strong>Analytics data:</strong> Anonymous analytics data is retained by GoatCounter</li>
              <li>• <strong>Newsletter subscriptions:</strong> We retain your email address until you unsubscribe</li>
            </ul>

            <h2 className="text-2xl font-bold text-white/90 mt-10">7. Children's Privacy</h2>
            <p>
              Our Service does not address anyone under the age of 13. We do not knowingly collect personally
              identifiable information from children under 13. If we become aware that we have collected personal
              information from a child under 13, we will take steps to delete such information.
            </p>

            <h2 className="text-2xl font-bold text-white/90 mt-10">8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last Updated" date. If we make significant changes, we may
              also notify newsletter subscribers via email. You are advised to review this Privacy Policy periodically
              for any changes.
            </p>

            <h2 className="text-2xl font-bold text-white/90 mt-10">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, want to exercise your rights, or have concerns about
              your privacy, please contact us:
            </p>
            <div className="bg-white/5 p-6 rounded-lg border border-gray-400/30 mt-4">
              <p className="text-[#82FAFA] font-semibold">Email:</p>
              <p>
                <a href="mailto:rosarynarrated@gmail.com" className="text-[#FFE552] hover:underline">
                  rosarynarrated@gmail.com
                </a>
              </p>
              <p className="text-[#82FAFA] font-semibold mt-4">Response Time:</p>
              <p>We aim to respond to all privacy-related inquiries within 72 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
