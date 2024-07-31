import { z } from "zod";

const ConfigSchema = z.object({
  server: z.object({
    port: z.number(),
    username: z.string().min(1),
    password: z.string().min(1),
    ratelimit: z.number().int(),
  }),
  zone_id: z.string().min(1),
  api_token: z.string().min(1),
  records: z.array(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
    })
  ),
});

export { ConfigSchema };
