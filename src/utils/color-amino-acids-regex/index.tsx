import type { ISequences } from '../../types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Поиск и маркировка в определенный цвет аминокислот в последовательности
 * @param sequences {String} Последовательность
 * @returns {Object} Объект с последовательностью, который разбит на аминокислоты по цветам (если они есть)
 */
export default function colorAminoAcidsRegex(sequences: string): ISequences['first'] {
  const regex = new RegExp(
    // '(?<yellow>C)|(?<green>[AILMFWYVP]+)|(?<gray>G)|(?<pink>[DE]+)|(?<violet>[KR]+)|(?<blue>[STHQN]+)', // выше скорость
    '(?<yellow>C)|(?<green>(A|I|L|M|F|W|Y|V|P))|(?<gray>G)|(?<pink>(D|E))|(?<violet>(K|R))|(?<blue>(S|T|H|Q|N))',
    'g',
  );

  const arrSequences: ISequences['first'] = [];
  let index = 0;
  // Создаем перебираемый объект с результатами найденных символов по regex
  const iteratorSequences = sequences.matchAll(regex);

  for (const match of iteratorSequences) {
    const notFound = match.input.slice(index, match.index);
    if (notFound) {
      arrSequences.push({ id: uuidv4(), text: notFound, color: null });
    }

    let color = null;
    if (match.groups?.yellow) {
      color = '#ffea00';
    } else if (match.groups?.green) {
      color = '#67e4a6';
    } else if (match.groups?.gray) {
      color = '#c4c4c4';
    } else if (match.groups?.pink) {
      color = '#fc9cac';
    } else if (match.groups?.violet) {
      color = '#bb99ff';
    } else if (match.groups?.blue) {
      color = '#80bfff';
    }
    arrSequences.push({ id: uuidv4(), text: match[0], color });
    index = match.index + match[0].length;
  }

  return arrSequences;
}
