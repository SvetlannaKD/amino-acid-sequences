import { memo, useRef } from 'react';
import { cn as bem } from '@bem-react/classname';
import type { ISequences } from '../../types';
import './style.less';
import AminoAcids from '../amino-acids';
import { message } from 'antd';

interface ISequencesProps {
  sequences: ISequences[] | null;
}

function Sequences(props: ISequencesProps) {
  // Внутренний стейт для сохранения ссылок на временно блокирующие последовательности
  const sequencesRef = useRef<Element[] | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const callbacks = {
    onCopySelection: async () => {
      // Снимаем блокировку с первой или второй последовательность
      sequencesRef.current?.forEach((child) => {
        if (child instanceof HTMLElement) {
          child.style.pointerEvents = 'auto';
        }
      });

      const selection = window.getSelection();
      const selectedText = selection?.toString();
      if (!selection || !selectedText) {
        return;
      }
      try {
        await navigator.clipboard.writeText(selectedText);
        messageApi.open({
          type: 'success',
          content: `Скопирована последовательность: ${selectedText}`,
          duration: 1,
          className: cn('message'),
        });
      } catch (error) {
        console.error('Не удалось скопировать: ', error);
        messageApi.open({
          type: 'error',
          content: 'Не удалось скопировать последовательность.',
          duration: 1,
        });
      }
    },
    onMouseDown: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const targetElement = event.target as HTMLButtonElement;
      const parentElement = targetElement.parentElement as HTMLDivElement;
      const children = parentElement.parentElement?.children;
      if (!children) {
        return;
      }
      const arrChildren = Array.from(parentElement.parentElement?.children);
      const classesNamesParent = parentElement.className;
      let blockClasses = '';
      if (classesNamesParent.includes('AminoAcids_first')) {
        blockClasses = 'AminoAcids_second';
      } else if (classesNamesParent.includes('AminoAcids_second')) {
        blockClasses = 'AminoAcids_first';
      }
      const filterArrChildren = arrChildren.filter((child) => child.classList.contains(blockClasses));

      // Блокируем перую или вторую последовательность (чтобы при переносе строки выделялась "1 строка")
      filterArrChildren.forEach((child) => {
        if (child instanceof HTMLElement) {
          child.style.pointerEvents = 'none';
        }
      });
      sequencesRef.current = filterArrChildren;
    },
  };

  const cn = bem('Sequences');

  return (
    <>
      {contextHolder}
      <div className={cn()}>
        <h2>Выравнивания</h2>
        <div className={cn('list')} onMouseUp={callbacks.onCopySelection} onMouseDown={callbacks.onMouseDown}>
          {props.sequences?.map((sequence) => (
            <div key={sequence.id} className={cn('item')}>
              <AminoAcids aminoAcids={sequence.first} first />
              <AminoAcids aminoAcids={sequence.first} first hide />
              <AminoAcids aminoAcids={sequence.second} second />
              <AminoAcids aminoAcids={sequence.second} second hide />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default memo(Sequences);
