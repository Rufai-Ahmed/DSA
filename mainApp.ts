import { Application, Request, Response } from "express";
import { statusCode } from "./utils/statusCode";
import { v4 as uuid } from "uuid";
import moment from "moment";
import fs from "fs";
import path from "path";

interface iData {
  id: any;
  name: string;
  course: string;
  time: string;
}

let database: Array<iData> = [];

const mainApp = (app: Application) => {
  app.get("/", (req: Request, res: Response): Response => {
    try {
      return res.status(statusCode.OK).json({
        message: "Welcome to Codelab set08 API v1",
      });
    } catch (error) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "Error",
      });
    }
  });

  app.get("/api/v1/read-data", (req: Request, res: Response) => {
    try {
      return res.status(statusCode.OK).json({
        message: "Reading from database",
        data: database,
      });
    } catch (error) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "Error reading from database",
      });
    }
  });

  app.post("/api/v1/create-data", (req: Request, res: Response) => {
    const { name, course } = req.body;

    const data: iData = {
      id: uuid(),
      name,
      course,
      time: moment(new Date().getTime()).format("LTS"),
    };
    database.push(data);
    const dataPath = path.join(__dirname, "./data", "./database.json");
    fs.writeFile(dataPath, JSON.stringify(database), () => {
      console.log("done writing");
    });

    try {
      return res.status(statusCode.CREATED).json({
        message: "creating from database",
        data: database,
      });
    } catch (error) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "error writing to database",
      });
    }
  });

  app.patch(
    "/api/v1/update-one-data/:userID",
    (req: Request, res: Response) => {
      try {
        const { userID } = req.params;
        const { course } = req.body;
        console.log(userID);
        console.log(course);

        const one: iData | any = database.find((el: iData) => {
          return el.id === userID;
        });

        one.course = course;
        fs.writeFile(
          path.join(__dirname, "./data", "database.json"),
          JSON.stringify(database),
          () => {
            console.log("Patched");
          }
        );
        return res.status(statusCode.OK).json({
          message: "creating from database",
          data: one,
        });
      } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
          message: "error writing to database",
        });
      }
    }
  );

  app.delete(
    "/api/v1/delete-one-data/:userID",
    (req: Request, res: Response) => {
      try {
        const { userID } = req.params;

        const user: iData | any = database.filter((el: iData) => {
          return el.id === userID;
        });
        const newUsers = database.filter((el: iData) => {
          return el.id !== userID;
        });
        database = newUsers;
        fs.writeFile(
          path.join(__dirname, "./data", "database.json"),
          JSON.stringify(database),
          () => {
            console.log("Deleted");
          }
        );
        res.status(statusCode.OK).json({
          message: `${user.name} has been successfully deleted`,
        });
      } catch (error) {
        res.status(statusCode.OK).json({
          message: "Failed to delete user",
        });
      }
    }
  );
};

export default mainApp;
