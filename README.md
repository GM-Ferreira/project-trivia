# Bem vindo ao repositório Trivia

## Descrição do projeto:

Neste projeto foi desenvolvido um jogo de perguntas e respostas baseado no jogo Trivia (tipo um show do milhão) utilizando React e Redux, ao utilizar essa aplicação o usuário é capaz de:

- Logar no jogo e, se o email tiver cadastro no site Gravatar, ter sua foto associada ao perfil da pessoa usuária.
- Acessar o jogo onde deverá escolher uma das respostas disponíveis para cada uma das perguntas apresentadas. A resposta deve ser marcada antes do contador de tempo chegar a zero, caso contrário a resposta será considerada errada.
- Após 5 perguntas respondidas, terá acesso a tela de score, com pontos e acertos.
- Visualizar a página de ranking ao final de cada jogo.

## Habilidades utilizadas no desenvolvimento:

- Criação de um store Redux em aplicações React
- Criação de reducers no Redux em aplicações React
- Criação de actions no Redux em aplicações React
- Criação de dispatchers no Redux em aplicações React
- Criação de actions assíncronas na sua aplicação React que faz uso de Redux.
- Escrever testes para garantir que sua aplicação possua uma boa cobertura de testes.

## Informações da API utilizada

Os dados foram extraidos da API do Open Trivia DB (https://opentdb.com/)
Para realizar essas buscas, utilizei dois endpoints:

Primeiro endpoint onde deve-se fazer um GET para acessar o token:
- https://opentdb.com/api_token.php?command=request

Segundo endpoint onde deve ser enviado o token para acessar 5 perguntas:
- https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}

## Próximos passos

A aplicação está totalmente funcional, mas são necessários alguns ajustes estéticos como a estilização do projeto e a tela de configurações para permitir selecionar a categoria e dificuldade das perguntas que hoje são aleatórias.
