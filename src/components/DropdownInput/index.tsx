// DropdownInput组件
import { Dropdown, Input } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { InputProps } from "antd";
import _ from "lodash";

interface DropdownInputType extends InputProps {
  errorInfo?: string;
  initValue?: string;
  placement?: any;
}

const DropdownInputFun: React.ForwardRefRenderFunction<
  unknown,
  DropdownInputType
> = (props, ref) => {
  const { errorInfo, initValue, placement, onChange, onBlur, onPressEnter } = props;
  // 判断是否弹出错误
  const [open, setOpen] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("请输入中英文数字及下划线横线");
  const [value, setValue] = useState<string>(""); // 值

  const inputRef = useRef<any>(null);

  useImperativeHandle(ref, () =>({
    focus:()=>{
      inputRef && inputRef.current.focus()
    }
    }));

  useEffect(() => {
    if (initValue) setValue(initValue);
  }, [initValue]);

  useEffect(() => {
    if (errorInfo) setErrorText(errorInfo);
  }, [errorInfo]);

  /** 监听输入报错 */
  const handleChange = _.debounce((e: any, isSure = false) => {
    const { value } = e?.target;
    const reg = /^[a-zA-Z0-9_\-\u4e00-\u9fa5]+$/;
    if (!reg.test(value)&&value) {
      setOpen(true);
    } else {
      setOpen(false);
      onChange?.(value);
    }
  }, 300);

  return (
    <Dropdown
      overlay={
        <div
          style={{
            background: "#fff",
            padding: "8px 12px",
            height: 20,
            boxShadow: "0px 2px 12px 0px rgba(0,0,0,0.06)",
          }}
        >
          {errorText}
        </div>
      }
      placement={props.placement?props.placement:'bottomLeft'}
      open={open}
    >
            <Input
                ref={inputRef}
                value={value}
                onChange={(e) => {
                    e?.persist();
                    setValue(e?.target?.value);
                    handleChange(e);
                }}
                onBlur={(e) => {
                    !open && onBlur?.(e);
                }}
                onPressEnter={(e: any) => {
                    !open && onPressEnter?.(e);
                }}
                style={{ width: 80, borderColor: open ? "red" : "" }}
            />
      
    </Dropdown>
  );
};

export default forwardRef(DropdownInputFun);