import React, { useState } from 'react';
import { Spinner } from "./loading/Spinner.js";
import { useAxios } from './api.js';

export const Reset = () => {

  const [state, reset] = useAxios("https://mongro.de/api/auth/forgot", { method: 'post' });
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState();
  const { error, isLoading } = state;


  function handleOnChange(event) {
    const value = event.target.value;
    setEmail(value);
  }
  function handleSubmit(event) {
    setMessage(null);
    event.preventDefault();
    reset({ data: { email } })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch(error => console.log(error));;
  }

  return (
    <div className="card">
      <div className="card-header">Reset Password</div>

      <div className="card-body">
        {message && <div className="alert alert-success" role="alert">
          {message}
        </div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label for="email" className="col-md-4 col-form-label text-md-right">E-Mail Addresse</label>

            <div className="col-md-8">
              <input id="email" type="email" className={error ? "form-control is-invalid" : "form-control"}
                name="email" value={email}
                required autocomplete="email" autofocus
                onChange={handleOnChange}
                placeholder="Your Email" />
              {error && <span className="invalid-feedback" role="alert">
                <strong> {error.error} </strong>
              </span>}
            </div>
          </div>
          <div className="form-group row justify-content-center">
            <button type="submit" className="btn btn-primary">
              {isLoading ? <Spinner /> : "Send Password Reset Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}