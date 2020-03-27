import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./style.css";
import "../../global.css";

import api from "../../services/api";

import logo from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory("");

  const ongId = localStorage.getItem("ongId");

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post("incidents", data, {
        headers: {
          Auth: ongId
        }
      });

      history.push("/profile");
    } catch (erro) {
      alert(`Erro ao cadastrar formulário. Tente novamente.`);
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be The Heroe" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Logon
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do Caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input
            placeholder="Valor em Reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">
            {" "}
            Cadastrar{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
