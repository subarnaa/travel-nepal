import { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  typo: {
    marginBottom: "10px",
  },
  btn: {
    height: "3.5rem",
  },
}));

const UploadButton = ({ setValues, values }) => {
  const [file, setFile] = useState(null);

  const classes = useStyles();

  const handleUpload = ({ target }) => {
    setFile(target.files[0]);
  };

  useEffect(() => {
    if (file) {
      setValues({ ...values, img: file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <>
      <Typography color="textSecondary" className={classes.typo}>
        Display Image
      </Typography>
      <input
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
        hidden
        onChange={handleUpload}
      />
      <label htmlFor="contained-button-file">
        <Button
          className={classes.btn}
          variant="outlined"
          color="primary"
          startIcon={<PhotoCamera />}
          component="span"
          fullWidth
        >
          Upload
        </Button>
      </label>
      {file && <Typography>{file.name}</Typography>}
    </>
  );
};

export default UploadButton;
