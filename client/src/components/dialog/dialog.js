import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import produce from "immer";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    funcionarios_id: props.funcionarios_id,
    func_nome: props.func_nome,
    func_sobrenome: props.func_sobrenome,
    func_nascimento: props.func_nascimento,
    cargo_descricao: props.cargo_descricao,
    func_salario: props.func_salario,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditFUNCIONARIOS = () => {
    Axios.put("http://localhost:3001/edit", {
      funcionarios_id: editValues.id,
      func_nome: editValues.func_nome,
      func_sobrenome: editValues.func_sobrenome,
      func_nascimento: editValues.func_nascimento,
      cargo_descricao: editValues.cargo_descricao,
      func_salario: editValues.func_salario,
    }).then(() => {
      props.setListCard(
        props.listCard.map((value) => {
          return value.id == editValues.id
            ? {
                funcionarios_id: editValues.id,
                func_nome: editValues.func_nome,
                func_sobrenome: editValues.func_sobrenome,
                func_nascimento: editValues.func_nascimento,
                cargo_descricao: editValues.cargo_descricao,
                func_salario: editValues.func_salario,
              }
            : value;
        })
      );
    });
    handleClose();
  };

  const handleDeleteFUNCIONARIOS = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.id != editValues.id;
        })
      );
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="id"
            defaultValue={props.funcionarios_id}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="func_nome"
            label="Nome"
            defaultValue={props.func_nome}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="func_sobrenome"
            label="sobrenome"
            defaultValue={props.func_sobrenome}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="func_nascimento"
            label="Data de Nascimento"
            defaultValue={props.func_nascimento}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="cargo_descricao"
            label="Cargo"
            defaultValue={props.cargo_descricao}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="func_salario"
            label="Salario"
            defaultValue={props.func_salario}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDeleteFUNCIONARIOS()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditFUNCIONARIOS()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
