<html><body>
<center>
<?php

    $vehicletype = explode(".",$_POST['vehicletype']);
    $vehicletypenumber = $vehicletype[0];
    $vehiclecategory = explode(".",$_POST['vehiclecategory']);
    $vehiclecategorynumber = $vehiclecategory[0];
    $startdate = $_POST['startdate'];
    $returndate = $_POST['returndate'];

    echo 'type:'.$vehicletypenumber;
    echo 'category'.$vehiclecategorynumber;
    echo 'startdate'.$startdate;
    echo 'returndate'.$returndate;

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

    $sql = "SELECT v.VehicleID, v.Description, v.Year, v.Type, v.Category,
    r.StartDate, r.OrderDate, r.RentalType, r.Qty, r.ReturnDate, r.TotalAmount, r.PaymentDate
    FROM project2.vehicle AS v 
    INNER JOIN project2.rental AS r 
    ON v.VehicleID = r.VehicleID
    WHERE v.Type = '$vehicletypenumber' AND v.Category = '$vehiclecategorynumber' AND ((r.StartDate < '$returndate' AND r.StartDate < '$startdate) OR (r.ReturnDate > '$returndate' AND r.ReturnDate > '$startdate'))";
    
    if ($result = $mysqli -> query($sql))
    {
        echo '<br>Succesfully obtained rental';
    }

    $mysqli->close();

?>
    

<form action="Task3.html" method="post"> 
      <p><button type = "submit">Enter another rental</button><p>
</form>

<form action="Home_Screen" method="post"> 
      <p><button type = "submit">Return to the home screen</button><p>
</form>
</center>

</body></html>