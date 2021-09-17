import React from "react";
import { render } from "@testing-library/react";
import NotificationHeader from "../NotificationHeader";

describe("NotificationsHeader", () => {
  it("shows title", () => {
    const { getByText } = render(<NotificationHeader title="test title" />);

    // ensure that the title is correct
    expect(getByText("test title"));
  });

  it("updates title if notification is liked", () => {
    const { queryAllByText, getByText } = render(
      <NotificationHeader title="test title" liked={true} />
    );

    // ensure that title is shown only once
    expect(queryAllByText(/test title/).length).toBe(1);

    // ensure that title has been updated correctly
    expect(getByText("[Liked] test title"));
  });
});
