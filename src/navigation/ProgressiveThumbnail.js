import React from "react";
import { Thumbnail, Spinner, Container } from "native-base";

const styles = {
  container: {
    justifyContent: "center",
    backgroundColor: "#efefef",
    borderRadius: 35,
    width: 100,
    height: 100
  }
};

const ProgressiveThumbnail = ({ image }) => (
  <Container style={styles.container}>
    <Spinner color="grey" />
    <Thumbnail
      style={{ width: 100, height: 100, position: "absolute" }}
      source={{ uri: image }}
    />
  </Container>
);

export default ProgressiveThumbnail;
