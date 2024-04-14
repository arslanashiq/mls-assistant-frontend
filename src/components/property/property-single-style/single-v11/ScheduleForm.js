import Image from "next/image";
import { useAppContext } from "@/custom-hooks/AppContext";
import { useState, useEffect } from "react";
const ScheduleForm = ({ page_data, type }) => {
  console.log(page_data);
  const { isLoggedIn, handleOpenLoginModal, currentDomain, isDomainAvailable, proUsername, isProUser, matchedJsonObject } = useAppContext();
  // State variables to hold form input values
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [message, setMessage] = useState();
  const [agree, setAgree] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      setEmail(user.email);
      setName(`${user.first_name} ${user.last_name}`);
    }
    if (type == 'tour') {
      setMessage(`Hi there, I would like to request a tour on ${page_data?.UnparsedAddress}`);
    } else {
      setMessage(`Hi there, I would like to request more info on ${page_data?.UnparsedAddress}`);
    }
  }, []);
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data, e.g., send it to an API
    const formData = {
      name,
      email,
      phone,
      message,
      agree,
    };
    console.log(formData);
  };


  return (
    <form className="form-style1" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-12">
          <div className="mb15">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              required
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-12">
          <div className="mb15">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        {/* End .col-12 */}

        <div className="col-lg-12">
          <div className="mb15">
            <label htmlFor="phone">Phone *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your phone"
              required
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        {/* End .col-12 */}

        <div className="col-md-12">
          <div className="mb15">
            <label htmlFor="message">Message *</label>
            <textarea
              cols={30}
              rows={4}
              id="message"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        {/* End .col-12 */}
        <div className="col-md-12">
          <h6 className="mb-3">Will be sent to</h6>
          <div className="agent-single d-sm-flex align-items-center pb25">
            <div className="single-img mb30-sm">
              {/* Use a default agent avatar or the actual agent image if available */}
              <Image
                width={60}
                height={60}
                src="/images/team/agent-3.jpg" // Replace with actual agent image source if available
                alt="avatar"
                style={{objectFit: "cover", borderRadius: 35}}
              />
            </div>
            <div className="single-contant ml20 ml0-xs">
              <h6 className="title mb-1">{matchedJsonObject.name}</h6>
              <div className="agent-meta d-md-flex align-items-center">
                <p className="mb0 p0">
                  {matchedJsonObject.officeName}
                  <br />
                  {matchedJsonObject?.mobile || matchedJsonObject?.phone }
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
          <label className="custom_checkbox fz14 ff-heading">
            By submitting this form You agree to Terms of Use & Privacy Policy. By choosing to contact a property, you also agree that landlords, and property managers may call or text you about any inquiries you submit through our services, which may involve use of automated means and prerecorded/artificial voices. You don't need to consent as a condition of renting any property, or buying any other goods or services. Message/data rates may apply.
            <input type="checkbox" />
            <span className="checkmark" />
          </label>
        </div>
        {/* End .col-12 */}

        <div className="col-md-12">
          <div className="d-grid">
            <button type="submit" className="ud-btn btn-thm">
              Submit a Tour Request
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
        {/* End .col-12 */}
      </div>
    </form>
  );
};

export default ScheduleForm;
