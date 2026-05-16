// ----------------------------------------------------------------------



function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

export const PATH_AUTH = {

  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  verifyEmail: path(ROOTS_AUTH, "/verify-email"),
  verifyMobile: path(ROOTS_AUTH, "/verify-mobile"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
  newPassword: path(ROOTS_AUTH, "/set-password"),
  eForgotPassword: path(ROOTS_AUTH, "/forgot-password"),
  mForgotPassword: path(ROOTS_AUTH, "/m.forgot-password"),

};

export const PATH_PAGE = {

  home: "/",
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  about: "/about-us",
  live: "/live",
  newsandevents: "/newsandevents",
  contact: "/contact-us",
  page403: "/403",
  page404: "/404",
  page500: "/500",
  components: "/components",
  myapp: path(ROOTS_DASHBOARD, "/myapp"),



};

export const PATH_DASHBOARD = {

  root: ROOTS_DASHBOARD,
  comingSoon: path(ROOTS_DASHBOARD, "/coming-soon"),
  Live: path(ROOTS_DASHBOARD, "/live"),
  general: {
    app: path(ROOTS_DASHBOARD, "/app"),
    myapp: path(ROOTS_DASHBOARD, "/myapp"),
    quiz: path(ROOTS_DASHBOARD, "/play-game"),
    downloadCert: path(ROOTS_DASHBOARD, "/download-cert"),
    // quizpage: (id) => path(ROOTS_DASHBOARD, `/${id}/quiz-page`),
    playgame: (id) => path(ROOTS_DASHBOARD, `/${id}/play-game`),
    games: (id) => path(ROOTS_DASHBOARD, `/${id}/games`),
    routegamepath: (id, p) => path(ROOTS_DASHBOARD, `/${id}/${p}-page`),
    vote: (id) => path(ROOTS_DASHBOARD, `/${id}/vote`),
  },


  user: {
    root: path(ROOTS_DASHBOARD, "/user"),
    spouse: path(ROOTS_DASHBOARD, "/user/spouse"),
    child: path(ROOTS_DASHBOARD, "/user/child"),
    profile: path(ROOTS_DASHBOARD, "/user/profile"),
    account: path(ROOTS_DASHBOARD, "/user/account"),
  },

};
