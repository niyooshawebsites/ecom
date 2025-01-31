import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ContactInfoFrom = () => {
  const [updatedContactInfo, setUpdatedContactInfo] = useState({
    fName: "Not available",
    lName: "Not available",
    contactNo: "Not available",
    address: {
      buildingNo: "Not available",
      streetNo: "Not available",
      locality: "Not available",
      district: "Not available",
      landmark: "Not available",
      city: "Not available",
      state: "Not available",
      pincode: "Not available",
    },
  });

  const { uid } = useSelector((state) => state.user_Slice);

  const fetchContactInfo = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-user/${uid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setUpdatedContactInfo((prevState) => {
          return {
            ...prevState,
            ...res.data.data.contactDetails,
          };
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/update-contact-details/${uid}`,
        updatedContactInfo,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
    }
  };

  useEffect(() => {
    fetchContactInfo();
  }, []);
  return (
    <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
      <h1 className="text-4xl py-3 poppins-light my-10">Contact Information</h1>
      <div className="flex flex-col w-5/12 border rounded-lg p-5 mb-10 overflow-auto">
        <form className="mb-3" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-3">
            <label htmlFor="fName" className="mb-3">
              First name
            </label>
            <input
              type="text"
              name="fName"
              id="fName"
              value={updatedContactInfo.fName}
              onChange={handleChange}
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="John"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="lName" className="mb-3">
              Last name
            </label>
            <input
              type="text"
              name="lName"
              id="lName"
              value={updatedContactInfo.lName}
              onChange={handleChange}
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Doe"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="contactNo" className="mb-3">
              Contact number
            </label>
            <input
              type="text"
              name="contactNo"
              id="contactNo"
              value={updatedContactInfo.contactNo}
              onChange={handleChange}
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="9891875195"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="buildingNo" className="mb-3">
              Buidling number
            </label>
            <input
              type="text"
              name="buildingNo"
              id="buildingNo"
              value={updatedContactInfo.address.buildingNo}
              onChange={handleChange}
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="A 123"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="streetNo" className="mb-3">
              Street name or number
            </label>
            <input
              type="text"
              name="streetNo"
              id="streetNo"
              value={updatedContactInfo.address.streetNo}
              onChange={handleChange}
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="07"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="locality" className="mb-3">
              Locality
            </label>
            <input
              type="text"
              name="locality"
              id="locality"
              value={updatedContactInfo.address.locality}
              onChange={handleChange}
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Nehru Enclave"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="district" className="mb-3">
              District
            </label>
            <input
              type="text"
              name="district"
              id="district"
              value={updatedContactInfo.address.district}
              onChange={handleChange}
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="North East"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="landmark" className="mb-3">
              Landmark
            </label>
            <input
              type="text"
              name="landmark"
              id="landmark"
              value={updatedContactInfo.address.landmark}
              onChange={handleChange}
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Ahuja builders"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="city" className="mb-3">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={updatedContactInfo.address.city}
              onChange={handleChange}
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="New Delhi"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="state" className="mb-3">
              State
            </label>
            <input
              type="text"
              name="state"
              id="state"
              value={updatedContactInfo.address.state}
              onChange={handleChange}
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Delhi"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="pincode" className="mb-3">
              Pincode
            </label>
            <input
              type="text"
              name="pincode"
              id="pincode"
              value={updatedContactInfo.address.pincode}
              onChange={handleChange}
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="110001"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
          >
            Update contact infomation
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactInfoFrom;
