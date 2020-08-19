import Link from 'next/link'

const style = {
    // backgroundColor: '#4CAF50',
    border: 'none',
    // color: 'white',
    padding: '10px 10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    // fontSize: '16px',
    margin: '4px 2px',
    // cursor: 'pointer',
  }

const right = {

    position: 'absolute',
    right: '0px',
    // width: '300px',
    // padding: '10px'
}


export default function header({ user }) {
    return (
        <>
        <div>
        <h4 style={right}>user : {user} <a href="/logout">logout</a></h4>
        <Link href="/home">
          <a style={style}>Home</a>
        </Link>
        <Link href="/about">
          <a style={style}>About</a>
        </Link>
      </div>
      </>
    );
  }