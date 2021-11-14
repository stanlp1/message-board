import { Button, CircularProgress } from "@mui/material";
import Styles from "./LoadingButton.module.css";
let LoadingButton = ({
  onClick,
  className,
  variant,
  isLoading,
  content,
}: any) => {
  return (
    <Button variant={variant} className={className} onClick={onClick}>
      {isLoading ? (
        <CircularProgress className={Styles["login-circular-indicator"]} />
      ) : (
        content
      )}
    </Button>
  );
};

export default LoadingButton;
