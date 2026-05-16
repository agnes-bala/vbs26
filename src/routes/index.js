import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// layouts
import MainLayout from "../layouts/main";
import DashboardLayout from "../layouts/dashboard";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
// guards
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from "../config";
// components
import LoadingScreen from "../components/LoadingScreen";
import Live from "src/pages/Live";
import About from "src/pages/About";
import Media from "src/pages/media";
import SendOTPForm from "src/sections/auth/login/SendOTPForm";
// import { VerifyCodeEmail } from "src/sections/auth/verify-code";
import { VerifyCodeMobile } from "src/sections/auth/verify-code";
import VerifyCode from "src/sections/auth/verify-code/VerifyCode";
import Newsevents from "src/pages/newsevents";


// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense
      fallback={<LoadingScreen isDashboard={pathname.includes("/dashboard")} />}
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
          index: true,
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "set-password", element: <SetPassword /> },
        {path: "OTP", element: <SendOTPForm />},
        { path: "verify-otp", element: <VerifyCode /> },
        { path: "verify-mobile", element: <VerifyCodeMobile /> },
      ],
    },

    // Dashboard Routes
    {
      path: "dashboard",

      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),

      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: "register", element: <Register /> },
        { path: "coming-soon", element: <ComingSoon /> },
        { path: "myapp", element: <GeneralApp1 /> },
        { path: ":id/play-game", element: <PlayGame /> },
        { path: "download-cert", element: <Certificate /> },
        { path: ":id/Quiz-page", element: <QuizPage /> },
        { path: ":id/Puzzle-page", element: <JigsawPage /> },
        { path: ":id/games", element: <MemoryVerse /> },
        { path: ":id/vote", element: <Vote /> },

        {
          path: "user",
          children: [
            {
              element: <Navigate to="/dashboard/user/profile" replace />,
              index: true,
            },
            { path: "profile", element: <UserProfile /> },
            { path: "spouse", element: <UserProfileSpouse /> },
            { path: "child", element: <UserProfileChildren /> },
          ],
        },
      ],
    },

    // Main Routes
    {
      path: "*",
      element: <LogoOnlyLayout />,
      children: [
        // { path: 'contact', element: <Contact /> },
        { path: "maintenance", element: <Maintenance /> },
        { path: "500", element: <Page500 /> },
        { path: "404", element: <Page404 /> },
        { path: "403", element: <Page403 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { element: <Home />, index: true },
        { path: "contact", element: <Contact /> },
        { path: "live", element: <Live /> },
        { path: "about", element: <About /> },
        {path: "media", element: <Media />},
        {path: "newsandevents", element: <Newsevents />},
        
        
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import("../pages/auth/Login")));
const Register = Loadable(lazy(() => import("../pages/auth/Register")));
// const VerifyCodeEmail = Loadable(
//   lazy(() => import("../pages/auth/VerifyCodeEmail"))
// );
// const VerifyCodeMobile = Loadable(
//   lazy(() => import("../pages/auth/VerifyCodeMobile"))
// );
const ForgotPassword = Loadable(
  lazy(() => import("../pages/auth/ForgotPassword"))
);
const SetPassword = Loadable(lazy(() => import("../pages/auth/SetPassword")));

// GENERAL
const PlayGame = Loadable(lazy(() => import("../pages/dashboard/Game")));
const QuizPage = Loadable(lazy(() => import("../pages/dashboard/QuizPage")));
const JigsawPage = Loadable(
  lazy(() => import("../pages/dashboard/JigsawPage"))
);
const Certificate = Loadable(
  lazy(() => import("../pages/dashboard/Certificate"))
);
const GeneralApp1 = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp1"))
);
const MemoryVerse = Loadable(lazy(() => import("../pages/dashboard/Memory")));
const Vote = Loadable(lazy(() => import("../pages/dashboard/Vote")));
// USER
const UserProfile = Loadable(
  lazy(() => import("../pages/dashboard/UserProfile"))
);
const UserProfileSpouse = Loadable(
  lazy(() => import("../pages/dashboard/UserProfileSpouse"))
);
const UserProfileChildren = Loadable(
  lazy(() => import("../pages/dashboard/UserProfileChildren"))
);

// MAIN

const Home = Loadable(lazy(() => import("../pages/Home")));
const Contact = Loadable(lazy(() => import("../pages/Contact")));
const ComingSoon = Loadable(lazy(() => import("../pages/ComingSoon")));
const Maintenance = Loadable(lazy(() => import("../pages/Maintenance")));

const Page500 = Loadable(lazy(() => import("../pages/Page500")));
const Page403 = Loadable(lazy(() => import("../pages/Page403")));
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
