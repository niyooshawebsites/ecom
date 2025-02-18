const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePrev = (currentPage) => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = (currentPage) => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="w-full flex justify-end items-center mt-10">
      <div>
        <span
          className="bg-blue-600 px-2 py-1 rounded-lg cursor-pointer text-white hover:bg-blue-700"
          onClick={handlePrev}
        >
          PREV
        </span>
        <span className="inline-block border px-2 py-1 rounded-lg mx-2">
          {currentPage < 10 ? `0${currentPage}` : currentPage}/
          {totalPages < 10 ? `0${totalPages}` : totalPages}
        </span>
        <span
          className="bg-blue-600 px-2 py-1 rounded-lg cursor-pointer text-white hover:bg-blue-700"
          onClick={handleNext}
        >
          NEXT
        </span>
      </div>
    </div>
  );
};

export default Pagination;
