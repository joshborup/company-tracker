import { useState, useEffect } from "react";
import axios from "axios";
export default function FetchStudent(url) {
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [companyInfo, setCompanyInfo] = useState({});

  function getCompanyInfo(id) {
    axios.get(`${url}/${id}`).then(company => {
      setCompanyInfo(company.data);
    });
  }

  function addCompanyNotes(note, id) {
    console.log(note, id);
    axios
      .post(`${url}/${id}`, { note })
      .then(company => {
        console.log(company);
        setCompanyInfo(company.data);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    let current = true;

    if (current) {
      setLoading(true);
      axios.get(url).then(company => {
        setCompanies(company.data);
        setLoading(false);
      });
    }
    return () => (current = false);
  }, [url]);
  return {
    companies,
    loading,
    getCompanyInfo,
    companyInfo,
    addCompanyNotes
  };
}
