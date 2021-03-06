import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";

import HomeIcon from "@material-ui/icons/Home";
import PublicIcon from "@material-ui/icons/Public";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddToHomeScreenIcon from "@material-ui/icons/AddToHomeScreen";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import PeopleIcon from "@material-ui/icons/People";
import ExploreIcon from "@material-ui/icons/Explore";
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import NotVerifiedOutlinedIcon from '@material-ui/icons/HourglassEmptyOutlined';
import NearMeIcon from "@material-ui/icons/NearMe";
import BookIcon from "@material-ui/icons/Book";

import SideBarList from "./SideBarList";
import { Divider } from "@material-ui/core";
import { Place } from "@material-ui/icons"

const useStyles = makeStyles({
  list: {
    width: '250px',
  },
  fullList: {
    width: "auto",
  },
});

export default function SideBar({ toggleDrawer, state, handleLogout, user }) {
  const classes = useStyles();

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {user ? (
          user.user ? (
            <>
              {user.user.isAdmin && (
                <>
                  <SideBarList
                    Icon={PeopleIcon}
                    text="Users"
                    lnk="/admin/users"
                  />
                  <SideBarList
                    Icon={ExploreIcon}
                    text="Destinations"
                    lnk="/admin/places"
                  />
                  <SideBarList
                    Icon={VerifiedUserOutlinedIcon}
                    text="Verified Guides"
                    lnk="/admin/guides/verified"
                  />
                  <SideBarList
                    Icon={NotVerifiedOutlinedIcon}
                    text="Pending Guide Requests"
                    lnk="/admin/guides/pending"
                  />
                  <Divider />
                </>
              )}
              <SideBarList Icon={HomeIcon} text="Home" lnk="/" />
              <SideBarList Icon={PublicIcon} text="Explore" lnk="/explore" />
              <SideBarList
                Icon={AddLocationIcon}
                text="Contribute"
                lnk="/contribute"
              />
              <Divider />
              {user.user.role === "guide" && (
                <SideBarList Icon={NearMeIcon} text="Guide" lnk="/beguide" />
              )}
              <SideBarList
                Icon={BookIcon}
                text="Bucket List"
                lnk="/bucketlist"
              />
              <SideBarList
                Icon={Place}
                text="My Places"
                lnk="/myplaces"
              />
              <Divider />
              <SideBarList
                Icon={ExitToAppIcon}
                text="Logout"
                handleLogout={handleLogout}
              />
            </>
          ) : (
            <>
              <SideBarList
                Icon={AddToHomeScreenIcon}
                text="Login"
                lnk="/login"
              />
              <SideBarList
                Icon={AssignmentTurnedInIcon}
                text="Signup"
                lnk="/signup"
              />
            </>
          )
        ) : null}
      </List>
    </div>
  );

  return (
    <div>
      <Drawer
        anchor={"right"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}
