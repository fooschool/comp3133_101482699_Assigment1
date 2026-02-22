import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  designation: {
    type: String,
    required: [true, "Designation is required"],
    trim: true,
  },
  salary: {
    type: Number,
    required: [true, "Salary is required"],
    min: [1000, "Salary must be at least 1000"],
  },
  date_of_joining: {
    type: Date,
    required: [true, "Date of joining is required"],
  },
  department: {
    type: String,
    required: [true, "Department is required"],
    trim: true,
  },
  employee_photo: {
    type: String,
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
