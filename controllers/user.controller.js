const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.createUser = async (req, res) => {
  const { name, email } = req.body; 
  const result = await prisma.users.create({
    data: {
      email: email,
      name: name,
    },
  });
  res.json(result);
};

// Get all posts
exports.getUsers = async (req, res) => {
  const users = await prisma.users.findMany({
    include: { posts: true }, // Include author details
  });
  res.json(users);
};

// Get a single post by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.users.findUnique({
    where: { id: id },
    include: { posts: true }, // Include author details
  });
  res.json(user);
};

// Update a post
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, name } = req.body;
  const result = await prisma.users.update({
    where: { id: id },
    data: {
      email: email,
      name: name
    },
  });
  res.json(result);
};


exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const remove = await prisma.users.delete({
    where: { id: id },
  });
  res.json(remove);
};
