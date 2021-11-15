import React from "react";
import classes from './Settings.module.css'

function Settings() {
  return (
    <main>
      <h3>Change display</h3>
      <div className={classes.wrapper}>
          <div className={classes.light}>
          </div>
          <div className={classes.dark}>
          </div>
      </div>
    </main>
  );
}

export default Settings;
