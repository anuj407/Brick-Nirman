import React, { useEffect } from "react";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-5xl font-extrabold tracking-tight mb-4 text-indigo-400">
            Contact Brick Nirman
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions about our brick products? Looking to place a bulk order or get a quote? We’re here to help.
          </p>
        </div>

        <div className="mt-12 bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12">
          <form className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
                  placeholder="name@bricknirman.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
                placeholder="How can we assist you?"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                rows="6"
                className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
                placeholder="Describe your needs or ask any questions here..."
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-500 text-white font-semibold py-3 px-8 rounded-xl text-lg shadow-md transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
