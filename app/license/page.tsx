import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Github, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function LicensePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-4">
            License
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-balance">MIT License</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            USVisaBridge is licensed under the MIT License
          </p>
        </div>

        <Card className="p-8 mb-8 bg-card border-border">
          <div className="space-y-6">
            <div className="text-center mb-6">
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-lg font-semibold">MIT License</p>
              <p className="text-muted-foreground">Copyright (c) 2025 USVisaBridge</p>
            </div>

            <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p>
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the &quot;Software&quot;), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
              </p>

              <p>
                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.
              </p>

              <p>
                THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-8 mb-8 bg-card border-border">
          <h2 className="text-3xl font-bold mb-6">What This License Means</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">You Are Free To:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Use the software for commercial purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Modify the software to suit your needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Distribute the software</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Use the software privately</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Sublicense and/or sell copies of the software</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Under The Following Conditions:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>You must include the original copyright notice and license in all copies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>The software is provided &quot;as is&quot; without warranty</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-blue-600/5 border-primary/20">
          <div className="text-center space-y-4">
            <Github className="w-12 h-12 text-primary mx-auto" />
            <h2 className="text-2xl font-bold">Open Source Commitment</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              USVisaBridge is committed to remaining free and open source. The MIT License 
              is one of the most permissive open-source licenses, allowing you to use our 
              code for both commercial and personal purposes.
            </p>
            <div className="pt-4">
              <Link
                href="https://github.com/yourusername/visa-slot-tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <Github className="w-5 h-5" />
                View Source Code on GitHub
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-card border-border">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Questions About The License?</h2>
            <p className="text-muted-foreground">
              If you have questions about how you can use USVisaBridge under the MIT License, 
              please review our license text above or contact us.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/contact">
                <button className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Contact Us
                </button>
              </Link>
              <Link href="/contribute">
                <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                  Contributing Guide
                </button>
              </Link>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

