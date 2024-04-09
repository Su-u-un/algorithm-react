import React, { useEffect, useRef, useState } from 'react';
import { Tree, Button, Input, Space, Dropdown, Menu, message } from 'antd';
import { useMount } from 'react-use';
import styles from './Left.module.less'
import DropdownInput from "../DropdownInput";
import { useDispatch } from 'react-redux';
import {setFolder} from '../../store/current'
import { FormOutlined, DeleteOutlined, DashOutlined } from '@ant-design/icons'
import { getUserInfo } from '../../util/auth';
import axios from 'axios'
import _ from 'lodash';

const { DirectoryTree } = Tree


const Left: React.FC = () => {
  // 目录数据
  // 树数据
  const [treeData, setTreeData] = useState<any>()
  const refInput = useRef<any>(null);
  const [expandedKeys, setExpandedKeys] = useState<any[]>([]);

  const dispatch = useDispatch();

  // 发出通知
  const info = (mes) => {
    message.info(mes);
  };

  // 从后端获取文件数据并处理
  useEffect(() => {
    const temp = JSON.parse(getUserInfo()!)
    // const obj = {}
    // temp.forEach(item => {
    //     const { folder_name, algo_type,id } = item;
    //     if (!obj[algo_type]) {
    //         obj[algo_type] = [];
    //     }
    //     obj[algo_type].push(folder_name);
    // });
    // let arr: any = []

    // Object.keys(obj).forEach((key: string) => {
    //   let temp: any = {}
    //   temp.title = key
    //   temp.key = key
    //   temp.isInput = false
    //   temp.selectable = false
    //   temp.children = obj[key].map((item: string) => {
    //     return {
    //       title: item,
    //       key: item,
    //       isInput: false,
    //       isLeaf: true,
    //       propKey: key
    //     }
    //   })
    //   arr.push(temp)
    // })
    const arr = temp.reduce((acc, cur) => {
      const existingType = acc.find(item => item.title === cur.algo_type);
      if (existingType) {
          existingType.children.push({
             title: cur.folder_name,
             key:cur.folder_name, 
             id: cur.id,isLeaf: true,
             propKey:cur.algo_type 
            });
      } else {
          acc.push({ 
            title: cur.algo_type, 
            selectable: false,
            isInput: false, 
            children: [{ 
              title: cur.folder_name,
              key:cur.folder_name, 
              id: cur.id,
              isLeaf: true,
              propKey:cur.algo_type 
            }] 
          });
      }
      return acc;
  }, []);
    setTreeData(arr)
  }, [])

  // ============
  // 编辑节点
  // ============
  const editItem = (node: any) => {
    const data = editTreeItem(treeData, node?.key);
    setTreeData(data);
    setTimeout(() => refInput.current.focus(), 10);
  };
  // 节点呈编辑状态
  const editTreeItem: any = (tree: any, key: string) => {
    return _.map(tree, (item: any) => {
      if (item?.key === key) {
        item.isInput = true;
        return item;
      } else if (item?.children) {
        return { ...item, children: editTreeItem(item?.children, key) };
      }
      return item;
    });
  };

  // ===============
  // 删除节点
  // ===============
  const delItem = (node: any) => {
    const data = deleteNodeByKey(treeData, node?.key);
    setTreeData(data);
  }
  // 删除数据内节点并返回
  const deleteNodeByKey: any = (treeData: any, keyToDelete: string) => {
    return _.map(treeData, (node) => {
      if (node.key === keyToDelete) {
        // 如果节点的key匹配要删除的key，则返回undefined，表示不包括该节点
        return undefined;
      } else if (node.children) {
        // 如果节点有子节点，则递归处理子节点
        return {
          ...node,
          children: deleteNodeByKey(node.children, keyToDelete),
        };
      }
      return node; // 其他情况下返回原始节点
    }).filter(Boolean); // 过滤掉undefined的节点
  };

  // ===========
  // 添加节点
  // ===========
  const addItem = (node: any) => {
    const len = node?.children?.length;
    // 插入节点isInput为true，渲染节点的判断条件
    const newChild = [
        {
          isInput: true,
          key: `${node?.key}_${len}`,
          isAdd: true,
          isLeaf:true
        },
        ...node.children,
      ];
    const data = updateTreeData(treeData, node, newChild);
    setTreeData(data);
    if(!expandedKeys?.includes(node?.key))
    {
      const expands = [node?.key, ...expandedKeys];
      setExpandedKeys(expands);
    }
    setTimeout(() => refInput.current.focus(), 10);
  };
  // 更新树数据
  const updateTreeData = (tree: any, target: any, children: any) => {
    return tree.map((node: any) => {
      if (node.key === target.key) {
        return { ...node, children };
      } else if (node?.children) {
        return {
          ...node,
          children: updateTreeData(node?.children, target, children),
        };
      }
      return node;
    });
  };

  // =====================
  // 监听添加节点的输入
  // =====================
  const onEnter = (e: any, node: any) => {
    const value = e?.target?.value;

    if (!value) {
      // 输入内容为空就回车，直接删除编辑框的节点
      const dele = deleteNodeByKey(treeData, node?.key);
      setTreeData(dele);
      return;
    }
    // 如果和已有文件重名，不允许使用
    const arr = JSON.parse(getUserInfo()!)
    const obj:any = {}
    arr.forEach(item => {
        const { folder_name, algo_type,id } = item;
        if (!obj[algo_type]) {
            obj[algo_type] = [];
        }
        obj[algo_type].push(folder_name);
    });
    let items = {}
    let temp = node.propKey
    // 没有prop说明是从父节点击，说明是新增节点的onEnter
    if(!node.propKey){
      temp = node?.key.split('_')[0]
      items = obj[temp]
    }
    else items = obj[node.propKey]

    // 这里不能用forEach，因为forEach使用return无效。只会跳出当前循环
for (const item of items) {
  if (item === value && item !== node.key) {
    info('文件名不能重名');
    return;
  }
}
    // 有输入内容就更新
      const data = updateItem(treeData, node?.key, value,temp);
      setTreeData(data);
  };
  // updateItem 
  // 根据key 找到正在输入的节点，将输入内容更新到title（显示节点的名字），并删除之前的isInput属性
  const updateItem: any = ( tree: any, key: string, data: any,propKey:any) => {
    return _.map(tree, async (item: any) => {
      if (item?.key === key) {
        item.title = data;
        item.key = data
        // 存在说明是新增节点
        if(propKey) {
          item.propKey = propKey
          const response = await axios.post('http://localhost:3000/file/add',{
            'foldername':key,
            'username':"www",
            'filename':propKey
          });
        }else{
          const response = await axios.post('http://localhost:3000/file/add',{
            'foldername':key,
            'username':"www",
            'filename':propKey
          });
        }
        return _.omit(item, "isInput");
      } else if (item?.children) {
        return { ...item, children: updateItem(item?.children, key, data,propKey) };
      }
      return item;
    });
  };

  // title渲染
  const titleRender = (node) => {
    const { title, key, isInput } = node;
    if (isInput)
      return (
        <span>
          <DropdownInput
            ref={refInput}
            initValue={title}
            onPressEnter={(e) => onEnter(e, node)}
            onBlur={(e) => onEnter(e, node)}
          />
        </span>
      )
    return (
      <span
        key={key}
        className="titleRoot"
      >
        <span>{title}</span>
        <Dropdown overlay={() => (
          <Menu
            onClick={(e) => {
              if (e?.key === "add") addItem(node);
              if (e?.key === "edit") editItem(node);
              if (e?.key === "del") delItem(node);
            }}
          >
            {
              node.isLeaf
                ?
                <>
                  <Menu.Item key="del">刪除</Menu.Item>
                  <Menu.Item key="edit">编辑</Menu.Item>
                </>
                :
                <Menu.Item key="add">新增</Menu.Item>
            }
          </Menu>
        )} trigger={["click"]}>
          <Button shape="circle" size={"small"} onClick={(e) => e.stopPropagation()} icon={<DashOutlined />}></Button>
        </Dropdown>
      </span>
    );
  }


  const onSelect = async (keys,info) => {
    const { key, propKey } = info.node
    // 点击拿到文件内容，存入store，代码区读取store，渲染代码并且build
    const res = await axios.get('http://localhost:3000/file/readfile',{params:{
            'foldername':key,
            'username':"www",
            'algotype':propKey
          }});
    dispatch(setFolder([res.data.data,res.data.id]))

  };

  const onExpand = (keys) => {
    setExpandedKeys(keys);
  };

  return (
    <div className={styles.outer}>
      <DirectoryTree
        expandedKeys={expandedKeys}
        onExpand={onExpand}
        treeData={treeData}
        onSelect={onSelect}
        titleRender={titleRender}
      />
    </div>
  );
};

export default Left;