<?php

require 'vendor/autoload.php';
require 'config.php';

$app = new Slim\App();

//$app->get('/', 'get_employee');
$app->get('/', 'get_article');

$app->get('/article/{id}', function($request, $response, $args) {
    get_article_id($args['id']);
});
$app->get('/images/', function($request, $response, $args) {
    get_images($args['id']);
});
$app->get('/image/{id}', function($request, $response, $args) {
    get_image_id($args['id']);
});
$app->get('/get_dates', 'get_dates');

$app->post('/article_add', function($request, $response, $args) {
    add_article($request->getParsedBody());//Request object’s <code>getParsedBody()</code> method to parse the HTTP request 
});
$app->post('/image_add', function($request, $response, $args) {
    add_image($request->getParsedBody());//Request object’s <code>getParsedBody()</code> method to parse the HTTP request 
});
$app->post('/signup', function($request, $response, $args) {
    add_user($request->getParsedBody());//Request object’s <code>getParsedBody()</code> method to parse the HTTP request 
});
$app->post('/login', function($request, $response, $args) {
    login_user($request->getParsedBody());//Request object’s <code>getParsedBody()</code> method to parse the HTTP request 
});
$app->post('/logout', function($request, $response, $args) {
    logout_user($request->getParsedBody());//Request object’s <code>getParsedBody()</code> method to parse the HTTP request 
});
$app->post('/check-token', function($request, $response, $args) {
    check_token($request->getParsedBody());//Request object’s <code>getParsedBody()</code> method to parse the HTTP request 
});

$app->put('/update_article', function($request, $response, $args) {
    update_article($request->getParsedBody());    
});

$app->delete('/delete_article/{id}', function($request, $response, $args) {
    delete_article($args['id']);
});
$app->run();

function get_article() {
    //echo 'not that bad?';
    $db = connect_db();
    $sql_articles = "SELECT * FROM ARTICLES ORDER BY ARTICLES.TIME DESC";
    $exe = $db->query($sql_articles);
    $data_articles = [];
    while ($row = $exe->fetch_assoc()){
        $data_articles[] = $row;
    }
    //$data_articles = $exe->fetch_all(MYSQLI_ASSOC);

    $sql_images = "SELECT * FROM ARTICLE_IMAGES";
    $exe = $db->query($sql_images);
    //$data_images = $exe->fetch_all(MYSQLI_ASSOC);

    $data_images = [];
    while ($row = $exe->fetch_assoc()){
        $data_images[] = $row;
    }

    $data = join_article_with_images($data_articles, $data_images);

    $db = null;
    echo json_encode($data);
}

function join_article_with_images($articles, $images){

    $data = [];
    $counter = 0;
    $addedImage = false;
    $defaultImage['SRC'] = 'main_bg.jpg';

    foreach($articles as $article){

        $temp_article = $article;
        $temp_article['IMAGES'] = [];
        $article_id = $temp_article['ID'];
        array_push($data, $temp_article);
        foreach($images as $image){
            if($image['ARTICLE_ID'] === $article_id){
                array_push($data[$counter]['IMAGES'], $image);
                $addedImage = true;
            }
        }
        if (!$addedImage){
            array_push($data[$counter]['IMAGES'], $defaultImage);
        }
        $counter++;
        $addedImage = false;
    }

    return $data;
}

function get_article_id($article_id) {

    $db = connect_db();
    $sql_articles = "SELECT * FROM ARTICLES WHERE `ID` = '$article_id' ORDER BY ARTICLES.TIME DESC";
    $exe = $db->query($sql_articles);
    //$data_articles = $exe->fetch_array(MYSQLI_ASSOC);
    $data_articles = [];
    while ($row = $exe->fetch_assoc()){
        $data_articles[] = $row;
    }

    $sql_images = "SELECT * FROM ARTICLE_IMAGES";
    $exe = $db->query($sql_images);
    //$data_images = $exe->fetch_array(MYSQLI_ASSOC);
    $data_images = [];
    while ($row = $exe->fetch_assoc()){
        $data_images[] = $row;
    }

    $data = join_article_with_images($data_articles, $data_images);

    $db = null;
    echo json_encode($data);
}

function get_images() {
    $db = connect_db();
    $sql = "SELECT * FROM ARTICLE_IMAGES";
    $exe = $db->query($sql);
    //$data = $exe->fetch_all(MYSQLI_ASSOC);
    $data = [];
    while ($row = $exe->fetch_assoc()){
        $data[] = $row;
    }
    $db = null;
    echo json_encode($data);
}

function get_image_id($article_id) {
    $db = connect_db();
    $sql = "SELECT * FROM ARTICLE_IMAGES WHERE `ARTICLE_ID` = '$article_id'";
    $exe = $db->query($sql);
    $data = $exe->fetch_all(MYSQLI_ASSOC);
    $db = null;
    echo json_encode($data);
}

