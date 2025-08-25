import { useState } from "react";
import { Table, Modal, notification } from "antd";
import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { API, useStripePayments } from "../../api/api";

const { confirm } = Modal;

function Payments() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [userDetailsData, setUserDetailsData] = useState(null);
  const [blockLoading, setBlockLoading] = useState(false);

  const { stripePayments, isLoading, isError, error, refetch } =
    useStripePayments(filter);

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
      title: <span>User</span>,
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: <span>Email</span>,
      dataIndex: "user_email",
      key: "user_email",
      render: (email) => <span className="">{email}</span>,
    },

    {
      title: <span>Payments</span>,
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <span className="">${amount}</span>,
    },
    {
      title: <span>date</span>,
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => (
        <span className="">{new Date(created_at).toLocaleString()}</span>
      ),
    },
    {
      title: <span>Plan</span>,
      dataIndex: "subscription_type",
      key: "subscription_type",
      render: (subscription_type) => (
        <span className="">{subscription_type}</span>
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
        dataSource={stripePayments.results}
        rowKey="id"
        pagination={{
          current: filter.page,
          pageSize: filter.limit,
          total: stripePayments.count,
          showSizeChanger: false,
        }}
        onChange={handleTableChange}
        loading={isLoading}
      />
    </div>
  );
}

export default Payments;
