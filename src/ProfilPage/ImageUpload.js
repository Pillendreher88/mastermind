import LoadingWrapper from "../loading/loadingWrapper";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Image, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../AuthProvider";
import { useAxios } from "../api";
import AvatarIcon from "../icons/Avatar";

export default function ImageUpload({
  maxFileSize = 1242880,
  accept = "image/*"
}) {

  const [file, setFile] = useState();
  const inputEl = useRef(null);

  const { user, updateUser } = useContext(AuthContext);
  const [state, uploadImage,, dispatch] = useAxios("/api/myaccount/image-upload", { method: "post"});
  const { isLoading, error } = state;

  useEffect(() => {

    if (file != null) {
      const formData = new FormData();
      formData.append("image", file, file.name);
      uploadImage({ data: formData }).then(
        response => updateUser({ avatar: response.data.imageUrl })
      );
      setFile(null);
    }
  }, [file])

  const fileSelectHandler = (event) => {

    const fileToUpload = event.target.files[0];

    if (validateFile(fileToUpload)) {
      setFile(fileToUpload);
    }
  };

  const validateFile = (file) => {

    let errors = [];
    if (file.size > maxFileSize) {
      errors.push("The filesize is too large. max=" + maxFileSize);
    }
    if (file.type.indexOf("image") === -1) {
      errors.push("The file needs to be an image.");
    }

    if (errors.length > 0) {
      dispatch({type: "FETCH_ERROR", payload: {message: errors}});
      return false;
    }
    return true;
  }

  const fileUploadHandler = () => {
    inputEl.current.click();
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <input
        type="file"
        onChange={fileSelectHandler}
        className="d-none"
        ref={inputEl}
        accept={accept} />
      <div onClick={fileUploadHandler} className="image-input-container">
        <LoadingWrapper loading={isLoading}>
          {user.avatar ?
            <Image
              fluid
              alt=""
              src={'https://mongro.de/assets/images/avatars/300_300/' + user.avatar}

              roundedCircle /> :
            <AvatarIcon style={{ width: "100%", height: "100%" }} />}
        </LoadingWrapper>
      </div>
      <Button
        variant="primary"
        onClick={fileUploadHandler}
        className="my-2"
      >
        Upload
      </Button>
      {error &&
        <Alert variant='danger'>
          {error.message}
        </Alert>}
    </div>
  )
}