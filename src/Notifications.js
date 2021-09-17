import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Notification from "./Notification";

class Notifications extends Component {
  render() {
    const { feed, deleteNotification, likeNotification } = this.props;
    return (
      <div>
        <header>You have {feed.length || "no new"} notification(s)</header>
        <List>
          {feed.map(notification => (
            <ListItem key={notification.id}>
              <Notification
                id={notification.id}
                title={notification.title}
                message={notification.message}
                liked={notification.liked}
                onDelete={deleteNotification}
                onLike={likeNotification}
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

Notifications.propTypes = {
  feed: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      liked: PropTypes.bool
    })
  ),
  deleteNotification: PropTypes.func.isRequired,
  likeNotification: PropTypes.func.isRequired
};

export default Notifications;
