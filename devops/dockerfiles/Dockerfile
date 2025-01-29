# Use a imagem oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo package.json e yarn.lock para instalar as dependências
COPY package.json yarn.lock ./

# Instala as dependências
RUN yarn install

# Copia o restante da aplicação para o container
COPY . .

# Exponha a porta que o Next.js vai rodar (geralmente 3000)
EXPOSE 3000

# Comando padrão para rodar a aplicação em modo de desenvolvimento
CMD ["yarn", "dev"]