const {execSync} = require('child_process');

const output = JSON.parse(execSync('pnpm turbo run build --dry-run=json --since=main'))
const apps = output.packages
    // Filter out the root of the monorepo it isn't really an app
    .filter(app => app !== '//')
    .map((app) => ({app}))
console.log(JSON.stringify(apps))