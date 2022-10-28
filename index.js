const inquirer = require('inquirer');
const Query = require('./lib/Query');
const db = require('./lib/Query');

//calls the Query class from lib
const query = new Query();


//query function
query.userUI();

