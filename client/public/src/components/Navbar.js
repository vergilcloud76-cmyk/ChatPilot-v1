import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex space-x-4">
      <Link to="/">Dashboard</Link>
      <Link to="/messages">Messages</Link>
      <Link to="/settings">Settings</Link>
      <Link to="/logs">Logs</Link>
      <Link to="/ai">AI Playground</Link>
    </nav>
  );
}

