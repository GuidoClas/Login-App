import { createContext } from 'react';

const UserContext = createContext({ email: "", setEmail: (x : string) => {}, password: "", setPassword: (y: string) => {} });

export default UserContext;