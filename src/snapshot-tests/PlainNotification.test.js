import React from "react";
import renderer from "react-test-renderer";

// import plain React component class instead of the HOC (withStyles)
import { Notification as PlainNotification } from "../Notification";

const props = {
  id: "notification-test-id",
  title: "my test title",
  message: "my test message",
  onDelete: jest.fn(),
  onLike: jest.fn()
};

// provide mock class names since withStyles HOC no longer does it
const classes = {
  card: "mock-card-classname",
  rightIcon: "mock-rightIcon-classname"
};

/**
 * Might be a bit better since it reduces dependency on MUI class names.
 * Underlying components still create MUI class names dynamically and causing tests to fail when class names change.
 * Probably a sign that we don't need snapshot test at this level.
 */
describe("PlainNotification without MUI", () => {
  it("component renders correctly", () => {
    const tree = renderer
      .create(<PlainNotification {...props} classes={classes} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
