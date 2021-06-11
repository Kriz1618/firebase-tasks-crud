import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { store } from "../firebaseConfig";

export const Tasks = (props) => {
  const { userId } = props?.location?.state;
  const [task, setTask] = useState("");
  const [detail, setDetail] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        await fetchData();
      } catch (error) {
        setError(error.message);
      }
    };
    getTasks();
  }, []);

  const fetchData = async () => {
    try {
      const taskCollection = store.collection("tasks");
      const { docs } = await taskCollection.where("userId", "==", userId).get();
      const tasksArray = docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksArray);
    } catch (error) {
      throw error;
    }
  };

  const validateInfo = () => {
    if (!task.trim()) {
      return setError("Invalid task name!");
    }
    if (!detail.trim()) {
      return setError("Invalid task detail!");
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    validateInfo();
    const taskInfo = { userId, name: task, detail };
    try {
      await store.collection("tasks").add(taskInfo);
      await fetchData();
      alert("Task was added!!");
    } catch (error) {
      return setError(error.message);
    }
    setTask("");
    setDetail("");
    setError("");
  };

  const deleteTask = async (id) => {
    try {
      console.log("65 id", id);
      await store.collection("tasks").doc(id).delete();
      await fetchData();
      console.log("67 ");
    } catch (error) {
      console.log("68 ");
      setError(error.message);
    }
  };

  const updateTask = async (itemId) => {
    try {
      const data = await store.collection("tasks").doc(itemId).get();

      const { name, detail } = data.data();

      setTask(name);
      setDetail(detail);
      setTaskId(data.id);
      console.log("77 data", taskId, data.data());
    } catch (error) {
      setError(error.message);
      setTaskId(null);
    }
  };

  const setUpdatedTask = async (e) => {
    e.preventDefault();
    validateInfo();
    try {
      await store
        .collection("tasks")
        .doc(taskId)
        .update({ name: task, detail });
      await fetchData();
      setTaskId(null);
      setDetail("");
      setTask("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="mt-3">User Tasks</h2>
            <form
              onSubmit={taskId ? setUpdatedTask : addTask}
              className="form-group"
            >
              <input
                value={task}
                onChange={(e) => {
                  setTask(e.target.value);
                }}
                className="form-control"
                type="text"
                placeholder="Type the task name"
              />
              <input
                value={detail}
                onChange={(e) => {
                  setDetail(e.target.value);
                }}
                className="form-control mt-3"
                type="text"
                placeholder="Type the task detail"
              />
              <input
                type="submit"
                value={taskId ? "Update task" : "Register task"}
                className="btn btn-dark btn-block form-control mt-3"
              />
            </form>
            {error ? <p className="">{error}</p> : <span></span>}
          </div>
          <div className="col">
            <h2 className="mt-3">Task list</h2>
            {tasks.length ? (
              <ul className="list-group">
                {tasks.map((task) => (
                  <li className="list-group-item" key={task.id}>
                    <div>
                      <b>{task.name}</b>
                      <button
                        onClick={(id) => {
                          deleteTask(task.id);
                        }}
                        className="btn btn-outline-danger float-end"
                      >
                        Delete
                      </button>
                      <button
                        onClick={(id) => {
                          updateTask(task.id);
                        }}
                        className="btn btn-outline-dark me-2 float-end"
                      >
                        Update
                      </button>
                    </div>
                    <p className="mt-3">{task.detail}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <span>There are not tasks for this user</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
