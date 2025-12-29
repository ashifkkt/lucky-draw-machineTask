const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  return data;
}

function getHeaders(token = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = token;
  }

  return headers;
}

export async function get(endpoint, token = null) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: getHeaders(token),
  });

  return handleResponse(response);
}

export async function post(endpoint, data, token = null) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });

  return handleResponse(response);
}

export async function update(endpoint, data, token = null) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });

  return handleResponse(response);
}

export async function del(endpoint, token = null) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });

  return handleResponse(response);
}

export async function register(userData) {
  return post("/register", {
    name: userData.name,
    email: userData.email,
    password: userData.password,
  });
}

export async function login(credentials) {
  return post("/login", {
    email: credentials.email,
    password: credentials.password,
  });
}

export async function addDepartment(departmentData, token) {
  return post(
    "/add-department",
    {
      dept_name: departmentData.dept_name,
      description: departmentData.description,
    },
    token
  );
}

export async function getDepartments(token) {
  return get("/departments", token);
}

export async function getDepartment(deptId, token) {
  return get(`/department/${deptId}`, token);
}

export async function deleteDepartment(deptId, token) {
  return del(`/delete-department/${deptId}`, token);
}
