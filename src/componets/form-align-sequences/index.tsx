import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import { ConfigProvider, Form, type FormInstance } from 'antd';
import type { IFormAlignSequences } from '../../types';
import type { RuleObject } from 'antd/lib/form';
import type { FieldData } from 'rc-field-form/es/interface';
import './style.less';
import { FormInput } from '../../ui/form-Input';
import FormControl from '../../ui/form-control';

interface IFormAlignSequencesProps {
  form: FormInstance<IFormAlignSequences>;
  onSubmit: (values: IFormAlignSequences) => void;
}

function FormAlignSequences(props: IFormAlignSequencesProps) {
  // без useCallback (форма все жестко и так кеширует)
  const callbacks = {
    // Сбор данных всех полей в форме
    onReset: () => {
      props.form.resetFields();
    },
    // Валидация инпута
    rulesInput: (_rule: RuleObject, value: string) => {
      const aminoAcidRegex = /^[ARNDCQEGHILKMFPSTWYV-]+$/;
      if (!aminoAcidRegex.test(value)) {
        return Promise.reject(
          'Поле должно содержать только латинские буквы аминокислот (A, R, N, D, C, E, Q, G, H, I, L, K, M, F, P, S, T, W, Y, V) и символ "-".',
        );
      }
      return Promise.resolve();
    },
    // Валидация всех полей при onSubmit
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rulesSubmit: (_rule: RuleObject, _value: string) => {
      const { first, second } = props.form.getFieldsValue();
      if (!first || !second) {
        return;
      }
      if (first.length !== second.length) {
        return Promise.reject([
          'Длина введенных последовательностей в обоих полях не одинаковая',
          `В первой ${first.length} символов`,
          `Во второй ${second.length} символов`,
        ]);
      }
      return Promise.resolve();
    },
    // При изменении любого поля сбрасываем общую ошику
    onFieldsChange: (
      changedFields: FieldData<IFormAlignSequences>[],
      allFields: FieldData<IFormAlignSequences>[],
    ) => {
      if (changedFields.length === allFields.length) {
        return;
      }
      props.form.resetFields(['generalErrors']);
    },
  };

  const cn = bem('FormAlignSequences');

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0e485a',
        },
      }}
    >
      <Form
        className={cn()}
        layout="vertical"
        form={props.form}
        onFinish={props.onSubmit}
        // для общей ошибки
        onFieldsChange={callbacks.onFieldsChange}
      >
        <h2>Форма</h2>
        <Form.Item
          name="first"
          label="Первая аминокислотная последовательность"
          rules={[
            {
              required: true,
              message: 'Введите аминокислотную последовательность',
            },
            {
              validator: callbacks.rulesInput,
            },
          ]}
        >
          <FormInput placeholder="Введите аминокислотную последовательность" form={props.form} />
        </Form.Item>
        <Form.Item
          name="second"
          label="Вторая аминокислотная последовательность"
          rules={[
            {
              required: true,
              message: 'Введите аминокислотную последовательность',
            },
            {
              validator: callbacks.rulesInput,
            },
          ]}
        >
          <FormInput placeholder="Введите аминокислотную последовательность" form={props.form} />
        </Form.Item>
        <Form.Item
          className={cn('error')}
          name="generalErrors"
          shouldUpdate={true}
          rules={[
            {
              validator: callbacks.rulesSubmit,
              validateTrigger: ['onSubmit'],
            },
          ]}
        >
          <Form.ErrorList />
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
