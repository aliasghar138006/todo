import Connect from "../../utils/connectD";
import { getSession } from "next-auth/react";
import TodoUser from "../../model/Users";
import { HashedPassword, VerifyPassword } from "../../utils/auth";
export default async function handler(req, res) {
  await Connect();

  const session = await getSession({ req });
  const user = await TodoUser.findOne({ email: session.user.email });

  if (!user) {
    return res
      .status(401)
      .json({ status: "failed", message: "Not Found User!" });
  }

  if (req.method === "POST") {
    const { name, lastName, password } = req.body;

    if (!name || !lastName || !password) {
      return res
        .status(422)
        .json({ status: "failed", message: "invalid data!" });
    }

    const verifyPassword = await VerifyPassword(password, user.password);
    if (!verifyPassword) {
      return res
        .status(401)
        .json({ status: "failed", message: "unauthorized user!" });
    }
    user.name = name;
    user.lastName = lastName;
    user.save();

    res
      .status(200)
      .json({ status: "success", message: "change Data", data: user });
  } else if (req.method == "GET") {
    const email = user.email;
    const name = user.name;
    const lastName = user.lastName;
    res.status(200).json({
      status: "success",
      message: "get data!",
      data: { email, name, lastName },
    });
  }
}
