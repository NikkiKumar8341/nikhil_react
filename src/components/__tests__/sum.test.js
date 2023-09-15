import { sum } from '../Sum'

test("Sum function should caculate the sum of two numbers", () => {
  const result = sum(3, 4);

  //Assertion
  expect(result).toBe(7);
});