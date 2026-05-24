export function formatRupiah(value) {
  return 'Rp. ' + Number(value || 0).toLocaleString('id-ID');
}

export function randomQueue() {
  return Math.floor(Math.random() * 10) + 1;
}

export function randomOrderNumber() {
  return '#' + Math.floor(10000 + Math.random() * 90000);
}

export function normalizeText(text) {
  return text.toLowerCase().replace(/\s+/g, '').trim();
}

export function fuzzyScore(text, query) {
  const t = normalizeText(text);
  const q = normalizeText(query);

  if (!q) return 1;
  if (t.includes(q)) return 1;
  if (text.toLowerCase().split(' ').some((word) => word.startsWith(query.toLowerCase()))) return 0.95;

  let ti = 0;
  let matched = 0;

  for (let qi = 0; qi < q.length; qi += 1) {
    while (ti < t.length && t[ti] !== q[qi]) ti += 1;

    if (ti < t.length) {
      matched += 1;
      ti += 1;
    } else {
      break;
    }
  }

  return matched / q.length;
}
