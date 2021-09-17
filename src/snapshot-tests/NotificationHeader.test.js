import React from "react";
import snapshotDiff from "snapshot-diff";

import NotificationHeader from "../NotificationHeader";

describe("NotificationHeader", () => {
  // Use snapshot diff to see how title changed
  test("shows different title when notification is liked", () => {
    expect(
      snapshotDiff(
        <NotificationHeader title="my test title" />,
        <NotificationHeader title="my test title" liked={true} />,
        { contextLines: 0 }
      )
    ).toMatchInlineSnapshot(`
"Snapshot Diff:
- <NotificationHeader liked={false} title=\\"my test title\\" />
+ <NotificationHeader liked={true} title=\\"my test title\\" />

@@ -10,1 +10,1 @@
-       my test title
+       [Liked] my test title"
`);
  });
});
