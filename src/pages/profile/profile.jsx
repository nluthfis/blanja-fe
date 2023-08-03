import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../style/pages/Profile.scss";
import axios from 'axios';
import Swal from "sweetalert2";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const isUpdateMode = queryParams.get('act') === 'update';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [currentProfilePhoto, setCurrentProfilePhoto] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("auth") === null) {
      window.location.href = "/login";
    }
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/users`)
      .then((response) => {
        setLoading(false);
        const data = response.data;
        if (data.status) {
          setName(data.data.user_name);
          setEmail(data.data.user_email);
          setCurrentEmail(data.data.user_email);
          setPhoneNumber(data.data.user_phonenumber);
          setGender(data.data.gender || "");
          setDateOfBirth(data.data.date_of_birth.split("T")[0] || "")
          setCurrentProfilePhoto(data.data.user_photo);
        } else {
          console.error("Failed to fetch user data");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleUpdateProfile = async () => {
    setLoading(true);

    const payload = {
      user_name: name,
      user_phonenumber: phoneNumber,
      gender: gender,
      date_of_birth: dateOfBirth,
    }

    if (currentEmail !== email) {
      payload.user_email = email;
    }

    // if (currentProfilePhoto !== profilePhoto) {
    //   console.log(currentProfilePhoto)
    //   console.log(profilePhoto)
    //   handleUploadPhoto();
    // }

    axios
      .patch(`${process.env.REACT_APP_BASE_URL}/edit/customer`, payload)
      .then((response) => {
        setLoading(false);
        localStorage.setItem("userName", response?.data?.data[0].user_name);
        Swal.fire({
          title: "Success",
          text: "Update Profile Success!",
          icon: "success",
        })
        navigate('/profile')
      })
      .catch((error) => {
        setLoading(false);
        console.log(error?.response?.data?.message);
        navigate('/profile')
        Swal.fire({
          title: "Failed",
          text: error?.response?.data?.message ? error?.response?.data?.message : "Update Profile Failed",
          icon: "error",
        })
      })
  }

  function formatDate(dateString) {
    const dateParts = dateString.split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    const months = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];

    const formattedDate = `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;

    return formattedDate;
  }

  const handleUploadPhoto = () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    const formData = new FormData()
    formData.append("user_photo", profilePhoto)
    axios.patch(`${process.env.REACT_APP_BASE_URL}/users/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setLoading(false);
        // localStorage.setItem("userName", response?.data?.data[0].user_name);
        Swal.fire({
          title: "Success",
          text: "Update Profile Success!",
          icon: "success",
        })
        navigate('/profile')
      })
      .catch((error) => {
        setLoading(false);
        console.log(error)
        Swal.fire({
          title: "Failed!",
          text: error?.response?.data?.message ?? "Error Upload Photo!",
          icon: "error",
        })
      })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
  };


  return (
    <>
      <Navbar />
      <Sidebar userName={name} profilePhoto={currentProfilePhoto} />
      <main id="profile-page">
        <div className="page-content">
          <div className="container-fluid">
            <h4 className="d-none d-md-block">My Profile</h4>
            <p className="d-none d-md-block">Manage your profile information</p>
            <hr className="d-none d-md-block" />
            {
              isUpdateMode ? (
                <form onSubmit={(e) => e.preventDefault()}>

                  {/* <div className="mb-2 row">
                    <label htmlFor="profilePhoto" className="col-sm-3 col-form-label">
                      Profile Photo
                    </label>
                    <div className="col">
                      <img
                        className="img-responsive object-fit-cover rounded-circle"
                        src={profilePhoto ? URL.createObjectURL(profilePhoto) : currentProfilePhoto}
                        height="70"
                        width="70"
                        alt="Profile"
                      />
                      <input
                        type="file"
                        className="form-control"
                        id="profilePhoto"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </div>
                  </div> */}

                  <div className="mb-2 row ">
                    <label htmlFor="name" className="col-sm-3 col-form-label">
                      Name
                    </label>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-2 row ">
                    <label htmlFor="email" className="col-sm-3 col-form-label">
                      Email
                    </label>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-2  row ">
                    <label htmlFor="phone_number" className="col-sm-3 col-form-label">
                      Phone number
                    </label>
                    <div className="col">
                      <input
                        type="number"
                        className="form-control"
                        id="phone_number"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                  <div className="row mobile-position ">
                    <label htmlFor="radio" className="col-sm-3 col-form-label ">
                      Gender
                    </label>
                    <div className="col">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="Male"
                          checked={gender === "Male"}
                          onChange={(e) => {
                            setGender(e.target.value)
                          }}
                        />
                        <label className="form-check-label" htmlFor="inlineRadio1">
                          Laki-laki
                        </label>
                      </div>

                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          value="Female"
                          checked={gender === "Female"}
                          onChange={(e) => {
                            setGender(e.target.value)
                          }}
                        />
                        <label className="form-check-label" htmlFor="inlineRadio2">
                          Perempuan
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 row mobile-position">
                    <label htmlFor="date" className="col-sm-3 col-form-label">
                      Date
                    </label>

                    <div className="col-12 col-md-5">
                      <div className="input-group date">
                        <input
                          type="date"
                          className="form-control"
                          id="date"
                          value={dateOfBirth}
                          onChange={(e) => {
                            setDateOfBirth(e.target.value)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-md-primary btn-sm-primary mt-2" onClick={handleUpdateProfile}>
                    Save
                  </button>
                </form>
              ) : (
                <>
                  <div className="mb-2 row ">
                    <div htmlFor="name" className="col-sm-3 col-form-div">
                      Name
                    </div>
                    <div className="col">
                      {name || <Skeleton width={300} />}
                    </div>
                  </div>

                  <div className="mb-2 row ">
                    <div htmlFor="email" className="col-sm-3 col-form-div">
                      Email
                    </div>
                    <div className="col">
                      {email || <Skeleton width={300} />}
                    </div>
                  </div>

                  <div className="mb-2 row ">
                    <div htmlFor="phone_number" className="col-sm-3 col-form-div">
                      Phone number
                    </div>
                    <div className="col">
                      {phoneNumber || <Skeleton width={300} />}
                    </div>
                  </div>

                  <div className="mb-2 row">
                    <div htmlFor="radio" className="col-sm-3 col-form-div ">
                      Gender
                    </div>
                    <div className="col">
                      {
                        !loading ? (
                          gender ? gender : "Not Defined"
                        ) : (
                          <Skeleton width={300} />
                        )
                      }
                    </div>
                  </div>
                  <div className="mb-2 row">
                    <div htmlFor="date" className="col-sm-3 col-form-div">
                      Date
                    </div>
                    <div className="col">
                      {
                        !loading ? (
                          dateOfBirth ? formatDate(dateOfBirth) : "Not Defined"
                        ) : (
                          <Skeleton width={300} />
                        )
                      }
                    </div>
                  </div>
                </>
              )
            }
          </div>
        </div>
      </main>
    </>
  );
}

export default Profile;
