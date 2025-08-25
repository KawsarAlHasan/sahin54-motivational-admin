import React from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { useAdminDashboard } from "../../api/api";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";

function Dashboard() {
  const { adminDashboard, isLoading, isError, error, refetch } =
    useAdminDashboard();

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError error={error} refetch={refetch} />;
  }

  return (
    <div>
      <div className="bg-white w-full p-4 rounded-md">
        <p className="text-[16px] mt-2">Hi, Good Morning</p>
        <h2 className="text-[24px] font-semibold">
          {adminDashboard?.admin_profile?.name}
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="bg-white p-4 rounded-md w-full">
          <h1 className="text-[24px] font-semibold">User’s Overview</h1>
          <div className="flex justify-between gap-4">
            <div className="bg-[#e5e5e5] w-full rounded-md p-4">
              <FaUsers className="bg-[#006699] text-[#FFF] h-[40px] rounded-full w-[40px] p-2" />
              <h2 className="text-[24px] font-semibold text-[#242424] mt-2">
                {adminDashboard?.total_users || 0}
              </h2>
              <p className="text-[16px] mt-3">Total Users</p>
            </div>
            <div className="bg-[#e5e5e5] w-full rounded-md p-4">
              <AiOutlineUsergroupAdd className="bg-[#006699] text-[#FFF] h-[40px] rounded-full w-[40px] p-2" />
              <h2 className="text-[24px] font-semibold text-[#242424] mt-2">
                {adminDashboard?.todays_new_users || 0}
              </h2>
              <p className="text-[16px] mt-3">Today’s New Users</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md w-full">
          <h1 className="text-[24px] font-semibold">Income</h1>
          <div className="flex justify-between gap-4">
            <div className="bg-[#e5e5e5] w-full rounded-md p-4">
              <FaSackDollar className="bg-[#006699] text-[#FFF] h-[40px] rounded-full w-[40px] p-2" />
              <h2 className="text-[24px] font-semibold text-[#242424] mt-2">
                ${adminDashboard?.total_earnings || 0}
              </h2>
              <p className="text-[16px] mt-3">Total Revenue</p>
            </div>
            <div className="bg-[#e5e5e5] w-full rounded-md p-4">
              <FaCircleDollarToSlot className="bg-[#006699] text-[#FFF] h-[40px] rounded-full w-[40px] p-2" />
              <h2 className="text-[24px] font-semibold text-[#242424] mt-2">
                {adminDashboard?.total_subscribers || 0}
              </h2>
              <p className="text-[16px] mt-3">Total Subscribers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
