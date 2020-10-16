import React, { useContext, useState } from 'react'
import ImageUpload from './ImageUpload'
import { Formik } from 'formik'
import { Form, Card, Button} from 'react-bootstrap'
import Collapse from 'react-bootstrap/Collapse'
import FormField from '../FormField'
import { Spinner } from '../loading/Spinner'
import  MyStats  from './MyStats'
import { useAxios } from '../api'
import useSetFormikFieldErrors from '../useSetFormikFieldErrors'
import { AuthContext } from '../AuthProvider'

export default function ProfilePage() {

  const { updateUser, user } = useContext(AuthContext);
  const [state, updateProfile] = useAxios("api/myaccount/update-profile", { method: 'post' });
  const [inputOpen, setInputOpen] = useState(false);

  const { error = {}, isLoading } = state;

  const formikRef = useSetFormikFieldErrors(error.errors);

  function handleSubmit(values) {
    updateProfile({ data: values })
      .then((response) => {
        updateUser({ name: values.name });
      }).catch(error => console.log(error));
  }

  return (
    <div>
      <Card className="mb-3">
        <Card.Header as="h5">Your profile picture</Card.Header>
        <Card.Body>
          <ImageUpload />
        </Card.Body>
      </Card>
        <Card className="mb-3">
          <Card.Header as="h5">Name</Card.Header>
          <Card.Body>
            <Card.Title>
              {user.name}
              <Button  variant ="link" onClick={() => setInputOpen(!inputOpen)} >
                Edit
              </Button>
            </Card.Title>
            <Collapse in={inputOpen}>
              <div>
              <Formik
                initialValues={{ name: user.name }}
                onSubmit={handleSubmit}
                innerRef={formikRef}
              >
                {({
                  handleSubmit,
                }) =>
                  (<Form onSubmit={handleSubmit}>
                    <FormField name="name" label="Your new name" type="text" />
                    <div className="d-flex justify-content-between">
                      <Button variant="danger" onClick={() => setInputOpen(false)}>
                        Close
                      </Button>
                      <Button type="submit" variant="primary">
                        {isLoading ? <Spinner /> : "Change"}
                      </Button>
                    </div>
                  </Form>)}
              </Formik>
              </div>
            </Collapse>
          </Card.Body>
        </Card>
      <MyStats/>              
    </div>
  )
}
