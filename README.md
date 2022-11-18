<h2 align="center"> 
	Teste Backend - Mevo 
</h2>

## 💭 O que é essa API?

Essa API é projeto utilizado como teste técnico de backend para vaga de desenvolvedor fullstack na [Mevo](https://mevosaude.com.br/).

## ✨ Quais são as funcionalidades desse sistema?

O sistema conta com as seguintes funcionalidades:

- Listagem de clients
- Listagem de produtos
- Listagem de produto por id
- Criação de pedido

Caso queira ver as funcionalidades por completo e de modo técnico acesse a documentação do projeto ([clique aqui](#docs) para ver como acessá-la).

## ⚠ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
[Node](https://nodejs.org/en/download/), [Git](https://git-scm.com/downloads), [Docker](https://www.docker.com/get-started/) e [Insominia](https://insomnia.rest/download) ou [Postman](https://www.postman.com/downloads/).

## 🎲 Rodando a API

```bash
# Clone este repositório
$ git clone https://github.com/CaioVinicius7/teste-mevo-backend.git

# Acesse a pasta do projeto no terminal/cmd
$ cd teste-mevo-backend

# Acesse o projeto pelo vs code
$ code .

# crie o arquivos .env e o preencha seguindo o aquivo .env.example

# Baixe as dependências
$ yarn

# Faça o build dos containers
$ docker-compose build

# Execute os containers
$ docker-compose up -d

# Rode as migrations
$ yarn prisma migrate deploy

# Rode as seeds
$ yarn prisma db seed

# Rode o servidor
$ yarn dev


# O servidor ficara ativo na porta definida no arquivo .env - acesse <http://localhost:{port}/api>
```

## 🛠 Como rodar os testes

Para rodar os testes rode o script `test:before` após ter rodado os containers e depois rode o script `test`.

<div id="docs"> </div>

## 📜 Acessando a documentação

Para ter acesso a documentação utilize a rota /api-docs após a inicialização da aplicação.

```bash
http://localhost:{port}/api-docs/
```

## Autor

---

<a href="https://www.facebook.com/caio.pereira.94695">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/62827681?s=400&u=f0b18831e6690a901f956d637933b9ee2dca3104&v=4" width="100px;" alt=""/>
 <br>
 <h2><b>Caio Vinícius</b></h2></a>

<h4> Feito com muito carinho e dedicação :) </h4>

<br>

[![Linkedin Badge](https://img.shields.io/badge/-caio%20vinícius-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/caio-vin%C3%ADcius-87a761200/)
[![Gmail Badge](https://img.shields.io/badge/-caio1525pereira@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:caio1525pereira@gmail.com)](mailto:caio1525pereira@gmail.com)
