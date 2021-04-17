import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingIndicator from "./Components/LoadingIndicator";
import Footer from './Components/Footer'

import ReactGA from "react-ga";
import AdminPendingGuides from "./Pages/AdminPendingGuidesPage"

const AuthRoute = lazy(() => import("./Components/Route/AuthRoute"));
const GuestRoute = lazy(() => import("./Components/Route/GuestRoute"));
const Header = lazy(() => import("./Components/NavBar/Header"));
const HomePage = lazy(() => import("./Pages/HomePage"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const SignupPage = lazy(() => import("./Pages/SignupPage"));
const ExplorePage = lazy(() => import("./Pages/ExplorePage"));
const ContributePage = lazy(() => import("./Pages/ContributePage"));
const BucketListPage = lazy(() => import("./Pages/BucketListPage"));
const ForgotPassPage = lazy(() => import("./Pages/ForgotPassPage"));
const ResetPassPage = lazy(() => import("./Pages/ResetPassPage"));
const PlaceDetailPage = lazy(() => import("./Pages/PlaceDetailPage"));
const PlaceReviewPage = lazy(() => import("./Pages/PlaceReviewPage"));
const PlaceEditPage = lazy(() => import("./Pages/PlaceEditPage"));
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage"));
const ErrorPage = lazy(() => import("./Pages/ErrorPage"));
const EmailConfirmPage = lazy(() => import("./Pages/EmailConfirmPage"));
const PasswordRecoverPage = lazy(() => import("./Pages/PasswordRecoverPage"));
const fo0foPage = lazy(() => import("./Pages/404page"));
const BeGuide = lazy(() => import("./Pages/BeGuidePage"));
const AdminUsersPage = lazy(() => import("./Pages/AdminUsersPage"));
const AdminPlacePage = lazy(() => import("./Pages/AdminPlacePage"));
const MyPlaces = lazy(() => import("./Pages/MyPlaces"));
const AdminVerifiedGuidesPage = lazy(() => import("./Pages/AdminVerifiedGuidesPage"))
const AdminPendingGuidesPage = lazy(() => import("./Pages/AdminPendingGuidesPage"));

function App() {
  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_TRACKING_ID);
  }, []);

  return (

    <Suspense fallback={<LoadingIndicator />}>
      <Router>
        <Header />
        <ToastContainer position="bottom-right" />
        <Switch>
          <GuestRoute path="/login" component={LoginPage} />
          <GuestRoute path="/signup" component={SignupPage} />
          <GuestRoute
            exact
            path="/password/request"
            component={ForgotPassPage}
          />
          <GuestRoute path="/password/recover/:id" component={ResetPassPage} />
          <AuthRoute path="/admin/users" component={AdminUsersPage} />
          <AuthRoute path="/admin/places" component={AdminPlacePage} />
          <AuthRoute path="/admin/guides/verified" component={AdminVerifiedGuidesPage} />
          <AuthRoute path="/admin/guides/pending" component={AdminPendingGuidesPage} />
          <AuthRoute path="/explore" component={ExplorePage} />
          <AuthRoute path="/contribute" component={ContributePage} />
          <AuthRoute path="/place/edit/:id" component={PlaceEditPage} />
          <AuthRoute
            exact
            path="/place/:id/:action/review"
            component={PlaceReviewPage}
          />
          <AuthRoute path="/place/:id" component={PlaceDetailPage} />
          <AuthRoute path="/bucketlist" component={BucketListPage} />
          <AuthRoute path="/beguide" component={BeGuide} />
          <AuthRoute path="/myplaces" component={MyPlaces} />
          <AuthRoute path="/notfound" component={NotFoundPage} />
          <AuthRoute path="/error" component={ErrorPage} />
          <GuestRoute path="/email/confirm" component={EmailConfirmPage} />
          <GuestRoute path="/password/sucess" component={PasswordRecoverPage} />
          <AuthRoute exact path="/" component={HomePage} />
          <AuthRoute path="*" component={fo0foPage} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </Suspense>
  );
}

export default App;
