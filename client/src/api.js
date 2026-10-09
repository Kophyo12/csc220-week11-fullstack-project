const BASE = "http://localhost:3000/api";

async function readError(res) {
  try {
    const data = await res.json();
    return data.error || "Request failed";
  } catch {
    return "Request failed";
  }
}

// Read students
export async function getStudents() {
  const res = await fetch(`${BASE}/students`);

  if (!res.ok) {
    throw new Error(await readError(res));
  }

  return res.json();
}

// Login
export async function loginUser(email, password) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    throw new Error(await readError(res));
  }

  return res.json();
}

// Add student
export async function createStudent(student, token) {
  const res = await fetch(`${BASE}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(student)
  });

  if (!res.ok) {
    throw new Error(await readError(res));
  }

  return res.json();
}

// Delete student
export async function deleteStudent(id, token) {
  const res = await fetch(`${BASE}/students/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error(await readError(res));
  }

  // Status 204 has no JSON response body.
}