const core = require('@actions/core');
const github = require('@actions/github');

async function run(){
    try {
        if (!github.context.payload.pull_request) {
            return core.setOutput("passed",true)
        }
        const token = core.getInput('githubToken');
        const context= github.context
        const octokit = github.getOctokit(token)
        const { data: labelsOnIssue } = await octokit.issues.listLabelsOnIssue({
            ...context.repo,
            issue_number: context.payload.pull_request.number
          })
      
          const prLabels = labelsOnIssue.map(item => item.name)

          return core.setOutput("labels",prLabels)
    }  catch (error) {
        core.setFailed(error.message)
    }
}