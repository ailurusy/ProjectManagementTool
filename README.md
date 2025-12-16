# ProjectManagementTool
Full-stack Go+TS tool for managing tasks and projects

Next steps that I'd like to work on: 
-  test coverage and 
- ui optimization (there are some repetative elements that I would prefer to optimise if there is more time)
- adding service layer logic to the server

Prerequisites: 
-------------------
#install go 
#installed node 

Check if everything is available by running: 
---------------------------------------------
# node -v 
# npm -v 
# go version

If you are getting a reply with versions - everything is good and you can move on to the next step.
If not.... Well... Inhale and exhale first 

You can either visit the following web-sites and download everything by yourself or use homebrew to do the hard labour: 

Option 1
------------
Go: https://go.dev/doc/install
Node: https://nodejs.org/en/download
Npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Option 2 
---------------
1. Download homebrew: https://brew.sh/
2. Run folowing commands:
   brew install go
   brew install node


The rest of the Set Up should be pretty simple: 
--------------------------------------------------
1. Move to project-manager-api folder (cd project-manager-api)
2. Start ther server (project-manager-api) first by running: go run .

3. Move to project-manager-ui folder (cd project-manager-ui) 
4. Start ther frontend (project-manager-ui): npm start
