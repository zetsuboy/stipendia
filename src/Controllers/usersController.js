"use strict";
import pkg from "@prisma/client";

import bcrypt from "bcryptjs/dist/bcrypt.js";
import jsonwebtoken from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const endpoints = {
  getAllUsers: async (req, res) => { //все юзеры
    const users = await prisma.users.findMany({
      // where: {
      //   userId: Number(req.userId),
      // },
      select: {
        userId: true,
        email: true,
        firstName: true,
        lastName: true,
        patronymic: true,
        avatar: true,
      },
    });
    res.status(200).send(users);
  },

  getUserById: async (req, res) => {// юзер по id
    const user = await prisma.users.findUnique({
      where: {
        userId: Number(req.body.userId),
      },
      select: {
        email: true,
        name: true,
        contacts: true,
        type: true,
        info: true,
        pay: true,
        ava: true,
        role: true,
      },
    });
    if (!user) {
      res.status(404).send({
        message: "Пользователь не найден!",
      });
      return;
    }
    res.status(200).send(user);
  },

  updateUser: async (req, res) => { //обновление данных
     if (req.userId !== req.body.userId) {
      res.status(403).send({
        detail: "Попытка обновить данные чужого пользователя :/",
      });
      return;
    }
    const user = await prisma.users.update({
      where: {
        userId: Number(req.userId),
      },
      data: {
        firstName: String(req.body.firstName),
        lastName: String(req.body.lastName),
        patronymic: String(req.body.patronymic),
      },
    });
    res.status(200).send(user);
  },

  deleteUser: async (req, res) => { //удаление юзера
    const del = await prisma.users.delete({
      where: {
        userId: Number(req.body.userId),
      },
    });
    res.status(200).send({
      message: "Аккаунт пользователя удалён!",
    });
  },

  signup: async (req, res) => { //регистрация
    const salt = bcrypt.genSaltSync(15);
    const password = bcrypt.hashSync(req.body.password, salt);
    const signup = await prisma.users.create({
      data: {
        email: String(req.body.email),
        password: String(password),
        firstName: String(req.body.firstName),
        lastName: String(req.body.firstName),
        patronymic: String(req.body.firstName),
        avatar: "link.png",
      },
    });
    res.status(200).send({
      message: "Пользователь зарегистрирован!",
    });
  },

  me: async (req, res) => { //получение данных юзера
    const user = await prisma.users.findUnique({
      where: {
        userId: Number(req.userId),
      },
      select: {
        userId: true,
        email: true,
        firstName: true,
        lastName: true,
        patronymic: true,
        avatar: true,
      },
    });
    res.status(200).send(user);
  },

  signin: async (req, res) => { //вход
    const user = await prisma.users.findUnique({
      where: {
        email: String(req.body.email),
      },
      select: {
        userId: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        patronymic: true,
        avatar: true,
      },
    });
    if (!user) {
      res.status(400).send({
        message: "Пользователь не найден!",
      });
      return;
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      res.status(400).send({
        message: "Неверный пароль!",
      });
      return;
    }
    let token = jsonwebtoken.sign(
      {
        userId: user.userId,
      },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "120m",
      }
    );
    return res.status(200).send({
      token: token,
    });
  },

  uploadImage: async (req, res) => { //загрузка аватара, надо доработать, но пока пох
    if (!req.files) {
      res.status(403).send({
        detail: "No file uploaded",
      });
      return;
    }
    const tempPath = req.files.avatar[0];
    const fileName = `${uuidv4()}.png`;
    const targetPath = path.join(process.cwd(), `./uploads/${fileName}`);

    if (path.extname(tempPath.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath.path, targetPath, async (err) => {
        if (err) return handleError(err, res);

        const user = await prisma.users.update({
          where: {
            userId: Number(req.userId),
          },
          data: {
            avatar: String(fileName),
          },
        });

        return res.status(200).send({
          image: fileName,
        });
      });
    } else {
      fs.unlink(tempPath, (err) => {
        if (err) return handleError(err, res);

        res.status(403).end({
          detail: "Ты какую-то херню отправил, исправляйся (шучу:)",
        });
      });
    }
  },
  getImage: async (req, res) => {
    res.sendFile(path.join(process.cwd(), `./uploads/${req.body.path}`));
  },
};

export default endpoints;
