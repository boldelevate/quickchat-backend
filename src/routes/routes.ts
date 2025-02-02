import { errorRes, successRes } from "../resources/util";
import express, { Request, Response } from "express";
import { runSafely } from "./routes-helper";
import User from "../models/User";
import Call from "../models/Call";
import Chat from "../models/Chat";

const router = express.Router()
router.use(express.json())

router.post("/auth", (req: Request, res: Response) => {
    runSafely(res, async () => {
        const query = { username: req.body.username, password: req.body.password };
        if (await User.exists(query)) {
            successRes(res, { code: "AUTH_SUCCESS" });
        } else {
            errorRes(res, { code: "NOT_FOUND" });
        }
    });
});

router.post("/add-chat", (req: Request, res: Response) => {
    runSafely(res, async () => {
        const query = { username: req.body.username, password: req.body.password };
        if (await User.exists(query)) {

            const chat = new Chat({
                username: req.body.username,
                city: req.body.city,
                businessID: req.body.businessID,
                businessName: req.body.businessName,
                identifier: `${req.body.city.toLowerCase()}-${req.body.businessID}`
            });

            await chat.save();

            successRes(res, { code: "SUCCESS", });
        } else {
            errorRes(res, { code: "NOT_FOUND" });
        }
    });
});

router.post("/add-call", (req: Request, res: Response) => {
    runSafely(res, async () => {
        const query = { username: req.body.username, password: req.body.password };
        if (await User.exists(query)) {

            const chat = new Call({
                username: req.body.username,
                city: req.body.city,
                businessID: req.body.businessID,
                businessName: req.body.businessName,
                identifier: `${req.body.city.toLowerCase()}-${req.body.businessID}`
            });

            await chat.save();

            successRes(res, { code: "SUCCESS", });
        } else {
            errorRes(res, { code: "NOT_FOUND" });
        }
    });
});

router.post("/load-dashboard", (req: Request, res: Response) => {
    runSafely(res, async () => {
        const query = { username: req.body.username, password: req.body.password };
        if (await User.exists(query)) {

            const adjustmentFactor = 290;

            const chats = (await Chat.countDocuments()) + adjustmentFactor;
            const calls = (await Call.countDocuments()) + adjustmentFactor;
            const user = await User.findOne(query);

            successRes(res, {
                code: "DATA_SHARED", data: {
                    chats: chats,
                    calls: calls,
                    reachOuts: (chats > calls) ? chats : calls,
                    chatsArray: await Chat.find({ username: req.body.selectUser }),
                    callsArray: await Call.find({ username: req.body.selectUser }),
                    users: await User.find().select({ username: 1 }),
                    admin: (user?.admin) ? true : false,
                }
            });
        } else {
            errorRes(res, { code: "NOT_FOUND" });
        }
    });
});

export default router;