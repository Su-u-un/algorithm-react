import { Input,Modal } from "antd";
import DropdownInput from "../DropdownInput";
import React, {
    forwardRef,
    useEffect,
    useState,
} from "react";
import type { ModalProps } from "antd";
import _ from "lodash";

interface ModalInputType extends ModalProps {
    errorInfo?: string;
    initValue?: string;
}

const ModalInputFun: React.ForwardRefRenderFunction<
    unknown,
    ModalInputType
> = (props) => {
    const { initValue,title, open, onOk, onCancel  } = props;

    const [value, setValue] = useState<string>(""); // 值

    useEffect(() => {
        if (initValue) setValue(initValue);
      }, [initValue]);

    return (
        <Modal title={title} open={open} onOk={onOk} onCancel={onCancel}>
            <DropdownInput 
                initValue={value}
                onPressEnter={(e) => onOk?.(e)}
                onBlur={(e) => onOk?.(e)}
            />
        </Modal>
    )
};

export default forwardRef(ModalInputFun);