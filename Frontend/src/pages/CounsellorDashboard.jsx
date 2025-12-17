import React, { useState, useEffect } from "react";
import { FaUsers, FaHeart, FaCalendarAlt, FaFileAlt } from "react-icons/fa";
import StatsCard from "../components/counsellorComponents/StatsCard";
import RecentClientActivity from "../components/counsellorComponents/RecentClientActivity";
import TodaySchedule from "../components/counsellorComponents/TodaySchedule";
import Appointments from "../components/counsellorComponents/Appointments";
import Analytics from "../components/counsellorComponents/Analytics";
import ClientManagement from "../components/counsellorComponents/ClientManagement";
import Modal from "../components/counsellorComponents/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarCounsellor from "../components/counsellorComponents/NavbarCounsellor";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const Navigate = useNavigate();
const [userdata, setUserdata ] = useState({
    firstName: "",
    lastName: "",
    email: "",
    licenseNumber: "",
    specialization: "",
    experience: "",
    location: "",
    bio: ""
  });

  // Tabs
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");

  // Clients and appointments
  const [clients, setClients] = useState([]);
  const [schedule, setSchedule] = useState([]);

  // Modals
  const [showClientModal, setShowClientModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);

  // Client form states
  const [clientName, setClientName] = useState("");
  const [clientIssue, setClientIssue] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientStatus, setClientStatus] = useState("active");
  const [clientLastSession, setClientLastSession] = useState("Not scheduled");

  // Appointment form states
  const [appointmentClient, setAppointmentClient] = useState("");
  const [appointmentSession, setAppointmentSession] = useState("");
  const [appointmentDuration, setAppointmentDuration] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  useEffect(() => {
    // Fetch initial data (clients and schedule) - placeholder for actual API calls
    const token = Cookies.get("token");
    if(!token) {
      console.log("No authentication token found. Please log in.");
      Navigate("/signin");
      return;
    }
    const fetchDashboard = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/counsellor-dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setUserdata({
            firstName: data.counsellor.firstName,
            lastName: data.counsellor.lastName,
            email: data.counsellor.email,
            licenseNumber: data.counsellor.licenseNumber,
            specialization: data.counsellor.specialization,
            experience: data.counsellor.experience,
            location: data.counsellor.location,
            bio: data.counsellor.bio
        });
        console.log("Dashboard data:", response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        Navigate("/signin");
      }
      
    };
    fetchDashboard();
  }, [Navigate]);

  // Stats
  const stats = [
    { title: "Total Clients", value: clients.length, icon: <FaUsers className="text-blue-600 text-2xl" /> },
    { title: "Active Clients", value: clients.filter(c => c.status === "active").length, icon: <FaHeart className="text-green-500 text-2xl" /> },
    { title: "Today's Sessions", value: schedule.length, icon: <FaCalendarAlt className="text-purple-500 text-2xl" /> },
    { title: "Pending Reviews", value: 0, icon: <FaFileAlt className="text-orange-500 text-2xl" /> },
  ];

  // Filter clients
  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // ----- CLIENT HANDLERS -----
  const handleAddClient = () => {
    if (!clientName || !clientIssue || !clientPhone || !clientEmail) return;

    const newClient = {
      name: clientName,
      issue: clientIssue,
      phone: clientPhone,
      email: clientEmail,
      status: clientStatus,
      last: clientLastSession
    };

    if (editingClient !== null) {
      const updated = [...clients];
      updated[editingClient] = newClient;
      setClients(updated);
      toast.success("Client updated successfully!");
      setEditingClient(null);
    } else {
      setClients([...clients, newClient]);
      toast.success("Client added successfully!");
    }

    // Reset form
    setClientName("");
    setClientIssue("");
    setClientPhone("");
    setClientEmail("");
    setClientStatus("active");
    setClientLastSession("Not scheduled");
    setShowClientModal(false);
  };

  const handleEditClient = (index) => {
    const c = clients[index];
    setEditingClient(index);
    setClientName(c.name);
    setClientIssue(c.issue);
    setClientPhone(c.phone);
    setClientEmail(c.email);
    setClientStatus(c.status);
    setClientLastSession(c.last);
    setShowClientModal(true);
  };

  const handleDeleteClient = (index) => {
    const deletedClient = clients[index].name;
    setClients(clients.filter((_, i) => i !== index));
    setSchedule(schedule.filter(a => a.name !== deletedClient));
    toast.info(`Client "${deletedClient}" deleted!`);
  };

  // ----- APPOINTMENT HANDLERS -----
  const handleAddAppointment = () => {
    if (!appointmentClient || !appointmentSession || !appointmentDuration || !appointmentTime) return;

    const newAppt = {
      name: appointmentClient,
      session: appointmentSession,
      duration: appointmentDuration,
      time: appointmentTime
    };

    if (editingAppointment !== null) {
      const updated = [...schedule];
      updated[editingAppointment] = newAppt;
      setSchedule(updated);
      toast.success("Appointment updated successfully!");
      setEditingAppointment(null);
    } else {
      setSchedule([...schedule, newAppt]);
      toast.success("Appointment added successfully!");
    }

    // Reset form
    setAppointmentClient("");
    setAppointmentSession("");
    setAppointmentDuration("");
    setAppointmentTime("");
    setShowAppointmentModal(false);
  };

  const handleEditAppointment = (index) => {
    const appt = schedule[index];
    setEditingAppointment(index);
    setAppointmentClient(appt.name);
    setAppointmentSession(appt.session);
    setAppointmentDuration(appt.duration);
    setAppointmentTime(appt.time);
    setShowAppointmentModal(true);
  };

  const handleDeleteAppointment = (index) => {
    const deleted = schedule[index].session + " (" + schedule[index].name + ")";
    setSchedule(schedule.filter((_, i) => i !== index));
    toast.info(`Appointment "${deleted}" deleted!`);
  };

  // Render main content
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentClientActivity
              clients={filteredClients}
              onEdit={handleEditClient}
              onDelete={handleDeleteClient}
            />
            <TodaySchedule
              schedule={schedule}
              onEdit={handleEditAppointment}
              onDelete={handleDeleteAppointment}
            />
          </div>
        );
      case "clients":
        return (
          <ClientManagement
            clients={clients}
            search={search}
            setSearch={setSearch}
            onAddClient={() => setShowClientModal(true)}
            onEditClient={handleEditClient}
            onDeleteClient={handleDeleteClient}
          />
        );
      case "appointments":
        return (
          <Appointments
            schedule={schedule}
            onAddAppointment={() => setShowAppointmentModal(true)}
            onEditAppointment={handleEditAppointment}
            onDeleteAppointment={handleDeleteAppointment}
          />
        );
      case "analytics":
        return <Analytics />;
      default:
        return null;
    }
  };

  return (
    <>
    <NavbarCounsellor userdata={userdata} />
    <div className="space-y-6 p-6 ml-35 mr-35">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </div>

      {/* Tabs */}
      <div className="flex justify-evenly text-center  mb-6 bg-gray-100 rounded-md p-1">
        {["overview", "clients", "appointments", "analytics"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-2 ${
              activeTab === tab
                ? "bg-white text-black border-gray-200 rounded-md font-semibold w-full"
                : "bg-gray-100 text-gray-500 border-none  rounded-md w-full"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Main Section */}
      {renderContent()}

      {/* ----- Client Modal ----- */}
      {showClientModal && (
        <Modal
          title={editingClient !== null ? "Edit Client" : "Add Client"}
          onClose={() => { setShowClientModal(false); setEditingClient(null); }}
        >
          <input
            type="text"
            placeholder="Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full p-2 mb-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Issue / Reason"
            value={clientIssue}
            onChange={(e) => setClientIssue(e.target.value)}
            className="w-full p-2 mb-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            className="w-full p-2 mb-2 border rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="w-full p-2 mb-2 border rounded-md"
          />
          <select
            value={clientStatus}
            onChange={(e) => setClientStatus(e.target.value)}
            className="w-full p-2 mb-2 border rounded-md"
          >
            <option value="active">Active</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
          </select>
          <input
            type="date"
            value={clientLastSession}
            onChange={(e) => setClientLastSession(e.target.value)}
            className="w-full p-2 mb-3 border rounded-md"
          />
          <button
            onClick={handleAddClient}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {editingClient !== null ? "Update Client" : "Add Client"}
          </button>
        </Modal>
      )}

      {/* ----- Appointment Modal ----- */}
      {showAppointmentModal && (
        <Modal
          title={editingAppointment !== null ? "Edit Appointment" : "Add Appointment"}
          onClose={() => { setShowAppointmentModal(false); setEditingAppointment(null); }}
        >
          <select
            value={appointmentClient}
            onChange={(e) => setAppointmentClient(e.target.value)}
            className="w-full p-2 mb-2 border rounded-md"
          >
            <option value="">Select Client</option>
            {clients.map((c, idx) => (
              <option key={idx} value={c.name}>{c.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Session Name"
            value={appointmentSession}
            onChange={(e) => setAppointmentSession(e.target.value)}
            className="w-full p-2 mb-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Duration (e.g., 60 min)"
            value={appointmentDuration}
            onChange={(e) => setAppointmentDuration(e.target.value)}
            className="w-full p-2 mb-2 border rounded-md"
          />
          <input
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            className="w-full p-2 mb-3 border rounded-md"
          />
          <button
            onClick={handleAddAppointment}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            {editingAppointment !== null ? "Update Appointment" : "Add Appointment"}
          </button>
        </Modal>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
    </>
  );
};

export default Dashboard;
