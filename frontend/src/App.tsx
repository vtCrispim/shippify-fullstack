import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VehicleTable from "./Components/VehicleList.tsx";
import VehicleForm from "./Components/CreateVehicle.tsx";
import React from "react";
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VehicleTable />} />
        <Route path="/vehicles/create" element={<VehicleForm />} />
      </Routes>
    </Router>
  );
}

export default App;
