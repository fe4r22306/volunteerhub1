<?php
// guest_login.php
session_start();

// Set session variables for guest access
$_SESSION['role'] = 'guest';
$_SESSION['first_name'] = 'Guest';

// Redirect to dashboard
header("Location: dashboard.php");
exit();
?>