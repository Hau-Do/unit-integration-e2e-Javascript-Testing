import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";

import LikeButton from "./LikeButton";
import NotificationHeader from "./NotificationHeader";

const styles = theme => ({
  card: {
    width: "100%"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

export class Notification extends Component {
  handleDelete = id => {
    return () => {
      this.props.onDelete(id);
    };
  };

  handleLike = id => {
    return () => {
      this.props.onLike(id);
    };
  };

  render() {
    const { id, title, message, liked, classes } = this.props;
    return (
      <Card className={classes.card} data-testid={`notification-id-${id}`}>
        <NotificationHeader title={title} liked={liked} />
        <CardContent>{message}</CardContent>
        <CardActions>
          <LikeButton onLike={this.handleLike(id)} />
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={this.handleDelete(id)}
          >
            Delete
            <DeleteIcon className={classes.rightIcon} />
          </Button>
        </CardActions>
      </Card>
    );
  }
}

Notification.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  liked: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    card: PropTypes.string.isRequired,
    rightIcon: PropTypes.string.isRequired
  })
};

export default withStyles(styles)(Notification);
