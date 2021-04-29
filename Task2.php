<html><body>
<center>
<?php


    $vehicleid = $_POST['vehicleid'];
    $vehicledescription = $_POST['vehicledescription'];
    $vehicleyear = $_POST['vehicleyear'];
    $vehicletype = explode(".",$_POST['vehicletype']);
    $vehicletypenumber = $vehicletype[0];
    $vehiclecategory = explode(".",$_POST['vehiclecategory']);
    $vehiclecategorynumber = $vehiclecategory[0];
    
    $db_host = '127.0.0.1';
    $db_user = 'root';
    $db_password = 'root';
    $db_db = 'Project2';
    $db_port = 3306;
    $db_socket = 'tmp/mysql.sock';

    $mysqli = @new mysqli(
      $db_host,
      $db_user,
      $db_password,
      $db_db,
      $db_port,
      $db_socket
    );
	
    if ($mysqli->connect_error) 
    {
      echo 'Errno: '.$mysqli->connect_errno;
      echo '<br>';
      echo 'Error: '.$mysqli->connect_error;
      exit();
    }

    $sql = "INSERT INTO project2.vehicle (VEHICLEID) VALUES ('$vehicleid')";
    if ($result = $mysqli -> query($sql))
    {
        echo '<br>Succesfully added vehicle id: '.$vehicleid, '.<br>';
    }
  
    $sql = "UPDATE project2.vehicle SET Description = ('$vehicledescription') WHERE VEHICLEID = ('$vehicleid')";
     if ($result = $mysqli -> query($sql))
    {
         echo 'Succesfully added vehicle description: '.$vehicledescription, '.<br>';
    }

    $sql = "UPDATE project2.vehicle SET Year = ('$vehicleyear') WHERE VEHICLEID = ('$vehicleid')";
     if ($result = $mysqli -> query($sql))
    {
         echo 'Succesfully added vehicle year: '.$vehicleyear, '.<br>';
    }

    $sql = "UPDATE project2.vehicle SET Type = ('$vehicletypenumber') WHERE VEHICLEID = ('$vehicleid')";
     if ($result = $mysqli -> query($sql))
    {
         echo 'Succesfully added vehicle type: '.$vehicletype[1], '.<br>';
    }

    $sql = "UPDATE project2.vehicle SET Category = ('$vehiclecategorynumber') WHERE VEHICLEID = ('$vehicleid')";
     if ($result = $mysqli -> query($sql))
    {
         echo 'Succesfully added vehicle category: '.$vehiclecategory[1], '.<br>';
    }

$mysqli->close();

?>

<form action="Task2.html" method="post"> 
      <p><button type = "submit">Enter another vehicle</button><p>
</form>

<form action="Home_Screen" method="post"> 
      <p><button type = "submit">Return to the home screen</button><p>
</form>
</center>

</body></html>