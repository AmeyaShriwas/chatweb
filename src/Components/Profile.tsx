import React, { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../Redux/store";

const Profile = () => {
  const defaultProfile = require("./../assets/profile.jpeg");

  const [profileImg, setProfileImg] = useState<string>(defaultProfile);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isPhone, setIsPhone] = useState(window.innerWidth <= 768);
  const { id } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const handleResize = () => setIsPhone(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Function to handle profile image upload
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const formData = new FormData();
      formData.append("profilePicture", file);
      formData.append("id", String(id));

      try {
        const response = await axios.post(
          "https://api.chatwithus.ameyashriwas.com/addImage",
          formData
        );

        if (response.data && response.data.imageUrl) {
          setProfileImg(response.data.imageUrl);
          alert("Profile image uploaded successfully!");
        } else {
          alert("Failed to upload image.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image.");
      }
    }
  };

  // ✅ Function to handle name and phone number update
  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        `https://api.chatwithus.ameyashriwas.com/user/update-profile/${id}`,
        {
          name,
          phone,
        }
      );

      alert("Profile updated successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10 col-12 rounded p-4 shadow-sm bg-white">
          <h4 className="text-center mb-4">Profile Details</h4>

          {/* ✅ Profile Image Upload Section */}
          <div
            style={{
              display: "flex",
              flexDirection: isPhone ? "column" : "row",
              justifyContent: isPhone ? "center" : "space-around",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              className="text-center mb-4"
              style={{
                position: "relative",
                width: "200px",
                margin: isPhone ? "10px auto" : "0",
              }}
            >
              <img
                src={profileImg}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{
                  height: "200px",
                  objectFit: "cover",
                  border: "1px solid grey",
                  borderRadius: "50%",
                  width: "100%",
                }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  opacity: 0,
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  cursor: "pointer",
                }}
              >
                <VscAdd size={30} />
              </div>
            </div>

            <div
              style={{
                width: isPhone ? "90%" : "300px",
                margin: isPhone ? "10px auto" : "0",
              }}
            >
              <div style={{ padding: "5px" }}>Add your status</div>
              <input
                style={{
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  backgroundColor: "#F5F5F5",
                  padding: "10px",
                  width: "100%",
                }}
                type="text"
                placeholder="Add your status"
              />
            </div>
          </div>

          {/* ✅ User Details Form */}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </form>

          {/* ✅ Action Buttons */}
          <div className="mt-4 row">
            <button
              className="btn btn-primary w-100"
              onClick={handleUpdateProfile}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
