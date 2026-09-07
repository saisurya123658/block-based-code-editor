# block-based-code-editor — React + Java Block-Based Code Editor

A block-based programming environment built with **React, Blockly, and Java** as part of the Cybosocks Java / React JS / Full Stack Developer Internship screening task.

The project consists of two main parts:

- **Part A:** A React + Blockly visual block-based code editor.
- **Part B:** A Java console runtime that reads the generated JSON program and executes it.
- **Part C:** Development notes, AI-assisted development details, testing, and design decisions.

---

## 🔗 Project Links

### 🌐 Live Demo

**https://block-based-code-editor.vercel.app**

### 🎥 Video Demo

[**[Watch the 3-minute video demonstration](YOUR_YOUTUBE_VIDEO_LINK)**](https://youtu.be/53wwH3IicKg?si=D2Gn2hKweMDM3SWD)

### 💻 GitHub Repository

**https://github.com/saisurya123658/block-based-code-editor**

---

# 📌 Project Overview

The application allows a user to build a small program by arranging visual programming blocks.

The Blockly editor converts the block structure into the required JSON format. The exported JSON can then be provided to the Java runtime, which interprets the commands and moves a virtual turtle around a coordinate grid.

The overall flow is:

Blockly Editor
      ↓
Custom JSON Generator
      ↓
Program JSON
      ↓
Java Runtime
      ↓
Console Output
      ↓
Final Turtle Position & Direction
      ↓
Final Turtle Position & Direction

# ✨ Features

## Part A — React Block Editor

-  React-based single-page application. 
-  Blockly workspace integrated with React. 
-  Four custom Blockly blocks: 
  - `move` 
  - `turn` 
  - `say` 
  - `repeat` 
-  Custom fields, colours, and labels for the blocks. 
- `repeat` supports nested blocks. 
-  Nested repeat blocks are supported to multiple levels. 
-  Custom JSON generator. 
-  Live JSON output. 
-  Copy-to-clipboard functionality. 
-  Child-friendly block-based interface. 
-  No typing is required to create a basic program. 
-  JSON updates automatically whenever the workspace changes. 

## Part B — Java Runtime

-  Reads the exported JSON program. 
-  Executes commands sequentially. 
-  Supports: 
  - `move` 
  - `turn` 
  - `say` 
  - `repeat` 
-  Supports nested repeat blocks. 
-  Maintains turtle position and direction. 
-  Handles invalid input with clear error messages. 
-  Avoids printing stack traces for expected invalid-input cases. 

---

# 🛠️ Technologies Used

## Frontend

-  React 
-  JavaScript 
-  Blockly 
-  Vite 
-  CSS 

## Runtime

-  Java 
-  Maven 
-  JSON processing library 

---

# 📁 Project Structure


```
cybosocks-screening-task/
│
├── web/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── runner/
│   ├── src/
│   ├── pom.xml
│   └── ...
│
└── README.md
```

---

# 🚀 Part A — React Block Editor

## Running Locally

From the project root:


```
cd web
npm install
npm run dev
```

After starting the development server, open the local URL displayed in the terminal.

---

## Using the Block Editor

1.  Open the React application. 
2.  Select blocks from the Blockly toolbox. 
3.  Drag blocks into the workspace. 
4.  Connect blocks to create a program. 
5.  Use the `repeat` block to execute a group of commands multiple times. 
6.  Place other blocks inside `repeat`. 
7.  Nested `repeat` blocks can also be created. 
8.  The JSON output updates automatically as the workspace changes. 
9.  Use the copy button to copy the generated JSON. 

---

# 🧩 Custom Blockly Blocks

The editor contains four custom blocks.

## 1. `move`

Moves the turtle forward by the specified number of steps.

Example:


```
move 3 steps
```

Generated JSON:


```
{
  "type": "move",
  "steps": 3
}
```

---

## 2. `turn`

Rotates the turtle by 90 degrees.

Examples:


```
turn right
```

or


```
turn left
```

Generated JSON:


```
{
  "type": "turn",
  "direction": "right"
}
```

---

## 3. `say`

Prints a text message when executed.

Example:


```
say "Hello"
```

Generated JSON:


```
{
  "type": "say",
  "text": "Hello"
}
```

---

## 4. `repeat`

Repeats all blocks inside its body a specified number of times.

Example:


```
repeat 4 times
    move 2
    turn right
```

Generated JSON:


```
{
  "type": "repeat",
  "times": 4,
  "body": [
    {
      "type": "move",
      "steps": 2
    },
    {
      "type": "turn",
      "direction": "right"
    }
  ]
}
```

The `repeat` block can contain another `repeat` block, allowing nested programs.

Example:


```
repeat 2 times
    move 3
    repeat 2 times
        turn right
        move 1
```

---

# ☕ Part B — Java Runtime

## Building the Java Runner

From the project root:


```
cd runner
mvn clean package
```

After a successful build, the generated JAR can be used to execute a JSON program.

---

## Running the Program


```
java -jar target/runner.jar program.json
```

If the generated JAR has a different filename in the `target` directory, use that filename in the command above.

The Java program reads the JSON file and executes the commands in the order in which they appear.

---

# 🐢 Turtle Execution Rules

The turtle starts at:


```
Position: (0, 0)
Direction: North
```

## Coordinate System


```
             North (+y)
                 ↑
                 |
West (-x) ←------+------→ East (+x)
                 |
                 ↓
             South (-y)
```

### Directions

| DirectionMovement |    |
| ----------------- | -- |
| North             | +y |
| East              | +x |
| South             | -y |
| West              | -x |

---

## Move

`move` advances the turtle by the specified number of steps in its current direction.

For example:


```
{
  "type": "move",
  "steps": 3
}
```

If the turtle is facing North at `(0, 0)`, the resulting position is:


```
(0, 3)
```

---

## Turn

`turn` rotates the turtle by 90 degrees.

Supported directions:

- `left` 
- `right` 

Example:


```
{
  "type": "turn",
  "direction": "right"
}
```

---

## Say

`say` prints the specified text to standard output when the command is executed.

Example:


```
{
  "type": "say",
  "text": "Hello!"
}
```

---

## Repeat

`repeat` executes every block in its body the specified number of times.

Example:


```
{
  "type": "repeat",
  "times": 3,
  "body": [
    {
      "type": "move",
      "steps": 2
    }
  ]
}
```

This moves the turtle forward by 2 steps three times.

Nested repeat blocks are also supported.

---

# 📄 JSON Format

Both Part A and Part B use the same JSON structure.

Example:


```
{
  "program": [
    {
      "type": "say",
      "text": "Hi!"
    },
    {
      "type": "move",
      "steps": 3
    },
    {
      "type": "repeat",
      "times": 4,
      "body": [
        {
          "type": "move",
          "steps": 2
        },
        {
          "type": "turn",
          "direction": "right"
        }
      ]
    }
  ]
}
```

The JSON generated by the React editor can be copied into a JSON file and passed directly to the Java runner.

For example:


```
java -jar target/runner.jar program.json
```

This allows Part A and Part B to work together using the same program representation.

---

# 🔄 How the Application Works

User creates blocks
        ↓
Blockly Workspace
        ↓
Workspace changes detected
        ↓
Custom JSON Generator
        ↓
JSON displayed in the UI
        ↓
User copies the JSON
        ↓
JSON saved as program.json
        ↓
Java Runner reads program.json
        ↓
Commands executed sequentially
        ↓
Console output + final turtle state


---

# ⚠️ Error Handling

The Java runtime handles invalid program input without exposing a stack trace for expected input errors.

The implementation handles cases including:

-  Malformed JSON. 
-  Unknown block types. 
-  Missing parameters. 
-  Invalid directions. 
-  Negative repeat counts. 
-  Invalid command data. 

When invalid input is encountered, the program prints a clear error message and exits.

---

# 🧪 Testing

I tested the application locally using different program structures and inputs.

The tests included:

-  Simple `move` commands. 
- `turn` commands. 
- `say` commands. 
-  Multiple commands executed sequentially. 
- `repeat` blocks. 
-  Multiple commands inside a `repeat` block. 
-  Nested `repeat` blocks. 
-  Multiple levels of nested blocks. 
-  Invalid and malformed JSON. 
-  Invalid repeat values. 
-  Unsupported block types. 

I also verified that JSON generated by the React editor can be passed to the Java runtime and executed successfully.

---

# 🤖 Part C — Development Notes

## AI Tools Used

I used AI-assisted development tools as a productivity aid throughout the implementation.

They helped me with:

-  Understanding the Blockly API and React integration. 
-  Structuring the custom Blockly blocks. 
-  Designing the custom JSON generator. 
-  Implementing the Java execution logic. 
-  Reviewing exception handling and edge cases. 
-  Debugging and improving the overall implementation. 
-  Understanding how the frontend-generated JSON should be consumed by the Java runtime. 
-  Reviewing the overall project structure and integration between the React frontend and Java runtime. 

I treated AI suggestions as guidance rather than blindly copying the generated code.

I reviewed the implementation, made the necessary changes, and compiled, executed, and tested the application locally against different inputs.

---

## One Thing AI Got Wrong

During development, one AI-generated implementation initially handled the `repeat` block incorrectly by treating the nested blocks as a single operation instead of executing each child block sequentially for every iteration.

I identified the problem by testing a program containing multiple commands inside a `repeat` block and comparing the actual output with the expected behavior.

I then changed the execution logic so that the runner iterates through the nested block list and executes each child command in order during every repetition.

I tested the updated implementation with nested and multiple-command repeat blocks to verify the behavior.

This reinforced an important lesson for me:

> Generated code must be validated using real test cases, especially when dealing with nested data structures and execution logic.

---

## One Decision I'm Unsure About

I chose a recursive execution approach for nested `repeat` blocks.

Since the Blockly-generated JSON naturally represents nested blocks hierarchically, recursion provides a simple way to process the structure while reusing the same execution logic.

I believe this is appropriate for the current scope because it keeps the implementation clean and easy to understand.

However, for extremely deeply nested programs, an iterative stack-based approach could be considered to avoid excessive recursion depth.

# 🔗 Quick Links

| Resource               | Link                                                              |
| ---------------------- | ----------------------------------------------------------------- |
| 🌐 Live Demo           | https://block-based-code-editor.vercel.app/                       |
| 💻 GitHub Repository   | https://github.com/saisurya123658/block-based-code-editor|
| 🎥 Video Demonstration | [YouTube Video](https://youtu.be/53wwH3IicKg?si=D2Gn2hKweMDM3SWD) |

