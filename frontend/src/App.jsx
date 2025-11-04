import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ nombre: "", correo: "", telefono: "" });

  useEffect(() => {
    axios.get("http://localhost:8081/api/users").then(res => setUsers(res.data));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:8081/api/users", form).then(() => window.location.reload());
  };

  const deleteUser = id => {
    axios.delete(`http://localhost:8081/api/users/${id}`).then(() => window.location.reload());
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Gestión de Usuarios</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nombre" onChange={e => setForm({ ...form, nombre: e.target.value })} />
        <input placeholder="Correo" onChange={e => setForm({ ...form, correo: e.target.value })} />
        <input placeholder="Teléfono" onChange={e => setForm({ ...form, telefono: e.target.value })} />
        <button>Guardar</button>
      </form>

      <table border="1" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Nombre</th><th>Correo</th><th>Teléfono</th><th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.correo}</td>
              <td>{u.telefono}</td>
              <td><button onClick={() => deleteUser(u.id)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
