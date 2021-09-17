import React from "react";
import PropTypes from "prop-types";
import CardHeader from "@material-ui/core/CardHeader";

const NotificationHeader = ({ liked, title }) => (
  <CardHeader title={liked ? `[Liked] ${title}` : title} />
);

NotificationHeader.defaultProps = {
  liked: false
};

NotificationHeader.propTypes = {
  liked: PropTypes.bool.isRequired,
  title: PropTypes.string
};

export default NotificationHeader;
