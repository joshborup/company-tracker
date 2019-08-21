import React from "react";
import { Link } from "react-router-dom";

export default function CompaniesList({ companyContacts }) {
  return (
    <div className="companies-posted-container-view">
      {companyContacts.map(contact => {
        return (
          <Link
            className="contact-container"
            key={contact.id}
            to={`/companies/profile/${contact.id}`}
          >
            <div>
              <div className="contact-photo">
                <img src={contact.photo} alt="contact" />
              </div>
              <div>
                <div className="indentity-row">
                  <div className="contact-name">{contact.name}</div>
                  <div className="contact-company">{contact.company}</div>
                </div>
                <div className="contact-email">{contact.email}</div>
                <div className="contact-phone">{contact.phone}</div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
