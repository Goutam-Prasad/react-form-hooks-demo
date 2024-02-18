import React, { forwardRef } from 'react';
import { Input, InputProps } from 'antd';

interface ITextInput extends InputProps {
    label: string;
    validation?: boolean;
    validationMessage?: string;
    className?: string;
    style?: React.CSSProperties;
    register?:any;
    name?:string;
    errors?:any
}
const TextInput:  React.FC< ITextInput> =(({ label, validation, validationMessage='', className, style, ...props }) => {
    console.log({props})
    return (
        <div className="flex flex-col gap-2">
            <Input className={className} style={style} {...props} />
        </div>
    );
})
export default TextInput;