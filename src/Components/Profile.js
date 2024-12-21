import React from 'react';

const Profile = () => {
    return (
        <div className="container-fluid py-4">
            <div className="row justify-content-center">
                {/* Profile Section */}
                <div className="col-lg-6 col-md-8 col-sm-10 col-12  rounded p-4 shadow-sm bg-white">
                    <h4 className="text-center mb-4">Profile Details</h4>

                    {/* Profile Image Upload */}
                    <div className="text-center mb-4">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Profile"
                            className="rounded-circle mb-3"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                        <div>
                            <input type='file'/>
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

                    {/* Delete Account Button */}
                    <div className="mt-4 row" style={{display:'flex'}}>
                    <button className="btn btn-success w-100">Update Account</button>
                        <button className="btn btn-danger mt-2 w-100">Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
