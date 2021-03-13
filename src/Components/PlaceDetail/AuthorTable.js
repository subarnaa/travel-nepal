import {
  Avatar,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Divider,
  Hidden,
} from "@material-ui/core";
import React from "react";

const AuthorTable = ({ data, classes }) => {
  return (
    <Box mt={2}>
      <Hidden xsDown>
        <Divider style={{ marginBottom: "0.5em" }} />
        <Grid item>
          <Box>
            <Typography className={classes.typographyStyles}>
              Created By
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Display Picture</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Created At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Avatar
                        alt={data.author.displayName}
                        src={data.author.displayPicture}
                      />
                    </TableCell>
                    <TableCell>{data.author.displayName}</TableCell>
                    <TableCell>{data.createdAt}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Hidden>
    </Box>
  );
};

export default AuthorTable;
