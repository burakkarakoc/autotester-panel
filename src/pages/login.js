import LoginForm from "../components/login/loginForm";
import MyCarousel from "../components/carousel.js";
import { useEffect, useState } from "react";

const Login = () => {
  const [isScreenWidthSmall, setIsScreenWidthSmall] = useState(
    window.innerWidth < 800
  );

  useEffect(() => {
    const handleResize = () => {
      setIsScreenWidthSmall(window.innerWidth < 800);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      {isScreenWidthSmall && (
        <div className="fixed top-1/2">
          The screen width is less than 800px.
        </div>
      )}
      {/* Rest of your component */}
      <Container fluid className="p-0" style={{ height: "100vh" }}>
        <Row noGutters style={{ height: "100%" }}>
          <Col md="8" style={{ height: "5%" }}>
            <MyCarousel />
          </Col>
          <Col
            md="4"
            className="d-flex align-items-center justify-content-center"
          >
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
