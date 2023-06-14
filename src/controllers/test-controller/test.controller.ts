// import db from "@src/models";
import { Request, Response } from "express";
import mongoose from "mongoose";

// const HouseHoldMembers = db.household_members;
// const HouseHoldName = db.households;
// const pageSizeOptions = [5, 10, 20, 50, 100];

export const testCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // const houseHoldMemberData = req.body;
    // const houseHoldId = new mongoose.Types.ObjectId();

    // houseHoldMemberData._id = houseHoldId;
    // houseHoldMemberData.household_members_id =
    //   houseHoldMemberData.household_members_id;

    // const houseHoldData = new HouseHoldMembers(houseHoldMemberData);
    // await houseHoldData.save();

    res.json("saved");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
