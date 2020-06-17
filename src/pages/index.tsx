import React from "react";
import MainLayout from "@layouts/MainLayout";
import Head from "next/head";

function Index() {
  return (
    <MainLayout>
      <Head>
        <title>Nextjs-starter</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
    </MainLayout>
  );
}

export default Index;
