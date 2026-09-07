export function generateProgramJson(workspace) {
  const program = [];

  let block = workspace.getTopBlocks(true);

  block.forEach((topBlock) => {
    let current = topBlock;

    while (current) {
      const result = blockToJson(current);

      if (result) {
        program.push(result);
      }

      current = current.getNextBlock();
    }
  });

  return {
    program,
  };
}

function blockToJson(block) {
  switch (block.type) {
    case "turtle_move":
      return {
        type: "move",
        steps: block.getFieldValue("STEPS"),
      };

    case "turtle_turn":
      return {
        type: "turn",
        direction: block.getFieldValue("DIRECTION"),
      };

    case "turtle_say":
      return {
        type: "say",
        text: block.getFieldValue("TEXT"),
      };

    case "turtle_repeat": {
      const times = block.getFieldValue("TIMES");
      const body = [];

      let child = block.getInputTargetBlock("BODY");

      while (child) {
        const childJson = blockToJson(child);

        if (childJson) {
          body.push(childJson);
        }

        child = child.getNextBlock();
      }

      return {
        type: "repeat",
        times,
        body,
      };
    }

    default:
      return null;
  }
}
