const ProductSkeleton = () => {
  return (
    <div className="w-3/12">
      <div className="flex flex-col border rounded-lg text-center p-2 m-3 animate-pulse">
        <div className="h-[300px] bg-gray-300 rounded-md"></div>
        <div className="h-6 bg-gray-300 w-3/4 mx-auto mt-2 rounded"></div>
        <div className="h-5 bg-gray-300 w-1/2 mx-auto mt-1 rounded"></div>
        <div className="h-6 bg-gray-300 w-1/3 mx-auto mt-2 rounded"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
