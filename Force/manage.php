<?php
	header('Content-Type:text/html; charset=utf8');
	/*Ajax数据*/
	$progressStatus = $_REQUEST["progressStatus"];
	
	function getIP() {
		if (@$_SERVER["HTTP_X_FORWARDED_FOR"]) 
			$ip = $_SERVER["HTTP_X_FORWARDED_FOR"]; 
		else if (@$_SERVER["HTTP_CLIENT_IP"]) 
			$ip = $_SERVER["HTTP_CLIENT_IP"]; 
		else if (@$_SERVER["REMOTE_ADDR"]) 
			$ip = $_SERVER["REMOTE_ADDR"]; 
		else if (@getenv("HTTP_X_FORWARDED_FOR")) 
			$ip = getenv("HTTP_X_FORWARDED_FOR"); 
		else if (@getenv("HTTP_CLIENT_IP")) 
			$ip = getenv("HTTP_CLIENT_IP"); 
		else if (@getenv("REMOTE_ADDR")) 
			$ip = getenv("REMOTE_ADDR"); 
		else 
			$ip = "unknown"; 
		return $ip; 
	}
	
	$userIP = getIP();

	if($progressStatus == "loginProgress") {
		$mysql_link = mysql_connect('localhost','root','2925');
		mysql_select_db('Force',$mysql_link);
		mysql_query("SET NAMES UTF8");
		if($userIP!="unknown") {
			$userDataResult = mysql_query("select * from userInfo where userIP = '$userIP'");
			$userDataArray=mysql_fetch_array($userDataResult,MYSQL_ASSOC);
			mysql_close($mysql_link);
		  	echo (json_encode($userDataArray,JSON_UNESCAPED_UNICODE));
		} else {
			echo ("error");
		}
	}
?>