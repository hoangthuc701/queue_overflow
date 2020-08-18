import React, { useEffect, useState } from 'react';
import UserService from '../../services/userService';
import Loading from '../../components/Loading';

const VerifyAccountPage = (props) => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  // eslint-disable-next-line react/prop-types
  const { match } = props;

  // eslint-disable-next-line react/prop-types
  const { token } = match.params;

  useEffect(() => {
    UserService.verifyAccount(token).then((data) => {
      setLoading(false);
      if (!data.error) {
        setContent(data.message);
      } else {
        setContent(data.error);
      }
    });
  }, [token]);
  if (loading) {
    return <Loading />;
  }
  return <h1>{content}</h1>;
};
export default VerifyAccountPage;
