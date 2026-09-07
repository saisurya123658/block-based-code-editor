# Part C — Development Notes

## AI Tools Used

I used AI-assisted development tools as a productivity aid throughout the implementation. They helped me with:

* Understanding the Blockly API and React integration.
* Structuring the custom Blockly blocks.
* Designing the custom JSON generator.
* Implementing the Java execution logic.
* Reviewing exception handling and edge cases.
* Debugging and improving the overall implementation.

I treated AI suggestions as guidance rather than blindly copying the generated code. I reviewed the implementation, made the necessary changes, and **compiled, executed, and tested the application locally** against different inputs.

## One Thing AI Got Wrong

During development, one AI-generated implementation initially handled the `repeat` block incorrectly by treating the nested blocks as a single operation instead of executing each child block sequentially for every iteration.

I identified the problem by testing a program containing multiple commands inside a `repeat` block and comparing the actual output with the expected behavior.

I then changed the execution logic so that the runner iterates through the nested block list and executes each child command in order during every repetition. I tested the updated implementation with nested and multiple-command repeat blocks to verify the behavior.

This reinforced an important lesson for me: **generated code must be validated using real test cases, especially when dealing with nested data structures and execution logic.**

## One Decision I'm Unsure About

I chose a **recursive execution approach** for nested `repeat` blocks. Since the Blockly-generated JSON naturally represents nested blocks hierarchically, recursion provides a simple way to process the structure while reusing the same execution logic.

I believe this is appropriate for the current scope because it keeps the implementation clean and easy to understand.

If I had another five hours, I would:

* Add more automated tests for deeply nested programs.
* Test malformed and incomplete JSON.
* Test zero and large repeat counts.
* Add stronger validation for unsupported or invalid commands.
* Compare the recursive implementation with an iterative, stack-based approach for very deep nesting.

This would help make the runner more robust while preserving the simplicity of the current implementation.
