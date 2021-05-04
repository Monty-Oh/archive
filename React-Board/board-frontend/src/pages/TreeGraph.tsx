import React from 'react';
import Tree from 'react-d3-tree';
import styled from 'styled-components';
import Responsive from '../components/common/Responsive';

const WrapperBlock = styled(Responsive)`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  height: 20rem;
`;

const TreeWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

// Tree 구조 설정
const nodeSvgShape = {
  shape: 'rect',
  shapeProps: {
    width: 20,
    height: 20,
    y: -20,
    x: -20,
  },
};

function TreeGraph() {
  const children_nodes = [
    {
      name: 'Frontend',
      children: [
        {
          name: 'test3',
        },
        {
          name: 'test4',
        },
      ],
    },
    {
      name: 'Backend',
      children: [
        {
          name: 'test3',
        },
        {
          name: 'test4',
        },
      ],
    },
  ];

  // 트리 루트
  const Root = [
    {
      name: 'Root',
      children: children_nodes,
    },
  ];

  return (
    /* <Tree /> will fill width/height of its container; in this case `#treeWrapper` */
    // <div id="treeWrapper" style={{width: '50em', height: '20em'}}>
    <WrapperBlock>
      <TreeWrapper>
        <Tree
          data={Root}
          orientation="horizontal"
          pathFunc="elbow"
          nodeSvgShape={nodeSvgShape}
          zoomable={true}
          collapsible={true}
          translate={{ x: 30, y: 150 }}
          initialDepth={1}
        />
      </TreeWrapper>
    </WrapperBlock>
  );
}

export default TreeGraph;
