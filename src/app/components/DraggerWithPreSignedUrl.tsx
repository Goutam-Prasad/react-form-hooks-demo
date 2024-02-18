import React from "react";
import { useFormContext, useController } from "react-hook-form";
import { Upload, Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Image from "next/image";
import Dragger from "antd/es/upload/Dragger";
const DraggerWithPreSignedURLWrapper = ({ label, name, disabled, ...props }:any) => {
    console.log({data:useFormContext()})
  const { control, setValue, getValues } = useFormContext();
  const { field } = useController({ name, control });
  console.log({field,name})
  
  const customUploadReqHandler = async (options:any) => {
    const file = options?.file;
    if (!file) {
      // Handle error if no file is selected
      return;
    }

    try {
      setValue(name, [
        {
          Key: "exampleKey",
          name: file?.name ?? "",
          MIMEType: file?.type ?? "",
          size: file?.size ?? null,
        },
      ]);
      console.log(getValues(name))
    } catch (error) {
      console.error(error);
    }
  };

  const removeDocument = (index:any) => {
    const files = getValues()[name].filter((_:any, i:any) => i !== index);
    setValue(name, files);
  };

  return (
    <div className={["mt-0 my-5", props.divClasses].join(" ")}>
      <label className="formikLabel">{label}</label>
      <div className={"mt-1.5 relative"}>
        <Dragger
          showUploadList={false}
          className="bulk-wrapper-dragger my-1 w-full"
          customRequest={(options) => customUploadReqHandler(options)}
        >
          <div className="flex flex-col justify-center">
            {/* <Image alt="" className="w-10 mx-auto mb-3" src={uploadImageIcon} /> */}
            <p className="text-sm text-[#475467] font-normal mb-1">
              <span className="text-[#405CD2] font-semibold">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-[#475467] text-xs">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </Dragger>
        <div className="flex flex-col">
          {field?.value?.map((item:any, index:any) => (
            <Card
              className="mt-2 border-[1px] border-gray-400"
              key={item.Key}
            >
              <h4 className="flex justify-between align-center overflow-hidden">
                <span className={"select-none w-11/12"}>{item.name} </span>
                <span
                  onClick={() => {
                    removeDocument(index);
                  }}
                  className="cursor-pointer"
                >
                  <DeleteOutlined />
                </span>
              </h4>
            </Card>
          ))}
        </div>
        {/* {field?.ref?.current?.touched && field?.ref?.current?.error && (
          <div className="formikError" style={{ position: "absolute" }}>
            {field.ref.current.error.message}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default DraggerWithPreSignedURLWrapper;
