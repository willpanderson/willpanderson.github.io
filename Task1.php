<html><body>
<center>
<?php


    $customername = $_POST['customername'];
    $customerphonenumber = $_POST['customerphonenumber'];

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

  $sql = "INSERT INTO project2.customer (NAME) VALUES ('$customername')";
  if ($result = $mysqli -> query($sql))
  {
      echo '<br>Succesfully added customer name: '.$customername, '.<br>';
  }
  
  $sql = "UPDATE project2.customer SET Phone = ('$customerphonenumber') WHERE NAME = ('$customername')";
  if ($result = $mysqli -> query($sql))
  {
      echo 'Succesfully added customer phone number: '.$customerphonenumber, '.<br>';
  }

$mysqli->close();

?>

<form action="Task1.html" method="post"> 
      <p><button type = "submit">Add another customer</button><p>
</form>

<form action="Home_Screen" method="post"> 
      <p><button type = "submit">Return to the home screen</button><p>
</form>
</center>

</body></html>