import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// users list
export const getMockUsers = async ({ page = 1, limit = 10 }) => {
  const res = await axios.get("/users_100.json");
  const allUsers = res.data || [];

  // Fake filtering (if status or role is provided)
  let filteredUsers = allUsers;

  // Fake pagination
  const totalUser = filteredUsers.length;
  const totalPages = Math.ceil(totalUser / limit);
  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  return {
    data: paginatedUsers,
    pagination: {
      totalUser,
      page,
      limit,
      totalPages,
    },
  };
};

// administrators
export const getMockAdministrators = async () => {
  const response = await axios.get("/administrators_8.json");

  return response.data;
};

// payouts
export const getMockPayouts = async () => {
  const response = await axios.get("/payments.json");

  return response.data;
};

// users list for messages
export const getMockUsersForMessages = async () => {
  const response = await axios.get("/users_for_list.json");

  return response.data;
};

// // Flagged Content List
// export const getMockFlaggedContent = async ({ page = 1, limit = 10 }) => {
//   const res = await axios.get("/flagged_content_gendered.json");
//   const flaggedContent = res.data || [];

//   // Fake pagination
//   const totalFlaggedContent = flaggedContent.length;
//   const totalPages = Math.ceil(totalFlaggedContent / limit);
//   const paginatedData = flaggedContent.slice((page - 1) * limit, page * limit);

//   return {
//     data: paginatedData,
//     pagination: {
//       totalFlaggedContent,
//       page,
//       limit,
//       totalPages,
//     },
//   };
// };

// // Payouts List
// export const getMockPayouts = async ({ page = 1, limit = 10 }) => {
//   const res = await axios.get("/payouts_data.json");
//   const resData = res.data || [];

//   // Fake pagination
//   const totalPayOuts = resData.length;
//   const totalPages = Math.ceil(totalPayOuts / limit);
//   const paginatedData = resData.slice((page - 1) * limit, page * limit);

//   return {
//     data: paginatedData,
//     pagination: {
//       totalPayOuts,
//       page,
//       limit,
//       totalPages,
//     },
//   };
// };

// // Tasks List
// export const getMockTasks = async ({ page = 1, limit = 10 }) => {
//   const res = await axios.get("/tasks_data.json");
//   const resData = res.data || [];

//   // Fake pagination
//   const totalTasks = resData.length;
//   const totalPages = Math.ceil(totalTasks / limit);
//   const paginatedData = resData.slice((page - 1) * limit, page * limit);

//   return {
//     data: paginatedData,
//     pagination: {
//       totalTasks,
//       page,
//       limit,
//       totalPages,
//     },
//   };
// };

// // leaderboard List
// export const getMockLeaderboard = async ({ page = 1, limit = 10 }) => {
//   const res = await axios.get("/leaderboard_data.json");
//   const resData = res.data || [];

//   // Fake pagination
//   const totalLeaderboard = resData.length;
//   const totalPages = Math.ceil(totalLeaderboard / limit);
//   const paginatedData = resData.slice((page - 1) * limit, page * limit);

//   return {
//     data: paginatedData,
//     pagination: {
//       totalLeaderboard,
//       page,
//       limit,
//       totalPages,
//     },
//   };
// };

// // terms and conditions
// export const getMockTermsConditions = async () => {
//   const response = await axios.get("/terms_condition.json");

//   return response.data;
// };

// // privacy policy
// export const getMockPrivacyPolicy = async () => {
//   const response = await axios.get("/privacy_policy.json");

//   return response.data;
// };
