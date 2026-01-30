import Container from "../Components/Container";

const NotFound = () => {
  return (
    <Container
      title={"Page not found"}
      info="Oops! The page you're looking for doesn't exist."
      link={"/"}
    />
  );
};

export default NotFound;
