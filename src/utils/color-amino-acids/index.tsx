import type { ISequences } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const colors = {
  // yellow
  C: '#ffea00',
  // green
  A: '#67e4a6',
  I: '#67e4a6',
  L: '#67e4a6',
  M: '#67e4a6',
  F: '#67e4a6',
  W: '#67e4a6',
  Y: '#67e4a6',
  V: '#67e4a6',
  P: '#67e4a6',
  // gray
  G: '#c4c4c4',
  // pink
  D: '#fc9cac',
  E: '#fc9cac',
  // violet
  K: '#bb99ff',
  R: '#bb99ff',
  // blue
  S: '#80bfff',
  T: '#80bfff',
  H: '#80bfff',
  Q: '#80bfff',
  N: '#80bfff',
};

const mapColors = new Map(Object.entries(colors));

/**
 * Поиск и маркировка в определенный цвет аминокислот в последовательности
 * @param sequences {String} Последовательность (вторая)
 * @param sequencesFirst {String} Первая последовательность для сравнения со второй
 * @returns {Object} Объект с последовательностью, который разбит на аминокислоты по цветам (если они есть)
 */
export default function colorAminoAcids(sequences: string, sequencesFirst: string): ISequences['first'] {
  const arrSequences = sequences.split('').map((elem, index) => {
    let color: string | null = null;
    if (sequencesFirst.slice(index, index + 1) !== elem) {
      color = mapColors.get(elem) ?? null;
    }

    const newElem = { id: uuidv4(), text: elem, color };
    return newElem;
  });

  return arrSequences;
}
