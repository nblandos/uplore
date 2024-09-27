const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-black dark:border-t-transparent dark:border-white"></div>
    </div>
  );
};
export default LoadingSpinner;
