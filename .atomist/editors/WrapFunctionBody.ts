import {Project,File} from '@atomist/rug/model/Core'
import {ProjectEditor} from '@atomist/rug/operations/ProjectEditor'
import {PathExpression,TypeProvider} from '@atomist/rug/tree/PathExpression'
import {PathExpressionEngine} from '@atomist/rug/tree/PathExpression'
import {Match} from '@atomist/rug/tree/PathExpression'

class WrapFunctionBody implements ProjectEditor {
    name: string = "WrapFunctionBody"
    description: string = "just put positionedStructure() around my parsers"

    edit(project: Project) {
      let eng: PathExpressionEngine = project.context().pathExpressionEngine()

      /*
      We're matching a structure like this:

      TermApplyInfix:[MutableContainer]
              TermSelect:[MutableContainer]
                TermName:[scenarios]
                TermName:[size]
              TermName:[should]
              TermApply:[MutableContainer]
                TermName:[be]
                Lit:[2]
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
