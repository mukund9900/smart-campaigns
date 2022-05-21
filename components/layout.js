import React from "react";
import Header from "./header";
import { Container } from "semantic-ui-react";
import Head from "next/head";

const Layout = (props) => {
  return (
    <Container>
      <body
        style={{
          backgroundImage: "url('/assets/main.svg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          opacity: "85%",
        }}
      ></body>
      <Head>
        <link
          async
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />
      </Head>
      <Header />
      <br></br>
      {props.children}
    </Container>
  );
};
export default Layout;
