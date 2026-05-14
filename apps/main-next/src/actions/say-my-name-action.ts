"use server";

import { router } from "~/lib/orpc/router";

export const sayMyNameAction = router.user.wakeUp.actionable();
