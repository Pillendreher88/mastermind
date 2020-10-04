import axios from 'axios';
import { useEffect, useRef, useReducer } from 'react';
import { loadState } from './localStorage';


const api = axios.create({
  baseURL: `https://mongro.de`,
});

const errorHandlers = {};

export const addErrorHandler = (status, func) => {
  errorHandlers[status] = func;
}

api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log(errorHandlers);
  if (error.response) {
    if (errorHandlers[error.response.status]) {
      errorHandlers[error.response.status](error);
    }
  }

  else if (error.request && errorHandlers["network"]) {
    errorHandlers["network"](error);
  }

  return Promise.reject(error);
});

api.interceptors.request.use(
  config => {
    const token = loadState('jwt');
    config.headers['Authorization'] = token ? `Bearer ${token}` : '';
    config.headers['Content-Type'] = 'application/json';
    return config;
  }
);

const fetchReducer = (state, action) => {
  switch (action.type) {
    case "RESET_STATE":
      return { isLoading: false };
    case "FETCH_START":
      return { ...state, isLoading: true, error: undefined };
    case "FETCH_SUCCESS":
      return { ...state, isLoading: false, data: action.payload, error: undefined };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

const noop = () => { };

const useApiState = (initialState) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState ? initialState : { isLoading: false, initial: true });

  return [state, dispatch];
}

const useIsMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    }
  }, [])

  return isMounted;
}

export const useAxios = (url, configAxios, options = {}) => {
  const { onSuccess = noop, onFailure = noop, initialState } = options;
  const [state, dispatch] = useApiState(initialState);

  const source = axios.CancelToken.source();

  const resetState = () => {
    dispatch({ type: "RESET_STATE" })
  }

  useEffect(() => {
    return () => {
      source.cancel("Component got unmounted. Request canceled");
    };
  }, [])

  const callApi = (async (config) => {

    dispatch({ type: "FETCH_START" });

    try {
      const response = await api(url, { ...configAxios, ...config, cancelToken: source.token });
      dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      onSuccess(response);

      return response;

    } catch (error) {

      if (error.response) {
        console.log(error.response.data);
        dispatch({ type: "FETCH_ERROR", payload: error.response.data });
        onFailure(error);
      }
      else if (error.request) {
        console.log(error.request);
        dispatch({ type: "FETCH_ERROR", payload: "Network Error" });
        onFailure(error);
      } else {
        console.log('Error', error.message);
      }
      return Promise.reject(error);
    }

  });

  return [state, callApi, resetState, dispatch];
}

export const useApi = (url, configAxios, options = {}) => {

  const { shouldFetch = true, onSuccess = noop, onFailure = noop, initialState } = options;
  const [state, dispatch] = useApiState(initialState);
  const isMounted = useIsMounted();

  const resetState = () => {
    dispatch({ type: "RESET_STATE" })
  }

  const source = axios.CancelToken.source();

  useEffect(() => {
    return () => {
      source.cancel("Component got unmounted. Request canceled");
    };
  }, [])

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {

    if (!shouldFetch || !isMounted.current) return;
    const fetchData = async () => {

      if (isMounted) {
        dispatch({ type: "FETCH_START" });
      }

      try {
        const response = await api(url, { ...configAxios, cancelToken: source.token });

        if (isMounted.current) {
          dispatch({ type: "FETCH_SUCCESS", payload: response.data });
          onSuccess(response);
        }
      } catch (error) {
        if (isMounted.current) {
          if (error.response) {
            console.log(error.response.data);
            dispatch({ type: "FETCH_ERROR", payload: error.response.data });
            onFailure(error);
          }
          else if (error.request) {
            console.log(error.request);
            dispatch({ type: "FETCH_ERROR", payload: "Network Error" });
          } else {
            console.log('Error', error.message);
          }
        }
      }
    };
    fetchData();
  }, [url, shouldFetch]);

  return [state, resetState];
}

