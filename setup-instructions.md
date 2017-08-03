## Running

### Setup for Mac

Make sure you've followed the Mac Basic Setup under Development Setup on Confluence

* In one command window:
  1. cd to root folder of this project and launch a MongoDB instance: *sudo mongod*
* In a second command window (launched from root folder): 
  1. cd client
  2. ensure dependencies are installed: *yarn install*
* In a third command window: (launched from root folder):
  3. cd server
  4. ensure dependencies are installed: *yarn install* 
  5. go to config/default.json and config/production.json and set token secret to a random string
  6. run server: *yarn run start*
* In a fourth command window: (launched from root folder):
  1. cd client 
  2. transpile test client app: *gulp babel && gulp watch&*

You can then view the demo application in a browser at localhost:3030, and find example queries and mutations for the test client in the /examples folder.

The Roles for creating a user are:   USER, ADMIN, or SUPER_ADMIN

Only USER can create orders and only ADMIN or SUPER_ADMIN can create menu items

Enjoy

### Setup for PC

Make sure you've followed the PC Basic Setup under Development Setup on Confluence. 

* Follow the steps in Setup for Mac 
* If you're having issues installing gulp globally, you can work around this by running *yarn gulp babel && yarn gulp watch&* instead.

You can then view the demo application in a browser at localhost:3030, and find example queries and mutations for the test client in the /examples folder.