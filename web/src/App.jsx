import { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly";

import { registerCustomBlocks } from "./blocks/customBlocks";
import { generateProgramJson } from "./generator/jsonGenerator";

registerCustomBlocks();

function App() {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);

  const [jsonOutput, setJsonOutput] = useState({
    program: [],
  });

  useEffect(() => {
    if (!blocklyDiv.current) {
      return;
    }

    const toolbox = {
      kind: "flyoutToolbox",
      contents: [
        {
          kind: "block",
          type: "turtle_move",
        },
        {
          kind: "block",
          type: "turtle_turn",
        },
        {
          kind: "block",
          type: "turtle_say",
        },
        {
          kind: "block",
          type: "turtle_repeat",
        },
      ],
    };

    const workspace = Blockly.inject(blocklyDiv.current, {
      toolbox,
      trashcan: true,
      scrollbars: true,
    });

    workspaceRef.current = workspace;

    const updateJson = () => {
      const generated = generateProgramJson(workspace);
      setJsonOutput(generated);
    };

    workspace.addChangeListener(updateJson);

    updateJson();

    return () => {
      workspace.dispose();
      workspaceRef.current = null;
    };
  }, []);

  const copyJson = async () => {
    await navigator.clipboard.writeText(
      JSON.stringify(jsonOutput, null, 2)
    );
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>🐢 Turtle Code Builder</h1>
          <p>Build your program using blocks!</p>
        </div>
      </header>

      <main className="editor-container">
        <section className="workspace-section">
          <div className="section-header">
            <h2>Build Your Program</h2>
            <span>Drag blocks into the workspace</span>
          </div>

          <div
            ref={blocklyDiv}
            className="blockly-workspace"
          />
        </section>

        <section className="json-section">
          <div className="section-header">
            <h2>Program JSON</h2>

            <button onClick={copyJson}>
              Copy JSON
            </button>
          </div>

          <pre className="json-output">
            {JSON.stringify(jsonOutput, null, 2)}
          </pre>
        </section>
      </main>
    </div>
  );
}

export default App;
