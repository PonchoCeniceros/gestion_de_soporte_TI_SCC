import { User } from "../types";
import { authenticate } from "../services";
import ApiAdapter from "../services/api";
// infraestructura
import { useState } from "react";
import useSession from "../../../store/session";
import { useNavigate } from 'react-router-dom';

/**
 *
 */
export default function useLogin() {
  const api = ApiAdapter();
  const navigate = useNavigate();
  const signIn = useSession((state) => state.signIn);
  const [user, setUser] = useState<User>({ name: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isLogged = await authenticate(user, api, signIn);
    if (isLogged)
      navigate('/');
  };

  return [user, handleChange, handleSubmit] as const;
}
