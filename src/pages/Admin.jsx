// =====================================================
// PANELI I ADMINIT (/admin)
// Lart: statistikat. Poshtë: 4 tabs, secili është komponent më vete
// te dosja components/admin/
// =====================================================
import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../api/axios";
import PendingProducts from "../components/admin/PendingProducts";
import UsersList from "../components/admin/UsersList";
import CategoriesManager from "../components/admin/CategoriesManager";
import ReportsList from "../components/admin/ReportsList";
import "../styles/Admin.css";

const TABS = [
  { key: "pending", label: "⏳ Në pritje" },
  { key: "users", label: "👥 Përdoruesit" },
  { key: "categories", label: "🗂️ Kategoritë" },
  { key: "reports", label: "🚩 Raportimet" },
];

function Admin() {
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
  const [error, setError] = useState("");

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const response = await api.get("/admin/stats");
      setStats(response.data.data);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  return (
    <div className="container admin-page">
      <h1 className="section-title">⚙️ Paneli i adminit</h1>
      {error && <div className="alert alert-error">{error}</div>}

      {/* STATISTIKAT */}
      {stats && (
        <div className="stats-grid">
          <div className="card stat">
            <span>{stats.users}</span>
            <p>Përdorues</p>
          </div>
          <div className="card stat">
            <span>{stats.activeProducts}</span>
            <p>Produkte aktive</p>
          </div>
          <div className="card stat stat-warning">
            <span>{stats.pendingProducts}</span>
            <p>Në pritje</p>
          </div>
          <div className="card stat stat-danger">
            <span>{stats.openReports}</span>
            <p>Raportime të hapura</p>
          </div>
        </div>
      )}

      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? "tab active" : "tab"}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Shfaqim vetëm tab-in aktiv. onChange rifreskon statistikat pas çdo veprimi. */}
      {activeTab === "pending" && <PendingProducts onChange={loadStats} />}
      {activeTab === "users" && <UsersList onChange={loadStats} />}
      {activeTab === "categories" && <CategoriesManager />}
      {activeTab === "reports" && <ReportsList onChange={loadStats} />}
    </div>
  );
}

export default Admin;
