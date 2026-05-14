import z from "zod";

export const unprocessableContentDataSchema = z.object({
	fields: z.record(
		z.string(),
		z.object({
			message: z.string(),
			type: z.enum(["validation", "duplicate", "invalid"]),
		}),
	),
});

export const badRequestDataSchema = z.object({
	reason: z.string(),
});
