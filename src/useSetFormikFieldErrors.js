import  { useEffect, useRef } from 'react';

export default function useSetFormikFieldErrors(errors) {

  const formikRef = useRef(null);

  useEffect(
    () => {

      if (errors != null) {
        formikRef.current.setErrors(errors);
      }
    },
    [errors]
  );

  return formikRef;
}


