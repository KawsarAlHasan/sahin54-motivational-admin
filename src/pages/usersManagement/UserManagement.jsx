import React, { useState } from "react";
import { Table, Tag, Space, Modal, notification } from "antd";
import { MdBlock } from "react-icons/md";
import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import {
  EyeOutlined,
  ReloadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import ViewAnswerModal from "./ViewAnswerModal";
import { API, useUsers } from "../../api/api";
import ViewUser from "./ViewUser";
// import UserDetailsModal from "./UserDetailsModal";

const { confirm } = Modal;

function UserManagement() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [userDetailsData, setUserDetailsData] = useState(null);
  const [blockLoading, setBlockLoading] = useState(false);

  const { users, isLoading, isError, error, refetch } = useUsers(filter);

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
      duration: 3,
    });
  };

  const showBlockConfirm = (userData) => {
    const statusData = userData.action == "enable" ? "disable" : "enable";

    confirm({
      title: `Are you sure you want to ${statusData} this user?`,
      icon: <ExclamationCircleOutlined />,
      content: `Do you want to ${statusData} this user?`,
      okText: `Yes, ${statusData}`,
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        handleBlock(userData);
      },
    });
  };

  const handleBlock = async (userData) => {
    setBlockLoading(true);
    try {
      const statusData = userData.action == "enable" ? "disable" : "enable";

      const submitData = {
        action: statusData,
      };

      const response = await API.post(
        `/admin/users/${userData.id}/action/`,
        submitData
      );

      openNotification("success", "Success", `User ${statusData} successfully`);
      refetch();
    } catch (error) {
      openNotification("error", "Error", `Failed to ${statusData} user`);
    } finally {
      setBlockLoading(false);
    }
  };

  const handleUserDetails = (userData) => {
    setUserDetailsData(userData);
    setIsViewModalOpen(true);
  };

  const handleModalClose = () => {
    setUserDetailsData(null);
    setIsViewModalOpen(false);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setFilter((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
    }));
  };

  const columns = [
    {
      title: <span>Sl no.</span>,
      dataIndex: "display_id",
      key: "display_id",
      render: (serial) => <span>#{serial}</span>,
    },
    {
      title: <span>User</span>,
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: <span>Email</span>,
      dataIndex: "email",
      key: "email",
      render: (email) => <span>{email}</span>,
    },
    {
      title: <span>Phone</span>,
      dataIndex: "phone_number",
      key: "phone_number",
      render: (phone) => <span>{phone}</span>,
    },
    {
      title: <span>Subscription</span>,
      dataIndex: "subscription",
      key: "subscription",
      render: (subscription) => <span>{subscription}</span>,
    },

    {
      title: <span>Action</span>,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <EyeOutlined
            onClick={() => handleUserDetails(record)}
            className="text-[23px] text-blue-400 hover:text-blue-300 cursor-pointer"
          /> */}
          <MdBlock
            className="text-[23px] text-red-400 hover:text-red-300 cursor-pointer"
            onClick={() => handleUserDetails(record)}
          />
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError error={error} refetch={refetch} />;
  }


  return (
    <div className="p-4">
      <Table
        columns={columns}
        dataSource={users.results}
        rowKey="id"
        pagination={{
          current: filter.page,
          pageSize: filter.limit,
          total: users.count,
          showSizeChanger: false,
          // pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={handleTableChange}
        loading={isLoading}
      />

      <ViewUser
        userDetailsData={userDetailsData}
        isOpen={isViewModalOpen}
        onClose={handleModalClose}
        refetch={refetch}
      />
    </div>
  );
}

export default UserManagement;
