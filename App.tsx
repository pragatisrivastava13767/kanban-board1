import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  status: "todo" | "inprogress" | "review" | "done";
};

const statuses = ["todo", "inprogress", "review", "done"];

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState("kanban");

  // Generate tasks
  useEffect(() => {
    const data: Task[] = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      title: 'Task ${i + 1}',
      status: statuses[Math.floor(Math.random() * 4)] as any,
    }));
    setTasks(data);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* View Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setView("kanban")}>Kanban</button>
        <button onClick={() => setView("list")}>List</button>
      </div>

      {/* Views */}
      {view === "kanban" && <Kanban tasks={tasks} />}
      {view === "list" && <List tasks={tasks} />}
    </div>
  );
}

export default App;



/* ---------------- KANBAN ---------------- */

const Kanban = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {statuses.map((status) => (
        <div
          key={status}
          style={{
            width: "25%",
            background: "#f3f3f3",
            padding: "10px",
          }}
        >
          <h3>{status}</h3>

          {tasks
            .filter((t) => t.status === status)
            .map((task) => (
              <div
                key={task.id}
                style={{
                  background: "white",
                  padding: "10px",
                  margin: "5px 0",
                }}
              >
                {task.title}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};


/* ---------------- LIST ---------------- */

const List = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "5px 0",
          }}
        >
          {task.title} - {task.status}
        </div>
      ))}
    </div>
  );
};