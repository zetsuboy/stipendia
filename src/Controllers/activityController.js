"use strict";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const endpoints = {
  getActivityByUserId: async (req, res) => { //достижения пользователя (все, без подробностей - ибо подробности разные => должны быть разные таблицы)
    const activity = await prisma.activity.findUnique({
      where: {
        userId: Number(req.body.userId),
      },
      select: {
        activityId: true,
        userId: true,
        activityType: true,
        activityStatus: true,
      },
    });
    if (Error) res.status(200).send(activity);
  },

  getActivityByActivityId: async (req, res) => { //достижение по ид  (все, без подробностей - ибо подробности разные => должны быть разные таблицы)
    const activity = await prisma.activity.findUnique({
      where: {
        activityId: Number(req.body.activityId),
      },
      select: {
        activityId: true,
        userId: true,
        activityType: true,
        activityStatus: true,
      },
    });
    if (Error) res.status(200).send(activity);
  },

  getAllActivities: async (req, res) => { //все достижения  (все, без подробностей - ибо подробности разные => должны быть разные таблицы)
    const activity = await prisma.activity.findMany({
      // where: {
      //   activityId: null,
      // },
      select: {
        activityId: true,
        userId: true,
        activityType: true,
        activityStatus: true,
      },
    });
    res.status(200).send(activity);
  },

  getEducationalActivityByUserId: async (req, res) => { //учебные достижения пользователя (подробности)
    const activity = await prisma.educationalActivity.findUnique({
      where: {
        userId: Number(req.body.userId),
      },
      select: {
        activityId: true,
        userId: true,
        eventName: true,
        eventType: true,
        eventLevel: true,
        dateStart: true,
        dateEnd: true,
        eventLocation: true,
        achievementFormat: true,
        achievementName: true,
        achievementType: true,
        achievementPDF: true,
      },
    });
    if (Error) res.status(200).send(activity);
  },

  getEducationalActivityByActivityId: async (req, res) => { //учебное достижение по ид (подробности)
    const activity = await prisma.educationalActivity.findUnique({
      where: {
        activityId: Number(req.body.activityId),
      },
      select: {
        activityId: true,
        userId: true,
        eventName: true,
        eventType: true,
        eventLevel: true,
        dateStart: true,
        dateEnd: true,
        eventLocation: true,
        achievementFormat: true,
        achievementName: true,
        achievementType: true,
        achievementPDF: true,
      },
    });
    if (Error) res.status(200).send(activity);
  },

  getAllEducationalActivities: async (req, res) => { //все учебные достижения (подробности)
    const activity = await prisma.educationalActivity.findMany({
      // where: {
      //   activityId: null,
      // },
      select: {
        activityId: true,
        userId: true,
        eventName: true,
        eventType: true,
        eventLevel: true,
        dateStart: true,
        dateEnd: true,
        eventLocation: true,
        achievementFormat: true,
        achievementName: true,
        achievementType: true,
        achievementPDF: true,
      },
    });
    res.status(200).send(activity);
  },

};

export default endpoints;
