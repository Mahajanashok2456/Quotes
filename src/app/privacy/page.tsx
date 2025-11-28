// Final Privacy Policy Component Content

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-foreground p-4 sm:p-8 pt-20 sm:pt-24 lg:pt-28">
      <div className="container mx-auto max-w-4xl px-4 py-12 text-light-cream">
        <h1 className="text-3xl font-bold mb-6 text-soft-peach">
          Privacy Policy
        </h1>
        <p className="text-sm mb-4">
          <strong>Effective Date:</strong> October 2025
        </p>
        <p className="text-sm mb-8">
          Welcome to Mahajan's Quotes (
          <a
            href="https://echoesofmahajan.vercel.app/"
            className="text-blue-600 hover:underline"
          >
            https://echoesofmahajan.vercel.app/
          </a>
          ). This Privacy Policy explains how we collect, use, and protect your
          information when you visit our website.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-soft-peach">
          Information We Collect
        </h2>

        <h3 className="text-xl font-medium mt-4 mb-2 text-soft-peach">
          Administrator Information
        </h3>
        <p className="mb-4">
          We collect and store a username/email and a securely **hashed
          password** solely for the purpose of authenticating the site
          administrator (Mahajan). This information is used exclusively for
          **secure login** via NextAuth.js and is not shared, sold, or used for
          any other purpose.
        </p>

        <h3 className="text-xl font-medium mt-4 mb-2 text-soft-peach">
          Visitor Information (Non-Personal)
        </h3>
        <p className="mb-4">
          We do not collect any **Personal Identifying Information (PII)** from
          general visitors to the site. No visitor data is tracked, stored, or
          sold for personal identification.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-soft-peach">
          Use of Cookies and Local Storage
        </h2>
        <p className="mb-4">
          Our website uses cookies and local storage to enhance your experience:
        </p>
        <ul className="list-disc list-inside ml-6 mb-4 space-y-2">
          <li>
            <strong>User Preferences:</strong> We use local storage to remember
            user preferences, such as **liked quotes**, to personalize your
            interaction with the site.
          </li>
          <li>
            <strong>Ad Targeting:</strong> Cookies are used for ad targeting
            purposes in conjunction with **Google AdSense** to display
            personalized advertisements based on your browsing behavior.
          </li>
        </ul>
        <p className="text-sm mb-8">
          You can manage or disable cookies through your browser settings, but
          this may affect the functionality of the site.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-soft-peach">
          Google AdSense and Advertising
        </h2>
        <p className="mb-4">
          Mahajan&apos;s Quotes uses Google AdSense to display advertisements.
          Google AdSense may use cookies and other technologies to serve
          personalized ads based on your interests and online activity. For more
          information on how Google handles your data, please review
          Google&apos;s Privacy Policy at{" "}
          <a
            href="https://policies.google.com/privacy"
            className="text-slate-blue hover:underline"
          >
            Google Privacy Policy
          </a>
          .
        </p>
        <p className="mb-4">
          <strong>Third-Party Ad Vendors:</strong> We allow third-party
          companies, including Google, to serve ads when you visit our website.
          These companies may use information about your visits to this and
          other websites (not including your name, address, email address, or
          telephone number) to provide advertisements about goods and services
          of interest to you.
        </p>
        <p className="mb-4">
          <strong>Google&apos;s Use of Advertising Cookies:</strong> Google uses
          cookies to serve ads based on your prior visits to our website or
          other websites. Google&apos;s use of advertising cookies enables it
          and its partners to serve ads to you based on your visit to our site
          and/or other sites on the Internet.
        </p>
        <p className="mb-4">
          <strong>Opting Out:</strong> You may opt out of personalized
          advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            className="text-slate-blue hover:underline"
          >
            Google Ads Settings
          </a>{" "}
          or by visiting{" "}
          <a
            href="http://www.aboutads.info/choices/"
            className="text-slate-blue hover:underline"
          >
            aboutads.info
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-soft-peach">
          Data Security
        </h2>
        <p className="mb-4">
          We implement appropriate technical and organizational measures to
          protect your data against unauthorized or unlawful processing,
          accidental loss, destruction, or damage. However, no method of
          transmission over the Internet or electronic storage is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-soft-peach">
          Children&apos;s Privacy
        </h2>
        <p className="mb-4">
          Our website is intended for a general audience and does not knowingly
          collect personal information from children under the age of 13. If you
          believe we have collected information from a child under 13, please
          contact us immediately.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-soft-peach">
          Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page and
          updating the &quot;Effective Date&quot; at the top. You are advised to
          review this Privacy Policy periodically for any changes.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-soft-peach">
          Contact Us
        </h2>
        <p className="mb-8">
          If you have any questions about this Privacy Policy, please contact us
          at **ashoroshan78@gmail.com**.
        </p>
      </div>
    </div>
  );
}
