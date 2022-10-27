drop table if exists department;
drop table if exists role;
drop table if exists employee;

create table department(
    id integer auto_increment primary key,
    name varchar(30) NOT NULL
);

create table role(
    id integer auto_increment primary key,
    title varchar(30) NOT NULL,
    salary decimal NOT NULL,
    department_id integer,
    constraint fk_departmet foreign key (department_id) references department(id)
);

create table employee(
    id integer auto_increment primary key,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id integer,
    manager_id integer DEFAULT NULL,
    constraint manager_fk foreign key (manager_id) references employee(id),
    constraint fk_role foreign key (role_id) references role(id)
);