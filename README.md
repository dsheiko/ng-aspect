# NgAspect 1.0 BETA

[![NPM](https://nodei.co/npm/ng-aspect.png)](https://nodei.co/npm/ng-aspect/)

[![Build Status](https://travis-ci.org/dsheiko/ng-aspect.png)](https://travis-ci.org/dsheiko/ng-aspect)

`NgAspect` is a little library of decorators that unlocks aspect-oriented programming features in JavaScript.

Aspect-oriented programming suggests separating cross-cutting concerns (logging, caching, monitoring,
data validation, error detection and so on) from main business logic. In brief it introduces:
* advice - code implementing cross-cutting concerns
* pointcut - when code where in your main code advices shall be applied

`NgAspect` provides decorators `@Before` and `@After` that allow to bind an advice to a pointcut e.g. `@Before( Class/Constructor, "methodName" )`.
It also exports `@Pointcut` decorator that points out what method can be supplied with advices.


# How does it work?

```javascript
import { Before, After, Pointcut } from "./aspect";

class Foo {
  @Pointcut
  bar(){
    console.log( "calling bar", arguments );
  }
}

class Advice {
  @Before( Foo, "bar" )
  preLog() {
    console.log( "calling pre-log", arguments );
  }

  @After( Foo, "bar" )
  postLog() {
    console.log( "calling post-log" );
  }
}

(new Foo()).bar( 1, 2, 3 );

```

Output:
```
calling pre-log 1,2,3
calling bar 1,2,3
calling post-log
```


The same goes for static methods

```javascript
import { Before, After, Pointcut } from "./aspect";

class Foo {
  @Pointcut
  static bar(){
    console.log( "calling bar" );
  }
}

class Advice {
  @Before( Foo, "bar" )
  @After( Foo, "bar" )
  static log() {
    console.log( "log" );
  }
}

Foo.bar();

```

# Syntax

## Setting a single target
```
@Before( Foo, "bar" )
@After( Foo, "bar" )
```
or
```
@Before([ Foo, "bar" ])
@After([ Foo, "bar" ])
```

## Setting multiple targets
```
@Before([
  [ Foo, "bar" ],
  [ Baz, "quiz" ],
])

```


[![Analytics](https://ga-beacon.appspot.com/UA-1150677-13/dsheiko/ng-aspect)](http://githalytics.com/dsheiko/ng-aspect)
