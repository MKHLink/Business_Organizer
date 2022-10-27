const inquirer = require('inquirer');

const userUI = () =>{
    
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
            console.log('View All Department');
            userUI();
        }
        else if(action == 'View All Roles')
        {
            console.log('Roles');
            userUI();
        }
        else if(action == 'View All Employees')
        {
            console.log('Employees');
            userUI();
        }
        else if(action == 'Add A Department')
        {
            console.log('Add Department');
            userUI();
        }
        else if(action == 'Add A Role')
        {
            console.log('Add role');
            userUI();
        }
        else if(action == 'Add An Employee')
        {
            console.log('add employee');
            userUI();
        }
        else if(action == 'Update an Employee Role')
        {
            console.log('update');
            userUI();
        }
        else if(action == 'finish')
        {
            console.log('Database updated!')
        }
    });
}

//userUI();