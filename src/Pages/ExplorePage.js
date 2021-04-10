import React from "react";
import { useQuery } from "react-query";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import ExploreIcon from "@material-ui/icons/Explore";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";

import Map from "../Components/Map";
import LoadingIndicator from "../Components/LoadingIndicator";

import { getAllPlaces } from "../services/place";

const useStyles = makeStyles({
  stickToBottom: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    zIndex: 2,
    maxWidth: 550,
    borderRadius: '15px',
  },
});
// const ExplorePage = () => {
//   return <h1>A map with places will be placed here</h1>;
// }
const ExplorePage = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("all");
  const [places, setPlaces] = React.useState([]);

  const { isLoading, data } = useQuery("places", getAllPlaces, {
    onSuccess: (data) => setPlaces(data),
  });

  const handleChange = (_event, newValue) => {
    setValue(newValue);
    if (newValue === "all") return setPlaces(data);
    const filteredPlaces = data.filter((place) => place.type === newValue);
    setPlaces(filteredPlaces);
  };

  // seems like data becomes undefined just for a second after login
  if (isLoading || !data) return <LoadingIndicator />;

  return (
    <>
      <Map data={places} />
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.stickToBottom}
      >
        <BottomNavigationAction
          label="All"
          value="all"
          icon={<ExploreIcon />}
        />
        <BottomNavigationAction
          label="Landmark"
          value="landmark"
          icon={<AccountBalanceIcon />}
        />
        <BottomNavigationAction
          label="Shopping"
          value="shopping"
          icon={<ShoppingCartIcon />}
        />
        <BottomNavigationAction
          label="Religious"
          value="religious"
          icon={<AllInclusiveIcon />}
        />
      </BottomNavigation>
    </>
  );
};

export default ExplorePage;
