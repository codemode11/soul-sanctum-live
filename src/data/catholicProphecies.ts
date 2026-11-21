import { SCRIPTURE_END_TIMES_PROPHECIES } from './catholicPropheciesScripture';
import { MARIAN_PROPHECIES } from './catholicPropheciesMarian';
import { SAINTS_MYSTICS_PROPHECIES } from './catholicPropheciesSaints';
import {
  JESUS_PROPHECIES,
  ADDITIONAL_MYSTICS_PROPHECIES,
} from './catholicPropheciesJesusAndMystics';
import {
  ProphecyEntry,
  ProphecyCategory,
  EcclesiasticalStatus,
  DiscernmentPrinciple,
  VaticanNormDetermination,
  VaticanNormCriterion,
  Vatican2024NormsData,
  CATHOLIC_DISCERNMENT_PRINCIPLES,
  VATICAN_2024_NORMS,
} from './catholicProphecyTypes';

export type {
  ProphecyEntry,
  ProphecyCategory,
  EcclesiasticalStatus,
  DiscernmentPrinciple,
  VaticanNormDetermination,
  VaticanNormCriterion,
  Vatican2024NormsData,
};

export const COMBINED_SAINTS_MYSTICS_PROPHECIES: ProphecyEntry[] = [
  ...SAINTS_MYSTICS_PROPHECIES,
  ...ADDITIONAL_MYSTICS_PROPHECIES,
];

export {
  CATHOLIC_DISCERNMENT_PRINCIPLES,
  VATICAN_2024_NORMS,
  JESUS_PROPHECIES,
  SCRIPTURE_END_TIMES_PROPHECIES,
  MARIAN_PROPHECIES,
  SAINTS_MYSTICS_PROPHECIES,
  ADDITIONAL_MYSTICS_PROPHECIES,
};

export const ALL_CATHOLIC_PROPHECIES: ProphecyEntry[] = [
  ...JESUS_PROPHECIES,
  ...SCRIPTURE_END_TIMES_PROPHECIES,
  ...MARIAN_PROPHECIES,
  ...COMBINED_SAINTS_MYSTICS_PROPHECIES,
];
