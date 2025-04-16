import { Avatar, Tabs } from "antd";
import { IoIosLogOut } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { localStorageUtil } from "../../helpers/localstorage.helper";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [activeUrl, setActiveUrl] = useState("/")
  useEffect(() => {
    setActiveUrl(location.pathname)
  }, [location])
  const handleLogout = () => {
    localStorageUtil.remove("user");
    localStorageUtil.remove("accessToken");
    navigate("/login");
  };
  const items = [
    {
      key: "/",
      label: "Trang chủ",
    },
    {
      key: "/tasks",
      label: "Công việc",
    },
    {
      key: "/reports",
      label: "Báo cáo",
    },
    {
      key: "/email",
      label: "Email",
    },
  ];
  return (
    <>
      <header className="header-container">
        <div className="header-name">DHCopr</div>
        <div className="header-actions">
          <Avatar size="large" />
          <div className="info-user">
            <p>Đức Hải</p>
            <p>Dev A Team</p>
          </div>
          <IoIosLogOut className="action" onClick={handleLogout} />
        </div>
      </header>
      <Tabs
        defaultActiveKey={"/"}
        activeKey={activeUrl}
        items={items}
        onChange={(key) => navigate(key)}
      />
    </>
  );
};

export default Header;
