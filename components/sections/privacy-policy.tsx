export function PrivacyPolicySection() {
  return (
    <section className="bg-black text-white/80 font-inter py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold font-sora text-center mb-12 text-white">Privacy Policy</h1>
        <div className="space-y-8 text-base md:text-lg leading-relaxed text-left">
          <p>
            <strong>Last Updated:</strong>{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p>
            Rosary Narrated ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
            how we handle information in connection with our website and services (collectively, the "Service"). Our
            core principle is data minimization—we only want the data we need to provide you with a great experience.
          </p>

          <div>
            <h2 className="text-2xl font-sora font-bold text-white pt-4 mb-3">1. Information We Do Not Collect</h2>
            <p>
              We have designed our Service to be used without collecting any of your personal data. We do not require
              you to create an account, log in, or provide any personal information such as your name, email address, or
              location to use the core features of our site.
            </p>
            <p className="mt-2">Specifically, we do not collect:</p>
            <ul className="list-disc list-inside pl-4 space-y-2 mt-2">
              <li>Personal Identifiable Information (PII) like names, addresses, or phone numbers.</li>
              <li>Contact information like email addresses.</li>
              <li>
                Usage data, analytics, or tracking information via cookies or other technologies for the main site
                functionality.
              </li>
              <li>Device information, IP addresses, or browser types.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-sora font-bold text-white pt-4 mb-3">2. How We Use Information</h2>
            <p>
              Since we do not collect any personal information, we do not use it for any purpose. Your use of the Rosary
              Narrated website is anonymous.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-sora font-bold text-white pt-4 mb-3">3. Data Security</h2>
            <p>
              While we do not collect personal data, we are committed to ensuring the security of our platform. We
              implement standard security measures to protect our website and its integrity from unauthorized access.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-sora font-bold text-white pt-4 mb-3">4. Third-Party Links</h2>
            <p>
              Our Service may contain links to third-party websites, such as YouTube and LinkedIn, for informational
              purposes. This Privacy Policy does not apply to those third-party sites. We encourage you to review the
              privacy policies of any third-party sites you visit, as we are not responsible for their privacy
              practices.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-sora font-bold text-white pt-4 mb-3">5. Your Rights under GDPR</h2>
            <p>
              Under the General Data Protection Regulation (GDPR), you have various rights regarding your personal data,
              including the right to access, rectify, or erase your data. However, as we do not collect or process any
              of your personal data, these rights are not directly applicable in the context of our Service. You can use
              our Service with the assurance that your personal data is not being collected by us.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-sora font-bold text-white pt-4 mb-3">6. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-sora font-bold text-white pt-4 mb-3">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, you can contact us via the email address provided in
              the footer of our website.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
