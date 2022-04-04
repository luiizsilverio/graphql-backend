import { Arg, Mutation, Query, Resolver } from "type-graphql";
import crypto from 'crypto'

import { User } from "../models/User";

@Resolver()
export class UserResolver {
  #data: User[] = []

  @Query(() => String)
  async hello() {
    return 'Olá mundo'
  }

  @Query(() => [User])
  async users() {
    return this.#data
  }

  @Mutation(() => User)
  async createUser(
    @Arg('name') name: string
  ) {

    const user = { id: crypto.randomUUID(), name }
    this.#data.push(user)
    return user
  }
}

// no GraphQL, quando queremos retornar uma lista, colocamos
// os colchetes por volta do tipo ([User]), e não após (User[])
