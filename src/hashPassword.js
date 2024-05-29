import { hash as _hash } from 'bcrypt';

const password = 'masterpassword';
const saltRounds = 10;

_hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }
  console.log('Hashed password:', hash);
});
