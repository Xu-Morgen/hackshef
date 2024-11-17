import React, { useEffect, useState } from "react";
import BlocklyComponent from "./blockly";
import { javascriptGenerator, Order } from 'blockly/javascript';
import * as Blockly from 'blockly';

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
      <block type= "moveTo"></block>
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

const moveTo = {
  init: function () {
    this.appendValueInput('positionX')
      .setCheck('Number')
      .appendField('MoveToXPosition');
    this.appendValueInput('positionY')
      .setCheck('Number')
      .appendField('MoveToYPosition');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('type the position the block will move to');
    this.setHelpUrl('');
    this.setColour(225);
  }
};

Blockly.common.defineBlocks({ moveTo: moveTo });

javascriptGenerator.forBlock['moveTo'] = function (block, generator) {
  // TODO: change Order.ATOMIC to the correct operator precedence strength
  const value_position_X = generator.valueToCode(block, 'positionX', Order.ATOMIC);
  const value_position_Y = generator.valueToCode(block, 'positionY', Order.ATOMIC);
  function MoveTo(x, y) {
    return x, y
  }
  // TODO: Assemble javascript into the code variable.
  const code = `${value_position_X},${value_position_Y};nome`;

  return code;
}