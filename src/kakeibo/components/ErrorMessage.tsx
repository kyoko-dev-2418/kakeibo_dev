const ErrorMessage = ({ item }: { item: string }) => {
  return (
    <p
      style={{ color: "red", fontWeight: "bold", margin: "8px 0px" }}
      key={item}
    >
      {item}
    </p>
  );
};

export default ErrorMessage;
