import React, { useContext, useEffect } from 'react';
import { AuthContext } from "../AuthProvider.js";
import { Spinner } from "../loading/Spinner.js";
import { Form, Alert } from 'react-bootstrap';
import FormField from '../FormField.js';
import { Formik } from 'formik';


const LoginForm = ({ onReset }) => {

  const { login, loginState, resetLogin } = useContext(AuthContext);

  useEffect(() => {
    return () => resetLogin();
  }, [])

  const { error, isLoading } = loginState;

  const validate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = 'Enter your password';
    }
    return errors;
  };

  function handleSubmit(values) {
    login(values);
  }

  return (
    <div className="card">
      <div className="card-header">Login</div>
      <div className="card-body">
       { error && 
        <Alert variant = "danger">
          {error}
        </Alert>}
        <Formik
          initialValues={{ email: '', password: '', password_confirmation: '', name: '' }}
          onSubmit={handleSubmit}
          validate={validate}
        >
          {({
            handleSubmit,
          }) => (
              < Form onSubmit={handleSubmit}>
                <FormField name="email" label="Email" type="email" />
                <FormField name="password" label="Password" type="password" />
                <Form.Row>
                  <div className="col-md-6 offset-md-4">
                    <button type="submit" className="btn btn-primary">
                      {isLoading ? <Spinner /> : "Login"}
                    </button>
                    <a className="btn btn-link clickable" tabIndex="0" onClick={onReset} >
                      Forgot Your Password?
                    </a>
                  </div>
                </Form.Row>
              </Form>)}
        </Formik>
      </div>
    </div>
  );
}

export default LoginForm;