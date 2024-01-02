#!/usr/bin/env node
const {execSync} = require('child_process')

const output = JSON.parse(execSync('pnpx turbo run build --dry-run=json --since=origin/main'))

try {
    const apps = output.packages
    // Filter out the root of the monorepo it isn't really an app
    .filter((app) => {
        if (app === '//') return false

        const task = output.tasks.find(task => task.package === app)
        if (!task) 
            throw new Error(`Unable to locate package ${app}`)
    
        return task.directory.startsWith('apps/')
    })
    .map((app) => {
        const task = output.tasks.find((task) => task.package === app)
        return {app, directory: task.directory}
    })
    
    throw new Error('foo')

    console.log(JSON.stringify(apps))
} catch(e) {
    console.error(e)
    process.exit(1)
}
