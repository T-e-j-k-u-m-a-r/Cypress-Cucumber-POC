#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

const allowedFeaturePrefix = 'codenbox_';

function walk(dir, cb) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      // skip node_modules and .git
      if (e.name === 'node_modules' || e.name === '.git') continue;
      walk(full, cb);
    } else {
      cb(full);
    }
  }
}

const errors = [];

walk(repoRoot, (file) => {
  const rel = path.relative(repoRoot, file).replace(/\\/g, '/');
  const name = path.basename(file);
  const ext = path.extname(file).toLowerCase();

  // 1) Step definition files: must contain 'step' and start with lowercase
  if (ext === '.js' && rel.includes('cypress/integration')) {
    if (/steps?\.js$/i.test(name) || /step/i.test(name)) {
      if (!/step/.test(name)) {
        errors.push(`${rel}: step definition filename must contain the word 'step'`);
      }
      const first = name.charAt(0);
      if (first !== first.toLowerCase()) {
        errors.push(`${rel}: step definition filename must start with a lowercase letter`);
      }
    }
  }

  // 2) Feature files: start with codenbox_ and end with .feature
  if (ext === '.feature') {
    if (!name.startsWith(allowedFeaturePrefix)) {
      errors.push(`${rel}: feature filename must start with '${allowedFeaturePrefix}'`);
    }
  }

  // 3) Feature files should start with comment section having a feature ID or userstory ID
  if (ext === '.feature') {
    const contents = fs.readFileSync(file, 'utf8');
    const firstLines = contents.split(/\r?\n/).slice(0, 5).join('\n');
    // look for a comment line like # FEAT-123 or # US-123 or # feature: 123
    if (!/^\s*#.*(feat|feature|us|userstory|US|FEAT)[:\-\s]*\w+/mi.test(firstLines)) {
      errors.push(`${rel}: feature file should start with a comment containing a feature ID or userstory ID`);
    }
  }

  // 4) Page objects: filenames containing 'page' and start with capital letter
  if (ext === '.js' && /page/i.test(name)) {
    if (!/[pP]age/.test(name)) {
      errors.push(`${rel}: page object must contain the word 'page'`);
    }
    const basename = path.basename(name, ext);
    const firstChar = basename.charAt(0);
    if (firstChar !== firstChar.toUpperCase()) {
      errors.push(`${rel}: page object filename must start with a capital letter`);
    }
  }
});

if (errors.length) {
  console.error('Naming validation failed:');
  for (const e of errors) console.error('- ' + e);
  process.exit(2);
} else {
  console.log('Naming validation passed.');
}
