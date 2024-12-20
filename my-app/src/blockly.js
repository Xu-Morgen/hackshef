import React, { useEffect, useRef, useState } from "react";
import * as Blockly from 'blockly/core';
import * as libraryBlocks from 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';
import * as En from 'blockly/msg/en';

function BlocklyComponent({ toolboxConfig, initialXml, onWorkspaceChange, setCommand, workspaceRef, command }) {
  const blocklyDiv = useRef(null); // Blockly 工作区的 DOM 容器

  useEffect(() => {
    // 初始化工作区
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolboxConfig, // 工具箱配置
      grid: {
        spacing: 20, // 网格间距
        length: 3,   // 网格线长度
        colour: "#ccc", // 网格颜色
        snap: true,  // 是否启用吸附
      },
    });

    // 加载初始 XML 数据
    if (initialXml) {
      Blockly.Xml.domToWorkspace(
        Blockly.utils.xml.textToDom(initialXml),
        workspaceRef.current
      );
    }

    // 监听工作区变化
    const workspace = workspaceRef.current;
    workspace.addChangeListener(() => {
      // 获取并更新工作区中的 JavaScript 代码
      const generatedCode = javascriptGenerator.workspaceToCode(workspace);
      setCommand(generatedCode)
      // // 如果有传入 onWorkspaceChange 回调，则调用它
      // if (onWorkspaceChange) {
      //   const xml = Blockly.Xml.workspaceToDom(workspace);
      //   onWorkspaceChange(Blockly.Xml.domToText(xml));
      // }
    });

    return () => {
      // 销毁工作区实例
      workspace.dispose();
    };
  }, [toolboxConfig, initialXml, onWorkspaceChange]);

  return (
    <div>
      <div ref={blocklyDiv} style={{ height: "500px", width: "100%" }} />
    </div>
  );
};

export default BlocklyComponent;
