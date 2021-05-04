drop table postInfo;

create table postInfo (
	postNum		int not null AUTO_INCREMENT primary key,
	genre		int not null,
	songTitle	varchar(100),
	fileName	varchar(100),
	youtubeLink	varchar(100),
	viewCount	int not null
	);
	
//테스트용	

