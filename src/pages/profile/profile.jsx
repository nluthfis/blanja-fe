import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../style/pages/Profile.scss";
import axios from "axios";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const isUpdateMode = queryParams.get("act") === "update";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [currentProfilePhoto, setCurrentProfilePhoto] = useState(null);
  const [file, setFile] = useState(null);
  const [roleId, setRoleId] = useState(null);
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  useEffect(() => {
    if (localStorage.getItem("auth") === null) {
      window.location.href = "/login";
    }
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/users`)
      .then((response) => {
        setName(response?.data?.data?.user_name);
        setRoleId(response?.data?.data?.roles_id);
        setEmail(response?.data?.data?.user_email);
        setPhoneNumber(response?.data?.data?.user_phonenumber);
        setGender(response?.data?.data?.gender || "");
        setCurrentProfilePhoto(response?.data?.data?.user_photo);
        setPassword(response?.data?.data?.user_password);
        setDateOfBirth(response?.data?.data?.date_of_birth);
        setCurrentEmail(response?.data?.data?.user_email);
        setCurrentPassword(response?.data?.data?.user_password);
        setStoreName(response?.data?.data?.name_store);
        setStoreDescription(response?.data?.data?.store_description);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProfilePhoto(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);

      const payload = {
        user_name: name,
        user_phonenumber: phoneNumber,
      };

      if (email !== currentEmail) {
        payload.user_email = email;
      }
      if (password !== currentPassword) {
        payload.user_password = password;
      }

      let apiUrl;
      if (roleId === 1) {
        payload.gender = gender;
        payload.date_of_birth = dateOfBirth;
        apiUrl = `${process.env.REACT_APP_BASE_URL}/edit/customer`;
      } else if (roleId === 2) {
        payload.name_store = storeName;
        payload.store_description = storeDescription;
        apiUrl = `${process.env.REACT_APP_BASE_URL}/edit/seller`;
      }

      const response = await axios.patch(apiUrl, payload);

      if (roleId === 1 && roleId === 2) {
        localStorage.setItem("userName", response?.data?.data[0].user_name);
        setName(response?.data?.data[0].user_name);
        setPhoneNumber(response?.data?.data[0].user_phonenumber);
      }

      // axios
      //   .patch(`${process.env.REACT_APP_BASE_URL}/edit/customer`, payload)
      //   .then((response) => {
      //     console.log("this is getting processed");
      //     console.log(response);
      //     localStorage.setItem("userName", response?.data?.data[0].user_name);
      //     setName(response?.data?.data[0].user_name);
      //     setPhoneNumber(response?.data?.data[0].user_phonenumber);
      //     setLoading(false);
      //   })
      //   .catch((error) => {
      //     console.log(error?.response?.data);
      //   })
      //   .finally(() => {
      //     setLoading(false);
      //   });
    } catch (error) {}
  };

  const handleUploadPhoto = () => {
    try {
      setLoading(true);
      if (currentProfilePhoto) {
        const formData = new FormData();
        formData.append("user_photo", file);
        axios
          .patch(`${process.env.REACT_APP_BASE_URL}/users/photo`, formData)
          .then((response) => {
            localStorage.setItem("userPhoto", response.data.data.user_photo);
            setCurrentProfilePhoto(response.data.data.user_photo);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePromise = (e) => {
    e.preventDefault();

    const updateProfilePromise = new Promise((resolve, reject) => {
      handleUpdateProfile();
      resolve();
      setLoading(true);
    });

    let uploadPhotoPromise = Promise.resolve();

    if (file !== null) {
      uploadPhotoPromise = new Promise((resolve, reject) => {
        handleUploadPhoto();
        resolve();
        setLoading(true);
      });
    }

    Promise.all([updateProfilePromise, uploadPhotoPromise])
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Update Profile Success!",
          icon: "success",
        }).then(() => {
          setLoading(false);
        });
        navigate("/profile");
      })
      .catch((error) => {
        console.log("Error:", error);
        Swal.fire({
          title: "Failed",
          text: error?.response?.data?.message
            ? error?.response?.data?.message
            : "Update Profile Failed",
          icon: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Navbar />
      <Sidebar
        userName={name}
        profilePhoto={currentProfilePhoto}
        loading={loading}
      />
      <main id="profile-page">
        <div className="page-content">
          <div className="container-fluid">
            <h4 className="d-none d-md-block">My Profile</h4>
            <p className="d-none d-md-block">Manage your profile information</p>
            <hr className="d-none d-md-block" />
            {isUpdateMode ? (
              <form onSubmit={handlePromise}>
                <div className="mb-2 row">
                  <div className="col-md-8 border-right mobile-position ">
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
                            setName(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="mb-2 row ">
                      <label
                        htmlFor="email"
                        className="col-sm-3 col-form-label"
                      >
                        Email
                      </label>
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="mb-2 row">
                      <label
                        htmlFor="Password"
                        className="col-sm-3 col-form-label"
                      >
                        Password
                      </label>
                      <div className="col">
                        <input
                          type="password"
                          className="form-control"
                          id="Password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="mb-2  row ">
                      <label
                        htmlFor="phone_number"
                        className="col-sm-3 col-form-label"
                      >
                        Phone number
                      </label>
                      <div className="col">
                        <input
                          type="number"
                          className="form-control"
                          id="phone_number"
                          value={phoneNumber}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    {roleId === 1 && (
                      <div>
                        <div className="mb-2 d-flex align-items-center">
                          <label
                            htmlFor="radio"
                            className="col-sm-3 col-form-label "
                          >
                            Gender
                          </label>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio1"
                              value="Male"
                              checked={gender === "Male"}
                              onChange={handleGenderChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="inlineRadio1"
                            >
                              Male
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
                              onChange={handleGenderChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="inlineRadio2"
                            >
                              Female
                            </label>
                          </div>
                        </div>

                        <div className="mb-2  row ">
                          <label
                            htmlFor="date"
                            className="col-sm-3 col-form-label"
                          >
                            Date
                          </label>

                          <div className="col-12 col-md-5">
                            <div className="input-group date">
                              <input
                                type="date"
                                className="form-control"
                                id="date"
                                value={dateOfBirth || ""}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {roleId === 2 && (
                      <div>
                        <div className="mb-2 row ">
                          <label
                            htmlFor="storeName"
                            className="col-sm-3 col-form-label"
                          >
                            Name store
                          </label>
                          <div className="col">
                            <input
                              type="text"
                              className="form-control"
                              id="storeName"
                              value={storeName}
                              onChange={(e) => {
                                setStoreName(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="mb-2 row ">
                          <label
                            htmlFor="storeName"
                            className="col-sm-3 col-form-label"
                          >
                            Store description
                          </label>
                          <div className="col">
                            <input
                              type="text"
                              className="form-control"
                              id="storeDescription"
                              value={
                                storeDescription !== null
                                  ? storeDescription
                                  : "No description"
                              }
                              onChange={(e) => {
                                setStoreDescription(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="mb-2 d-flex align-items-center"></div>
                  </div>
                  <div className="col-md-4 btn-label ">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        className="img-responsive object-fit-cover rounded-circle"
                        src={currentProfilePhoto}
                        height="100"
                        width="100"
                      />
                    </div>
                    <input
                      type="file"
                      id="upload-image"
                      accept="image/* "
                      className="col-md-8 order-md-1 "
                      onChange={handleImageChange}
                    />
                    <label
                      htmlFor="upload-image"
                      className="btn btn-danger mt-2 text-light"
                    >
                      Select image
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-md-primary btn-sm-primary mt-2 "
                >
                  {loading ? "Loading.." : "Save"}
                </button>
              </form>
            ) : (
              <>
                <div className="mb-2 row ">
                  <div htmlFor="name" className="col-sm-3 col-form-div">
                    Name
                  </div>
                  <div className="col">
                    {!loading ? (
                      name ? (
                        name
                      ) : (
                        "Not Defined"
                      )
                    ) : (
                      <Skeleton width={300} />
                    )}
                  </div>
                </div>

                <div className="mb-2 row ">
                  <div htmlFor="email" className="col-sm-3 col-form-div">
                    Email
                  </div>
                  <div className="col">
                    {!loading ? (
                      email ? (
                        email
                      ) : (
                        "Not Defined"
                      )
                    ) : (
                      <Skeleton width={300} />
                    )}
                  </div>
                </div>

                <div className="mb-2 row ">
                  <div htmlFor="phone_number" className="col-sm-3 col-form-div">
                    Phone number
                  </div>
                  <div className="col">
                    {!loading ? (
                      phoneNumber ? (
                        phoneNumber
                      ) : (
                        "Not Defined"
                      )
                    ) : (
                      <Skeleton width={300} />
                    )}
                  </div>
                </div>
                {roleId === 1 && (
                  <div>
                    <div className="mb-2 row ">
                      <div htmlFor="radio" className="col-sm-3 col-form-div ">
                        Gender
                      </div>
                      <div className="col">
                        {!loading ? (
                          gender ? (
                            gender
                          ) : (
                            "Not Defined"
                          )
                        ) : (
                          <Skeleton width={300} />
                        )}
                      </div>
                    </div>
                    <div className="mb-2 row">
                      <div htmlFor="date" className="col-sm-3 col-form-div">
                        Date
                      </div>
                      <div className="col">
                        {!loading ? (
                          dateOfBirth ? (
                            dateOfBirth.substring(0, 10)
                          ) : (
                            "Not Defined"
                          )
                        ) : (
                          <Skeleton width={300} />
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {roleId === 2 && (
                  <div>
                    <div className="mb-2 row ">
                      <div htmlFor="radio" className="col-sm-3 col-form-div ">
                        Store name
                      </div>
                      <div className="col">
                        {!loading ? (
                          storeName ? (
                            storeName
                          ) : (
                            "Not Defined"
                          )
                        ) : (
                          <Skeleton width={300} />
                        )}
                      </div>
                    </div>
                    <div className="mb-2 row ">
                      <div htmlFor="radio" className="col-sm-3 col-form-div ">
                        Store Description
                      </div>
                      <div className="col">
                        {!loading ? (
                          storeDescription ? (
                            storeDescription
                          ) : (
                            "There is no store description"
                          )
                        ) : (
                          <Skeleton width={300} />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Profile;
