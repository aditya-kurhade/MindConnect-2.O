import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import ClientDashboard from "./pages/Clientdashboard";
import CounsellorDashboard from "./pages/CounsellorDashboard";
import Forum from "./pages/Forum";
import AskQuestion from "./pages/AskQuestion";
import QuestionDetail from "./pages/QuestionDetail";
import Resources from "./pages/Resources";
import ResourceDetail from "./pages/ResourceDetail";


function App() {
  return (

        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/forum" element={<Forum />} />
            <Route exact path="/forum/ask" element={<AskQuestion />} />
            <Route
              exact
              path="/forum/question/:id"
              element={<QuestionDetail />}
            />
            <Route exact path="/resources" element={<Resources />} />
            <Route exact path="/resources/:id" element={<ResourceDetail />} />
            <Route
              exact
              path="/client-dashboard"
              element={<ClientDashboard />}
            />
            <Route
              exact
              path="/counsellor-dashboard"
              element={<CounsellorDashboard />}
            />
          </Routes>
        </Router>

  );
}
export default App;
