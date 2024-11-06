import { Elysia, t } from "elysia";

import { noteService } from "../../applications/instance";
import { sessionMiddleware } from "../middleware/session-middleware";

export const noteRouter = new Elysia()
  // middleware
  .derive(sessionMiddleware)
  // router
  .get(
    "/notes",
    async ({ user }) => {
      const allNotes = await noteService.getAll(user);
      return allNotes;
    },
    {
      tags: ["notes"],
    }
  )
  .get(
    "/notes/:id",
    async (req) => {
      const note = await noteService.getById(req.params.id);
      return note;
    },
    {
      tags: ["notes"],
    }
  )
  .post(
    "/notes",
    async (req) => {
      const note = { ...req.body, authorId: req.user.id };
      const newNote = await noteService.create(note);
      return newNote;
    },
    {
      tags: ["notes"],
      body: t.Object({
        title: t.String(),
        content: t.String(),
      }),
    }
  )
  .put(
    "/notes/:id",
    async (req) => {
      const note = await noteService.update(req.params.id, req.body);
      return note;
    },
    {
      tags: ["notes"],
      body: t.Object({
        title: t.String(),
        content: t.String(),
      }),
    }
  )
  .delete(
    "/notes/:id",
    async (req) => {
      await noteService.delete(req.params.id);
      return;
    },
    { tags: ["notes"] }
  );
