import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content } = req.body;

  try {
    await prisma.note.create({
      data: {
        title,
        content,
      },
    });
    res.status(200).json({ msg: "Note Created" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
}
