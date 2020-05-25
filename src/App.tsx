import React, { useState, useRef } from "react";

// tipos e interfaces
type FormElement = React.FormEvent<HTMLFormElement>;
interface Itask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<Itask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTasks: Itask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number): void => {
    const newTask: Itask[] = [...tasks];
    newTask[i].done = !newTask[i].done;
    setTasks(newTask);
  };

  const removeTask = (i: number): void => {
    const newTasks: Itask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  autoFocus
                  ref={taskInput}
                />
                <button className="btn btn-success btn-block mt-2">Save</button>
              </form>
            </div>
          </div>

          {tasks.map((task: Itask, i: number) => (
            <div className="card card-body mt-2" key={i}>
              <h2 style={{ textDecoration: task.done ? "line-through" : "" }}>
                {task.name}
              </h2>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => toggleDoneTask(i)}
                >
                  {task.done ? "✓" : "✗"}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeTask(i)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
