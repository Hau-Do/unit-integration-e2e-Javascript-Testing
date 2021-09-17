import React, { Component } from "react";
import axios from "axios";

import Notifications from "./Notifications";

class App extends Component {
  componentDidMount() {
    axios
      .get("http://localhost:3002/feed")
      .then(response => {
        this.setState({
          feed: response.data,
          error: null
        });
      })
      .catch(error => {
        this.setState({
          feed: [],
          error
        });
      })
      .then(() => {
        this.setState({
          isLoading: false
        });
      });
  }

  state = {
    feed: [],
    isLoading: true,
    error: null
  };

  deleteNotification = id => {
    this.setState(state => ({
      feed: state.feed.filter(notification => notification.id !== id)
    }));
  };

  likeNotification = id => {
    const updatedFeed = this.state.feed.map(notification => {
      if (notification.id === id) {
        notification.liked = true;
      }
      return notification;
    });

    this.setState({
      feed: updatedFeed
    });
  };

  render() {
    const { error, isLoading, feed } = this.state;

    if (error) {
      return <h2>Error occurred when fetching your feed</h2>;
    }

    if (isLoading) {
      return <h2>Loading feed...</h2>;
    }

    return (
      <Notifications
        feed={feed}
        deleteNotification={this.deleteNotification}
        likeNotification={this.likeNotification}
      />
    );
  }
}

export default App;
