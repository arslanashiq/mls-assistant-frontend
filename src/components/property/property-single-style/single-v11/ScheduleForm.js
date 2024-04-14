import Image from "next/image";
import { useAppContext } from "@/custom-hooks/AppContext";
import { useState, useEffect } from "react";
import { request_tour_form } from "@/DAL/save-property";
import { useSnackbar } from "notistack";
const ScheduleForm = ({ page_data, type }) => {
  console.log(page_data);
  const {
    isLoggedIn,
    handleOpenLoginModal,
    currentDomain,
    isDomainAvailable,
    proUsername,
    isProUser,
    matchedJsonObject,
  } = useAppContext();
  // State variables to hold form input values
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");
  const [message, setMessage] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const [inputState, setInputsState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [agree, setAgree] = useState(false);
  useEffect(() => {
    if (isLoggedIn) {
      const user = JSON.parse(localStorage.getItem("user"));
      setInputsState(user.email);
      setInputsState(`${user.first_name} ${user.last_name}`);
    }
    if (type == "tour") {
      setInputsState(
        `Hi there, I would like to request a tour on ${page_data?.UnparsedAddress}`
      );
    } else {
      setInputsState(
        `Hi there, I would like to request more info on ${page_data?.UnparsedAddress}`
      );
    }
  }, []);

  const handleChangeInputsState = (e) => {
    const { name, value } = e.target;
    setInputsState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", inputState.name);
    formData.append("email", inputState.email);
    formData.append("phone", inputState.phone);
    formData.append("message", inputState.message);
    // formData.append("page_data", JSON.stringify(page_data));
    formData.append("page_data", page_data);

    for (var value of formData.values()) {
    }
    console.log(...formData, "===formData");

    // const result = await request_tour_form(formData);
    // if (result.code === 200) {
    //   enqueueSnackbar("submit form successfully.", {
    //     variant: "success",
    //   });
    // }
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
              name="name"
              value={inputState.name}
              required
              onChange={handleChangeInputsState}
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
              name="email"
              required
              value={inputState.email}
              onChange={handleChangeInputsState}
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
              name="phone"
              value={inputState.phone}
              required
              onChange={handleChangeInputsState}
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
              name="message"
              placeholder="Enter your message"
              value={inputState.message}
              onChange={handleChangeInputsState}
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
                style={{ objectFit: "cover", borderRadius: 35 }}
              />
            </div>
            <div className="single-contant ml20 ml0-xs">
              <h6 className="title mb-1">{matchedJsonObject.name}</h6>
              <div className="agent-meta d-md-flex align-items-center">
                <p className="mb0 p0">
                  {matchedJsonObject.officeName}
                  <br />
                  {matchedJsonObject?.mobile || matchedJsonObject?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
          <label className="custom_checkbox fz14 ff-heading">
            By submitting this form You agree to Terms of Use & Privacy Policy.
            By choosing to contact a property, you also agree that landlords,
            and property managers may call or text you about any inquiries you
            submit through our services, which may involve use of automated
            means and prerecorded/artificial voices. You don't need to consent
            as a condition of renting any property, or buying any other goods or
            services. Message/data rates may apply.
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
