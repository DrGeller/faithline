<?php
    header('Content-Type:text/html; charset=utf8');
	/*Ajax数据*/
	$progressStatus = $_REQUEST['progressStatus'];
	if($progressStatus=='dataSaveProgress') {
		$workerName = $_REQUEST['workerName'];
		$clientNumber = $_REQUEST['clientNumber'];
		$clientName = $_REQUEST['clientName'];
		$clientAddress = $_REQUEST['clientAddress'];
		$measuringType = $_REQUEST['measuringType'];
		$voltageRank = $_REQUEST['voltageRank'];
		$clientType = $_REQUEST['clientType'];
		$year = $_REQUEST['year'];
		$month = $_REQUEST['month'];
		$day = $_REQUEST['day'];
		$mysql_link = mysql_connect('localhost','root','root');
	  mysql_select_db('calendar',$mysql_link);
		mysql_query("SET NAMES UTF8");
		if($clientType=='1') {
			$deadlineNumber = '2';
		} else if($clientType=='2') {
			$deadlineNumber = '3';
		};
		$completeStatus = 'no';
		mysql_query("insert into calendar(workerName,clientNumber,clientName,clientAddress,measuringType,voltageRank,year,month,day,deadlineNumber,today,clientType,completeStatus) values('$workerName','$clientNumber','$clientName','$clientAddress','$measuringType','$voltageRank','$year','$month','$day','$deadlineNumber','$day','$clientType','$completeStatus')");
		mysql_close($mysql_link);
		echo 'dataSaveOK';
	} else if($progressStatus=='achieveDataBaseLengthProgress') {
		$dateBoxYear = $_REQUEST['dateBoxYear'];
		$dateBoxMonth = $_REQUEST['dateBoxMonth'];
		$dateBoxDay = $_REQUEST['dateBoxDay'];
		$mysql_link = mysql_connect('localhost','root','root');
	    mysql_select_db('calendar',$mysql_link);
		$dayResult = mysql_query("select * from calendar where year = '$dateBoxYear' and month = '$dateBoxMonth' and day = '$dateBoxDay' and completeStatus = 'no'");
		$dayResultLength = mysql_num_rows($dayResult);
		mysql_close($mysql_link);
		echo $dayResultLength;
	} else if($progressStatus=='achieveEventDataLengthProgress') {
		$dateBoxYear = $_REQUEST['dateBoxYear'];
		$dateBoxMonth = $_REQUEST['dateBoxMonth'];
		$dateBoxDay = $_REQUEST['dateBoxDay'];
		$todayDate = $_REQUEST['todayDate'];
		$mysql_link = mysql_connect('localhost','root','root');
	    mysql_select_db('calendar',$mysql_link);
		$dayResult = mysql_query("select * from calendar where year = '$dateBoxYear' and month = '$dateBoxMonth' and day = '$dateBoxDay' and completeStatus = 'no'");
		$dayResultLength = mysql_num_rows($dayResult);
		$todayResult = mysql_query("select * from calendar where year = '$dateBoxYear' and month = '$dateBoxMonth' and day = '$dateBoxDay' and completeStatus = 'no'"); 
		while($row01=mysql_fetch_array($todayResult,MYSQL_ASSOC)) {
			$todayResultArray[] = $row01;
		};
		//echo $dayResultLength;
		for($i=0;$i<$dayResultLength;$i++) {
		    if($todayResultArray[$i]['today']!=$todayDate) {		
			    $deadlineNumber01 = $todayResultArray[$i]['deadlineNumber']-1;
				echo $deadlineNumber01;
			    if($deadlineNumber01>=0) {
					$clientNumber01 = $todayResultArray[$i]['clientNumber'];
				    mysql_query("update calendar set deadlineNumber = '$deadlineNumber01' where year = '$dateBoxYear' and month = '$dateBoxMonth' and day = '$dateBoxDay' and clientNumber = '$clientNumber01'");
				    mysql_query("update calendar set today = '$todayDate' where year = '$dateBoxYear' and month = '$dateBoxMonth' and day = '$dateBoxDay'  and clientNumber = '$clientNumber01'");
			    };
		    };
		};
		mysql_close($mysql_link);
		echo $dayResultLength;
	} else if($progressStatus=='achieveEventProgress') {
		$dateBoxYear = $_REQUEST['dateBoxYear'];
		$dateBoxMonth = $_REQUEST['dateBoxMonth'];
		$dateBoxDay = $_REQUEST['dateBoxDay'];
		$mysql_link = mysql_connect('localhost','root','root');
	    mysql_select_db('calendar',$mysql_link);
		mysql_query("SET NAMES UTF8");
		$dayResult = mysql_query("select * from calendar where year = '$dateBoxYear' and month = '$dateBoxMonth' and day = '$dateBoxDay' and completeStatus = 'no'");
		while($row=mysql_fetch_array($dayResult,MYSQL_ASSOC)) {
			$dayReasultArray[] = $row;
		};
		echo (json_encode($dayReasultArray));
		mysql_close($mysql_link);
	} else if($progressStatus=='accomplishWork') {
		$clientNumber = $_REQUEST['clientNumber'];
		$mysql_link = mysql_connect('localhost','root','root');
	    mysql_select_db('calendar',$mysql_link);
		mysql_query("SET NAMES UTF8");
		mysql_query("update calendar set completeStatus = 'yes' where clientNumber = '$clientNumber'");
		echo 'ok';
		mysql_close($mysql_link);
	};
?>