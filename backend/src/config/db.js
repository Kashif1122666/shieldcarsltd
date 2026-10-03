import dns from 'dns';
import * as doh from './doh.js';

/**
 * Resolves the MongoDB connection string.
 *
 * Preferred (Atlas): set MONGO_USER and MONGO_PASSWORD (and optionally
 * MONGO_CLUSTER / MONGO_DB) and the URI is built automatically.
 *
 * Alternatively set a complete MONGO_URI (local or Atlas) and it is used as-is.
 */
export function resolveMongoUri() {
  const {
    MONGO_URI,
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_CLUSTER = 'cluster0.jahwpeg.mongodb.net',
    MONGO_DB = 'shieldcars',
  } = process.env;

  if (MONGO_USER && MONGO_PASSWORD) {
    const user = encodeURIComponent(MONGO_USER);
    const pass = encodeURIComponent(MONGO_PASSWORD);
    return `mongodb+srv://${user}:${pass}@${MONGO_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`;
  }

  return MONGO_URI;
}

/**
 * Throws a clear error if no connection string can be resolved.
 */
export function requireMongoUri() {
  const uri = resolveMongoUri();
  if (!uri) {
    throw new Error(
      'MongoDB connection not configured. Set MONGO_USER and MONGO_PASSWORD ' +
        '(Atlas) or MONGO_URI in backend/.env'
    );
  }
  return uri;
}

/** Comma-separated custom DNS servers, e.g. "8.8.8.8,8.8.4.4". */
function dnsServers() {
  const raw = process.env.MONGO_DNS_SERVERS;
  if (!raw) return [];
  return raw.split(',').map((s) => s.trim()).filter(Boolean);
}

function dnsOverHttpsEnabled() {
  return String(process.env.MONGO_DNS_OVER_HTTPS || '').toLowerCase() === 'true';
}

/**
 * Configures hostname resolution before connecting.
 *
 * - MONGO_DNS_OVER_HTTPS=true routes all DNS (including the driver's SRV/TXT
 *   lookups) through DNS-over-HTTPS. Use this on networks that block or fail
 *   to resolve mongodb.net.
 * - MONGO_DNS_SERVERS=8.8.8.8,8.8.4.4 uses those resolvers instead.
 *
 * Returns a short description of what was applied (or null).
 */
export function configureDns() {
  if (dnsOverHttpsEnabled()) {
    // The driver calls dns.promises.resolve(name, 'SRV'|'TXT'); intercept it.
    const original = dns.promises.resolve.bind(dns.promises);
    dns.promises.resolve = (name, rrtype) => {
      switch (String(rrtype || 'A').toUpperCase()) {
        case 'SRV':
          return doh.resolveSrv(name);
        case 'TXT':
          return doh.resolveTxt(name);
        case 'AAAA':
          return doh.resolve6(name);
        case 'A':
          return doh.resolve4(name);
        default:
          return original(name, rrtype);
      }
    };
    return 'DNS-over-HTTPS';
  }

  const servers = dnsServers();
  if (servers.length) {
    dns.setServers(servers);
    return `DNS servers ${servers.join(', ')}`;
  }

  return null;
}

/**
 * Options passed to mongoose.connect / MongoClient.
 * Provides a custom `lookup` so shard hostnames are resolved consistently with
 * whichever DNS strategy was configured.
 */
export function mongoClientOptions() {
  const options = {};
  const dohEnabled = dnsOverHttpsEnabled();

  if (!dohEnabled && !dnsServers().length) return options;

  const resolve = dohEnabled
    ? async (hostname, family) => {
        const [v4, v6] = await Promise.all([doh.resolve4(hostname), doh.resolve6(hostname)]);
        return { v4, v6 };
      }
    : async (hostname, family) => {
        const resolver = resolverFor();
        return {
          v4: await new Promise((res) => resolver.resolve4(hostname, (e, a) => res(e ? [] : a))),
          v6: await new Promise((res) => resolver.resolve6(hostname, (e, a) => res(e ? [] : a))),
        };
      };

  options.lookup = (hostname, opts, callback) => {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    const all = opts.all === true;
    const family = typeof opts === 'number' ? opts : opts.family || 0;

    resolve(hostname, family)
      .then(({ v4, v6 }) => {
        let records = [];
        if (family === 6) records = v6.map((address) => ({ address, family: 6 }));
        else if (family === 4) records = v4.map((address) => ({ address, family: 4 }));
        else records = [
          ...v4.map((address) => ({ address, family: 4 })),
          ...v6.map((address) => ({ address, family: 6 })),
        ];

        if (!records.length) {
          const err = new Error(`DNS lookup failed for ${hostname}`);
          err.code = 'ENOTFOUND';
          return callback(err);
        }
        if (all) return callback(null, records);
        return callback(null, records[0].address, records[0].family);
      })
      .catch((err) => callback(err));
  };

  return options;
}

let cachedResolver;
function resolverFor() {
  if (!cachedResolver) {
    cachedResolver = new dns.Resolver();
    cachedResolver.setServers(dnsServers());
  }
  return cachedResolver;
}
