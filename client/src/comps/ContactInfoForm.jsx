import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ContactInfoFrom = () => {
  const [updatedContactInfo, setUpdatedContactInfo] = useState({
    bName: "NA",
    website: "NA",
    fName: "NA",
    lName: "NA",
    contactNo: "NA",
    buildingNo: "NA",
    streetNo: "NA",
    locality: "NA",
    district: "NA",
    landmark: "NA",
    city: "NA",
    state: "NA",
    pincode: "NA",
  });

  const { uid, role } = useSelector((state) => state.user_Slice);

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
            bName: res.data.data.contactDetails.bName,
            website: res.data.data.contactDetails.website,
            fName: res.data.data.contactDetails.fName,
            lName: res.data.data.contactDetails.lName,
            contactNo: res.data.data.contactDetails.contactNo,
            buildingNo: res.data.data.contactDetails.address.buildingNo,
            streetNo: res.data.data.contactDetails.address.streetNo,
            locality: res.data.data.contactDetails.address.locality,
            district: res.data.data.contactDetails.address.district,
            landmark: res.data.data.contactDetails.address.landmark,
            city: res.data.data.contactDetails.address.city,
            state: res.data.data.contactDetails.address.state,
            pincode: res.data.data.contactDetails.address.pincode,
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
      <h1 className="text-4xl py-3 poppins-light my-10">Contact Details</h1>
      <div className="flex flex-col w-5/12 border rounded-lg p-5 mb-10 overflow-auto">
        {role === "admin" ? (
          <form className="mb-3" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-3">
              <label htmlFor="bName" className="mb-3">
                Business name
              </label>
              <input
                type="text"
                name="bName"
                id="bName"
                value={updatedContactInfo.bName}
                onChange={handleChange}
                className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                placeholder="Northern Lights Pvt Ltd"
              />
            </div>

            <div className="flex flex-col mb-3">
              <label htmlFor="website" className="mb-3">
                Website
              </label>
              <input
                type="text"
                name="website"
                id="website"
                value={updatedContactInfo.website}
                onChange={handleChange}
                className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                placeholder="www.northerlights.com"
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
                value={updatedContactInfo.buildingNo}
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
                value={updatedContactInfo.streetNo}
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
                value={updatedContactInfo.locality}
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
                value={updatedContactInfo.district}
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
                value={updatedContactInfo.landmark}
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
                value={updatedContactInfo.city}
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
                value={updatedContactInfo.state}
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
                value={updatedContactInfo.pincode}
                onChange={handleChange}
                className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                placeholder="110001"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
            >
              Update contact details
            </button>
          </form>
        ) : (
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
                value={updatedContactInfo.buildingNo}
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
                value={updatedContactInfo.streetNo}
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
                value={updatedContactInfo.locality}
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
                value={updatedContactInfo.district}
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
                value={updatedContactInfo.landmark}
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
                value={updatedContactInfo.city}
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
                value={updatedContactInfo.state}
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
                value={updatedContactInfo.pincode}
                onChange={handleChange}
                className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                placeholder="110001"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
            >
              Update contact details
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactInfoFrom;
