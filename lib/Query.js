const db = require('../db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');


class Query
{
    userUI(){
    
        inquirer
        .prompt([{
            type: 'list',
            name: 'action',
            message: 'Please select action:',
            choices: ['View All Departments',
            'View All Roles',
            'View All Employees',
            'Add A Department',
            'Add A Role',
            'Add An Employee',
            'Update an Employee Role',
            'Finish']
        }])
        .then(({action})=>{
            if(action == 'View All Departments')
            {
                this.getDepartments();
                this.userUI();
            }
            else if(action == 'View All Roles')
            {
                this.getRoles();
                this.userUI();
            }
            else if(action == 'View All Employees')
            {
                this.getEmployees();
                this.userUI();
            }
            else if(action == 'Add A Department')
            {
                this.addDepartment();
            }
            else if(action == 'Add A Role')
            {
                
            }
            else if(action == 'Add An Employee')
            {
                
            }
            else if(action == 'Update an Employee Role')
            {
                
            }
            else if(action == 'finish')
            {
                console.log('Database updated!')
            }
        });
    }

    getDepartments()
    {
        db.query(`select * from department`,(err,rows)=>{
            if(err)
            {
                console.log(err);
            }
            console.log('-----------------------------');
            console.table(rows);
        });
    }

    getRoles()
    {
        db.query(`select * from role`,(err,rows)=>{
            if(err)
            {
                console.log(err);
            }
            console.log('-----------------------------');
            console.table(rows);
        });
    }

    getEmployees()
    {
        db.query(`select * from employee`,(err,rows)=>{
            if(err)
            {
                console.log(err);
            }
            console.log('-----------------------------');
            console.table(rows);
        });
    }

    addDepartment()
    {
        inquirer
        .prompt({
            type:'input',
            name:'name',
            message:'Enter the department"s name'
        }).then(({name})=>{
       
            const params = name;
            db.query(`insert into department (name) values (?)`,params,(err,result)=>{
                if(err)
                    {
                        console.log(err);
                    }
                    console.log('Department Added');
                    this.userUI();
            });
        });
    }

    addRole()
    {
        
    }

}

module.exports = Query;