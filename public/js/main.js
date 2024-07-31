const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const addUserForm = document.getElementById("addUserForm");
const newEmailInput = document.getElementById("newEmail");
const newPasswordInput = document.getElementById("newPassword");
const deleteUserButton = document.querySelectorAll(".deleteUser");

// Manage login
const handleLogin = () => {
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = emailInput.value;
      const password = passwordInput.value;

      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("Inicio de sesion exitoso");
        window.location.href = "/admin/user";
      } else {
        alert("Error en el inicio de sesion");
      }
    });
  }
};

// Function to manage user admin
const handleAdminUser = () => {
  if (addUserForm) {
    addUserForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = newEmailInput.value;
      const password = newPasswordInput.value;

      const response = await fetch("/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert("Error al agregar usuario");
      }
    });
  }
};

deleteUserButton.forEach((button) => {
  button.addEventListener("click", async () => {
    const userId = button.getAttribute("data-id");
    const response = await fetch(`/admin/users/delete/${userId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      window.location.reload();
    } else {
      alert("Error al eliminar usuario");
    }
  });
});

handleLogin();
handleAdminUser();
