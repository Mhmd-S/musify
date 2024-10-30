import Spinner from "@components/Spinner";

const LoadingOverlay = () => (
  <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
      <Spinner />
  </div>
);

export default LoadingOverlay;