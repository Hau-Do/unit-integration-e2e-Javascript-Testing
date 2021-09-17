import React from "react";
import ReactDOM from "react-dom";
import mockAxios from "axios";
import { render, cleanup, fireEvent, screen, waitFor, queryByText, queryAllByText } from "@testing-library/react";

import App from "../App";
import feedFixture from "./fixtures/feed.json";

// only mock HTTP layer
jest.mock("axios");

const getFeedMock = jest.fn();
mockAxios.get.mockImplementation(getFeedMock);

beforeEach(() => {
  getFeedMock.mockReturnValue(Promise.resolve({ data: feedFixture }));
});

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("indicates that feed loading is in progress", () => {
  const { getByText } = render(<App />);

  expect(getByText("Loading feed..."));
});

it("shows error message if feed loading failed", async () => {
  getFeedMock.mockReturnValue(Promise.reject("Unable to fetch feed"));

  const { getByText } = render(<App />);

  // Wait for the API request to finish
  await waitFor(() => expect(getByText("Error occurred when fetching your feed")));
});

it("shows a list of 3 notifications", async () => {
  const { queryAllByTestId } = render(<App />);

  await waitFor(() =>
    expect(queryAllByTestId(/notification-id-/).length).toEqual(3)
  );
});

it("shows that a user has 3 notifications", async () => {
  const { getByText } = render(<App />);

  // Wait for the API request to finish
  await waitFor(() => expect(getByText("You have 3 notification(s)")));
});

it("shows a title for each notification", async () => {
  const { getByText } = render(<App />);

  // Wait for the API request to finish
  await waitFor(() => expect(getByText("You have 3 notification(s)")));

  expect(getByText("JavaScript conference in Berlin"));
  expect(getByText("Event-driven architecture meet-up in Paris"));
  expect(getByText("What is FinTech?"));
});

it("shows a message for each notification", async () => {
  const { getByText } = render(<App />);

  // Wait for the API request to finish
  await waitFor(() => expect(getByText("You have 3 notification(s)")));

  expect(getByText("Early bird tickets on sale before 15 August 2019"));
  expect(getByText("Limited availability, make sure to book your place"));
  expect(getByText("Join this event to learn more"));
});

it("should allow to delete a notification from feed", async () => {
  const { getByText, queryAllByText } = render(<App />);
  // Wait for the API request to finish
  await waitFor(() => expect(getByText("You have 3 notification(s)")));

  fireEvent.click(queryAllByText("Delete")[0]);

  expect(getByText("You have 2 notification(s)"));

  fireEvent.click(queryAllByText("Delete")[0]);

  expect(getByText("You have 1 notification(s)"));

  fireEvent.click(queryAllByText("Delete")[0]);

  expect(getByText("You have no new notification(s)"));
});

it("should allow to like notifications", async () => {
  const { getByText, queryAllByText } = render(<App />);

  // Wait for the API request to finish
  await waitFor(() => expect(getByText("You have 3 notification(s)")));

  fireEvent.click(queryAllByText("Like")[0]);

  expect(getByText("[Liked] JavaScript conference in Berlin"));
});
