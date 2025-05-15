import { useState } from "react";
import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUsers,
} from "../hooks/useUsers";
import { useDebounce } from "../hooks/useDebounce";

const Users = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { data: users, isFetching, isLoading } = useUsers(debouncedSearch);
  const { mutate: createUser } = useCreateUser();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = () => {
    if (editingId) {
      updateUser({ id: editingId, data: formData });
      setEditingId(null);
    } else {
      createUser(formData);
    }
    setFormData({ name: "", email: "", password: "" });
  };
  const handleEdit = (user: any) => {
    setEditingId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  };
  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>User Management</h2>
      <input
        placeholder="🔍 Search users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 10, width: "100%" }}
      />
      <div style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
        />
        <input
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData((f) => ({ ...f, email: e.target.value }))
          }
        />
        <input
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData((f) => ({ ...f, password: e.target.value }))
          }
        />
        <button onClick={handleSubmit}>
          {editingId ? "Update User" : "Create User"}
        </button>
      </div>

      {isFetching && isLoading ? (
        <p>🔄 Loading users...</p>
      ) : (
        <ul>
          {users?.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> – {user.email}
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
