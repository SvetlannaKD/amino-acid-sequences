import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.less";
import type { ISequences } from "../../types";

interface ISequencesProps {
  sequences: ISequences[] | null;
}

function Sequences(props: ISequencesProps) {
  const cn = bem("Sequences");

  return (
    <div className={cn()}>
      <h2>Выравнивания</h2>
      {props.sequences?.map((sequence, index) => (
        <div key={index}>
          <div>{sequence.first}</div>
          <div>{sequence.second}</div>
        </div>
      ))}
    </div>
  );
}

export default memo(Sequences);
