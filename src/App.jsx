import classes from "./App.module.css";
import moonIcon from "./assets/images/icon-moon.svg";
import sunIcon from "./assets/images/icon-sun.svg";
import checkIcon from "./assets/images/icon-check.svg";
import closeIcon from "./assets/images/icon-cross.svg";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState(false);
  const [enteredInput, setEnteredInput] = useState("");
  // const [inputClick, setInputClick] = useState("");

  const themeChangeHandler = () => {
    setTheme(!theme);
  };

  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };
  const inputSubmissionHandler = (event) => {
    event.preventDefault();
    if (event. === "Enter") {
      console.log(enteredInput);
    }
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
            <form
              onSubmit={inputSubmissionHandler}
              className={
                !theme
                  ? `${classes["input-container"]} ${classes["light"]}`
                  : `${classes["input-container"]} ${classes["dark"]}`
              }
            >
              <div
                className={
                  !theme
                    ? `${classes["check-box"]} ${classes["check-box-light"]}`
                    : `${classes["check-box"]} ${classes["check-box-dark"]}`
                }
              ></div>
              <input
                className={
                  !theme
                    ? `${classes["input-container-text"]} ${classes["input-container-text-light"]} `
                    : `${classes["input-container-text"]} ${classes["input-container-text-dark"]} `
                }
                type="text"
                placeholder=" Create a new todo..."
                onChange={inputChangeHandler}
                value={enteredInput}
              ></input>
            </form>

            <div className={classes["created-todo-container"]}>
              <div className={classes["created-todo-check-box"]}>
                <img src={checkIcon}></img>
              </div>
              <h1>created todo</h1>
              <img className={classes["close-icon"]} src={closeIcon}></img>
            </div>

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
                className={
                  !theme
                    ? `${classes["info-created-container-light"]}`
                    : `${classes["info-created-container-dark"]}`
                }
              >
                Clear Completed
              </h2>
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
              <div className={classes["select-all"]}>All</div>
              <div
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
