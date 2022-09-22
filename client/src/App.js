import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "./components/cards/card";

function App() {
  const [values, setValues] = useState();
  const [listFUNCIONARIOS, setListFUNCIONARIOS] = useState();
  const [listCARGOS, setListCARGOS] = useState();

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      func_nome: values.func_nome,
      func_sobrenome: values.func_sobrenome,
      func_nascimento: values.func_nascimento,
      func_salario: values.func_salario,
      cargo_descricao: values.cargo_descricao,
    }).then(() => {
      setListFUNCIONARIOS([
        ...listFUNCIONARIOS,
        {
          func_nome: values.func_nome,
          func_sobrenome: values.func_sobrenome,
          func_nascimento: values.func_nascimento,
          func_salario: values.func_salario,
          cargo_descricao: values.cargo_descricao,
        },
      ]);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListFUNCIONARIOS(response.data);
      setListCARGOS(response.data);
    });
  }, []);

  return (
    <div className="app-container">
      <div className="register-container">
        <img
          className="logo"
          src="http://3lminformatica.com.br/site/wp-content/themes/3lm-theme/assets/images/3lmlogo.png"
        ></img>
        <h1 className="register-title"></h1>
        <input
          type="text"
          name="func_nome"
          placeholder="Nome"
          className="Register-input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name="func_sobrenome"
          placeholder="Sobrenome"
          className="Register-input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name="func_nascimento"
          placeholder="Data de Nascimento YYYY-MM-DD"
          className="Register-input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name="cargo_descricao"
          placeholder="Cargo"
          className="Register-input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name="func_salario"
          placeholder="Salário"
          className="Register-input"
          onChange={handleChangeValues}
        />
        <br></br>
        <button className="register-button" onClick={() => handleClickButton()}>
          Cadastrar
        </button>
      </div>
      {console.log(listFUNCIONARIOS)}
      <div className="card-finais">
        {typeof listFUNCIONARIOS !== "undefined" &&
          listFUNCIONARIOS.map((value) => {
            return (
              <Card
                key={value.id}
                listcard={listFUNCIONARIOS}
                setListCard={setListFUNCIONARIOS}
                id={value.funcionarios_id}
                func_nome={value.func_nome}
                func_sobrenome={value.func_sobrenome}
                func_nascimento={value.func_nascimento}
                func_salario={value.func_salario}
                cargo_descricao={value.cargo_descricao}
              ></Card>
            );
          })}

        {typeof listCARGOS !== "undefined" &&
          listCARGOS.map((value) => {
            return (
              <Card
                key={value.cargo_id}
                listcard={listCARGOS}
                setListCard={setListCARGOS}
                cargo_id={value.cargo_id}
                cargo_descricao={value.cargo_descricao}
              ></Card>
            );
          })}
      </div>
    </div>
  );
}

export default App;
