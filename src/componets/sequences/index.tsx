import { memo, useEffect } from 'react';
import { cn as bem } from '@bem-react/classname';
import type { ISequences } from '../../types';
import './style.less';
import AminoAcids from '../amino-acids';

interface ISequencesProps {
  sequences: ISequences[] | null;
}

function Sequences(props: ISequencesProps) {
  useEffect(() => {
    const onSelectionChange = () => {
      const selection = window.getSelection();
      const text = selection?.toString();
    };

    document.addEventListener('selectionchange', onSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', onSelectionChange);
    };
  }, []);

  const cn = bem('Sequences');

  return (
    <div className={cn()}>
      <h2>Выравнивания</h2>
      {props.sequences?.map((sequence) => (
        <div key={sequence.id} className={cn('item')}>
          <AminoAcids aminoAcids={sequence.first} first />
          <AminoAcids aminoAcids={sequence.first} first hide />
          <AminoAcids aminoAcids={sequence.second} second />
          <AminoAcids aminoAcids={sequence.second} second hide />
        </div>
      ))}
    </div>
  );
}

export default memo(Sequences);
