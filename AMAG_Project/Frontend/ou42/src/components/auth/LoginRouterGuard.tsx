import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function LoginRaouterGuard() {
  const url = useLocation().pathname;
  const navigate = useNavigate();
  // useEffect(() => {
  //   const loginInfo = localStorage.getItem("loginInfo");
  //   if (loginInfo) {
  //     const parsedLoginInfo = loginInfo;
  //     const type = parsedLoginInfo.type;
  //     if (type === "user") {
  //       navigate("/home");
  //     } else navigate("/admin/home");
  //   }
  // }, [url]);
  return <Outlet />;
}
