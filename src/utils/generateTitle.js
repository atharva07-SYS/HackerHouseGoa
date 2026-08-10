/**
 * generateTitle.js
 * Maps stack/role keywords to fun Hacker House Goa builder titles.
 */

const titleMap = [
  // AI / ML
  { keywords: ['ai', 'ml', 'machine learning', 'deep learning', 'llm', 'gpt', 'neural', 'nlp', 'cv', 'computer vision', 'generative', 'diffusion', 'rag'], titles: ['THE AI ALCHEMIST', 'THE NEURAL NOMAD', 'THE PROMPT PROPHET', 'THE MODEL MONK', 'THE INFERENCE ORACLE'] },
  // Backend
  { keywords: ['backend', 'back end', 'back-end', 'api', 'server', 'node', 'python', 'django', 'flask', 'fastapi', 'express', 'rails', 'go', 'golang', 'rust', 'java', 'spring', 'microservice', 'grpc', 'rest'], titles: ['THE SERVER SHAMAN', 'THE API ARTISAN', 'THE BACKEND BANDIT', 'THE ENDPOINT ENCHANTER', 'THE REQUEST RANGER'] },
  // Frontend
  { keywords: ['frontend', 'front end', 'front-end', 'react', 'vue', 'angular', 'svelte', 'ui', 'ux', 'css', 'html', 'tailwind', 'typescript', 'nextjs', 'next.js', 'nuxt', 'gatsby'], titles: ['THE PIXEL PIRATE', 'THE UI UNICORN', 'THE DOM DEITY', 'THE INTERFACE ILLUSIONIST', 'THE COMPONENT CONJURER'] },
  // Data
  { keywords: ['data', 'analytics', 'bigquery', 'spark', 'pandas', 'sql', 'etl', 'pipeline', 'warehouse', 'tableau', 'looker', 'dbt', 'airflow', 'kafka', 'flink', 'scientist', 'analyst', 'bi', 'business intelligence'], titles: ['THE DATA WIZARD', 'THE BYTE BARD', 'THE QUERY QUEEN', 'THE PIPELINE PHARAOH', 'THE SCHEMA SAGE'] },
  // Mobile
  { keywords: ['mobile', 'ios', 'android', 'swift', 'kotlin', 'flutter', 'react native', 'expo', 'swiftui'], titles: ['THE APP ARCHITECT', 'THE MOBILE MYSTIC', 'THE SWIPE SORCERER', 'THE NATIVE NOMAD'] },
  // DevOps / Cloud / Infra
  { keywords: ['devops', 'cloud', 'aws', 'gcp', 'azure', 'kubernetes', 'k8s', 'docker', 'terraform', 'infra', 'infrastructure', 'ci/cd', 'cicd', 'sre', 'reliability', 'ops', 'platform', 'devsecops'], titles: ['THE CLOUD COWBOY', 'THE INFRA NINJA', 'THE DEPLOY DEITY', 'THE K8S KING', 'THE PIPELINE PILOT'] },
  // Blockchain / Web3
  { keywords: ['blockchain', 'web3', 'crypto', 'solidity', 'defi', 'nft', 'ethereum', 'solana', 'polygon', 'smart contract', 'dao', 'token', 'dapp'], titles: ['THE CHAIN CONJURER', 'THE DEFI DRUID', 'THE BLOCK BARD', 'THE CRYPTO CAPTAIN'] },
  // Security
  { keywords: ['security', 'cyber', 'hacking', 'penetration', 'pentest', 'ctf', 'bug bounty', 'exploit', 'appsec', 'infosec', 'red team', 'blue team'], titles: ['THE CYBER SAMURAI', 'THE EXPLOIT EXPLORER', 'THE BREACH BUSTER', 'THE ZERO DAY ZEALOT'] },
  // Design
  { keywords: ['design', 'designer', 'figma', 'product design', 'graphic', 'brand', 'motion', 'visual', 'creative', 'illustration', 'animation'], titles: ['THE DESIGN DEITY', 'THE FIGMA PHARAOH', 'THE PIXEL POET', 'THE CANVAS CONJURER'] },
  // Full Stack
  { keywords: ['fullstack', 'full stack', 'full-stack', 'end-to-end', 'generalist'], titles: ['THE STACK SORCERER', 'THE FULL STACK FALCON', 'THE VERSATILE VIKING', 'THE OMNI OPERATOR'] },
  // Product / PM
  { keywords: ['product', 'pm', 'product manager', 'roadmap', 'agile', 'scrum', 'growth', 'gtm', 'go-to-market'], titles: ['THE PRODUCT PIRATE', 'THE ROADMAP RENEGADE', 'THE FEATURE FALCON', 'THE GROWTH GLADIATOR'] },
  // Founder / Builder
  { keywords: ['founder', 'ceo', 'cto', 'startup', 'entrepreneur', 'builder', 'maker', 'indie', 'indie hacker'], titles: ['THE STARTUP SAMURAI', 'THE FOUNDER PHANTOM', 'THE BUILDER BARON', 'THE VENTURE VIKING'] },
];

const wildcardTitles = [
  'THE GOA GLADIATOR',
  'THE CODE PIRATE',
  'THE HACK MAESTRO',
  'THE BIT WIZARD',
  'THE RUNTIME REBEL',
  'THE SYNTAX SULTAN',
  'THE LOGIC LEGEND',
  'THE FUNCTION FIEND',
  'THE VARIABLE VAGABOND',
  'THE HACKER IN PARADISE',
  'THE COCONUT CODER',
  'THE TROPICAL TECHNOLOGIST',
  'THE MONSOON MAKER',
  'THE BEACH BUILDER',
];

/**
 * Generate a builder title from stack/role string.
 * @param {string} stack - The user's stack/role input
 * @param {string} [name] - Optional name for seeding randomness
 * @returns {string} A fun builder title
 */
export function generateBuilderTitle(stack = '', name = '') {
  const lower = (stack + ' ' + name).toLowerCase();

  // Try to find a match
  for (const { keywords, titles } of titleMap) {
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        return titles[Math.floor(Math.random() * titles.length)];
      }
    }
  }

  // Fallback: random wildcard
  return wildcardTitles[Math.floor(Math.random() * wildcardTitles.length)];
}

/**
 * Get multiple title suggestions for a stack.
 * @param {string} stack
 * @param {number} count
 * @returns {string[]}
 */
export function getTitleSuggestions(stack = '', count = 3) {
  const lower = stack.toLowerCase();
  const found = [];

  for (const { keywords, titles } of titleMap) {
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        found.push(...titles);
        break;
      }
    }
  }

  const pool = found.length > 0 ? [...new Set(found)] : wildcardTitles;
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
