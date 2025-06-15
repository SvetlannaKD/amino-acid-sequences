import { memo, forwardRef, useEffect, type ChangeEventHandler } from 'react';
import { cn as bem } from '@bem-react/classname';
import type { valueType } from 'antd/es/statistic/utils';
import './style.less';
import { ConfigProvider, Input, type FormInstance, type InputRef } from 'antd';

interface FormInputProps {
  placeholder?: string;
  size?: 'large' | 'middle' | 'small';
  id?: string; // Form передает сама
  value?: valueType; // Form передает сама
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined; // Form передает сама
  initValue?: string;
  form?: FormInstance;
}

const FormInputComponent = forwardRef<InputRef, FormInputProps>((props, ref) => {
  const { size = 'large' } = props;

  // Инициализируем и устанавливаем дефолтное значение в поле инпута
  useEffect(() => {
    if (!props.form || !props.initValue) {
      return;
    }
    props.form.setFieldValue(props.id, props.initValue);
    if (props.initValue) {
      props.form.validateFields([props.id]); // валидация одного поля инпута
    }
  }, [props.initValue]);

  const cn = bem('FormInput');

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Golos Text, sans-serif',
          colorText: '#1A2028',
          colorTextPlaceholder: '#8C8C8C',
          colorBorder: '#ececec',
        },
      }}
    >
      <Input
        className={cn()}
        ref={ref}
        placeholder={props.placeholder}
        size={size}
        onChange={props.onChange}
        value={props.value}
        maxLength={200}
      />
    </ConfigProvider>
  );
});

FormInputComponent.displayName = 'FormInputComponent';

export const FormInput = memo(FormInputComponent);
