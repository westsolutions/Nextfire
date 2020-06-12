import React, { useEffect, useState } from "react";
import MainLayout from "@layouts/MainLayout";
import VideoList from "@components/Video/VideoList";
import Head from "next/head";
import fetch from "isomorphic-fetch";

function Index({ source }) {
  return (
    <MainLayout>
      {props => (
        <>
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
              <VideoList
                playlist={s.playlist}
                title={s.title}
                key={i}
                openAuthModal={props.openAuthModal}
              />
            ))}
        </>
      )}
    </MainLayout>
  );
}

Index.getInitialProps = async () => {
  let sources = process.env.CONTENT_JWT_SOURCE.split(",");
  let results = await Promise.allSettled(
    sources.map(source =>
      fetch(source).then(response => (response.ok ? response.json() : null))
    )
  );
  return {
    source:
      results && results.length
        ? results
            .filter(result => !!result["value"])
            .map(result => result["value"])
        : []
  };
};

export default Index;
