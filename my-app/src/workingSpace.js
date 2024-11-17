import React, { useEffect, useState } from "react";
import BlocklyComponent from "./blockly";
import { javascriptGenerator, Order } from 'blockly/javascript';
import * as Blockly from 'blockly';

window.LoopTrap = 100;
javascriptGenerator.INFINITE_LOOP_TRAP =
  'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';

function WorkingSpace({ setCommand, workspaceRef, command }) {
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
      <block type= "up"></block>
      <block type= "down"></block>
    </xml>
  `;

  return (
    <div>
      <h1>React Blockly Demo</h1>
      <BlocklyComponent
        workspaceRef={workspaceRef}
        toolboxConfig={toolboxConfig}
        initialXml={workspaceXml}
        onWorkspaceChange={setWorkspaceXml}
        setCommand={setCommand}
        command={command}
      />
      
    </div>
  );
};

export default WorkingSpace;


const colorShape = {
  init: function () {
    this.appendEndRowInput('colorShpae')
      .appendField('colorShape');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Will color the color block with the current coordinates as the origin');
    this.setHelpUrl('');
    this.setColour(225);
  }
};

Blockly.common.defineBlocks({ colorShape: colorShape });

javascriptGenerator.forBlock['colorShape'] = function (block, generator) {
  const code = `triggerColorShape();`;
  return code;
}

const up = {
  init: function () {
    this.appendEndRowInput('up')
      .appendField('up');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('going to move up');
    this.setHelpUrl('');
    this.setColour(225);
  }
};

Blockly.common.defineBlocks({ up: up });

javascriptGenerator.forBlock['up'] = function (block, generator) {
  const code = `triggerMove("up");`;
  return code;
}

const down = {
  init: function () {
    this.appendEndRowInput('down')
      .appendField('down');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('going to move down');
    this.setHelpUrl('');
    this.setColour(225);
  }
};

Blockly.common.defineBlocks({ down: down });

javascriptGenerator.forBlock['down'] = function (block, generator) {
  const code = `triggerMove("down");`;
  return code;
}