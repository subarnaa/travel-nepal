import { Link } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import MaterialTable from "material-table";
import { toast } from "react-toastify";

import Rating from "@material-ui/lab/Rating";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import MLink from "@material-ui/core/Link";

import LoadingIndicator from "../Components/LoadingIndicator";
import { tableIcons } from "../Components/Table/TableIconsFull";

import Fo0FoPage from "./404page";

import { getAllPlace, deletePlace, updatePlace } from "../services/admin";

const AdminPlacePage = () => {
  const [mutateDeletePlaceAdmin] = useMutation(deletePlace, {
    onSuccess: () => {
      queryCache.refetchQueries("adminGetAllPlaces");
      toast.warn("place deleted");
    },
    onError: (error) => {
      const errMessage =
        error.response && error.response.data.error
          ? error.response.data.error.message
          : error.message;

      toast.error(errMessage);
    },
  });

  const [mutateUpdatePlaceAdmin] = useMutation(updatePlace, {
    onSuccess: () => {
      queryCache.refetchQueries("adminGetAllPlaces");
      toast.success("place updated");
    },
    onError: (error) => {
      const errMessage =
        error.response && error.response.data.error
          ? error.response.data.error.message
          : error.message;

      toast.error(errMessage);
    },
  });

  const { isLoading, data, error } = useQuery(
    "adminGetAllPlaces",
    getAllPlace,
    {
      retry: false,
    }
  );

  if (error) {
    return <Fo0FoPage />;
  }

  if (isLoading || !data) return <LoadingIndicator />;

  return (
    <Box mt={2}>
      <MaterialTable
        icons={tableIcons}
        title="All Destinations"
        columns={[
          {
            field: "displayPicture",
            title: "Image",
            render: (rowData) => (
              <Avatar alt={rowData.name} src={rowData.image} />
            ),
          },
          {
            title: "Name",
            field: "name",
            render: (rowData) => (
              <MLink component={Link} to={`/place/${rowData.id}`}>
                {rowData.name}
              </MLink>
            ),
          },
          {
            title: "Description",
            field: "description",
            render: (rowData) =>
              rowData.description.length > 5
                ? `${rowData.description.slice(0, 10)}...`
                : rowData.description,
          },
          {
            title: "Type",
            field: "type",
            type: "string",
            lookup: {
              landmark: "landmark",
              religious: "religious",
              shopping: "shopping",
            },
          },
          { title: "Reviews", field: "numReviews", type: "numeric" },
          {
            title: "Rating",
            field: "rating",
            type: "numeric",
            render: (rowData) => (
              <Rating
                name="place-rating"
                defaultValue={rowData.rating}
                precision={0.5}
                readOnly
              />
            ),
          },
          { title: "Editor's Choice", field: "editorChoice", type: "boolean" },
          { title: "Created At", field: "createdAt", type: "datetime" },
          { title: "Last Updated", field: "updatedAt", type: "datetime" },
        ]}
        data={data}
        options={{
          exportButton: true,
        }}
        editable={{
          onRowDelete: (oldData) => mutateDeletePlaceAdmin(oldData.id),
          onRowUpdate: (newData) => mutateUpdatePlaceAdmin(newData),
        }}
      />
    </Box>
  );
};

export default AdminPlacePage;
