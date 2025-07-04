"use client"

import { CONTACT } from "@/constants"

export function PrivacyPolicySection() {
  return (
    <section className="w-full py-16 text-gray-300 font-inter">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-white font-sora text-4xl md:text-6xl font-extrabold mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8 text-left leading-relaxed">
          <div className="prose prose-invert max-w-none">
            <p>
              This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your
              information when You use the Service and tells You about Your privacy rights and how the law protects You.
              We are compliant with the General Data Protection Regulation (GDPR).
            </p>

            <h2 className="font-sora text-2xl text-white mt-8 mb-4">1. Interpretation and Definitions</h2>
            <p>
              The words of which the initial letter is capitalized have meanings defined under the following conditions.
              The following definitions shall have the same meaning regardless of whether they appear in singular or in
              plural.
            </p>

            <h2 className="font-sora text-2xl text-white mt-8 mb-4">2. Data Controller</h2>
            <p>
              For the purposes of the GDPR, the Data Controller is: Rosary Narrated. You can contact us at:{" "}
              {CONTACT.email}
            </p>

            <h2 className="font-sora text-2xl text-white mt-8 mb-4">3. What Personal Data We Collect</h2>
            <p>
              We are committed to your privacy. As of the last update of this policy, this website (20 Rosary Decades -
              Narrated) is a static, informational website. We do not use cookies for tracking, do not have user
              accounts, and do not collect any personal data directly through forms or other input fields on the site.
            </p>
            <p>
              The only potential for data collection comes from third-party services we link to (such as YouTube,
              LinkedIn, or our payment processors), which have their own privacy policies. We do not receive any
              personal data you provide to them.
            </p>

            <h2 className="font-sora text-2xl text-white mt-8 mb-4">4. Legal Basis for Processing</h2>
            <p>
              As we do not collect personal data, there is no processing of personal data that requires a legal basis
              under GDPR.
            </p>

            <h2 className="font-sora text-2xl text-white mt-8 mb-4">5. Your Data Protection Rights Under GDPR</h2>
            <p>
              We would like to make sure You are fully aware of all of Your data protection rights. Every user is
              entitled to the following:
            </p>
            <ul>
              <li>
                <strong>The right to access</strong> – You have the right to request copies of your personal data.
              </li>
              <li>
                <strong>The right to rectification</strong> – You have the right to request that we correct any
                information you believe is inaccurate.
              </li>
              <li>
                <strong>The right to erasure</strong> – You have the right to request that we erase your personal data,
                under certain conditions.
              </li>
              <li>
                <strong>The right to restrict processing</strong> – You have the right to request that we restrict the
                processing of your personal data, under certain conditions.
              </li>
              <li>
                <strong>The right to object to processing</strong> – You have the right to object to our processing of
                your personal data, under certain conditions.
              </li>
              <li>
                <strong>The right to data portability</strong> – You have the right to request that we transfer the data
                that we have collected to another organization, or directly to you, under certain conditions.
              </li>
            </ul>
            <p>
              Since we do not collect your data, these rights are noted for your information regarding services in
              general, but may not be applicable to our specific service.
            </p>

            <h2 className="font-sora text-2xl text-white mt-8 mb-4">6. Links to Other Websites</h2>
            <p>
              Our Service may contain links to other websites that are not operated by Us. If You click on a third party
              link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy
              of every site You visit. We have no control over and assume no responsibility for the content, privacy
              policies or practices of any third party sites or services.
            </p>

            <h2 className="font-sora text-2xl text-white mt-8 mb-4">7. Changes to this Privacy Policy</h2>
            <p>
              We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new
              Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
              Changes to this Privacy Policy are effective when they are posted on this page.
            </p>

            <h2 className="font-sora text-2xl text-white mt-8 mb-4">8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, You can contact us by email: {CONTACT.email}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
