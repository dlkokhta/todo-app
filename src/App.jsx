import classes from "./App.module.css";
import moonIcon from "./assets/images/icon-moon.svg";
import sunIcon from "./assets/images/icon-sun.svg";
import checkIcon from "./assets/images/icon-check.svg";
import closeIcon from "./assets/images/icon-cross.svg";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState(false);

  const themeChangeHandler = () => {
    setTheme(!theme);
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
              className={`${classes["input-container"]} ${classes["white"]}`}
            >
              <div className={classes["check-box"]}></div>
              <h1>Create a new todo...</h1>
            </div>

            <div className={classes["created-todo-container"]}>
              <div className={classes["created-todo-check-box"]}>
                <img src={checkIcon}></img>
              </div>
              <h1>created todo</h1>
              <img className={classes["close-icon"]} src={closeIcon}></img>
            </div>

            <div className={classes["info-created-container"]}>
              <h1>5 items left</h1>
              <h2>Clear Completed</h2>
            </div>
          </main>

          <footer>
            <div className={classes["select-created-container"]}>
              <div>All</div>
              <div>Active</div>
              <div>Completed</div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
