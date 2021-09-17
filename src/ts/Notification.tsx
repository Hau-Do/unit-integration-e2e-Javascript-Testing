import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import LikeButton from "../LikeButton";
import NotificationHeader from "../NotificationHeader";

export interface NotificationProps {
  id: string;
  title: string;
  message: string;
  liked: boolean;
  onDelete: Function;
  onLike: Function;
  classes: {
    card: string;
    rightIcon: string;
  };
}

const styles = (theme: Theme) => ({
  card: {
    width: "100%"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
    marginRight: 20
  }
});

export class Notification extends React.Component<NotificationProps, {}> {
  handleDelete = (id: string) => {
    return () => {
      this.props.onDelete(id);
    };
  };

  handleLike = (id: string) => {
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
            size="small"
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

export default withStyles(styles)(Notification);
