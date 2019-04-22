import React, { useState, useEffect } from 'react';
import { useQuery, useSubscription } from 'react-apollo-hooks';
import {
  CircularProgress, Card, CardHeader, CardContent,
} from '@material-ui/core';

import UserCard from './User';

import GET_USERS from '../gql/users.query.gql';
import { ReactToUserCreation, ReactToUserDeletion } from '../gql/user.subscription.gql';

const useGQL = () => {
  const [users, setUsers] = useState([]);
  const { data, error, loading } = useQuery(GET_USERS);
  useSubscription(ReactToUserCreation, {
    onSubscriptionData: ({ subscriptionData: { data: subData, error: subError } }) => {
      if (!subError) {
        const { user: { node: newUser } } = subData;
        setUsers([...users, newUser]);
      }
    },
  });
  useSubscription(ReactToUserDeletion, {
    onSubscriptionData: ({ subscriptionData: { data: subData, error: subError } }) => {
      if (!subError) {
        const { user: { previousValues: newUser } } = subData;
        let deletedID = newUser.id.match(/\(([^(]*)\)/g)[0];
        deletedID = deletedID.substr(1, deletedID.length - 2);
        setUsers(users.filter(({ id }) => id !== deletedID));
      }
    },
  });
  useEffect(
    () => data && data.users && setUsers(data.users),
    [data],
  );
  return { users, error, loading };
};

const UserList = () => {
  const { users, error, loading } = useGQL();
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return (
      <Card>
        <CardHeader title="Error" subheader="An error has occurred" />
        <CardContent>{error}</CardContent>
      </Card>
    );
  }
  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  );
};

export default UserList;
