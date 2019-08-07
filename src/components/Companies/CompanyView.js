import React from "react";

export default function CompaniesList({ companyContacts }) {
  return (
    <div className="companies-posted-container-view">
      {companyContacts.map(contact => {
        return (
          <div className="contact-container" key={contact.id}>
            <div className="contact-photo">
              <img src={contact.photo} />
            </div>
            <div className="contact-name">{contact.name}</div>
            <div className="contact-company">{contact.company}</div>
            <div className="contact-email">{contact.email}</div>
            <div className="contact-phone">{contact.phone}</div>
            <div className="contact-notes">
              <details>
                <summary>Notes</summary>
                <div>{contact.notes}</div>
              </details>
            </div>
          </div>
        );
      })}
    </div>
  );
}
