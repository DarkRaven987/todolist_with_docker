import { authAgent } from '../../utils/agent';

export default {
  state: () => ({
    user: null,
  }),
  mutations: {
    setUserData(state, data) {
      state.user = data;
    },
  },
  actions: {
    logout(context) {
      const refreshToken = localStorage.getItem('refreshToken');
      authAgent.post('/logout', { refreshToken }).then(() => {
        context.commit('setUserData', null);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.replace(`${window.location.origin}/login`);
      });
    },
    clearAllSessions(context) {
      authAgent.get('/total-logout').then(() => {
        context.commit('setUserData', null);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.replace(`${window.location.origin}/login`);
      });
    },
    logoutExceptCurrent() {
      const refreshToken = localStorage.getItem('refreshToken');
      authAgent.post('/logout-except-current', { refreshToken });
    },
    validateSession(context) {
      const refreshToken = localStorage.getItem('refreshToken');
      const accessToken = localStorage.getItem('accessToken');

      if (refreshToken && accessToken) {
        authAgent
          .post(`/validate-session`, {
            jwt: refreshToken,
          })
          .then(({ data }) => {
            if (!data?.sub) {
              context.commit('logout');
            } else {
              context.commit('setUserData', {
                id: data.sub,
                username: data.username,
              });
            }
          });
      }
    },
    setUser(context, data) {
      context.commit('setUserData', data);
    },
  },
};
