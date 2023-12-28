const {execSync} = require('child_process');
const fs = require('fs');
const os = require ('os')

const output = JSON.parse(execSync('pnpm turbo run build --dry-run=json --since=main'))
const apps = output.packages
    // Filter out the root of the monorepo it isn't really an app
    .filter((app) => {
        if (app === '//') return false

        const task = output.tasks.find(task => task.package === app)
        if (!task) 
            throw new Error(`Unable to locate package ${app}`)
    
        return task.directory.startsWith('apps/')
    })
    .map((app) => ({app}))

fs.appendFileSync(process.env.GITHUB_STATE, `processID=12345${os.EOL}`, {
  encoding: 'utf8'
})
