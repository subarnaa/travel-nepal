import loading from "../statics/loading.gif";

const LoadingIndicator = () => {
  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={loading}
        style={{ width: "auto", height: "200px" }}
        alt="loading"
      />
    </div>
  );
};

export default LoadingIndicator;
