insert into department (name) values ('Grocery'),('Meat'),('Fish');

insert into role (title, salary, department_id) values ('Manager','2000',1),('Butcher','1200',2),('Clerk','800',1);

insert into employee (first_name,last_name,role_id,manager_id) values
('Hans','Kevin',1,1),
('Joe','Cleaver',2,1),
('Amy','Fumz',3,1);