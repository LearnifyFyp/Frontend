import React from "react";
import Button from "../Button/Button";
import classes from "./NotFound.module.css";
const NotFound = () => {
  return (
    <div className={classes.notFound}>
      <h1>Page Not Found</h1>
      <p>
        Looks like you've followed a broken link or entered a URL that doesn't
        exist on this site.
      </p>
      <Button label={"Back to our site"} />
    </div>
  );
};

export default NotFound;
