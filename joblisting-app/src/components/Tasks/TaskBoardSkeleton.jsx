import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TaskBoardSkeleton() {
  return (
    <main className="w-full  dark:bg-white">
      <div className="w-full border-gray-800 rounded-3xl">
        <table className=" w-full   caption-bottom table-fixed border ">
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr className="border-b-[1px] border-gray-400 " key={index}>
                <td className="py-2">
                  <Skeleton height={30} width={100} />
                </td>
                <td className="py-2">
                  <Skeleton height={30} width={100} />
                </td>
                <td className="py-2">
                  <Skeleton height={30} width={100} />
                </td>
                <td className="py-2">
                  <Skeleton height={30} width={100} />
                </td>
                <td className="py-2">
                  <Skeleton height={30} width={100} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default TaskBoardSkeleton;
