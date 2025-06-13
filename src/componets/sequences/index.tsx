import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import type { ISequences } from "../../types";
import "./style.less";

interface ISequencesProps {
  sequences: ISequences[] | null;
}

function Sequences(props: ISequencesProps) {
  const cn = bem("Sequences");

  return (
    <div className={cn()}>
      <h2>Выравнивания</h2>
      {props.sequences?.map((sequence) => (
        <div key={sequence.id}>
          <div className={cn("aminoAcids")}>
            {sequence.first.map((elem) => {
              const style = elem.color ? { background: elem.color } : {};
              return (
                <span key={elem.id} style={style}>
                  {elem.text}
                </span>
              );
            })}
          </div>
          <div>
            {sequence.second.map((elem) => {
              const style = elem.color ? { background: elem.color } : {};
              return (
                <span key={elem.id} style={style}>
                  {elem.text}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(Sequences);
