import { test, expect } from 'vitest';
import { formatDate } from './kakeibo/utils/utils';

test('formatDateで2018-1-1が2018/1/1になること' ,()=>{
    expect(formatDate('2018-1-1')).toBe('2018/1/1');
});