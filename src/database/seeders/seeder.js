
import { userSeeder } from "./usersSeeders";


const launchSeeder = async () => {
    await userSeeder();
}
  launchSeeder();