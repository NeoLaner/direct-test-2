import { api } from "~/lib/orpc/server";
import WakeUpPage from "./components/wake-up-page";

export default async function Page() {
	const data = await api.user.wakeUp();

	return <WakeUpPage data={data} />;
}
