export default function register() {
  return (
    <>
      <h1>Register</h1>
      <form method="post" action="register">
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
