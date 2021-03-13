import { useQuery } from "react-query";

import { Box, Typography } from "@material-ui/core";

import Cards from "./CardSlider";
import LoadingIndicator from "../LoadingIndicator";

import { getEditorChoice } from "../../services/place";

const EditorChoice = () => {
  const { isLoading, data, isError } = useQuery(
    "editorChoice",
    getEditorChoice
  );

  if (isLoading) return <LoadingIndicator />;

  if (isError) return null;

  return (
    <Box mb={4}>
      <Box px={2}>
        {data.length > 0 && <Typography variant="h5">Editor's Pick</Typography>}
      </Box>
      <Cards editorData={data} />
    </Box>
  );
};

export default EditorChoice;
