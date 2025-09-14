🎨 Como rodar o Frontend (Angular)
Pré-requisitos
```
Node.js 18+

Angular CLI 16+

npm ou yarn
```

1. Navegue para o frontend
```
bash
cd frontend
```

2. Instale as dependências
```
bash
npm install
# ou
yarn install
```

3. Configure a API URL
```
environment.ts:

typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

4. Execute o frontend
``` 
bash
ng serve
# ou
npm start
Frontend disponível em: http://localhost:4200```
