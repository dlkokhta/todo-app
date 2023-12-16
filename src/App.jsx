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
  const [getReqTodo, setGetReqTodo] = useState([]);

  console.log("enteredInput", enteredInput);

  const themeChangeHandler = () => {
    setTheme(!theme);
  };

  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };
  console.log("enteredInput", enteredInput);

  const keyhandleDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      setTodos([
        ...todos,
        {
          text: enteredInput,
          isMarked: inputIsMarked,
          id: Math.random(),
        },
      ]);

      setEnteredInput("");
      try {
        const res = await axios.post("http://localhost:3000/api/send", {
          title: enteredInput,
          completed: inputIsMarked,
        });
        console.log(res);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  const inputCheckboxChangehandler = () => {
    setInputIsMarked(!inputIsMarked);
  };

  //add item
  const inputCheckboxChangehandler1 = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isMarked: !todo.isMarked } : todo
    );
    setTodos(updatedTodos);
    const test = todos.map((todo) => todo.id);
  };
  //close each item
  const closeClickHandler = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  //clear Completed items
  const clearCompleteChangeHandler = () => {
    const updatedTodos = todos.filter((todo) => todo.isMarked);
    setTodos(updatedTodos);
    setChangeColor("Clear Completed");
  };

  //Show All items
  const showAllTodoHandler = () => {
    setFilter("all");
    setChangeColor("all");
  };

  //Mark Active items
  const activeMarkHandler = () => {
    setFilter("active");
    setChangeColor("active");
    // const activeMarked = todos.filter((todo) => todo.isMarked);
    // setTodos([...activeMarked]);
  };

  //Completed
  const completedMarkhandler = () => {
    setFilter("complete");
    setChangeColor("complete");
  };

  const filteredTodo = () => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => todo.isMarked);
      case "complete":
        return todos.filter((todo) => !todo.isMarked);
      default:
        return todos;
    }
  };

  let unCompletedTodo = todos.filter((todo) => todo.isMarked);
  let numberOfUnCompletedTodos = unCompletedTodo.length;

  useEffect(() => {
    const getRequest = async () => {
      const res = await axios.get("http://localhost:3000/api/todos");
      setGetReqTodo(res.data);
    };
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
            {/* created Todo */}
            {/* <div>
              {getReqTodo.map((getTodo, index) => (
                <div key={index}>{getTodo.isMarked}</div>
              ))}
            </div> */}
            <div className={classes["middle-container"]}>
              {filteredTodo().map((todo, index) => (
                <div
                  key={index}
                  className={
                    !theme
                      ? `${classes["created-todo-container"]} ${classes["created-todo-container-show"]} `
                      : `${classes["created-todo-container"]} ${classes["created-todo-container-show"]}  ${classes["created-todo-container-dark"]}`
                  }
                >
                  <div
                    className={
                      todo.isMarked
                        ? `${classes["input-check-box-unselected"]}`
                        : `${classes["input-check-box-selected"]}`
                    }
                    onClick={() => inputCheckboxChangehandler1(todo.id)}
                    value={todo.isMarked}
                  >
                    <img
                      className={
                        todo.isMarked
                          ? `${classes["created-todo-checkIcon"]}`
                          : ""
                      }
                      src={checkIcon}
                    ></img>
                  </div>
                  <h1
                    className={
                      todo.isMarked
                        ? `${classes["created-todo-container-text"]} `
                        : `${classes["created-todo-container-text-crossed-out"]}`
                    }
                  >
                    {todo.text}
                  </h1>
                  <img
                    onClick={() => {
                      closeClickHandler(todo.id);
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
                >
                  {numberOfUnCompletedTodos} items left
                </h1>
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
              >
                {numberOfUnCompletedTodos} items left
              </h1>

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
