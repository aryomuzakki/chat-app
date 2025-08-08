import { relative } from 'path';

const buildEslintCommand = filenames =>
  `next lint --fix --file ${filenames.map(f => relative(process.cwd(), f)).join(' --file ')}`;

const config = {
  '*.{cjs,js,jsx,ts,tsx}': [buildEslintCommand, 'eslint --fix', 'prettier --write'],
};

export default config;
