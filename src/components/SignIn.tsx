'use client';

import { useFormStatus } from 'react-dom';
import { authenticate } from '@/actions/auth';
import { LogIn } from 'lucide-react';

export default function SignIn() {
  const { pending } = useFormStatus();

  return (
    <form action={authenticate}>
      <button
        type="submit"
        disabled={pending}
        className="bg-purple-200 disabled:opacity-50  text-sm font-bold rounded-full min-h-10 px-4 cursor-pointer flex items-center justify-center "
      >
        <span className="text-black font-sans flex items-center justify-center gap-2">
          <LogIn /> Entrar
        </span>
      </button>
    </form>
  );
}
