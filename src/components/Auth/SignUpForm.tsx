import React from 'react';
import { useAuth } from 'reactfire';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';


const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('This field is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('This field is required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .required('This field is required'),
  passwordConfirmation: Yup.string()
    .required('This field is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const SignUpForm: React.FC<{}> = () => {

  const auth = useAuth();

  const signIn = () => {
    // let x = auth.createUserWithEmailAndPassword('t.kumpanenko@gmail.com', 'password');
    console.log('1');
  };



  return (
    <>
      <h1>Create Your Free account</h1>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <div className="form-group">
              <Field 
                name="fullName" 
                placeholder="Full name"
                className={classnames(['form-control',{'is-invalid': errors.fullName && touched.fullName} ])} />
              {errors.fullName && touched.fullName ? (
                <div className="invalid-feedback">{errors.fullName}</div>
              ) : null}
            </div>
            <div className="form-group">
              <Field 
                name="email" 
                type="email" 
                placeholder="E-mail"
                className={classnames(['form-control',{'is-invalid': errors.email && touched.email} ])}
                />
              {errors.email && touched.email ? <div className="invalid-feedback">{errors.email}</div> : null}
            </div>
            <div className="form-group">
              <Field 
                name="password" 
                type="password" 
                placeholder="Password"
                className={classnames(['form-control',{'is-invalid': errors.password && touched.password} ])}
                />
              {errors.password && touched.password ? <div className="invalid-feedback">{errors.password}</div> : null}
            </div>
            <div className="form-group">
              <Field 
                name="passwordConfirmation" 
                type="password" 
                placeholder="Password confirmation"
                className={classnames(['form-control',{'is-invalid': errors.passwordConfirmation && touched.passwordConfirmation} ])}
                />
              {errors.passwordConfirmation && touched.passwordConfirmation ? <div className="invalid-feedback">{errors.passwordConfirmation}</div> : null}
            </div>
            <button className="btn btn-primary btn-block" type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default SignUpForm;
