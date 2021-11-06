import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import doFach from "../../helpers/ApiImg";
import scroll from "../../helpers/scroll";

import ImageGalleryList from "./ImageGalleryList";
import Button from "../Button";
import Modal from "../Modal";

import s from "./ImageGallery.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function ImageGallery({ imageName }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");
  const [showModal, setShowModal] = useState(false);
  const [bigImg, setBigImg] = useState("");
  const [louder, setLouder] = useState(false);

  useEffect(
    () => {
      if (!imageName) {
        return;
      }
      setImages([]);
      fetchImages(imageName);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [imageName]
  );

  useEffect(
    () => {
      if (!imageName) {
        return;
      }
      fetchImages(imageName, page);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );

  const fetchImages = () => {
    setLouder(true);
    doFach(imageName, page)
      .then((data) => {
        setStatus("resolved");
        setImages((images) => [...images, ...data]);
        setLouder(false);
        if (page > 1) {
          scroll();
        }
      })
      .catch((error) => {
        setError(error);
        setStatus("resjected");
      });
  };

  const onImageClick = (e) => {
    const srs = e.target.dataset.img;
    setBigImg(srs);
    setShowModal(true);
  };

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
        {images.length > 1 && (
          <Button onClick={() => setPage((prevPage) => prevPage + 1)} />
        )}
        {showModal && (
          <Modal onClose={() => setShowModal(!showModal)}>
            <img className={s.modalImg} src={bigImg} alt="Картинка" />
          </Modal>
        )}
      </div>
    );
  }
}

ImageGallery.propType = {
  imageName: PropTypes.string.isRequired,
};

export default ImageGallery;
