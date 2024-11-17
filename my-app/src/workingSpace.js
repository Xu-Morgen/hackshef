import React, { useEffect, useState } from "react";
import BlocklyComponent from "./blockly";
import { javascriptGenerator, Order } from 'blockly/javascript';
import * as Blockly from 'blockly';

window.LoopTrap = 100;
javascriptGenerator.INFINITE_LOOP_TRAP =
  'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';

function WorkingSpace({ setCommand }) {
  const [workspaceXml, setWorkspaceXml] = useState("");
  const toolboxConfig = `
    <xml xmlns="https://developers.google.com/blockly/xml">
      <block type="controls_if"></block>
      <block type="logic_compare"></block>
      <block type="math_number"></block>
      <block type="math_arithmetic"></block>
      <block type="text"></block>
      <block type="text_print"></block>
      <block type="controls_whileUntil"></block>
      <block type= "colorShape"></block>
    </xml>
  `;

  return (
    <div>
      <h1>React Blockly Demo</h1>
      <BlocklyComponent
        toolboxConfig={toolboxConfig}
        initialXml={workspaceXml}
        onWorkspaceChange={setWorkspaceXml}
        setCommand={setCommand}
      />
      
    </div>
  );
};

export default WorkingSpace;

const colorShape = {
  init: function () {
    this.appendEndRowInput('123')
      .appendField('colorShape');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('type the position the block will move to');
    this.setHelpUrl('');
    this.setColour(225);
  }
};

Blockly.common.defineBlocks({ colorShape: colorShape });

javascriptGenerator.forBlock['colorShape'] = function (block, generator) {
  // TODO: change Order.ATOMIC to the correct operator precedence strength
  // const value_position_X = generator.valueToCode(block, 'positionX', Order.ATOMIC);
  // const value_position_Y = generator.valueToCode(block, 'positionY', Order.ATOMIC);
  // function MoveTo(x, y) {
  //   return x, y
  // }
  // TODO: Assemble javascript into the code variable.
  const code = `play();`;

  return code;
}