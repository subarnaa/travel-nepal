import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";

import {
  Grid,
  Box,
  TextField,
  Typography,
  InputAdornment,
  Hidden,
  CircularProgress,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { getPlaceByQuery } from "../../services/place";

import travellers from "../../statics/travellers_pointing.png";

const HeaderSearch = ({ smMatch, mdMatch }) => {
  const history = useHistory();
  const [search, setSearch] = useState("");

  const { isLoading, refetch } = useQuery(
    ["getPlaceByQuery", search],
    getPlaceByQuery,
    {
      enabled: false,
      onSuccess: (data) => {
        if (data.length === 0) return history.push("/notfound");
        history.push(`/place/${data[0].id}`);
      },
    }
  );

  const handleQuery = () => {
    refetch();
  };

  const styles = {
    searchContainer: {
      height: mdMatch ? "60vh" : "40vh",
      backgroundImage: `url(${travellers})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
    },
  };

  return (
    <Grid container>
      <Grid item container>
        <Grid container spacing={2}>
          <Grid
            item
            container
            xs={12}
            sm={7}
            direction="column"
            justify="center"
          >
            <Grid item>
              <Box mb={2}>
                <Typography align="center" variant={smMatch ? "h5" : "body1"}>
                  Find your next Destination
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <TextField
                value={search}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleQuery();
                  }
                }}
                onChange={({ target }) => setSearch(target.value)}
                id="header-search"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {isLoading ? <CircularProgress /> : <SearchIcon />}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Hidden xsDown>
            <Grid item xs={6} sm={5}>
              <Box style={styles.searchContainer}></Box>
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HeaderSearch;
