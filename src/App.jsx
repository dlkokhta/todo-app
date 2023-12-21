import classes from "./App.module.css";
import moonIcon from "./assets/images/icon-moon.svg";
import sunIcon from "./assets/images/icon-sun.svg";
import checkIcon from "./assets/images/icon-check.svg";
import closeIcon from "./assets/images/icon-cross.svg";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [theme, setTheme] = useState(false);
  const [enteredInput, setEnteredInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [inputIsMarked, setInputIsMarked] = useState(true);
  const [filter, setFilter] = useState("all");
  const [changeColor, setChangeColor] = useState("all");

  const todoId = todos.map((todo) => todo._id);
  console.log("todoId", todoId);

  const themeChangeHandler = () => {
    setTheme(!theme);
  };

  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const keyhandleDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      setEnteredInput("");
      try {
        const res = await axios.post(
          "https://todo-app-api-production-2c38.up.railway.app/api/send",
          {
            title: enteredInput,
            completed: inputIsMarked,
          }
        );
        getRequest();
        // console.log("respose", res);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  const inputCheckboxChangehandler = () => {
    setInputIsMarked(!inputIsMarked);
  };

  const toggleTodo = async (id) => {
    try {
      const response = await axios.put(
        `https://todo-app-api-production-2c38.up.railway.app/api/${id}`
      );
      console.log("response", response.data);

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  //close each item
  const closeClickHandler = async (id) => {
    console.log("id close icon", id);
    const response = await axios.delete(
      `https://todo-app-api-production-2c38.up.railway.app/api/delete/${id}`
    );
    getRequest();
    console.log("delete todo", response);
    // const updatedTodos = todos.filter((todo) => todo.id !== id);
    // setTodos(updatedTodos);
  };
  //clear Completed items
  const clearCompleteChangeHandler = () => {
    const updatedTodos = todos.filter((todo) => todo.completed);
    setTodos(updatedTodos);
    setChangeColor("Clear Completed");
  };

  //Show All items
  const showAllTodoHandler = () => {
    setChangeColor("all");
    setTodos(todos);
    // console.log("todos from all", todos);
  };

  //Mark Active items
  const activeMarkHandler = () => {
    setChangeColor("active");
    const filteredTodo = todos.filter((todo) => todo.completed === false);
    setTodos(filteredTodo);
  };

  //Completed
  const completedMarkhandler = () => {
    setChangeColor("complete");
  };

  const getRequest = async () => {
    const req = await axios.get(
      "https://todo-app-api-production-2c38.up.railway.app/api/todos"
    );
    setTodos(req.data);
  };

  useEffect(() => {
    getRequest();
  }, []);

  return (
    <>
      <div
        className={
          !theme
            ? `${classes["mobile-light"]} ${classes["background"]}`
            : `${classes["mobile-dark"]} ${classes["background"]}`
        }
      >
        <div className={classes.container}>
          <header>
            <h1>T O D O</h1>
            <img
              src={!theme ? moonIcon : sunIcon}
              onClick={themeChangeHandler}
              value={theme}
            ></img>
          </header>

          <main>
            <div
              className={
                !theme
                  ? `${classes["input-container"]} ${classes["light"]}`
                  : `${classes["input-container"]} ${classes["dark"]}`
              }
            >
              <div
                className={
                  inputIsMarked
                    ? `${classes["input-check-box-unselected"]}`
                    : `${classes["input-check-box-selected"]}`
                }
                onClick={inputCheckboxChangehandler}
                value={inputIsMarked}
              >
                <img
                  className={
                    inputIsMarked ? classes["input-check-box-img"] : ""
                  }
                  src={checkIcon}
                ></img>
              </div>

              <input
                className={
                  !theme
                    ? `${classes["input-container-text"]} ${classes["input-container-text-light"]} `
                    : `${classes["input-container-text"]} ${classes["input-container-text-dark"]} `
                }
                type="text"
                placeholder=" Create a new todo..."
                onChange={inputChangeHandler}
                onKeyDown={keyhandleDown}
                value={enteredInput}
              ></input>
            </div>

            <div className={classes["middle-container"]}>
              {todos.map((todo) => (
                <div
                  key={todo._id}
                  className={
                    !theme
                      ? `${classes["created-todo-container"]} ${classes["created-todo-container-show"]} `
                      : `${classes["created-todo-container"]} ${classes["created-todo-container-show"]}  ${classes["created-todo-container-dark"]}`
                  }
                >
                  <div
                    className={
                      todo.completed
                        ? `${classes["input-check-box-unselected"]}`
                        : `${classes["input-check-box-selected"]}`
                    }
                    onClick={() => toggleTodo(todo._id)}
                    // value={todo.completed}
                  >
                    <img
                      className={
                        todo.completed
                          ? `${classes["created-todo-checkIcon"]}`
                          : ""
                      }
                      src={checkIcon}
                    ></img>
                  </div>
                  <h1
                    className={
                      todo.completed
                        ? `${classes["created-todo-container-text"]} `
                        : `${classes["created-todo-container-text-crossed-out"]}`
                    }
                  >
                    {todo.title}
                  </h1>
                  <img
                    onClick={() => {
                      closeClickHandler(todo._id);
                    }}
                    className={classes["close-icon"]}
                    src={closeIcon}
                  ></img>
                </div>
              ))}

              <div
                className={
                  !theme
                    ? `${classes["info-created-container"]} ${classes["light"]} `
                    : `${classes["info-created-container"]} ${classes["dark"]} `
                }
              >
                <h1
                  className={
                    !theme
                      ? `${classes["info-created-container-light"]}`
                      : `${classes["info-created-container-dark"]}`
                  }
                ></h1>
                <h2
                  onClick={() => {
                    clearCompleteChangeHandler();
                  }}
                  className={
                    !theme
                      ? `${classes["info-created-container-light"]}`
                      : `${classes["info-created-container-dark"]}`
                  }
                >
                  Clear Completed
                </h2>
              </div>
            </div>
          </main>

          <footer>
            <div
              className={
                !theme
                  ? `${classes["select-created-container"]} ${classes["light"]} `
                  : `${classes["select-created-container"]} ${classes["dark"]} `
              }
            >
              <h1
                className={
                  !theme
                    ? `${classes["info-created-container-light"]} ${classes["select-active"]}  `
                    : `${classes["info-created-container-dark"]} ${classes["select-active"]} `
                }
              ></h1>

              <div
                onClick={showAllTodoHandler}
                style={{ color: changeColor === "all" ? "#3a7cfd" : "" }}
                className={
                  !theme
                    ? `${classes["select-active"]} ${classes["select-light"]} }`
                    : `${classes["select-active"]} ${classes["select-dark"]}`
                }
              >
                All
              </div>

              <div
                onClick={activeMarkHandler}
                style={{ color: changeColor === "active" ? "#3a7cfd" : "" }}
                className={
                  !theme
                    ? `${classes["select-active"]} ${classes["select-light"]} }`
                    : `${classes["select-active"]} ${classes["select-dark"]}`
                }
              >
                Active
              </div>
              <div
                onClick={completedMarkhandler}
                style={{ color: changeColor === "complete" ? "#3a7cfd" : "" }}
                className={
                  !theme
                    ? `${classes["select-completed"]} ${classes["select-light"]}`
                    : `${classes["select-completed"]} ${classes["select-dark"]}`
                }
              >
                Completed
              </div>

              <h2
                onClick={() => {
                  clearCompleteChangeHandler();
                }}
                style={{
                  color: changeColor === "Clear Completed" ? "#3a7cfd" : "",
                }}
                className={
                  !theme
                    ? `${classes["select-completed"]} ${classes["info-created-container-light"]}`
                    : `${classes["select-completed"]} ${classes["info-created-container-dark"]}`
                }
              >
                Clear Completed
              </h2>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
