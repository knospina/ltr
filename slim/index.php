<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';
require 'config.php';

//echo $config['db']['host'];

$app = new \Slim\App(["settings" => $config]);



$app->get('/', function ($request, $response, $args) { 
 $response->write("Welcome: This is AlphansoTech Tutorial Guide");
 return $response;
});


$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");

    return $response;
});


//$app->get('/','indexFunction');
//$app->get('/frameworks','listFrameworks');
//$app->get('/framework/:name','frameworkInfo');
//$app->get('/find','findFramework');
//$app->post('/update','updateFramework');
//$app->delete('/drop/:name','dropFramework');
//$app->notFound(function(){echo 'Umm...not sure what you mean';});


$app->run();