function get_dates() {
    //echo 'not that bad?';
    $db = connect_db();
    $sql_articles = "SELECT * FROM ARTICLES ORDER BY ARTICLES.TIME DESC";
    $exe = $db->query($sql_articles);
    $data_articles = [];
    while ($row = $exe->fetch_assoc()){
        $data_articles[] = $row;
    }
    //$data_articles = $exe->fetch_all(MYSQLI_ASSOC);

    $sql_images = "SELECT * FROM ARTICLE_IMAGES";
    $exe = $db->query($sql_images);
    //$data_images = $exe->fetch_all(MYSQLI_ASSOC);

    $data_images = [];
    while ($row = $exe->fetch_assoc()){
        $data_images[] = $row;
    }

    $data = join_article_with_images($data_articles, $data_images);

    $db = null;
    echo json_encode($data);
}

function add_article($data) {
    $db = connect_db();
    $timestamp = time();
    $sql = "insert into ARTICLES (TITLE,CONTENT,TIME,CATEGORY,MUSIC)"
        . " VALUES('$data[title]','$data[content]','$timestamp','$data[category]','$data[music]')";
    $exe = $db->query($sql);
    $last_id = $db->insert_id;
    $db = null;
    if (!empty($last_id))
        echo $last_id;
    else
        echo false;
}

function add_image($data) {
    $imgPath = $_SERVER['DOCUMENT_ROOT'] . "/img/";
    $article = $_POST["article"];

    $db = connect_db();
    foreach ($_FILES as $file) {
        $timestamp = time();
        move_uploaded_file($file["tmp_name"], $imgPath . $timestamp . $file["name"]);
        $src = $timestamp . $file["name"];
        $sql = "insert into ARTICLE_IMAGES (SRC,ARTICLE_ID)"
            . " VALUES('$src','$article')";
        $exe = $db->query($sql);
        $last_id = $db->insert_id;
        if (!empty($last_id))
            echo $last_id;
        else
            echo false;
    }
    $db = null;
}

function add_user($data){
    $db = connect_db();
    $password = sha1($data[password]);
    $sql = "INSERT INTO USERS (NAME,EMAIL,PASSWORD)"
        . " VALUES('$data[username]','$data[email]','$password')";
    $exe = $db->query($sql);
    $last_id = $db->insert_id;
    $db = null;
    if (!empty($last_id))
        echo $data[username];
    else
        echo false;
}

function login_user($data){

    $db = connect_db();
    $password = sha1($data[password]);
    $sql = "SELECT NAME FROM USERS WHERE `NAME`='$data[username]' AND `PASSWORD`='$password'";
    $exe = $db->query($sql);
    $result = [];
    while ($row = $exe->fetch_assoc()){
        $result[] = $row;
    }

    $token;
    if(count($result) === 1){
        //User is logged in and letš give him a token
        $token = $data[username] . ' | ' . uniqid() . uniqid() . uniqid();
        $sqltoken = "UPDATE USERS SET TOKEN='$token' WHERE `NAME`='$data[username]' AND `PASSWORD`='$password'";
        $exe = $db->query($sqltoken);
        $last_id = $db->affected_rows;
        echo json_encode($token);
    } else {
        echo 'ERROR';
    }

    $db = null;

}

function logout_user($data){
    $db = connect_db();

    $sqltoken = "UPDATE USERS SET TOKEN='LOGGED OUT' WHERE TOKEN='$data[token]'";
    $exe = $db->query($sqltoken);
    $last_id = $db->affected_rows;
    $db = null;
    echo $last_id;
}

function check_token($data){
    $db = connect_db();

    $sql = "SELECT * FROM USERS WHERE `TOKEN`='$data[token]'";
    $exe = $db->query($sql);
    $result = [];
    while ($row = $exe->fetch_assoc()){
        $result[] = $row;
    }
    
    if(count($result) === 1 ){
        echo 'authorized';
    } else {
        echo 'unauthorized';
    }
    $db = null;
}

function update_article($data) {
    print_r($data);
    $db = connect_db();
    $sql = "UPDATE ARTICLES SET TITLE='$data[title]',CONTENT='$data[content]',CATEGORY='$data[category]',MUSIC='$data[music]'"
        . " WHERE ID = '$data[id]'";
    $exe = $db->query($sql);
    $last_id = $db->affected_rows;
    $db = null;
    if (!empty($last_id))
        echo $last_id;
    else
        echo false;
}

function delete_article($article_id) {
    $db = connect_db();
    $sql_article = "DELETE FROM ARTICLES WHERE ID = '$article_id'";
    $exe = $db->query($sql_article);

    //Processing images
    $image_names = "SELECT SRC FROM ARTICLE_IMAGES WHERE ARTICLE_ID = '$article_id'";
    $exe = $db->query($image_names);

    $data = [];
    while ($row = $exe->fetch_assoc()){
        $data[] = $row;
    }

    $imgPath = $_SERVER['DOCUMENT_ROOT'] . "/img/";

    foreach($data as $image){
        unlink($imgPath . $image[SRC]);
    }

    $sql_image = "DELETE FROM ARTICLE_IMAGES WHERE ARTICLE_ID = '$article_id'";

    $exe = $db->query($sql_image);
    $last_id = $db->affected_rows;
    $db = null;
    if (!empty($last_id))
        echo $last_id;
    else
        echo false;
}

?>