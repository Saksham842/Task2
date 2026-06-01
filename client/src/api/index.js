const API = 'http://localhost:5000/api/v1';

async function request(url, options = {}) {
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  const res = await fetch(url, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || data.error || 'Something went wrong');
  }

  return data;
}

export function register(userData) {
  return request(`${API}/auth/register`, {
    method: 'POST',
    body: userData
  });
}

export function login(credentials) {
  return request(`${API}/auth/login`, {
    method: 'POST',
    body: credentials
  });
}

export function getProfile() {
  return request(`${API}/auth/profile`);
}

export function getUsers() {
  return request(`${API}/auth/users`);
}

export function getTasks() {
  return request(`${API}/tasks`);
}

export function getTask(id) {
  return request(`${API}/tasks/${id}`);
}

export function createTask(taskData) {
  return request(`${API}/tasks`, {
    method: 'POST',
    body: taskData
  });
}

export function updateTask(id, taskData) {
  return request(`${API}/tasks/${id}`, {
    method: 'PUT',
    body: taskData
  });
}

export function deleteTask(id) {
  return request(`${API}/tasks/${id}`, {
    method: 'DELETE'
  });
}
