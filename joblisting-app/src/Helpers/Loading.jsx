import { RotatingLines } from "react-loader-spinner";
import { useContext } from "react";
import MyContext from "../Context";
function Loading() {
  const { theme } = useContext(MyContext);
  return (
    <div className="flex h-screen  w-screen justify-center items-center fixed top-0 left-0 z-[170] ">
      <div className="flex justify-center items-center pointer-events-none">
        <RotatingLines
          className="stroke-red-700 dark:text-black"
          visible={true}
          height="96"
          width="96"
          strokeColor={
            theme === true ? "black" : theme === null ? "white" : "white"
          }
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
