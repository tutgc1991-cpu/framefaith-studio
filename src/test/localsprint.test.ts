import { describe, expect, it } from 'vitest';
import { initialState, sprints, sampleRecord, filterSprints, applyToSprint, updateMilestone, approveSprint, restoreState } from '@/lib/localsprint';

describe('LocalSprint demo rules', () => {
  it('provides six open sprints lasting two to four weeks', () => {
    expect(sprints).toHaveLength(6);
    expect(sprints.every(s => s.weeks >= 2 && s.weeks <= 4)).toBe(true);
  });
  it('combines stack, duration, and partner type filters', () => {
    expect(filterSprints('Python/Data', '2', 'Local SME').map(s => s.id)).toEqual(['mpesa']);
  });
  it('adds a one-click application to the learner workspace only once', () => {
    const applied = applyToSprint(initialState, 'mpesa');
    expect(applied.applications).toEqual(['mpesa']);
    expect(applyToSprint(applied, 'mpesa').applications).toEqual(['mpesa']);
  });
  it('tracks four milestone statuses independently', () => {
    const state = updateMilestone(initialState, 3, 'Completed');
    expect(state.statuses).toEqual(['Completed', 'Completed', 'In Review', 'Completed']);
  });
  it('unlocks the verified record after supervisor sign-off', () => {
    const approved = approveSprint(initialState, sampleRecord);
    expect(approved.approved).toBe(true);
    expect(approved.statuses).toEqual(['Completed', 'Completed', 'Completed', 'Completed']);
    expect(approved.records[0]?.id).toBe('LSP-2026-KE-8841');
  });
  it('uses the requested sample competency scores', () => {
    expect(sampleRecord.scores).toEqual([4.8, 5, 4.9]);
  });
  it('issues a new partner-signed record without removing earlier records', () => {
    const prior = approveSprint(initialState, sampleRecord);
    const record = { ...sampleRecord, id: 'LSP-2026-KE-9001', supervisor: 'David Mwangi', organization: 'CivicHub' };
    const next = approveSprint(prior, record);
    expect(next.records.map(r => r.id)).toEqual(['LSP-2026-KE-9001', 'LSP-2026-KE-8841']);
    expect(next.records[0]?.supervisor).toBe('David Mwangi');
  });
  it('restores browser-local demo state and rejects corrupt storage', () => {
    expect(restoreState(JSON.parse(JSON.stringify(initialState)))).toEqual(initialState);
    expect(restoreState({ statuses: [] })).toBeNull();
  });
});