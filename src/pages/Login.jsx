// =====================================================
// KYÇU (/login)
// =====================================================
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import api, { getErrorMessage } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "../styles/Auth.css";

function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  // Faqja ku donte të shkonte para kyçjes (p.sh. /post), përndryshe kryefaqja
  const redirectTo = (location.state && location.state.from) || "/";

  // Nëse është kyçur tashmë, nuk ka pse ta shohë këtë faqe
  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Shkruani email-in dhe fjalëkalimin.");
      return;
    }

    setSending(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user: userData } = response.data.data;
      await login(token, userData, remember);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
      setSending(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <h1>Kyçu</h1>
        <p className="auth-subtitle">Mirë se u ktheve!</p>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Fjalëkalimi</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="auth-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
            />
            Më mbaj mend
          </label>
          <Link to="/forgot-password">Keni harruar fjalëkalimin?</Link>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={sending}
        >
          {sending ? "Duke u kyçur..." : "Kyçu"}
        </button>

        <p className="auth-footer">
          Nuk ke llogari? <Link to="/register">Regjistrohu</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
