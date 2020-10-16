
import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider.js';
import { Spinner } from "../loading/Spinner.js";
import { useAxios } from '../api.js';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import useSetFormikFieldErrors from '../useSetFormikFieldErrors.js';
import FormField from '../FormField.js';

const RegisterForm = () => {

  const [state, register] = useAxios("api/auth/register", { method: 'post'});
  const { saveToken } = useContext(AuthContext);
  const {error = {}, isLoading} = state;

  const formikRef = useSetFormikFieldErrors(error.errors);

  function handleSubmit(values) {
    register({ data: values})
      .then((response) => {
        const { access_token : token } = response.data;
        saveToken(token);
      }).catch(error => console.log(error));
  }

  const validate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = 'Enter your password';
    }
    if (values.password.length < 8) {
      errors.password = 'The password must be at least 8 characters long.';
    }
    if (values.password !== values.password_confirmation) {
      errors.password_confirmation = 'The password confirmation does not match.';
    }
    return errors;
  };

  return (
    <div className="card">
      <div className="card-header">
        Register
      </div>
      <div className="card-body">
      <Formik
        initialValues={{ email: '', password: '', password_confirmation: '', name: '' }}
        onSubmit={handleSubmit}
        validate={validate}
        innerRef = {formikRef}
      >
         {({
        handleSubmit,
      }) => (
        <Form onSubmit={handleSubmit}>
          <FormField name ="name" label = "Name" type ="text"/>
          <FormField name ="email" label = "Email" type = "email"/>
          <FormField name ="password" label = "Password" type = "password" addValidStyle/>
          <FormField name ="password_confirmation" label = "Confirm Password" type = "password" addValidStyle/>
          <Form.Row>
            <div className="col-md-6 offset-md-4">
              <button type="submit" className="btn btn-primary">
                {isLoading ? <Spinner /> : "Register"}
              </button>
            </div>
          </Form.Row>
        </Form>)}
      </Formik>
      </div>
    </div>
  );
}

export default RegisterForm;