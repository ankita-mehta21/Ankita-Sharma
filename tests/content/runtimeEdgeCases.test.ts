import test from "node:test";
import assert from "node:assert/strict";

test("getSafeInitial returns a visible fallback for missing or blank values", async () => {
  const { getSafeInitial } = await import("../../src/lib/displayText.ts");

  assert.equal(getSafeInitial("Patient"), "P");
  assert.equal(getSafeInitial("  ankita"), "a");
  assert.equal(getSafeInitial(""), "?");
  assert.equal(getSafeInitial("   "), "?");
  assert.equal(getSafeInitial(undefined), "?");
});

test("toAbsoluteUrl returns empty string for relative assets without a site base URL", async () => {
  const { toAbsoluteUrl } = await import("../../src/components/seo/seoUtils.ts");

  assert.equal(toAbsoluteUrl("/images/og.png", ""), "");
  assert.equal(toAbsoluteUrl("https://cdn.example.com/og.png", ""), "https://cdn.example.com/og.png");
  assert.equal(toAbsoluteUrl("/images/og.png", "https://example.com"), "https://example.com/images/og.png");
});
