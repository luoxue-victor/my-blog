const request = require('request')
const fs = require('fs')
const path = require('path')

const issueUrl = 'https://api.github.com/repos/luoxue-victor/jijiang-blog/issues'
const issuesSortByLabel = {}
let ctx = ''
request({
  url: issueUrl,
  method: 'GET',
  json: true,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'
  }
}, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    body.forEach(issue => {
      issue.labels.forEach(label => {
        const labelNmae = label.name
        const hasLabel = !!issuesSortByLabel[labelNmae]
        if (hasLabel) {
          issuesSortByLabel[labelNmae].push(issue)
        } else {
          issuesSortByLabel[labelNmae] = [issue]
        }
      })
    })
    Object.keys(issuesSortByLabel).forEach(name => {
      ctx += `\n## ${name} \n\n` // title
      issuesSortByLabel[name].forEach(issue => {
        ctx += `[${issue.title}](${issue.html_url}) \n`
      })
    })

    const readme = fs.readFileSync('./README.md').toString()

    fs.writeFileSync('./README.md', ctx + readme)
  }
})
