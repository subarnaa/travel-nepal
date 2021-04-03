import { useQuery } from "react-query";
import { Box, Typography } from "@material-ui/core";

import Cards from "./CardSlider";
import LoadingIndicator from "../LoadingIndicator";

import { getBestDestinations } from "../../services/place";

const BestDestination = () => {
  const { isLoading, data, isError } = useQuery(
    "bestDestination",
    getBestDestinations
  );

  if (isLoading) return <LoadingIndicator />;
  if (isError) return null;

  return (
    <Box mb={4} style={{width:"100%"}}>
      <Box px={2}>
        {data.length > 0 && (
          <Typography variant="h5">Top Rated Destinations</Typography>
        )}
      </Box>
      <Cards editorData={data} />
    </Box>
  );
};

export default BestDestination;
