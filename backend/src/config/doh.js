/**
 * Minimal DNS-over-HTTPS resolver.
 *
 * Some networks block outbound DNS (UDP/TCP 53) to public resolvers or cannot
 * resolve mongodb.net, which breaks `mongodb+srv://` (SRV/TXT) and shard
 * hostname lookups. When MONGO_DNS_OVER_HTTPS=true, DNS queries are issued over
 * HTTPS to a DoH endpoint (default Google) instead.
 */
const DEFAULT_ENDPOINT = 'https://dns.google/resolve';

function endpoint() {
  return process.env.MONGO_DOH_URL || DEFAULT_ENDPOINT;
}

async function query(name, type) {
  const url = `${endpoint()}?name=${encodeURIComponent(name)}&type=${type}`;
  const res = await fetch(url, { headers: { accept: 'application/dns-json' } });
  if (!res.ok) throw new Error(`DoH request failed: ${res.status}`);
  const json = await res.json();
  return Array.isArray(json.Answer) ? json.Answer : [];
}

export async function resolve4(name) {
  const answers = await query(name, 'A');
  return answers.filter((a) => a.type === 1).map((a) => a.data);
}

export async function resolve6(name) {
  const answers = await query(name, 'AAAA');
  return answers.filter((a) => a.type === 28).map((a) => a.data);
}

export async function resolveSrv(name) {
  const answers = await query(name, 'SRV');
  return answers
    .filter((a) => a.type === 33)
    .map((a) => {
      const [priority, weight, port, target] = a.data.split(/\s+/);
      return {
        priority: Number(priority),
        weight: Number(weight),
        port: Number(port),
        name: target.replace(/\.$/, ''),
      };
    });
}

export async function resolveTxt(name) {
  const answers = await query(name, 'TXT');
  return answers
    .filter((a) => a.type === 16)
    .map((a) => [String(a.data).replace(/^"|"$/g, '')]);
}
