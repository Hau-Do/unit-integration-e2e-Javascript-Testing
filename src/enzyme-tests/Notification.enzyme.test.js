import React from "react";
import Adapter from "enzyme-adapter-react-16";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { configure } from "enzyme";
import { shallow } from "enzyme";

import Notification from "../Notification";
import LikeButton from "../LikeButton";
import NotificationHeader from "../NotificationHeader";

configure({ adapter: new Adapter() });

const props = {
  id: "notification-test-id",
  title: "my test title",
  message: "my test message",
  onDelete: jest.fn(),
  onLike: jest.fn()
};

/**
 * Main points:
 *  1. Using shallow rendering tends to couple your tests to implementation by using
 *     dive(), find(Component/ComponentName), instance(), props(), state()
 *  2. Tests often break on refactor (try use LikeButton content directly in Notification)
 *  3. Tests often pass even if your component is broken (try not to pass id to <LikeButton onLike={this.handleLike()} />)
 */

describe("Notification - enzyme test", () => {
  // 1: test that rendered content is correct
  it("renders a title and a message", () => {
    // shallow render gives the result of component's render method and JS wrapper to traverse it
    const wrapper = shallow(<Notification {...props} />);

    // Use dive() because the Notification component is wrapped in withStyles HOC
    // use find() ties the test to the component name - NotificationHeader
    const cardHeaderComponent = wrapper.dive().find(NotificationHeader);
    expect(cardHeaderComponent).toHaveLength(1);

    // Use .render() to actually render the CardHeader component and assert on its text
    expect(cardHeaderComponent.render().text()).toEqual("my test title");

    // use find() ties the test to the component name - CardContent
    const cardContentComponent = wrapper.dive().find(CardContent);
    expect(cardContentComponent).toHaveLength(1);
    expect(cardContentComponent.render().text()).toEqual("my test message");
  });
  it("renders two buttons: Delete and Like", () => {
    const wrapper = shallow(<Notification {...props} />);

    // use find() ties the test to the component name - LikeButton
    const likeButtonComponent = wrapper.dive().find(LikeButton);
    expect(likeButtonComponent).toHaveLength(1);
    expect(likeButtonComponent.render().text()).toEqual("Like");

    const buttonComponent = wrapper.dive().find(Button);
    expect(buttonComponent).toHaveLength(1);
    expect(buttonComponent.render().text()).toEqual("Delete");
  });

  // 2: test component's interface
  it("should call property with notification id when Like button is clicked", () => {
    const wrapper = shallow(<Notification {...props} />);

    // accessing component instance and internal method - handleLike
    wrapper
      .dive()
      .instance()
      .handleLike("notification-test-id")();

    expect(props.onLike).toHaveBeenCalledTimes(1);
    expect(props.onLike).toHaveBeenCalledWith("notification-test-id");
  });
  it("should call property with notification id when Delete button is clicked", () => {
    const wrapper = shallow(<Notification {...props} />);

    // accessing component instance and internal method - handleDelete
    wrapper
      .dive()
      .instance()
      .handleDelete("notification-test-id")();

    expect(props.onDelete).toHaveBeenCalledTimes(1);
    expect(props.onDelete).toHaveBeenCalledWith("notification-test-id");
  });

  // 3: test props variations
  it("should update notification title if it is liked", () => {
    const wrapper = shallow(<Notification {...props} liked={true} />);

    const cardHeaderComponent = wrapper.dive().find(NotificationHeader);
    expect(cardHeaderComponent).toHaveLength(1);
    expect(cardHeaderComponent.render().text()).toEqual(
      "[Liked] my test title"
    );
  });
});
