const CreateTaxForm = () => {
  const handleTaxCreation = () => {};
  return (
    <div className="w-10/12 flex flex-col justify-start items-center">
      <h1 className="text-4xl py-3 poppins-light mt-10 mb-5">Create Tax</h1>
      <div className="flex flex-col w-full border rounded-lg p-5">
        <form
          className=" flex justify-center items-center mb-3"
          action={handleTaxCreation}
        >
          <div className="w-3/12 flex flex-col px-2">
            <label htmlFor="country" className="mb-2">
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="India"
              required
            />
          </div>

          <div className="w-3/12 flex flex-col px-2">
            <label htmlFor="state" className="mb-2">
              State
            </label>
            <input
              type="text"
              name="state"
              id="state"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Uttar Pradesh"
              required
            />
          </div>

          <div className="w-3/12 flex flex-col px-2">
            <label htmlFor="name" className="mb-2">
              State
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="CGST"
              required
            />
          </div>

          <div className="w-1/12 flex flex-col px-2">
            <label htmlFor="rate" className="mb-2">
              Rate (%)
            </label>
            <input
              type="number"
              name="rate"
              id="rate"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="18"
              required
            />
          </div>

          <div className="w-2/12 flex flex-col px-2 pt-7">
            <button
              type="submit"
              className="inline-block bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
            >
              Create Tax
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaxForm;
