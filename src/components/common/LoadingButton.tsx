import { Button, CircularProgress } from "@mui/material";
import { Fragment } from "react";
import Styles from "./LoadingButton.module.css";
let LoadingButton = ({
  onClick,
  className,
  variant,
  isLoading,
  content,
}: any) => {
  return (
    <Button
      disabled={isLoading}
      variant={variant}
      className={className}
      onClick={onClick}
    >
      {isLoading ? (
        <Fragment>
          <CircularProgress className={Styles["login-circular-indicator"]} />
        </Fragment>
      ) : (
        content
      )}
    </Button>
  );
};

export default LoadingButton;
