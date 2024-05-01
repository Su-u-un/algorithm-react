import React, { useEffect, useRef, useState } from 'react';
import { Tree, Button, Dropdown, Menu, message, Modal,Input } from 'antd';
import styles from './Menu.module.less'
import DropdownInput from "../DropdownInput";
import { useDispatch,useSelector } from 'react-redux';
import { getUserInfo,setFileInfo } from '../../util/auth'
import { setFolder } from '../../store/current'
import { DashOutlined } from '@ant-design/icons'
import file from '../../api/file';
import _ from 'lodash';

const { DirectoryTree } = Tree
interface MenuProps {
  data?: any;
  type?:any;
}

const BaseMenu: React.FC<MenuProps> = (props) => {
  const {confirm} = Modal;
  // 目录数据
  const data = props.data
  const type = props.type

  const username = JSON.parse(getUserInfo()!)
  const tt = useSelector((state: any) => state.current)

  // 树数据
  const [treeData, setTreeData] = useState<any>()
  const refInput = useRef<any>(null);
  const [expandedKeys, setExpandedKeys] = useState<any[]>([]);

  // 新建算法类
  const [show,setShow] = useState(false)
  const [algoVal,setAlgoVal] = useState("")
  const [err,setErr] = useState(false)

  const dispatch = useDispatch();

  // 发出通知
  const info = (mes) => {
    message.info(mes);
  };

  // 处理传入的文件数据
  useEffect(() => {
    const arr = data.map((item: any) => {
      return { title: item.algo_type, key: item.algo_type, id: item.id, selectable: false, isInput: false}
    })
    setTreeData(arr)
  }, [])

  // 判断对象数组内是否存在key
  const hasKey = (arr:any, key:string, showKey:boolean = false) => {
    if(showKey){
      return {
        res:arr.some(item => item.key === key),
        key:key
      }
    }
    return arr.some(item => item.key === key)
  }

  // ============
  // 创建新算法类
  // ============
  const addAlgo = async () => {
    if(err){
      info('请输入合法的文件夹名')
    }// 判断是否已存在该文件夹名称
    else if(hasKey(data,algoVal)){
        info('该文件夹已存在')
    }else{
      const res = await file.saveAlgo({id:null,algotype:algoVal,username:username})
      // 插入节点isInput为true，渲染节点的判断条件
      const temp = {
            title: algoVal,
            id:res.data.insertId,
            isInput: false,
            key: algoVal,
            selectable: false
          };
      setTreeData([temp, ...treeData]);
      if(!expandedKeys?.includes(algoVal))
      {
        const expands = [algoVal, ...expandedKeys];
        setExpandedKeys(expands);
      }
      setShow(false)
      // 重新保存storage内的数据
      file.list({username:username}).then((res: any) => {
        setFileInfo(JSON.stringify(res.data))
      })
    }
  }
  // 监听输入报错 
  const handleChange = _.debounce((e: any, isSure = false) => {
    const { value } = e?.target;
    const reg = /^[a-zA-Z0-9_\-\u4e00-\u9fa5]+$/;
    if (!reg.test(value)) {
      setErr(true);
    } 
    else {
      setErr(false);
    }
  }, 300);


  // ============
  // 编辑节点
  // ============
  const editItem = (node: any) => {
    setTreeData(origin=>editTreeItem(origin, node?.key));
    setTimeout(() => refInput.current.focus(), 10);
  };
  // 节点呈编辑状态:展示输入框、不可点击
  const editTreeItem: any = (tree: any, key: string) => {
    return _.map(tree, (item: any) => {
      if (item?.key === key) {
        item.isInput = true;
        item.selectable = false;
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
    confirm({
      title:'',
      content:'确认删除吗?',
      okText:'确认',
      cancelText:'取消',
      onOk:()=>{
        setTreeData(deleteNodeByKey(treeData, node?.key));
      }
    });
  }
  // 删除数据内节点并返回
  const deleteNodeByKey: any = (treeData: any, keyToDelete: string) => {
    return _.map(treeData, (node) => {
      if (node.key === keyToDelete) {
        // 数据库操作删除
        // 判断是不是树节点，进行不同的删除
        if(node.isLeaf){
          file.deleteFolder({id:node.id})
        }else{
          file.deleteAlgo({id:node.id})
        }
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
  const addItem = async (node: any) => {
    // 获取数据库中文件夹的当前最大id
    const len = await file.getFileID()
    // 插入节点isInput为true，渲染节点的判断条件
    const tempChild = [
        {
          isInput: true,
          id: len.data+1,
          isAdd: true,
          isLeaf:true,
          selectable: false,
          propKey:node.key
        },
        ...node.children,
      ];
    setTreeData(origin=>updateTreeData(origin, node.key, tempChild));
    if(!expandedKeys?.includes(node?.key))
    {
      const expands = [node?.key, ...expandedKeys];
      setExpandedKeys(expands);
    }
    setTimeout(() => refInput.current.focus(), 10);
  };
  // 更新树数据
  const updateTreeData = (tree: any, key: any, children: any) => {
    return tree.map((node: any) => {
      if (node.key === key) {
        return { ...node, children: children };
      } else if (node?.children) {
        return {
          ...node,
          children: updateTreeData(node?.children, key, children),
        };
      }
      return node;
    });
  };

  // =====================
  // 监听添加节点的输入
  // =====================
  const onEnter = (e: any, node: any) => {
    // 得到输入值
    const value = e?.target?.value;
      // 对新增节点或是编辑节点进行区分
      if(node?.isAdd){
        // 新增节点若输入值空，则删除
        if (!value ) {
          setTreeData(deleteNodeByKey(treeData, node?.key));
          return;
        }
        // 新增节点若重名，则提示（新增节点只会是叶子节点）
        // 得到当前叶子的父节点
        const tree = treeData.find((item: any) => item.key === node.propKey);
        // 判断它的兄弟叶子
        if(hasKey(tree.children,value)){
          info('文件名不能重名');
          return;
        }
      }else{
        // 编辑节点若输入值空，则提示
        if(!value) {
          info('文件名不能为空');
          return;
        }
        // 编辑节点若重名，则提示
        // 先判断是不是根节点的编辑
        if(node.isLeaf){
          // 得到当前叶子的父节点
          const tree = treeData.find((item: any) => item.key === node.propKey);
          // 判断它的兄弟叶子，不和兄弟和重名但是和自己重名
          if(hasKey(tree.children,value,true).res && hasKey(tree.children,value,true).key !== node.key){
            info('文件名不能重名')
            return;
          }
        }else{
          if(hasKey(data,value)){
            info('文件名不能重名');
            return;
          }
        }
      }

    // 有输入内容就更新
      setTreeData(updateItem(treeData, node, value));
      // 重新保存storage内的数据
      file.list({username:username}).then((res: any) => {
        setFileInfo(JSON.stringify(res.data))
      })
  };
  // updateItem 
  // 根据key 找到正在输入的节点，将输入内容更新到title（显示节点的名字），并删除之前的isInput属性
  const updateItem: any = ( tree: any, node: any, value: any) => {
    return _.map(tree, (item: any) => {
      
      if (item?.key === node.key) {
        // 如果是新增叶子
        if(node.isAdd){
          // 通过propKey找到树的id
          const algoid = data.find(item=>item.algo_type === node.propKey).id
          file.saveFolder({algoid:algoid,id:node.id,foldername:value})
        }
        // 否则是编辑
        else{
          // 如果是编辑叶子
          if(node.isLeaf){
            // 通过propKey找到树的id
            const algoid = data.find(item=>item.algo_type === node.propKey).id
            file.saveFolder({algoid:algoid,id:node.id,foldername:value})
          }
          // 否则是编辑树
          else{
            file.saveAlgo({id:node.id,algotype:value,username:username})
          }
        }
        item.title = value;
        item.key = value;
        return _.chain(item).omit("isInput","isAdd").set("selectable", true).value();
      } else if (item?.children) {
        return { ...item, children: updateItem(item?.children, node, value) };
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
            // 阻止冒泡，防止选择时展开或选中
              e.domEvent.stopPropagation()
              if (e?.key === "add") addItem(node);
              if (e?.key === "edit") editItem(node);
              if (e?.key === "del") delItem(node);
            }}
          >
              <Menu.Item key="del">刪除</Menu.Item>
              <Menu.Item key="edit">编辑</Menu.Item>
              {(node.children&&!node.isLeaf)?<Menu.Item key="add">新增</Menu.Item>:null}
          </Menu>
          )} 
          trigger={["click"]}
        >
          <Button shape="circle" size={"small"} onClick={(e) => e.stopPropagation()} icon={<DashOutlined />}></Button>
        </Dropdown>
      </span>
    );
  }

  // 叶子节点选中事件
  const onSelect = async (keys,info) => {
    const { id } = info.node
    if(id){
      // 点击拿到文件内容，存入store，代码区读取store，渲染代码并且build
      const res = await file.readFile({
        'id':id
      })
      dispatch(setFolder([res.data,id,type]))
    }
    else{
      const res = await file.readPublic({
        'algotype':info.node.propKey,
        'foldername':keys[0]
      })
      dispatch(setFolder([res.data,type]))
    }
    
  };

  // 展开项
  const onExpand = (keys) => {
    setExpandedKeys(keys);
  };

  // 点击树，异步记载叶子节点
  const onLoad = ({key}:any) => 
  new Promise<void>((resolve) => {
    // 向后端获取子文件
    let files:any = []
    treeData.forEach(async item=>{
      if(item.key === key){
        let arr = []
        if(type === 'list'){
          if(!item.id) {resolve();return;}
          const res = await file.readFolder({id:item.id})
          files = res.data
          arr = files.map((file: any) => {
            return { title: file.folder_name, key: file.folder_name, id: file.id,propKey:item.key, isLeaf: true}
          })
        }
        else{
          const res = await file.readFolderPublic({foldername:item.key})
          files = res.data
          arr = files.map((file: any) => {
            return { title: file.folder_name, key: file.folder_name, propKey:item.key,isLeaf: true}
          })
        }
        setTreeData(origin=>updateTreeData(origin,key,arr))
      }
    })
    resolve()
  })

  return (
    <div className={styles.outer}>
      {
        type === 'list'
        ?
        <>
          <Button onClick={()=>setShow(true)} style={{margin:'10px 67px'}}>add new algo</Button>
          <Modal title="请输入文件夹名称" open={show} onOk={addAlgo} onCancel={()=>setShow(false)}>
            <Input 
              value={algoVal}
              onChange={(e) => {
                  e?.persist();
                  setAlgoVal(e?.target?.value);
                  handleChange(e);
              }}
              style={{ borderColor: err ? "red" : "" }}
            />
          </Modal>
          <DirectoryTree
            expandedKeys={expandedKeys}
            onExpand={onExpand}
            treeData={treeData}
            onSelect={onSelect}
            loadData={onLoad}
            titleRender={titleRender}
          />
        </>
        :
        <DirectoryTree
          treeData={treeData}
          expandedKeys={expandedKeys}
          onExpand={onExpand}
          onSelect={onSelect}
          loadData={onLoad}
        />
      }
    </div>
  );
};

export default BaseMenu;