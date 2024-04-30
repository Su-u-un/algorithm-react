import { Input } from "antd";
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import type { InputProps } from "antd";
import _ from "lodash";

interface TitleInputType extends InputProps {
    errorInfo?: string;
    initValue?: string;
}

const TitleInputFun: React.ForwardRefRenderFunction<
    unknown,
    TitleInputType
> = (props, ref) => {
    const { errorInfo, initValue, onChange, onBlur, onPressEnter } = props;
    // 判断是否弹出错误
    const [open, setOpen] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>("请输入中英文数字及下划线横线");
    const [value, setValue] = useState<string>(""); // 值

    const inputRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
        focus: () => {
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
        if (!reg.test(value) && value) {
            setOpen(true);
        } else {
            setOpen(false);
            onChange?.(value);
        }
    }, 300);



    return (
        <Input></Input>
    )
};


const TitleInput = forwardRef(TitleInputFun);
export default TitleInput;