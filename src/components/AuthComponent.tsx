import { useState } from 'react';
import { useUser} from '../util/auth';

export function AuthComponent() {
  const { user, login, logout, completeNewPassword } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');

  console.log(user);

  // signed in, but this is the first time and a pw update/email is needed
  if (user && user.challengeName === 'NEW_PASSWORD_REQUIRED') {
    return (
      <div>
        <div>
          You need to update your email and pick a new password.
        </div>
        <label>
          Email:
          <input type="text"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          New Password:
          <input type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)} />
        </label>
        <button onClick={() => {
          completeNewPassword(email, newPassword);
        }}
        >Update</button>
      </div>
    );
  } 
  
  // signed in, all good
  if (user && !user.challengeName) {
    return (
      <div>
        <div>You are signed in as {user.username}.</div>
        <button onClick={logout}>Sign out</button>
      </div>
    );
  }
  
  // not signed in
  return (
    <div>
      <label>
        Username: 
        <input type="text" 
          value={username} 
          onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password: 
        <input type="password"
          value={password}
          onChange={e => setPassword(e.target.value)} />
      </label>
      <button onClick={() => {
        login(username, password);
      }}
      >Sign in</button>
    </div>
  );
}