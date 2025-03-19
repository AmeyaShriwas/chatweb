import React, { useEffect, useState } from "react";
import { VscAdd, VscTrash } from "react-icons/vsc";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { RootState } from "../Redux/store";

const Profile = () => {
  const [profileImg, setProfileImg] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isPhone, setIsPhone] = useState(window.innerWidth <= 768);

  const { id, image, email, user } = useSelector((state: RootState) => state.auth);

  // ✅ Handle screen resize for responsiveness
  useEffect(() => {
    const handleResize = () => setIsPhone(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Handle image upload
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

        if (response.data && response.data.profilePicture) {
          setProfileImg(response.data.profilePicture);
          Swal.fire("Success", "Profile image uploaded successfully", "success");
        } else {
          Swal.fire("Error", "Failed to upload image", "error");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        Swal.fire("Error", "Failed to upload image", "error");
      }
    }
  };

  // ✅ Handle profile update
  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        `https://api.chatwithus.ameyashriwas.com/user/update-profile/${id}`,
        { name, phone }
      );

      Swal.fire("Success", "Profile updated successfully", "success");
      console.log(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  // ✅ Handle profile deletion
  const handleDeleteProfile = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://api.chatwithus.ameyashriwas.com/user/delete-profile/${id}`);
          Swal.fire("Deleted!", "Your profile has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting profile:", error);
          Swal.fire("Error", "Failed to delete profile", "error");
        }
      }
    });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10 col-12 rounded p-4 shadow-sm bg-white">
          <h4 className="text-center mb-4">Profile Details</h4>

          {/* ✅ Profile Image Upload Section */}
          <div
            className={`d-flex ${isPhone ? "flex-column" : "flex-row"} justify-content-around align-items-center gap-4`}
          >
            <div className="position-relative text-center">
              <div
                className="rounded-circle overflow-hidden"
                style={{
                  width: "180px",
                  height: "180px",
                  border: "2px solid #ccc",
                  cursor: "pointer",
                  transition: "0.3s",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <img
                  src={`https://api.chatwithus.ameyashriwas.com${profileImg || image}`}
                  alt="Profile"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{ opacity: 0, cursor: "pointer" }}
                />
              </div>
              <div className="mt-2">
                <VscAdd size={30} />
              </div>
            </div>

            {/* ✅ User Details Form */}
            <div style={{ width: isPhone ? "90%" : "60%" }}>
              <div className="mb-3">
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

              <div className="mb-3">
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
          </div>

          {/* ✅ Action Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-primary w-50 me-2"
              onClick={handleUpdateProfile}
            >
              Update Profile
            </button>
            <button
              className="btn btn-danger w-50"
              onClick={handleDeleteProfile}
            >
              <VscTrash size={20} className="me-2" />
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
