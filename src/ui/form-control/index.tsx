import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.less';
import { Button, ConfigProvider, Flex } from 'antd';

interface Props {
  successTitle: string;
  cancelTitle: string;
  onCancel: () => void;
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
}

function FormControl(props: Props) {
  const { justify = 'flex-start' } = props;

  const cn = bem('FormControl');

  return (
    <ConfigProvider
      theme={{ token: { fontFamily: 'Golos Text, sans-serif', fontSize: 14 } }}
      wave={{ disabled: true }} // отключение эффекта волны (несовместим с реакт 19 - создает баг)
    >
      <Flex gap={'16px'} justify={justify}>
        <Button className={cn('button')} type="primary" htmlType="submit">
          {props.successTitle}
        </Button>
        <Button className={cn('button')} type="default" onClick={props.onCancel}>
          {props.cancelTitle}
        </Button>
      </Flex>
    </ConfigProvider>
  );
}

export default memo(FormControl);
