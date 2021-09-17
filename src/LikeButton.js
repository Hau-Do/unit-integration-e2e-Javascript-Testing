import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

const LikeButton = ({ onLike }) => (
  <Button variant="outlined" size="medium" onClick={onLike}>
    Like
  </Button>
);

LikeButton.propTypes = {
  onLike: PropTypes.func.isRequired
};

export default LikeButton;
