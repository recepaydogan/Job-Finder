import { RotatingLines } from "react-loader-spinner";
function Loading() {
  return (
    <div className="flex justify-center items-center absolute pointer-events-none right-1/2 top-1/2">
      <RotatingLines
        className="text-white"
        visible={true}
        height="96"
        width="96"
        strokeColor="white"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loading;
