package samplepackage

import com.atomist.rug.kind.RugLanguageExtensionTest
import org.scalatest.FlatSpec

class SampleTypeTest extends FlatSpec with RugLanguageExtensionTest {

  val sourceProjectLocation = ???

  it should "change my source code" in {

    val pmv = projectFromDirectory(sourceProjectLocation)

    val expr = """//Sample()"""

    val nodes = evaluatePathExpression(pmv, expr)

    nodes.head.update("I am the new value!")

    val newContent = pmv.findFile(???).content
    assert(???)

    println("New content: ------\n" + newContent + "\n--------")

  }

}
