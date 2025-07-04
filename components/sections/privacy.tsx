"use client"

export function PrivacySection() {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-12 text-center">
            Privacy Policy
          </h1>

          <div className="text-gray-300 font-inter leading-relaxed space-y-8">
            <div className="text-sm text-gray-400 mb-8">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
              <p>
                Rosary Narrated ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your information when you visit our website and
                use our services. This policy complies with the General Data Protection Regulation (GDPR) and other
                applicable privacy laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-medium text-white mb-2">2.1 Information You Provide</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Contact information when you reach out to us via email</li>
                <li>Feedback and communications you send to us</li>
                <li>Any information you voluntarily provide through our contact forms</li>
              </ul>

              <h3 className="text-xl font-medium text-white mb-2">2.2 Automatically Collected Information</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Usage data and analytics (pages visited, time spent, interactions)</li>
                <li>Device information (browser type, operating system, IP address)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>To provide and maintain our rosary prayer services</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To improve our website and user experience</li>
                <li>To analyze usage patterns and optimize our content</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Legal Basis for Processing (GDPR)</h2>
              <p className="mb-4">Under GDPR, we process your personal data based on:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Legitimate Interest:</strong> To provide our services and improve user experience
                </li>
                <li>
                  <strong>Consent:</strong> When you voluntarily provide information or agree to cookies
                </li>
                <li>
                  <strong>Legal Obligation:</strong> When required by law
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Data Sharing and Disclosure</h2>
              <p className="mb-4">
                We do not sell, trade, or rent your personal information. We may share your information only in the
                following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>With service providers who assist us in operating our website (hosting, analytics)</li>
                <li>When required by law or to protect our rights</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights Under GDPR</h2>
              <p className="mb-4">If you are in the European Union, you have the following rights:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Right of Access:</strong> Request copies of your personal data
                </li>
                <li>
                  <strong>Right to Rectification:</strong> Request correction of inaccurate data
                </li>
                <li>
                  <strong>Right to Erasure:</strong> Request deletion of your personal data
                </li>
                <li>
                  <strong>Right to Restrict Processing:</strong> Request limitation of data processing
                </li>
                <li>
                  <strong>Right to Data Portability:</strong> Request transfer of your data
                </li>
                <li>
                  <strong>Right to Object:</strong> Object to processing of your personal data
                </li>
                <li>
                  <strong>Right to Withdraw Consent:</strong> Withdraw consent at any time
                </li>
              </ul>
              <p className="mt-4">To exercise these rights, please contact us at rosarynarrated@gmail.com</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies and Tracking</h2>
              <p className="mb-4">
                We use cookies and similar technologies to enhance your experience. You can control cookie settings
                through your browser preferences. Essential cookies are necessary for the website to function properly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against
                unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the
                internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Data Retention</h2>
              <p>
                We retain your personal data only for as long as necessary to fulfill the purposes outlined in this
                policy, comply with legal obligations, or resolve disputes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. International Data Transfers</h2>
              <p>
                Your data may be transferred to and processed in countries outside your jurisdiction. We ensure
                appropriate safeguards are in place to protect your data in accordance with applicable privacy laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Children's Privacy</h2>
              <p>
                Our services are not directed to children under 13. We do not knowingly collect personal information
                from children under 13. If you become aware that a child has provided us with personal data, please
                contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">12. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">13. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <div className="bg-black/30 p-4 rounded-lg">
                <p>
                  <strong>Email:</strong> rosarynarrated@gmail.com
                </p>
                <p>
                  <strong>Data Protection Officer:</strong> Available upon request
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">14. Supervisory Authority</h2>
              <p>
                If you are in the EU and believe we have not addressed your concerns, you have the right to lodge a
                complaint with your local data protection supervisory authority.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}
