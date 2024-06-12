import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const JobCardSkeleton = ({ skeletonCount }) => {
  console.log(skeletonCount);
  return Array(skeletonCount)
    .fill(0)
    .map((_, i) => (
      <div key={i} className="flex flex-col py-3 px-4 ">
        <div className="flex items-center justify-between ">
          <div className="text-2xl text-wrap break-words max-w-80">
            <Skeleton count={1} />
          </div>
          <div className="flex justify-center items-center">
            <span className="cursor-pointer flex justify-center items-center size-10">
              <Skeleton circle={true} height={20} width={20} />
            </span>
            <span className="cursor-pointer flex justify-center items-center size-10">
              <Skeleton circle={true} height={20} width={20} />
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-400 dark:text-gray-800">
          <Skeleton count={1} />
        </div>
        <div className="text-sm text-gray-400 dark:text-gray-800">
          <Skeleton count={1} />
        </div>
        <div className="flex dark:text-black text-xs gap-2 items-center justify-start my-2">
          <div className="bg-slate-800 flex gap-1 items-center justify-center cursor-pointer dark:bg-gray-200 px-2 py-1 rounded-lg">
            <Skeleton circle={true} height={20} width={20} />
            <Skeleton count={1} />
          </div>
          <div className="bg-slate-800 flex gap-1 items-center justify-center cursor-pointer dark:bg-gray-200 px-2 py-1 rounded-lg">
            <Skeleton circle={true} height={20} width={20} />
            <Skeleton count={1} />
          </div>
          <div className="bg-slate-800 flex gap-1 items-center justify-center cursor-pointer dark:bg-gray-200 px-2 py-1 rounded-lg">
            <Skeleton circle={true} height={20} width={20} />
            <Skeleton count={1} />
          </div>
        </div>
        <div className="py-4 max-w-96">
          <Skeleton count={3} />
        </div>
        <div className="flex w-full justify-end">
          <button className="dark:text-white text-sm border border-white/10 px-6 select-none py-1 rounded-md bg-slate-900 hover:bg-slate-800 transition-all">
            <Skeleton count={1} />
          </button>
        </div>
      </div>
    ));
};

export default JobCardSkeleton;
