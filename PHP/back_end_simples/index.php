<?php
require("conexao.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
$data = json_decode(file_get_contents('php://input'), true);
$url = isset($_GET['url']) ? $_GET['url'] : '';
if($url=="cadastrarFornecedor")
{
    $sql=$pdo->prepare("INSERT INTO fornecedor(nome,cnpj,estado) VALUES (?,?,?)");
    $sql->execute([$data["nome"],$data["cnpj"],$data["estado"]]);
}else if($url=="puxarFornecedores")
{
    $sql=$pdo->prepare("SELECT * FROM fornecedor");
    $sql->execute();
    $info=$sql->fetchAll(); 
    for($i=0;$i<count($info);$i++)
    {
        $sql=$pdo->prepare("SELECT * FROM produto WHERE fornecedor=?");
        $sql->execute(array($info[$i]["cnpj"]));
        $info[$i]["totalProdutos"]=count($sql->fetchAll());
    }
 
    $dado["fornecedores"]=$info;
    die(json_encode($dado));
}else if($url=="cadastrarProduto")
{
    $sql=$pdo->prepare("SELECT * FROM fornecedor WHERE cnpj=?");
    $sql->execute(array($data["cnpj"]));
    if(isset($sql->fetch()["nome"])){
        $sql=$pdo->prepare("INSERT INTO produto(nome,fornecedor,codigo,categoria) VALUES (?,?,?,?)");   
        $sql->execute([$data["nome"],$data["cnpj"],$data["codigo"],$data["categoria"]]);
    }else
    {
        
        $saida["erro"]="Fornecedor inexistente";
        die(json_encode($saida));
    }

}else if($url=="puxarProdutos")
{
    $sql=$pdo->prepare("SELECT * FROM produto");
    $sql->execute();
    $info=$sql->fetchAll();   
    for($i=0;$i<count($info);$i++)
    {
        $sql=$pdo->prepare("SELECT * FROM fornecedor WHERE cnpj=?");
        $sql->execute(array($info[$i]["fornecedor"]));
        $info[$i]["fornecedor"]=$sql->fetch()["nome"];
    }  
    $dado["produtos"]=$info;
    die(json_encode($dado));
}

//die(json_encode($data));
?>