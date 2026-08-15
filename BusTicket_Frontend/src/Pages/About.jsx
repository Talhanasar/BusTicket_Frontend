import React from "react";

const About = () => {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4 font-['Inter']">
      <h1 className="text-[1.6rem] lg:text-3xl font-bold font-['Raleway'] text-[#030712] mb-4">
        About P-Ticket
      </h1>
      <p className="text-[#030712]/80 mb-4 leading-relaxed">
        P-Ticket is a digital platform to make your daily commuting better.
        We connect passengers with reliable bus operators across major cities
        in Bangladesh, providing transparent pricing, real-time seat selection,
        and secure online booking.
      </p>
      <p className="text-[#030712]/80 mb-4 leading-relaxed">
        Our mission is to simplify intercity travel. Whether you are planning
        a weekend getaway, a business trip, or a visit home, P-Ticket helps you
        find the right bus at the right time — without the queue.
      </p>
      <p className="text-[#030712]/80 leading-relaxed">
        For questions, partnership inquiries, or support, visit the{" "}
        <a href="/contact" className="text-[#1DD100] underline">
          Contact
        </a>{" "}
        page or review our{" "}
        <a href="/policies" className="text-[#1DD100] underline">
          Policies
        </a>
        .
      </p>
    </main>
  );
};

export default About;
