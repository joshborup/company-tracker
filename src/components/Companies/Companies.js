import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const date = new Date();
date.setDate(date.getDate());
const fixedDate = date.toLocaleDateString();

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  name: Yup.string()
    .min(2, "Too Short!")
    .max(300, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  notes: Yup.string(),
  phone: Yup.string(),
  photo: Yup.string().url()
});

export default function ContactForm({ setCompanyContacts, companyContacts }) {
  const [message, setMessage] = useState("");

  return (
    <div>
      <div className="contact-form">
        <h1>Create Company Contact</h1>
        <Formik
          initialValues={{
            name: "",
            email: "",
            notes: "",
            phone: "",
            photo: "",
            company: "",
            last_contact: fixedDate
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, action) => {
            // same shape as initial values
            axios.post("/api/companies", values).then(res => {
              setCompanyContacts(res.data);
              setTimeout(() => {
                setMessage("");
              }, 2000);
              setMessage(`successfully added contact for ${values.name}`);
              action.resetForm();
            });
            console.log(values);
          }}
        >
          {({
            errors,
            touched,
            handleChange,
            values,
            handleBlur,
            isSubmitting
          }) => {
            return (
              <Form>
                <div className="double row">
                  <div className="field">
                    <label htmlFor="name">Contact Name</label>
                    <Field
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />

                    {errors.name && touched.name ? (
                      <div>{errors.name}</div>
                    ) : null}
                  </div>
                  <div className="field">
                    <label htmlFor="company">Company Name</label>
                    <Field
                      name="company"
                      value={values.company}
                      onChange={handleChange}
                    />

                    {errors.company && touched.company ? (
                      <div>{errors.company}</div>
                    ) : null}
                  </div>
                  <div className="profile-image">
                    <img src={values.photo} />
                  </div>
                </div>
                <div className="divide" />
                <div className="double row">
                  <div className="field email">
                    <label htmlFor="email">Email</label>
                    <Field
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    {errors.email && touched.email ? (
                      <div>{errors.email}</div>
                    ) : null}
                  </div>
                  <div className="field phone">
                    <label htmlFor="phone">Phone</label>
                    <Field
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && touched.phone ? (
                      <div>{errors.phone}</div>
                    ) : null}
                  </div>
                </div>
                <div className="divide" />
                <div className="row">
                  <div className="field photo-input">
                    <label htmlFor="photo">LinkedIn Picture</label>
                    <Field
                      name="photo"
                      type="text"
                      value={values.photo}
                      onChange={handleChange}
                    />
                    {errors.photo && touched.photo ? (
                      <div>{errors.photo}</div>
                    ) : null}
                  </div>
                </div>

                <div className="divide" />
                <div className="row">
                  <div className="field note">
                    <label htmlFor="notes">Notes</label>
                    <Field
                      name="notes"
                      type="notes"
                      component="textarea"
                      value={values.notes}
                      onChange={handleChange}
                    />
                    {errors.notes && touched.notes ? (
                      <div>{errors.notes}</div>
                    ) : null}
                  </div>
                </div>
                <button disabled={isSubmitting} type="submit">
                  Submit
                </button>
                <div>
                  <span>{message}</span>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <CompaniesList companyContacts={companyContacts} />
    </div>
  );
}

function CompaniesList({ companyContacts }) {
  return (
    <div className="companies-posted-container">
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
