<?php
require("conexao.php");
$sql=$pdo->prepare("INSERT INTO produto(nome,fornecedor,codigo,categoria) VALUES (?,?,?,?)");
$sql->execute(array("1","2","3","4"));
?>