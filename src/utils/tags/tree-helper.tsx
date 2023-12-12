/* eslint-disable  */
import { Tree, Typography } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

interface TreeNode {
  title: JSX.Element;
  key: string;
  children?: TreeNode[];
}
// function list_to_tree(
//   list: { name: string; id: string; parentId: string | null }[]
// ): TreeNode[] {
//   let map = {},
//     node,
//     roots = [],
//     i;
//
//   for (i = 0; i < list.length; i += 1) {
//     map[list[i].id] = i; // initialize the map
//     list[i].children = []; // initialize the children
//   }
//
//   for (i = 0; i < list.length; i += 1) {
//     node = { ...list[i], title: list[i].name, key: list[i].id };
//     if (node.parentId !== null) {
//       list[map[node.parentId]].children.push(node);
//     } else {
//       roots.push(node);
//     }
//   }
//   return roots;
// }

function buildTree(
  nodes: {
    name: string;
    description?: string | null;
    id: string;
    parentId: string | null;
  }[]
): TreeNode[] {
  const nodeMap = new Map<string, TreeNode>();
  const navigate = useNavigate();

  // First pass: create nodes without parent-child relationships
  for (const { name, id, description } of nodes) {
    const node: TreeNode = {
      title: (
        <Typography.Paragraph style={{ color: '#999' }}>
          <Typography.Link
            onClick={() => {
              navigate(`/app/scheme-settings/crime-types/view/${id}`);
            }}
          >
            {name}
          </Typography.Link>
          {description ? ` (${description})` : ``}
        </Typography.Paragraph>
      ),

      key: id,
    };
    nodeMap.set(id, node);
  }

  // Second pass: establish parent-child relationships
  for (const { id, parentId } of nodes) {
    const node = nodeMap.get(id);
    if (parentId) {
      const parent = nodeMap.get(parentId);
      if (parent && node) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(node);
      }
    }
  }

  // Find the roots (nodes without a parentId)
  const roots: TreeNode[] = [];
  for (const node of nodeMap.values()) {
    if (!nodeMap.has(node.key)) continue; // Skip if the node was already processed as a child
    const parentId = nodes.find((n) => n.id === node.key)?.parentId;
    if (!parentId) {
      roots.push(node);
    }
  }

  return roots;
}
const BuildTree = ({
  InitData,
  updateTagParent,
  draggable = true,
}: {
  InitData: { parentId: string | null; id: string; name: string }[];
  updateTagParent: (tagId: string, parentTagId: string | null) => void;
  draggable?: boolean;
}) => {
  const newTree = buildTree(InitData) as DataNode[];
  const [gData, setGData] = useState<DataNode[]>([]);

  useEffect(() => {
    if (gData.length === 0) setGData(newTree);
  }, [InitData]);
  // const [expandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0']);

  const onDrop: TreeProps['onDrop'] = (info) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: DataNode[],
      key: React.Key,
      callback: (node: DataNode, i: number, data: DataNode[]) => void
      // eslint-disable-next-line consistent-return
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...gData];

    // Find dragObject
    let dragObj: DataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else if (
      ((info.node as any).props.children || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar: DataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setGData(data);
    updateTagParent(
      info.dragNode.key as string,
      info.dropToGap ? null : (info.node.key as string)
    );
  };

  return (
    <Tree
      className="draggable-tree"
      // defaultExpandedKeys={expandedKeys}
      draggable={draggable}
      blockNode={draggable}
      onDrop={onDrop}
      treeData={gData}
    />
  );
};

export default BuildTree;
