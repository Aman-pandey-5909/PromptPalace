'use client';
import Link from "next/link";

export default function HomePage() {
  
  return (
    <div>
      <h1>Home</h1>
      <div className="flex gap-3">
      <Link className="border px-4 py-2" href="/auth/login">Login</Link>
      <Link className="border px-4 py-2" href="/auth/signup">Signup</Link>
      </div>
    </div>
  );
}
