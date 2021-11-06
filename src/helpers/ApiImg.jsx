import { toast } from "react-toastify";
import PropTypes from "prop-types";

const API_KEY = "24169553-082afd50aec2e2c887c16645d";
const BASE_URL = "https://pixabay.com/api/";

function doFach(imageName, page) {
  return fetch(
    `${BASE_URL}?image_type=photo&orientation=horizontal&q=${imageName}&per_page=12&page=${page}&key=${API_KEY}`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error(`Нет изображений на тему ${imageName}`));
    })
    .then((data) => {
      const lengthArr = data.hits.length;
      if (lengthArr === 0) {
        toast.warn(`Нет изображений на тему ${imageName}`);
      }
      return data.hits;
    });
}

doFach.propType = {
  imageName: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default doFach;
