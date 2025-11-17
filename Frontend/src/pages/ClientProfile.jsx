import React from "react";
import { useParams } from "react-router-dom";

const ClientProfile = ({ clients }) => {
  const { id } = useParams();
  const client = clients.find((c) => c.id === id);

  if (!client) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-red-600">Client not found</h2>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white shadow-lg rounded-xl max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-blue-600">Client Profile</h1>

      <div className="space-y-2">
        <p><strong>Name:</strong> {client.name}</p>
        <p><strong>Email:</strong> {client.email}</p>
        <p><strong>Phone:</strong> {client.phone}</p>
        <p><strong>Issue:</strong> {client.issue}</p>
        <p><strong>Status:</strong> {client.status}</p>
        <p><strong>Last Session:</strong> {client.last}</p>
      </div>

      <div className="mt-4 p-4 border rounded-lg bg-gray-50">
        <h2 className="font-semibold text-lg mb-2">Reports & Sessions</h2>
        <p className="text-gray-500 text-sm">Reports and session history will appear here.</p>
      </div>
    </div>
  );
};

export default ClientProfile;
