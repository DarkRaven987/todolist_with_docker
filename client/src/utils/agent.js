import axios from 'axios';

const localStorage = window.localStorage;

const refreshAccessToken = () => {
  const requester = axios.create({
    baseURL: import.meta.env.VITE_AUTH_SERVICE_URL,
  });
  return requester.get('/auth/refresh', {
    headers: {
      Authorization: localStorage.getItem('refreshToken'),
    },
  });
};

const getAgentInstance = (props = {}) => {
  const { headers, baseURL } = props;

  const requester = axios.create({
    baseURL,
  });

  let delayPromise = null;

  requester.interceptors.request.use(async (config) => {
    if (delayPromise) {
      await delayPromise.then(() => {
        config.headers.Authorization = localStorage.getItem('accessToken');
        config.headers = { ...config.headers, ...headers };
      });
    } else {
      config.headers.Authorization = localStorage.getItem('accessToken');
      config.headers = { ...config.headers, ...headers };
    }

    return config;
  });

  requester.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      const originalRequest = error.config;
      console.error('originalRequest', originalRequest);
      console.error('error.message', error.message);

      if (
        ([401, 403].includes(+error?.response?.status) ||
          (error?.response?.status === 500 &&
            error?.response?.data.message ===
              'There was an error while authenticating token')) &&
        !error?.config?.url.includes('refresh') &&
        !originalRequest._retry
      ) {
        // TODO: change to check for status 401 when it will be handle from API
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');

        if (!delayPromise && refreshToken) {
          console.log('TOKEN ERROR: Starting roken refresh process.');
          delayPromise = refreshAccessToken()
            .then((response) => {
              const {
                data: { accessToken },
              } = response;
              localStorage.setItem('accessToken', `Bearer ${accessToken}`);

              axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            })
            .catch(() => {});
        }

        await delayPromise?.finally(() => (delayPromise = null));

        return requester(originalRequest);
      }

      if (
        [401, 403, 500].includes(error?.response?.status) &&
        originalRequest._retry
      ) {
        console.log('TOKEN ERROR: Clearing token data.');
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.replace(`${window.location.origin}/login`);
      }

      return Promise.reject(error);
    },
  );

  return requester;
};

export const apiAgent = getAgentInstance({
  baseURL: import.meta.env.VITE_API_SERVICE_URL,
});
export const authAgent = getAgentInstance({
  baseURL: import.meta.env.VITE_AUTH_SERVICE_URL,
});
