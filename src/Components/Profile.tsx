import React, { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";

const Profile = () => {
  const profile = require("./../assets/profile.jpeg");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step: 1 -> Enter Email, 2 -> Verify OTP
  const [width, setWidth] = useState(window.innerWidth)


  useEffect(() => {
    const fetchWidth = () => {
      const updatedWidth = window.innerWidth - window.innerWidth * 40 / 100
      console.log('inner width', window.innerWidth)
      console.log('total', updatedWidth)
      setWidth(updatedWidth)
    }
    fetchWidth()
    window.addEventListener('resize', fetchWidth)
  }, [window.innerWidth])

  const handleUpdateEmailSubmit = () => {
    // Simulate sending OTP
    setStep(2);
  };

  const handleVerifyOtp = () => {
    // Simulate OTP verification
    setStep(1); // Reset step for next use
    setEmail("");
    setOtp("");
    // Close the modal
  };

  const handleDeleteEmailSubmit = () => {
    setStep(2);
  };

  const handleDeleteVerifyOtp = () => {
    setStep(1);
    setEmail("");
    setOtp("");
  };

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        {/* Profile Section */}
        <div className="col-lg-6 col-md-8 col-sm-10 col-12 rounded p-4 shadow-sm bg-white">
          <h4 className="text-center mb-4">Profile Details</h4>

          {/* Profile Image Upload */}
          <div className="text-center mb-4" style={{ position: "relative" }}>
            <img
              src={profile}
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", bottom: "5px", right: "5px" }}>
              <VscAdd />
            </div>
          </div>

          {/* User Details Form */}
          <form>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="number" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="number"
                placeholder="Enter your phone number"
              />
            </div>
          </form>

          {/* Action Buttons */}
          <div className="mt-4 row" style={{ display: "flex", backgroundColor: "white" }}>
            <button
              className="btn border w-100"
              data-bs-toggle="modal"
              data-bs-target="#updateModal"
            >
              Update Account
            </button>
            <button
              className="btn border mt-2 w-100"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
            >
              Delete Account
            </button>
          </div>

          {/* Update Account Modal */}
          <div
            className="modal fade"
            id="updateModal"
            aria-hidden="false"
            style={{
              width: `${width}`,
              maxWidth: '500px',
              height: '300px',
              position: 'fixed',
              top: '50%',
              left: '50%',
              borderRadius: '20px',
              padding: '20px',
              overflowY: 'hidden',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update Account</h5>
                  <button
                    type="button"
                    className="btn-close"
                    id="updateModalClose"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  {step === 1 ? (
                    <div>
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button className="btn btn-primary w-100" onClick={handleUpdateEmailSubmit}>
                        Send OTP
                      </button>
                    </div>
                  ) : (
                    <>
                      <label>OTP</label>
                      <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <button className="btn btn-primary w-100" onClick={handleVerifyOtp}>
                        Verify OTP
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Delete Account Modal */}
          <div className="modal fade" id="deleteModal" aria-hidden="false"
            style={{
              width: `${width}`,
              maxWidth: '500px',
              height: '300px',
              position: 'fixed',
              top: '50%',
              left: '50%',
              borderRadius: '20px',
              padding: '20px',
              overflowY: 'hidden',
              transform: 'translate(-50%, -50%)',
            }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete Account</h5>
                  <button
                    type="button"
                    className="btn-close"
                    id="deleteModalClose"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  {step === 1 ? (
                    <>
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button className="btn btn-danger w-100" onClick={handleDeleteEmailSubmit}>
                        Send OTP
                      </button>
                    </>
                  ) : (
                    <>
                      <label>OTP</label>
                      <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <button className="btn btn-danger w-100" onClick={handleDeleteVerifyOtp}>
                        Verify OTP
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
