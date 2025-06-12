import { Form } from "antd";
import type { IFormAlignAminoAcidSequences } from "./types";
import "./App.css";
import FormAlignAminoAcidSequences from "./componets/form-align-amino-acid-sequences";

function App() {
  const [form] = Form.useForm<IFormAlignAminoAcidSequences>();

  return (
    <>
      <FormAlignAminoAcidSequences form={form} />
    </>
  );
}

export default App;
