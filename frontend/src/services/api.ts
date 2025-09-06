import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}


export const getUsers = () => api.get<User[]>("/users");
export const getUserById = (id: number) => api.get<User>(`/users/${id}`);
export const createUser = (user: User) => api.post<User>("/users", user);
export const updateUser = (id: number, user: User) => api.put<User>(`/users/${id}`, user);
export const deleteUser = (id: number) => api.delete(`/users/${id}`);


export const getPosts = () => api.get<Post[]>("/posts");
export const getPostById = (id: number) => api.get<Post>(`/posts/${id}`);
export const createPost = (post: Post) => api.post<Post>("/posts", post);
export const updatePost = (id: number, post: Post) => api.put<Post>(`/posts/${id}`, post);
export const deletePost = (id: number) => api.delete(`/posts/${id}`);

export default api;
