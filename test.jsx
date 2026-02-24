import { useState } from "react";
import axios from "axios";
import "../styles/EnquiryForm.css";


export default function EnquiryForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    inquiryType: "",
    country: "",
    industry: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.mobile.length !== 10) {
      setErrorMsg("Mobile number must be exactly 10 digits");
      setSuccessMsg("");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await axios.post(
        "/api/contact",
        form,
        { timeout: 20000 }
      );

      // ✅ SUCCESS MESSAGE (STATE)
      setSuccessMsg("✅ Enquiry submitted successfully!");

      // ✅ SUCCESS ALERT (BROWSER POPUP)
      alert("Enquiry submitted successfully ✅");

      // ✅ RESET FORM
      setForm({
        name: "",
        email: "",
        mobile: "",
        inquiryType: "",
        country: "",
        industry: "",
        message: ""
      });

    } catch (error) {
      if (error.response) {
        setErrorMsg(`Server Error: ${error.response.data}`);
      } else if (error.request) {
        setErrorMsg("Network Error: Cannot reach the server.");
      } else {
        setErrorMsg(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Company Enquiry Form</h2>

      {errorMsg && <div className="alert alert-error">{errorMsg}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="mobile"
          type="tel"
          placeholder="Mobile Number (10 digits)"
          value={form.mobile}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            if (value.length <= 10) {
              setForm({ ...form, mobile: value });
            }
          }}
          maxLength="10"
          pattern="[0-9]{10}"
          required
        />

        <select
          name="inquiryType"
          value={form.inquiryType}
          onChange={handleChange}
          required
        >
          <option value="">Select Inquiry Type</option>
          <option value="Sales">Sales / Product Demo</option>
          <option value="Pricing">Pricing & Plans</option>
          <option value="Support">Technical Support</option>
          <option value="Partnership">Partnership</option>
          <option value="Career">Career / Job</option>
          <option value="Consulting">Consulting</option>
          <option value="General">General Inquiry</option>
        </select>

        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          required
        >
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">United States</option>
          <option value="UK">United Kingdom</option>
          <option value="Germany">Germany</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
        </select>

        <select
          name="industry"
          value={form.industry}
          onChange={handleChange}
          required
        >
          <option value="">Select Industry</option>
          <option value="IT">Information Technology</option>
          <option value="Finance">Finance & Banking</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Ecommerce">E-Commerce</option>
          <option value="Manufacturing">Manufacturing</option>
        </select>

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Enquiry"}
        </button>
      </form>
    </div>
  );
}
