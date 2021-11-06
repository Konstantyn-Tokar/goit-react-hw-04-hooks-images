import PropTypes from "prop-types";

import s from "./Button.module.css";

function Button({ onClick }) {
  return (
    <button
      type="button"
      name="Load more"
      className={s.Button}
      onClick={onClick}
    >
      <span className="lable">Load more</span>
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
