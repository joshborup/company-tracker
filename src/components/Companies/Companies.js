import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";

const date = new Date();
date.setDate(date.getDate());
const fixedDate = date.toLocaleDateString();

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(300, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  notes: Yup.string(),
  phone: Yup.string(),
  photo: Yup.string().url(),
  last_contact: Yup.date(),
  technologies: Yup.array().of(Yup.string("Must Choose a Technology name"))
});

export default function ContactForm({ setCompanyContacts }) {
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
            last_contact: fixedDate,
            technologies: []
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, action) => {
            // same shape as initial values
            console.log(action);
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
            const { technologies } = values;
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
                <div className="row">
                  <div className="field note tags">
                    <label htmlFor="technologoies">Technologies Used</label>
                    <FieldArray
                      name="technologies"
                      render={arrayHelpers => (
                        <div className="tech-use-container">
                          {technologies && technologies.length > 0 ? (
                            technologies.map((tech, index) => {
                              return (
                                <div key={index}>
                                  {index === 0 ? (
                                    <div>
                                      {index === 0 && <label>Tech Name</label>}
                                      <Field
                                        name={`technologies.${index}`}
                                        className={
                                          index === 0 ? "first-input" : ""
                                        }
                                        onKeyPress={e => {
                                          if (e.key === "Enter")
                                            arrayHelpers.insert(index, "");
                                          e.stopPropagation();
                                        }}
                                        innerRef={t => {
                                          if (t && index === 0) {
                                            t.autofocus = true;
                                          }
                                        }}
                                      />
                                      <ErrorMessage
                                        name={`technologies.${index}`}
                                        component="span"
                                      />
                                    </div>
                                  ) : (
                                    <div className="tech-tag-container">
                                      <span className="tech-tagname">
                                        {tech}
                                      </span>
                                      <button
                                        className={index !== 0 ? "minus" : ""}
                                        type="button"
                                        onClick={() => {
                                          arrayHelpers.remove(index);
                                        }}
                                      >
                                        -
                                      </button>
                                    </div>
                                  )}

                                  {index === 0 && (
                                    <button
                                      className="plus"
                                      type="button"
                                      onClick={() =>
                                        arrayHelpers.insert(index, "")
                                      }
                                    >
                                      +
                                    </button>
                                  )}
                                </div>
                              );
                            })
                          ) : (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                            >
                              Add A Technology
                            </button>
                          )}
                        </div>
                      )}
                    />
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
    </div>
  );
}
