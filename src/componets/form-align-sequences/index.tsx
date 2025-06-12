import { memo, useCallback } from "react";
import { cn as bem } from "@bem-react/classname";
import { ConfigProvider, Form, type FormInstance } from "antd";
import type { IFormAlignSequences } from "../../types";
import "./style.less";
import { FormInput } from "../../ui/form-Input";
import FormControl from "../../ui/form-control";

interface IFormAlignSequencesProps {
  form: FormInstance<IFormAlignSequences>;
  onSubmit: (values: IFormAlignSequences) => void;
}

function FormAlignSequences(props: IFormAlignSequencesProps) {
  const callbacks = {
    onReset: useCallback(() => {
      props.form.resetFields();
    }, []),
  };

  const cn = bem("FormAlignSequences");

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0e485a",
        },
      }}
    >
      <Form
        className={cn()}
        layout="vertical"
        form={props.form}
        onFinish={props.onSubmit}
        // для общей ошибки
        onFieldsChange={() => {
          props.form.resetFields(["generalErrors"]);
        }}
      >
        <h2>Форма</h2>
        <Form.Item
          name="first"
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
          name="second"
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
        <FormControl
          successTitle="Запустить выравнивание"
          cancelTitle="Отменить"
          onCancel={callbacks.onReset}
        />
      </Form>
    </ConfigProvider>
  );
}

export default memo(FormAlignSequences);
