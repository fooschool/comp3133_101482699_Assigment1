import User from '../models/User.js';
import Employee from '../models/Employee.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../config/cloudinary.js';

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

    getAllEmployees: async () => {
      return await Employee.find();
    },

    getEmployeeById: async (_, { id }) => {
      let emp = await Employee.findById(id);
      if (!emp) throw new Error("Employee not found");
      return emp;
    },

    searchEmployees: async (_, { designation, department }) => {
      let filter = {};
      if (designation) filter.designation = designation;
      if (department) filter.department = department;
      return await Employee.find(filter);
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

    addEmployee: async (_, args) => {
      let existing = await Employee.findOne({ email: args.email });
      if (existing) throw new Error("Employee with this email already exists");

      if (args.employee_photo) {
        let result = await cloudinary.uploader.upload(args.employee_photo, {
          folder: 'employees',
        });
        args.employee_photo = result.secure_url;
      }

      let emp = await Employee.create(args);
      return emp;
    },

    updateEmployee: async (_, { id, ...updates }) => {
      if (updates.employee_photo) {
        let result = await cloudinary.uploader.upload(updates.employee_photo, {
          folder: 'employees',
        });
        updates.employee_photo = result.secure_url;
      }

      let emp = await Employee.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });
      if (!emp) throw new Error("Employee not found");
      return emp;
    },

    deleteEmployee: async (_, { id }) => {
      let emp = await Employee.findByIdAndDelete(id);
      if (!emp) throw new Error("Employee not found");
      return emp;
    },
  },
};

export default resolvers;
