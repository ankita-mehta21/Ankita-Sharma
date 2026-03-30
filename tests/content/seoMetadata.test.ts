import test from "node:test";
import assert from "node:assert/strict";

import { getAboutSeoTitle } from "../../src/content/seoMetadata";

test("about SEO title uses the doctor title instead of the badge label", () => {
  assert.equal(
    getAboutSeoTitle({
      heroBadge: "Portfolio",
      heroTitle: "Dr. Ankita Sharma, DMD, MDS",
    }),
    "Dr. Ankita Sharma, DMD, MDS",
  );
});
