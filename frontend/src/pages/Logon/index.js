import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";

import "./style.css";
import "../../global.css";

import heroes from "../../assets/heroes.png";
import logo from "../../assets/logo.svg";
import { FiLogIn } from "react-icons/fi";

export default function Logon() {
  const [id, setId] = useState("");
  const history = useHistory();

  async function handleLogon(e) {
    e.preventDefault();

    try {
      const response = await api.post("session", { id });
      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);

      history.push("/profile");
    } catch (erro) {
      alert(`Falha no Login, tente novamente`);
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Be The Heroe" />

        <form onSubmit={handleLogon}>
          <h1>Faça seu Logon</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroes} alt="Heroes" />
    </div>
  );
}
