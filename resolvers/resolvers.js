import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const resolvers = {
  Query: {
    login: async (_, { usernameOrEmail, password }) => {
      let user = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      });
      if (!user) throw new Error("Invalid username/email or password");

      let match = await bcrypt.compare(password, user.password);
      if (!match) throw new Error("Invalid username/email or password");

      return user;
    },
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      let existing = await User.findOne({ $or: [{ username }, { email }] });
      if (existing) throw new Error("Username or email already exists");

      let hashedPw = await bcrypt.hash(password, 10);
      let newUser = await User.create({ username, email, password: hashedPw });
      return newUser;
    },
  },
};

export default resolvers;
