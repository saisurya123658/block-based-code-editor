import * as Blockly from "blockly";

export function registerCustomBlocks() {
  Blockly.Blocks["turtle_move"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("move")
        .appendField(
          new Blockly.FieldNumber(1, 0),
          "STEPS"
        )
        .appendField("steps");

      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);

      this.setTooltip("Move the turtle forward by a number of steps.");
      this.setHelpUrl("");
    },
  };

  Blockly.Blocks["turtle_turn"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("turn")
        .appendField(
          new Blockly.FieldDropdown([
            ["left", "left"],
            ["right", "right"],
          ]),
          "DIRECTION"
        );

      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);

      this.setTooltip("Turn the turtle 90 degrees.");
      this.setHelpUrl("");
    },
  };

  Blockly.Blocks["turtle_say"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("say")
        .appendField(
          new Blockly.FieldTextInput("Hello!"),
          "TEXT"
        );

      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);

      this.setTooltip("Make the turtle say something.");
      this.setHelpUrl("");
    },
  };

  Blockly.Blocks["turtle_repeat"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("repeat")
        .appendField(
          new Blockly.FieldNumber(2, 0),
          "TIMES"
        )
        .appendField("times");

      this.appendStatementInput("BODY")
        .setCheck(null)
        .appendField("do");

      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);

      this.setTooltip("Repeat the blocks inside any number of times.");
      this.setHelpUrl("");
    },
  };
}
