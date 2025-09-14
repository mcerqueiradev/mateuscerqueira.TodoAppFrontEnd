📱 ToDoApp Frontend - Angular
🚀 Como rodar o Frontend

Pré-requisitos
```
Node.js 18+

npm ou yarn

Angular CLI 16+

Git
```

1. Clone o repositório
```
bash
git clone https://github.com/mcerqueiradev/mateuscerqueira-todo-app-front-end.git
cd mateuscerqueira-todo-app-front-end
```

2. Instale as dependências
```
bash
npm install
# ou
yarn install
```

3. Configure a API URL
Crie o arquivo src/environments/environment.ts:
```
typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

E src/environments/environment.prod.ts:
```
typescript
export const environment = {
  production: true,
  apiUrl: 'https://todoapp-backend-hfpq.onrender.com/api'
};
```

4. Execute o frontend
```
bash
# Desenvolvimento
ng serve

# Ou com npm
npm start

# Ou com específico para produção
ng serve --configuration=production
Frontend disponível em: http://localhost:4200
```

🔐 Sistema de Autenticação
Login/JWT integration com interceptors
Refresh token automático
Logout seguro com limpeza de dados

📊 Funcionalidades Avançadas
CRUD completo de tarefas
Filtros e ordenação em tempo real
Paginação para grandes listas

🚀 Performance & UX
Debounce search para pesquisas
Loading states e skeletons
Error handling elegante

🏗️ Estrutura do Projeto
```
text
src/
├── app/
│   ├── components/          # Componentes reutilizáveis
│   ├── pages/              # Páginas principais
│   ├── services/           # Serviços e API calls
│   ├── guards/             # Guardas de autenticação
│   ├── interceptors/       # HTTP interceptors
│   ├── models/             # Interfaces e tipos
│   ├── utils/              # utilitários
│   └── styles/             # Estilos globais
├── assets/                 # Imagens e recursos
└── environments/           # Configurações por ambiente
```

🔌 Configuração da API
Variáveis de Ambiente
```
typescript
// environment.ts - Desenvolvimento
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};

// environment.prod.ts - Produção  
export const environment = {
  production: true,
  apiUrl: 'https://sua-api.onrender.com/api'
};
```

Serviços Configurados

AuthService - Autenticação JWT
UserService - Gestão de usuários
TodoService - Operações de tarefas

🚀 Deploy no Vercel
Deploy Automático
Conecte o repositório no Vercel
Configure as variáveis de ambiente:
```
bash
API_URL=https://todoapp-backend-hfpq.onrender.com/api
```

Deploy Manual
```
bash
# Build do projeto
ng build --configuration=production

# Deploy para Vercel
npx vercel --prod
```


📱 Funcionalidades Principais
✅ Gestão de Tarefas
Criar, editar e excluir tarefas
Marcar como concluído/pendente
Busca em tempo real

👤 Gestão de Usuários
Registro e login seguro
Perfil de usuário
Preferências salvas

📞 Suporte
Desenvolvido por: Mateus Cerqueira
Email: mateusjesus2309@gmail.com
GitHub: mcerqueiradev

Demo: https://mateuscerqueira-todo-app-front-end.vercel.app
