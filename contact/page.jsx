export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-4">
              Email: contact@nextapp.com
            </p>
            <p className="text-gray-600">
              Phone: +1 (123) 456-7890
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Our Location</h2>
            <p className="text-gray-600">
              123 Tech Street<br />
              Digital City, DC 10001<br />
              United States
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}