import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import {
  Box,
  Grid,
  IconButton,
  Hidden,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Nav = ({ toggleDrawer, handleLogout, user }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (user === null) return null;

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{height: '85px', justifyContent: 'center'}}>
        <Toolbar>
          <Box className={classes.title}>
            <Grid container alignItems="center">

              <Typography variant="h6">Travel Nepal</Typography>
            </Grid>
          </Box>
          <Hidden smDown>
            {user && user.user ? (
              <>
                {user.user.isAdmin && (
                  <>
                    <Button
                      color="inherit"
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      Admin
                    </Button>
                    <Menu
                      id="admin-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to="/admin/users"
                      >
                        Users
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to="/admin/places"
                      >
                        Destinations
                      </MenuItem>
                    </Menu>
                  </>
                )}
                {user.user.role === "guide" && (
                  <Button component={Link} to="/beguide" color="inherit">
                    Guide
                  </Button>
                )}
                <Button component={Link} to="/" color="inherit">
                  Home
                </Button>
                <Button component={Link} to="/explore" color="inherit">
                  Explore
                </Button>
                <Button component={Link} to="/contribute" color="inherit">
                  Contribute
                </Button>
                <Button component={Link} to="/bucketlist" color="inherit">
                  Bucket List
                </Button>
                <Button component={Link} to="/myplaces" color="inherit">
                  My Places
                </Button>
                <Button onClick={handleLogout} color="inherit">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={Link} to="/signup" color="inherit">
                  Signup
                </Button>
              </>
            )}
          </Hidden>
          <Hidden mdUp>
            <IconButton
              aria-label="toggle-drawer"
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon fontSize="large" style={{ color: "white" }} />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
