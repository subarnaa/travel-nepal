import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../user-contex";

import { logoutUser } from "../../services/auth";

import Nav from "./Nav";
import SideBar from "./SideBar";

const Header = () => {
  const history = useHistory();
  const [{ user }] = useAuth();
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      // refresh
      history.go();
    } catch (error) {
      const errMessage =
        error.response && error.response.data.error
          ? error.response.data.error.message
          : error.message;

      toast.error(errMessage);
    }
  };

  return (
    <div>
      <Nav {...{ toggleDrawer, handleLogout, user }} />
      <SideBar {...{ state, toggleDrawer, handleLogout, user }} />
    </div>
  );
};

export default Header;
