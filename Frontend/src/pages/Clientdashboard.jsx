import React from "react";
import Navbar from "../components/Navbar";
import StatsSection from "../components/clientComponents/StatsSection";
import Appointments from "../components/clientComponents/Appointments";
import QuickActions from "../components/clientComponents/QuickActions";
import RecentActivity from "../components/clientComponents/RecentActivity";
import Counsellors from "../components/clientComponents/Counsellors";
import NavbarClient from "../components/clientComponents/NavbarClient";

import { FaCheckCircle, FaRegEdit, FaEnvelope } from "react-icons/fa";

export default function Dashboard() {
  const stats = [
    { title: "Wellness Score", value: "72%", color: "text-blue-600" },
    { title: "Sessions This Month", value: "8", sub: "+2 from last month", color: "text-blue-600" },
    { title: "Next Appointment", value: "Today, 2:00 PM" },
    { title: "Active Goals", value: "5", sub: "3 completed this week", color: "text-violet-500" },
  ];

  const appointments = [
    { img: "https://randomuser.me/api/portraits/men/45.jpg", name: "Dr. Sarah Johnson", specialty: "Anxiety & Depression", time: "Today, 2:00 PM", type: "Video Call" },
    { img: "https://randomuser.me/api/portraits/women/44.jpg", name: "Dr. Michael Chen", specialty: "Relationship Counselling", time: "Tomorrow, 10:00 AM", type: "In-Person" },
  ];

  const actions = ["Find Counsellor", "Take Assessment", "Message", "Book Session"];

  const activities = [
    { icon: <FaCheckCircle className="text-blue-500 text-lg" />, text: "Completed session with Dr. Sarah Johnson", time: "2 hours ago" },
    { icon: <FaRegEdit className="text-blue-500 text-lg" />, text: "Filled out weekly check-in questionnaire", time: "1 day ago" },
    { icon: <FaEnvelope className="text-blue-500 text-lg" />, text: "Received message from Dr. Chen", time: "2 days ago" },
  ];

  const counsellors = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Anxiety & Depression",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Relationship Counselling",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];


  return (
    <>
      <NavbarClient />
      <div className="min-h-screen  p-6 text-gray-800 lg:pl-40 lg:pr-40 lg:pt-10">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold pb-2">Welcome back, John</h1>
          <p className="text-gray-600 text-lg">Here's your mental wellness overview</p>
        </header>

        {/* Top Stats */}
        <StatsSection stats={stats} />

        <div className="flex flex-col lg:flex-row gap-6">
        {/* Middle Section */}
        <div className="flex flex-col w-2/3 gap-6 mb-8">
          <Appointments appointments={appointments} />
          <QuickActions actions={actions} />
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col w-1/3 gap-6">
          <RecentActivity activities={activities} />
          <Counsellors counsellors={counsellors} />
        </div>
        </div>
      </div>
    </>
  );
}
