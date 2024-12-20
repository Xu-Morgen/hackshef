import React, { useEffect, useState } from "react";
import BlocklyComponent from "./blockly";
import { javascriptGenerator, Order } from 'blockly/javascript';
import * as Blockly from 'blockly';
import './App.css';


window.LoopTrap = 100;
javascriptGenerator.INFINITE_LOOP_TRAP =
  'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';

const ILIKESLEEP = "sleep(5000);\n"

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
      <block type= "left"></block>
      <block type= 'right'></block>
      <block type= 'shape1'></block>
      <block type= 'shape2'></block>
      <block type= 'MoveTo'></block>
      <block type= 'check'></block>
    </xml>
  `;

  return (
    <div className="workspace">
      <h1>WorkSpace</h1>
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
  const code = `triggerColorShape();\n`;
  return ILIKESLEEP + code;
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
  const code = `triggerMove("up");\n`;
  return ILIKESLEEP + code;
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
  const code = `triggerMove("down");\n`;
  return ILIKESLEEP + code;
}

const left = {
  init: function () {
    this.appendEndRowInput('left')
      .appendField('left');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('going to move left');
    this.setHelpUrl('');
    this.setColour(225);
  }
};
Blockly.common.defineBlocks({ left: left });
javascriptGenerator.forBlock['left'] = function (block, generator) {
  const code = `triggerMove("left");\n`;
  return ILIKESLEEP + code;
}

const right = {
  init: function () {
    this.appendEndRowInput('right')
      .appendField('right');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('going to move right');
    this.setHelpUrl('');
    this.setColour(225);
  }
};
Blockly.common.defineBlocks({ right: right });
javascriptGenerator.forBlock['right'] = function (block, generator) {
  const code = `triggerMove("right");\n`;
  return ILIKESLEEP + code;
}

const shape1 = {
  init: function () {
    this.appendEndRowInput('shape1')
      .appendField('shape1');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('change color shape to T');
    this.setHelpUrl('');
    this.setColour(225);
  }
};
Blockly.common.defineBlocks({ shape1: shape1 });
javascriptGenerator.forBlock['shape1'] = function (block, generator) {
  const code = ` triggerSelectShape('T');\n`;
  return ILIKESLEEP + code;
}

const shape2 = {
  init: function () {
    this.appendEndRowInput('shape2')
      .appendField('shape2');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('change color shape to L');
    this.setHelpUrl('');
    this.setColour(225);
  }
};
Blockly.common.defineBlocks({ shape2: shape2 });
javascriptGenerator.forBlock['shape2'] = function (block, generator) {
  const code = ` triggerSelectShape('L');\n`;
  return ILIKESLEEP + code;
}

const MoveTo = {
  init: function () {
    this.appendEndRowInput('')
      .appendField('MoveTo');
    this.appendValueInput('PositionX')
      .setCheck('Number')
      .appendField('PositonX');
    this.appendValueInput('PositionY')
      .setCheck('Number')
      .appendField('PositonY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('type the position the block will move to');
    this.setHelpUrl('');
    this.setColour(225);
  }
};

Blockly.common.defineBlocks({ MoveTo: MoveTo });
javascriptGenerator.forBlock['MoveTo'] = function (block, generator) {
  // TODO: change Order.ATOMIC to the correct operator precedence strength
  const PositionX = generator.valueToCode(block, 'PositionX', Order.ATOMIC);

  // TODO: change Order.ATOMIC to the correct operator precedence strength
  const PositionY = generator.valueToCode(block, 'PositionY', Order.ATOMIC);

  // TODO: Assemble javascript into the code variable.
  const code = `triggerMoveTo(${PositionX},${PositionY});\n`;
  return ILIKESLEEP + code;
}


const check = {
  init: function () {
    this.appendDummyInput('check')
      .setAlign(Blockly.inputs.Align.RIGHT)
      .appendField('check');
    this.setOutput(true, 'String');
    this.setTooltip('check the information of current block');
    this.setHelpUrl('');
    this.setColour(225);
  }
};
Blockly.common.defineBlocks({ check: check });
javascriptGenerator.forBlock['check'] = function (block, generator) {
  const code = `triggerCheck()\n`;
  return [code, Order.NONE];
}
