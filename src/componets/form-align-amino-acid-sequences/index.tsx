import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import { ConfigProvider, Form, type FormInstance } from "antd";
import type { IFormAlignAminoAcidSequences } from "../../types";
import { FormInput } from "../../ui/form-Input";

interface IFormAlignAminoAcidSequencesProps {
  form: FormInstance<IFormAlignAminoAcidSequences>;
}

function FormAlignAminoAcidSequences(props: IFormAlignAminoAcidSequencesProps) {
  const cn = bem("FormAlignAminoAcidSequences");
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0e485a",
        },
      }}
    >
      <Form
        form={props.form}
        className={cn()}
        layout="vertical"
        // для общей ошибки
        onFieldsChange={() => {
          props.form.resetFields(["generalErrors"]);
        }}
      >
        <Form.Item
          name="firstAminoAcidSequences"
          label="Первая аминокислотная последовательность"
          rules={[
            {
              required: true,
              message: "Введите аминокислотную последовательность",
            },
          ]}
        >
          <FormInput
            placeholder="Введите аминокислотную последовательность"
            form={props.form}
          />
        </Form.Item>
        <Form.Item
          name="secondAminoAcidSequences"
          label="Вторая аминокислотная последовательность"
          rules={[
            {
              required: true,
              message: "Введите аминокислотную последовательность",
            },
          ]}
        >
          <FormInput
            placeholder="Введите аминокислотную последовательность"
            form={props.form}
          />
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
}

export default memo(FormAlignAminoAcidSequences);
