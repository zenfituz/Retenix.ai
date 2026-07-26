const https = require('https');

const BASE_URL = 'https://retenix-ai.vercel.app';

const routesToTest = [
  '/',
  '/login',
  '/member',
  '/member/plan',
  '/member/checkin',
  '/member/food',
  '/member/top',
  '/member/profile',
  '/member/onboarding',
  '/owner/dashboard',
  '/owner/members',
  '/owner/trainers',
  '/owner/analytics',
  '/owner/billing',
  '/owner/copilot',
  '/superadmin/dashboard',
  '/superadmin/gyms',
  '/superadmin/aiusage',
  '/superadmin/billing',
  '/trainer/dashboard',
  '/trainer/clients',
  '/trainer/analytics',
  '/api/copilot/message',
];

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url, status: 'ERROR', error: err.message });
    });
  });
}

async function runTests() {
  console.log(`🚀 Retenix Production Test Suite (${BASE_URL})\n`);
  let passed = 0;
  let failed = 0;

  for (const path of routesToTest) {
    const fullUrl = `${BASE_URL}${path}`;
    const result = await checkUrl(fullUrl);
    const isOk = result.status === 200 || result.status === 307 || result.status === 308 || result.status === 405;
    if (isOk) {
      console.log(`✅ [${result.status}] ${path}`);
      passed++;
    } else {
      console.log(`❌ [${result.status}] ${path}`);
      failed++;
    }
  }

  console.log(`\n========================================`);
  console.log(`📊 Test Results: ${passed} PASSED | ${failed} FAILED | Total: ${routesToTest.length}`);
  console.log(`========================================\n`);
}

runTests();
