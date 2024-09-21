"use client";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { Task } from "@/components/Task";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isRemoveMode, setIsRemoveMode] = useState(false); 
  const [currentTaskId, setCurrentTaskId] = useState(null); 

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  const handleAddTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const doneTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleDeleteTask = () => {
    setTasks((prev) => prev.filter((task) => task.id !== currentTaskId));
    setIsModalOpen(false);
    setCurrentTaskId(null);
  };

  const openRemoveModal = (id) => {
    setCurrentTaskId(id); 
    setIsRemoveMode(true); 
    setIsModalOpen(true); 
  };

  
  const openAddModal = () => {
    setIsRemoveMode(false); 
    setIsModalOpen(true); 
  };

  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <Header />
      <main className="wrapper">
        <div className="container">
          <div className="to-do-list">
            <h4>Suas tarefas de hoje</h4>
            {tasks.map((item) => {
              if (!item.done) {
                return (
                  <Task
                    key={item.id}
                    status={item.done}
                    done={() => doneTask(item.id)}
                    modal={() => openRemoveModal(item.id)}
                    text={item.name}
                  />
                );
              }
            })}

            {tasks.some((item) => item.done) && (
              <>
                <h4>Tarefas Finalizadas</h4>
                {tasks.map((item) => {
                  if (item.done) {
                    return (
                      <Task
                        key={item.id}
                        status={item.done}
                        done={() => doneTask(item.id)}
                        text={item.name}
                      />
                    );
                  }
                })}
              </>
            )}
          </div>
          <Button modal={openAddModal} type="btn-add" text="Adicionar nova tarefa" />
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTask}
          onRemove={handleDeleteTask} 
          removeMode={isRemoveMode} 
        />
      </main>
    </>
  );
}
