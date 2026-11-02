/**
 * AUTENTICAÇÃO DE DEMONSTRAÇÃO.
 *
 * O projeto não possui backend. Este serviço apenas controla o acesso às
 * rotas privadas na interface e guarda a sessão no localStorage. Qualquer
 * pessoa pode ler as credenciais abaixo no código-fonte, portanto isto NÃO
 * é segurança real. Em produção, a validação deveria ser feita por um
 * servidor (com senha com hash, tokens e HTTPS).
 */
const SESSION_KEY = "snapflow_session";

const DEMO_USERS = [
  {
    name: "Usuário Demo",
    email: "demo@snapflow.app",
    password: "snapflow123"
  }
];

export const DEMO_CREDENTIALS = {
  email: DEMO_USERS[0].email,
  password: DEMO_USERS[0].password
};

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export function login(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = DEMO_USERS.find(
        (item) =>
          item.email === email.trim().toLowerCase() &&
          item.password === password
      );

      if (!user) {
        reject(new Error("E-mail ou senha incorretos."));
        return;
      }

      const session = { name: user.name, email: user.email };

      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      resolve(session);
    }, 500);
  });
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}