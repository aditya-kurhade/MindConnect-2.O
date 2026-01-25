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
import ReportAI from "./pages/ReportAI";
import AiChatbot from "./pages/AiChatbot";


function App() {
  return (

        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/forum/ask" element={<AskQuestion />} />
            <Route
              path="/forum/question/:id"
              element={<QuestionDetail />}
            />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:id" element={<ResourceDetail />} />
            <Route
              path="/client-dashboard"
              element={<ClientDashboard />}
            />
            <Route
              path="/counsellor-dashboard"
              element={<CounsellorDashboard />}
            />
          
            <Route path="/ai-report" element={<ReportAI />} />
            <Route path="/ai-chatbot" element={<AiChatbot />} />
        
              
          </Routes>
        </Router>

  );
}
export default App;
