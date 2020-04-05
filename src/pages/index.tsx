import React, { useEffect, useState } from "react";
import MainLayout from "@layouts/MainLayout";
import VideoList from "@components/Video/VideoList";
import Head from "next/head";
import { useAuth } from "reactfire";
import axios from "axios";

function Index({ source }) {
  return (
    <MainLayout>
      <Head>
        <title>Live Stream Event | Tribe</title>
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
  let results = await Promise.all(sources.map(source => axios.get(source)));
  return {
    source: results.map(result => result.data)
  };
};

export default Index;
