# AutomaStore 🚀

O **AutomaStore** é uma exemplificação de um e-commerce, desenvolvida para simplificar gestão de produtos, pedidos. Com arquitetura escalável e foco em performance, o projeto combina tecnologias de ponta para oferecer uma experiência robusta e intuitiva.

---

## ✨ Tecnologias Utilizadas

### **Next.js (App Router + TurboPack)**

- **Objetivo**: Framework full-stack para renderização híbrida (SSR/SSG), roteamento avançado e otimizações de performance via TurboPack.
- **Por que?**: Unifica frontend e backend em um único projeto, ideal para aplicações complexas como e-commerce.

### **Prisma**

- **Objetivo**: ORM (Object-Relational Mapping) para gerenciamento de banco de dados com tipagem forte.
- **Por que?**: Simplifica queries SQL, migrations e garante segurança de tipos com o Prisma Client.

### **Tailwind CSS + Tailwind Merge**

- **Objetivo**: Framework CSS utilitário para estilização rápida e consistente.
- **Extras**:
  - `tailwind-merge`: Combina classes dinamicamente.
  - `tailwindcss-animate`: Animações pré-configuradas.

### **Radix UI**

- **Objetivo**: Biblioteca de componentes acessíveis e desacoplados de estilos (Avatar, Dialog, Select, Toast, etc.).

### **Zustand**

- **Objetivo**: Gerenciamento de estado global leve e eficiente para React.
- **Por que?**: Substitui Redux com menos boilerplate e integração simplificada.

### **SWR**

- **Objetivo**: Biblioteca para fetch de dados com cache, revalidação automática e tratamento de erros.
- **Vantagem**: Melhora performance e UX com dados sempre atualizados.

### **ioredis**

- **Objetivo**: Cliente Redis para cache de dados e otimização de operações frequentes.
- **Caso de uso**: Cache de produtos, sessões de usuário e rate limiting.

### **Swagger (JSDoc + UI)**

- **Objetivo**: Documentação automática de APIs via comentários JSDoc e interface interativa.
- **Benefício**: Facilita integrações e testes de endpoints.

### **Outras Ferramentas**

- **Lucide React**: Ícones modernos e customizáveis.
- **clsx**: Combinação condicional de classes CSS.
- **Lodash Debounce**: Otimização de eventos (ex: busca em tempo real).

---
## 🚀 Como testar em produção:
1. Acesse o link:
   ```bash
   https://automa-store.vercel.app
   
   ```

OBS: frontend do projeto está hospedado na Vercel, garantindo alta disponibilidade e desempenho. Já o banco de dados utiliza PostgreSQL na AWS RDS, proporcionando escalabilidade e segurança para armazenar os dados de forma confiável.


## 🚀 Como Executar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/sucodev/automa-store.git

   ```
2. Instale as dependências:

   ```bash
   yarn install

   ```

3. Configure o banco de dados (via Prisma):
   ```bash
   npx prisma generate && npx prisma migrate dev

   ```
4. Suba o ambiente com Docker:

   ```bash
   docker-compose up -d

   ```

5. Inicie o servidor:
   ```bash
   npm run dev

   ```
6. Acesse:
   ```bash
   http://localhost:3000

   ```

---

📦 Scripts Principais

- npm run dev: Inicia o servidor de desenvolvimento com TurboPack.

- npm run build: Gera a versão otimizada para produção.

- npm start: Inicia o servidor em produção.

- npm run lint: Verifica erros de código com ESLint.

---

Feito com ❤️ por @sucodev!
