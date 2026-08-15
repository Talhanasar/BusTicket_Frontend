import React from "react";

const Policies = () => {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4 font-['Inter']">
      <h1 className="text-[1.6rem] lg:text-3xl font-bold font-['Raleway'] text-[#030712] mb-6">
        Policies
      </h1>

      <section id="terms" className="mb-8">
        <h2 className="text-[1.2rem] lg:text-2xl font-semibold font-['Raleway'] text-[#030712] mb-2">
          Terms & Conditions
        </h2>
        <p className="text-[#030712]/80 leading-relaxed">
          By using P-Ticket you agree to the following terms. Tickets are
          non-transferable and valid only for the date, time, and route printed
          on the booking confirmation. Prices are subject to change without
          prior notice. Passengers must carry a valid government-issued ID for
          verification at boarding.
        </p>
      </section>

      <section id="cancellation" className="mb-8">
        <h2 className="text-[1.2rem] lg:text-2xl font-semibold font-['Raleway'] text-[#030712] mb-2">
          Cancellation Policy
        </h2>
        <p className="text-[#030712]/80 leading-relaxed">
          Cancellations made at least 24 hours before scheduled departure are
          eligible for a partial refund. Within 24 hours of departure, tickets
          are non-refundable except in cases of operator-initiated cancellation.
          Refunds, when applicable, are processed back to the original payment
          method within 7–10 business days.
        </p>
      </section>

      <section id="refund" className="mb-8">
        <h2 className="text-[1.2rem] lg:text-2xl font-semibold font-['Raleway'] text-[#030712] mb-2">
          Returns & Refund Policy
        </h2>
        <p className="text-[#030712]/80 leading-relaxed">
          If your bus is cancelled by the operator, you are entitled to a full
          refund or rebooking on the next available service. Refund requests
          must be submitted via the email address listed on our{" "}
          <a href="/contact" className="text-[#1DD100] underline">
            Contact
          </a>{" "}
          page with your booking reference number.
        </p>
      </section>

      <section id="privacy" className="mb-8">
        <h2 className="text-[1.2rem] lg:text-2xl font-semibold font-['Raleway'] text-[#030712] mb-2">
          Privacy Policy
        </h2>
        <p className="text-[#030712]/80 leading-relaxed">
          P-Ticket collects only the information necessary to process your
          booking (name, phone, email, seat selection). We do not sell or share
          your personal data with third parties except as required to complete
          your booking with the bus operator or by law.
        </p>
      </section>

      <p className="mt-8 text-[#030712]/80">
        <a href="/" className="text-[#1DD100] underline">
          Back to Home
        </a>
      </p>
    </main>
  );
};

export default Policies;
