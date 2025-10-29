const Employee = require('../Models/Employee.js');

exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const saved = await employee.save();
    res.status(201).json(saved);
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ message: 'Email already exists' });
    res.status(400).json({ message: err.message });
  }
};

// Get all employees + search
exports.getEmployees = async (req, res) => {
  try {
    const { q } = req.query;
    const filter = q
      ? { $or: [
          { name: new RegExp(q, 'i') },
          { department: new RegExp(q, 'i') },
          { position: new RegExp(q, 'i') }
        ]}
      : {};
    const employees = await Employee.find(filter).sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one employee
exports.getEmployeeById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    res.json(emp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Employee not found' });
    res.json(updated);
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ message: 'Email already exists' });
    res.status(400).json({ message: err.message });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
