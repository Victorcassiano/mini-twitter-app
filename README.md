# Mini Twitter App

Aplicação web inspirada no Twitter para compartilhamento de posts com suporte a imagens, autenticação e interações.

## Tecnologias

### Frontend
- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca de UI
- **Tailwind CSS v4** - Framework de estilos
- **shadcn/ui** - Componentes reutilizáveis
- **Hugeicons** - Biblioteca de ícones

### Estado & Data Fetching
- **Zustand** - Gerenciamento de estado global
- **TanStack Query v5** - Fetching e cache de dados
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas

### Backend & Storage
- **Supabase** - Armazenamento de imagens
- **Axios** - Cliente HTTP
- **localStorage** - Persistência de autenticação

### Testes
- **Vitest** - Testes unitários
- **Cypress** - Testes E2E

### Linting & Outros
- **Biome** - Linting e formatação
- **TypeScript 5** - Tipagem estática
- **Sonner** - Sistema de notificações

## Pré-requisitos

- Node.js ou Bun
- Bun (recomendado) ou npm

## Instalação

1. Clonar o repositório
2. Instalar dependências:
   ```bash
   bun install
   ```
3. Configurar variáveis de ambiente no `.env.local`
4. Iniciar o servidor:
   ```bash
   bun dev
   ```
5. Acessar [http://localhost:3001](http://localhost:3001)

## Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `bun dev` | Iniciar servidor de desenvolvimento (porta 3001) |
| `bun build` | Build de produção |
| `bun start` | Iniciar servidor de produção |
| `bun run test` | Rodar testes unitários |
| `bun test:coverage` | Rodar testes com coverage |
| `bun cy:open` | Abrir interface do Cypress |
| `bun cy:run` | Rodar testes E2E |
| `bun biome:check` | Verificar linting |
| `bun biome:fix` | Corrigir erros de linting |

## Variáveis de Ambiente

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Funcionalidades

- Autenticação (login/cadastro)
- Criar posts com título e conteúdo
- Upload de imagens
- Curtir/descurtir posts
- Editar posts
- Excluir posts
- Busca de posts
- Tema claro/escuro

## Testes

### Unit Tests (Vitest)
- **64 testes** cobrindo:
  - Schemas de validação (auth, posts)
  - Stores Zustand
  - Hooks personalizados
  - Utilitários

### E2E Tests (Cypress)
- **17 testes** cobrindo:
  - Fluxo de autenticação (login, registro, logout)
  - CRUD de posts (criar, editar, deletar)
  - Interações (curtir posts)


## Estrutura do Projeto

```
src/
├── app/                 # Rotas Next.js
├── components/          # Componentes React
│   ├── Home/           # Páginas Home
│   ├── Login/          # Página de Login
│   └── Shared/         # Componentes compartilhados
├── domain/             # Constantes e configurações
├── http/              # Hooks, schemas e tipos
│   ├── hooks/         # React Query hooks
│   └── schemas/       # Schemas Zod
├── lib/               # Utilitários e configurações
│   ├── store/         # Stores Zustand
│   └── storage/       # Funções de storage
├── test/              # Testes unitários
└── utils/             # Funções utilitárias

cypress/               # Testes E2E
├── e2e/               # Specs de testes
└── support/           # Comandos customizados
```
