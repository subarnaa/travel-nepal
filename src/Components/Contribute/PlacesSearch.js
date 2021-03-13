import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Typography } from "@material-ui/core";

import data from "../../search.json";

const useStyles = makeStyles(() => ({
  typo: {
    marginBottom: "10px",
  },
}));

const PlacesSearch = ({ setLocation }) => {
  const classes = useStyles();

  return (
    <>
      <Typography color="textSecondary" className={classes.typo}>
        Search
      </Typography>
      <Autocomplete
        id="combo-box-demo"
        onChange={(_event, newValue) => {
          if (newValue == null) return;
          setLocation([newValue.lat, newValue.lng]);
        }}
        options={data.geonames}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Search City" variant="outlined" />
        )}
      />
    </>
  );
};

export default PlacesSearch;
