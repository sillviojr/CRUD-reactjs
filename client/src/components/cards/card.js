import React from "react";
import "./card.css";
import FormDialog from "../dialog/dialog";

export default function Card(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickCard = () => {
    setOpen(true);
  };

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        func_nome={props.func_nome}
        func_sobrenome={props.func_sobrenome}
        func_nascimento={props.func_nascimento}
        cargo_descricao={props.cargo_descricao}
        func_salario={props.func_salario}
        ListCard={props.ListCard}
        setListCard={props.setListCard}
      />
      <div className="card-container" onClick={() => handleClickCard()}>
        <p className="Nome">{props.func_nome}</p>
        <p className="Nome">{props.func_sobrenome}</p>
        <p className="card-nascimento">{props.func_nascimento}</p>
        <p className="card-cargo">{props.cargo_descricao}</p>
        <p className="card-salario">R${props.func_salario}</p>
      </div>
    </>
  );
}
