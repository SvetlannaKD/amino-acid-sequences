import { Form } from 'antd';
import { useCallback, useState } from 'react';
import type { ISequences, IFormAlignSequences } from './types';
import { v4 as uuidv4 } from 'uuid';
import colorAminoAcidsRegex from './utils/color-amino-acids-regex';
import colorAminoAcids from './utils/color-amino-acids';
import './App.less';
import FormAlignSequences from './componets/form-align-sequences';
import Sequences from './componets/sequences';

function App() {
  const [form] = Form.useForm<IFormAlignSequences>();
  // Внутренний стейт для аминокислотных последовательностей
  const [sequences, setSequences] = useState<ISequences[] | null>(null);

  const callbacks = {
    onSubmit: useCallback((values: IFormAlignSequences) => {
      setSequences((prevSequences) => {
        const arrPrevSequences = prevSequences ?? [];
        // TODO: на регулярке выше скорость, нужно сделать ее адаптивнее для 2 последовательности
        const arrFirst = colorAminoAcidsRegex(values.first);
        const arrSecond = colorAminoAcids(values.second, values.first);

        const sequence = {
          id: uuidv4(),
          first: arrFirst,
          second: arrSecond,
        };
        const newSequences = [sequence, ...arrPrevSequences];
        return newSequences;
      });
    }, []),
  };

  return (
    <>
      <h1>Выравнивание аминокислотных последовательностей</h1>
      <FormAlignSequences form={form} onSubmit={callbacks.onSubmit} />
      <Sequences sequences={sequences} />
    </>
  );
}

export default App;
