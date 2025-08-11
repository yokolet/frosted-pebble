---
layout: post
title: JRuby Extension Revisited
featured_image: flower-stripes.jpg
excerpt_separator: "<!--more-->"
date: 2025-08-11 15:46 +0900
---
Ruby provides a way to write a native extension.
Many gems use some kind of C library to create an API or application, like [pg gem](https://github.com/ged/ruby-pg).
When it comes to Java backed JRuby, the native extension uses a Java library.
<!--more-->

As C backed Ruby can integrate C libraries, JRuby can integrate Java libraries seamlessly.
This is an interesting feature since Java libraries can be used as if those are written in Ruby.
The downside is that creating a JRuby extension is a bit tricky.
Java API should be wrapped by JRuby to provide as Ruby methods.
Java code should be glued to Ruby's entrypoint code.
This blog post is my recent experience to develop a JRuby extension.

### Background

I used to write JRuby native extensions back in early 2010s.
Now, it is late 2020s. JRuby 10 dropped older versions of Java support.
It only supports Java 21 and above.
Also, JRuby has updated its API.
I decided to revisit JRuby native extension.


### Jsoup from Ruby

To write JRuby extension, absolutely we need at least one Java library.
What I picked up for the JRuby extension here is [Jsoup](https://jsoup.org/).
It is an HTML parser for Java, and supports HTML 5.

The sample application is very simple and limited.
It parses an HTML string, then creates a list of node names. That's it.
The application might be too simple; however, it would be good enough as a starting point.
All code for the JRuby extension application is in the GitHub repo: [https://github.com/yokolet/red-jsoup](https://github.com/yokolet/red-jsoup).


### Development

The native extension development consists of roughly three parts:
Java code to use Java library, compile definition, Ruby code to glue the extension and Ruby.
Typically, the Java code resides under `ext` directory.
A jar archive created by compilation, and Ruby code reside under `lib` directory.
The compile definition resides in the top directory.


#### Rake-compiler

As we know, Java code should be compiled before using that.
Instead of a common javac compiler in Java world, [rake-compiler](https://github.com/rake-compiler/rake-compiler)
would be the most used Java extension compiler.
Since the rake-compiler runs on JRuby, we don't need to set jruby.jar to a classpath at compilation.
The compilation definition is done by a rake task definition, which is familiar to a Ruby developer.
The example here uses rake-compiler to compile Java extension code.

Rakefile is below;

```ruby
# Rakefile

require 'rake/javaextensiontask'

jars = Dir.glob("lib/**/*.jar")
Rake::JavaExtensionTask.new('red-jsoup') do |ext|
  ext.classpath = jars.map {|x| File.expand_path x}.join ":"
  ext.source_version = '21'
  ext.target_version = '21'
end

task :default => [:compile]
```

The rake-compiler's default native extension code directory is ext/[extension name].
Above Rakefile expects Java files to be located under `ext/red-jsoup` directory.
If you have an experience of Java development, *.java files should be located under its package structure.
However, the rake-compiler doesn't care the package structure.
When Java files are compiled and put together in a jar file, the package directory structure is created in the jar.

When the Rakefile gets run by:
```bash
$ rake
```

The jar archive, `red-jsoup.jar`, is created under lib directory.


As an additional info, the rak-compiler is not the only one compiler.
The [polyglot maven](https://github.com/jruby/jruby/wiki/Java-extensions-for-JRuby-using-polyglot-maven) is another one.
When a Java library has multiple dependencies, the polyglot maven might be better since it manages such dependencies.


#### Java Code

The Java extension code has two types of classes.
The first is often named `***Service.java`, which works as a glue to Ruby from Java side.
Ruby's modules, classes and methods are defined in this class.
Another type defines a core logic of API or application.
In many cases, multiple Java classes would be created to provide desired features.
Ruby methods are annotated as `@JRubyMethod`, which can take additional info.

The very simple application here has only two Java classes.

```java
// ext/red-jsoup/RedJsoupService.java
package rjsoup;

import java.io.IOException;

import org.jruby.Ruby;
import org.jruby.RubyClass;
import org.jruby.RubyModule;
import org.jruby.runtime.ObjectAllocator;
import org.jruby.runtime.builtin.IRubyObject;
import org.jruby.runtime.load.BasicLibraryService;
import org.jruby.api.Define;

public class RedJsoupService implements BasicLibraryService {

    @Override
    public boolean basicLoad(final Ruby runtime) throws IOException {
        RubyModule rjs = Define.defineModule(runtime.getCurrentContext(), "RedJsoup");
        RubyClass parser = rjs.defineClassUnder(runtime.getCurrentContext(), "Parser", runtime.getObject(), FRACTION_ALLOCATOR);
        parser.defineMethods(runtime.getCurrentContext(), Parser.class);
        return true;
    }
    
    private static ObjectAllocator FRACTION_ALLOCATOR = new ObjectAllocator() {
        public IRubyObject allocate(Ruby runtime, RubyClass klazz) {
            return new Parser(runtime, klazz);
        }
    };
}
```

```java
// ext/red-jsoup/Praser.java
package rjsoup;

import java.util.List;
import org.jruby.Ruby;
import org.jruby.RubyArray;
import org.jruby.RubyClass;
import org.jruby.RubyObject;
import org.jruby.RubyString;
import org.jruby.anno.JRubyClass;
import org.jruby.anno.JRubyMethod;
import org.jruby.runtime.Arity;
import org.jruby.runtime.ThreadContext;
import org.jruby.runtime.builtin.IRubyObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Node;

@JRubyClass(name="RedJsoup::Parser")
public class Parser extends RubyObject {
    private static final long serialVersionUID = 1L;

    public Parser(Ruby runtime, RubyClass klazz) {
        super(runtime, klazz);
    }
    
    @JRubyMethod(name = "parse")
    public IRubyObject parseHtml(ThreadContext context, IRubyObject input) {
        if (input instanceof RubyString) {
            String html = input.asJavaString();
            Node node = Jsoup.parse(html);
            RubyArray<?> nodeList = RubyArray.newArray(context);
            nodeList = findNodeList(context, node, nodeList);
            return nodeList;
        } else {
            return context.getRuntime().getNil();
        }
    }

    private RubyArray<?> findNodeList(ThreadContext context, Node node, RubyArray<?> nodeList) {
        List<Node> nodes = node.childNodes();
        for (Node n : nodes) {
            nodeList = findNodeList(context, n, nodeList);
        }
        nodeList.add(context.getRuntime().newString(node.nodeName()));
        return nodeList;
    }
}
```

#### Ruby Code

The final piece is a Ruby code to glue Java classes from Ruby side.
This is simple. It's main purpose is to call a `basicLoad` method defined in `RedJsoupService` class.
Typically, Java libraries are loaded in this Ruby code as well.
The example below requires `jsoup-1.21.1`, which loads `jsoup-1.21.1.jar` located under `lib` directory.

```ruby
require 'jruby'
require_relative 'red-jsoup.jar'

require 'jsoup-1.21.1'

Java::Rjsoup::RedJsoupService.new.basicLoad(JRuby.runtime)
```

That's all about the JRuby native extension development.


#### Sample Code

Let's try this very simple JRuby extension application.
The extension here doesn't take Ruby gem style, so the sample application should load all from `lib` directory.
Then, require Ruby's entrypoint file, `red_jsoup`.
Please be aware the difference between `red-jsoup` and `red_jsoup` (hyphen vs underscore).

```ruby
require 'java'
require 'pathname'

$: << Pathname.new(__dir__).join("..", "lib")
require 'red_jsoup'

p = RedJsoup::Parser.new
html = "<html><head><title>First parse</title></head><body><p>Parsed HTML into a doc.</p></body></html>";

ret = p.parse(html)
puts(ret)
```

Above prints:
```
#text
title
head
#text
p
body
html
#document
```

### Conclusion

The example code here is very simple. Despite, I struggled to glue Java and Ruby, especially to call `basicLoad` method.
There are a couple of ways to do so. However, most of existing examples or blog posts look outdated.
Eventually, I found the way to call the method like a Ruby class.
Additionally, JRuby API has been updated, so at first I got many compile warnings.
I went to JRuby API document and fixed all those.
It was a good occasion to catch up recent JRuby.


### References
- [Your first Ruby native extension: Java](https://blog.jcoglan.com/2012/08/02/your-first-ruby-native-extension-java/)
- [The JRuby Tutorial #4: Writing Java extensions for JRuby](https://ola-bini.blogspot.com/2006/10/jruby-tutorial-4-writing-java.html)
- [JRuby Examples: GitHub repo](https://github.com/jruby/jruby-examples/tree/master)
- [C Extension Alternatives: JRuby Wiki](https://github.com/jruby/jruby/wiki/C-Extension-Alternatives)
- Jonathan Hedley & jsoup contributors. jsoup: Java HTML Parser (2009–present). Available at: [https://jsoup.org](https://jsoup.org)
- GitHub repository of the sample code: [https://github.com/yokolet/red-jsoup](https://github.com/yokolet/red-jsoup)
