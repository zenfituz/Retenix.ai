const https = require('https');
const http = require('http');

const BASE_URL = 'https://retenix-ai.vercel.app';

const routesToTest = [
  '/',
  '/login',
  '/features',
  '/pricing',
  '/about',
  '/contact',
  '/member',
  '/member/plan',
  '/member/checkin',
  '/member/food',
  '/member/top',
  '/member/profile',
  '/member/onboarding',
  '/member/ai',
  '/owner/dashboard',
  '/owner/members',
  '/owner/trainers',
  '/owner/analytics',
  '/owner/billing',
  '/superadmin/dashboard',
  '/superadmin/gyms',
  '/superadmin/aiusage',
  '/trainer/dashboard',
  '/trainer/clients',
  '/trainer/analytics',
  '/api/telegram/setup',
  '/api/telegram/bot',
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
  console.log(`🚀 Platform Test Suite — Retenix AI Production Server (${BASE_URL})\n`);
  let passed = 0;
  let failed = 0;

  for (const path of routesToTest) {
    const fullUrl = `${BASE_URL}${path}`;
    const result = await checkUrl(fullUrl);
    const isOk = result.status === 200 || result.status === 307 || result.status === 308;
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
