import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import ResidentsPage from "./pages/ResidentsPage";
import HouseholdsPage from "./pages/HouseholdsPage";
//import AnnouncementsPage from "./pages/AnnouncementsPage";
import AnnouncementAd from "./pages/AnnouncementAd"
import ResidentRegistration from "./pages/ResidentRegistration";
import ViewResident from "./pages/ViewResident";
import EditResident from "./pages/EditResident";
import HouseholdForm from "./pages/HouseholdForm";
import HouseholdMemberForm from "./pages/HouseholdMemberForm";
import HouseholdDetails from "./pages/HouseholdDetails";
import ResidentDashboard from "./Resident_Page/ResidentDashboard";
import AnnouncementList from "./Resident_Page/AnnouncementList";
import ResidentHeader from "./Resident_Page/ResidentHeader";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/residents" element={<ResidentsPage />} />
        <Route path="/add_resident" element={<ResidentRegistration />} />
        <Route path="/view/:r_id" element={<ViewResident />} />
        <Route path="/edit/:r_id" element={<EditResident />} />
        <Route path="/households" element={<HouseholdsPage />} />
        <Route path="/add_household" element={<HouseholdForm />} />
        <Route path="/add_member" element={<HouseholdMemberForm />} />
        <Route path="/residentdashboard" element={<ResidentDashboard/>} />
        <Route path="/announcementlist" element={<AnnouncementList/>} />
        <Route path="/announcementad" element={<AnnouncementAd/>} />
        <Route path="/residentheader" element={<ResidentHeader/>} />
        <Route
          path="/household_details/:household_id"
          element={<HouseholdDetails />}
        />
        <Route path="/announcementad" element={<AnnouncementAd />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
