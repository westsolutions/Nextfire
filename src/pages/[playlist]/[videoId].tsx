import React, { useEffect, useState } from "react";
import MainLayout from "@layouts/MainLayout";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import VideoList from "@components/Video/VideoList";

import { useRouter } from "next/router";

function VideoPage({ source }) {
  const router = useRouter();
  const { playlist, videoId } = router.query;

  return (
    <MainLayout>
      <Head>
        <title>Live Stream Event | Tribe</title>
      </Head>
      <div className="container"></div>
      <VideoList
        playlist={source.playlist}
        title="Up Next"
        excludedId={videoId}
      />
    </MainLayout>
  );
}

VideoPage.getInitialProps = async ({
  req,
  res,
  match,
  history,
  location,
  ...ctx
}) => {
  let results = await axios.get(process.env.CONTENT_JWT_SOURCE);
  return {
    source: results.data
  };
};

export default VideoPage;
