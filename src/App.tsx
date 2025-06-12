import { Form } from "antd";
import { useCallback, useState } from "react";
import type { ISequences, IFormAlignSequences } from "./types";
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
        const newSequences = [
          {
            first: values.first,
            second: values.second,
          },
          ...arrPrevSequences,
        ];
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
