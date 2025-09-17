import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentAuth = () => {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/students/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roll_number: roll, class_name: studentClass }),
      });

      const data = await res.json();
      console.log("Student Login:", data);

      if (res.ok) {
        localStorage.setItem("student", JSON.stringify(data.student));
        setMessage("✅ Login successful");
        navigate("/student-dashboard");
      } else {
        setMessage("❌ " + (data.message || data.error || "Login failed"));
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Server not reachable");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "80vh", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 360, padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
        <h2 style={{ textAlign: "center" }}>Student Login</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        />
        <input
          type="text"
          placeholder="Roll Number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        />
        <input
          type="text"
          placeholder="Class"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        />
        <button onClick={handleLogin} style={{ width: "100%", padding: 8, marginTop: 6 }}>
          Login
        </button>
        <p style={{ textAlign: "center" }}>{message}</p>
      </div>
    </div>
  );
};

export default StudentAuth;
