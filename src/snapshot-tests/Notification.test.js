import React from "react";
import renderer from "react-test-renderer";
import Notification from "../Notification";

const props = {
  id: "notification-test-id",
  title: "my test title",
  message: "my test message",
  onDelete: jest.fn(),
  onLike: jest.fn()
};

// Generated snapshot test is too big and contains auto-generated Material UI class names
describe("Notification full snapshot test", () => {
  it("renders a Notification", () => {
    const tree = renderer.create(<Notification {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
