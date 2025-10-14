import React from "react";
import SectionHeader from "./SectionHeader";
import { GetQuoteQuery } from "@/lib/api/jambo";

const ContactInformation = ({ data }: { data: GetQuoteQuery }) => {
  const consultant = data.quote?.trip?.agencyMember ?? data.quote?.user;
  if (!consultant) {
    return null;
  }
  return (
    <section id="contact" className="section container">
      <SectionHeader title="Contact information" />
      Your travel consultant is{" "}
      <strong>
        {[consultant.firstName, consultant.lastName].filter(a => !!a).join(" ")}
      </strong>
      , feel free to contact {consultant.genderPreposition} at{" "}
      <a href={`mailto:${consultant.email}`}>{consultant.email}</a>{" "}
      {consultant.phone && (
        <>
          or{" "}
          <a href={`tel:${consultant.phone.replace(/\s/g, "")}`}>
            {consultant.phone}
          </a>{" "}
        </>
      )}
      anytime.
    </section>
  );
};

export default ContactInformation;
