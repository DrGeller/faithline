<?php
  header('Content-Type:text/html; charset=utf8');
	
	/*Ajax数据*/
	$progressStatus = $_REQUEST['progressStatus'];
	
	
	
	if($progressStatus=='loginProgress') {
		$loginName = $_REQUEST['loginName'];
	  $loginPassword = $_REQUEST['loginPassword'];
		$mysql_link = mysql_connect('localhost','root','8426');
	  mysql_select_db('faithline',$mysql_link);
		$userDataResult01 = mysql_query("select * from faithline where userName = '$loginName'");
		$userDataResult02 = mysql_query("select * from faithline where userPassword = '$loginPassword'");
		$userDataArray01 = mysql_fetch_array($userDataResult01);
		$userDataArray02 = mysql_fetch_array($userDataResult02);
		if($userDataArray01['userName']==$loginName&&$userDataArray02['userPassword']==$loginPassword) {
			echo 'OK';
		} else if($userDataArray01['userName']!=$loginName) {
			echo 'userNameWrong';
		} else if($userDataArray02['userPassword']!=$loginPassword) {
			echo 'userPasswordWrong';
		};
		mysql_close($mysql_link);
	} else if($progressStatus=='projectBuilding') {
		$projectName = $_REQUEST['projectName'];
	    $projectCompany = $_REQUEST['projectCompany'];
	    $projectUser = $_REQUEST['projectUser'];
	    $slash = '/';
	    $baseDir = 'Data';
	    $projectPath = $baseDir.$slash.$projectCompany;
	    $projectUserPath = $baseDir.$slash.$projectCompany.$slash.$projectUser;
	    $projectFilePath = $baseDir.$slash.$projectCompany.$slash.$projectUser.$slash.$projectName.'.xml';
		$mysql_link = mysql_connect('localhost','root','8426');
		echo ($projectName.' '.$projectCompany.' '.$projectUser);
	    mysql_select_db('faithline',$mysql_link);
	    if(!file_exists(iconv('utf-8', 'gbk', $projectPath))) {
		    mkdir(iconv('utf-8', 'gbk', $projectPath),0777);
		    if(!file_exists(iconv('utf-8', 'gbk', $projectUserPath))) {
			    mkdir(iconv('utf-8', 'gbk', $projectUserPath),0777);
			    if(!file_exists(iconv('utf-8', 'gbk', $projectFilePath))) {
				    $fopen = fopen(iconv('utf-8', 'gbk', $projectFilePath),'w+');
				    fclose($fopen);
				    echo('XML file is done');
					mysql_query("insert into faithline_simcircuit(projectName,projectCompany,projectUser,projectFilePath) values('$projectName','$projectCompany','$projectUser','$projectFilePath')");
		            mysql_close($mysql_link);
			    };
		    };
	    };
	} else if($progressStatus=='achieveFileDataArrayLength') {
		$mysql_link = mysql_connect('localhost','root','8426');
	    mysql_select_db('faithline',$mysql_link);
		$projectFilePathResult = mysql_query("select projectFilePath from faithline_simcircuit");
		$projectFilePathResultLength = mysql_num_rows($projectFilePathResult);
		mysql_close($mysql_link);
		echo $projectFilePathResultLength;
	} else if($progressStatus=='fileSystemBoxProgress') {
		$mysql_link = mysql_connect('localhost','root','8426');
	    $mysql_select_db = mysql_select_db('faithline',$mysql_link);
		$projectFilePathResult = mysql_query("select projectFilePath from faithline_simcircuit");
		$projectFilePathResultLength = mysql_num_rows($projectFilePathResult);
		for($i=0;$i<$projectFilePathResultLength;$i++) {
			$projectFilePathResultArray = mysql_fetch_row($projectFilePathResult);
			$projectFileName = basename($projectFilePathResultArray[0],'.xml');
			$projectFileNameDataArray[$i] = $projectFileName;
		};
		echo (json_encode($projectFileNameDataArray));
		mysql_close($mysql_link);
	}  else if($progressStatus=='achieveProjectData') {
		$fileName =  $_REQUEST['fileName'];
		$mysql_link = mysql_connect('localhost','root','8426');
	    $mysql_select_db = mysql_select_db('faithline',$mysql_link);
		$SQLResult = mysql_query("select * from faithline_simcircuit where projectName = '$fileName'");
		$SQLResultDataArray = mysql_fetch_array($SQLResult);
		if($SQLResultDataArray['ID']!='') {
			$projectDataArray = array($SQLResultDataArray['ID'],$SQLResultDataArray['projectName'],$SQLResultDataArray['projectCompany'],$SQLResultDataArray['projectUser'],$SQLResultDataArray['projectFilePath']);
			echo (json_encode($projectDataArray));
		}
		mysql_close($mysql_link);
	} else if($progressStatus=='achieveElementPositionData') {
		$fileName =  $_REQUEST['fileName'];
		$mysql_link = mysql_connect('localhost','root','8426');
	    $mysql_select_db = mysql_select_db('faithline',$mysql_link);
		$SQLResult = mysql_query("select * from faithline_simcircuit where projectName = '$fileName'");
		$SQLResultDataArray = mysql_fetch_array($SQLResult);
		mysql_close($mysql_link);
		if($SQLResultDataArray['ID']!='') {
			$DOM  = new DomDocument('1.0','utf-8');
		    $DOM->formatOutput=true;
		    $DOM->preservaWhiteSpace=false;
		    $DOM->load($SQLResultDataArray['projectFilePath']);
		    $tempNode01 = $DOM->getElementsByTagName('measuringScope');
			$tempNode02 = $DOM->getElementsByTagName('shortCircuitFaultModule');
			$tempNode03 = $DOM->getElementsByTagName('electricityTransmationModule');
			$tempNode04 = $DOM->getElementsByTagName('threePhase_AC_supply');
			$elementPositionDataArray = array(0,1,2,3,4,5,6,7,8,9,10);
			if($tempNode01->length!=0) {
				$elementTag = $tempNode01->item(0)->getElementsByTagName('elementTag');
				$elementTagValue = $elementTag->item(0)->nodeValue;
				if($elementTagValue == '1') {
					$elementPositionLeft = $tempNode01->item(0)->getElementsByTagName('elementPositionLeft');
					$measuringScopePositionLeftValue = $elementPositionLeft->item(0)->nodeValue;
					$elementPositionTop = $tempNode01->item(0)->getElementsByTagName('elementPositionTop');
					$measuringScopePositionTopValue = $elementPositionTop->item(0)->nodeValue;
					$elementPositionDataArray[0] = 'measuringScope';
					$elementPositionDataArray[1] = $measuringScopePositionLeftValue;
					$elementPositionDataArray[2] = $measuringScopePositionTopValue;
				} 
			} 
			if($tempNode02->length!=0) {
				$elementTag = $tempNode02->item(0)->getElementsByTagName('elementTag');
				$elementTagValue = $elementTag->item(0)->nodeValue;
				if($elementTagValue == '1') {
					$elementPositionLeft = $tempNode02->item(0)->getElementsByTagName('elementPositionLeft');
					$shortCircuitFaultModulePositionLeftValue = $elementPositionLeft->item(0)->nodeValue;
					$elementPositionTop = $tempNode02->item(0)->getElementsByTagName('elementPositionTop');
					$shortCircuitFaultModulePositionTopValue = $elementPositionTop->item(0)->nodeValue;
					$elementPositionDataArray[3] = 'shortCircuitFaultModule';
					$elementPositionDataArray[4] = $shortCircuitFaultModulePositionLeftValue;
					$elementPositionDataArray[5] = $shortCircuitFaultModulePositionTopValue;
				} 
			}
			if($tempNode04->length!=0) {
				$elementTag = $tempNode04->item(0)->getElementsByTagName('elementTag');
				$elementTagValue = $elementTag->item(0)->nodeValue;
				if($elementTagValue == '1') {
					$elementPositionLeft = $tempNode04->item(0)->getElementsByTagName('elementPositionLeft');
					$threePhase_AC_supplyPositionLeftValue = $elementPositionLeft->item(0)->nodeValue;
					$elementPositionTop = $tempNode04->item(0)->getElementsByTagName('elementPositionTop');
					$threePhase_AC_supplyPositionTopValue = $elementPositionTop->item(0)->nodeValue;
					$elementPositionDataArray[6] = 'powerSource';
					$elementPositionDataArray[7] = $threePhase_AC_supplyPositionLeftValue;
					$elementPositionDataArray[8] = $threePhase_AC_supplyPositionTopValue;
				}
			} 
			if($tempNode03->length!=0) {
				$elementTag = $tempNode03->item(0)->getElementsByTagName('elementTag');
				$elementTagValue = $elementTag->item(0)->nodeValue;
				if($elementTagValue == '1') {
					$IDDataNum = $tempNode03->item(0)->getElementsByTagName('IDNum')->length;
					$elementPositionDataArray[9] = 'electricityTransmationModule';
					$elementPositionDataArray[10] = $IDDataNum;
					for($i=1;$i<=$IDDataNum;$i++) {
						$tempNode05 = $DOM->getElementsByTagName('ID'.$i);
						if($tempNode05->length!=0) {
							$IDNumValue = $tempNode05->item(0)->getElementsByTagName('IDNum')->item(0)->nodeValue;
							$elementPositionLeft = $tempNode05->item(0)->getElementsByTagName('elementPositionLeft');
					        $electricityTransmationModulePositionLeftValue = $elementPositionLeft->item(0)->nodeValue;
					        $elementPositionTop = $tempNode05->item(0)->getElementsByTagName('elementPositionTop');
					        $electricityTransmationModulePositionTopValue = $elementPositionTop->item(0)->nodeValue;
							array_push($elementPositionDataArray,$IDNumValue,$electricityTransmationModulePositionLeftValue,$electricityTransmationModulePositionTopValue);
						}
					}
				}
		    }
			echo(json_encode($elementPositionDataArray));
		}
	} else if($progressStatus=='measuringScopeDataCache') {
		$left = $_REQUEST['elementPositionLeft'];
		$top = $_REQUEST['elementPositionTop'];
		$projectData_name = $_REQUEST['projectData_name'];
		$mysql_link = mysql_connect('localhost','root','8426');
	    mysql_select_db('faithline',$mysql_link);
		$projectFilePathResult01 = mysql_query("select projectFilePath,projectName from faithline_simcircuit where projectName = '$projectData_name'");
		$projectFilePathResultArray01 = mysql_fetch_array($projectFilePathResult01);
		mysql_close($mysql_link);
		$DOM  = new DomDocument('1.0','utf-8');
		$DOM->formatOutput=true;
		$DOM->preservaWhiteSpace=false;
		$DOM->load($projectFilePathResultArray01['projectFilePath']);
		$tempNode01 = $DOM->getElementsByTagName('projectSimcircuit');
		$tempNode02 = $DOM->getElementsByTagName('measuringScope');
		echo('00');
		if($tempNode01->length == 0) {
			$projectSimcircuit = $DOM->createElement('projectSimcircuit');
			$DOM->appendChild($projectSimcircuit);
			if($tempNode02->length == 0) {
				echo('01');
				$measuringScope = $DOM->createElement('measuringScope');
				$projectSimcircuit->appendChild($measuringScope);
				$elementTag = $DOM->createElement('elementTag');
				$measuringScope->appendChild($elementTag);
				$elementTagValue = $DOM->createTextNode('1');
				$elementTag->appendChild($elementTagValue);
				$elementPosition = $DOM->createElement('elementPosition');
				$measuringScope->appendChild($elementPosition);
				$elementPositionLeft = $DOM->createElement('elementPositionLeft');
				$elementPosition->appendChild($elementPositionLeft);
				$elementPositionLeftValue = $DOM->createTextNode($left);
				$elementPositionLeft->appendChild($elementPositionLeftValue);
				$elementPositionTop = $DOM->createElement('elementPositionTop');
				$elementPosition->appendChild($elementPositionTop);
				$elementPositionTopValue = $DOM->createTextNode($top);
				$elementPositionTop->appendChild($elementPositionTopValue);
				$measuringScopeXMLData = $DOM->saveXML();
		        $fopen = fopen($projectFilePathResultArray01['projectFilePath'],'w');
		        fwrite($fopen,$measuringScopeXMLData);
		        fclose($fopen);
			}
		} else {
			if($tempNode02->length == 0) {
				echo('02');
				$projectSimcircuit = $DOM->getElementsByTagName('projectSimcircuit');
				$measuringScope = $DOM->createElement('measuringScope');
		        $projectSimcircuit->item(0)->appendChild($measuringScope);
				$elementTag = $DOM->createElement('elementTag');
				$measuringScope->appendChild($elementTag);
				$elementTagValue = $DOM->createTextNode('1');
				$elementTag->appendChild($elementTagValue);
				$elementPosition = $DOM->createElement('elementPosition');
				$measuringScope->appendChild($elementPosition);
				$elementPositionLeft = $DOM->createElement('elementPositionLeft');
				$elementPosition->appendChild($elementPositionLeft);
				$elementPositionLeftValue = $DOM->createTextNode($left);
				$elementPositionLeft->appendChild($elementPositionLeftValue);
				$elementPositionTop = $DOM->createElement('elementPositionTop');
				$elementPosition->appendChild($elementPositionTop);
				$elementPositionTopValue = $DOM->createTextNode($top);
				$elementPositionTop->appendChild($elementPositionTopValue);
				$DOM->save($projectFilePathResultArray01['projectFilePath']);
			} else {
				echo('03');
				$DOM->load($projectFilePathResultArray01['projectFilePath']);
				$measuringScope = $DOM->getElementsByTagName('measuringScope');
				$elementPosition = $measuringScope->item(0)->getElementsByTagName('elementPosition');
				$elementPositionLeft = $elementPosition->item(0)->getElementsByTagName('elementPositionLeft');
				$elementPositionLeft->item(0)->nodeValue = $left;
				$elementPositionTop = $elementPosition->item(0)->getElementsByTagName('elementPositionTop');
				$elementPositionTop->item(0)->nodeValue = $top;
			    $DOM->save($projectFilePathResultArray01['projectFilePath']);
			}
		}
	} else if($progressStatus=='shortCircuitFaultModuleDataCache') {
		$shortFaultType = $_REQUEST['shortFaultType'];
		$triggerDelayTime = $_REQUEST['triggerDelayTime'];
		$left = $_REQUEST['elementPositionLeft'];
		$top = $_REQUEST['elementPositionTop'];
		$projectData_name = $_REQUEST['projectData_name'];
		$mysql_link = mysql_connect('localhost','root','8426');
	    mysql_select_db('faithline',$mysql_link);
		$projectFilePathResult01 = mysql_query("select projectFilePath,projectName from faithline_simcircuit where projectName = '$projectData_name'");
		$projectFilePathResultArray01 = mysql_fetch_array($projectFilePathResult01);
		mysql_close($mysql_link);
		$DOM  = new DomDocument('1.0','utf-8');
		$DOM->formatOutput=true;
		$DOM->preservaWhiteSpace=false;
		$DOM->load($projectFilePathResultArray01['projectFilePath']);
		$tempNode01 = $DOM->getElementsByTagName('projectSimcircuit');
		$tempNode02 = $DOM->getElementsByTagName('shortCircuitFaultModule');
		if($tempNode01->length == 0) {
			$projectSimcircuit = $DOM->createElement('projectSimcircuit');
			$DOM->appendChild($projectSimcircuit);
			if($tempNode02->length == 0) {
				echo('01');
				$shortCircuitFaultModule = $DOM->createElement('shortCircuitFaultModule');
				$projectSimcircuit->appendChild($shortCircuitFaultModule);
				$triggerDelay = $DOM->createElement('triggerDelay');
				$shortCircuitFaultModule->appendChild($triggerDelay);
				$triggerDelayValue = $DOM->createTextNode($triggerDelayTime);
				$triggerDelay->appendChild($triggerDelayValue);
				$faultType = $DOM->createElement('faultType');
				$shortCircuitFaultModule->appendChild($faultType);
				$faultTypeValue = $DOM->createTextNode($shortFaultType);
				$faultType->appendChild($faultTypeValue);
				$elementTag = $DOM->createElement('elementTag');
				$shortCircuitFaultModule->appendChild($elementTag);
				$elementTagValue = $DOM->createTextNode('1');
				$elementTag->appendChild($elementTagValue);
				$elementPosition = $DOM->createElement('elementPosition');
				$shortCircuitFaultModule->appendChild($elementPosition);
				$elementPositionLeft = $DOM->createElement('elementPositionLeft');
				$elementPosition->appendChild($elementPositionLeft);
				$elementPositionLeftValue = $DOM->createTextNode($left);
				$elementPositionLeft->appendChild($elementPositionLeftValue);
				$elementPositionTop = $DOM->createElement('elementPositionTop');
				$elementPosition->appendChild($elementPositionTop);
				$elementPositionTopValue = $DOM->createTextNode($top);
				$elementPositionTop->appendChild($elementPositionTopValue);
				$shortCircuitFaultModuleXMLData = $DOM->saveXML();
		        $fopen = fopen($projectFilePathResultArray01['projectFilePath'],'w');
		        fwrite($fopen,$shortCircuitFaultModuleXMLData);
		        fclose($fopen);
			}
		} else {
			if($tempNode02->length == 0) {
				echo('02');
				$projectSimcircuit = $DOM->getElementsByTagName('projectSimcircuit');
				$shortCircuitFaultModule = $DOM->createElement('shortCircuitFaultModule');
		        $projectSimcircuit->item(0)->appendChild($shortCircuitFaultModule);
				$triggerDelay = $DOM->createElement('triggerDelay');
				$shortCircuitFaultModule->appendChild($triggerDelay);
				$triggerDelayValue = $DOM->createTextNode($triggerDelayTime);
				$triggerDelay->appendChild($triggerDelayValue);
				$faultType = $DOM->createElement('faultType');
				$shortCircuitFaultModule->appendChild($faultType);
				$faultTypeValue = $DOM->createTextNode($shortFaultType);
				$faultType->appendChild($faultTypeValue);
				$elementTag = $DOM->createElement('elementTag');
				$shortCircuitFaultModule->appendChild($elementTag);
				$elementTagValue = $DOM->createTextNode('1');
				$elementTag->appendChild($elementTagValue);
				$elementPosition = $DOM->createElement('elementPosition');
				$shortCircuitFaultModule->appendChild($elementPosition);
				$elementPositionLeft = $DOM->createElement('elementPositionLeft');
				$elementPosition->appendChild($elementPositionLeft);
				$elementPositionLeftValue = $DOM->createTextNode($left);
				$elementPositionLeft->appendChild($elementPositionLeftValue);
				$elementPositionTop = $DOM->createElement('elementPositionTop');
				$elementPosition->appendChild($elementPositionTop);
				$elementPositionTopValue = $DOM->createTextNode($top);
				$elementPositionTop->appendChild($elementPositionTopValue);
				$DOM->save($projectFilePathResultArray01['projectFilePath']);
			} else {
				echo('03');
				$DOM->load($projectFilePathResultArray01['projectFilePath']);
			    $triggerDelayValue = $DOM->getElementsByTagName('triggerDelay');
				$triggerDelayValue->item(0)->nodeValue = $triggerDelayTime;
			    $faultTypeValue = $DOM->getElementsByTagName('faultType');
				$faultTypeValue->item(0)->nodeValue = $shortFaultType;
				$shortCircuitFaultModule = $DOM->getElementsByTagName('shortCircuitFaultModule');
				$elementPosition = $shortCircuitFaultModule->item(0)->getElementsByTagName('elementPosition');
				$elementPositionLeft = $elementPosition->item(0)->getElementsByTagName('elementPositionLeft');
				$elementPositionLeft->item(0)->nodeValue = $left;
				$elementPositionTop = $elementPosition->item(0)->getElementsByTagName('elementPositionTop');
				$elementPositionTop->item(0)->nodeValue = $top;
			    $DOM->save($projectFilePathResultArray01['projectFilePath']);
			}
		}
	} else if($progressStatus=='electricityTransmationModuleDataCache') {
		$RValue = $_REQUEST['RValue'];
		$XValue = $_REQUEST['XValue'];
		$elementID = $_REQUEST['elementID'];
		$left = $_REQUEST['elementPositionLeft'];
		$top = $_REQUEST['elementPositionTop'];
		$projectData_name = $_REQUEST['projectData_name'];
		$mysql_link = mysql_connect('localhost','root','8426');
	    mysql_select_db('faithline',$mysql_link);
		$projectFilePathResult01 = mysql_query("select projectFilePath,projectName from faithline_simcircuit where projectName = '$projectData_name'");
		$projectFilePathResultArray01 = mysql_fetch_array($projectFilePathResult01);
		mysql_close($mysql_link);
		$DOM  = new DomDocument('1.0','utf-8');
		$DOM->formatOutput=true;
		$DOM->preservaWhiteSpace=false;
		$DOM->load($projectFilePathResultArray01['projectFilePath']);
		$tempNode01 = $DOM->getElementsByTagName('projectSimcircuit');
		$tempNode02 = $DOM->getElementsByTagName('electricityTransmationModule');
		$tempNode03 = $DOM->getElementsByTagName('ID'.$elementID);
		$tempNode04 = $DOM->getElementsByTagName('elementTag');
		if($tempNode01->length == 0) {
			echo('01'.' ');
			$projectSimcircuit = $DOM->createElement('projectSimcircuit');
			$DOM->appendChild($projectSimcircuit);
			if($tempNode02->length == 0) {
				echo('02'.' ');
		        $electricityTransmationModule = $DOM->createElement('electricityTransmationModule');
		        $projectSimcircuit->appendChild($electricityTransmationModule);
				$ID = $DOM->createElement('ID'.$elementID);
		        $electricityTransmationModule->appendChild($ID);
				$IDNum = $DOM->createElement('IDNum');
				$ID->appendChild($IDNum);
				$IDNumValue = $DOM->createTextNode($elementID);
				$IDNum->appendChild($IDNumValue);
		        $risistance = $DOM->createElement('risistance');
		        $ID->appendChild($risistance);
		        $risistanceValue = $DOM->createTextNode($RValue);
		        $risistance->appendChild($risistanceValue);
		        $reactance = $DOM->createElement('reactance');
		        $ID->appendChild($reactance);
		        $reactanceValue = $DOM->createTextNode($XValue);
		        $reactance->appendChild($reactanceValue);
				$elementTag = $DOM->createElement('elementTag');
				$electricityTransmationModule->appendChild($elementTag);
				$elementTagValue = $DOM->createTextNode('1');
				$elementTag->appendChild($elementTagValue);
				$elementPosition = $DOM->createElement('elementPosition');
				$ID->appendChild($elementPosition);
				$elementPositionLeft = $DOM->createElement('elementPositionLeft');
				$elementPosition->appendChild($elementPositionLeft);
				$elementPositionLeftValue = $DOM->createTextNode($left);
				$elementPositionLeft->appendChild($elementPositionLeftValue);
				$elementPositionTop = $DOM->createElement('elementPositionTop');
				$elementPosition->appendChild($elementPositionTop);
				$elementPositionTopValue = $DOM->createTextNode($top);
				$elementPositionTop->appendChild($elementPositionTopValue);
		        $electricityTransmationModuleXMLData = $DOM->saveXML();
		        $fopen = fopen($projectFilePathResultArray01['projectFilePath'],'w');
		        fwrite($fopen,$electricityTransmationModuleXMLData);
		        fclose($fopen);
			}
		} else {
			echo('03');
			if($tempNode02->length == 0) {
				echo('04');
				$projectSimcircuit = $DOM->getElementsByTagName('projectSimcircuit');
				$electricityTransmationModule = $DOM->createElement('electricityTransmationModule');
		        $projectSimcircuit->item(0)->appendChild($electricityTransmationModule);
				$ID = $DOM->createElement('ID'.$elementID);
		        $electricityTransmationModule->appendChild($ID);
				$IDNum = $DOM->createElement('IDNum');
				$ID->appendChild($IDNum);
				$IDNumValue = $DOM->createTextNode($elementID);
				$IDNum->appendChild($IDNumValue);
		        $risistance = $DOM->createElement('risistance');
		        $ID->appendChild($risistance);
		        $risistanceValue = $DOM->createTextNode($RValue);
		        $risistance->appendChild($risistanceValue);
		        $reactance = $DOM->createElement('reactance');
		        $ID->appendChild($reactance);
		        $reactanceValue = $DOM->createTextNode($XValue);
		        $reactance->appendChild($reactanceValue);
				$elementTag = $DOM->createElement('elementTag');
				$electricityTransmationModule->appendChild($elementTag);
				$elementTagValue = $DOM->createTextNode('1');
				$elementTag->appendChild($elementTagValue);
				$elementPosition = $DOM->createElement('elementPosition');
				$ID->appendChild($elementPosition);
				$elementPositionLeft = $DOM->createElement('elementPositionLeft');
				$elementPosition->appendChild($elementPositionLeft);
				$elementPositionLeftValue = $DOM->createTextNode($left);
				$elementPositionLeft->appendChild($elementPositionLeftValue);
				$elementPositionTop = $DOM->createElement('elementPositionTop');
				$elementPosition->appendChild($elementPositionTop);
				$elementPositionTopValue = $DOM->createTextNode($top);
				$elementPositionTop->appendChild($elementPositionTopValue);
		        $DOM->save($projectFilePathResultArray01['projectFilePath']);
			} else {
				if($tempNode03->length == 0) {
					$electricityTransmationModule = $DOM->getElementsByTagName('electricityTransmationModule');
				    $ID = $DOM->createElement('ID'.$elementID);
		            $electricityTransmationModule->item(0)->appendChild($ID);
					$IDNum = $DOM->createElement('IDNum');
				    $ID->appendChild($IDNum);
				    $IDNumValue = $DOM->createTextNode($elementID);
				    $IDNum->appendChild($IDNumValue);
		            $risistance = $DOM->createElement('risistance');
		            $ID->appendChild($risistance);
		            $risistanceValue = $DOM->createTextNode($RValue);
		            $risistance->appendChild($risistanceValue);
		            $reactance = $DOM->createElement('reactance');
		            $ID->appendChild($reactance);
		            $reactanceValue = $DOM->createTextNode($XValue);
		            $reactance->appendChild($reactanceValue);
					if($tempNode01->length == 0) {
						$elementTag = $DOM->createElement('elementTag');
				        $electricityTransmationModule->item(0)->appendChild($elementTag);
				        $elementTagValue = $DOM->createTextNode('1');
						 $elementTag->appendChild($elementTagValue);
					}
				    $elementPosition = $DOM->createElement('elementPosition');
				    $ID->appendChild($elementPosition);
				    $elementPositionLeft = $DOM->createElement('elementPositionLeft');
				    $elementPosition->appendChild($elementPositionLeft);
				    $elementPositionLeftValue = $DOM->createTextNode($left);
				    $elementPositionLeft->appendChild($elementPositionLeftValue);
				    $elementPositionTop = $DOM->createElement('elementPositionTop');
				    $elementPosition->appendChild($elementPositionTop);
				    $elementPositionTopValue = $DOM->createTextNode($top);
				    $elementPositionTop->appendChild($elementPositionTopValue);
		            $DOM->save($projectFilePathResultArray01['projectFilePath']);
				} else {
					echo('05');
				    $DOM->load($projectFilePathResultArray01['projectFilePath']);
			        $ID = $DOM->getElementsByTagName('ID'.$elementID);
				    $ID = $ID->item(0);
				    $risistance = $ID->getElementsByTagName('risistance');
				    $risistanceValue = $risistance->item(0);
			        $risistanceValue->nodeValue = $RValue;
			        $reactance = $ID->getElementsByTagName('reactance');
				    $reactanceValue = $reactance->item(0);
			        $reactanceValue->nodeValue = $XValue;
				    $elementPosition = $ID->getElementsByTagName('elementPosition');
				    $elementPositionLeft = $elementPosition->item(0)->getElementsByTagName('elementPositionLeft');
				    $elementPositionLeft->item(0)->nodeValue = $left;
				    $elementPositionTop = $elementPosition->item(0)->getElementsByTagName('elementPositionTop');
				    $elementPositionTop->item(0)->nodeValue = $top;
			        $DOM->save($projectFilePathResultArray01['projectFilePath']);
				}
			}
		}
	} else if($progressStatus=='powerSourceDataCache') {
		$APhaseAmplitudeAjaxData = $_REQUEST['APhaseAmplitude'];
		$BPhaseAmplitudeAjaxData = $_REQUEST['BPhaseAmplitude'];
		$CPhaseAmplitudeAjaxData = $_REQUEST['CPhaseAmplitude'];
		$APhaseAngleAjaxData = $_REQUEST['APhaseAngle'];
		$BPhaseAngleAjaxData = $_REQUEST['BPhaseAngle'];
		$CPhaseAngleAjaxData = $_REQUEST['CPhaseAngle'];
		$sourceTypeAjaxData = $_REQUEST['sourceType'];
		$left = $_REQUEST['elementPositionLeft'];
		$top = $_REQUEST['elementPositionTop'];
		$projectData_name = $_REQUEST['projectData_name'];
		$mysql_link = mysql_connect('localhost','root','8426');
	    mysql_select_db('faithline',$mysql_link);
		$projectFilePathResult01 = mysql_query("select projectFilePath,projectName from faithline_simcircuit where projectName = '$projectData_name'");
		$projectFilePathResultArray01 = mysql_fetch_array($projectFilePathResult01);
		mysql_close($mysql_link);
		$DOM  = new DomDocument('1.0','utf-8');
		$DOM->formatOutput=true;
		$DOM->preservaWhiteSpace=false;
		$DOM->load($projectFilePathResultArray01['projectFilePath']);
		$tempNode01 = $DOM->getElementsByTagName('projectSimcircuit');
		$tempNode02 = $DOM->getElementsByTagName('threePhase_AC_supply');
		echo ($tempNode01->length);
		if($tempNode01->length == 0) {
			echo('01');
			$projectSimcircuit = $DOM->createElement('projectSimcircuit');
			$DOM->appendChild($projectSimcircuit);
			if($tempNode02->length == 0) {
				echo('02');
		        $threePhase_AC_supply = $DOM->createElement('threePhase_AC_supply');
		        $projectSimcircuit->appendChild($threePhase_AC_supply);
    		
	   	        $APhase = $DOM->createElement('APhase');
		        $threePhase_AC_supply->appendChild($APhase);
		        $APhaseAmplitude = $DOM->createElement('APhaseAmplitude');
		        $APhase->appendChild($APhaseAmplitude);
		        $APhaseAmplitudeValue = $DOM->createTextNode($APhaseAmplitudeAjaxData);
		        $APhaseAmplitude->appendChild($APhaseAmplitudeValue);
		        $APhaseAngle = $DOM->createElement('APhaseAngle');
		        $APhase->appendChild($APhaseAngle);
		        $APhaseAngleValue = $DOM->createTextNode($APhaseAngleAjaxData);
	            $APhaseAngle->appendChild($APhaseAngleValue);
		        
		        $BPhase = $DOM->createElement('BPhase');
		        $threePhase_AC_supply->appendChild($BPhase);
		        $BPhaseAmplitude = $DOM->createElement('BPhaseAmplitude');
		        $BPhase->appendChild($BPhaseAmplitude);
		        $BPhaseAmplitudeValue = $DOM->createTextNode($BPhaseAmplitudeAjaxData);
		        $BPhaseAmplitude->appendChild($BPhaseAmplitudeValue);
		        $BPhaseAngle = $DOM->createElement('BPhaseAngle');
		        $BPhase->appendChild($BPhaseAngle);
		        $BPhaseAngleValue = $DOM->createTextNode($BPhaseAngleAjaxData);
	            $BPhaseAngle->appendChild($BPhaseAngleValue);
		        
		        $CPhase = $DOM->createElement('CPhase');
		        $threePhase_AC_supply->appendChild($CPhase);
		        $CPhaseAmplitude = $DOM->createElement('CPhaseAmplitude');
		        $CPhase->appendChild($CPhaseAmplitude);
		        $CPhaseAmplitudeValue = $DOM->createTextNode($CPhaseAmplitudeAjaxData);
		        $CPhaseAmplitude->appendChild($CPhaseAmplitudeValue);
		        $CPhaseAngle = $DOM->createElement('CPhaseAngle');
		        $CPhase->appendChild($CPhaseAngle);
		        $CPhaseAngleValue = $DOM->createTextNode($CPhaseAngleAjaxData);
	            $CPhaseAngle->appendChild($CPhaseAngleValue);
		        
		        $sourceType = $DOM->createElement('sourceType');
		        $threePhase_AC_supply->appendChild($sourceType);
		        $sourceTypeValue = $DOM->createTextNode($sourceTypeAjaxData);
		        $sourceType->appendChild($sourceTypeValue);
				$elementTag = $DOM->createElement('elementTag');
				$threePhase_AC_supply->appendChild($elementTag);
				$elementTagValue = $DOM->createTextNode('1');
				$elementTag->appendChild($elementTagValue);
				$elementPosition = $DOM->createElement('elementPosition');
				$threePhase_AC_supply->appendChild($elementPosition);
				$elementPositionLeft = $DOM->createElement('elementPositionLeft');
				$elementPosition->appendChild($elementPositionLeft);
				$elementPositionLeftValue = $DOM->createTextNode($left);
				$elementPositionLeft->appendChild($elementPositionLeftValue);
				$elementPositionTop = $DOM->createElement('elementPositionTop');
				$elementPosition->appendChild($elementPositionTop);
				$elementPositionTopValue = $DOM->createTextNode($top);
				$elementPositionTop->appendChild($elementPositionTopValue);
				$threePhase_AC_supplyXMLData = $DOM->saveXML();
			    $fopen = fopen($projectFilePathResultArray01['projectFilePath'],'w');
		        fwrite($fopen,$threePhase_AC_supplyXMLData);
		        fclose($fopen);
		    }
		} else {
			echo('03');
	        if($tempNode02->length == 0) {
				echo('04');
    		    $projectSimcircuit = $DOM->getElementsByTagName('projectSimcircuit');
				$threePhase_AC_supply = $DOM->createElement('threePhase_AC_supply');
		        $projectSimcircuit->item(0)->appendChild($threePhase_AC_supply);
	   	        $APhase = $DOM->createElement('APhase');
		        $threePhase_AC_supply->appendChild($APhase);
		        $APhaseAmplitude = $DOM->createElement('APhaseAmplitude');
		        $APhase->appendChild($APhaseAmplitude);
		        $APhaseAmplitudeValue = $DOM->createTextNode($APhaseAmplitudeAjaxData);
		        $APhaseAmplitude->appendChild($APhaseAmplitudeValue);
		        $APhaseAngle = $DOM->createElement('APhaseAngle');
		        $APhase->appendChild($APhaseAngle);
		        $APhaseAngleValue = $DOM->createTextNode($APhaseAngleAjaxData);
	            $APhaseAngle->appendChild($APhaseAngleValue);
		        
		        $BPhase = $DOM->createElement('BPhase');
		        $threePhase_AC_supply->appendChild($BPhase);
		        $BPhaseAmplitude = $DOM->createElement('BPhaseAmplitude');
		        $BPhase->appendChild($BPhaseAmplitude);
		        $BPhaseAmplitudeValue = $DOM->createTextNode($BPhaseAmplitudeAjaxData);
		        $BPhaseAmplitude->appendChild($BPhaseAmplitudeValue);
		        $BPhaseAngle = $DOM->createElement('BPhaseAngle');
		        $BPhase->appendChild($BPhaseAngle);
		        $BPhaseAngleValue = $DOM->createTextNode($BPhaseAngleAjaxData);
	            $BPhaseAngle->appendChild($BPhaseAngleValue);
		        
		        $CPhase = $DOM->createElement('CPhase');
		        $threePhase_AC_supply->appendChild($CPhase);
		        $CPhaseAmplitude = $DOM->createElement('CPhaseAmplitude');
		        $CPhase->appendChild($CPhaseAmplitude);
		        $CPhaseAmplitudeValue = $DOM->createTextNode($CPhaseAmplitudeAjaxData);
		        $CPhaseAmplitude->appendChild($CPhaseAmplitudeValue);
		        $CPhaseAngle = $DOM->createElement('CPhaseAngle');
		        $CPhase->appendChild($CPhaseAngle);
		        $CPhaseAngleValue = $DOM->createTextNode($CPhaseAngleAjaxData);
	            $CPhaseAngle->appendChild($CPhaseAngleValue);
		        
		        $sourceType = $DOM->createElement('sourceType');
		        $threePhase_AC_supply->appendChild($sourceType);
		        $sourceTypeValue = $DOM->createTextNode($sourceTypeAjaxData);
		        $sourceType->appendChild($sourceTypeValue);
				$elementTag = $DOM->createElement('elementTag');
				$threePhase_AC_supply->appendChild($elementTag);
				$elementTagValue = $DOM->createTextNode('1');
				$elementTag->appendChild($elementTagValue);
				$elementPosition = $DOM->createElement('elementPosition');
				$threePhase_AC_supply->appendChild($elementPosition);
				$elementPositionLeft = $DOM->createElement('elementPositionLeft');
				$elementPosition->appendChild($elementPositionLeft);
				$elementPositionLeftValue = $DOM->createTextNode($left);
				$elementPositionLeft->appendChild($elementPositionLeftValue);
				$elementPositionTop = $DOM->createElement('elementPositionTop');
				$elementPosition->appendChild($elementPositionTop);
				$elementPositionTopValue = $DOM->createTextNode($top);
				$elementPositionTop->appendChild($elementPositionTopValue);
				$DOM->save($projectFilePathResultArray01['projectFilePath']);
		    } else {
				echo('05');
				$DOM->load($projectFilePathResultArray01['projectFilePath']);
			    $APhaseAmplitudeValue = $DOM->getElementsByTagName("APhaseAmplitude");
			    $APhaseAmplitudeValue->item(0)->nodeValue = $APhaseAmplitudeAjaxData;
			    $APhaseAngleValue = $DOM->getElementsByTagName("APhaseAngle");
			    $APhaseAngleValue->item(0)->nodeValue = $APhaseAngleAjaxData;
			    $BPhaseAmplitudeValue = $DOM->getElementsByTagName("BPhaseAmplitude");
			    $BPhaseAmplitudeValue->item(0)->nodeValue = $BPhaseAmplitudeAjaxData;
			    $BPhaseAngleValue = $DOM->getElementsByTagName("BPhaseAngle");
			    $BPhaseAngleValue->item(0)->nodeValue = $BPhaseAngleAjaxData;
		        $CPhaseAmplitudeValue = $DOM->getElementsByTagName("CPhaseAmplitude");
			    $CPhaseAmplitudeValue->item(0)->nodeValue = $CPhaseAmplitudeAjaxData;
			    $CPhaseAngleValue = $DOM->getElementsByTagName("CPhaseAngle");
			    $CPhaseAngleValue->item(0)->nodeValue = $CPhaseAngleAjaxData;
			    $sourceTypeValue = $DOM->getElementsByTagName("sourceType");
			    $sourceTypeValue->item(0)->nodeValue = $sourceTypeAjaxData;
				$threePhase_AC_supply = $DOM->getElementsByTagName('threePhase_AC_supply');
				$elementPosition = $threePhase_AC_supply->item(0)->getElementsByTagName('elementPosition');
				$elementPositionLeft = $elementPosition->item(0)->getElementsByTagName('elementPositionLeft');
				$elementPositionLeft->item(0)->nodeValue = $left;
				$elementPositionTop = $elementPosition->item(0)->getElementsByTagName('elementPositionTop');
				$elementPositionTop->item(0)->nodeValue = $top;
				$DOM->save($projectFilePathResultArray01['projectFilePath']);
			}
		}
	} else if($progressStatus=='start') {
		$projectData_name = $_REQUEST['projectData_name'];
		$mysql_link = mysql_connect('localhost','root','8426');
	    mysql_select_db('faithline',$mysql_link);
		$projectFilePathResult01 = mysql_query("select projectFilePath,projectName from faithline_simcircuit where projectName = '$projectData_name'");
		$projectFilePathResultArray01 = mysql_fetch_array($projectFilePathResult01);
		mysql_close($mysql_link);
		$DOM  = new DomDocument('1.0','utf-8');
		$DOM->formatOutput=true;
		$DOM->preservaWhiteSpace=false;
		$DOM->load($projectFilePathResultArray01['projectFilePath']);
		$APhaseAmplitude = $DOM->getElementsByTagName('APhaseAmplitude');
		$APhaseAmplitudeValue = $APhaseAmplitude->item(0)->nodeValue;
		$BPhaseAmplitude = $DOM->getElementsByTagName('BPhaseAmplitude');
		$BPhaseAmplitudeValue = $BPhaseAmplitude->item(0)->nodeValue;
		$CPhaseAmplitude = $DOM->getElementsByTagName('CPhaseAmplitude');
		$CPhaseAmplitudeValue = $CPhaseAmplitude->item(0)->nodeValue;
		$ID1 = $DOM->getElementsByTagName('ID1');
		$ID1RValue = $ID1->item(0)->getElementsByTagName('risistance')->item(0)->nodeValue;
		$ID1XValue = $ID1->item(0)->getElementsByTagName('reactance')->item(0)->nodeValue;
		$ID4 = $DOM->getElementsByTagName('ID4');
		$ID4RValue = $ID4->item(0)->getElementsByTagName('risistance')->item(0)->nodeValue;
		$ID4XValue = $ID4->item(0)->getElementsByTagName('reactance')->item(0)->nodeValue;
		$triggerDelay = $DOM->getElementsByTagName('triggerDelay');
		$triggerDelayValue = $triggerDelay->item(0)->nodeValue;
		$faultType = $DOM->getElementsByTagName('faultType');
		$faultTypeValue = $faultType->item(0)->nodeValue;
		$APhasePropertyDataArray = array($APhaseAmplitudeValue,$ID1RValue,$ID1XValue,$ID4RValue,$ID4XValue,$triggerDelayValue,$faultTypeValue);
		echo(json_encode($APhasePropertyDataArray));
	} else if($progressStatus=='stop') {
	}
?>