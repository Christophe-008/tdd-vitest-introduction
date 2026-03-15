import { describe, expect, it } from "vitest";
import { isAdult } from "./isAdult";

describe("isAdult", () => {
  it("retourne false si l'age est inferieur a 18", () => {
    expect(isAdult(15)).toBe(false);
  });
});
