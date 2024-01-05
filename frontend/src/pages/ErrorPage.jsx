import Lottie from "lottie-react";
import animationData from "../assets/errorPage.json";
const ErrorPage = () => {
  return (
    <div style={styles.container}>
      <Lottie animationData={animationData} className={styles} />
      <h1 style={styles.text}>Oops! Something went wrong.</h1>
      <p style={styles.text}>
        We apologize for the inconvenience. Please try again later.
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  image: {
    width: "300px", // Adjust the width as needed
    marginBottom: "20px",
  },
  text: {
    textAlign: "center",
    fontSize: "1.2rem",
  },
};

export default ErrorPage;
