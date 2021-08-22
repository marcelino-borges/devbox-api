## NPM SCRIPTS:

- `npm run dev`: run the API locally
- `npm start`: called by Heroku if there is no Procfile
- `npm run push_github`: checkout to github branch (main), merge from master (Heroku), push to github repo (remote) then checkout to the branch master (Heroku)
- `npm run heroku`: set the console to keep tracking/showoing all Heroku's logs

## Heroku command-line:

- Activate showing logs from service: `heroku logs --tail --app devbox-api`
- Set an enviroment variable: `heroku config:set VARIABLE_NAME=VALUE`
- Delete an enviroment variable: `heroku config:unset VARIABLE_NAME=VALUE`

## Instructions

- Commit/Push: after finishing any mods in this API, push the changes to heroku, then run the `npm run push_github` to sync with GITHUB
