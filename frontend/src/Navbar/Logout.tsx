export default function Logout(props: { logoutClicked: () => void }) {
    let logoutClicked = props.logoutClicked;

    return (
        <div onClick={logoutClicked}>
          Sign out
        </div>
    );
}
