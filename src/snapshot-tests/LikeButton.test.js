import React from "react";
import renderer from "react-test-renderer";
import JssProvider from "react-jss/lib/JssProvider";

import LikeButton from "../LikeButton";

// Use MUI class name generator to avoid dynamic numbers in class names
const generateClassName = (rule, styleSheet) =>
  `${styleSheet.options.classNamePrefix}-${rule.key}`;

const onLikeMock = jest.fn();

/**
 * LikeButton component is very simple.
 * Use inline snapshot in combination with MUI class names generator to ensure that output is correct.
 * Add unit tests to cover onClick behaviour.
 */
describe("LikeButton", () => {
  test("renders a button", () => {
    const component = renderer.create(
      <JssProvider generateClassName={generateClassName}>
        <LikeButton onLike={onLikeMock} />
      </JssProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchInlineSnapshot(`
<button
  className="MuiButtonBase-root MuiButton-root MuiButton-outlined"
  disabled={false}
  onBlur={[Function]}
  onClick={[MockFunction]}
  onContextMenu={[Function]}
  onFocus={[Function]}
  onKeyDown={[Function]}
  onKeyUp={[Function]}
  onMouseDown={[Function]}
  onMouseLeave={[Function]}
  onMouseUp={[Function]}
  onTouchEnd={[Function]}
  onTouchMove={[Function]}
  onTouchStart={[Function]}
  tabIndex="0"
  type="button"
>
  <span
    className="MuiButton-label"
  >
    Like
  </span>
  <span
    className="MuiTouchRipple-root"
  />
</button>
`);
  });
});
