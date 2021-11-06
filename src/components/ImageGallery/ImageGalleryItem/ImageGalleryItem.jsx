import PropTypes from "prop-types";

import s from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ digImg, smallImg, onClick }) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={smallImg}
        alt="картинка"
        data-img={digImg}
        className={s.image}
        onClick={onClick}
      />
    </li>
  );
}

ImageGalleryItem.propType = {
  digImg: PropTypes.string.isRequired,
  smallImg: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
