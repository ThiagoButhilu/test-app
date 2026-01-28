# Setup do CRUD de Tarefas

## Instalação

Para que o CRUD funcione, você precisa instalar o AsyncStorage:

```bash
npm install @react-native-async-storage/async-storage
```

ou

```bash
npx expo install @react-native-async-storage/async-storage
```

## Funcionalidades

O CRUD inclui:

- ✅ **Criar** tarefas (título e descrição)
- 📋 **Listar** todas as tarefas
- ✏️ **Editar** tarefas existentes
- 🗑️ **Deletar** tarefas
- ✅ **Marcar/Desmarcar** tarefas como concluídas
- 💾 **Persistência** local com AsyncStorage

## Como usar

1. Instale o AsyncStorage (veja acima)
2. Execute o app: `npm start`
3. Navegue até a aba "Tarefas"
4. Toque no botão "+" para criar uma nova tarefa
5. Toque em uma tarefa para marcar/desmarcar como concluída
6. Toque no ícone de lápis para editar
7. Toque no ícone de lixeira para deletar

## Estrutura

- `contexts/TasksContext.tsx` - Context API para gerenciar estado das tarefas
- `app/(tabs)/tasks.tsx` - Tela de lista de tarefas
- `app/task-form.tsx` - Tela de formulário (criar/editar)

