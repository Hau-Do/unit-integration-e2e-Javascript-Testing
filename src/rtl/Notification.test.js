import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";

import Notification from "../Notification";

const renderWithProps = props => {
  return render(<Notification {...props} />);
};

const props = {
  id: "notification-test-id",
  title: "my test title",
  message: "my test message",
  onDelete: jest.fn(),
  onLike: jest.fn()
};

afterEach(cleanup);

/**
 * Main points:
 *  1. Tests are not coupled to implementation details. They don't break on refactor but do when functionality is broken.
 *  2. Tests are focused on what users see and do, rather than on how you components are implemented.
 *  3. Tests are easy to write.
 *  4. Tests are easy to use in TDD style.
 *  5. Quite often tests lean towards integration tests and make lower level tests less important or even not required.
 */
describe("Notification", () => {
  // 1: test that rendered content is correct
  it("renders a title and a message", () => {
    const { getByText } = renderWithProps(props);

    // query your elements how your user would - by text
    expect(getByText("my test title"));
    expect(getByText("my test message"));
  });
  it("renders two buttons: Delete and Like", () => {
    const { getByText } = renderWithProps(props);

    // query your elements how your user would - by text
    expect(getByText("Delete"));
    expect(getByText("Like"));
  });

  // 2: test component's interface
  it("should call property with notification id when Delete button is clicked", () => {
    const { getByText } = renderWithProps(props);

    // query your elements how your user would - by text - and click on it
    fireEvent.click(getByText("Delete"));

    expect(props.onDelete).toHaveBeenCalledTimes(1);
    expect(props.onDelete).toHaveBeenCalledWith("notification-test-id");
  });
  it("should call property with notification id when Like button clicked", () => {
    const { getByText } = renderWithProps(props);

    fireEvent.click(getByText("Like"));

    expect(props.onLike).toHaveBeenCalledTimes(1);
    expect(props.onLike).toHaveBeenCalledWith("notification-test-id");
  });

  // 3: test props variations
  it("should update notification title if it is liked", () => {
    const { getByText, queryByText } = renderWithProps({
      ...props,
      liked: true
    });

    // make sure the old title is not present
    expect(queryByText("my test title")).toBeNull();

    // but the new one is present
    expect(getByText("[Liked] my test title"));
  });
});
