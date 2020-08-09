export const initialState = {
  users: [],
  filteredUsers: [],
  projects: [],
  todos: [],
  todosProgress: [],
  projectsProgress: [],
  isLoading: true,
  isWelcome: true,
  snackBar: { open: false, massage: "" },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return {
        ...state,
        users: action.payload,
        filteredUsers: action.payload,
      };
    case "FETCH_TODOS":
      return {
        ...state,
        todos: action.payload,
      };
    case "FETCH_PROJECTS":
      return {
        ...state,
        projects: action.payload,
      };
    case "FILTER_USERS":
      const input = action.payload;
      let filteredArr = [];
      let filteredResult;
      if (input) {
        const lowerInput = input.trim().toLowerCase();
        filteredArr = state.users.filter(
          (user) =>
            user.name.toLowerCase().trim().includes(lowerInput) ||
            user.email.toLowerCase().trim().includes(lowerInput)
        );
        if (filteredArr !== state.filteredUsers) {
          if (filteredArr.length > 0) {
            filteredResult = filteredArr;
          } else {
            filteredResult = [];
          }
        }
      } else {
        filteredResult = [...state.users];
      }
      return {
        ...state,
        filteredUsers: filteredResult,
      };

    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload._id),
        filteredUsers: state.users.filter(
          (user) => user._id !== action.payload._id
        ),
        todos: state.todos.filter((todo) => todo.userId !== action.payload.id),
        projects: state.projects.filter(
          (project) => project.userId !== action.payload.id
        ),
        todosProgress: state.todosProgress.filter(
          (item) => item.id !== action.payload.id
        ),
        projectsProgress: state.projectsProgress.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "ADD_USER":
      return {
        ...state,
        users: [action.payload, ...state.users],
        filteredUsers: [action.payload, ...state.users],
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    case "ADD_PROJECT":
      return {
        ...state,
        projects: [action.payload, ...state.projects],
      };

    case "ADD_TODOS_PROGRESS":
      const userTodo = action.payload;
      let mappedTodos;
      let foundUser = false;
      if (state.todosProgress.length > 0) {
        mappedTodos = state.todosProgress.map((x) => {
          if (x.id === userTodo.id) {
            foundUser = true;
            return { ...x, ...userTodo };
          } else {
            return x;
          }
        });
      }
      if (state.todosProgress.length === 0 || !foundUser) {
        mappedTodos = [...state.todosProgress, userTodo];
      }
      return {
        ...state,
        todosProgress: mappedTodos,
      };

    case "ADD_PROJECTS_PROGRESS":
      const userProject = action.payload;
      let mappedProjects;
      let foundUserProject = false;
      if (state.projectsProgress.length > 0) {
        mappedProjects = state.projectsProgress.map((x) => {
          if (x.id === userProject.id) {
            foundUserProject = true;
            return { ...x, ...userProject };
          } else {
            return x;
          }
        });
      }
      if (state.projectsProgress.length === 0 || !foundUserProject) {
        mappedProjects = [...state.projectsProgress, userProject];
      }
      return {
        ...state,
        projectsProgress: mappedProjects,
      };
    case "EDIT_USER":
      const updatedUser = action.payload;
      const updatedUsers = state.users.map((user) => {
        if (user._id === updatedUser._id) {
          return updatedUser;
        }
        return user;
      });
      const updatedTodosProgress = state.todosProgress.map((user) => {
        if (user.id === updatedUser.id) {
          return { ...user, name: updatedUser.name };
        }
        return user;
      });
      const updatedProjectsProgress = state.projectsProgress.map((user) => {
        if (user.id === updatedUser.id) {
          return { ...user, name: updatedUser.name };
        }
        return user;
      });
      return {
        ...state,
        users: updatedUsers,
        filteredUsers: updatedUsers,
        todosProgress: updatedTodosProgress,
        projectsProgress: updatedProjectsProgress,
      };
    case "EDIT_PROJECT":
      const updatedProject = action.payload;
      const updatedProjects = state.projects.map((project) => {
        if (project._id === updatedProject._id) {
          return updatedProject;
        }
        return project;
      });
      return {
        ...state,
        projects: updatedProjects,
      };
    case "EDIT_TODO":
      const updatedTodo = action.payload;
      const updatedTodos = state.todos.map((todo) => {
        if (todo._id === updatedTodo._id) {
          return updatedTodo;
        }
        return todo;
      });
      return {
        ...state,
        todos: updatedTodos,
      };
    case "COMPLETE_TODO":
      const completedTodo = action.payload;
      const completedTodos = state.todos.map((todo) => {
        if (todo._id === completedTodo._id) {
          return completedTodo;
        }
        return todo;
      });

      return {
        ...state,
        todos: completedTodos,
      };
    case "DELETE_PROJECT":
      const projectUsers = action.payload.users;
      console.log(projectUsers);

      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload._id
        ),
        projectsProgress: state.projectsProgress.filter((x) =>
          projectUsers.forEach((user) => x.id !== user.id)
        ),
      };

    case "DELETE_USER_FROM_PROJECT":
      const { item, userId } = action.payload;
      let filteredProjectsArr;

      const userProjectsProgress = state.projectsProgress.find(
        (x) => x.id === userId
      );

      const filteredUserProjectsProgress = userProjectsProgress.projects.filter(
        (x) => x._id !== item._id
      );
      if (filteredUserProjectsProgress.length === 0) {
        filteredProjectsArr = state.projectsProgress.filter(
          (item) => item.id !== userId
        );
      } else {
        filteredProjectsArr = state.projectsProgress.map((x) => {
          if (x.id === userId) {
            return {
              ...x,
              projects: filteredUserProjectsProgress,
            };
          }
          return x;
        });
      }

      const finalProjects = state.projects.map((project) => {
        if (project._id === item._id) {
          return {
            ...project,
            users: project.users.filter((user) => user.id !== userId),
          };
        } else {
          return project;
        }
      });

      return {
        ...state,
        projects: finalProjects,
        projectsProgress: filteredProjectsArr,
      };

    case "DELETE_TODO":
      const todoUserId = action.payload.userId;
      let filteredTodosArr;
      //check if user has completed tasks
      const userProgress = state.todosProgress.find((x) => x.id === todoUserId);
      if (userProgress) {
        const filteredUserTodos = userProgress.todos.filter(
          (x) => x._id !== action.payload._id
        );
        //check if user has no tasks anymore
        if (filteredUserTodos.length === 0) {
          filteredTodosArr = state.todosProgress.filter(
            (item) => item.id !== todoUserId
          );
        } else {
          const filteredUserCompleted = userProgress.completed.filter(
            (x) => x._id !== action.payload._id
          );

          filteredTodosArr = state.todosProgress.map((x) => {
            if (x.id === todoUserId) {
              return {
                ...x,
                todos: filteredUserTodos,
                completed: filteredUserCompleted,
              };
            }
            return x;
          });
        }
      }
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload._id),
        todosProgress: filteredTodosArr,
      };
    case "SHOW_LOADER":
      return {
        ...state,
        isLoading: true,
      };
    case "HIDE_LOADER":
      return {
        ...state,
        isLoading: false,
      };
    case "HIDE_WELCOME_SECTION":
      return {
        ...state,
        isWelcome: !action.payload,
      };
    case "SHOW_SNACK_BAR":
      return {
        ...state,
        snackBar: { open: true, massage: action.payload },
      };
    case "HIDE_SNACK_BAR":
      return {
        ...state,
        snackBar: { open: false, massage: "" },
      };
    default:
      return state;
  }
};
