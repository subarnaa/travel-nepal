import { Button } from "@material-ui/core";
import { useMutation, queryCache } from "react-query";
import { toast } from "react-toastify";

import {
  addPlaceToBucketList,
  removePlaceFromBucketList,
} from "../../services/bucketlist";

const BucketListBtn = ({ inBucketList, placeId }) => {
  const [mutateAddToBucket] = useMutation(addPlaceToBucketList, {
    onSuccess: () => {
      queryCache.refetchQueries("placeDetail");
      toast.success("place added to bucketlist");
    },
    onError: (error) => {
      const errMessage =
        error.response && error.response.data.error
          ? error.response.data.error.message
          : error.message;

      toast.error(errMessage);
    },
  });

  const [mutateRemoveFromBucket] = useMutation(removePlaceFromBucketList, {
    onSuccess: () => {
      queryCache.refetchQueries("placeDetail");
      toast.warn("Removed from Bucketlist");
    },
    onError: (error) => {
      const errMessage =
        error.response && error.response.data.error
          ? error.response.data.error.message
          : error.message;

      toast.error(errMessage);
    },
  });

  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={() => inBucketList ? mutateRemoveFromBucket(placeId) : mutateAddToBucket(placeId)}
    >
      {inBucketList ? 'Remove from Bucketlist' : 'Add to Bucketlist'}
    </Button>
  )

};

export default BucketListBtn;
