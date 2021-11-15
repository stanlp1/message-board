import { Button, CircularProgress } from "@mui/material";
import { Fragment } from "react";
import Styles from "./LoadingButton.module.css";
let LoadingButton = ({
  disabledText,
  onClick,
  className,
  variant,
  isLoading,
  content,
  disabled,
  disabledClass,
}: any) => {
  return (
    <Button
      disabled={isLoading || disabled}
      variant={variant}
      className={
        disabled === false ? className : `${disabledClass} ${className}`
      }
      onClick={onClick}
    >
      {isLoading ? (
        <Fragment>
          <CircularProgress className={Styles["login-circular-indicator"]} />
        </Fragment>
      ) : disabled ? (
        disabledText ? (
          disabledText
        ) : (
          content
        )
      ) : (
        content
      )}
    </Button>
  );
};

export default LoadingButton;
