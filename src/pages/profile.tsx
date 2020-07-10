import React from 'react';
import Head from 'next/head';
import MainLayout from '@layouts/MainLayout';
import ProfileForm from '@components/Profile/ProfileForm';

const Profile: React.FC<unknown> = () => (
  <MainLayout>
    <>
      <Head>Profile</Head>
      <ProfileForm />
    </>
  </MainLayout>
);

export default Profile;
