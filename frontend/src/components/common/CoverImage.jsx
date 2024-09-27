const constructIGDBImageUrl = (imageId, size = "cover_big") => {
  return `https://images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg`;
};

import PropTypes from "prop-types";

const CoverImage = ({ imageId, gameName }) => {
  return (
    <img
      src={constructIGDBImageUrl(imageId)}
      alt={`${gameName} cover`}
      className="aspect-[3/4] rounded-lg object-cover transition md:hover:brightness-110"
    />
  );
};

CoverImage.propTypes = {
  imageId: PropTypes.string.isRequired,
  gameName: PropTypes.string.isRequired,
};

export default CoverImage;
