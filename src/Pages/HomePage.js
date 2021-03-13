import { Grid } from "@material-ui/core";

import HeaderSearch from "../Components/Home/HeaderSearch";
import EditorChoice from "../Components/Home/EditorChoice";
import BestDestination from "../Components/Home/BestDestination";
import HomeCards from '../Components/Home/HomeCards';

const Home = () => {
  return (
    <Grid container direction="column" justify="center" alignItems="center" style={{"marginTop": "3rem"}}>
      <Grid item container direction="column" align="center" justify="center" xs={11}>
        <HeaderSearch />
      </Grid>
      <Grid item container direction="column" align="center" justify="center" xs={11}>
        <EditorChoice lg={8} xs={11} />
      </Grid>
      <Grid item container direction="column" xs={12} md={11} style={{"padding": "0 20px"}}>
        <HomeCards />
      </Grid>
      <Grid item container xs={11}>
        <BestDestination />
      </Grid>
    </Grid>
  );
};

export default Home;
