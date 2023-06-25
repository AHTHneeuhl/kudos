import { json, redirect, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Portal } from "~/components/portal";
import { getUserById } from "~/utils/user.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { userId } = params;

  if (typeof userId !== "string") {
    return redirect("/home");
  }

  const recipient = await getUserById(userId);
  return json({ recipient });
};

export default function KudoModal() {
  const data = useLoaderData();

  return <Portal wrapperId="kudo-modal"> User: {data.userId} </Portal>;
}
