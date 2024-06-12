import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TaskBoardSkeleton() {
  return (
    <main className="w-full  dark:bg-white">
      <div className="w-full border-gray-800 rounded-3xl">
        <table className=" w-full   caption-bottom table-fixed border ">
          <thead className="text-left">
            <tr>
              <th>
                <Skeleton height={30} width={100} />
              </th>
              <th>
                <Skeleton height={30} width={100} />
              </th>
              <th>
                <Skeleton height={30} width={100} />
              </th>
              <th>
                <Skeleton height={30} width={100} />
              </th>
              <th>
                <Skeleton height={30} width={100} />
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td>
                  <Skeleton height={30} width={100} />
                </td>
                <td>
                  <Skeleton height={30} width={100} />
                </td>
                <td>
                  <Skeleton height={30} width={100} />
                </td>
                <td>
                  <Skeleton height={30} width={100} />
                </td>
                <td>
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
