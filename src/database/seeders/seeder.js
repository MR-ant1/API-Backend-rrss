
import { userSeeder } from "./userSeeder.js";
import { postSeeder } from "./postSeeder.js"

const launchSeeder = async () => {
    await userSeeder();
    await postSeeder();
}
  launchSeeder();