import db from "../db.server";
import { json } from "@remix-run/node";

export async function action({ request }){
  const method = request.method;
  const body = await request.json();
  console.log(body);

  switch(method){
    case "POST":
      const colordata= await db.colorData.create({
        data :{
        Primary: body.primaryColor,
        Secondary: body.secondaryColor,
      },
    });
    const response = json({ message:"color  data ", method:"POST", colordata:colordata});
    return response;

    default:

    return new Response("Method Not allowed ",{status:405});
  }
}
