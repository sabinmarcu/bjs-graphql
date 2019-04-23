import {
  observable, reaction, computed, action,
} from 'mobx';
import ApolloClient from '../apollo.config';

import UserStore from './user';

import { GetWeights } from '../gql/weight.query.gql';

class WeightStore {
  @observable user = UserStore

  @observable weights = [];

  @computed get number() {
    return this.weights.length;
  }

  @computed get weightsData() {
    return this.weights.map(({ amount, createdAt }) => ({
      date: createdAt,
      weight: amount,
    }));
  }

  @computed get sortedWeights() {
    return this.weights.sort();
  }

  @computed get BMI() {
    if (!this.user.height || !this.weights.length) {
      return 0;
    }
    const { height } = this.user;
    const weight = this.sortedWeights[this.sortedWeights.length - 1].amount;
    return weight / (height ** 2);
  }

  @computed get averageWeight() {
    return this.weights.reduce((prev, it) => prev + it.amount, 0) / this.weights.length;
  }

  constructor() {
    reaction(
      () => this.user.id,
      this.updateWeights,
    );
    this.updateWeights();
  }

  @action updateWeights = async () => {
    try {
      if (!this.user.id) {
        throw new Error('No UserID');
      }
      const { data: { weights } } = await ApolloClient.query({
        query: GetWeights, variables: { id: this.user.id },
      });
      this.weights = weights;
    } catch (e) {
      this.weights = [];
    }
  }
}

const instance = new WeightStore();
if (process.env.NODE_ENV === 'development') {
  const makeInspectable = require('mobx-devtools-mst').default; // eslint-disable-line
  makeInspectable(instance);
  window.WeightStore = instance;
}

export default instance;
