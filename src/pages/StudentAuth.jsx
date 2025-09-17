import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentAuth = () => {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Make this async
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
    <div>
      <h2>Student Login</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Roll Number"
        value={roll}
        onChange={(e) => setRoll(e.target.value)}
      />
      <input
        type="text"
        placeholder="Class"
        value={studentClass}
        onChange={(e) => setStudentClass(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
};

export default StudentAuth;
