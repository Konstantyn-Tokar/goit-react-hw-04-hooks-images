import { Component } from "react";
import PropTypes from "prop-types";
import doFach from "../../helpers/ApiImg";
import scroll from "../../helpers/scroll";

import ImageGalleryList from "./ImageGalleryList";
import Button from "../Button";
import Modal from "../Modal";

import s from "./ImageGallery.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class ImageGallery extends Component {
  state = {
    images: null,
    page: 1,
    error: null,
    status: "idle",
    showModal: false,
    bigImg: "",
    louder: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const { images } = this.state;

    if (prevName !== nextName) {
      this.setState({ louder: true });

      doFach(nextName, nextPage)
        .then((data) =>
          this.setState({ images: data, status: "resolved", louder: false })
        )
        .catch((error) => this.setState({ error, status: "resjected" }));
    }

    if (prevPage !== nextPage) {
      this.setState({ louder: true });
      doFach(nextName, nextPage)
        .then((data) => {
          this.setState({
            images: [...images, ...data],
            status: "resolved",
            louder: false,
          });
          scroll();
        })
        .catch((error) => this.setState({ error, status: "resjected" }));
    }
  }

  onLoadMore = () => {
    const { page } = this.state;
    this.setState({
      page: page + 1,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImageClick = (e) => {
    const srs = e.target.dataset.img;

    this.setState({
      bigImg: srs,
      showModal: true,
    });
  };

  render() {
    const {
      state: { status, images, bigImg, showModal, error, louder },
      onImageClick,
      onLoadMore,
      toggleModal,
    } = this;

    if (status === "idle") {
      return <h1>Введите тематику поиска изображения</h1>;
    }

    if (status === "resjected") {
      return <h1>{error.message}</h1>;
    }

    if (status === "resolved") {
      return (
        <div className={s.imageGallery}>
          <ImageGalleryList
            imageslist={images}
            onImageClick={onImageClick}
            louder={louder}
          />
          {images.length > 1 && <Button onClick={onLoadMore} />}
          {showModal && (
            <Modal onClose={toggleModal}>
              <img className={s.modalImg} src={bigImg} alt="Картинка" />
            </Modal>
          )}
        </div>
      );
    }
  }
}

ImageGallery.propType = {
  imageName: PropTypes.string.isRequired,
};

export default ImageGallery;
