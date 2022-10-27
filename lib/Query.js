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
                this.addRole();
            }
            else if(action == 'Add An Employee')
            {
                this.addEmployee();
            }
            else if(action == 'Update an Employee Role')
            {
                this.updateEmployee();
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
        db.query(`select role.id, role.title, role.salary, department.name as department_name  from role left join department on role.department_id = department.id`,(err,rows)=>{
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
        const sql = `select A.id, A.first_name, A.last_name, A.title, A.department, B.Manager_Name from
        (
        (select employee.id, employee.first_name, employee.last_name,employee.manager_id as manager_id ,role.title as title, department.name as department
                from employee
                left join role on employee.role_id = role.id
                left join department on role.department_id = department.id)A,
        (select employee.id as ID, concat(employee.first_name,' ' ,employee.last_name) as Manager_Name
        from employee
        left join role on employee.role_id = role.id
        where role.title = 'Manager')B
        )where A.manager_id = B.ID`;

        
        db.query(sql,(err,rows)=>{
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
        inquirer
        .prompt([{
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role'
        },

        {
            type: 'number',
            name:'salary',
            message: 'Enter role"s salary'
        },

        {
            type: 'number',
            name: 'department_id',
            message: 'Enter department id'
        }
    ]).then(({title,salary,department_id})=>{
        const params = [title, salary, department_id];
        const sql = `insert into role (title, salary, department_id) values (?,?,?)`;

        db.query(sql,params,(err,result)=>{
            if(err)
                {
                    console.log(err);
                }
                console.log('Role Added');
                this.userUI();
        });
    });
    }

    addEmployee()
    {
        inquirer
        .prompt([{
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name'
        },

        {
            type: 'input',
            name:'last_name',
            message: 'Enter the last name'
        },

        {
            type: 'number',
            name: 'role_id',
            message: 'Enter role id'
        },

        {
            type: 'number',
            name: 'manager_id',
            message: 'Enter manager"s id'
        }
    ]).then(({first_name,last_name,role_id,manager_id})=>{
        const params = [first_name,last_name,role_id,manager_id];
        const sql = `insert into employee (first_name,last_name,role_id,manager_id) values (?,?,?,?)`;

        db.query(sql,params,(err,result)=>{
            if(err)
                {
                    console.log(err);
                }
                console.log('Employee Added');
                this.userUI();
        });
    });
    }

    updateEmployee()
    {
        inquirer
        .prompt([
        {
            type: 'number',
            name:'employee_id',
            message: 'Enter employee id to select employee'
        },

        {
            type: 'number',
            name: 'role_id',
            message: 'Enter the new role id for the employee'
        }
    ]).then(({employee_id,role_id})=>{
        const params = [employee_id,role_id];
        const sql = `update employee set role_id = (?) where id = (?)`;

        db.query(sql,params,(err,result)=>{
            if(err)
                {
                    console.log(err);
                }
                console.log('Employee role updated');
                this.userUI();
        });
    });
    }

}

module.exports = Query;