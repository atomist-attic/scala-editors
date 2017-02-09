import { Executor } from "@atomist/rug/operations/Executor"
import { Services } from "@atomist/rug/model/Core"
import { Result, Status, Parameter } from "@atomist/rug/operations/RugOperation"

interface Parameters {

}

export let upgradeScalaTestAssertions: Executor = {
    description: "Upgrades ScalaTest assertions",
    name: "UpgradeScalaTestAssertions",
    parameters: [
    ],
    execute(services: Services, p: Parameters): Result {
        for (let s of services.services()) {
          s.editWith("UpgradeScalaTestAssertions", {})
        }
        return new Result(Status.Success, "OK")
     }
}
