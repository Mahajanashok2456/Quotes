export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-teal-900 via-slate-blue to-soft-peach text-light-cream p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-cookie)' }}>
          Contact Us
        </h1>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 shadow-xl text-center">
          <h2 className="text-2xl font-semibold mb-6 text-soft-peach">Get In Touch</h2>
          <p className="text-lg leading-relaxed mb-8">
            We'd love to hear from you! Whether you have questions, suggestions, or just want to share your thoughts, feel free to reach out.
          </p>

          <div className="bg-white/5 rounded-lg p-6">
            <p className="text-xl font-medium mb-2">Email Us At:</p>
            <a
              href="mailto:ashoroshan78@gmail.com"
              className="text-2xl font-bold text-soft-peach hover:text-light-cream transition-colors underline"
            >
              ashoroshan78@gmail.com
            </a>
          </div>

          <p className="text-sm mt-8 text-light-cream/80">
            We typically respond within 24-48 hours. Thank you for your interest in Mahajan's Quotes!
          </p>
        </div>
      </div>
    </div>
  );
}