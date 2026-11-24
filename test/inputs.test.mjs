import assert from 'node:assert/strict';
import {mkdtemp, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {test} from 'node:test';
import {pathToFileURL} from 'node:url';
import {readBundle} from '../scripts/inspect.mjs';

test('资料可按声明的主键和字段完整读取', async () => {
  const bundle = await readBundle();
  assert(Object.values(bundle).every(rows => rows.length > 0));
  const {assignments, complaints, blind, windows} = bundle;
  assert(complaints.every(row => assignments.some(a => a.id === row.unit && a.merchants.includes(row.merchant))));
  assert(blind.every(row => complaints.some(c => c.id === row.complaint)));
  assert(blind.filter(row => row.supersedes).every(row => blind.some(a => a.id === row.supersedes && a.complaint === row.complaint)));
  assert(windows.every(row => row.held_shift_hours <= row.shift_capacity));
});

test('读取资料时拒绝重复主键', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'record-check-'));
  try {
    await writeFile(join(dir, 'manifest.json'), '{"entries":{"fields":["id","value"],"key":["id"]}}');
    await writeFile(join(dir, 'entries.json'), '[{"id":"x","value":1},{"id":"x","value":2}]');
    await assert.rejects(readBundle(pathToFileURL(dir + '/')), /主键/);
  } finally {
    await rm(dir, {recursive: true, force: true});
  }
});
