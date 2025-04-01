const PageNotFound = ({ error }: { error?: string }) => {
  return (
    <div className="py-5 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-red-500">Error</h1>
      <p className="text-gray-600 mt-2">{error || "Page not found"}</p>
    </div>
  );
};

export default PageNotFound;
