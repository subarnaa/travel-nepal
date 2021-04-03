import ReactQuill from "react-quill";

import { Paper, Box } from "@material-ui/core";

import "react-quill/dist/quill.snow.css";
import "../../styles/quill.css";

function Editor({ description, setDescription, placeholder }) {
  return (
    <Box mt={1}>
      <Paper>
        <ReactQuill placeholder={placeholder} theme="snow" value={description} onChange={setDescription} />
      </Paper>
    </Box>
  );
}

export default Editor;
