import { useState, useEffect } from 'react';

let listeners = [];

function notify() {
  listeners.forEach(listener => listener());
}

export const subscribe = (listener) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
};

export function useMockStore() {
  const [, setTick] = useState(0);
  useEffect(() => {
    return subscribe(() => setTick(t => t + 1));
  }, []);
}

export const lawyerProfile = {
  name: 'Sara Raza',
  spec: 'Property Law',
  rating: '4.9',
  sbc: 'SBC-4421',
  successfulCasesCount: 42,
  district: 'Karachi',
  experience: '12 years',
  education: 'University of Karachi',
  about: 'Specializing in property disputes, land acquisition, and real estate litigation.',
  fee: 'PKR 5,000 / Consultation',
  isAvailable: true,
  address: 'Office 204, Gulsher Heights, Gulshan-e-Iqbal, Karachi',
  email: 'sara.raza@email.com',
  phone: '+92 333 1234567',
  initials: 'SR',
  color: '#5C1A1A',
};

export const updateLawyerProfile = (newData) => {
  Object.assign(lawyerProfile, newData);
  notify();
};

export const timingSlots = [
  { id: '1', day: 'Monday', time: '02:00 PM - 05:00 PM' },
  { id: '2', day: 'Wednesday', time: '02:00 PM - 05:00 PM' },
];

export const addTimingSlot = (day, time) => {
  timingSlots.push({
    id: String(Date.now()),
    day,
    time
  });
  notify();
};

export const deleteTimingSlot = (id) => {
  const idx = timingSlots.findIndex(s => s.id === id);
  if (idx !== -1) {
    timingSlots.splice(idx, 1);
    notify();
  }
};

export const editTimingSlot = (id, day, time) => {
  const idx = timingSlots.findIndex(s => s.id === id);
  if (idx !== -1) {
    timingSlots[idx] = { id, day, time };
    notify();
  }
};

export const caseRequests = [
  { id: '1', name: 'Ahmed K.', spec: 'Property Dispute', location: 'Hyderabad', time: '2 hours ago', desc: 'Boundary wall dispute with neighbour commercial land.', contact: '+92 312 3456789', evidence: ['Land deed.pdf', 'Photos.zip'] },
  { id: '2', name: 'Zara M.', spec: 'Family Case', location: 'Karachi', time: '5 hours ago', desc: 'Seeking child custody legal consultation.', contact: '+92 300 9876543', evidence: ['Marriage cert.pdf'] },
  { id: '3', name: 'Bilal S.', spec: 'Property Dispute', location: 'Sukkur', time: '1 day ago', desc: 'Siblings division of inherited home.', contact: '+92 333 1122334', evidence: ['Will copy.pdf'] },
];

export const activeCases = [
  { id: '1', title: 'Raza vs. Malik', clientName: 'Ahmed Raza', court: 'Civil Court Karachi', description: 'Property transfer claim.', contact: '+92 321 4455667', evidence: ['Deed_Transfer.pdf', 'Map.png'] },
  { id: '2', title: 'Khan Divorce Settlement', clientName: 'Bilal Khan', court: 'Family Court Karachi', description: 'Mutual separation terms.', contact: '+92 345 8899001', evidence: ['SeparationAgreement.pdf'] },
];

export const declineRequest = (id) => {
  const idx = caseRequests.findIndex(r => r.id === id);
  if (idx !== -1) {
    caseRequests.splice(idx, 1);
    notify();
  }
};

export const acceptRequest = (id) => {
  const req = caseRequests.find(r => r.id === id);
  if (req) {
    activeCases.unshift({
      id: String(activeCases.length + 1),
      title: `${req.name} - ${req.spec}`,
      clientName: req.name,
      court: req.spec.includes('Property') ? 'Civil Court Karachi' : 'Family Court Karachi',
      description: req.desc,
      contact: req.contact,
      evidence: req.evidence,
    });
    declineRequest(id); // remove from requests
  }
};