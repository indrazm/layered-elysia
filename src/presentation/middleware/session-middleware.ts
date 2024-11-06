import { Context } from "elysia";

import { authService } from "../../applications/instance";

export async function sessionMiddleware({ cookie: { session }, set }: Context) {
  if (!session?.value) {
    set.status = 401;
    throw new Error("Unauthorized");
  }

  const { user } = await authService.getSession(session.value);

  if (!user) {
    set.status = 401;
    throw new Error("Unauthorized");
  }

  return { user };
}
