import { RotatingLines } from "react-loader-spinner";
function Loading() {
  return (
    <div className="flex h-screen  w-screen justify-center items-center fixed top-0 left-0 z-[70] bg-black/50">
      <div className="flex justify-center items-center pointer-events-none">
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
    </div>
  );
}

export default Loading;
