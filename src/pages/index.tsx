import React, { useEffect, useState } from "react";
import MainLayout from "@layouts/MainLayout";
import VideoList from "@components/Video/VideoList";
import Head from "next/head";
import fetch from "isomorphic-fetch";

function Index({ source }) {
  return (
    <MainLayout>
      <Head>
        <title>Live Stream Event | Tribe</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      {source &&
        source.length &&
        source.map((s, i) => (
          <VideoList playlist={s.playlist} title={s.title} key={i} />
        ))}
    </MainLayout>
  );
}

Index.getInitialProps = async () => {
  let sources = process.env.CONTENT_JWT_SOURCE.split(",");
  let results = await Promise.all(
    sources.map(source => fetch(source).then(response => response.json()))
  );
  return {
    source: results.map(result => result)
  };
};

export default Index;
