import {
  observable, reaction, computed, action,
} from 'mobx';
import ApolloClient from '../apollo.config';

import { GetUser, Login } from '../gql/users.query.gql';

const localStorageKey = 'user:id';
class UserStore {
  @observable name;

  @observable email;

  @observable id;

  @observable isAdmin;

  @observable height;

  @computed get isLoggedIn() {
    return !!this.id && this.id !== 'null';
  }

  constructor() {
    reaction(() => this.id, async () => {
      localStorage.setItem(localStorageKey, this.id);
      if (this.id) {
        try {
          const response = await ApolloClient.query(
            { query: GetUser, variables: { id: this.id } },
          );
          const {
            data: {
              user: {
                name, email, isAdmin, height,
              },
            },
          } = response;
          this.name = name;
          this.email = email;
          this.isAdmin = isAdmin;
          this.height = height;
        } catch (e) {
          this.id = null;
        }
      }
    });
    const id = localStorage.getItem(localStorageKey);
    this.id = id;
  }

  @action login = async (email) => {
    try {
      const response = await ApolloClient.query(
        { query: Login, variables: { email } },
      );
      const { data: { user: { id } } } = response;
      this.id = id;
    } catch (e) { } // eslint-disable-line
  }

  @action logout = () => {
    this.id = null;
    this.name = null;
    this.email = null;
    this.isAdmin = null;
    this.height = null;
  }
}

const instance = new UserStore();
if (process.env.NODE_ENV === 'development') {
  window.UserStore = instance;
}

export default instance;
