import { Form } from "antd";
import { useCallback, useState } from "react";
import type { ISequences, IFormAlignSequences } from "./types";
import { v4 as uuidv4 } from "uuid";
import colorAminoAcids from "./utils/color-amino-acids";
import "./App.css";
import FormAlignSequences from "./componets/form-align-sequences";
import Sequences from "./componets/sequences";

function App() {
  const [form] = Form.useForm<IFormAlignSequences>();
  // Внутренний стейт для аминокислотных последовательностей
  const [sequences, setSequences] = useState<ISequences[] | null>(null);

  const callbacks = {
    onSubmit: useCallback((values: IFormAlignSequences) => {
      setSequences((prevSequences) => {
        const arrPrevSequences = prevSequences ?? [];

        const arrFirst = colorAminoAcids(values.first);

        const arrSecond = values.second.split("").map((elem, index) => {
          let color: string | null = null;
          if (values.first.slice(index, index + 1) !== elem) {
            color = "red";
          }
          const newElem = { id: uuidv4(), text: elem, color };
          return newElem;
        });

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
