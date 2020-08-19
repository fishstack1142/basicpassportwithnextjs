export default function login() {
  return (
    <>
      <h1>Login</h1>
      <form method="post" action="login">
      <label>
        Enter Username:
        <br />
        <input type="text" name="uname" />
      </label>
      <br />
      <label>
        Enter Password:
        <br />
      <input type="password" name="pw" />
      </label>
      <br />
      <input type="submit" value="Submit" />
      </form>
    </>
    );
}
