import { createContext } from 'react';

const UserContext = createContext({ email: "", setEmail: (x : string) => {}, user: { user: "", role: "", acum: 0, acum2: 0, acum3: 0, creditScore: 0 }, setUser: (y: any) => {} });

export default UserContext;