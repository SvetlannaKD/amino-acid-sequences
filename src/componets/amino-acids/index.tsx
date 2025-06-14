import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import type { IAminoAcid } from '../../types';
import './style.less';

interface IAminoAcidsProps {
  aminoAcids: IAminoAcid[];
  first?: boolean;
  second?: boolean;
  hide?: boolean;
}

function AminoAcids(props: IAminoAcidsProps) {
  const cn = bem('AminoAcids');

  return (
    <div className={cn({ first: props.first, second: props.second, hide: props.hide })}>
      {/* <span style={{position: 'absolute', top: 0, left: 0, opacity: 0, pointerEvents: 'none'}}>DAR</span> */}
      {props.aminoAcids.map((elem) => {
        const style = elem.color ? { background: elem.color } : {};
        return (
          <span className={cn('item')} key={elem.id} style={style}>
            {elem.text}
          </span>
        );
      })}
    </div>
  );
}

export default memo(AminoAcids);
