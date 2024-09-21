import React, { useState } from "react";
import "./style.scss";
import { Button } from "../Button";

export const Modal = ({ isOpen, onClose, onSubmit, onRemove, removeMode }) => {
  const [taskName, setTaskName] = useState("");

  const gerarIdUnico = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!removeMode) {
      onSubmit({
        id: gerarIdUnico(),
        name: taskName,
        done: false,
      });
      setTaskName("");
    } else {
      onRemove(); 
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h1>{removeMode ? "Deletar tarefa" : "Nova tarefa"}</h1>

          {!removeMode && (
            <label htmlFor="task">
              Título
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Nome da tarefa"
                id="task"
                required
              />
            </label>
          )}

          {removeMode && <p>Tem certeza que deseja remover essa tarefa?</p>}

          <div className="btn-modal">
            <Button modal={onClose} noBTN={true} type="btn-cancel" text="Cancelar" />
            <Button
              modal={handleSubmit}
              type={removeMode ? "btn-delete" : "btn-add"}
              text={removeMode ? "Remover" : "Adicionar"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
