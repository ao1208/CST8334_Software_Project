<!DOCTYPE html>
<html lang="en">
<head>
    <title>Welcome to Goopter Webportal</title>
</head>
<body>
<p>Hello, {{ $user->first_name }}!</p>
<p>Welcome! Your account has been created with the following details:</p>
<p>User Name: {{ $user->email }}</p>
<p>Password: {{ $password }}</p>
<p>Thank you for joining us!</p>
</body>
</html>
