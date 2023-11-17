import { useHistory, useParams } from "react-router-dom";
import { css } from "@emotion/css";
import { useFetchUserById } from "../hooks/useFetchUserById";

type UserDetailsParams = {
  id: string;
};

const containerClassName = css`
  display: flex;
  flex-direction: column;
  margin: 32px auto;
`;

const fieldLabelClassName = css`
  font-weight: bold;
  margin-bottom: 0;
`;

const buttonClassName = css`
  align-self: center;
`;

export function UserDetails() {
  const { id } = useParams<UserDetailsParams>();
  const [userDataRemote, _refetchUserData] = useFetchUserById(id);

  const history = useHistory();

  function handleGoBack() {
    history.goBack();
  }

  if (
    userDataRemote.status === "not-asked" ||
    userDataRemote.status === "loading"
  ) {
    return <p>Loading...</p>;
  }

  if (userDataRemote.status === "failure") {
    return <p>{userDataRemote.error}</p>;
  }

  const user = userDataRemote.data;

  return (
    <div className={containerClassName}>
      <button className={buttonClassName} onClick={handleGoBack}>
        {"< Back to all users"}
      </button>
      <h2>{`${user.firstName} ${user.lastName}`}</h2>
      <p className={fieldLabelClassName}>Company</p>
      <p>{user.company}</p>
      <p className={fieldLabelClassName}>Email</p>
      <p>{user.email}</p>
      <p className={fieldLabelClassName}>Phone Number</p>
      <p>{user.phoneNumber}</p>
    </div>
  );
}
