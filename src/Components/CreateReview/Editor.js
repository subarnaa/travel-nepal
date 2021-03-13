import ReactQuill from "react-quill";

import { Paper, Box } from "@material-ui/core";

import "react-quill/dist/quill.snow.css";
import "../../styles/quill.css";

function Editor({ value, setValue }) {
  return (
    <Box mt={2}>
      <Paper>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </Paper>
    </Box>
  );
}

export default Editor;
