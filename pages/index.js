import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li>
          <Link href="/register">
            <a>Register</a>
          </Link>
        </li>
        <li>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
