import {expectType} from 'tsd';
import roundTo = require('.');

expectType<number>(roundTo(1.234, 2));
expectType<number>(roundTo.up(1.234, 2));
expectType<number>(roundTo.down(1.234, 2));
