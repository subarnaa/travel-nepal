import NoContent from "../PlaceDetail/NoContent";
import { useHistory } from "react-router-dom";

import img from "../../statics/bucket.jpg";
const title = "Create your bucketlist";
const description =
  "Add destinations to you bucketlist and customize your travelling experience";
const btn = "Checkout Bucketlist";
const fullWidth = true;

const BucketList = () => {
  const history = useHistory();
  const btnHandler = history.push('/explore');

  return <NoContent {...{ img, title, description, btn, btnHandler, fullWidth }} />;
};

export default BucketList;
