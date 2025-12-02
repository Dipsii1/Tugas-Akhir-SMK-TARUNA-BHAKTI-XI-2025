'use server'
import { redirect } from 'next/navigation';
import connection from './database/db';
import bcrypt from 'bcryptjs';
import { RowDataPacket } from 'mysql2';

interface User extends RowDataPacket {
    id: number;
    name: string;
    email: string;
    password: string;
    no_phone: string;
    id_role: number;
    id_kelas: number | null;
    created_at: Date;
    updated_at: Date;
}

function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password: string): { valid: boolean; message?: string } {
    if (password.length < 8) {
        return { valid: false, message: 'Password minimal 8 karakter' };
    }
    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: 'Password harus mengandung huruf besar' };
    }
    if (!/[a-z]/.test(password)) {
        return { valid: false, message: 'Password harus mengandung huruf kecil' };
    }
    if (!/[0-9]/.test(password)) {
        return { valid: false, message: 'Password harus mengandung angka' };
    }
    return { valid: true };
}

export async function registerUser(formRegister: FormData) {
    const name = String(formRegister.get('name'));
    const email = String(formRegister.get('email'));
    const password = bcrypt.hashSync(String(formRegister.get('password')), 10);
    const no_phone = String(formRegister.get('no_phone'));

    await connection.execute(
        'INSERT INTO users (name, email, password, no_phone, id_role) VALUES (?, ?, ?, ?, ?)',
        [name, email, password, no_phone, 2] // id_role = 2 untuk Siswa
    );

    redirect('/login');
}

export async function registerAdmin(formRegister: FormData) {
    const name = String(formRegister.get('name')).trim();
    const email = String(formRegister.get('email')).trim().toLowerCase();
    const rawPassword = String(formRegister.get('password'));
    const no_phone = String(formRegister.get('no_phone')).trim();

    // Validasi
    if (!validateEmail(email)) {
        throw new Error('Format email tidak valid');
    }

    const passwordCheck = validatePassword(rawPassword);
    if (!passwordCheck.valid) {
        throw new Error(passwordCheck.message || 'Password tidak valid');
    }

    // Cek email sudah ada
    const existing = await getUserByEmail(email);
    if (existing) {
        throw new Error('Email sudah terdaftar');
    }

    const password = bcrypt.hashSync(rawPassword, 10);

    await connection.execute(
        'INSERT INTO users (name, email, password, no_phone, id_role) VALUES (?, ?, ?, ?, ?)',
        [name, email, password, no_phone, 1]
    );

    redirect('/admin/login-admin');
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const [rows] = await connection.execute<User[]>(
        'SELECT * FROM users WHERE email = ? LIMIT 1',
        [email.toLowerCase()]
    );

    if (rows.length === 0) {
        return null;
    }

    return rows[0];
}

export async function createUserFromGoogle(user: { name: string; email: string }): Promise<User | null> {
    const existing = await getUserByEmail(user.email);
    if (existing) return existing;
    
    await connection.execute(
        'INSERT INTO users (name, email, password, no_phone, id_role) VALUES (?, ?, ?, ?, ?)',
        [user.name, user.email.toLowerCase(), '', '', 2]
    );
    
    return await getUserByEmail(user.email);
}