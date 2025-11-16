'use server'
import { redirect } from 'next/navigation';
import connection from './database/db';
import bcrypt from 'bcryptjs';

export async function registerUser(formRegister: FormData) {

    const name = String(formRegister.get('name'));
    const email = String(formRegister.get('email'));
    const password = bcrypt.hashSync(String(formRegister.get('password')), 10);

    await connection.execute(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, password, 'users']
    );

    redirect('/login');
}

export async function registerAdmin(formRegister: FormData) {

    const name = String(formRegister.get('name'));
    const password = bcrypt.hashSync(String(formRegister.get('password')), 10);

    await connection.execute(
        'INSERT INTO admin (name, password, role) VALUES (?, ?, ?)',
        [name,password, 'admin']
    );
    redirect('/admin/login-admin');

}


export async function getUserByEmail(email: string) {
    const [users] = await connection.execute(
        'SELECT * FROM users WHERE email = ? LIMIT 1',
        [email]
    )

    if (users.length === 0) {
        return null;
    }

    return users[0];
}
export async function getAdminByName(name: string) {
    const [users] = await connection.execute(
        'SELECT * FROM admin WHERE name = ? LIMIT 1',
        [name]
    )

    if (users.length === 0) {
        return null;
    }

    return users[0];
}


export async function createUserFromGoogle(user) {

  const existing = await getUserByEmail(user.email)
  if (existing) return existing
  
  await connection.execute(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [user.name, user.email, '', 'users']
  )
}