const CreateCouponForm = () => {
  return (
    <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
      <h1 className="text-4xl py-3 poppins-light my-10">Create Coupon</h1>
      <div className="flex flex-col w-6/12 border rounded-lg p-5">
        <form className="mb-3">
          <div className="flex flex-col mb-3">
            <label htmlFor="name" className="mb-3">
              Coupon Code
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Enter coupon code"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
          >
            Create Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCouponForm;
