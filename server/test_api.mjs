import http from 'http';

const BASE = 'http://localhost:5000';

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const options = {
      method,
      hostname: 'localhost',
      port: 5000,
      path,
      headers: {
        'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

console.log('\n=== JS Enterprises Backend API Test ===\n');

// 1. Health Check
console.log('1. Testing GET /api/health...');
const health = await request('GET', '/api/health');
console.log(`   Status: ${health.status}`);
console.log(`   DB: ${health.body.database?.status} on ${health.body.database?.host}`);
console.log(`   Uptime: ${health.body.uptime}\n`);

// 2. Submit a real consultation
console.log('2. Testing POST /api/consultations (real submission)...');
const submit = await request('POST', '/api/consultations', {
  name: 'Sakthi Test Engineer',
  company: 'JS Enterprises Test Run',
  phone: '+91 99416 46332',
  email: 'test@jsenterpriseschennai.com',
  service: 'Fire Hydrant Systems',
  scope: 'Automated backend test submission. Factory floor hydrant ring main inspection required for a 15,000 sq ft manufacturing unit in Ambattur IE.'
});
console.log(`   Status: ${submit.status}`);
console.log(`   Success: ${submit.body.success}`);
console.log(`   Ref ID: ${submit.body.data?.refId}`);
console.log(`   Saved to MongoDB: ${submit.body.data ? 'YES ✅' : 'NO ❌'}\n`);

const refId = submit.body.data?.refId;

// 3. Retrieve by Ref ID
if (refId) {
  console.log(`3. Testing GET /api/consultations/${refId}...`);
  const get = await request('GET', `/api/consultations/${refId}`);
  console.log(`   Status: ${get.status}`);
  console.log(`   Name: ${get.body.data?.name}`);
  console.log(`   Service: ${get.body.data?.service}`);
  console.log(`   DB Status: ${get.body.data?.status}\n`);
}

// 4. List all consultations
console.log('4. Testing GET /api/consultations (list)...');
const list = await request('GET', '/api/consultations?limit=5');
console.log(`   Status: ${list.status}`);
console.log(`   Total records in DB: ${list.body.total}`);
console.log(`   Records returned: ${list.body.data?.length}\n`);

// 5. Stats
console.log('5. Testing GET /api/consultations/stats/summary...');
const stats = await request('GET', '/api/consultations/stats/summary');
console.log(`   Status: ${stats.status}`);
console.log(`   Total consultations: ${stats.body.data?.total}`);
console.log(`   By status:`, stats.body.data?.byStatus);
console.log(`   Top service:`, stats.body.data?.byService?.[0]);

// 6. Validation test (missing fields)
console.log('\n6. Testing POST /api/consultations with missing fields (should return 400)...');
const bad = await request('POST', '/api/consultations', { name: 'Only Name' });
console.log(`   Status: ${bad.status} (expected 400)`);
console.log(`   Message: ${bad.body.message}`);

console.log('\n=== All tests complete ===\n');
