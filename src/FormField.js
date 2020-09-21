import React from 'react';
import {Field} from 'formik';
import { Col, Row, Form } from 'react-bootstrap';

export default function FormTextField(props) {

  const {name, label, addValidStyle, ...controlProps} = props;

  return (
    <Field name={name}>
     {({field, meta}) => (
      <Form.Group  as={Row} >
      <Form.Label for="name" column sm={4}>
        {label}
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          {...field}
          {...controlProps}
          isValid={addValidStyle && meta.touched && !meta.error}
          isInvalid={meta.touched && meta.error}
          />
          <Form.Control.Feedback type="invalid">
            {meta.error}
          </Form.Control.Feedback>
        </Col>
         
      </Form.Group>
     )
    }
    </Field>
  )
}
