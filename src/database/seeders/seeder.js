
import { userSeeder } from "./usersSeeders.js";
import {postSeeder} from "./postSeeder.js"

const launchSeeder = async () => {
    await userSeeder();
    await postSeeder();
}
  launchSeeder();