import React, { useEffect, useState } from "react";
import MainLayout from "@layouts/MainLayout";
import VideoList from "@components/Video/VideoList";
import Link from "next/link";
import Head from "next/head";
import { useAuth } from "reactfire";
import axios from "axios";

function Index({ source }) {
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserName] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    console.log(source);
    auth.onAuthStateChanged((currentUser: any) => {
      if (currentUser) {
        fetchUserToken(currentUser);
      }
    });
    const fetchUserToken = async currentUser => {
      await axios(
        `${process.env.BACKEND_URL}chat?user=${currentUser.uid}`
      ).then(res => {
        setUserToken(res.data);
        setUserName(currentUser.uid);
      });
    };
  }, []);

  return (
    <MainLayout>
      <Head>
        <title>Live Stream Event | Tribe</title>
      </Head>
      {source && <VideoList playlist={source.playlist} title={source.title} />}
    </MainLayout>
  );
}

Index.getInitialProps = async () => {
  let results = await axios.get(process.env.CONTENT_JWT_SOURCE);
  return {
    source: results.data
  };
};

export default Index;
