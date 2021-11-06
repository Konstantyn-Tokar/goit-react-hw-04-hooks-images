import ImageGalleryItem from "../ImageGalleryItem";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";

import s from "./ImageGallery.module.css";

function ImageGalleryList({ imageslist, onImageClick, louder }) {
  return (
    <>
      <ul className={s.ImageGallery}>
        {imageslist.map((image) => {
          return (
            <ImageGalleryItem
              key={image.id}
              smallImg={image.webformatURL}
              digImg={image.largeImageURL}
              onClick={onImageClick}
            />
          );
        })}
      </ul>

      {louder && (
        <Loader
          className={s.loader}
          type="ThreeDots"
          color="#3E55B3"
          height={80}
          width={80}
        />
      )}
    </>
  );
}

ImageGalleryList.propTypes = {
  imageslist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ),
  onImageClick: PropTypes.func.isRequired,
  louder: PropTypes.bool.isRequired,
};

export default ImageGalleryList;
