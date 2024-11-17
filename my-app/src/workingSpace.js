import React, { useState } from "react";
import * as Blockly from 'blockly';
import BlocklyComponent from "./blockly";

function WorkingSpace() {
  const [workspaceXml, setWorkspaceXml] = useState("");

  const toolboxConfig = `
    <xml xmlns="https://developers.google.com/blockly/xml">
      <block type="controls_if"></block>
      <block type="logic_compare"></block>
      <block type="math_number"></block>
      <block type="math_arithmetic"></block>
      <block type="text"></block>
      <block type="text_print"></block>
    </xml>
  `;

  return (
    <div>
      <h1>React Blockly Demo</h1>
      <BlocklyComponent
        toolboxConfig={toolboxConfig}
        initialXml={workspaceXml}
        onWorkspaceChange={setWorkspaceXml}
      />
      
    </div>
  );
};

export default WorkingSpace;
