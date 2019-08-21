import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import axios from "axios";
export default function JobPrep({ id, resume, setResume, hide, setHide }) {
  const [pages, setPages] = useState(1);
  const user = useSelector(state => state.userReducer.user);
  return (
    (user && user.permissions.includes(4)) ||
    (user.permissions.includes(7) ||
      (user.permissions.includes(8) && (
        <>
          <h2>Job Prep</h2>
          <div className="job-prep-container">
            <input
              type="file"
              name="upload"
              accept="application/pdf"
              onChange={e => {
                let formData = new FormData();
                formData.append("file", e.target.files[0]);
                formData.append("contentType", "application/pdf");
                console.log(formData);
                for (let prop of formData.values()) {
                  console.log(prop);
                }
                axios
                  .post(`/api/student/resume/${id}`, formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                      encoding: null
                    }
                  })
                  .then(res => {
                    setResume(res.data);
                  })
                  .catch(err => console.log(err));
              }}
            />

            {hide && (
              <div>
                <a
                  className="pdf-downloader"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`/api/student_resume?id=${id}`}
                >
                  View in browser / Print / Download
                </a>
                <Document
                  onLoadSuccess={err => {
                    setPages(err._pdfInfo.numPages);
                  }}
                  onLoadError={() => {
                    setHide(false);
                  }}
                  file={`/student_${id}.pdf`}
                >
                  {pages === 1 ? (
                    <div>
                      <div className="single-page-res">
                        <Page pageNumber={1} width={400} renderMode={"svg"} />
                      </div>
                    </div>
                  ) : (
                    <div className="multi-page-res">
                      <div>
                        <Page pageNumber={1} width={400} renderMode={"svg"} />
                      </div>
                      <div>
                        <Page pageNumber={2} width={400} renderMode={"svg"} />
                      </div>
                    </div>
                  )}
                </Document>
              </div>
            )}
            {resume && (
              <div>
                <a
                  className="pdf-downloader"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`/api/test?id=${id}`}
                >
                  View in browser / Print / Download
                </a>
                <Document
                  onLoadSuccess={() => {
                    setResume(`/student_${id}.pdf`);
                    setHide(false);
                  }}
                  file={resume}
                >
                  {pages === 1 ? (
                    <div>
                      <div className="single-page-res">
                        <Page pageNumber={1} width={500} renderMode={"svg"} />
                      </div>
                    </div>
                  ) : (
                    <div className="multi-page-res">
                      <div>
                        <Page pageNumber={1} width={500} renderMode={"svg"} />
                      </div>
                      <div>
                        <Page pageNumber={2} width={500} renderMode={"svg"} />
                      </div>
                    </div>
                  )}
                </Document>
              </div>
            )}
          </div>
        </>
      )))
  );
}
