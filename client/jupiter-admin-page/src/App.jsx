import { Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Teachers from "./pages/teachers";
import Students from "./pages/students";
import Courses from "./pages/courses";
import Events from "./pages/events";
import Gallery from "./pages/gallery";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route path="/students" element={<Students />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/events" element={<Events />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  );
}

export default App;