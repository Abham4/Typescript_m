import { Container, Typography } from "@mui/material";
import React from "react";

const _404 = () => {
  return (
    <Container className="bg-yellow-100 mt-10 mb-20 py-20 rounded-lg drop-shadow-lg min-h-screen">
      <div className="text-blue-300 justify-center">
        <Typography align="center" variant="h2" className="">
          Ooops...
        </Typography>
        <Typography
          align="center"
          variant="h2"
          className=""
          style={{ justifyContent: "center" }}
        >
          <img
            className="mx-auto w-1/2 h-1/2 align-center opacity-60"
            src={require("../res/404.png")}
          />
        </Typography>
        <Typography align="center" variant="h3">
          Page Not Found
        </Typography>
      </div>
    </Container>
  );
};

export default _404;
