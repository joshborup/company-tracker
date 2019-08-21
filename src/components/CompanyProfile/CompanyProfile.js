import React, { useState, useEffect } from "react";
import fetchCompany from "../../hooks/fetchCompany";

function CompanyProfile({ companyId }) {
  const {
    companies,
    getCompanyInfo,
    companyInfo,
    addCompanyNotes
  } = fetchCompany("/api/companies");
  const [notes, setNotes] = useState("");
  console.log(companies, companyInfo, companyId);
  useEffect(() => {
    let current = true;
    if (current) {
      getCompanyInfo(companyId);
    }
    return () => (current = false);
  }, [companyId]);
  return (
    <div className="contact-profile-container">
      <div>
        <div className="profile-identity">
          <div className="stack-used">
            <h2>Hiring for: </h2>
            {companyInfo.stack &&
              companyInfo.stack.map(tech => {
                return <span key={tech}>{tech}</span>;
              })}
          </div>
          <div>{companyInfo.company}</div>
        </div>
        <div className="profile-image">
          <div className="image-container">
            <img src={companyInfo.photo} alt="contact" />
            <h2>{companyInfo.name}</h2>
          </div>
          <div className="notes-container">
            <div>
              <div className="section-title">Add Note:</div>
              <div>
                <textarea
                  onChange={e => setNotes(e.target.value)}
                  value={notes}
                />
                <button
                  onClick={() => {
                    addCompanyNotes(notes, companyId);
                    setNotes("");
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
            <div>
              <div className="section-title">Notes:</div>
              {console.log(companyInfo.notes)}
              <div className="additional-notes">
                {companyInfo.notes &&
                  companyInfo.notes.map(note => {
                    return (
                      <div>
                        <span>{note.timestamp}</span>
                        <span>{note.note}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="profile-contact-info">
          <div />
          <div>
            <a href={`mailto:${companyInfo.email}`}>
              <button>Send Email</button>
            </a>
            <div>{companyInfo.phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;
