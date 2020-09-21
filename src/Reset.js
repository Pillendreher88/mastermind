import React, { useState } from 'react';
import { Spinner } from "./loading/Spinner.js";
import axios from "axios";

export const Reset = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [message, setMessage] = useState();

  function handleOnChange(event) {
    const value = event.target.value;
    setEmail(value);
  }
  function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();
    axios
      .post("/password/email", { email: email })
      .then((response) => {
        setLoading(false);
        setMessage(response.data.message);
        setError();
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.data.error) {
          setError(error.response.data.error);
        }
        else {
          console.log(error);
        }
      });
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
                <strong> {error} </strong>
              </span>}
            </div>
          </div>
          <div className="form-group row justify-content-center">
            <button type="submit" className="btn btn-primary">
              {loading ? <Spinner /> : "Send Password Reset Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}