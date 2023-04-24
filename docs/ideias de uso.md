# Caronte

## Sumario

[Objetivo](#objetivo) </br>
[Comunicação com Caronte](#comunicação-com-caronte) </br>

- [Inscrição](#inscrição) </br>
- [Desincrição](#desincrição) </br>

[Processamento](#processamento) </br>
[Front-end](#do-front-end) </br>
[Erros](#erros) </br>

## Objetivo

O serviço caronte servira como uma gerenciador dos outros serviços, (Não sei so posso chamar de gateway)

## Comunicação com caronte

A comunicação se dara sobre alguns endpoints, os principais serão os descritos a baixo

### Inscrição

Caronte vai disponibilizar um endpoint (a definir) para que a aplicação se registre nele, o rementende enviara informação qual endpoint ele quer registrar, qual método, e qual url de conexão e payload que o mesmo ira receber, algo como:

```
Request
POST http://caronte/subscribe

{
    "method": "POST",
    "endpoint": "/user/register",
    "url": "http://proteu",
    "payload": "json"
}
```

#### method

ira dizer qual método o remetende escuta naquele endpoint

#### endpoint

ira dizer qual endpoint sera registrado

#### url

url base para conctar com o remetende

#### payload

tipo de dados que espera receber nesse endpoint

**fica a cargo do remetende validar se o payload é valido ou não, caronte apenas repassa para a url correta**

```
Response
{
    "id": 123
}
```

#### id

Id do endpoint cadastrado

### Desincrição

Caronte vai disponibilizar um endpoint para retirar a incrição antes feita, ficando assim com o recurso indisponivel, algo como:

```
Request
POST http://caronte/unsubcribe

{
    "id": 12
}
```

#### id

Todos os endpoints que forem registrados receberam um id como resposta

```
Response
{
    "message": "sucess" | "error"
    "status": 200,
    "details": "..."
}
```

#### message

sempre sera uma string sendo "sucess" ou "error"

#### status

Codigo de status padrão http

#### details

Detalhes do erro ou do sucesso

## Processamento

Caronte guardara o endpoint registrado em algum banco de dados para consulta posterior, ja que quando for requistado do front-end ele buscara com as informçãoes do front-end o endpoint no banco de dados, caso não exista o caronte retornara um erro de recurso inexistende ou indisponivel

## Do front-end

caronte espera receber do front-end uma requisição que carrega as informações sobre qual serviço o cliente deseja conectar, algo como

```
POST http://caronte/request
{
    "service": "proteu",
    "endpoint": "/user/register",
    "payload": {...}
}
```

Caronte recebe a request do fron-end e repasa ao serviço requisitado, fazendo as validaçoes de segurança necessarias, e aguarda resposta do serviço requisitado, e repasa a resposta ao front-end.

## Erros

Caso o serviço requisitado estaja fora do ar,
Caronte response ao front-end dizendo que o serviço esta indisponivel

### **Esse é um prototipo de como vai ser o funcionamento do caronte, esta sujeito a mudanças**

SCHEMA:
![image](https://user-images.githubusercontent.com/77984278/234028738-1734820e-f602-4021-9af9-bde273a5da7e.png)

