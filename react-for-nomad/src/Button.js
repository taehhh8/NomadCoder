import PropTypes from "prop-types";
import styled from "./Button.module.css";

function Button({ onClick, text }) {
  return (
    <button onClick={onClick} className={styled.btn}>
      {text}
    </button>
  );
}
export default Button;

Button.prototype = {
  text: PropTypes.string.isRequired,
};
