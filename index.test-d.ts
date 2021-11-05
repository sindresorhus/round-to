import {expectType} from 'tsd';
import {roundTo, roundToUp, roundToDown} from './index.js';

expectType<number>(roundTo(1.234, 2));
expectType<number>(roundToUp(1.234, 2));
expectType<number>(roundToDown(1.234, 2));
