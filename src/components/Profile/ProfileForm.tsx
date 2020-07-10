import React, { useState, useCallback, useEffect } from 'react';
import { useAuth, useStorage, useUser } from 'reactfire';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropzone } from 'react-dropzone';
import * as firebase from 'firebase';

const ProfileSchema = Yup.object().shape({
  displayName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('This field is required'),
  email: Yup.string().email('Invalid email').required('This field is required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .required('This field is required'),
});

interface User {
  email: string;
  password: string;
  displayName?: string;
  photoURL?: string;
}

const ProfileForm: React.FC<unknown> = () => {
  const [isError, setError] = useState<string | null>(null);
  const [isSuccess, setSuccess] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [picture, setPicture] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const auth = useAuth();
  const storage = useStorage();
  const [user, setCurrentUser] = useState(firebase.auth().currentUser);
  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      const blob = new Blob([reader.result], { type: 'image/jpeg' });
      setPicture(blob);
    };
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const updatePhoto = (file: File) => {
    const storageRef = storage.ref().child('profilePictures/' + user.uid);
    const task = storageRef.put(file);
    task.on(
      'state_changed',
      (snapshot: {
        bytesTransferred: number;
        totalBytes: number;
        state: string;
      }) => {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        setError(error.message);
      },
      () => {
        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setDownloadUrl(downloadURL);
        });
      },
    );
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (currentUser: firebase.User) => {
        if (currentUser) {
          setCurrentUser(currentUser);
        }
      },
    );
    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    if (picture) {
      updatePhoto(picture);
    }
  }, [picture]);

  const updateProfile = ({ email, password, displayName }: User) => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    auth.currentUser
      .updateEmail(email)
      .then(() =>
        auth.currentUser
          .updatePassword(password)
          .then(() => {
            auth.currentUser.updateProfile({
              displayName,
              ...(!!downloadUrl && { photoURL: downloadUrl }),
            });
            setSuccess('Your account data updated');
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            setError(err?.message ? err?.message : 'Something went wrong');
            console.log(err?.message);
          }),
      )
      .catch((err) => {
        setLoading(false);
        setError(err?.message ? err?.message : 'Something went wrong');
        console.log(err?.message);
      });
  };

  return (
    <div className="profile">
      <div className="container">
        <div className="row justify-content-center p-4 mb-2">
          <h1>My Profile</h1>
        </div>
        <div className="row">
          {!!user && !user?.photoURL && (
            <div className="col -12 col-md-4">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="dropzone">
                  {"Drag'n drop some files here, or click to select files"}
                  <div>
                    <FontAwesomeIcon icon={faUpload} />
                  </div>
                </div>
              </div>
            </div>
          )}
          {!!user && !!user?.photoURL && (
            <img
              className="rounded-circle"
              src={`user.photoURL`}
              alt={auth?.currentUser?.displayName}
            />
          )}
          <div className="col-12 col-md-8">
            <div className="profile__container">
              <Formik
                initialValues={{
                  displayName: '',
                  email: '',
                  password: '',
                  ...user,
                }}
                validationSchema={ProfileSchema}
                onSubmit={(values) => {
                  updateProfile(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form className="form">
                    <div className="form-group row">
                      <label
                        htmlFor="displayName"
                        className="col-sm-2 col-form-label"
                      >
                        Full name
                      </label>
                      <div className="col-sm-10">
                        <Field
                          name="displayName"
                          placeholder="Full name"
                          className={classnames([
                            'form-control',
                            {
                              'is-invalid':
                                errors.displayName && touched.displayName,
                            },
                          ])}
                        />
                        {errors.displayName && touched.displayName ? (
                          <div className="invalid-feedback">
                            {errors.displayName}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="email"
                        className="col-sm-2 col-form-label"
                      >
                        Email
                      </label>
                      <div className="col-sm-10">
                        <Field
                          name="email"
                          type="email"
                          placeholder="E-mail"
                          className={classnames([
                            'form-control',
                            { 'is-invalid': errors.email && touched.email },
                          ])}
                        />
                        {errors.email && touched.email ? (
                          <div className="invalid-feedback">{errors.email}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="password"
                        className="col-sm-2 col-form-label"
                      >
                        Password
                      </label>
                      <div className="col-sm-10">
                        <Field
                          name="password"
                          type="password"
                          placeholder="Password"
                          className={classnames([
                            'form-control',
                            {
                              'is-invalid': errors.password && touched.password,
                            },
                          ])}
                        />
                        {errors.password && touched.password ? (
                          <div className="invalid-feedback">
                            {errors.password}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <button
                      className="btn btn-danger float-right"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <div
                          className="spinner-border text-light spinner-border-sm"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      )}
                      {!isLoading && <span>Update</span>}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        {isError && <div className="alert alert-danger mt-4">{isError}</div>}
        {isSuccess && (
          <div className="alert alert-success mt-4">{isSuccess}</div>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
