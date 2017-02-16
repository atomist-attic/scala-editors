import {Project} from '@atomist/rug/model/Core'
import {ProjectEditor} from '@atomist/rug/operations/ProjectEditor'
import {PathExpressionEngine} from '@atomist/rug/tree/PathExpression'

class WrapFunctionBody implements ProjectEditor {
    name: string = "WrapFunctionBody"
    description: string = "just put positionedStructure() around my parsers"

    edit(project: Project) {
      let eng: PathExpressionEngine = project.context().pathExpressionEngine()

      /*
      I'm looking for functions that return Parser[SyntaxNode]
      I expect them to have an infix application as the function body
      Change their type to Parser[PositionedSyntaxNode]
      and wrap their body in a call to positionedNode()
      */
      let targets = `//File()[@name="ElmParser.scala"]/ScalaFile()//defnDef[/typeApply[@value="Parser[SyntaxNode]"]]`

      eng.with<any>(project, targets, defStatement => {
        console.log(defStatement.value())

        defStatement.typeApply().update("Parser[PositionedSyntaxNode]");
        defStatement.termApplyInfix().update("positionedNode(" + defStatement.termApplyInfix().value() + ")")


        console.log(`something: ${defStatement.termApplyInfix().value()}`)
      })
  }

}

export let editor = new WrapFunctionBody()
