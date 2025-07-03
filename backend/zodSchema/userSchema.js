const { z } = require("zod");

const userSchema = z.object({
  username: z.string().max(30, "length should be less than or equal to 30"),
  firstName: z.string().max(50, "length should be less than or equal to 50"),
  lastName: z.string().max(50, "length should be less than or equal to 50"),
  password: z.string().trim().min(6, "min length 6"),
});

const updateUserSchema = z.object({
  firstName: z
    .string()
    .max(50, "length should be less than or equal to 50")
    .optional(),
  lastName: z
    .string()
    .max(50, "length should be less than or equal to 50")
    .optional(),
  password: z.string().trim().min(6, "min length 6").optional(),
});
module.exports = {
  userSchema,
  updateUserSchema,
};
