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
              General Data Protection Regulation (GDPR).
            </p>

            <h2 className="text-2xl font-bold text-white/90">1. Data We Collect</h2>
            <p>
              We believe in data minimization. Our Service is designed to be used without collecting any personally
              identifiable information (PII).
            </p>
            <ul>
              <li>
                <strong>Anonymous Usage Data:</strong> We do not use cookies or tracking technologies that identify you
                personally. We do not collect your IP address, browser type, device information, or any other personal
                data.
              </li>
              <li>
                <strong>No User Accounts:</strong> The Service does not require you to create an account. All features
                are accessible without logging in.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-white/90">2. How We Use Information</h2>
            <p>
              Since we do not collect any personal data, we do not use it for any purpose. Your use of the Service is
              entirely anonymous.
            </p>

            <h2 className="text-2xl font-bold text-white/90">3. Data Sharing and Disclosure</h2>
            <p>
              We do not have any personal data to share. We will not disclose any information to third parties, as we do
              not collect it in the first place.
            </p>

            <h2 className="text-2xl font-bold text-white/90">4. Your Rights Under GDPR</h2>
            <p>
              The GDPR provides individuals with a number of rights regarding their personal data. As we do not collect
              or process any of your personal data, these rights are not applicable in the context of our Service.
              However, we fully support your rights to privacy, which include:
            </p>
            <ul>
              <li>The right to be informed</li>
              <li>The right of access</li>
              <li>The right to rectification</li>
              <li>The right to erasure</li>
              <li>The right to restrict processing</li>
              <li>The right to data portability</li>
              <li>The right to object</li>
              <li>Rights in relation to automated decision making and profiling.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white/90">5. Data Security</h2>
            <p>
              The security of your data is important to us, but remember that no method of transmission over the
              Internet or method of electronic storage is 100% secure. While we do not collect personal data, we still
              employ best practices to ensure our website is secure.
            </p>

            <h2 className="text-2xl font-bold text-white/90">6. Children's Privacy</h2>
            <p>
              Our Service does not address anyone under the age of 13. We do not knowingly collect personally
              identifiable information from children under 13.
            </p>

            <h2 className="text-2xl font-bold text-white/90">7. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2 className="text-2xl font-bold text-white/90">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, you can contact us by email:
              <a href="mailto:rosarynarrated@gmail.com" className="text-[#FFE552] hover:underline ml-2">
                rosarynarrated@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
