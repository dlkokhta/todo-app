import classes from "./App.module.css";
import moonIcon from "./assets/images/icon-moon.svg";
import sunIcon from "./assets/images/icon-sun.svg";
import checkIcon from "./assets/images/icon-check.svg";
import closeIcon from "./assets/images/icon-cross.svg";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [theme, setTheme] = useState(false);
  const [enteredInput, setEnteredInput] = useState("");
  // const [totalInput, setTotalInput] = useState("");
  // const [inputIsEntered, setInputIsEntered] = useState(false);
  const [todos, setTodos] = useState([]);
  const [inputIsMarked, setInputIsMarked] = useState(true);

  const themeChangeHandler = () => {
    setTheme(!theme);
  };

  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };
  console.log("enteredInput", enteredInput);

  const keyhandleDown = (event) => {
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
    }
  };

  const inputCheckboxChangehandler = () => {
    setInputIsMarked(!inputIsMarked);
  };
  console.log("todos", todos);

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
  };

  //Show All items
  const showAllTodoHandler = () => {
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      isMarked: true,
    }));
    setTodos(updatedTodos);
  };

  //Mark Active items
  const activeMarkHandler = () => {
    const activeMarked = todos.filter((todo) => todo.isMarked);
    setTodos([...activeMarked]);
  };

  //Completed
  const completedMarkhandler = () => {
    const completeMarked = todos.filter((todo) => !todo.isMarked);
    setTodos([...completeMarked]);
  };

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
            {/* created Todo */} {/* created Todo */} {/* created Todo */}{" "}
            <div className={classes["middle-container"]}>
              {todos.map((todo, index) => (
                <div
                  key={index}
                  className={`${classes["created-todo-container"]} ${classes["created-todo-container-show"]}`}
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
                    <img src={checkIcon}></img>
                  </div>
                  <h1
                    className={
                      todo.isMarked
                        ? `${classes["created-todo-container-text"]}`
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
                  5 items left
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
              <div
                onClick={showAllTodoHandler}
                className={classes["select-all"]}
              >
                All
              </div>
              <div
                onClick={activeMarkHandler}
                className={
                  !theme
                    ? `${classes["select-active"]} ${classes["select-light"]}`
                    : `${classes["select-active"]} ${classes["select-dark"]}`
                }
              >
                Active
              </div>
              <div
                className={
                  !theme
                    ? `${classes["select-completed"]} ${classes["select-light"]}`
                    : `${classes["select-completed"]} ${classes["select-dark"]}`
                }
              >
                Completed
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
