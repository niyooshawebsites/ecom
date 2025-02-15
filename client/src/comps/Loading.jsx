const Loading = () => {
  return (
    <div className="w-10/12 flex justify-center items-center min-h-screen p-5 bg-gray-100">
      <div className="flex items-center justify-between space-x-4">
        <div className="text-2xl animate-bounce [animation-delay:0.1s]">
          Processing
        </div>
        <div className="flex space-x-2">
          <div className="h-4 w-4 animate-bounce rounded-full bg-red-500 [animation-delay:0.2s]" />
          <div className="h-4 w-4 animate-bounce rounded-full bg-blue-500 [animation-delay:0.3s]" />
          <div className="h-4 w-4 animate-bounce rounded-full bg-green-500 [animation-delay:0.4s]" />
          <div className="h-4 w-4 animate-bounce rounded-full bg-yellow-500 [animation-delay:0.5s]" />
          <div className="h-4 w-4 animate-bounce rounded-full bg-purple-500 [animation-delay:0.6s]" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
