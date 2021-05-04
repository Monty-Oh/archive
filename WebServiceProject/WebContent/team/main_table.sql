drop table main;

CREATE TABLE main(
	text_number INT PRIMARY KEY,
	id VARCHAR(20),
	submit_time VARCHAR(30),
	singer VARCHAR(20),
	title VARCHAR(20),
	genre VARCHAR(10),
	content VARCHAR(200),
	youtube_url VARCHAR(30),
	filename VARCHAR(100)
);

insert into main values('1', 'ohhanjin0330', '2017/12/01 18:03:05', 'Red', 'Ordinary World', 'Rock', '이번에 이블위딘 2의 ost로 나온 곡입니다. 들어보세요', 'hId34I6hOQg','Red - Ordinary World.mp3');
insert into main values('2', 'ohhanjin0330', '2017/12/02 18:03:10', 'The Script', 'Science&Faith', 'Rock', '추천합니다!', 'S2YXqgZTWu4','04 - Science And Faith.mp3');
insert into main values('3', 'ohhanjin0330', '2017/12/02 18:03:15', '10cm', '스토커', 'Rock', '다들 아실거라 생각합니다.', 'blUk5N48uzQ','10cm - 스토커.mp3');
insert into main values('4', 'ohhanjin0330', '2017/12/02 18:03:20', 'LinkinPark', 'Waiting For the End', 'Rock', '린킨파크 노래중에서 이게 제일 괜찮은것 같아요', '5qF_qbaWt3Q','Waiting For The End - Linkin Park.mp3');
insert into main values('5', 'ohhanjin0330', '2017/12/02 18:03:25', '자우림', '스물다섯 스물하나', 'Rock', '자우림노래중에서 제일좋아요', 'x4xZG64OxCo','자우림 - 스물다섯 스물하나.mp3');

insert into main values('6', 'a2175', '2017/12/03 18:03:05', 'U2', 'With Or Without You', 'Ballade', '들어보세연.', 'XmSdTa9kaiQ','U2 - With Or Without You.mp3');
insert into main values('7', 'a2175', '2017/12/03 18:03:10', 'Travis', 'Closer', 'Ballade', '노래 좋아욘.', 'u2hYn_4yuhc','Travis - Closer.mp3');
insert into main values('8', 'a2175', '2017/12/03 18:03:15', 'Sia', 'Chandelier', 'Ballade', '추천.', '2vjPBrBU-TM','Sia - Chandelier.mp3');
insert into main values('9', 'a2175', '2017/12/03 18:03:20', 'Queen', 'Under Pressure', 'Ballade', '고전 명곡.', 'a01QQZyl-_I','Queen - Under Pressure.mp3');
insert into main values('10', 'a2175', '2017/12/03 18:03:25', 'Muse', 'Starlight', 'Ballade', '뮤즈 좋아요.', 'Pgum6OT_VH8','Muse - Starlight.mp3');