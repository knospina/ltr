<?php
$SITE_ROOT = "http://www.playground.lotart.lv/";

$id;

$jsonData = getData($SITE_ROOT);
makePage($jsonData, $SITE_ROOT);
function getData($siteRoot) {
    $id = ctype_digit($_GET['id']) ? $_GET['id'] : 'default';
    if ($id != 'default') {
        $rawData = file_get_contents($siteRoot.'slim/db-operation.php/article/'.$id);
        return json_decode($rawData);
    } else {
        return 'default';
    }
}

function makePage($data, $siteRoot) {
    if ($data === 'default'){
        $title = 'Playground lotart.lv';
        $content = 'Mazliet par Franciju, mazliet par šo un to';
        $imgPath = $siteRoot . 'img/default.jpg';

    } else {
        $title = substr($data[0]->TITLE,0,70);
        $content = $data[0]->CONTENT;
        $imgPath = '';
        if(isset($data[0]->IMAGES[0]->SRC)){
            $imgPath = $siteRoot . 'img/' . $data[0]->IMAGES[0]->SRC;
        }
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title><?php echo $title; ?></title>
        <meta name="description" content="<?php echo strip_tags($content); ?>" />

        <!-- Twitter -->
        <meta name="twitter:card" value="summary">
        <meta name="twitter:site" content="@publisher_handle">
        <meta name="twitter:title" content="<?php echo strip_tags($title); ?>">
        <meta name="twitter:description" content="<?php echo strip_tags($content); ?>">
        <meta name="twitter:creator" content="@author_handle">
        <!-- Twitter Summary card images must be at least 120x120px -->
        <meta name="twitter:image" content="<?php echo $imgPath; ?>">

        <!-- Google+ -->
        <meta itemprop="name" content="<?php echo strip_tags($title); ?>">
        <meta itemprop="description" content="<?php echo strip_tags($content); ?>">
        <meta itemprop="image" content="<?php echo $imgPath; ?>">

        <!-- Facebook -->
        <meta property="og:title" content="<?php echo strip_tags($title); ?>" />
        <meta property="og:type" content="article" />
        <meta property="og:description" content="<?php echo strip_tags($content); ?>" />
        <meta property="og:image" content="<?php echo $imgPath; ?>" />
        <meta property="og:site_name" content="Lotart playground" />

        <!-- etc. -->
    </head>
    <body>
        <h1><?php echo $title; ?></h1>
        <p><?php echo $content; ?></p>
        <img src="<?php echo $imgPath; ?>">
    </body>
</html>
<?php
}
?>





