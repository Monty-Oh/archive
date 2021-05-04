drop table userInfo;

create table userInfo(
	id			varchar(30) not null,
	password	varchar(30) not null,
	birth		varchar(30) not null,
	phone		varchar(30) not null,
	primary key(id,phone)
);

insert into userInfo values('a2175', '0000', '1','01040532175');
insert into userInfo values('as2175', '0000', '1', '01040532175');
insert into userInfo values('aq2175', '0000', '1', '01040532175');
insert into userInfo values('ad2175', '0000', '1', '01040532175');
insert into userInfo values('az2175', '0000', '1', '01040532175');