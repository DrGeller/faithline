<?php
	header('Content-Type:text/html; charset=utf8');
	
	$progressStatus = $_POST[progressStatus];
	
	if($progressStatus == 'init') {
		echo 'ok';
	} else if($progressStatus == 'login') {
		$userName = $_POST[userName];
		$passWord = $_POST[passWord];
		$mysql_link = mysql_connect('localhost','root','root');
		mysql_select_db('faithline',$mysql_link);
		mysql_query("SET NAMES UTF8");
		$searchResult01 = mysql_query("select * from userInfo where userName = '$userName'");
		$searchResult02 = mysql_query("select * from userInfo where password = '$password'");
		$searchData01 = mysql_fetch_array($searchResult01);
		$searchData02 = mysql_fetch_array($searchResult02);
		if($searchData01['userName']==$userName && $searchData02['password']==$password) {
			echo '01';
		} else if($searchData01['userName']!=$userName) {
			echo '02';
		} else if($searchData02['userPassword']!=$password) {
			echo '03';
		}
	} else if($progressStatus == 'regist') {
		
	} else if($progressStatus == 'logout') {
		
	}
?>