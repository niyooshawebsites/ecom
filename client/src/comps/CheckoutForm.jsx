const CheckoutForm = () => {
  const states = ["Delhi", "Maharashtra", "West Bengal", "Tamil Nadu"];

  return (
    <div>
      <form action="">
        <div className=" flex flex-col justify-start items-center min-h-screen">
          <h1 className="text-4xl py-3 poppins-light my-10">Checkout</h1>
          <div className="flex flex-col w-6/12 border rounded-lg p-5">
            <form className="mb-3">
              {/* <div className="flex flex-col mb-3">
                <label htmlFor="category" className="mb-2">
                  Select category
                </label>
                <select
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  name="category"
                  id="category"
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div> */}

              <h2 className="font-semibold mb-5">Billing information</h2>

              <div className="flex mb-3">
                <div className="w-6/12 flex flex-col px-2">
                  <label htmlFor="fname" className="mb-2">
                    First name
                  </label>
                  <input
                    type="text"
                    name="fname"
                    id="fname"
                    className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                    placeholder="First name"
                  />
                </div>

                <div className="w-6/12 flex flex-col px-2">
                  <label htmlFor="lname" className="mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lname"
                    id="lname"
                    className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="flex mb-3">
                <div className="w-6/12 flex flex-col px-2">
                  <label htmlFor="email" className="mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                    placeholder="Email"
                  />
                </div>

                <div className="w-6/12 flex flex-col px-2">
                  <label htmlFor="contactNumber" className="mb-2">
                    Contact number
                  </label>
                  <input
                    type="text"
                    name="contactNumber"
                    id="contactNumber"
                    className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                    placeholder="Contact number"
                  />
                </div>
              </div>

              <div className="flex mb-3">
                <div className="w-6/12 flex flex-col px-2">
                  <label htmlFor="buildingNo" className="mb-2">
                    Building number
                  </label>
                  <input
                    type="text"
                    name="buildingNo"
                    id="buildingNo"
                    className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                    placeholder="Building number"
                  />
                </div>

                <div className="w-6/12 flex flex-col px-2">
                  <label htmlFor="streetNo" className="mb-2">
                    Street number
                  </label>
                  <input
                    type="text"
                    name="streetNo"
                    id="streetNo"
                    className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                    placeholder="Street number"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-3 px-2">
                <label htmlFor="address" className="mb-2">
                  Address
                </label>
                <input
                  name="address"
                  id="address"
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Address"
                />
              </div>

              <div className="flex mb-3">
                <div className="w-6/12 flex flex-col px-2">
                  <label htmlFor="fname" className="mb-2">
                    Landmark
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    id="landmark"
                    className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                    placeholder="Landmark"
                  />
                </div>

                <div className="w-6/12 flex flex-col px-2">
                  <label htmlFor="city" className="mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                    placeholder="city"
                  />
                </div>
              </div>

              <div className="flex mb-3">
                <div className="w-6/12 flex flex-col px-2">
                  <label htmlFor="category" className="mb-2">
                    State
                  </label>
                  <select
                    className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                    name="state"
                    id="state"
                  >
                    {states.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-6/12 flex flex-col px-2">
                  <label htmlFor="pincode" className="mb-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    id="pincode"
                    className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                    placeholder="Pincode"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="orderNote" className="mb-2">
                  Order note
                </label>
                <textarea
                  name="orderNote"
                  id="orderNote"
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  rows={3}
                  placeholder="Share order note, if any"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
              >
                Place order
              </button>
            </form>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
