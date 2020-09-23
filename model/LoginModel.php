<?php

include_once 'conexao.php';

$sql = $conn->prepare("SELECT * FROM tbl_usuario WHERE (email = ? OR userName = ?) AND senha = ?");
/*todos campos da tbl pessoa onde o email = oq digitou ou username = oq digitou...*/
$sql->bind_param("sss", $user, $user, $pass);// s = tipo string, passa o valor de tres variaveis tipo string
//bind_param, passa os dados já higienizados e nao permite caracteres especiais, elimina injecao de SQL.

$sql ->execute(); //executa a query a partir dos parametros da variavel sql.

$resultado = $sql ->get_result(); // pega os dados brutos e armazena em resultado
$linha = $resultado->fetch_assoc();
//fetch cria uma matriz associativa, associacao dos campos na variavel linha 
// feito isso os resultados já estão na variavel linha
$sql -> close(); // fecha a instrucao
$conn -> close(); //fecha a conexão

if(empty($linha)){
    
    echo"FalhaLogin";    
    //die();
}
else{
    
    //$_SESSION['idPessoa'] = $linha ['idPessoa'];
    //$_SESSION['login'] = true;

    //passando nome que veio do banco para indice 'nome' da session
    $_SESSION['nome'] = $linha ['nome'];
    $_SESSION['tipo'] = $linha ['tipo'];
    
    if($linha['tipo'] == "ADMINISTRADOR"){
        echo "SucessoADM";
    }
    elseif($linha['tipo'] == "CLIENTE"){
        echo "SucessoCLIENTE";
    }
    elseif($linha['tipo'] == "FUNCIONARIO"){
        echo "SucessoFUNCIONARIO";
    }
}

?>