import { Component } from "react";
import { ImSearch } from "react-icons/im";
import { toast } from "react-toastify";

import s from "./Searchbar.module.css";

class Searchbar extends Component {
  state = {
    imageName: "",
  };

  handleNameChange = (e) => {
    const value = e.currentTarget.value.toLowerCase();

    this.setState({ imageName: value });
  };

  handleSudmit = (e) => {
    e.preventDefault();

    const { imageName } = this.state;

    if (imageName.trim() === "") {
      toast.warn("Введите тематику поиска изображения");
      return;
    }

    this.props.onSubmit(imageName);
    this.setState({ imageName: "" });
  };

  render() {
    const { handleSudmit, handleNameChange } = this;

    return (
      <header className={s.bar}>
        <form className={s.form} onSubmit={handleSudmit}>
          <button type="submit" className={s.button}>
            <ImSearch />
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleNameChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
