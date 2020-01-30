import { assert } from "chai";

import { template } from "./template";

export function makeTestClass(
  subject,
  commonDescription = template`${"...rest"} is equal to ${"expectation"}`,
) {
  return class {
    constructor(localDescription) {
      this.subject = subject;
      this.description = localDescription || commonDescription;
    }

    run(funcArgsList, expectations) {
      expectations.forEach((expectation, index) => {
        const funcArgs = funcArgsList[index];

        it(this.description(funcArgs, expectation), () => {
          assert.deepEqual(this.subject(...funcArgs), expectation);
        });
      });
    }
  };
}
