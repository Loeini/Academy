# Usar Node.js 18 com Alpine Linux (uma versão leve)
FROM node:18-alpine

# Definir a pasta de trabalho dentro do container
WORKDIR /app

# Copiar arquivos de dependências
# Copiamos primeiro para aproveitar o cache do Docker
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código
COPY . .

# Dizer qual porta o container vai usar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]