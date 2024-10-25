'use client';

import Link from "next/link";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return <div>
    <div>
      <Link href="/">&lt; Home</Link>
    </div>
    <div>{error.message}</div>
  </div>;
}
