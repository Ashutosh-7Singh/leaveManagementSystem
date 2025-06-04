// src/data/leaveData.js
export const initialLeaves = [
  {
    _id: '1',
    user: { name: 'Moni Singh' },
    leaveType: 'sickLeaves',
    date: '2025-06-05',
    slot: 'firstHalf',
    reason: 'Feeling unwell',
    status: 'leaveApplied',
  },
  {
    _id: '2',
    user: { name: 'Ashutosh Singh' },
    leaveType: 'casualLeaves',
    date: '2025-06-06',
    slot: 'fullDay',
    reason: 'Personal work',
    status: 'leaveApplied',
  },
];
