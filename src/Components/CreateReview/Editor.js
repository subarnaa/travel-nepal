import ReactQuill from "react-quill";

import { Paper, Box } from "@material-ui/core";

import "react-quill/dist/quill.snow.css";
import "../../styles/quill.css";

function Editor({ description, setDescription }) {
  return (
    <Box mt={2}>
      <Paper>
        <ReactQuill theme="snow" value={description} onChange={setDescription} />
      </Paper>
    </Box>
  );
}

export default Editor;
