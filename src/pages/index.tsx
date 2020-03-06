import React from "react";
import MainLayout from "@layouts/MainLayout";
import Head from "next/head";
import YouTube from "@components/YoutubeIframe";

const Index: React.FC<{}> = () => {
  return (
    <MainLayout>
      <Head>
        <title>Welcome</title>
      </Head>
      <div className="s-video">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-8">
              <div className="c-video">
                <div className="c-video__content">
                  <YouTube youtubeId={"NvqKZHpKs-g"} />
                  <div className="d-flex justify-content-between align-items-center">
                    <h1>Video title</h1>
                    <div className="c-live">WE'RE LIVE</div>
                  </div>

                  <p>
                    asdfasdfasdfasdfasdfasdfasdfasdfasdf
                    asdfasdfasdfasdfasdfasdfasdfasdfasdf
                    asdfasdfasdfasdfasdfasdfasdfasdfasdf
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-4"></div>
          </div>
        </div>
      </div>
      <div className="s-card">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-4">
              <div className="c-card"></div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="c-card"></div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="c-card"></div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
