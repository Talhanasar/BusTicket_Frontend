import React from "react";

const Contact = () => {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4 font-['Inter']">
      <h1 className="text-[1.6rem] lg:text-3xl font-bold font-['Raleway'] text-[#030712] mb-4">
        Contact Us
      </h1>
      <p className="text-[#030712]/80 mb-6 leading-relaxed">
        For project support or questions, reach out via email:
      </p>
      <ul className="space-y-4 text-[#030712]/80">
        <li>
          <strong className="text-[#030712]">Email (demo/project support):</strong>{" "}
          <a
            href="mailto:talhabinnasar7@gmail.com?subject=P-Ticket%20Support"
            className="text-[#1DD100] underline"
          >
            talhabinnasar7@gmail.com
          </a>
        </li>
      </ul>
      <p className="mt-8 text-[#030712]/80">
        <a href="/" className="text-[#1DD100] underline">
          Back to Home
        </a>
      </p>
    </main>
  );
};

export default Contact;